import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Ads } from '../../../models/ads';
import { AlertController } from 'ionic-angular';
import { AdsService } from '../../../services/ads-service';
import { NavController } from 'ionic-angular';
import { Preventivo } from '../../../models/preventivo';
import { Strings } from '../../../config/strings';

/**
 * Generated class for the BasePreventivatoreComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'base-preventivatore',
  templateUrl: 'base-preventivatore.html'
})
export class BasePreventivatoreComponent {

  preventivo: Preventivo;

  openModal;

  @Input()
  ads: Ads;

  @Output() 
  confermaPreventivo: EventEmitter<Preventivo>;

  cerCalc: number = 0;
  
  cerEnabled: boolean = false;
  cerEdited: boolean = false;

  cvvEnabled: boolean = false;
  cvvEdited: boolean = false;

  copEdited: boolean = false;
  copEnabled: boolean = false;

  derogaEdited: boolean = false;
  derogaEnabled: boolean = false;

  quoteEdited: boolean = false;
  quoteEnabled: boolean = false;

  constructor(public alertCtrl: AlertController, public adsService: AdsService, public navCtrl: NavController) {
      this.confermaPreventivo = new EventEmitter<Preventivo>();
  }


  conferma_Preventivo() {
    if(this.cerEnabled && !this.cerEdited) {
      let alert = this.alertCtrl.create({
        title: 'Cer mancante',
        subTitle: 'Compila il campo Cer',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.cvvEnabled && !this.cvvEdited) {
      let alert = this.alertCtrl.create({
        title: 'Cvv mancante',
        subTitle: 'Compila il campo Cvv',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.copEnabled && !this.copEdited && !this.preventivo._hasCop) {
      let alert = this.alertCtrl.create({
        title: 'Cop mancante',
        subTitle: 'Compila il campo Cop',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(!this.preventivo.Totale) {
      let alert = this.alertCtrl.create({
        title: 'Totale mancante',
        subTitle: 'Il totale non è stato generato. Prova a reinserire i dati.',
        buttons: ['OK']
      });
      alert.present();
    }

    else {

      let alert = this.alertCtrl.create({
        title: 'Conferma preventivo',
        subTitle: 'Questa azione provvederà a valorizzare il preventivo secondo i dati inseriti. Confermi l\'inserimento?',
        buttons: [{
          text: 'Annulla',
          handler: () => {}
        },
        {
          text: 'OK',
          handler: () => {
            this.preventivo.Completato = true;
            this.confermaPreventivo.emit(this.preventivo);
          }
        }
      ]
      });
      alert.present();

    }
   
  }

  
  enabledCheck(value:boolean){
    this.cerEnabled = value;
  }

  isEdited(value: boolean) {
    this.cerEdited = value;
  }

  enabledCvvCheck(value:boolean){
    this.cvvEnabled = value;
  }

  isCvvEdited(value: boolean) {
    this.cvvEdited = value;
  }

  isCopEdited(value: boolean) {
    this.copEdited = value;
  }

  isDerogaEdited(value: boolean) {
    this.derogaEdited = value;
  }

  isQuoteEdited(value: boolean) {
    this.quoteEdited = value;
  }
  
  enabledCopCheck(value: boolean) {
    this.copEnabled = value;
    this.preventivo._hasCop = true;
  }

  enabledDerogaCheck(value: boolean) {
    this.derogaEnabled = value;
    this.preventivo._hasDeroga = true;
  }

  reset() {
    let confirm = this.alertCtrl.create({
      title: Strings.confirmDeletePreventivoTitle,
      message: Strings.confirmDeletePreventivoMessage,
      buttons: [
        {
          text: 'Annulla',
          handler: () => {
            
          }
        },
        {
          text: 'OK',
          handler: () => {
            //this.navCtrl.push(PreventivatorePage, {ads:this.ads});
            this.adsService.updateAds(this.ads, {Preventivo: null}, () => {}, () => {});
            this.navCtrl.pop();
            
          }
        }
      ]
    });
    confirm.present();
  }



}
