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
  selector: 'lavfat1631-gas',
  templateUrl: 'lavfat1631-gas.html'
})
export class Lavfat1631GasComponent extends BasePreventivatoreComponent implements OnInit {

  presaImpulsivaValues = [
    {value: 'autoalim', label: 'Autoalimentata'},
    {value: 'alim', label: 'Alimentazione da rete elettrica'}
  ]
  fornituraInstallazioneValues = [
    {value: 'contest', label: 'Contestuale'},
    {value: 'succ', label: 'Successiva'}
  ]

  preventivo: Preventivo;
  tipo_interruzione: Array<Object>;
  valori: Object[] = [];
  list_cif;

  presaImpulsiva: string;
  fornituraInstallazione: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public adsService: AdsService) {
    super(alertCtrl, adsService, navCtrl);
    this.preventivo = new Preventivo();
  }

  ngOnInit() {
    if(this.ads.Preventivo) {
      this.preventivo = this.ads.Preventivo;
      this.retrievePresaFornitura()
      }
      else {
        this.preventivo = new Preventivo();
        this.presaImpulsiva = ''
        this.fornituraInstallazione = ''
        this.preventivo.PresaFornitura = 0
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

  updateQuota() {
    if (this.preventivo.TipoInterruzione !== undefined){
      this.preventivo.QuotaFissa = Number(this.valori.find(x => x["tipoInterruzione"] === this.preventivo.TipoInterruzione)["quotaFissa"]);
      this.preventivo.Cif = this.calcolaCif(this.preventivo.TipoInterruzione);
    }

    if (this.fornituraInstallazione !== '' && this.presaImpulsiva !== '') {
      this.updatePresaFornitura()
    }

    this.aggiornaTotale();
  }

  updatePresaFornitura () {
    // Updates the price from a combination of values
    var key = this.presaImpulsiva + this.fornituraInstallazione
    
    switch (key) {
      case '':
        this.preventivo.PresaFornitura = 0
        break;
      case 'autoalimcontest':
        this.preventivo.PresaFornitura = 412
        break;
      case 'autoalimsucc':
        this.preventivo.PresaFornitura = 834
        break;
      case 'alimcontest':
        this.preventivo.PresaFornitura = 301
        break;
      case 'alimsucc':
        this.preventivo.PresaFornitura = 670
        break;
      default:
        this.preventivo.PresaFornitura = 0
        break;
    }
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
    this.preventivo.Totale = Number(this.preventivo.QuotaFissa) + Number(this.preventivo.Cer) + Number(this.preventivo.Cvv) + Number(this.preventivo.AltreSpese) 
                            + Number(this.preventivo.Cif) + Number(this.preventivo.PresaFornitura);
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

  retrievePresaFornitura() {
    // retrieves existing values for presaimpulsiva and forniturainstallazione from previously saved ads.preventivo.presafornitura price
    switch (this.preventivo.PresaFornitura) {
      case 412:
        this.presaImpulsiva = 'alim'
        this.fornituraInstallazione = 'contest'
        break;
      case 834:
        this.presaImpulsiva = 'alim'
        this.fornituraInstallazione = 'succ'
        break;
      case 301:
        this.presaImpulsiva = 'autoalim'
        this.fornituraInstallazione = 'contest'
        break;
      case 670:
        this.presaImpulsiva = 'autoalim'
        this.fornituraInstallazione = 'succ'
        break;
      default:
        this.presaImpulsiva = ''
        this.fornituraInstallazione = ''
        break;
    }
  }
}
