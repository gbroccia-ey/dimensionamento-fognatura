import { Component, OnInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
/**
 * Generated class for the Lavint1610AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavint1610-acqua',
  templateUrl: 'lavint1610-acqua.html'
})
export class Lavint1610AcquaComponent extends BasePreventivatoreComponent implements OnInit{

  preventivo: Preventivo;
  valori: Object[] = [];

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
    this.valori = Params.getValoriWrapper("LAVINT1610_ACQUA", this.ads);
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
  }

  aggiornaTotale() {
    this.preventivo.QuotaFissa = Number(this.valori.find(x => x["condizione"] === this.preventivo.Condizione)["quotaFissa"]);
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese);
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
