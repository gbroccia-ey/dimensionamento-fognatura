import { Component, OnInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
/**
 * Generated class for the Lavfat1070AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1070-acqua',
  templateUrl: 'lavfat1070-acqua.html'
})
export class Lavfat1070AcquaComponent extends BasePreventivatoreComponent implements OnInit {

  valori: Object[] = [];
  preventivo: Preventivo;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);
                
  }

  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1070_ACQUA", this.ads);

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
    else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaFissa = this.valori[0]["quotaFissa"];
        this.preventivo.Totale = Number(this.preventivo.QuotaFissa);
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_ACQUA";
        this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
        this.preventivo.Quote = {"Totale":0};
        this.preventivo.Cop = 0;
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
       
    }
  }

  aggiornaTotale(){
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cop)
                             + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
  }

  updateDeroga(res: any) {
    this.preventivo.Deroga = res;
    if(res && res.Totale){
      this.preventivo.AltreSpese = this.preventivo.Deroga.Totale;
      if(this.preventivo.Quote && this.preventivo.Quote && this.preventivo.Quote.Totale) {
        this.preventivo.AltreSpese += this.preventivo.Quote.Totale;
      }
      this.aggiornaTotale();
    }
    this.adsService.updateAds(this.ads, {Deroga: res}, () => {}, () => {});
    this.aggiornaTotale();
  }


  updateCop(res: any) {
    let result = res.result;
    if(typeof result === "string"){
      result.replace(",",".");
    }
    this.preventivo.Cop = +result;
    this.ads.CopInfo = res.copinfo;
    this.adsService.updateAds(this.ads, {CopInfo: res.copinfo}, () => {}, () => {});
    
    this.aggiornaTotale();
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
