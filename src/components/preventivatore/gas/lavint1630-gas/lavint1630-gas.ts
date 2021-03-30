import { Component,  OnInit } from '@angular/core';
import { Preventivo } from '../../../../models/preventivo';
import { Params } from '../../../../config/params';
import { BasePreventivatoreComponent } from '../../base-preventivatore/base-preventivatore';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../../services/ads-service';
/**
 * Generated class for the Lavint1630GasComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lavint1630-gas',
  templateUrl: 'lavint1630-gas.html'
})
export class Lavint1630GasComponent extends BasePreventivatoreComponent implements OnInit {

  preventivo: Preventivo;
  tipo_interruzione: Array<Object>;
  valori: Object[] = [];
  list_cif;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
    this.preventivo = new Preventivo();
  }

  updateQuota() {
    this.preventivo.QuotaFissa = Number(this.valori.find(x => x["tipoInterruzione"] === this.preventivo.TipoInterruzione)["quotaFissa"]);
    this.preventivo.Cif = this.calcolaCif(this.preventivo.TipoInterruzione);
    this.aggiornaTotale();
  }

  calcolaCif(cif){
    for(let item of this.list_cif){
      if(item.tipoInterruzione == cif) {
        return item.quotaFissa;
      }
    }
    return 0;
  }

  aggiornaTotale() {
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese) + Number(this.preventivo.Cif);
  }

  ngOnInit() {
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      }
      else {
        this.preventivo = new Preventivo();
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.Cif = 0;
        this.preventivo.AltreSpese = 0;
        this.list_cif = Params.getValoriWrapper("CIF");
      }

      this.valori = Params.getValoriWrapper(`${this.ads.ProdServizio}_GAS`, this.ads);
      this.tipo_interruzione = [];
      this.valori.forEach(x => {
          if(x["label"]==this.ads.Caratteristiche.TipoTaglio) this.preventivo.TipoInterruzione = x["tipoInterruzione"];
          this.tipo_interruzione.push({label: x["tipoInterruzione"], value: x["tipoInterruzione"]});
      });
      if(this.preventivo.TipoInterruzione)
        this.updateQuota();

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
