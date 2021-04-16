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
    {value: Params.TipoPresaImpulsiva.AUTOALIMENTATA, label: 'Autoalimentata'},
    {value: Params.TipoPresaImpulsiva.ALIMENTATA, label: 'Alimentazione da rete elettrica'}
  ]
  fornituraInstallazioneValues = [
    {value: Params.TipoFornituraInstallazione.CONTESTUALE, label: 'Contestuale'},
    {value: Params.TipoFornituraInstallazione.SUCCESSIVA, label: 'Successiva'}
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
      }
      else {
        this.preventivo = new Preventivo();
        this.presaImpulsiva = this.ads?.Caratteristiche?.PresaImpulsiva;
        this.fornituraInstallazione = this.ads?.Caratteristiche?.FornituraInstallazione;
        this.preventivo.Cer = 0;
        this.preventivo.Cvv = 0;
        this.preventivo.Cif = 0;
        this.preventivo.AltreSpese = 0;
        // this.list_cif = Params.getValoriWrapper("CIF");
      }
      this.retrievePresaFornitura()
      this.updateQuota();

  }

  ionViewDidLoad(){
    this.presaImpulsiva = this.presaImpulsiva;
    this.fornituraInstallazione = this.fornituraInstallazione;
  }

  updateQuota() {
    
    if (this.fornituraInstallazione !== '' && this.presaImpulsiva !== '') {
      this.preventivo.QuotaFissa = this.updatePresaFornitura();
      this.preventivo.TipoInterruzione = this.presaImpulsiva+'/'+this.fornituraInstallazione;
    }

    this.aggiornaTotale();
  }

  updatePresaFornitura () {
    // Updates the price from a combination of values
    var key = this.presaImpulsiva + this.fornituraInstallazione
    var value = 0;
    switch (key) {
      case  Params.TipoPresaImpulsiva.AUTOALIMENTATA+Params.TipoFornituraInstallazione.CONTESTUALE:
        value = 412
        break;
      case Params.TipoPresaImpulsiva.AUTOALIMENTATA+Params.TipoFornituraInstallazione.SUCCESSIVA:
        value =  834
        break;
      case Params.TipoPresaImpulsiva.ALIMENTATA+Params.TipoFornituraInstallazione.CONTESTUALE:
        value =  301
        break;
      case Params.TipoPresaImpulsiva.ALIMENTATA+Params.TipoFornituraInstallazione.SUCCESSIVA:
        value =  670
        break;
      
    }
    return value;
  }

  aggiornaTotale() {
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

  retrievePresaFornitura() {
    // retrieves existing values for presaimpulsiva and forniturainstallazione from previously saved ads.preventivo.presafornitura price
    switch (this.preventivo.TipoInterruzione) {
      case  Params.TipoPresaImpulsiva.AUTOALIMENTATA+Params.TipoFornituraInstallazione.CONTESTUALE:
        this.presaImpulsiva = Params.TipoPresaImpulsiva.ALIMENTATA;
        this.fornituraInstallazione = Params.TipoFornituraInstallazione.CONTESTUALE;
        break;
      case Params.TipoPresaImpulsiva.AUTOALIMENTATA+Params.TipoFornituraInstallazione.SUCCESSIVA:
        this.presaImpulsiva = Params.TipoPresaImpulsiva.ALIMENTATA;
        this.fornituraInstallazione = Params.TipoFornituraInstallazione.SUCCESSIVA;
        break;
      case Params.TipoPresaImpulsiva.ALIMENTATA+Params.TipoFornituraInstallazione.CONTESTUALE:
        this.presaImpulsiva = Params.TipoPresaImpulsiva.AUTOALIMENTATA;
        this.fornituraInstallazione = Params.TipoFornituraInstallazione.CONTESTUALE;
        break;
      case Params.TipoPresaImpulsiva.ALIMENTATA+Params.TipoFornituraInstallazione.SUCCESSIVA:
        this.presaImpulsiva = Params.TipoPresaImpulsiva.AUTOALIMENTATA;
        this.fornituraInstallazione = Params.TipoFornituraInstallazione.SUCCESSIVA
        break;

    }
  }


}
