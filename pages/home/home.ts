import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DimensionamentoAllacciPage } from '../dimensionamento-allacci/dimensionamento-allacci';
import { Ads } from '../../models/ads';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ads:Ads;

  constructor(public navCtrl: NavController) {
    this.ads = new Ads();
    
  }

  openDimensionamentoAllacci() {
    this.navCtrl.push(DimensionamentoAllacciPage, this.ads);
  }

}
