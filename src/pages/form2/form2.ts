import * as moment from 'moment'; 
import { Component, ViewChild,NgZone } from '@angular/core';
import {  NavController, NavParams, Navbar,ModalController, Platform } from 'ionic-angular';
import { PainterPage2 } from '../painter2/painter2';
//import { PainterPage } from '../painter/painter';
import { JSONStoreManager } from '../../providers/jsonstore-manager/jsonstoremanager';
import { Ads, Stato, SettoreMerceologico , DettaglioMerceologico, Prestazione} from '../../models/ads';
import { Ente, EnteItem, EnteType} from '../../models/ente';
import {AdeguamentoCliente,AdeguamentoNecessarioCliente} from '../../models/verbale_di_sopralluogo';
import { NotaSopralluogo } from '../../models/nota_sopralluogo';

import { ModalepdfPage } from '../modalepdf/modalepdf';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalenotePage } from '../modalenote/modalenote';
import { FotoPage } from '../foto/foto';
import { PdfManager, PdfResult } from '../../providers/pdfManager';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';
//import { AdsdetailsPage } from '../adsdetails/adsdetails';
import { PreviewPdfTwoSignatures } from '../preview-pdf-two-signature/preview-pdf-two-signature';
import { PreviewPdfNoSignatures } from '../preview-pdf-no-signature/preview-pdf-no-signature';
import { AdsSync } from '../../services/ads-synchronizer';

import { AdsService } from '../../services/ads-service';
import { LogManager } from '../../providers/log-manager/logManager';
//import { LoginManager } from '../../providers/login-manager/LoginManager';
import { ModalImportaVerbalePage } from '../modal-importa-verbale/modal-importa-verbale';
import { NoteVerbalePage } from '../note-verbale/note-verbale'

import { DocUtils } from '../../config/docUtils';
import { ItemId } from '../../models/queue-item';

