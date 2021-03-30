import { Component, OnInit } from '@angular/core';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';

/**
 * Generated class for the Lavfat1610AcquaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavfat1610-acqua',
  templateUrl: 'lavfat1610-acqua.html'
})
export class Lavfat1610AcquaComponent extends BasePreventivatoreComponent implements OnInit{


  valori: Object[] = [];
  preventivo: Preventivo;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public adsService: AdsService) {
                
                super(alertCtrl, adsService, navCtrl);
                
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa)
    + Number(this.preventivo.Cer)
    + Number(this.preventivo.Cvv)
    + Number(this.preventivo.AltreSpese)
    + Number(this.preventivo.Cif); 
  }

  ngOnInit() {
    this.valori = Params.getValoriWrapper("LAVFAT1610_ACQUA", this.ads);

    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
    }
    else {
        this.preventivo = new Preventivo(); 
        this.preventivo.QuotaFissa = Number(this.valori[0]["quotaFissa"]);
        this.preventivo.Totale = Number(this.preventivo.QuotaFissa);
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.Cif = 0;
        this.preventivo.AltreSpese = 0;
    }
  }

  updateCer(result) {
    this.preventivo.Cer = result;
    this.aggiornaTotale();
  }
  
  updateCvv(result) {
    this.preventivo.Cvv = result;
    this.aggiornaTotale();
  }

}
