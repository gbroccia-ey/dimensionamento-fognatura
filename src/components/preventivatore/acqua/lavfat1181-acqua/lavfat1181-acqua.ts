import { Component,  OnInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Attributo } from '../../../../models/attributo';


/**
 * Generated class for the lavfat1181AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1181-acqua',
  templateUrl: 'lavfat1181-acqua.html'
})
export class Lavfat1181AcquaComponent extends BasePreventivatoreComponent implements OnInit{

  preventivo: Preventivo;
  tipo_spostamento: Array<Object>;
  valori: Object[] = [];
  tipoSpostamentoLabel;
 



  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
    this.preventivo = new Preventivo();
    this.tipo_spostamento = [];
    
  }



  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1181_ACQUA", this.ads);
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
        this.preventivo.Deroga = {"Totale":0};
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_ACQUA";
        this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
        this.calcolaAttributi(this.valori[0]["quotaVariabile"]);
    }

   
	  this.valori.forEach(v => {
        this.tipo_spostamento.push({value: v["tipoSpostamento"], label: v["label"]});
    });

    this.updateQuotaFissa();
  }

  calcolaAttributi(attributi){
    this.preventivo.Attributi = [];
    for(var a = 0; a <attributi.length; a++){
        var attr = new Attributo();
        attr.Nome = attributi[a].classeContatore;
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


  getTotaleUlteriori(){
      if(this.preventivo.NumeroAttacchi && this.preventivo.QuotaFissaNAttacchi )
        return (this.preventivo.NumeroAttacchi - 1) * this.preventivo.QuotaFissaNAttacchi;
      return 0;
  }

  updateQuotaFissa(){
    for(let item of this.valori){
      if(item["tipoSpostamento"] == this.preventivo.TipoSpostamento){
        this.preventivo.QuotaFissa = item["quotaFissa"];
        this.tipoSpostamentoLabel = item["label"];
      }
    }
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

  aggiornaTotale() {
    this.preventivo.Totale =  this.calcolaQuotaVariabile() + this.preventivo.QuotaFissa
      + (+this.preventivo.Cop || 0) + +this.preventivo.Cer + +this.preventivo.Cvv + +this.preventivo.AltreSpese;
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