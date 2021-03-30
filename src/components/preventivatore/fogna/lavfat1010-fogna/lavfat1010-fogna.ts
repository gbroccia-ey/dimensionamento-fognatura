import { Component, OnInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';

/**
 * Generated class for the Lavfat1010FognaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1010-fogna',
  templateUrl: 'lavfat1010-fogna.html'
})
export class Lavfat1010FognaComponent extends BasePreventivatoreComponent implements OnInit{

  valori: Object[] = [];
  preventivo: Preventivo;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);
                
  }

  ngOnInit() {
    this.valori = Params.Valori.get("LAVFAT1010_FOGNA");

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
    else {
        this.preventivo = new Preventivo();
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_FOGNATURA";
        this.preventivo.QuoteItems = Params.Valori.get(keyQuote);
        this.preventivo.AltreSpese = 0;
        this.preventivo.Quote = {"Totale":0};
        this.preventivo.UiEqFogna = "Z";
        this.preventivo.QuotaFissa = 707;
        if(this.ads.VarianteListino == "LISTINO PREZZI 2 (PROVINCIA RIMINI)") this.preventivo.QuotaFissa = 700;
        this.aggiornaTotale();
    }
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa)  + Number(this.preventivo.AltreSpese);
 
    this.valori.forEach(x => {
      if(x["quotaFissa"] === this.preventivo.QuotaFissa) {
        this.preventivo.UiEqFogna = x["allacFogna"];
      }
    });
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
