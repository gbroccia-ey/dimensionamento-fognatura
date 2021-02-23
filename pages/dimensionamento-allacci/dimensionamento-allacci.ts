import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ads, SettoreMerceologico } from '../../models/ads';

declare var imgExample: any;

/**
 * Generated class for the DimensionamentoAllacciPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-dimensionamento-allacci',
  templateUrl: 'dimensionamento-allacci.html',
})
export class DimensionamentoAllacciPage{

  ads: Ads;  
  SettoreMerceologico = SettoreMerceologico;
  logo;
  comune = "";
  indirizzo = "";
  codiceCliente = "";
  nome = "";
  cognome = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.ads = navParams.data;
    /*
    this.logo = imgExample.getLogoDxHera();
    if(this.ads.SettoreMerceologico == SettoreMerceologico["ENERGIA_ELETTRICA"] || 
       this.ads.SettoreMerceologico == SettoreMerceologico["GAS"]){
        this.logo = imgExample.getLogoDxInRete();
    }
    */
    this.logo = this.ads.Logo;

    if(this.ads.Indirizzo && this.ads.Indirizzo.Citta){
      this.comune = this.ads.Indirizzo.Citta;
    }

    if(this.ads.Indirizzo){
      try{
        this.indirizzo = this.ads.Indirizzo.toString();
      }catch(err){

      }
    }

    if(this.ads.Cliente){
      try{
        this.codiceCliente = this.ads.Cliente.CodiceCliente;
      }catch(err){

      }
      try{
        this.nome = this.ads.Cliente.Nome;
      }catch(err){}
      try{
        this.cognome = this.ads.Cliente.Cognome? this.ads.Cliente.Cognome: this.ads.Cliente.RagioneSociale;
      }catch(err){}
      
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DimensionamentoAllacciPage');
  }

  updateDimensionamentoAllacci(response) {
    /*
    if(this.ads.SettoreMerceologico === SettoreMerceologico.ACQUA) {
      this.adsService.updateAds(this.ads, 
        {DimensionamentoAllacciAcqua: this.ads.DimensionamentoAllacciAcqua},
        () => {}, (err) => {console.log(err);});
    }
    if(this.ads.SettoreMerceologico === SettoreMerceologico.GAS) {
      this.adsService.updateAds(this.ads, 
        {DimensionamentoAllacciGas: this.ads.DimensionamentoAllacciGas},
        () => {}, (err) => {console.log(err);});
    }
    if(this.ads.SettoreMerceologico === SettoreMerceologico.ENERGIA_ELETTRICA) {
      this.adsService.updateAds(this.ads, 
        {DimensionamentoAllacciEE: this.ads.DimensionamentoAllacciEE},
        () => {}, (err) => {console.log(err);});
    }
    */
    this.navCtrl.pop();
  }


}
