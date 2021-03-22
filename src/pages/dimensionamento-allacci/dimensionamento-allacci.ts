import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ads, SettoreMerceologico } from '../../models/ads';
import { PdfManager, PdfResult } from '../../providers/pdfManager';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';

import {LogManager } from '../../providers/log-manager/logManager';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';

import { PreviewPdfNoSignatures } from '../preview-pdf-no-signature/preview-pdf-no-signature';
import { FascicoloTecnico } from '../../../models/FascicoloTecnico';


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

  nomePdf;
  blobPDF;
  formFT : FascicoloTecnico;

  constructor(public navCtrl: NavController, 
              public widgets: WidgetManager, 
              public pdfManager: PdfManager,
              public LogManager: LogManager,
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
    this.navCtrl.pop();
    */
    this.Crea_pdf_internal();
  }


  Crea_pdf_internal(){
    this.LogManager.info("Test - Crea_pdf");
    var nomePdfPartial = "Fascicolo tecnico";
    var  model = "fascicoloTecnico";
    
    this.formFT = new FascicoloTecnico(this.ads,"","","");
    this.formFT._imagesPlanimetria = [];
    this.formFT._imagesAltre = [];
      
    
      var item:
        {      
          data: { today: string },        
          download: { needDownload: boolean, pdfName: string, ads: object },    
          dati: {form: Object},
          immagine: {  }
        }
        =
        {
          data: { today: "timeWrite"},       
          download: {
            needDownload: false,
            pdfName: this.nomePdf,
            ads: this.ads
          },
          dati: {form: this.formFT},
          immagine: {  }  
        };
  
  
  
  
      var pdfCreatedSuccess = (result: PdfResult) => {
  
        
      }
  
      
  
      this.pdfManager.pdfCreate(model, item).then(
        url => {
          var bean: PrinterSignatureBean = new PrinterSignatureBean();
          bean.dataTemporaryUser = item;
          //bean.url = url.url;
          bean.url = url;
          bean.showDelegateFlag = false;
          bean.title = nomePdfPartial;
          bean.postprocessTypology = model;
          bean.pdfBean = item;
          this.blobPDF = url.blob;
          bean.succCallback = pdfCreatedSuccess;
          bean.adsToReturn = this.ads;
  
          this.navCtrl.push(
            PreviewPdfNoSignatures,
            { bean: bean }
          );
  
        }, (err) => {
          alert(err);
        }
      );
  
    }


}
