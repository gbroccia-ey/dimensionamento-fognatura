import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavController, NavParams  , ViewController} from 'ionic-angular';
import { PdfManager } from '../../providers/pdfManager';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { LogManager } from '../../providers/log-manager/logManager';
import { AlertController } from 'ionic-angular';
import { Ads } from '../../models/ads';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';
import { JSONStoreManager } from '../../providers/jsonstore-manager/jsonstoremanager';
//import { AdsManager } from '../../providers/ads-manager/AdsManager';
import { AdsSync } from '../../services/ads-synchronizer';
import { AdsService } from '../../services/ads-service';




/*
  Generated class for the StampaModulo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-preview-pdf-two-signature',
    templateUrl: 'preview-pdf-two-signature.html'
})
export class PreviewPdfTwoSignatures {

    showSignature: boolean = true;
    signature = '';
    signatureOperator = '';
    pdfName: string;
    pdfSrc = {};
    page: number = 1;
    isDrawing = false;
    contoProprio: boolean;
    postprocessTypology: String;
    pdfBean: any;
    showHiddenCol: boolean;
    printBtn: boolean;
    idPrinterToUse: string;
    disabledSave: boolean;
    whoNeedToSignText: string;
    title: string;
    successCallback: Function;
    bean: PrinterSignatureBean;
    codice_ads_odl: string;
    ads: Ads;
    form;
    zoom;
    currentPage;
    pdfBase64;    

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    signaturePadOptions: Object = {
        'minWidth': 1,
        'canvasWidth': 610,
        'canvasHeight': 400,
        'backgroundColor': '#f6fbff',
        'penColor': '#666a73',
        'maxWidth': 1,
        'velocityFilterWeight': 1.5

    };

    constructor(public widgets: WidgetManager, public navCtrl: NavController, public navParams: NavParams,
    public pdfManager: PdfManager, public logManager: LogManager,
        public change: ChangeDetectorRef, public alertCtrl: AlertController,public jsonStoreManager: JSONStoreManager
        , 
        //public adsManager: AdsManager, 
        public viewCtrl: ViewController,
        public LogManager: LogManager, public adsSync: AdsSync, public adsService: AdsService) {

        this.bean = this.navParams.get("bean");
        this.pdfSrc = this.bean.url.url;//this.navParams.get("url");
        this.pdfBean = this.bean.pdfBean;//this.navParams.get("pdfBean");
        this.postprocessTypology = this.bean.postprocessTypology;//this.navParams.get("postprocessTypology");
        this.disabledSave = false;
        this.pdfName = this.navParams.get("pdfName");
        this.title = this.bean.title;// this.navParams.get("title");

        this.codice_ads_odl = this.pdfBean.download.codice_ads_odl;
        this.ads = this.pdfBean.download.ads;
        this.form = this.pdfBean.dati.form;

        this.whoNeedToSignText = "Utente";
        this.successCallback = this.bean.succCallback;

        // The workerSrc property shall be specified.
        this.zoom = 1;
 
    }





    ionViewDidEnter() {
        this.LogManager.info("previw-pdf-two-signature - ionViewDidEnter");
        this.signaturePad.clear();
        this.disabledSave = false;
    }

    zoomIn(){
         if(this.zoom<0.5) return;
        this.zoom = this.zoom - 0.5;
    }

    zoomOut(){
        this.zoom = this.zoom + 0.5;
    }


    drawComplete() {
        this.isDrawing = false;
    }

    drawStart() {
        this.isDrawing = true;
    }

    savePad() {
        this.LogManager.info("previw-pdf-two-signature - savePad");
        if (this.signature.length > 1) {
            this.signatureOperator = this.signaturePad.toDataURL('image/jpeg', 1.0);
            this.signaturePad.clear();
            this.printBtn = true;
            this.disabledSave = true;
            this.showSignature = false;
        } else {
            this.signature = this.signaturePad.toDataURL('image/jpeg', 1.0);
            this.signaturePad.clear();
            this.whoNeedToSignText = "Tecnico";

        }
    }

    clearPad() {
        this.signaturePad.clear();
    }


    ionViewDidLoad() {
        this.showHiddenCol = false;
        this.printBtn = false;
        this.change.detectChanges();
    }


      dismiss() {
        this.zoom = -10;
        this.LogManager.info("previw-pdf-no-signature - dismiss");
       this.signaturePad.off();
       var self = this;
       setTimeout(function(){
            self.viewCtrl.dismiss({"value": "none"});
       },1000);
     
        //this.navCtrl.pop();
    }

    saveAndPrint() {   
        this.LogManager.info("previw-pdf-two-signature - saveAndPrint");
        this.pdfBean.signatureUser = this.signature;
        this.pdfBean.signatureOperator = this.signatureOperator;
        this.pdfBean.download.needDownload = true;//TODO questo flag dovrebbe essere ereditato dal chiamante: il duplicato tessera non dovebbe essere salvato

        this.zoom = -10;
        var self = this;
        var tmo = 1500;
        setTimeout(function(){
            self.pdfManager.pdfCreate(self.postprocessTypology, self.pdfBean).then(
            object => {

                setTimeout(function(){ self.successCallback(object);},tmo);
              
                
            }, (err) => {
                    self.zoom = -10;
                //loader.dismissAll();
                //setTimeout(function(){loader.dismiss();},1000); 
                alert(err);
            });
            self.change.detach();
                    },1000);

       
    
    }  
}
