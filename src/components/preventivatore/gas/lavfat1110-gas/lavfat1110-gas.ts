import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';

/**
 * Generated class for the Lavfat1110GasComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1110-gas',
  templateUrl: 'lavfat1110-gas.html'
})
export class Lavfat1110GasComponent extends BasePreventivatoreComponent implements OnInit, AfterViewInit{

  @ViewChild(Slides) slides: Slides;

  preventivo: Preventivo;
  valori: Object[] = [];
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
  
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
  }

  onSelectChange() {
    this.preventivo.QuotaFissa = Number(this.valori.find(x => x["classeContatore"] === this.preventivo.ClasseContatore)["quotaFissa"]);
    this.aggiornaTotale();
  }

  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1110_GAS", this.ads);
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.Totale = 0;
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
        this.preventivo.QuotaFissa = 0;
       // this.preventivo.Istruttoria = false;
       // this.preventivo.QuotaIstruttoria = 0;
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_GAS";
        this.preventivo.QuoteItems = Params.Valori.get(keyQuote);
      }
  }

  ngAfterViewInit() {
    if(this.preventivo.Completato) {
      var slideToGo = 2;
      if(this.preventivo.Istruttoria){
        slideToGo = 1;  
      }
        setTimeout(() => {
            this.goToSlide(slideToGo);
        }
        , 500);     
      }
  }


  goToSlide(n) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(n);
    this.slides.lockSwipes(true);
  }

  updateIstruttoria() {
    if(this.preventivo.Istruttoria) {
        this.preventivo.Istruttoria = true;
        this.preventivo.QuotaIstruttoria = Number(this.valori[0]["quotaIstruttoria"]);
    } else {
        this.preventivo.Istruttoria = false;
        this.preventivo.QuotaIstruttoria = 0;
    }
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
