import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

/**
 * Generated class for the Lavfat1010FognaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1040-fogna',
  templateUrl: 'lavfat1040-fogna.html'
})
export class Lavfat1040FognaComponent extends BasePreventivatoreComponent implements OnInit, AfterViewInit {

  valori: Object[] = [];
  preventivo: Preventivo;
  selectedLabel;

   @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);

                
  }

//inserire tipo allaccio = tipo spostamento



  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1040_FOGNA", this.ads);
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      //this.selectedLabel = this.preventivo.selectedLabel; 
      }
    else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaFissa = 0;
        this.preventivo.Cop = 0;
        this.preventivo.Totale = 0;
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
        this.preventivo.UiEqFogna = "";
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_FOGNATURA";
        this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
    }
  }


   ngAfterViewInit() {

       setTimeout(() => {
            this.aggiornaTotale();
        }, 500);
  }

  aggiornaTotale() {
   this.preventivo.selectedLabel = this.selectedLabel;
    this.valori.forEach(x => {
      var nomeQuotaFissa = "quotaFissaNuovo";
      this.preventivo.TipoSpostamento = 1;
      if(this.preventivo.TipoAllaccio=="2"){
        this.preventivo.TipoSpostamento = 2;
        nomeQuotaFissa = "quotaFissaSpostamento";
      }
      
      if(x["label"] === this.selectedLabel) {
        
         this.preventivo.QuotaFissa = x[nomeQuotaFissa]; 
        this.preventivo.UiEqFogna = x["allacFogna"];
      }
    });

      this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cop)
                             + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv)+ Number(this.preventivo.AltreSpese);

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


  goToSlide(n) {
    if(!this.preventivo.TipoAllaccio) return;
    this.slides.lockSwipes(false);
    this.slides.slideTo(n);
    this.slides.lockSwipes(true);
      this.aggiornaTotale();
  }

  conferma(){
    if(this.preventivo.TipoAllaccio==undefined || this.preventivo.selectedLabel==undefined){
            let confirm = this.alertCtrl.create({
            title: 'Attenzione',
            message: "Tipo allacciamento e numero utenti equivalenti sono campi obbligatori. Inserirli per poter creare il preventivo",
            buttons: [
              {
                text: 'OK',
                handler: () => {
                }
              }
            ]
          });
          confirm.present();
    }
    else
      this.conferma_Preventivo();
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
