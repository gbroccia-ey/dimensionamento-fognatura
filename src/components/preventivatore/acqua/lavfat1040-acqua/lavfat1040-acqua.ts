import { Component, OnInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Attributo } from '../../../../models/attributo';
import { Params } from '../../../../config/params';

/**
 * Generated class for the Lavfat1040AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1040-acqua',
  templateUrl: 'lavfat1040-acqua.html'
})
export class Lavfat1040AcquaComponent extends BasePreventivatoreComponent implements OnInit{


  valori: Object[] = [];  
  preventivo: Preventivo;
  quote;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);
                
  }

  ngOnInit() {

    let key = this.ads.ProdServizio + "_ACQUA";
    this.valori = Params.getValoriWrapper(key, this.ads);
    

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
    else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaFissa = this.valori[0]["quotaFissa"];
        this.preventivo.QuotaVariabile = this.valori[0]["quotaVariabile"];
        this.preventivo.Cop = 0;
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
        this.preventivo.Deroga = {"Totale":0};
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_ACQUA";
        this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
        this.calcolaAttributi(this.valori[0]["quotaVariabile"]);
        this.preventivo.Totale = Number(this.preventivo.QuotaFissa);
       // this.preventivo.Unita = 1;
        
    }
  }

  calcolaAttributi(attributi){
      this.preventivo.Attributi = [];
      for(var a = 0; a <attributi.length; a++){
          var attr = new Attributo();
          attr.Nome = attributi[a].classeContatore;
          attr.Descrizione =  attributi[a].descrizione;
          attr.Prezzo = attributi[a].prezzo;
          attr.Quantita = 0;
          this.preventivo.Attributi.push(attr);
      }
  }

  calcolaQuotaVariabile(){
    var totale = 0;
    this.preventivo.Attributi.forEach((attr) => {
        if(attr.Quantita){
          attr.Quantita = Math.floor(attr.Quantita);
          totale += attr.Prezzo * attr.Quantita;
        }
    })
    return totale;
}

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + this.calcolaQuotaVariabile()  + Number(this.preventivo.Cop)+ Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
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
