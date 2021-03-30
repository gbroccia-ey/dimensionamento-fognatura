import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { NavController } from 'ionic-angular';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';

/**
 * Generated class for the Lavfat1040EeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1040-ee',
  templateUrl: 'lavfat1040-ee.html'
})
export class Lavfat1040EeComponent extends BasePreventivatoreComponent implements OnInit, AfterViewInit {

  valori: Object[] = [];
  preventivo: Preventivo;
  descrizioni: string[] = [];
  prestazioneDiServizio: string = "";
  Params = Params;
  quota200_700: number = 0; 
  quota700_1200: number = 0; 
  quota1200: number = 0;
  progr: number = 0;
  totale: number = 0;


  @ViewChild(Slides) slides: Slides;

  constructor( public alertCtrl: AlertController, public adsService: AdsService, public navCtrl: NavController) {
    super(alertCtrl, adsService, navCtrl);
    this.valori = Params.Valori.get("LAVFAT1040_EE");
    this.valori.forEach(v => this.descrizioni.push(v["descrizione"]));
  }



  ngOnInit() {
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.AltreSpese = 0;
      }

      this.slides.lockSwipes(true);
  }

  ngAfterViewInit() {
    if(this.preventivo.Completato) {
        setTimeout(() => {
            this.goToSlide(1);
         }, 500);
    }

  }

  onSelectDescrChange() {
    this.valori.forEach(x => {
      if(x["descrizione"] === this.prestazioneDiServizio) {
          this.preventivo.QuotaOneriAmm = Number(x["quotaOneriAmm"]);
          this.preventivo.QuotaFissa = Number(x["quotaFissa"]);
          this.preventivo.QuotaPotenza = Number(x["quotaPotenza"]);
          
          this.quota200_700 = Number(x["quota200_700"]);
          this.quota700_1200 = Number(x["quota700_1200"]);
          this.quota1200 = Number(x["quota1200"]);
          this.progr = Number(x["progr"]);
          this.preventivo.Progressivo = Number(x["progr"]);
      }
    });
  }

  calcolaQuotaDistanza() {
    //this.preventivo.DistanzaDaCabina = Number(this.preventivo.DistanzaDaCabina);
    if(this.preventivo.DistanzaDaCabina > 999999){
      return;
    }
    
    if(this.preventivo.DistanzaDaCabina > 200 && this.preventivo.DistanzaDaCabina <= 700) {
      
      this.preventivo.QuotaDistanzaCalcolata = parseFloat(this._calcolaQuotaDistanza(this.preventivo.DistanzaDaCabina).toFixed(2));
      
    }
    else if(this.preventivo.DistanzaDaCabina > 700 && this.preventivo.DistanzaDaCabina <= 1200) {
      this.preventivo.QuotaDistanzaCalcolata = parseFloat((this._calcolaQuotaDistanza(700) + this._calcolaQuotaDistanza(this.preventivo.DistanzaDaCabina)).toFixed(2));
    }
    else if(this.preventivo.DistanzaDaCabina > 1200) {
      this.preventivo.QuotaDistanzaCalcolata = parseFloat((this._calcolaQuotaDistanza(700) + this._calcolaQuotaDistanza(1200) +
                                    this._calcolaQuotaDistanza(this.preventivo.DistanzaDaCabina)).toFixed(2));
    }
    else {
      this.preventivo.QuotaDistanzaCalcolata = 0;
    }

    this.preventivo.QuotaDistanzaDaCabina = this.calcolaQuotaDistanzaDaCabina();
    this.preventivo.QuotaDistanzaDaCabina += this.preventivo.QuotaDistanzaCalcolata;
    
  }

  _calcolaQuotaDistanza(n: number): number {
      
      var unit: number;
      var tmp: number = 0;

      if(n > 200 && n <= 700){
        unit = this.quota200_700;
        tmp = this.preventivo.DistanzaDaCabina - 200;
      } else if(n > 700 && n <= 1200) {
        unit = this.quota700_1200;
        tmp = this.preventivo.DistanzaDaCabina - 700;
      } else if(n > 1200) {
        unit = this.quota1200;
        tmp = this.preventivo.DistanzaDaCabina - 1200;
      }

      
      tmp = Math.round(tmp / 50);
      tmp = tmp * (unit / 2);
      return tmp;
  }

  calcolaQuotaDistanzaDaCabina(): number {
    var listino: number = 92.75;

    if(this.preventivo.DistanzaDaCabina <= 250) {
      return 0;
    }
    else {
      var tmp = this.preventivo.DistanzaDaCabina;
      tmp -= 250;
      var count = 0;
      while(tmp > 0) {
        tmp -= 100;
        count++;
      }
      return parseFloat((listino * count).toFixed(2));
    }

  }

  aggiornaTotale(n: number) {
    if(n === 1) {
      //tab del totale
     
        var oneriXattacchi = Number(this.preventivo.QuotaOneriAmm) * Number(this.preventivo.NumeroAttacchi);
        var quotaFissaXattacchi = Math.floor((Number(this.preventivo.QuotaFissa) * Number(this.preventivo.NumeroAttacchi)) * 100) / 100 ;
        var quotaPotenzaXkwXattacchi = 0;
        if(this.preventivo.PotenzaPrevista < 34){
          quotaPotenzaXkwXattacchi = parseFloat((Number(this.preventivo.QuotaPotenza) * Number(this.preventivo.PotenzaPrevista) * Number(this.preventivo.NumeroAttacchi)).toFixed(2));

        } else if(this.preventivo.PotenzaPrevista === 34) {
          quotaPotenzaXkwXattacchi = parseFloat((this.preventivo.QuotaPotenza * this.preventivo.PotenzaPrevistaManuale * this.preventivo.NumeroAttacchi).toFixed(2));

        }

        this.preventivo.Totale = Number(oneriXattacchi) + Number(quotaFissaXattacchi) + Number(quotaPotenzaXkwXattacchi);

         if(this.progr < 3) {
          //var distanzaXnumeroAttacchi =  this.preventivo.DistanzaDaCabina * this.preventivo.NumeroAttacchi;
          var distanzaCalcolataXattacchi = this.preventivo.QuotaDistanzaCalcolata * this.preventivo.NumeroAttacchi;
          var distanzaDaCabina = this.preventivo.QuotaDistanzaDaCabina * this.preventivo.NumeroAttacchi;
          this.preventivo.Totale += Number(distanzaCalcolataXattacchi) + Number(distanzaDaCabina);
         }

         this.preventivo.Totale += Number(this.preventivo.AltreSpese);
         this.preventivo.Totale = parseFloat(this.preventivo.Totale.toFixed(2));
    }
  }

  goToSlide(n) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(n);
    this.slides.lockSwipes(true);
    
    this.aggiornaTotale(1);
  }




}
