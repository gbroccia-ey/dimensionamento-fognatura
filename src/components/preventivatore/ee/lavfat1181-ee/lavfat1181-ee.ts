import { Component } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { NavController } from 'ionic-angular';
import { Params } from '../../../../config/params';
import { Preventivo } from '../../../../models/preventivo';

/**
 * Generated class for the lavfat1181EeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1181-ee',
  templateUrl: 'lavfat1181-ee.html'
})
export class Lavfat1181EeComponent extends BasePreventivatoreComponent {

  valori: Object;
  preventivo: Preventivo;

  constructor(public alertCtrl: AlertController, public adsService: AdsService, public navCtrl: NavController) {
    super(alertCtrl, adsService, navCtrl);
    this.valori = Params.Valori.get("LAVFAT1181_EE")[0];
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa)  + Number(this.preventivo.AltreSpese);
  }

  ngOnInit() {
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.QuotaFissa = Number(this.valori["quotaFissa"]);
        this.preventivo.Totale = Number(this.preventivo.QuotaFissa);
        this.preventivo.AltreSpese = 0;
      }

  }


}
