import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

/**
 * Generated class for the Lavfat1110AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1110-acqua',
  templateUrl: 'lavfat1110-acqua.html'
})
export class Lavfat1110AcquaComponent extends BasePreventivatoreComponent implements OnInit, AfterViewInit{

  valori: Object[] = [];
  preventivo: Preventivo;
  
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);
                
  }

  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1110_ACQUA", this.ads);

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
    else {
        this.preventivo = new Preventivo();
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.Deroga = {"Totale":0};
        this.preventivo.Quote = {"Totale":0};
        let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_ACQUA";
        this.preventivo.QuoteItems = Params.Valori.get(keyQuote);
        this.preventivo.AltreSpese = 0; 
    }

    this.slides.lockSwipes(true);
  }

  aggiornaTotale() {
    if(this.preventivo.Istruttoria) {
      this.preventivo.Totale = Number(this.preventivo.QuotaIstruttoria);
    }
    else {
      this.preventivo.Totale = Number(this.preventivo.QuotaContatore);      
    }
    this.preventivo.Totale += Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
  }

  goToSlide(n) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(n);
    this.slides.lockSwipes(true);

    if(n === 1) {
      if(!this.preventivo.Completato) {
        
        if(this.preventivo.Istruttoria) {
          this.preventivo.Istruttoria = true;
          this.preventivo.QuotaIstruttoria = 25;
          this.preventivo.QuotaContatore = 0;
          this.preventivo.Totale = Number(this.preventivo.QuotaIstruttoria);
        }
        else {
          this.preventivo.Istruttoria = false;
           this.preventivo.QuotaIstruttoria = 0;
          var row = this.valori.find(x => x["classeContatore"] === this.preventivo.ClasseContatore);
          this.preventivo.QuotaContatore = row["quotaVariabile"];
          //this.preventivo.QuotaIstruttoria = row["quotaIstruttoria"];
          this.preventivo.Totale = Number(this.preventivo.QuotaContatore);
        }

        this.aggiornaTotale();
        
      }   
    }
    
  }

  ngAfterViewInit() {
    if(this.preventivo.Completato) {
        setTimeout(() => {
            this.goToSlide(2);

        }, 500);
        
      }
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

  updateCer(result) {
    this.preventivo.Cer = result.result;
    this.preventivo.NumeroCer = result.number;
    this.aggiornaTotale();
  }
  
  updateCvv(result) {
    this.preventivo.Cvv = result;
    this.aggiornaTotale();
  }

}
