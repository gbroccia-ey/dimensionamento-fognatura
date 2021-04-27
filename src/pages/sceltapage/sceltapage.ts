import * as moment from 'moment'; 
import { Component, ViewChild , NgZone } from '@angular/core';
import { NavController, NavParams, Navbar, Platform ,ModalController} from 'ionic-angular';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';
import { AlertController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
//import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import {Form1Page} from '../form1/form1';
import {Form2Page} from '../form2/form2';
import { Ads,  SettoreMerceologico} from '../../models/ads';
import { VerbaleDiSopralluogo } from '../../models/verbale_di_sopralluogo';
import { LogManager } from '../../providers/log-manager/logManager';
import { Utils } from '../../utils/utils';

import { AdsService } from '../../services/ads-service';
import { ModalefirmaPage } from '../modalefirma/modalefirma';

declare var imgExample: any;



/**
 * Generated class for the SceltapagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sceltapage',
  templateUrl: 'sceltapage.html',
})
export class SceltapagePage {

  testRadioOpen : boolean;
  signature = imgExample.getWhiteImg();
  signature_tecnico = imgExample.getWhiteImg();
  isDrawing_cliente = false;
  isDrawing_tecnico = false;
  toast;

  firma_cliente: boolean  = false;
  firma_tecnico: boolean  = false;

  @ViewChild("oraInizioPicker") oraInizioPicker;

  ads: Ads;
  //form: VerbaleDiSopralluogo;  
  Descrizione_note: string;
  Sopralluogo_Terminato: boolean;

  Image;
  Image2;  
  canGoBack: boolean = true;
  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth()+1; //January is 0!

  yyyy = this.today.getFullYear();
  
  App_Effettivo_Ora_Inizio_tmp = "";
  App_Anticipato_Ora_Inizio_tmp;
  App_Anticipato_Ora_Fine_tmp;
  App_Verificata_Assenza_Data_tmp;
  App_Verificata_Assenza_Ora_tmp;
  App_Anticipato_Data_tmp;
  showSignature;
  descrizioneRitardo;
  gestore;

  maxDate: string;
  minDate: string;
  hourVal = "00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23";

  whiteImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAgMAAAD90d5fAAAADFBMVEX///8AAADc2c////83BRtzAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EJCw8FEzlIdVEAAACkSURBVHja7c0xAQAADAIg+5fWDHt2QQHSB5FIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCSSuwFEH6zWB0bbYAAAAABJRU5ErkJggg==";

  modalFirma;
  oraPrima;

  public unregisterBackButtonAction: any;

  @ViewChild(Navbar) navBar: Navbar;

  @ViewChild('signaturePad') signaturePad: SignaturePad;
  private signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  
  @ViewChild('signaturePadTecnico') signaturePadTecnico: SignaturePad;
  private signaturePadOptions_tecnico: Object = {
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, 
              //public storage: Storage, 
              public toastCtrl: ToastController, public modalCtrl:ModalController,
              public platform: Platform, public LogManager: LogManager,
              public widgets: WidgetManager, public zone: NgZone, public adsService: AdsService,
              ) {
      
        if(navParams.data) {

          var now = moment();
          this.maxDate = now.format("YYYY-MM-DD");
          this.minDate = now.subtract(10, 'year').format("YYYY-MM-DD");
          
          this.ads = navParams.data;

          if(!this.ads.VerbaleDiSopralluogo) {
            this.ads.VerbaleDiSopralluogo = new VerbaleDiSopralluogo();
            this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Inizio = this.ads.OraInizio;
            //this.ads.VerbaleDiSopralluogo.App_Concordato_Data =  moment(this.ads.DataAppuntamento, "DD-MM-YYYY").format("YYYY-MM-DD");
            this.ads.VerbaleDiSopralluogo.App_Concordato_Data =  this.convertDate(Utils.getSAPDate(this.ads.DataAppuntamento));
            this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Fine = this.ads.OraFine;
            this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio = this.ads.App_Effettivo_Ora_Inizio || "";
            this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Verificato = false;
            this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza = false;

            if(this.ads.ChiaveTestoStd === "ZAP3"){
              this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = this.convertDate(Utils.getSAPDate(this.ads.Altro2));
              this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio = this.ads.Altro3;
              this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine = this.ads.Altro4;
            }
         }


           if(this.ads.Cliente.Email==undefined || this.ads.Cliente.Email==""){
            this.ads.VerbaleDiSopralluogo.TipoVerbale = "cartaceo";
           }
           else this.ads.VerbaleDiSopralluogo.TipoVerbale = "digitale";

           if(this.ads.Prestazione){
            switch(this.ads.Prestazione.toString())
            {
              case "PN1":
                this.ads.VerbaleDiSopralluogo.PN1 = true;
                break;
              case "PM1":
                this.ads.VerbaleDiSopralluogo.PM1 = true;
                break;
              case "PR1":
                this.ads.VerbaleDiSopralluogo.PR1 = true; 
                break;                          
            }
           }

             this.gestore = "gestore";
          switch(this.ads.SettoreMerceologico) {
            case SettoreMerceologico["GAS"]:
                 this.gestore = "distributore";
                 break;
            case SettoreMerceologico["ENERGIA_ELETTRICA"]:
                  this.gestore = "distributore";
                break;
          }

        }


            
        this.descrizioneRitardo = '';
        switch(this.ads.SettoreMerceologico)
        {
          case SettoreMerceologico.ACQUA:
            this.descrizioneRitardo = 'Indennizzo automatico per servizio ACQUA e FOGNATURA da riconoscere al cliente per mancato rispetto della fascia di puntualità: 30,00 euro'
            break;             
          case SettoreMerceologico.GAS:
             this.descrizioneRitardo = 'Indennizzo automatico per servizio GAS da riconoscere al cliente per mancato rispetto della fascia di puntualità:30,00 euro fino a G6 - 60,00 euro da G10 a G25 - 120,00 euro da G40 in poi'
          break;
          case SettoreMerceologico.ENERGIA_ELETTRICA:
              this.descrizioneRitardo = 'Indennizzo automatico per servizio ENERGIA ELETTRICA da riconoscere al cliente per mancato rispetto della fascia di puntualità: 30,00 euro Clienti domestici in bassa tensione - 60,00 euro Clienti non domestici in bassa tensione - 120,00 euro Clienti in media tensione'
          break;
        }

        this.Carica_Dati();
        this.fillContatori();
          this.ads.VerbaleDiSopralluogo.App_Concordato_Data =  this.convertDate(this.ads.DataAppuntamento);
        
        if(this.ads.VerbaleDiSopralluogo.TipoVerbale == "digitale") this.showSignature = true;
        else this.showSignature = false;
  }

  ionViewDidLoad() {
    this.widgets.doWithLoader("Caricamento dati...", (loader) => {

     this.LogManager.info("sceltapage - ionViewDidLoad");

      this.navBar.backButtonClick = (e:UIEvent)=>{
        // todo something        
         this.naviga_back();
      }
       
    
    //this.Carica_Dati();

    //this.showRadio();
    loader.dismiss();
    });
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidEnter() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
             this.naviga_back();
        }, 10);
  }

  fillContatori(){
      var strMatricole = this.ads.Matricola;
      if(strMatricole!=undefined && strMatricole!=''){
        var arrMatricole = strMatricole.split(';');
        if(arrMatricole.length>0) this.ads.VerbaleDiSopralluogo.Matricola_1_vecchio_contatore = arrMatricole[0];
        if(arrMatricole.length>1) this.ads.VerbaleDiSopralluogo.Matricola_2_vecchio_contatore = arrMatricole[1];
        if(arrMatricole.length>2) this.ads.VerbaleDiSopralluogo.Matricola_3_vecchio_contatore = arrMatricole[2];
        if(arrMatricole.length>3) this.ads.VerbaleDiSopralluogo.Matricola_1_vecchio_contatore_2 = arrMatricole[3];
        if(arrMatricole.length>4) this.ads.VerbaleDiSopralluogo.Matricola_2_vecchio_contatore_2 = arrMatricole[4];
        if(arrMatricole.length>5) this.ads.VerbaleDiSopralluogo.Matricola_3_vecchio_contatore_2 = arrMatricole[5];
        if(arrMatricole.length>6) this.ads.VerbaleDiSopralluogo.Matricola_1_vecchio_contatore_3 = arrMatricole[6];
        if(arrMatricole.length>7) this.ads.VerbaleDiSopralluogo.Matricola_2_vecchio_contatore_3 = arrMatricole[7];
        if(arrMatricole.length>8) this.ads.VerbaleDiSopralluogo.Matricola_3_vecchio_contatore_3 = arrMatricole[8];                 
         if(arrMatricole.length>9) this.ads.VerbaleDiSopralluogo.Matricola_1_vecchio_contatore_4 = arrMatricole[9];
        if(arrMatricole.length>10) this.ads.VerbaleDiSopralluogo.Matricola_2_vecchio_contatore_4 = arrMatricole[10];
        if(arrMatricole.length>11) this.ads.VerbaleDiSopralluogo.Matricola_3_vecchio_contatore_4 = arrMatricole[11];
     }
  }

  naviga_back(){
    if(this.canGoBack){

    this.LogManager.info("sceltapage - naviga_back", this.ads);
    this.processForm();
    //alert("BACK SCELTA PAGE");
   // this.navCtrl.push(AdsdetailsPage, this.ads);
   if( this.modalFirma  ){
       this.modalFirma.dismiss();
        this.modalFirma = undefined;
   }else{
    this.navCtrl.pop();
    this.canGoBack = false;  
  }
  }
  }

 drawComplete(quale_utente) {
 //    this.LogManager.info("sceltapage - drawComplete", quale_utente);
    if(quale_utente == "cliente")
      this.isDrawing_cliente = false;
    else  
      this.isDrawing_tecnico = false;
  }
 
  drawStart(quale_utente) {
   // this.LogManager.info("sceltapage - drawStart", quale_utente);
    if(quale_utente == "cliente")
      this.isDrawing_cliente = true;
    else  
      this.isDrawing_tecnico = true;    
  }
 
  savePad(quale_utente) {
      this.LogManager.info("sceltapage - savePad", quale_utente);   
    if(quale_utente == "cliente")
    {
      this.firma_cliente = true;
      this.signature = this.signaturePad.toDataURL('image/jpeg', 1.0);
      this.ads.VerbaleDiSopralluogo.App_Firma_Cliente = this.signature;
      //this.storage.set('savedSignature_cliente', this.signature);
    }      
    else
    {
      this.firma_tecnico = true;
      this.signature_tecnico = this.signaturePadTecnico.toDataURL('image/jpeg', 1.0);      
      this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico = this.signature_tecnico;
      //this.storage.set('savedSignature_tecnico', this.signature_tecnico);    
    }


    if(quale_utente == "cliente")
      this.signaturePad.clear();
    else  
      this.signaturePadTecnico.clear();
     /*
    this.toast = this.toastCtrl.create({
      message: 'Firma salvata',
      duration: 1500
    });
    this.toast.present();
    */
  }
 
  clearPad(quale_utente) {
     this.LogManager.info("sceltapage - clearPad", quale_utente);   
    if(quale_utente == "cliente")
      this.signaturePad.clear();
    else  
      this.signaturePadTecnico.clear();

  }

  showRadio() {
     this.LogManager.info("sceltapage - showRadio");   
      let alert = this.alertCtrl.create();
      alert.setTitle('Metodo di compilazione');

      alert.addInput({
        type: 'radio',
        label: 'Digitale',
        value: 'digitale',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Cartaceo',
        value: 'cartaceo',
        checked: false
      });    

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.testRadioOpen = false;
          this.ads.VerbaleDiSopralluogo.TipoVerbale = data;

        }
      });
      alert.present();
  } 

  Compila_Verbale(){    

    this.widgets.doWithLoader("Caricamento dati...", (loader) => {

          this.LogManager.info("sceltapage - Compila_Verbale ", this.ads.VerbaleDiSopralluogo.TipoVerbale);  
          if(this.ads.VerbaleDiSopralluogo.TipoVerbale == "digitale") // firma necessaria
          {
            if(!this.firma_cliente || !this.firma_tecnico)    
              this.showAlert(); 
            else 
            {
              this.processForm();
              /*
              0 ACQUA
              1 GAS
              2 FOGNA
              3 ENERGIA ELETTRICA
              4 TLR
              */    
              /*
              if((this.ads.SettoreMerceologico === SettoreMerceologico.ACQUA)) // Acqua o Fogna
                this.navCtrl.push(Form1Page, this.ads);
              else
                this.navCtrl.push(Form2Page, this.ads);
                */
                  switch(this.ads.SettoreMerceologico)
                  {
                    case SettoreMerceologico.ACQUA:
                        this.navCtrl.push(Form1Page, this.ads);
                    break;    
                    case SettoreMerceologico.TLR:
                      this.navCtrl.push(Form1Page, this.ads);
                    break;                          
                    case SettoreMerceologico.GAS:
                     this.navCtrl.push(Form2Page, this.ads);
                    break;
                    case SettoreMerceologico.ENERGIA_ELETTRICA:
                      this.navCtrl.push(Form2Page, this.ads);
                    break;
                  }


              }

          }
          else // firma su carta
          {
              this.processForm();

              switch(this.ads.SettoreMerceologico)
              {
                case SettoreMerceologico.ACQUA:
                  this.navCtrl.push(Form1Page, this.ads);
                break;       
                 case SettoreMerceologico.TLR:
                      this.navCtrl.push(Form1Page, this.ads);
                    break;                   
                case SettoreMerceologico.GAS:
                this.navCtrl.push(Form2Page, this.ads);
                    break;
                case SettoreMerceologico.ENERGIA_ELETTRICA:
                  this.navCtrl.push(Form2Page, this.ads);
                break;
              }
          }

	    loader.dismiss();
    });    
      
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Attenzione!',
      subTitle: 'Inserire e salvare le firme' ,
      buttons: ['OK']
    });

     alert.present();
  }  

  processForm() {
   this.LogManager.info("sceltapage - processForm   ", this.ads.VerbaleDiSopralluogo.TipoVerbale);  
    
   if(this.ads.VerbaleDiSopralluogo.App_Concordato_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Concordato_Data!=undefined&& this.ads.VerbaleDiSopralluogo.App_Concordato_Data.indexOf('T')>0)
   this.ads.VerbaleDiSopralluogo.App_Concordato_Data = moment(this.ads.VerbaleDiSopralluogo.App_Concordato_Data).format("DD/MM/YYYY"); 
 
  if(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Anticipato_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Anticipato_Data.indexOf('T')>0)
    this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = moment(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data).format("DD/MM/YYYY"); 
  
  if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Effettivo_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Effettivo_Data.indexOf('T')>0)
    this.ads.VerbaleDiSopralluogo.App_Effettivo_Data = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data).format("DD/MM/YYYY"); 
  
  if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data.indexOf('T')>0)
    this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data = moment(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data).format("DD/MM/YYYY");     

  this.adsService.updateAds(this.ads, {VerbaleDiSopralluogo: this.ads.VerbaleDiSopralluogo},() => {

  }, (err) => {
    console.log(err);
  })

  }

    openFirma(){
        this.modalFirma = this.modalCtrl.create(ModalefirmaPage, {},{ enableBackdropDismiss: false });
         this.modalFirma.onDidDismiss(data => {
          if(data!=undefined){
              this.signature = data.signature;
              this.signature_tecnico = data.signatureOperator;
              this.firma_cliente = true;
              this.firma_tecnico = true;
              this.ads.VerbaleDiSopralluogo.App_Firma_Cliente = this.signature;
              //this.storage.set('savedSignature_cliente', this.signature);
              this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico = this.signature_tecnico;
              //this.storage.set('savedSignature_tecnico', this.signature_tecnico);    
          }
        });    
         this.modalFirma.present();    
    }

  cleanDate(date){
      this.ads.VerbaleDiSopralluogo[date] = '';
  }


  setCheck(data){
      //this[data] = !this[data];
      if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza === false) {
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data = "";
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Ora = "";
      }
  }

  setCheckVAV(){
    this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Verificato = !this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Verificato;
    if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Verificato==false){
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Forza_Maggiore = false;
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Cliente = false;
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Gestore = false;
    }
  }

  showTime(id){
        document.getElementById(id).click();
  }

  showTimeAssData(id){
        if(id=="App_Verificata_Assenza_Ora" && !this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Ora){
          this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Ora = new Date().getHours()+":"+new Date().getMinutes();
        }

        if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza){
          var today = new Date();
          var month = today.getMonth()< 10 ? "0"+(today.getMonth()+1) : (today.getMonth()+1) ;
          var day = today.getDate()<10? "0"+today.getDate() : today.getDate() ;

          if(!this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data) this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data = today.getFullYear()+"-"+month+"-"+day;      
          setTimeout(() => document.getElementById(id).click() ,700);
        }
  }

  setTime(time,timeTmp){
      if(time === "App_Effettivo_Ora_Inizio"){
        if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data)
        {
          let dateChosen = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
          dateChosen.hour(Number(this.App_Effettivo_Ora_Inizio_tmp.split(":")[0]));
          dateChosen.minute(Number(this.App_Effettivo_Ora_Inizio_tmp.split(":")[1]));
          dateChosen.seconds(0);
          dateChosen.milliseconds(0);
          setTimeout(() => {
            let now = moment();
            //now.add(1, 'minutes');
            now.seconds(0);
            now.milliseconds(0);
            
            if(dateChosen.isAfter(now))
            {
              this.App_Effettivo_Ora_Inizio_tmp = now.format("HH:mm");
              
              alert("L'ora impostata è nel futuro. Verrà impostata all'orario corrente");
            }
          }, 100);
          

          //let tmpToCompare = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
         
        }
       

      }
      this.ads.VerbaleDiSopralluogo[time] = this[timeTmp];
  }



  openOraInizioPicker() {

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
    
    /*
    if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data)
    {
      this.App_Effettivo_Ora_Inizio_tmp = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data).format("HH:mm");
      let tmpToCompare = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
      let now = moment();
      if(tmpToCompare.diff(now, "day") === 0){
        this.hourVal = "";
        let maxHour = tmpToCompare.hour();
        for(let i = 1; i <= maxHour; i++) {
          let hour = "";
          i < 10 ? (hour = "0" + i) : hour = String(i);
          this.hourVal += hour + ",";
        }
        if(this.hourVal.length > 0 && this.hourVal.substr(this.hourVal.length - 1) === ","){
          this.hourVal.replace(/.$/,"");
        }

      }
      else {
        this.hourVal = "00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23";
      }
    }else {
      this.App_Effettivo_Ora_Inizio_tmp = moment().format("HH:mm");
    }
    
    */

    this.App_Effettivo_Ora_Inizio_tmp = moment().format("HH:mm");
    setTimeout(() => { this.oraInizioPicker.open(); }, 100);
    
  }

  orarioAnticipoAnticipo(){
    var tmpConc:any;
    var oraConc;
    if(this.ads.ChiaveTestoStd === "ZES0"){
      return false;
    }
      if(this.ads.ChiaveTestoStd === "ZAP3"){
        tmpConc = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data);
        oraConc = this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio.split(':');
      }
      else {
         tmpConc = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Concordato_Data);
         oraConc = this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Inizio.split(':');
      }

      var dataAnticip = new Date();
      dataAnticip.setDate(tmpConc[2]);
      dataAnticip.setMonth(tmpConc[1]);
      dataAnticip.setFullYear(tmpConc[0]);
      dataAnticip.setHours(oraConc[0]);
      dataAnticip.setMinutes(oraConc[1]);

      var dataEsec = new Date();
      tmpConc = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
      dataEsec.setDate(tmpConc[2]);
      dataEsec.setMonth(tmpConc[1]);
      dataEsec.setFullYear(tmpConc[0]);
      dataEsec.setHours(Number(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio.split(':')[0]));
      dataEsec.setMinutes(Number(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio.split(':')[1]));

      return dataAnticip.getTime() > dataEsec.getTime();
  }

  orarioSballato(){
    if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio==undefined || this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio=="") return false;
    var tmpConc:any;

    if(this.ads.ChiaveTestoStd === "ZAP3"){
      tmpConc = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data);
      if(this.orarioAnticipoAnticipo()) return false;
    }else{
      if(this.ads.VerbaleDiSopralluogo.App_Concordato_Data)
        tmpConc = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Concordato_Data);
      else{
        return false;
      }
    }

    var tmpEff = Utils.strDateToArray(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
    if(tmpConc[0]<tmpEff[0]) return true;
    if(tmpConc[1]<tmpEff[1]) return true;
    if(tmpConc[2]<tmpEff[2]) return true;

    this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio);
    
    if(this.ads.ChiaveTestoStd !== "ZAP3" && (this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Fine < this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio)) return true;
    if(this.ads.ChiaveTestoStd === "ZAP3" && (this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine < this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio)) return true;
    return false;
  }

  //given a date string in italian format DD/MM/YYYY
  //returns rhe right isoString or today isostring.
  convertDate(dateStr: string) : string {
    try{
      let tmp = dateStr.replace(/\//g, "-");
      let rightFormat = tmp.substring(6, 10) + "-" + tmp.substring(3,5) + "-" + tmp.substring(0,2); 
      let toJsDate = new Date(Date.parse(rightFormat)).toISOString();
      return toJsDate;
    }catch(err) {
      return dateStr;
    }

  }

  Carica_Dati(){

        this.LogManager.info("sceltapage - Carica_Dati   ");  
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

        var data_di_oggi = new Date().toISOString();

        !this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data ?
          this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data = data_di_oggi 
          : this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data;
        
        //App_Concordato_Data
        //
        if(!this.ads.VerbaleDiSopralluogo.App_Concordato_Data || 
           this.ads.VerbaleDiSopralluogo.App_Concordato_Data === "") {
            // this.ads.VerbaleDiSopralluogo.App_Concordato_Data = data_di_oggi;
            this.ads.VerbaleDiSopralluogo.App_Concordato_Data = "";
           } else {
            this.ads.VerbaleDiSopralluogo.App_Concordato_Data = 
              this.convertDate(this.ads.VerbaleDiSopralluogo.App_Concordato_Data);
           }


        if(!this.ads.VerbaleDiSopralluogo.App_Effettivo_Data || 
            this.ads.VerbaleDiSopralluogo.App_Effettivo_Data === ""){
              this.ads.VerbaleDiSopralluogo.App_Effettivo_Data = data_di_oggi;
              
            } else {
              this.ads.VerbaleDiSopralluogo.App_Effettivo_Data = 
                this.convertDate(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data);
            }

        if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data &&
          this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data !== "") {
            this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data = 
            this.convertDate(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data);
        }

          if(!this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data || 
            this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data === "") {
              this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data = data_di_oggi;
              
            } else {
              this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data = 
                this.convertDate(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Letto_in_Data);
            }
        
        !this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio ?
            this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio = localISOTime 
            : this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio;

        !this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine ?
            this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine = localISOTime 
            : this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine;

        if (!this.ads.VerbaleDiSopralluogo.App_Anticipato_Data){
          this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = localISOTime; 
        }
        else {
          this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = this.convertDate(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data);
        }
        
      

        if((this.ads.VerbaleDiSopralluogo.App_Firma_Cliente != "") && (this.ads.VerbaleDiSopralluogo.App_Firma_Cliente != undefined))
        {
          this.firma_cliente = true;
          this.signature = this.ads.VerbaleDiSopralluogo.App_Firma_Cliente;
          //this.Image = document.getElementById("firma_del_cliente") as HTMLImageElement;    
          //this.Image.src = this.ads.VerbaleDiSopralluogo.App_Firma_Cliente;
        }

        if((this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico != "") && (this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico != undefined))
        {
          this.firma_tecnico = true;
          this.signature_tecnico = this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico;
          //this.Image2 = document.getElementById("firma_del_tecnico") as HTMLImageElement;    
          //this.Image2.src = this.ads.VerbaleDiSopralluogo.App_Firma_Tecnico;
        }    

          
        if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio!='' && 
            this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio !=undefined) 
              this.App_Effettivo_Ora_Inizio_tmp = this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio;
        
        this.ricorda_scelta();

        
    }

    ricorda_scelta(){
 
      //this.widgets.doWithLoader("Caricamento dati...", (loader) => {	        
      
          if(this.ads.VerbaleDiSopralluogo.TipoVerbale == "cartaceo" || this.ads.VerbaleDiSopralluogo.TipoVerbale == "digitale")
          {
        //    loader.dismiss();

            if(this.ads.DoneSP==true)
              this.Compila_Verbale();
          }            
          else
          {
         //   loader.dismiss();
            this.showRadio();        
          }            	          
   //   });        
    
  }

    fixHourFormat(time){
      if(time==undefined) return undefined;
      if(time=='') return '';
      var index = time.indexOf('T');
      if(index>0) time =  time.substring(index+1,index+6);
      return time;
    }

    checkOre(){
      this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio);
      this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Fine = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Fine);
      this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Inizio);
      this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Anticipato_Ora_Fine);
      this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Ora = this.fixHourFormat(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Ora);
        
    }
  
    chiedi_conferma() {
      this.checkOre();

      if(this.orarioAnticipoAnticipo() && !this.ads.VerbaleDiSopralluogo.ConsensoAppuntamentoAnticipatoCliente){
        let confirmTmp = this.alertCtrl.create({
          title: 'Attenzione! Controllare i dati inseriti.',
          message: "E' necessario indicare che il cliente acconsente all'esecuzione anticipata.",
          buttons: [
            
            {
              text: 'Ok',
              handler: () => {
                          }
            }
          ]
        });
        confirmTmp.present();
        return;
      }


      if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio==''){
         let confirmTmp = this.alertCtrl.create({
      title: 'Attenzione! Controllare i dati inseriti.',
      message: "Devi inserire l'orario di arrivo effettivo",
      buttons: [
        
        {
          text: 'Ok',
          handler: () => {
                      }
        }
      ]
    });
    confirmTmp.present();
    return;

      }

    var message = 'Dopo aver confermato non sarà più possibile modificare i campi di questa pagina';
    if(this.orarioSballato()) message= "L'orario di arrivo è stato impostato dopo l'orario concordato. Dopo aver confermato non sarà più possibile modificare i campi di questa pagina";


    let confirm = this.alertCtrl.create({
      title: 'Attenzione! Controllare i dati inseriti.',
      message: message,
      buttons: [
        {
          text: 'Annulla',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            console.log('Agree clicked');
            this.ads.DoneSP = true;
            this.adsService.updateAds(this.ads,{DoneSP:true},function(){
                console.log('OK. Scelta page');
            },function(){
                console.error('Scelta page error');
            });
            this.Compila_Verbale();
          }
        }
      ]
    });
    confirm.present();
  }


}
