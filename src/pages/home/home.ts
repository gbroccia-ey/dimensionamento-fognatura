import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DimensionamentoAllacciPage } from '../dimensionamento-allacci/dimensionamento-allacci';
import { Ads,SettoreMerceologico,DettaglioMerceologico } from '../../models/ads';
import { Caratteristiche } from '../../models/caratteristiche';
import { Cliente } from '../../models/cliente';
import { Indirizzo } from '../../models/indirizzo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ads:Ads;

  constructor(public navCtrl: NavController) {
    this.populateAds()
  }

  openDimensionamentoAllacci() {
    this.navCtrl.push(DimensionamentoAllacciPage, this.ads);
  }

  populateAds(){
    this.ads = new Ads();

    this.ads.CodiceAds = "TestCodeAds"
    this.ads.CodiceOdl = "TestCodeOdl"
    this.ads._altro1 = JSON.stringify({
      societa:5010
    }); 
    this.ads.SettoreMerceologico = SettoreMerceologico.ACQUA;
    this.ads.DettaglioMerceologico = DettaglioMerceologico.FOGNATURA;
    this.ads.Caratteristiche = new Caratteristiche();
    this.ads.Cliente = new Cliente("cognome","nome","rag_soc","codCli","01234567","a@b.it",
                  new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO"));
    this.ads.Indirizzo = new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO");
    
    this.ads._base64Img = [];
    
  }


}