declare var fileUtil: any;
/**
 * Generated class for the Form1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-form1',
  templateUrl: 'form2.html',
})
export class Form2Page {

  showBack = false;
  jsonPaint=undefined
  imgPaint=undefined;

  testRadioOpen : boolean;
  testRadioResult : string;  
  conta_descrizioni: number = 0;

  signature2;
  signature_tecnico2;
  isDrawing_cliente = false;
  isDrawing_tecnico = false;

  firma_cliente2: boolean  = false;
  firma_tecnico2: boolean  = false; 

  ads: Ads;
  conta;
  Image;
  Image2;
  Tipologia_Nota;
  Nota_Form;
  nomePdf: string;
  blobPDF;
  //form_inviata;
  logo;

  enti;
  note_dinamiche:string = "";
  got_note_templates:boolean;
  listaFasi;
  listaVariantiFasi;

  openModal;
  numMatricole;
  canGoBack: boolean = true;
  listaContatori;
  public unregisterBackButtonAction: any;
  
  @ViewChild(Navbar) navBar: Navbar;

  @ViewChild('signaturePad2') signaturePad2: SignaturePad;
  private signaturePadOptions2: Object = { 
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  
  @ViewChild('signaturePadTecnico2') signaturePadTecnico2: SignaturePad;
  private signaturePadOptions_tecnico2: Object = {
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public modalCtrl: ModalController,
              public alertCtrl: AlertController, 
              //public storage: Storage, 
              public toastCtrl: ToastController,public widgets: WidgetManager,
              public pdfManager: PdfManager, public platform: Platform,
              public adsService: AdsService, 
              public LogManager: LogManager,
              //public loginManager: LoginManager,
              public jsonStoreManager: JSONStoreManager,
               private zone: NgZone, public adsSync: AdsSync
              ) {       
    //this.imgPaint = undefined;
    this.imgPaint = null;

    if(navParams.data) {
      this.ads = navParams.data;

      this.listaContatori = this.ads.getListaContatori();
      this.enti = Ente.getEnti(this.ads);
      this.got_note_templates = (NotaSopralluogo.getNotes(this.ads).length > 0);
      this.logo = this.ads.Logo;
      if (this.ads.SettoreMerceologico === SettoreMerceologico.ENERGIA_ELETTRICA){
        
        this.listaFasi = this.ads.getFasi();
        this.listaVariantiFasi = this.ads.getVariantiFasi();

      }

      var trovatoInGal = false;
      if(this.ads.dataFoto){
        for(let item of this.ads.dataFoto){
           var tmpTitle = item.name.split('/');
           tmpTitle = tmpTitle[tmpTitle.length-1];
          if(item.tag == "sopralluogoDT"){
            trovatoInGal = true;
            this.ads.DisegnoTecnico = item.name;
            this.ads.calculateDisegnoTecnicoBase64FromGal(item.name,(res) => {
              this.ads.VerbaleDiSopralluogo.Disegno_Schema = res;
              this.ads.setDisegnoTecnicoBase64(res);
            });
          }     
        }
      }

      if(!trovatoInGal)
      this.ads.calculateDisegnoTecnicoBase64((res) => {
        this.ads.VerbaleDiSopralluogo.Disegno_Schema = res;
        this.ads.setDisegnoTecnicoBase64(res);
      });
      this.imgPaint = this.ads.DisegnoTecnico;

      this.LogManager.info("form2", this.ads); 
      //this.ads.calculateDisegnoTecnicoBase64();

      this.ads.VerbaleDiSopralluogo.Codice_Cliente = this.ads._bp;
      this.ads.VerbaleDiSopralluogo.Nome_Richiedente= this.ads.Cliente.Nome;
      this.ads.VerbaleDiSopralluogo.Cognome_Richiedente= this.ads.Cliente.Cognome;
      this.ads.VerbaleDiSopralluogo.Ragione_Sociale = this.ads.Cliente.RagioneSociale;

      if(!this.ads.VerbaleDiSopralluogo.Cognome_Incaricato) this.ads.VerbaleDiSopralluogo.Cognome_Incaricato = this.ads.CognomeIncaricato;
      if(!this.ads.VerbaleDiSopralluogo.Telefono_Incaricato) this.ads.VerbaleDiSopralluogo.Telefono_Incaricato = this.ads.TelefonoIncaricato;
      if(!this.ads.VerbaleDiSopralluogo.Nome_Incaricato) this.ads.VerbaleDiSopralluogo.Nome_Incaricato = this.ads.NomeIncaricato;

      // if(this.ads.Cliente.RagioneSociale!=undefined && this.ads.Cliente.RagioneSociale!='')   {
      //   this.ads.VerbaleDiSopralluogo.Nome_Richiedente = this.ads.Cliente.RagioneSociale;
      //   this.ads.VerbaleDiSopralluogo.Cognome_Richiedente = '';
      // }

      if(!this.ads.VerbaleDiSopralluogo.Telefono_Richiedente) this.ads.VerbaleDiSopralluogo.Telefono_Richiedente= this.ads.Cliente.Telefono;
      if(!this.ads.VerbaleDiSopralluogo.Email) this.ads.VerbaleDiSopralluogo.Email= this.ads.Cliente.Email;
      this.ads.VerbaleDiSopralluogo.Rintracciabilita=this.ads.CodiceRintracciabilita;
      if(this.ads.ActiveConnection){
        this.ads.VerbaleDiSopralluogo.TICA = this.ads.CodiceRintracciabilita;
        this.ads.CodiceRintracciabilita = "";
        this.ads.VerbaleDiSopralluogo.CodiceRintracciabilita = "";
      }else {
        this.ads.VerbaleDiSopralluogo.TICA = "";
        
      }
      this.ads.VerbaleDiSopralluogo.Via_Lavoro= this.ads.Indirizzo.Via;
      if(this.ads.Indirizzo.Civico!=undefined) this.ads.VerbaleDiSopralluogo.Via_Lavoro += ' '+this.ads.Indirizzo.Civico;
      if(this.ads.Indirizzo.Barrato!=undefined) this.ads.VerbaleDiSopralluogo.Via_Lavoro += ' '+this.ads.Indirizzo.Barrato;
      this.ads.VerbaleDiSopralluogo.Comune_Lavoro= this.ads.Indirizzo.Citta;
      
      if(this.ads.CodiceAds != undefined)
        this.ads.VerbaleDiSopralluogo.Avviso = this.ads.CodiceAds
      if(this.ads.CodiceOdl != undefined)  
        this.ads.VerbaleDiSopralluogo.Avviso += " / " + this.ads.CodiceOdl;
      
      //if(!this.ads.VerbaleDiSopralluogo.Cognome_Tecnico)  this.ads.VerbaleDiSopralluogo.Cognome_Tecnico = this.loginManager.userData.sn;
      //if(!this.ads.VerbaleDiSopralluogo.Nome_Tecnico)  this.ads.VerbaleDiSopralluogo.Nome_Tecnico = this.loginManager.userData.givenName;

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

      switch(this.ads.SettoreMerceologico)
      {
        case SettoreMerceologico.ACQUA:
        case SettoreMerceologico.TLR:
          if(DettaglioMerceologico.FOGNATURA)
            this.ads.VerbaleDiSopralluogo.Fognatura = true;
          else
            this.ads.VerbaleDiSopralluogo.Acqua = true;
        break;                          
        case SettoreMerceologico.GAS:
          this.ads.VerbaleDiSopralluogo.Gas = true;
        break;
        case SettoreMerceologico.ENERGIA_ELETTRICA:
          this.ads.VerbaleDiSopralluogo.Energia_Elettrica = true;
        break;
      }
    }
    
    if(!this.ads.VerbaleDiSopralluogo.show_comp) {
      this.ads.VerbaleDiSopralluogo.show_comp = [];
    }
    for(var i=0; i < 3; i++)
    {
      this.ads.VerbaleDiSopralluogo.show_comp.push({descrizione:"",tipo: false});
    } 

    //this.Carica_Dati();  
    this.showBack = false;

     if(this.ads.Matricola!='' && this.ads.Matricola!=undefined){
       var token = this.ads.Matricola.split(';');
       var numTok = token.length;
       if(numTok>12) this.numMatricole = ' ('+numTok+')';
     }

  }

  ionViewDidLoad() {
      this.LogManager.info("form2 - ionViewDidLoad"); 
      this.navBar.backButtonClick = (e:UIEvent)=>{
       this.naviga_back();
      }
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidEnter() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
         if(this.openModal!= undefined && this.openModal.name == "painter"){
          document.getElementById('closeModal').click();
        }
        else this.naviga_back();
        }, 10);
        this.updateNoteDinamiche();
        this.updateSelectMultiple();
  }

  get adeguamentoCliente() {
    return AdeguamentoCliente;
  }

  get adeguamentoNecessarioCliente() {
    return AdeguamentoNecessarioCliente;
  }
  
  updateSelectMultiple(){
    var str = "";
    var self = this;
    if (this.ads.VerbaleDiSopralluogo.Seleziona_Ente.includes(Ente.NO_ENTE)){
      setTimeout(function(){ 
        self.ads.VerbaleDiSopralluogo.Seleziona_Ente = Ente.NO_ENTE;
        self.ads.VerbaleDiSopralluogo.Tipo_Ente = EnteType.NO_ENTE;
        
      },100);
      str = Ente.NO_ENTE;
    }
    else {
      self.ads.VerbaleDiSopralluogo.Tipo_Ente = EnteType.COMUNE;
      for(let item of this.ads.VerbaleDiSopralluogo.Seleziona_Ente){
        let eitem:EnteItem = this.enti.find((x) => x.value === item);
        if (eitem && (eitem.type === EnteType.ALTRO)){
          self.ads.VerbaleDiSopralluogo.Tipo_Ente = eitem.type;
        }

        item = item.replace(/:|'/g,':</bold>');
        item = item.replace(/Giorni|'/g,'<bold style="font-weight: bold;">Giorni');
        str += item+"<br>";
      }  
    }
  }
    



  updateSelectAdeguamenti() {
    this.ads.VerbaleDiSopralluogo.updAdeguamentoCaricoCliente();
  }

  updateSelectAdeguamentiNecessari(){
  }

  GoToFoto(){
    this.navCtrl.push(FotoPage,{ads:this.ads,sopralluogo:true});
  }

  naviga_back_details(){
    this.navCtrl.popToRoot().then(()=>{
      //this.navCtrl.push(AdsdetailsPage,this.ads);
      this.navCtrl.pop();
    });
  }

  naviga_back(){
    this.Salva_Dati();
     this.LogManager.info("form2 - naviga_back"); 
    //this.navCtrl.push(SceltapagePage, this.ads);
    if(this.openModal!=undefined) {
      this.openModal.dismiss();
    }
    
    else if(this.canGoBack){
      this.canGoBack = false;
      this.navCtrl.pop(); 
    }

  }

  clickFab(){
    this.LogManager.info("form2 - clickFab"); 
    this.zone.run(() => {
      this.showBack = !this.showBack;
      if(this.showBack==true) document.getElementById('allPageF2').className = 'glass';
      else document.getElementById('allPageF2').className = '';
    })
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Attenzione!',
      subTitle: 'Raggiunto il limite massimo di descrizioni aggiuntive' ,
      buttons: ['OK']
    });

     alert.present();
     
  }  



  Documentazione_Tecnica(){
      this.ListaDocumenti();
  }

  Salva_Dati(){
      this.LogManager.info("form2 - Salva_Dati - storeSecureDataField", null, this.LogManager.logWildCard); 
      this.processForm();

      this.adsService.updateAds(this.ads,{VerbaleDiSopralluogo: this.ads.VerbaleDiSopralluogo},function(){
        
       },function(){
           console.error("JsonForm - saveToJSONStore - error on save foto to jsonstore"); 
   
      });         
      
  }


  ImportaVerbaleEsterno(a: Ads) {

     //dati incaricato
     this.ads.VerbaleDiSopralluogo.Cognome_Incaricato = a.VerbaleDiSopralluogo.Cognome_Incaricato;
     this.ads.VerbaleDiSopralluogo.Nome_Incaricato = a.VerbaleDiSopralluogo.Nome_Incaricato;
     this.ads.VerbaleDiSopralluogo.Telefono_Incaricato = a.VerbaleDiSopralluogo.Telefono_Incaricato;
 
     //dati tecnico referente
     this.ads.VerbaleDiSopralluogo.Cognome_Tecnico = a.VerbaleDiSopralluogo.Cognome_Tecnico;
     this.ads.VerbaleDiSopralluogo.Nome_Tecnico = a.VerbaleDiSopralluogo.Nome_Tecnico;
     this.ads.VerbaleDiSopralluogo.Telefono_Tecnico = a.VerbaleDiSopralluogo.Telefono_Tecnico;
     this.ads.VerbaleDiSopralluogo.Paratica_Sospesa = a.VerbaleDiSopralluogo.Paratica_Sospesa;
     this.ads.VerbaleDiSopralluogo.Pratica_Annullata = a.VerbaleDiSopralluogo.Pratica_Annullata;
 
     //richieste aggiuntive
     this.ads.VerbaleDiSopralluogo.show_comp[0].tipo = a.VerbaleDiSopralluogo.show_comp[0].tipo;
     this.ads.VerbaleDiSopralluogo.show_comp[1].tipo = a.VerbaleDiSopralluogo.show_comp[1].tipo;
     this.ads.VerbaleDiSopralluogo.show_comp[2].tipo = a.VerbaleDiSopralluogo.show_comp[2].tipo;
 
     this.ads.VerbaleDiSopralluogo.show_comp[0].descrizione = a.VerbaleDiSopralluogo.show_comp[0].descrizione;
     this.ads.VerbaleDiSopralluogo.show_comp[1].descrizione = a.VerbaleDiSopralluogo.show_comp[1].descrizione;
     this.ads.VerbaleDiSopralluogo.show_comp[2].descrizione = a.VerbaleDiSopralluogo.show_comp[2].descrizione;
 
     //adempimenti tabella
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_1_IMG1 = a.VerbaleDiSopralluogo.Servizio_Opere_1_IMG1;
     this.ads.VerbaleDiSopralluogo.H_Opere_1_IMG1 = a.VerbaleDiSopralluogo.H_Opere_1_IMG1;
     this.ads.VerbaleDiSopralluogo.L_Opere_1_IMG1 = a.VerbaleDiSopralluogo.L_Opere_1_IMG1;
     this.ads.VerbaleDiSopralluogo.P_Opere_1_IMG1 = a.VerbaleDiSopralluogo.P_Opere_1_IMG1;
     this.ads.VerbaleDiSopralluogo.A_Opere_1_IMG1 = a.VerbaleDiSopralluogo.A_Opere_1_IMG1;
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_2_IMG1 = a.VerbaleDiSopralluogo.Servizio_Opere_2_IMG1;
     this.ads.VerbaleDiSopralluogo.H_Opere_2_IMG1 = a.VerbaleDiSopralluogo.H_Opere_2_IMG1;
     this.ads.VerbaleDiSopralluogo.L_Opere_2_IMG1 = a.VerbaleDiSopralluogo.L_Opere_2_IMG1;
     this.ads.VerbaleDiSopralluogo.P_Opere_2_IMG1 = a.VerbaleDiSopralluogo.P_Opere_2_IMG1;
     this.ads.VerbaleDiSopralluogo.A_Opere_2_IMG1 = a.VerbaleDiSopralluogo.A_Opere_2_IMG1;
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_3_IMG1 = a.VerbaleDiSopralluogo.Servizio_Opere_3_IMG1;
     this.ads.VerbaleDiSopralluogo.H_Opere_3_IMG1 = a.VerbaleDiSopralluogo.H_Opere_3_IMG1;
     this.ads.VerbaleDiSopralluogo.L_Opere_3_IMG1 = a.VerbaleDiSopralluogo.L_Opere_3_IMG1;
     this.ads.VerbaleDiSopralluogo.P_Opere_3_IMG1 = a.VerbaleDiSopralluogo.P_Opere_3_IMG1;
     this.ads.VerbaleDiSopralluogo.A_Opere_3_IMG1 = a.VerbaleDiSopralluogo.A_Opere_3_IMG1;
 
     //tabella 2
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_1_IMG2 = a.VerbaleDiSopralluogo.Servizio_Opere_1_IMG2;
     this.ads.VerbaleDiSopralluogo.P_Opere_1_IMG2 = a.VerbaleDiSopralluogo.P_Opere_1_IMG2;
     this.ads.VerbaleDiSopralluogo.H_Opere_1_IMG2 = a.VerbaleDiSopralluogo.H_Opere_1_IMG2;
     this.ads.VerbaleDiSopralluogo.L_Opere_1_IMG2 = a.VerbaleDiSopralluogo.L_Opere_1_IMG2;
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_2_IMG2 = a.VerbaleDiSopralluogo.Servizio_Opere_2_IMG2;
     this.ads.VerbaleDiSopralluogo.L_Opere_2_IMG2 = a.VerbaleDiSopralluogo.L_Opere_2_IMG2;
     this.ads.VerbaleDiSopralluogo.P_Opere_2_IMG2 = a.VerbaleDiSopralluogo.P_Opere_2_IMG2;
     this.ads.VerbaleDiSopralluogo.H_Opere_2_IMG2 = a.VerbaleDiSopralluogo.H_Opere_2_IMG2;
     this.ads.VerbaleDiSopralluogo.Servizio_Opere_3_IMG2 = a.VerbaleDiSopralluogo.Servizio_Opere_3_IMG2;
     this.ads.VerbaleDiSopralluogo.L_Opere_3_IMG2 = a.VerbaleDiSopralluogo.L_Opere_3_IMG2;
     this.ads.VerbaleDiSopralluogo.P_Opere_3_IMG2 = a.VerbaleDiSopralluogo.P_Opere_3_IMG2;
     this.ads.VerbaleDiSopralluogo.H_Opere_3_IMG2 = a.VerbaleDiSopralluogo.H_Opere_3_IMG2;
 
     //descrizione note
     this.ads.VerbaleDiSopralluogo.Descrizione_note = a.VerbaleDiSopralluogo.Descrizione_note;
     this.ads.VerbaleDiSopralluogo.Consegnato_Allegato_tecnico = a.VerbaleDiSopralluogo.Consegnato_Allegato_tecnico;
 
     //atti autorizzativi
     this.ads.VerbaleDiSopralluogo.Seleziona_Ente = a.VerbaleDiSopralluogo.Seleziona_Ente;
     this.ads.VerbaleDiSopralluogo.Adempimenti_Altro = a.VerbaleDiSopralluogo.Adempimenti_Altro;
     this.ads.VerbaleDiSopralluogo.Adempimenti_Altro_Note = a.VerbaleDiSopralluogo.Adempimenti_Altro_Note;
 
     this.ads.VerbaleDiSopralluogo.AdeguamentiNecessariCliente = a.VerbaleDiSopralluogo.AdeguamentiNecessariCliente;
     this.ads.VerbaleDiSopralluogo.AdeguamentoCaricoCliente = a.VerbaleDiSopralluogo.AdeguamentoCaricoCliente;
     this.ads.VerbaleDiSopralluogo.Note_dinamiche = a.VerbaleDiSopralluogo.Note_dinamiche;
 
 
  }

  processForm() {
    this.LogManager.info("form2 - processForm"); 
    var img = this.ads.Base64ImgSopralluogo;
    this.ads.VerbaleDiSopralluogo.setImg(img);
  }

  checkValidNumber(n: string){
    if(this.ads.VerbaleDiSopralluogo[n] === null) {
      alert("Inserire un numero valido");
      this.ads.VerbaleDiSopralluogo[n] = "";
    }
  }

  callbackPaint(data){
    this.openModal = undefined;
          if (data==undefined) {
            this.imgPaint = this.ads.DisegnoTecnico;
            return;
          }
          this.jsonPaint = data.canvas;
          this.imgPaint = data.image;
          this.ads.setDisegnoTecnicoBase64(this.imgPaint);
          this.jsonStoreManager.storeSecureDataField({key:"JSON_DT"+this.ads.Id, dataType:"string"}, {JSONDATA: this.jsonPaint}, () => {}, () => {});
         
          var self = this;
          this.ads.setDisegnoTecnico(this.imgPaint,function(){
              self.savePhotoInGal( self.imgPaint);
              self.adsService.updateAds(self.ads,{DisegnoTecnico: self.ads.DisegnoTecnico},function(){},function(){console.error('error in updating disegno tecnico');});
              self = null;
        });
  }

    

  Disegna() {
    this.LogManager.info("form2 - Disegna "); 
    let paintModal = this.modalCtrl.create(PainterPage2, {codiceODL:this.ads.Id,ads:this.ads, disegnoTecnico:true,callback:this.callbackPaint, self:this  });
      paintModal.onDidDismiss(data => {
        this.callbackPaint(data);
      
      });
    paintModal.present();

    this.openModal = paintModal;
     this.openModal.name = "painter";
  }
  
  Richiama_Salvataggio_e_pdf(){        
     
        this.LogManager.info("form2 - Richiama_Salvataggio_e_pdf ");   
       
    if(((this.ads.VerbaleDiSopralluogo.Email == "") || (this.ads.VerbaleDiSopralluogo.Email == undefined) || (this.ads.VerbaleDiSopralluogo.Email == " "))  && (this.ads.VerbaleDiSopralluogo.TipoVerbale == "digitale"))
    {
        let alert = this.alertCtrl.create({
          title: 'Attenzione!',
          subTitle: 'Campo mail obbligatorio per formato verbale digitale',
          buttons: [
      {
        text: 'Ok',
        handler: data => {
           document.getElementById('mandatoryEmail').scrollIntoView();
        }
      }]
        });

        alert.present();      
    }
    
    else if(!this.ads.ConfermaAvviso && this.ads.CodiceAds != undefined) {
      let alert = this.alertCtrl.create({
        title: 'Attenzione!',
        subTitle: 'Devi prima confermare i dati tecnici dalla schermata di dettaglio',
        buttons: ['OK']
      });

      alert.present();  
    }
    
    else if(!this.ads.VerbaleDiSopralluogo.Seleziona_Ente) {
      let alert = this.alertCtrl.create({
        title: 'Attenzione!',
        subTitle: 'Inserire il campo ente per poter proseguire',
        buttons: ['OK']
      });

      alert.present();  
    }
    else if(this.ads.Prestazione !==  Prestazione.PR1 && !this.ads.VerbaleDiSopralluogo.AdeguamentoCaricoCliente && !this.ads.VerbaleDiSopralluogo.Pratica_Annullata) {
      let alert = this.alertCtrl.create({
        title: 'Attenzione!',
        subTitle: 'Selezionare il campo Stato Alloggiamento Misuratori per proseguire.',
        buttons: ['OK']
      });

      alert.present();  
    }
    else if((this.ads.Prestazione !==  Prestazione.PR1 && this.ads.VerbaleDiSopralluogo.AdeguamentoCaricoCliente === AdeguamentoCliente.NON_ADEGUATO) &&
             (this.ads.VerbaleDiSopralluogo.AdeguamentiNecessariCliente === undefined ||this.ads.VerbaleDiSopralluogo.AdeguamentiNecessariCliente.length === 0)) {
      let alert = this.alertCtrl.create({
        title: 'Attenzione!',
        subTitle: 'Selezionare almeno una causale in caso di Alloggiamento NON ADEGUATO.',
        buttons: ['OK']
      });

      alert.present();  
    }

    else            
    {
      this.processForm();
    
      //var tmp = this.ads.getDisegnoTecnicoBase64();
      //this.ads.setDisegnoTecnicoBase64('');
      var self = this;

      this.adsService.updateAds(this.ads,{VerbaleDiSopralluogo: this.ads.VerbaleDiSopralluogo},function(){
          //self.ads.setDisegnoTecnicoBase64(tmp);
          self.Crea_pdf();
    },function(){
        console.error("JsonForm - saveToJSONStore - error on save foto to jsonstore"); 

    });
    }           

  }

  setCheckRAPm1(){
    this.zone.run(() => {
      this.ads.VerbaleDiSopralluogo.show_comp[1]['tipo'] = ! this.ads.VerbaleDiSopralluogo.show_comp[1]['tipo'];
    })
  }

  setCheckRAPn1(){
     this.zone.run(() => {
      this.ads.VerbaleDiSopralluogo.show_comp[0]['tipo'] = ! this.ads.VerbaleDiSopralluogo.show_comp[0]['tipo'];
    })
  }

  setCheckRAPr1(){
     this.zone.run(() => {
      this.ads.VerbaleDiSopralluogo.show_comp[2]['tipo'] = ! this.ads.VerbaleDiSopralluogo.show_comp[2]['tipo'];
     })
  }

  Crea_pdf(){


    this.LogManager.info("form2 - Crea_pdf ");   
    for(let key in this.ads.VerbaleDiSopralluogo) {
      if(!this.ads.VerbaleDiSopralluogo[key] && typeof this.ads.VerbaleDiSopralluogo[key] !== "boolean"){
        this.ads.VerbaleDiSopralluogo[key] = " ";
      }
          
    } 


    var today = new Date();
    var timeWrite = (today.getDate()) + "-" + (today.getMonth() + 1) + "-" + (today.getFullYear());
    //Object
    var strDate = today.getDay()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds();
    var strCodRintrTmp = this.ads.CodiceRintracciabilita;
    if(strCodRintrTmp==undefined){
      strCodRintr = '';
    }
    var strCodRintr = strCodRintrTmp.replace('/', ""); 
    
    this.nomePdf = "Verbale di sopralluogo_"+strCodRintr+"_"+strDate;


    this.ads.VerbaleDiSopralluogo.normalizzaVerbale(this.ads);
    this.ads.VerbaleDiSopralluogo.NomeFile = this.nomePdf + ".pdf";
    var self = this;

    var item:
      {      
        data: { today: string },        
        download: { needDownload: boolean, pdfName: string, codice_ads_odl: string, ads: object},    
        dati: {form: Object},
        immagine: { img: string }
      }
      =
      {
        data: { today: timeWrite},       
        download: {
          needDownload: false,
          pdfName: this.nomePdf,
          codice_ads_odl: this.ads.Id,
          ads: this.ads
        },
        dati: {form: this.ads.VerbaleDiSopralluogo},
        immagine: { img: this.imgPaint }              
      };


 var pdfCreatedSuccess = (result: PdfResult) => {

    var self = this;
          fileUtil.createFile( this.ads.Id, "file",this.nomePdf+ ".pdf", result.pdfObj, function(){
          
            var doc = [];
            var name = fileUtil.getExternalStoragePath()+self.ads.Id+"/file/"+self.nomePdf+ ".pdf";
            for(let el of self.ads.dataDocument){
              if(el.name != name) doc.push(el);
            }
            
            doc.push({name:name,tag:'doc'});

            let docUtils = new DocUtils();

            docUtils.addDocumentInMemory(name, result.base64);
            self.ads.dataDocument = doc;

            self.adsService.updateAds(self.ads,{dataDocument:self.ads.dataDocument},
            function(){
              console.log("save doc to jsonstore");
              self.jsonStoreManager.storeSecureDataField({key:"JSON_DT"+self.ads.Id, dataType:"string"}, {JSONDATA: ''}, () => {}, () => {});
              self.widgets.showToastStandardDuration("Verbale di sopralluogo salvato con successo");
             self.naviga_back_details();
            },
            function(){
              console.error("error on save foto to jsonstore");
              self.jsonStoreManager.storeSecureDataField({key:"JSON_DT"+self.ads.Id, dataType:"string"}, {JSONDATA: ''}, () => {}, () => {});
              self.widgets.showToastStandardDuration("Il salvataggio ha riscontrato degli errori");
              self.naviga_back_details();
            });

            for(let doc of self.ads.dataDocument){
              if(doc.tag=='doc' && doc.name.indexOf('Verbale')>-1){
                self.LogManager.info('invio verbale di sopralluogo');
                self.ads.VerbaleDiSopralluogo.Path = doc.name;
                let itemId: ItemId = ItemId.create(self.ads.CodiceAds, self.ads.CodiceOdl);
                self.ads.VerbaleDiSopralluogo.Disegno_Schema = "";
                self.ads.VerbaleDiSopralluogo.Img = [];

            //    setTimeout(function(){
                    self.adsSync.execute(itemId,"verbaleSopralluogo", self.ads.VerbaleDiSopralluogo);
             //   },500);

                if(self.ads.VerbaleDiSopralluogo.CausaPraticaSospesa.length === 4) {
                  self.ads.Stato = Stato.SOPRALLUOGO_SOSPESO;
             //     setTimeout(function(){
                      self.adsSync.execute(itemId,"updateStatoPreventivo", {
                        CodiceAds: self.ads.CodiceAds, 
                        Odl: self.ads.CodiceOdl,
                        Stato: "SOPRALLUOGO SOSPESO",
                        Causale: self.ads.VerbaleDiSopralluogo.CausaPraticaSospesa
                      });

                      if(self.ads.NoteEsecutive && self.ads.NoteEsecutive !== null && self.ads.NoteEsecutive !== ""){
                        self.adsSync.execute(itemId, "insNoteCarattereEsecutivo", {
                          note: self.ads.NoteEsecutive,
                          OdL: self.ads.CodiceOdl,
                          TipoNota: "E"
                        });
                      }
                      
                        
                      if(self.ads.NoteProgettuali && self.ads.NoteProgettuali !== null && self.ads.NoteProgettuali !== ""){
                        self.adsSync.execute(itemId, "insNoteCarattereEsecutivo", {
                          note: self.ads.NoteProgettuali,
                          OdL: self.ads.CodiceOdl,
                          TipoNota: "P"
                        });
                      }
       //           },2500);

         //         setTimeout(function(){
                      self.adsService.updateAds(self.ads, {Stato: Stato.SOPRALLUOGO_SOSPESO}, () => {

                      }, () => {

                      });
           //       },2000);

                }
                else if(self.ads.VerbaleDiSopralluogo.CausaPraticaAnnullata.length === 3){
                  self.ads.needToSendAttachment = true;
                  self.ads.Stato = Stato.SOPRALLUOGO_ANNULLATO;
                  let itemId: ItemId = ItemId.create(self.ads.CodiceAds, self.ads.CodiceOdl);
                  
       //            setTimeout(function(){
                        self.adsSync.execute(itemId,"updateStatoPreventivo", {
                          CodiceAds: self.ads.CodiceAds, 
                          Odl: self.ads.CodiceOdl,
                          Stato: "SOPRALLUOGO ANNULLATO",
                          Causale: self.ads.VerbaleDiSopralluogo.CausaPraticaAnnullata
                        });

                        if(self.ads.NoteEsecutive && self.ads.NoteEsecutive !== null && self.ads.NoteEsecutive !== ""){
                          self.adsSync.execute(itemId, "insNoteCarattereEsecutivo", {
                            note: self.ads.NoteEsecutive,
                            OdL: self.ads.CodiceOdl,
                            TipoNota: "E"
                          });
                        }
                        
                          
                        if(self.ads.NoteProgettuali && self.ads.NoteProgettuali !== null && self.ads.NoteProgettuali !== ""){
                          self.adsSync.execute(itemId, "insNoteCarattereEsecutivo", {
                            note: self.ads.NoteProgettuali,
                            OdL: self.ads.CodiceOdl,
                            TipoNota: "P"
                          });
                        }

         //          },2500);

              //      setTimeout(function(){
                          self.adsService.updateAds(self.ads, {Stato: Stato.SOPRALLUOGO_ANNULLATO}, () => {
                            
                                              }, () => {
                          });

           //        },2000);
                }
              }
            }


        },function(){
          self.widgets.showToastStandardDuration("Il salvataggio ha riscontrato degli errori");
          //self.navCtrl.popTo(AdsdetailsPage);
          self.navCtrl.pop();
          console.log('errore nella creazione del file')})
    }

    
 let model = (this.ads.VerbaleDiSopralluogo.Energia_Elettrica)? 'ModelEE' : 'ModelGas';

 this.pdfManager.pdfCreate(model, item).then(
      url => {
        var bean: PrinterSignatureBean = new PrinterSignatureBean();
        bean.dataTemporaryUser = item;
        bean.url = url;
        bean.showDelegateFlag = false;
        bean.title = "Verbale di sopralluogo";
        bean.postprocessTypology = model;
        bean.pdfBean = item;
        this.blobPDF = url.blob;
        bean.succCallback = pdfCreatedSuccess;

        if(this.ads.VerbaleDiSopralluogo.TipoVerbale == "digitale")  
        {
          this.navCtrl.push(
            PreviewPdfTwoSignatures,
            { bean: bean }
            );
        } 
        else
        {
          this.navCtrl.push(
            PreviewPdfNoSignatures,
            { bean: bean }
            );
	      }


      }, (err) => {
        alert(err);
      }
    );    
}


deletePaint(){
  this.jsonPaint = undefined;
  this.imgPaint = undefined;
  var self = this;
  this.ads.setDisegnoTecnicoBase64(this.imgPaint);
  var container = [];
  for(let item of this.ads.dataFoto){
    var tmpTitle = item.name.split('/');
    tmpTitle = tmpTitle[tmpTitle.length-1];
    this.ads.DisegnoTecnico = item.name;
   if(item.tag != "sopralluogoDT"){
      container.push(item);
   }
  }
  this.ads.dataFoto = container;
  this.ads.setDisegnoTecnico(this.imgPaint,function(){
            self.adsService.updateAds(self.ads,{DisegnoTecnico: self.ads.DisegnoTecnico},function(){},function(){console.error('error in updating disegno tecnico');});
            self = null;
  });
}

b64toBlob(b64Data, contentType, sliceSize?) {

  const binary_string =  window.atob(b64Data);
const len = binary_string.length;
const bytes = new Uint8Array(len);
for (let i = 0; i < len; i++) {
  bytes[i] = binary_string.charCodeAt(i);
}
return bytes.buffer;
}


savePhotoInGal( obj){ 
  var filename =  fileUtil.getExternalStoragePath()+this.ads.Id+"/images/disegnoTecnico.jpg";
  obj = obj.substring(23,obj.length);
  var blob = this.b64toBlob(obj,"image/jpg");
  var self = this;

  fileUtil.createFile(this.ads.Id,'images','disegnoTecnico.jpg',blob,function(){
    var container = [];
    var containerBase64 = [];

    if(!self.ads.dataFoto){
        self.ads.dataFoto = [];
    };
    if(!self.ads._base64Img){
      self.ads._base64Img = [];
  };


    for(let item of self.ads.dataFoto){
        var tmpTitle = item.name.split('/');
        tmpTitle = tmpTitle[tmpTitle.length-1];
        var title = tmpTitle.split('.');
        if(item.tag != "sopralluogoDT"){
            container.push(item);
            containerBase64.push(self.ads.getBase64Img(item.name));
        }    
    }
      
      container.push({name:filename, tag: "sopralluogoDT", title: "disegno tecnico"});
      containerBase64.push({name: filename, tag: "sopralluogoDT", base64: obj});
      self.ads.dataFoto = container;
      
      },
    function(err){
        self.LogManager.error("form2 - saveFile - Errore nella creazione del file", err); 
    })

}


modifyPaint(){
    this.jsonStoreManager.getSecureDataField({key: "JSON_DT"+this.ads.Id, dataType: "string"}, (oggetto) => {
        var canvasJSON = undefined;
        if(oggetto && oggetto.value != undefined && oggetto.value.JSONDATA != undefined) canvasJSON = oggetto.value.JSONDATA;
        if(oggetto && oggetto.value != undefined && oggetto.value.value && oggetto.value.value.JSONDATA != undefined) canvasJSON = oggetto.value.value.JSONDATA;
   
       let paintModal = this.modalCtrl.create(PainterPage2, { id:this.ads.Id ,canvasJSON:canvasJSON,ads:this.ads, disegnoTecnico:true, callback: this.callbackPaint, self: this  });
          paintModal.onDidDismiss(data => {
            this.callbackPaint(data);
          });
        paintModal.present();
        this.openModal = paintModal;
        this.openModal.name = "painter";
    },{});
}

Note_Dinamiche() {
  this.LogManager.info("form1 - Note Dinamiche ");
  let noteVerbaleModal = this.modalCtrl.create(NoteVerbalePage,{ads: this.ads});

  noteVerbaleModal.onDidDismiss(data => {   
    this.openModal = undefined;
    if(data?.Note_dinamiche != undefined)
    { 
      this.ads.VerbaleDiSopralluogo.Note_dinamiche = data.Note_dinamiche;
      this.updateNoteDinamiche();
      this.adsService.updateAds(this.ads, {Note_dinamiche: data.Note_dinamiche},() => {
      }, (err) => {console.log(err); this.LogManager.error(JSON.stringify(err));});   
      
    }
  });

  this.openModal = noteVerbaleModal;
  noteVerbaleModal.present();
}

updateNoteDinamiche() {
  if (this.ads.VerbaleDiSopralluogo.Note_dinamiche){
    let res = "";
    for (let note of this.ads.VerbaleDiSopralluogo.Note_dinamiche){
      if (note.checked){
        res +=  NotaSopralluogo.interpolateNoteText(note) + ' ';
      }
    }
    this.note_dinamiche = res;  
  }
}

  ShowModalePdf(){
 this.LogManager.info("form2 - ShowModalePdf");
        let pdfModal = this.modalCtrl.create(ModalepdfPage, {documento: this.testRadioResult});
      pdfModal.onDidDismiss(data => {    
        this.openModal = undefined;    
      });
    pdfModal.present();
    this.openModal = pdfModal;

  }

  ShowModaleNote(quale_nota){
      this.Tipologia_Nota = quale_nota;

      if(this.Tipologia_Nota == "progettuali")
        this.Nota_Form = this.ads.NoteProgettuali;
      else  
        this.Nota_Form =  this.ads.NoteEsecutive;

      let ModalNote = this.modalCtrl.create(ModalenotePage, {testo: this.Nota_Form, ads: this.ads});
      ModalNote.onDidDismiss(data => {        
        this.openModal = undefined;
        if(data != undefined)
        {        
          this.Nota_Form = data.testo;

          if(this.Tipologia_Nota == "progettuali"){
            this.ads.NoteProgettuali = data.testo;
            this.adsService.updateAds(this.ads, 
              {NoteProgettuali: this.ads.NoteProgettuali},
              () => {}, (err) => {console.log(err);});
          }
          
          else {
            this.ads.NoteEsecutive = data.testo;
            this.adsService.updateAds(this.ads, 
              {NoteEsecutive: this.ads.NoteEsecutive},
              () => {}, (err) => {console.log(err);});

          }
          
        }  
                
      });
    ModalNote.present();
    this.openModal = ModalNote;

  } 



  ListaDocumenti() {
      let alert = this.alertCtrl.create({cssClass:'alertBig'});
      alert.setTitle('Metodo di compilazione');
      
      alert.addInput({
        type: 'radio',
        label: 'Batterie modulari gas',
        value: '1',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Contatori a membrana gas',
        value: '2',
        checked: false
      });    

      alert.addInput({
        type: 'radio',
        label: 'Contatori a rotoidi gas.pdf',
        value: '3',
        checked: false
      });          

      alert.addInput({
        type: 'radio',
        label: 'Specifica alloggiamenti acqua',
        value: '4',
        checked: false
      });      

      alert.addInput({
        type: 'radio',
        label: 'Specifiche tecniche connessioni EE.1479915837.1493368415',
        value: '5',
        checked: false
      });     

      alert.addInput({
        type: 'radio',
        label: 'Tabella portate acqua e gas',
        value: '6',
        checked: false
      });       

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;

          this.ShowModalePdf();
        }
      });
      alert.present();
  }

  Tipo_Richiesta(indice){
      let alert = this.alertCtrl.create();
      alert.setTitle('Tipo richiesta');

      var PN1 = false, PM1 = false, PR1 = false;
      
      switch(this.ads.VerbaleDiSopralluogo.show_comp[indice].tipo)
      {
        case "PN1":
          PN1 = true;
        break;
        case "PM1":
          PM1 = true;
        break;
        case "PR1":
          PR1 = true;
        break;
      }      

      alert.addInput({
        type: 'radio',
        label: 'PN1',
        value: 'PN1',
        checked: PN1
      });

      alert.addInput({
        type: 'radio',
        label: 'PM1',
        value: 'PM1',
        checked: PM1
      });    

      alert.addInput({
        type: 'radio',
        label: 'PR1',
        value: 'PR1',
        checked: PR1
      });          
    
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;
                   
          this.ads.VerbaleDiSopralluogo.show_comp[indice].tipo = data;                   
        }
      });
      alert.present();    
  } 

  Importa() {
    let filteredAds: Ads[] = Ads.filterForVerbale(this.adsService.ads, this.ads);
    let modal = this.modalCtrl.create(ModalImportaVerbalePage, {"ads": filteredAds});
    modal.present();

    modal.onDidDismiss(data => {
       this.openModal = undefined;
      if(data){
        if(data.ads){
          this.ImportaVerbaleEsterno(data.ads);
        }
      }
      
        
    });
     this.openModal = modal;

    
  }

  cleanParaticaSospesa() {
    this.ads.VerbaleDiSopralluogo.Paratica_Sospesa = "";
  }

  cleanPraticaAnnullata() {
    this.ads.VerbaleDiSopralluogo.Pratica_Annullata = "";
  }

  cleanContatore1(){
    this.ads.VerbaleDiSopralluogo.Calibro_Contatore = "";
  }

  cleanContatore2(){
    this.ads.VerbaleDiSopralluogo.Calibro_Contatore_2 = "";
  }

  cleanContatore3(){
    this.ads.VerbaleDiSopralluogo.Calibro_Contatore_3 = "";
  }

  cleanContatoreParam(param){
    this.ads.VerbaleDiSopralluogo[param]="";
  }
  
  cleanAdeguamenti(){
    this.ads.VerbaleDiSopralluogo.AdeguamentoCaricoCliente=AdeguamentoCliente.NONE;
    this.ads.VerbaleDiSopralluogo.AdeguamentiNecessariCliente=[];
  }

}
