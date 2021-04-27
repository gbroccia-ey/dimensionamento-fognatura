import { Component } from '@angular/core';
import {  NavParams,ViewController } from 'ionic-angular';
import { Ads } from '../../models/ads';
/**
 * Generated class for the ModalImportaVerbalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-importa-verbale',
  templateUrl: 'modal-importa-verbale.html',
})
export class ModalImportaVerbalePage {

  ads: Ads[];
  
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(navParams.data.ads) {
      this.ads = navParams.data.ads;
    }
  
  } 

  ionViewDidLoad(){
      document.getElementsByClassName('modal-wrapper')[0].setAttribute('style', 'width:100vw;height:100vh;left:0;top:0;');  
  }

  dismiss(a: Ads) {
    this.viewCtrl.dismiss({
    "ads": a });
  }

}
