import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {LogManager } from '../../providers/log-manager/logManager';
import { Stato} from '../../models/ads';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';


declare var signSvg;

/**
 * 
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modalefirma',
  templateUrl: 'modalefirma.html',
})
export class ModalefirmaPage {

  testo;
  testo_letto;
  tipo;
  ads;
  signature = "";
  signatureOperator = "";
  whoNeedToSignText;
  disablePrevSign;
  showCloseBtn = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, 
              public LogManager: LogManager,public widgets: WidgetManager) {

   

    }

  ionViewDidLoad() {
    this.whoNeedToSignText = "Utente";
    this.LogManager.info("modalnotes - ionViewDidLoad");
    this.startSvg();
  
  }

  startSvg(){
      signSvg.draw(480, 350);
      signSvg.drawFree();
  }

    savePad() {
        this.LogManager.info("previw-pdf-two-signature - savePad");
        var self = this;
        self.clearPad();
        if (self.signature != "") { 
          self.widgets.doWithDefaultLoader((loader) => {
            signSvg.getBase64(480, 350, function(base64){
                  self.signatureOperator = base64.image;
                  self.SalvaFirme();
                  loader.dismiss();
            });
             
          });
        }
        else{
            self.whoNeedToSignText = "Tecnico";
            self.disablePrevSign = true;
            signSvg.getBase64(480, 350, function(base64){
                  self.disablePrevSign = false;
                  self.showCloseBtn = true;
                  self.signature = base64.image;
            });
        }
    }

    clearPad() {
      signSvg.clean(480, 350);
    }


  SalvaFirme(){
    var obj = {signature: this.signature, signatureOperator: this.signatureOperator};
    this.viewCtrl.dismiss(obj);
  }

}
