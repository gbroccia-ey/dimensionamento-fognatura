import { Component, OnInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { NavController } from 'ionic-angular';

import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
/**
 * Generated class for the Lavfat1100EeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1100-ee',
  templateUrl: 'lavfat1100-ee.html'
})
export class Lavfat1100EeComponent extends BasePreventivatoreComponent implements OnInit {

  preventivo: Preventivo;
  valori: Object;
  Params = Params;

  constructor(public alertCtrl: AlertController, public adsService: AdsService, public navCtrl: NavController) {
    super(alertCtrl, adsService, navCtrl);
    this.valori = Params.Valori.get("LAVFAT1100_EE");
     
  }

  aggiornaTotale() {
    if(this.preventivo.PotenzaPrevista < 34) {
      this.preventivo.Totale = parseFloat((Number(this.preventivo.QuotaOneriAmm) + (Number(this.preventivo.QuotaPotenza) * Number(this.preventivo.PotenzaPrevista))).toFixed(2))
                                + Number(this.preventivo.AltreSpese);
    }
    else {
      this.preventivo.Totale = parseFloat((Number(this.preventivo.QuotaOneriAmm) + Number(this.preventivo.QuotaPotenza * this.preventivo.PotenzaPrevistaManuale)).toFixed(2))
                                + Number(this.preventivo.AltreSpese);
    }
    
  }

  ngOnInit() {
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaOneriAmm = this.valori[0]["quotaOneriAmm"];
        this.preventivo.QuotaPotenza = this.valori[0]["quotaPotenza"];
        this.preventivo.Totale = 0;
        this.preventivo.AltreSpese = 0;
      }
  }


}
