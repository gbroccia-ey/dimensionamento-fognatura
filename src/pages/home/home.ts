import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController } from 'ionic-angular';
import { DimensionamentoAllacciPage } from '../dimensionamento-allacci/dimensionamento-allacci';
import { PreventivatorePage } from '../preventivatore/preventivatore';
import { MapPage } from '../map/map';
import { Ads,SettoreMerceologico,DettaglioMerceologico, CodSocieta } from '../../models/ads';
import { Caratteristiche } from '../../models/caratteristiche';
import { Cliente } from '../../models/cliente';
import { Indirizzo } from '../../models/indirizzo';
import { Params } from '../../config/params';

declare var esriCtrl;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ads:Ads;

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


  constructor(public navCtrl: NavController,public http: Http) {
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
      societa:7010 // AAA
    }); 
    
    this.ads.ProdServizio="LAVFAT1040";
    this.ads.CodiceAttivita="WF1040";

    this.ads._base64Img = [];
    
  }

  //------------------------------------------------------------
  //               Preventivatore
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

  resetPreventivatoreParams(){
    this.selSocieta = undefined;
    this.selSettore = undefined;
    this.selProdotto = undefined;
    this.selVariante = undefined;
    this.selProvincia = undefined;
    this.selComune = undefined;
    
  }
}
