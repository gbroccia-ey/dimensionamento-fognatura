import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Ads, SettoreMerceologico, DettaglioMerceologico } from '../../models/ads';
import { Preventivo } from '../../models/preventivo';
import { AdsService } from '../../services/ads-service';
import { AdsSync } from '../../services/ads-synchronizer';
import {LogManager } from '../../providers/log-manager/logManager';

import { Utils } from '../../utils/utils';
import 'rxjs/add/operator/map';
import { PreviewPdfNoSignatures } from '../preview-pdf-no-signature/preview-pdf-no-signature';
import { DocUtils } from '../../config/docUtils';
import { PdfManager, PdfResult } from '../../providers/pdfManager';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';

//import { AdsdetailsPage } from '../adsdetails/adsdetails';

import { ItemId } from '../../models/queue-item';


declare var fileUtil: any;
declare var imgExample: any;

/**
 * Generated class for the PreventivatorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-preventivatore',
  templateUrl: 'preventivatore.html',
})
export class PreventivatorePage {

  ads: Ads;
  SettoreMerceologico = SettoreMerceologico;
  renderView: string;
  canGoBack: boolean = true;
  nomePdf;
  formFT;

  blobPDF;


 public unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
              public adsService: AdsService, public adsSync: AdsSync, public LogManager: LogManager, public viewCtrl:ViewController,
              public widgets: WidgetManager,public pdfManager: PdfManager,
              ) {
    this.ads = navParams.get('ads');
    this.renderView = this.renderView_();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreventivatorePage');
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidEnter() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
           if(document.getElementById('closeModal')!=undefined){
              document.getElementById('closeModal').click();
           }
      else this.naviga_back();     
      }, 10);
  }

   naviga_back(){
   if(this.canGoBack){
      this.canGoBack = false;
      this.navCtrl.pop();
    } 
  }

  invia_preventivo(path, filename){
     let oggetto_allegato = {
               File: " ", 
               NomeFile: " ",
               Path: " ",
               OdL: " ",
               TipoDoc: " "
             };
         oggetto_allegato.File = "";
         oggetto_allegato.Path = path;
         oggetto_allegato.NomeFile = filename;
         oggetto_allegato.OdL = this.ads.CodiceOdl;

     oggetto_allegato.TipoDoc = "Z_PDF";
     let itemId: ItemId = ItemId.create(this.ads.CodiceAds, this.ads.CodiceOdl);
     this.adsSync.execute(itemId, "uploadAllegati", oggetto_allegato);
 }

  Crea_pdf_internal(preventivo){
    var nomePdfPartial = "preventivo";
    var  model = "PreventivoPDF";   
    var today = new Date();
    var timeWrite = (today.getDate()) + "-" + (today.getMonth() + 1) + "-" + (today.getFullYear());
    var strDate = today.getDay()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds();
    //Object
    this.nomePdf = model+"_"+this.ads.Id+"_"+strDate+".pdf";
    
    for(let key in this.formFT) {
      if(this.formFT[key] == undefined || this.formFT[key] == null || this.formFT[key] =="")
        this.formFT[key] = " ";
    } 

    var item:
        {      
          data: { today: string },        
          download: { needDownload: boolean, pdfName: string, ads: object },    
          dati: {form: Object},
          immagine: {  }
        }
        =
        {
          data: { today: timeWrite},       
          download: {
            needDownload: false,
            pdfName: this.nomePdf,
            ads: this.ads
          },
          dati: {form: this.formFT},
          immagine: {  }  
        };
  
  
  
  
      var pdfCreatedSuccess = (result: PdfResult) => {
  
        this.widgets.doWithDefaultLoader((loader) => {
              
            var deviceName = Utils.getDeviceEnvironment();
            var self = this;
            if(deviceName!='preview') 
               fileUtil.createFile( this.ads.Id, "file",this.nomePdf,result.pdfObj,function(){
                    self.ads.Preventivo = preventivo;
                    
                    let itemId: ItemId = ItemId.create(self.ads.CodiceAds, self.ads.CodiceOdl);
                    self.adsSync.execute(itemId, "insPreventivo", self.ads.Preventivo);

                    var doc = [];
                    var name = fileUtil.getExternalStoragePath()+self.ads.Id+"/file/"+self.nomePdf;
                    for(let el of self.ads.dataDocument){
                      if(el.name != name) doc.push(el);
                    }
   
                    doc.push({name:name,tag:'doc'});
                    loader.dismiss();
  
                    let docUtils = new DocUtils();
                    docUtils.addDocumentInMemory(name, result.base64);
  
  
                    self.ads.dataDocument  = doc;

                    self.invia_preventivo(name , self.nomePdf);
                 
                    self.adsService.updateAds(self.ads,{dataDocument:self.ads.dataDocument},function(){console.log("save doc to jsonstore");},function(){console.error("error on save foto to jsonstore");});
                    self.navCtrl.pop();
                    /*
                    self.navCtrl.popToRoot().then(()=>{
                      self.navCtrl.push(AdsdetailsPage,self.ads);
                      self = null;
                      result = null;
                      doc = null; 
                    });
                    */
                    console.log('file creato') },
                function(){  
                  loader.dismiss();
                  console.log('errore nella creazione del file')})
            else {  
              loader.dismiss();
              self.navCtrl.popToRoot()
            }

        });      
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


    
  conferma_preventivo(preventivo: Preventivo) {
  
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    var sDay = ""+day;
    var sMonth = ""+month;
    if(day<10) sDay = "0"+day;
    if(month<10) sMonth = "0"+month; 

    var timeWrite = sDay + "/" + sMonth+ "/" + (today.getFullYear());

    var fillColor = "#cccccc";
    switch(  SettoreMerceologico[this.ads.SettoreMerceologico] ){
      case('ACQUA'):{
        fillColor = "#fcce5";
        break;
      }
      case('GAS'):{
        fillColor = "#ead383";
        break;
      }
      case('TLR'):{
        fillColor = "#ead383";
        break;
      }
      case('ENERGIA_ELETTRICA'):{
        fillColor = "#f8eebe";
        break;
      }
    }


    this.formFT = {
      ads: this.ads,
      preventivo: preventivo,
      timeWrite: timeWrite,
      NoteProgettuali: this.ads.NoteProgettuali? this.ads.NoteProgettuali: '',
      fillColor: fillColor,
      LogoSx : imgExample.getLogoSxImg(this.ads.NomeSettore,this.ads.CodiceSocieta),
      LogoDx : imgExample.getLogoDxImg(this.ads.NomeSettore,this.ads.CodiceSocieta)
      //LogoSx : imgExample.getLogoSxHera(),
      //LogoDx : imgExample.getLogoDxHera()
    };


    
    this.Crea_pdf_internal(preventivo);
   
  }

  renderView_() {
    let viewName = this.ads.ProdServizio + "_" + SettoreMerceologico[this.ads.SettoreMerceologico];
    if(this.ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA) {
      viewName = this.ads.ProdServizio + "_FOGNATURA";
    }
    return viewName;
  }

}
