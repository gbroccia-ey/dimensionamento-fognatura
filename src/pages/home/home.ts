import { Component } from '@angular/core';
import { Http } from '@angular/http';
import * as moment from 'moment'; 

import { NavController } from 'ionic-angular';
import { DimensionamentoAllacciPage } from '../dimensionamento-allacci/dimensionamento-allacci';
import { PreventivatorePage } from '../preventivatore/preventivatore';
import { MapPage } from '../map/map';
import { Ads,SettoreMerceologico,DettaglioMerceologico, CodSocieta, Prestazione } from '../../models/ads';
import { Caratteristiche } from '../../models/caratteristiche';
import { Cliente } from '../../models/cliente';
import { Indirizzo } from '../../models/indirizzo';
import { Params } from '../../config/params';
import { Form1Page } from '../form1/form1';
import { Form2Page } from '../form2/form2';
import { SceltapagePage } from '../sceltapage/sceltapage';
import { VerbaleDiSopralluogo } from '../../models/verbale_di_sopralluogo';
import { ConfermaFormPage } from '../conferma-form/conferma-form';
import { ModalController } from 'ionic-angular';
import { PermessiPage } from '../permessi/permessi';

import { PdfManager, PdfResult } from '../../providers/pdfManager';
import { PrinterSignatureBean } from '../../providers/PrinterSignature';
import { PreviewPdfNoSignatures } from '../preview-pdf-no-signature/preview-pdf-no-signature';
import { FascicoloTecnico } from '../../models/FascicoloTecnico';

