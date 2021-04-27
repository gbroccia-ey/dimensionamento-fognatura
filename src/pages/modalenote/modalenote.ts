import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {LogManager } from '../../providers/log-manager/logManager';
import { Stato} from '../../models/ads';
 
/**
 * Generated class for the ModalenotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modalenote',
  templateUrl: 'modalenote.html',
})
export class ModalenotePage {

  testo;
  testo_letto;
  tipo;
  ads;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, 
              public LogManager: LogManager) {

    if(navParams.get('testo') != undefined)
      this.testo = navParams.get('testo');
    this.ads = navParams.get('ads');

    }

  ionViewDidLoad() {
    this.LogManager.info("modalnotes - ionViewDidLoad");
    if(this.testo != undefined)
    {
      var txt =  document.getElementById('testo_nota') as HTMLInputElement; 
          txt.innerHTML = this.testo;
    }
  
  }

  checkStato(){
     if(this.ads.Stato == Stato["SOPRALLUOGO_ANNULLATO"] || this.ads.Stato == Stato["SOPRALLUOGO_CONCLUSO"]) return true;
     return false;
  }

  SalvaNote(){
    this.testo_letto = document.getElementById("testo_nota") as HTMLImageElement;
    this.testo = this.testo_letto.value; 
    var obj = {testo: this.testo};
    this.viewCtrl.dismiss(obj);
    this.LogManager.info("modalnotes - SalvaNote", this.testo);
  }

}
