import { Component, OnInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';

/**
 * Generated class for the Lavfat1170GasComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1170-gas',
  templateUrl: 'lavfat1170-gas.html'
})
export class Lavfat1170GasComponent extends BasePreventivatoreComponent implements OnInit {

  preventivo: Preventivo;
  valori: Object[] = [];

 constructor(public navCtrl: NavController, public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
  }

  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1170_GAS", this.ads);

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaFissa = Number(this.valori[0]["quotaFissa"]);
        this.preventivo.Totale = Number(this.preventivo.QuotaFissa);
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_GAS";
        this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
        this.preventivo.AltreSpese = 0;
      }      
  }

 
  updateCer(result) {
    this.preventivo.Cer = result.result;
    this.preventivo.NumeroCer = result.number;
    this.aggiornaTotale();
  }
  
  updateCvv(result) {
    this.preventivo.Cvv = result;
    this.aggiornaTotale();
  }

  
  updateQuote(res: any) {
    this.preventivo.Quote = res;
    if(res && res.Totale){
      this.preventivo.AltreSpese = this.preventivo.Quote.Totale; 
    }
    else{
      this.preventivo.AltreSpese = 0;
    }
    if(this.preventivo.Deroga && this.preventivo.Deroga.Totale) {
        this.preventivo.AltreSpese += this.preventivo.Deroga.Totale;
    }
    
    this.adsService.updateAds(this.ads, {Quote: res}, () => {}, () => {});
    this.aggiornaTotale();
  }


}