declare var esriCtrl;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ads:Ads;
  testVerbaleEnabled:boolean = true;
  testMapEnabled:boolean = false;
  testDatiTecniciEnabled:boolean = true;
  testDimensionamentoEnabled:boolean = true;
  testPreventivatoreEnabled:boolean = true;
  testPermessiEnabled: boolean = true;
  testFascicoloEnabled:boolean = true;
  
  PreventivableProducts = [
    'LAVFAT1100_GAS',
    'LAVFAT1110_GAS',
    'LAVFAT1010_GAS',
    'LAVFAT1040_GAS',
    'LAVFAT1140_GAS',
    'LAVFAT1070_GAS',
    'LAVFAT1170_GAS',
    'LAVFAT1130_GAS',
    'LAVFAT1181_GAS',
    'LAVFAT1610_GAS',
    'LAVINT1630_GAS',
    'LAVFAT1631_GAS',
    'LAVFAT1010_ACQUA',
    'LAVFAT1040_ACQUA',
    'LAVFAT1050_ACQUA',
    'LAVFAT1140_ACQUA',
    'LAVFAT1070_ACQUA',
    'LAVFAT1170_ACQUA',
    'LAVFAT1130_ACQUA',
    'LAVFAT1181_ACQUA',
    'LAVFAT1100_ACQUA',
    'LAVFAT1110_ACQUA',
    'LAVFAT1610_ACQUA',
    'LAVFAT1010_FOGNATURA',
    'LAVFAT1040_FOGNATURA',
  ];
  
  Societa = [
    {label:CodSocieta.AAA , code:7010 },
    {label:CodSocieta.INRETE , code:1900 },
    {label:CodSocieta.HERA , code:5010 },
  ]
  
  
  Settori = [
    {label:"ACQUA", settore: SettoreMerceologico.ACQUA, dettaglio: DettaglioMerceologico.ACQUEDOTTO_CIVILE},
    {label:"FOGNA", settore: SettoreMerceologico.ACQUA, dettaglio: DettaglioMerceologico.FOGNATURA},
    {label:"GAS", settore: SettoreMerceologico.GAS, dettaglio: DettaglioMerceologico.GAS}, 
  ]

  ProdottiServizio = []
  Varianti = [
    // AAA - GAS
    { prov:"", label: "LISTINO BASE", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO COLLINARE GAS", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO ARTEGNA", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO BUTTRIO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO CAMPOFORMIDO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO CODROIPO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO MANZANO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO MARTIGNACCO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO MOGGIO UDINESE", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO PAGNACCO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO PASIAN DI PRATO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO PAVIA DI UDINE", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO POZZUOLO DEL FRIULI", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO PRADAMANO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO PREMARIACCO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO REMANZACCO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO RESIA", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO RESIUTTA", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO SEDEGLIANO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO TAVAGNACCO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO TOLMEZZO", settore:"GAS", societa: CodSocieta.AAA},
    { prov:"", label: "LISTINO ALL.GAS METANO UDINE", settore:"GAS", societa: CodSocieta.AAA},
    
    // AAA - ACQUA
    { prov:"",   label: "LISTINO BASE", settore:"ACQUA", societa: CodSocieta.AAA},
    { prov:"PD", label: "ACQUA PADOVA",  settore:"ACQUA", societa: CodSocieta.AAA},
    
    // AAA - FOGNATURA
    { prov:"TS", label: "LISTINO FORFAIT TRIESTE FOGNA", settore:"FOGNA", societa: CodSocieta.AAA},
    { prov:"PD", label: "LISTINO FORFAIT PADOVA FOGNA", settore:"FOGNA", societa: CodSocieta.AAA},
    
    // HERA - GAS
    { prov:"",   label: "LISTINO BASE", settore:"GAS", societa: CodSocieta.HERA},
    { prov:"RM", label: "LISTINO PREZZI 2 (PROVINCIA RIMINI)", settore:"GAS", societa: CodSocieta.HERA},
    { prov:"BO", label: "LISTINO PREZZI 2 (PROVINCIA BOLOGNA)", settore:"GAS", societa: CodSocieta.HERA},
    { prov:"FO", label: "LISTINO PREZZI 3 (PROVINCIA FORLÌCESENA)", settore:"GAS", societa: CodSocieta.HERA},
    
    // HERA - ACQUA
    { prov:"",   label: "LISTINO BASE", settore:"ACQUA", societa: CodSocieta.HERA},
    { prov:"RM", label: "LISTINO PREZZI 2 (PROVINCIA RIMINI)", settore:"ACQUA", societa: CodSocieta.HERA},
    
    // HERA - FOGNATURA
    { prov:"",   label: "LISTINO BASE", settore:"FOGNA", societa: CodSocieta.HERA},
    
  ]

  Comuni = [];
  Province = [];

  
  selVarianti = [];

  selSocieta;
  selSettore;
  selProdotto;
  selVariante;
  selComune;
  selProvincia;
  copList;
  formFT: any;
  nomePdf: string;
  blobPDF: Blob;


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public pdfManager: PdfManager,
    public http: Http) {
    this.selSocieta = this.Societa[0];
    esriCtrl.addEsri();
    var url = 'assets/cop.txt'; 
    this.http.get(url).subscribe(res => {
      this.copList = res.json();
      this.copList.forEach(val => {
        if (!this.Province.includes(val["Provincia"].toUpperCase())){
          this.Province.push(val["Provincia"].toUpperCase())
        
        }
      });
    });


  }
  
  //------------------------------------------------------------
  //                Dimensionamento Allacci
  //------------------------------------------------------------
  
  openDimensionamentoAllacci() {
    this.populateAdsDimensionamentoFogna()
    this.navCtrl.push(DimensionamentoAllacciPage, this.ads);
  }

 
  populateAdsDimensionamentoFogna(){
    this.ads = new Ads();

    this.ads.CodiceAds = "TestCodeAds"
    this.ads.CodiceOdl = "TestCodeOdl"
    this.ads.SettoreMerceologico = SettoreMerceologico.ACQUA;
    this.ads.DettaglioMerceologico = DettaglioMerceologico.FOGNATURA;
    this.ads.Caratteristiche = new Caratteristiche();
    this.ads.Cliente = new Cliente("cognome","nome","rag_soc","codCli","01234567","a@b.it",
                  new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO"));
    this.ads.Indirizzo = new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO");
    this.ads._altro1 = JSON.stringify({
      societa:7010
    }); 
    
    this.ads.ProdServizio="LAVFAT1040";
    this.ads.CodiceAttivita="WF1040";

    this.ads._base64Img = [];
    
  }

//------------------------------------------------------------
  //               Mappa
  //------------------------------------------------------------
  openMap(){
    this.populateMap();
    let address = {
        location: {
          x: 7.266635,
          y: 11.336377
        }
      },
        data = {id:this.ads.Id, address: address, ads:this.ads, extendGis :true};

    this.navCtrl.push(MapPage, data);
  }


  populateMap(){
    this.ads = new Ads();

    this.ads.CodiceAds = "TestCodeAds"
    this.ads.CodiceOdl = "TestCodeOdl"
    this.ads.SettoreMerceologico = SettoreMerceologico.GAS;
    this.ads.Caratteristiche = new Caratteristiche();
    this.ads.Cliente = new Cliente("cognome","nome","rag_soc","codCli","01234567","a@b.it",
                  new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO"));
    this.ads.Indirizzo = new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO");
    this.ads._altro1 = JSON.stringify({
      societa:5010 // HERA
    }); 
    
    this.ads.ProdServizio="LAVFAT1040";
    this.ads.CodiceAttivita="WF1040";

    this.ads._base64Img = [];
    
  }

  //------------------------------------------------------------
  //               Preventivatore / Verbale Sopralluogo
  //------------------------------------------------------------
  

  onSocietaChange(){

  }

  onSettoreChange(){
    var self = this;
    this.ProdottiServizio = [];
    this.selProdotto = undefined;

    Params.prodServizioList.forEach( (prod) => {
      var key = prod.prodServizio+'_'+((prod.prestazione==="FOGNA")?"FOGNATURA":prod.prestazione);
      if (prod.prestazione === self.selSettore.label && self.PreventivableProducts.includes(key)){
        self.ProdottiServizio.push(prod);
        
      }
    })

    this.selVarianti = []
    this.selVariante = null;
    this.Varianti.forEach((variante) => {
      if ((variante.societa === self.selSocieta.label) && (variante.settore === self.selSettore.label)){
        this.selVarianti.push(variante);
      }
    })

  }


  
  onProdottoChange(){
    
  }

  onProvinciaChange(){
    this.Comuni = []
    this.selComune = null;
    this.copList.forEach(val => {
      if ((val['Provincia'].toUpperCase().includes(this.selProvincia)) && (val['ENTE'] == "COMUNE")){
        this.Comuni.push(val)
      }
    });
  }


  gotMissingParams() {
    return !(this.selProdotto && this.selSocieta && this.selSettore );
  }


  populateAdsPreventivatore(){
    this.ads = new Ads();

    this.ads.CodiceAds = "TestCodeAds"
    this.ads.CodiceOdl = "TestCodeOdl"
    this.ads.Cliente = new Cliente("cognome","nome","rag_soc","codCli","01234567","a@b.it",
                  new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO"));
    this.ads.Indirizzo = new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO");
    
    
    this.ads.Caratteristiche = new Caratteristiche();
    this.ads.ChiaveTestoStd = "ZES0";
     
    
    this.ads.SettoreMerceologico = this.selSettore.settore;
    this.ads.DettaglioMerceologico = this.selSettore.dettaglio;
    
    this.ads.ProdServizio=this.selProdotto.prodServizio;
    this.ads.CodiceAttivita=this.selProdotto.prodServizio.replace("LAVFAT","WF").replace("LAVINT","WF");


    this.ads._altro1 = JSON.stringify({
      societa:this.selSocieta.code,
      varianteListino: this.selVariante?.label
    });
    
    if (this.selVariante && this.selVariante.prov !== ""){
      this.ads.Indirizzo.Provincia = this.selVariante.prov;
    }

    if (this.selProvincia){
      this.ads.Indirizzo.Provincia = this.selProvincia;
    }
    
    if (this.selComune){
      this.ads.Indirizzo.Citta = this.selComune["Localita"];
      this.ads.Indirizzo.Cap = this.selComune["Cod Localita"];
      this.ads.Indirizzo.Provincia = this.selComune["Provincia"];
    }
    
    this.ads._base64Img = [];


    
  }

  openPreventivatore() {
    this.populateAdsPreventivatore();
    
    this.navCtrl.push(PreventivatorePage, {ads:this.ads});
  }

  openPreventivatoreFast() {
    this.populateAdsFast();
    
    this.navCtrl.push(PreventivatorePage, {ads:this.ads});
  }



  openVerbale() {
    this.populateAdsPreventivatore();
    this.navCtrl.push(SceltapagePage,this.ads)

  }


  populateAdsFast(){
    if(!this.ads){
      this.ads = new Ads();
      this.ads.CodiceAds = "TestCodeAds"
      this.ads.CodiceOdl = "TestCodeOdl"
      this.ads.SettoreMerceologico = 11; //ACQUA
      //this.ads.SettoreMerceologico = 10; //GAS
      //this.ads.SettoreMerceologico = 13; //EE
      
      
      //this.ads.DettaglioMerceologico = DettaglioMerceologico.FOGNATURA;
      this.ads.Caratteristiche = new Caratteristiche();
      this.ads.Cliente = new Cliente("cognome","nome","rag_soc","codCli","01234567","a@b.it",
                    new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO"));
      this.ads.Indirizzo = new Indirizzo("nomStrada","nomVia","00001","999","","Bologna","BO");
      this.ads._altro1 = JSON.stringify({
        //societa:7010 // AAA
        //societa:5010 // HT
        societa:1900 // INRETE
      }); 

      

      this.ads.Prestazione = Prestazione.PN1;
      this.ads.ProdServizio="LAVFAT1400";
      this.ads.CodiceAttivita="WF1400";
  
      this.ads._base64Img = [];
  
      this.ads.ChiaveTestoStd = "ZES0";
      this.ads.ConfermaAvviso = false;
      this.ads._bp="TestBP001";
      this.ads.CodiceRintracciabilita = "TestCR001";
      this.ads.Altro3 = "";
      this.ads.Altro4 = "";
  
      if(!this.ads.VerbaleDiSopralluogo) {
        this.ads.VerbaleDiSopralluogo = new VerbaleDiSopralluogo();
        this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Inizio = this.ads.OraInizio;
        //this.ads.VerbaleDiSopralluogo.App_Concordato_Data =  moment(this.ads.DataAppuntamento, "DD-MM-YYYY").format("YYYY-MM-DD");
        this.ads.VerbaleDiSopralluogo.App_Concordato_Data =  "20201010";
        this.ads.VerbaleDiSopralluogo.App_Concordato_Ora_Fine = "0000";
        this.ads.VerbaleDiSopralluogo.App_Effettivo_Ora_Inizio = this.ads.App_Effettivo_Ora_Inizio || "";
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Verificato = false;
        this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza = false;
    
        if(this.ads.ChiaveTestoStd === "ZAP3"){
          this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = "20201010";
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
   
       if(this.ads.VerbaleDiSopralluogo.App_Concordato_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Concordato_Data!=undefined&& this.ads.VerbaleDiSopralluogo.App_Concordato_Data.indexOf('T')>0)
     this.ads.VerbaleDiSopralluogo.App_Concordato_Data = moment(this.ads.VerbaleDiSopralluogo.App_Concordato_Data).format("DD/MM/YYYY"); 
   
    if(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Anticipato_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Anticipato_Data.indexOf('T')>0)
      this.ads.VerbaleDiSopralluogo.App_Anticipato_Data = moment(this.ads.VerbaleDiSopralluogo.App_Anticipato_Data).format("DD/MM/YYYY"); 
    
    if(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Effettivo_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Effettivo_Data.indexOf('T')>0)
      this.ads.VerbaleDiSopralluogo.App_Effettivo_Data = moment(this.ads.VerbaleDiSopralluogo.App_Effettivo_Data).format("DD/MM/YYYY"); 
    
    if(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data!=""&&this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data!=undefined &&  this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data.indexOf('T')>0)
      this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data = moment(this.ads.VerbaleDiSopralluogo.App_Verificata_Assenza_Data).format("DD/MM/YYYY");     
  
    }
  }



  openVerbaleFast() {
    this.populateAdsFast();

    
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

 
  //------------------------------------------------------------
  //               Dati Tecnici
  //------------------------------------------------------------
  
  openDatiTecnici(){
    this.populateAdsFast();
    this.ads.CodiceOdl = undefined
    var modal = this.modalCtrl.create(ConfermaFormPage, { "ads": this.ads });
    
    modal.present();
  }

  //------------------------------------------------------------
  //               Scheda Permessi
  //------------------------------------------------------------
  
  openPermessi() {
    this.populateAdsFast();
    this.navCtrl.push(PermessiPage, this.ads);
  }


//------------------------------------------------------------
  //               Fascicolo Tecnico
  //------------------------------------------------------------
  
  openFascicolo(){
    this.populateAdsFast();

    var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;

        var sDay = ""+day;
        var sMonth = ""+month;
        if(day<10) sDay = "0"+day;
        if(month<10) sMonth = "0"+month; 

        var timeWrite = sDay + "/" + sMonth+ "/" + (today.getFullYear());


         this.formFT = new FascicoloTecnico(
			      // Tipo servizio
            this.ads,
            "this.ads.NoteProgettuali",
            "this.ads.NoteEsecutive",
            timeWrite

    );
    
    this.Crea_pdf_internal();
  }

  Crea_pdf_internal(){
    var nomePdfPartial = "Fascicolo tecnico";
    var  model = "fascicoloTecnico";
          
  
  
        for(let key in this.formFT) {
          if(this.formFT[key] == undefined || this.formFT[key] == null || this.formFT[key] =="")
            this.formFT[key] = " ";
      } 
  
      var today = new Date();
      var timeWrite = (today.getDate()) + "-" + (today.getMonth() + 1) + "-" + (today.getFullYear());
       var strDate = today.getDay()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds();
      //Object
      this.nomePdf = model+"_"+this.ads.Id+"_"+strDate+".pdf";
     
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
        console.log('file creato');
    
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








  resetPreventivatoreParams(){
    this.selSocieta = undefined;
    this.selSettore = undefined;
    this.selProdotto = undefined;
    this.selVariante = undefined;
    this.selProvincia = undefined;
    this.selComune = undefined;
    
  }
}
