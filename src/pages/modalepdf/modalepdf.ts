import { Component, NgZone } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import {LogManager } from '../../providers/log-manager/logManager';


declare var fileUtil: any;
declare var imgExample: any;

/**
 * Generated class for the ModalepdfPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, 
              public LogManager: LogManager) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 


@Component({
  selector: 'page-modalepdf',
  templateUrl: 'modalepdf.html',
})
export class ModalepdfPage {

  pdf;
  imgSrc;
  pdfVisual;
  url;
  pdfSrc;
  quale_documento;
  blob;
  zoom;

  //pdfSrc: string = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
  page: number = 1;
  constructor(public navCtrl: NavController,    private zone: NgZone, public navParams: NavParams, private domSanitizer:DomSanitizer, 
              public LogManager: LogManager) {

   this.quale_documento = navParams.get('documento');   


    switch(this.quale_documento)
    {
      case "1":
        this.pdfSrc = 'batterie modulari gas.pdf';
      break;
      case "2":
        this.pdfSrc = 'contatori a membrana gas.pdf';
      break;
      case "3":
        this.pdfSrc = 'contatori a rotoidi gas.pdf';
      break;
      case "4":
        this.pdfSrc = 'specifica alloggiamenti acqua.pdf';
      break;
      case "5":
        this.pdfSrc = 'specifiche_tecniche_connessioni_EE.1479915837.1493368415.pdf';
      break;      
      case "6":
        this.imgSrc = imgExample.getTabellaAG();
      break;                 
      default:
        this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
    }   
          this.zoom = 1;
    //create blob for the pdf
    
    var self = this;
    fileUtil.readBinaryPDF("pdf",this.pdfSrc,function(data){
      self.zone.run(() => {
      //self.blob = self.base64ToUint8Array(data);
      self.blob = URL.createObjectURL(data);
    });
    },function(err){console.error('error reading file');});            

  }

  ionViewDidLoad() {

    this.zoom = 1;
    this.LogManager.info("modalepdf - ionViewDidLoad");   

   // this.pdfVisual= this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdf);
    

}

ionViewWillLeave(){
  this.zoom = -10;
}

 photoURL() {
    
      this.LogManager.info("modalepdf -  photoURL", this.pdf.url);   
    //this.pdf = 'pdf/Verbale1.pdf';
    return this.domSanitizer.bypassSecurityTrustUrl(this.pdf.url);
  } 

}
