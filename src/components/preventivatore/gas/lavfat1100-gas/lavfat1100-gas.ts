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
 * Generated class for the Lavfat1100GasComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1100-gas',
  templateUrl: 'lavfat1100-gas.html'
})
export class Lavfat1100GasComponent extends BasePreventivatoreComponent implements OnInit, AfterViewInit {

  @ViewChild(Slides) slides: Slides;

  preventivo: Preventivo;
  valori: Object[] = [];
  classiContatore = [];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);


  }


  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1100_GAS", this.ads);
    this.valori.forEach(v => {
      this.classiContatore.push(v);
    });
    if (this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
    }
    else {
      this.preventivo = new Preventivo();
      this.preventivo.Totale = 0;
      this.preventivo.AltreSpese = 0;
      this.preventivo.QuotaFissa = 0;
      this.preventivo.QuotaContatore = 0;
      this.preventivo.Cop = 0;
      this.preventivo.Cer = 0;
      this.preventivo.Cvv = 0;

      this.preventivo.Rifacimento = false;
      this.preventivo.Quote = { "Totale": 0 };
      let keyQuote = "QUOTE_" + this.ads.ProdServizio + "_GAS";
      this.preventivo.QuoteItems = Params.getValoriWrapper(keyQuote, this.ads);
      this.aggiornaTotale();
    }
  }


  ngAfterViewInit() {
    if (this.preventivo.Completato) {
      var slideToGo = 3;
      if (this.preventivo.Istruttoria) {
        slideToGo = 1;
      }
      setTimeout(() => {
        this.goToSlide(slideToGo);
      }
        , 500);
    }

    setTimeout(() => {
      this.aggiornaTotale();
    }, 500);
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.AltreSpese) + Number(this.preventivo.QuotaContatore);
    this.preventivo.Totale += Number(this.preventivo.Cop) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv);
  }


  goToSlide(n) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(n);
    this.slides.lockSwipes(true);

  }

  updateIstruttoria() {
    if (this.preventivo.Istruttoria) {
      this.preventivo.Istruttoria = true;
      this.preventivo.QuotaIstruttoria = Number(this.valori[0]["quotaIstruttoria"]);
    } else {
      this.preventivo.Istruttoria = false;
      this.preventivo.QuotaIstruttoria = 0;
    }
    this.aggiornaTotale();

  }

  goToRifacimento() {
    if (this.preventivo.Rifacimento) {
      this.preventivo.QuotaFissa = this.valori[0]["quotaFissa"];
      this.preventivo.Totale = this.preventivo.QuotaFissa;
    }
    else {
      this.preventivo.QuotaFissa = 0;
    }
    this.goToSlide(1);
    this.aggiornaTotale();
  }

  onClasseContatoreChange() {
    this.preventivo.QuotaContatore = Number(this.valori.find(v => v["classeContatore"] === this.preventivo.ClasseContatore)["quotaVariabile"]);
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

  updateCop(res: any) {
    let result = res.result;
    if (typeof result === "string") {
      result.replace(",", ".");
    }
    this.preventivo.Cop = +result;
    this.ads.CopInfo = res.copinfo;
    this.adsService.updateAds(this.ads, { CopInfo: res.copinfo }, () => { }, () => { });
    this.aggiornaTotale();
  }

  updateQuote(res: any) {
    this.preventivo.Quote = res;
    if (res && res.Totale) {
      this.preventivo.AltreSpese = this.preventivo.Quote.Totale;
    }
    else {
      this.preventivo.AltreSpese = 0;
    }
    if (this.preventivo.Deroga && this.preventivo.Deroga.Totale) {
      this.preventivo.AltreSpese += this.preventivo.Deroga.Totale;
    }

    this.adsService.updateAds(this.ads, { Quote: res }, () => { }, () => { });
    this.aggiornaTotale();
  }

}
