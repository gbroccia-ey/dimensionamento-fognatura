import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';
import { PdfManager } from '../../providers/pdfManager';
//import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { LogManager } from '../../providers/log-manager/logManager';
import { AlertController } from 'ionic-angular';
import { Ads } from '../../models/ads';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';

//import { AdsService } from '../../services/ads-service';

/*
  Generated class for the StampaModulo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-preview-pdf-no-signature',
    templateUrl: 'preview-pdf-no-signature.html'
})
export class PreviewPdfNoSignatures {

    ads :Ads ;
    pdfName: string;
    pdfSrc = {};
    pdfData;
    page: number = 1;
    isDrawing = false;
    contoProprio: boolean;
    postprocessTypology: String;
    pdfBean: any;
    showHiddenCol: boolean;
    printBtn: boolean;
    idPrinterToUse: string;
    disabledSave: boolean;
    title: string;
    successCallback: Function;
    bean: PrinterSignatureBean;
    dataDocument = [];
    zoom;
    creating ;

    /*
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
    */
    constructor(public widgets: WidgetManager, public navCtrl: NavController, public navParams: NavParams,
    public pdfManager: PdfManager, public logManager: LogManager,
        public change: ChangeDetectorRef, public alertCtrl: AlertController,
                public viewCtrl: ViewController,
                //public adsService: AdsService, 
                public LogManager: LogManager) {

        this.bean = this.navParams.get("bean");
        this.pdfSrc = this.bean.url.url;
        //this.navParams.get("url");
        /*this.pdfData = this.bean.url.pdfObj;
        this.pdfBean = this.bean.pdfBean;//this.navParams.get("pdfBean");
        this.ads = this.pdfBean.download.ads;
        this.postprocessTypology = this.bean.postprocessTypology;//this.navParams.get("postprocessTypology");
        */
        this.disabledSave = false;
        this.pdfName = this.navParams.get("pdfName");
        this.title = this.bean.title;// this.navParams.get("title");

        this.successCallback = this.bean.succCallback;
        this.zoom = 1;
    }

    ionViewDidEnter() {
        this.disabledSave = false;
        this.creating = false;
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

    ionViewDidLoad() {
        this.LogManager.info("previw-pdf-no-signature - ionViewDidLoad");
        this.showHiddenCol = false;
       
        this.printBtn = false;
        this.change.detectChanges();
    }

    ionViewWillLeave(){
        // this.LogManager.info("previw-pdf-no-signature - ionViewWllleave");
      
    }

    dismiss() {
        this.zoom = -10;
        this.LogManager.info("previw-pdf-no-signature - dismiss");
        
        var self = this;
        setTimeout(function(){
            self.viewCtrl.dismiss({"value": "none"});
        },1000);
       
        //this.navCtrl.pop();
    }


    continue() {
        this.LogManager.info("previw-pdf-no-signature - continue");
        if(this.creating ) {
             return;
        }
        this.creating = true;
       
        var self = this;
        setTimeout(function(){
             self.zoom = -10;
             self.successCallback(self.bean.url);
        },1000);
       
       
    }  

   


}
