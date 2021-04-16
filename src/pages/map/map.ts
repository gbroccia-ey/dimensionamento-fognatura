import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LogManager } from '../../providers/log-manager/logManager';
//import { JSONStoreManager } from '../../providers/jsonstore-manager/jsonstoremanager';

/*import { html2canvas } from 'angular-sap-html2canvas';*/
import { AlertController } from 'ionic-angular';

//import { FotoPage } from '../foto/foto';
import { Ads, SettoreMerceologico, DettaglioMerceologico } from '../../models/ads';
import { AdsService } from '../../services/ads-service';
import { MapTreePage } from '../map-tree/map-tree';


declare var esriCtrl: any;
declare var fileUtil: any;

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  acquaLayer;
  gasLayer;
  EELayer;
  fognaturaLayer;
  basemapLayer;
  ctrLayer;
  tlrLayer;
  pianettiLayer;

  dataFoto;
  images = [];
  ads: Ads;
  isGas;
  isEE;
  isFogna;
  lat;
  lng;

//gis esteso
  extendGis;
  alloggiamentoManuale;
  trattaManuale;
  pendingOperation;
  tubature = [];
  alloggiamento;
  gru;
  listaGru;
  listaModelli;
  isConfermable;
  posizioneTubatura;
  tubaturaLayer;
  tubatura;
  shotting = false;
  layerSelected;
  canGoBack: boolean = true;
  showInfoTitle;
  infoTitle = "";
  preventClickClass="preventClickSmall";
  disableManuale;
  disableAlloggiamento = false;
  

 public unregisterBackButtonAction: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl: AlertController,public platform: Platform,
              public LogManager: LogManager,
              //public jsonstoreManager: JSONStoreManager,
              public adsService: AdsService) {

               this.ads = navParams.get('ads');
    this.extendGis = navParams.get('extendGis');
    this.lat = navParams.data.address.location.x;
    this.lng = navParams.data.address.location.y;

   this.acquaLayer = {name:'acqua',id:'48',checked:false};
    this.tlrLayer = {name:'tlr',id:'0',checked:false};
    this.EELayer = {name:'ee' ,id:'14',checked:false};
    this.gasLayer = {name:'gas',id:'31',checked:false};
    this.fognaturaLayer = {name:'fognatura',id:'0',checked:false};
    this.basemapLayer = {name:'basemap',id:'-1',checked:false};
    this.ctrLayer = {name:'ctr',id:'106',checked:false};
    this.pianettiLayer = {name:'pianetti',id:'53',checked:false};
    this.disableManuale = false;
     
    this.gru = {stato:'', marca:'', modello:''};
    this.listaGru = {lista:[
      {marca:'ALTRO',listaModelli:[
        'altro'
      ]},
      {marca:'TARTARINI',listaModelli:[
        'altro','R25','R62','R70','R71','R72','R73','R74','R75','R70 FS'
      ]},
      {marca:'FIORENTINI',listaModelli:[
         'altro','FE6','FE10','FE25','FES50','FEXF','FEX','FEXS'
      ]},
      {marca:'MESURA/RECA',listaModelli:[
          'altro','B6','B10','B25','C25','C25 VSI'
      ]},
      {marca:'REGAS/ITRON',listaModelli:[
          'altro','RB1200','RB1210','RB1211','RB1212','RB1700'
      ]},
      {marca:'SCHLUMBERGER',listaModelli:[
          'altro','RB1200','RB1210','RB1211','RB1212','RB1700'
      ]},
      {marca:'NUOVO PIGNONE',listaModelli:[
          'altro'
      ]}
    ]}

    //esriCtrl.deleteLastPosition();
    if(this.ads.DettaglioMerceologico==DettaglioMerceologico["FOGNATURA"]){
      this.alloggiamento = 'singolo';
      this.disableAlloggiamento = true;
    }

}

  ionViewDidLoad() {
      this.LogManager.info("map - ionViewDidLoad");
      var self = this;

      esriCtrl.setCallbackPianetti(function(idSap, url,callback){
        let alert = self.alertCtrl.create({
          title: 'Pianetto '+idSap,
          subTitle: 'Vai ai documenti relativi al pianetto',
          buttons: [{
            text: 'OK',
            handler: () => { 
              alert.dismiss();          
              callback(url)
            }
          },
            {
              text: 'Annulla',
              handler: () => {            
              }
            }]
          
        });
        alert.present();  
      });

      var userData = {username :"GIANAMEDEO.DEPLANO",password:"@EYINT2021"};
      switch(self.ads.SettoreMerceologico)
      {
        case SettoreMerceologico.ACQUA: 
            if(self.ads.DettaglioMerceologico==3){
                self.fognaturaLayer.checked = true;
                esriCtrl.init(self.lat,self.lng,self.fognaturaLayer,self.ads,userData);
                self.isFogna = true;
              }
              else{
              self.acquaLayer.checked = true;
              esriCtrl.init(self.lat,self.lng,self.acquaLayer,self.ads,userData);
            }
              break;                          
        case SettoreMerceologico.GAS:
            self.gasLayer.checked = true; 
            self.isGas = true;
            esriCtrl.init(self.lat,self.lng,self.gasLayer,self.ads,userData);
            break;
        case SettoreMerceologico.TLR:
            self.tlrLayer.checked = true; 
            self.isGas = true;
            esriCtrl.init(self.lat,self.lng,self.tlrLayer,self.ads,userData);
            break;
        case SettoreMerceologico.ENERGIA_ELETTRICA:
            self.EELayer.checked = true; 
            self.isEE = true;
            esriCtrl.init(self.lat,self.lng,self.EELayer,self.ads,userData);
            break;
      }
          

      /*  document.querySelector('.searchClear').addEventListener("click", function(){
                var suggestionMenu: HTMLElement = <HTMLElement>document.querySelector('.suggestionsMenu');
                suggestionMenu.children[0].remove();
        }, true);*/
  }

  ionViewDidEnter(){
      this.dataFoto = this.ads.dataFoto;
      this.images = this.ads.Base64ImgFt;
       this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
             this.naviga_back();
        }, 10);
  }
  
   ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
       if(this.ads.TubaturaPosizionata==false) this.ads.TubaturaPosizionata = undefined;
       try{
        document.querySelector('.searchClear').removeEventListener("click", function(){
          var suggestionMenu: HTMLElement = <HTMLElement>document.querySelector('.suggestionsMenu');
           suggestionMenu.children[0].remove();
        }, true);
       }catch(err){}
    
  }


  getTrascodificaAcqua(str){
    var retStr = str;
    switch(str){
        case 'AP': { retStr = 'Allacciamento';break;}
        case 'ACRN': { retStr = 'Acqua non potabile';break;}
        case 'ARA': { retStr = 'Adduzione';break;}
        case 'ACRS': { retStr = 'Scarico';break;}
        case 'ARD': { retStr = 'Distribuzione';break;}
        case 'AIRD': { retStr = 'Distribuzione industriale';break;}
        case 'ACRM': { retStr = 'Mista adduzione-distr.';break;}
        case 'ARAF': { retStr = 'Rafforzamenti';break;}
        case 'ARI': { retStr = 'Impianto interna';break;}
    }
    return retStr;
  }

  getDescrTratta(item){
    var str = "";
    if(item[2].MATERIALE) str += item[2].MATERIALE;
    if(item[2].DIAMETRO) str += ' '+item[2].DIAMETRO
    if(item[2].SPECIEGAS) str += ' '+item[2].SPECIEGAS +'°Spec';
    return str;
  }

  getDescrTrattaH20(item){
    if(item[2].TIPORETEACQUA) return this.getTrascodificaAcqua(item[2].TIPORETEACQUA);
    return undefined;
  }


   naviga_back(){
     
   if(this.canGoBack){
      this.canGoBack = false;
      this.navCtrl.pop();
    }
  }

  updateLayers(){
    var layers = [this.acquaLayer,this.gasLayer,this.tlrLayer, this.EELayer,this.fognaturaLayer,this.basemapLayer,this.ctrLayer, this.pianettiLayer];
    esriCtrl.setLayers(layers);
  }
 
  findPosition(){
    esriCtrl.location();
  }

  setConfermable(){
    if (this.tubatura == undefined) this.isConfermable = false;
    else if (this.alloggiamento == undefined ) this.isConfermable = false;
    else if(this.alloggiamento == 'nessuno') this.isConfermable = true;
    else if(this.alloggiamento != '' && !this.isGas) this.isConfermable = true;
    else if(this.alloggiamento != '' && this.isFogna) this.isConfermable = true;
    else if (this.gru.stato!='' && this.gru.stato!='si') this.isConfermable = true;
    else if(this.gru.stato=='si' && this.gru.marca!='' && this.gru.modello!='') this.isConfermable = true;
    else this.isConfermable = false;
  }

  checkConfermable(): boolean {
    this.setConfermable();
    return this.isConfermable;
  }

  setListaModelli(){
     for( let item of this.listaGru.lista){
       if(item.marca== this.gru.marca) {
         this.listaModelli = item.listaModelli;
        }
     }
  }

  posizionaAlloggiamento(automatic){
    var self = this;
    if(this.pendingOperation) return;
    this.pendingOperation = true;
    if(automatic==false) {
         this.alloggiamentoManuale = true;
         this.showInfoTitle = true;
         this.infoTitle = "Clicca sulla mappa per posizionare l'inizio della tubatura";
    }
    esriCtrl.setPosition(function(res){
       self.ricavaListaTubature(res);
       self = null;
     },
        automatic);
  }

  ricavaListaTubature(res){
      this.ads.TubaturaPosizionata = false;
      this.posizioneTubatura = {from:'',to:''};
      this.posizioneTubatura.from = {y: res.lat, x: res.lng};
    
    this.layerSelected = this.getLayers();
    var self = this;

    //invocazione servizio 
    esriCtrl.getListaTubature(this.posizioneTubatura.from.x, this.posizioneTubatura.from.y, this.layerSelected, function(res){      
      self.tubature = res;
    if(self.ads.SettoreMerceologico==SettoreMerceologico['ENERGIA_ELETTRICA']) self.tubature.push([
      {dist: 4989250.51801},{paths: Array(1)},{SUPFLOC:"unset",OBJECTID:'nuova',SOT:"unset"}]);
    if(self.tubature==undefined || self.tubature.length ==0){
      self.disableManuale = true;
      self.tubature.push([{dist: 4989250.51801},{paths: Array(1)},{SUPFLOC:"unset",OBJECTID:'nessun allaccio',SOT:"unset"}])
    }
    if(self.tubature!=undefined && self.tubature.length==1) {
      self.tubaturaLayer = self.tubature[0][2].OBJECTID;
      self.tubatura = self.tubature[0];
    }

    self.mostraTubatura();
    self = null;
    });

  }

getLayers() {
    var layers = [this.acquaLayer, this.gasLayer,this.tlrLayer, this.EELayer, this.fognaturaLayer, this.basemapLayer, this.ctrLayer, this.pianettiLayer];
    var layerSelecter = [];
    var layerSelected;
      switch(this.ads.SettoreMerceologico) {
        case SettoreMerceologico["ACQUA"]: {
          layerSelected = "AC";
          if(this.ads.DettaglioMerceologico==DettaglioMerceologico["FOGNATURA"])
             layerSelected = "F";

          if(this.ads.DettaglioMerceologico==DettaglioMerceologico["ACQUEDOTTO_INDUSTRIALE"])
             layerSelected = "AI";
          break;
        }
        case  SettoreMerceologico["GAS"]: {
          layerSelected = "G";
          break;
        }
        case  SettoreMerceologico["ENERGIA_ELETTRICA"]: {
          layerSelected = "E";
          break;
        }
        case SettoreMerceologico["TLR"]: {
          layerSelected = "T";
          break;
        }
      
    }

    return layerSelected;
  }

  selezionaDaMappa() { 
    /*var layer = this.getLayers();
    this.alloggiamentoManuale = false;
    console.log("selezionaDaMappa", layer);*/
    var self = this;
    esriCtrl.deleteLine(true);
    this.trattaManuale = true;
    this.showInfoTitle = true;
    this.infoTitle = 'Clicca sulla mappa per posizionare il punto sulla tratta';
    esriCtrl.getDestinationPoint(function(point){

      console.log('inside destination point');
      var arrDist = [];
      for(let item of self.tubature){
        if(item[2].OBJECTID!='nuova')
        esriCtrl.getNearestCoordinate(item,point,function(nearestPoint){
           console.log('callback nearest coordinate');
          arrDist.push(nearestPoint);
        })
      }

      self.infoTitle = "Attendi termine del calcolo...";

    var trattaCreata = false;
    for(var a=0; a<10; a++){
      setTimeout(() => {
        if(trattaCreata==true) return;
        if(arrDist.length>=self.tubature.length -1){
            var minDistPoint = {distance: 100000000000,coordinate: {x:'',y:''}};
            var index = 0;
            for(var y=0;y<arrDist.length;y++){
               if(arrDist[y].distance < minDistPoint.distance) {
                 minDistPoint = arrDist[y];
                 index = y;
              }
            }
            trattaCreata = true;
            self.showInfoTitle = false;
            self.posizioneTubatura.to = { x: minDistPoint.coordinate.x, y:minDistPoint.coordinate.y};
            self.tubaturaLayer = self.tubature[index][2].OBJECTID;
            self.tubatura = self.tubature[index];
            esriCtrl.setLine([[minDistPoint.coordinate.x,minDistPoint.coordinate.y],[self.posizioneTubatura.from.x,self.posizioneTubatura.from.y]]);
            setTimeout(() => {self.trattaManuale = false;},1000);
          }
      },a*1000);
    }
    
  }); 

  }

  mostraTubatura(){
    if(this.trattaManuale == true) return;
    var self = this;
    for(let item of this.tubature){
       if(item[2].OBJECTID==this.tubaturaLayer){
          this.tubatura = item;
       }
    }

    if(this.tubatura!= undefined && (this.tubatura[2].OBJECTID=='nuova' || this.tubatura[2].OBJECTID=='nessun allaccio') ){
         esriCtrl.deleteLine(true);
         this.preventClickClass="preventClickSmall";
         this.showInfoTitle = false;
         /*this.showInfoTitle = true;
         this.infoTitle = 'Clicca sulla mappa per posizionare la fine della tubatura';
         this.alloggiamentoManuale = true;
         esriCtrl.getDestinationPoint(function(point){
            self.showInfoTitle = false;
            self.posizioneTubatura.to = { x: point.x, y:point.y};
            esriCtrl.setLine([[point.x,point.y],[self.posizioneTubatura.from.x,self.posizioneTubatura.from.y]]);
         }); */
    }
    else  if(this.tubatura!= undefined){
       esriCtrl.getDestinationPoint(undefined);
        self.showInfoTitle = false;
      this.preventClickClass="preventClickSmall";
      for(let item of this.tubature){
        if(""+item[2].OBJECTID == this.tubatura[2].OBJECTID){
        esriCtrl.getNearestCoordinate(item,this.posizioneTubatura.from,function(nearestPoint){
           self.posizioneTubatura.to = { x: nearestPoint.coordinate.x, y:nearestPoint.coordinate.y};
         esriCtrl.setLine([[nearestPoint.coordinate.x,nearestPoint.coordinate.y],[self.posizioneTubatura.from.x,self.posizioneTubatura.from.y]]);
        });
      }
    }
  }
  }

  confermaAlloggiamento(){
     
      esriCtrl.getDestinationPoint(undefined); 
       var  dataToSend = [{
            attributes:{
              ODL: '',
              TIPO:'',
              TIPOFORNITURA:'',
              TIPOATTIVITA:'',
              TIPOPRESTAZIONE:'',
              SETTOREMERCEOLOGICO :'',
              SUPFLOC :''
            },
            geometry: {
              x: this.posizioneTubatura.from.x,
              y: this.posizioneTubatura.from.y
            }
            }
          ];

         
       var dataToSendAllaccio = [{
          attributes:{
              ODL: '',
              SETTOREMERCEOLOGICO:''
            },
            geometry: {
              paths : [[[this.posizioneTubatura.from.x,this.posizioneTubatura.from.y],[this.posizioneTubatura.to.x,this.posizioneTubatura.to.y]]],
              spatialReference : {"wkid" : 4326}
            }
       }]   

       var endPoint;

      switch(this.ads.SettoreMerceologico)
            {
            case SettoreMerceologico.ACQUA:          
              endPoint = "0";
              dataToSend[0].attributes.SETTOREMERCEOLOGICO = 'ACQUA';
              dataToSendAllaccio[0].attributes.SETTOREMERCEOLOGICO = 'ACQUA';
              if(this.ads.DettaglioMerceologico==DettaglioMerceologico['FOGNATURA']){
                 endPoint = '2';
              }
            break;      
            case SettoreMerceologico.TLR:
                dataToSend[0].attributes.SETTOREMERCEOLOGICO = 'TLR';
                dataToSendAllaccio[0].attributes.SETTOREMERCEOLOGICO = 'TLR'
                endPoint = "8";
            break;                          
            case SettoreMerceologico.GAS:
                dataToSend[0].attributes.SETTOREMERCEOLOGICO = 'GAS';
                 dataToSendAllaccio[0].attributes.SETTOREMERCEOLOGICO = 'GAS'
                endPoint = "6";
            break;
            case SettoreMerceologico.ENERGIA_ELETTRICA:
                dataToSend[0].attributes.SETTOREMERCEOLOGICO = 'ENERGIA_ELETTRICA';
                dataToSendAllaccio[0].attributes.SETTOREMERCEOLOGICO = 'ENERGIA_ELETTRICA';
                /*dataToSend[0].attributes['IDSAP_NUMINV'] = this.tubatura[2].IDSAP;
                dataToSendAllaccio[0].attributes['IDSAP_NUMINV'] = this.tubatura[2].IDSAP;*/
                endPoint = "4";
            break;
            }


        dataToSend[0].attributes.ODL = this.ads.CodiceOdl;
        if(this.ads.CodiceOdl==undefined || this.ads.CodiceOdl=='')  dataToSend[0].attributes.ODL = this.ads.CodiceAds;
        dataToSend[0].attributes.TIPO=this.alloggiamento;
        dataToSend[0].attributes.TIPOATTIVITA =this.ads.CodiceAttivita;
        dataToSend[0].attributes.TIPOFORNITURA  = this.ads.GetTipoFornituraLabel();
        dataToSend[0].attributes.TIPOPRESTAZIONE = this.ads.Prestazione.toString();
        dataToSend[0].attributes.SUPFLOC = this.tubatura[2].IDSAP;

        dataToSendAllaccio[0].attributes.ODL = this.ads.CodiceOdl;
        if(this.ads.CodiceOdl==undefined || this.ads.CodiceOdl=='')  dataToSendAllaccio[0].attributes.ODL = this.ads.CodiceAds;

        if(this.alloggiamento=='nessuno') this.gru.stato = '';
        dataToSend[0].attributes['RIDUTTORI'] = this.gru.stato;
        if(this.gru.stato=='si') dataToSend[0].attributes['MARCA'] = this.gru.marca;
        if(this.gru.stato=='si') dataToSend[0].attributes['MODELLO'] = this.gru.modello;
       if(this.tubatura[2].OBJECTID=="nuova") {
         dataToSend[0].attributes['NUOVALINEA'] = true;
         dataToSendAllaccio = undefined;
      }
      if(this.isEE){
         dataToSend[0].attributes['LINEA'] = this.tubatura[2].LINEA;
      }
       if(this.tubatura[2].OBJECTID=="nessun allaccio") {
         dataToSendAllaccio = undefined;
      }


        
      /*  dataToSendAllaccio[0].attributes.SUPFLOC = this.tubatura[2].OBJECTID;
        dataToSendAllaccio[0].attributes.SUPFLOC = this.tubatura[2].IDSAP;*/

        esriCtrl.confirmLastPosition(dataToSend,dataToSendAllaccio,endPoint);
       this.ads.TubaturaPosizionata = true;
       this.adsService.updateAds(this.ads, {TubaturaPosizionata: true}, () => {}, (err) => {
       
        });
        this.alloggiamentoManuale = false;
        this.pendingOperation = false;
        
        this.showInfoTitle = false;
        this.takeScreenshot();
  }

  eliminaAlloggiamento(){
      esriCtrl.deleteLastPosition();
      esriCtrl.deleteLine();
      this.alloggiamentoManuale = false;
      this.pendingOperation = false;
      this.ads.TubaturaPosizionata = undefined;
      esriCtrl.getDestinationPoint(undefined); 

      this.showInfoTitle = false;
      this.tubatura = undefined;
      this.tubaturaLayer = undefined;
}


  goToFoto(){
    //this.navCtrl.push(FotoPage,{ads:this.ads,planimetria:true});
  }


saveToJSONStore(){
    this.adsService.updateAds(this.ads,{dataFoto:this.dataFoto},function(){
        
        console.log("map - saveToJSONStore"); 
    },function(){
        console.error("map - saveToJSONStore - error on save foto to jsonstore"); 

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


saveFile(foto,tipo){

  this.LogManager.info("map - saveFile" , tipo); 
  
//TODO: revert png?  
  var filename =  fileUtil.getExternalStoragePath()+this.ads.Id+"/images/"+foto.title+'.jpg';
  var src = foto.src.split(',')[1];
  //TODO: revert png?
  var blob = this.b64toBlob(src,"image/jpg");
  var self = this;
  //TODO: revert png?
  fileUtil.createFile(this.ads.Id,'images',foto.title+'.jpg',blob,function(){
        let trovato = false;
        for(let item of self.dataFoto){
            if(item.name == filename) trovato = true;
        }

        if(!trovato){
          self.dataFoto.push({name:filename,tag:tipo});
          self.ads.dataFoto = self.dataFoto;
          self.ads.pushBase64Img({name:filename,tag:tipo,base64:src});
          self.saveToJSONStore();
        }
         self.LogManager.info("form2 - saveFile - File creato"); 
      },
    function(err){
        self.LogManager.error("form2 - saveFile - Errore nella creazione del file", err); 
    })

}

  takeScreenshot(){

    if(this.basemapLayer.checked){
            let alert = this.alertCtrl.create({
              title: 'Attenzione',
              subTitle: 'Disabilita il livello Satellitare per salvare la immagine',
              buttons: ['OK']
            });
            alert.present();
            return;
    }

    var self = this;
    //var nomeDiv = 'map_root';
    this.shotting = true;
    var layers = [this.acquaLayer,this.gasLayer,this.tlrLayer, this.EELayer,this.fognaturaLayer,this.basemapLayer,this.ctrLayer, this.pianettiLayer];
  
    esriCtrl.screenshot(function(base64){
       self.shotting = false;

      self.updateLayers();

      if(self.images.length<4){
              var title = self.ads.Id+"_ft_"+Date.now().toString();
              self.images.push({base64:base64});
              self.saveFile({title:title,src:base64},'ft');
           }
          else {

            let alert = self.alertCtrl.create({
              title: 'Attenzione',
              subTitle: 'Hai già inserito 4 immagini. Per inserirne una nuova eliminare una tra le presenti.',
              buttons: ['OK']
            });
            alert.present();
            return;
          }
    },function(error){
       self.shotting = false;
       alert(error);
    });
  }

  openMapTree(){
    this.navCtrl.push(MapTreePage, this.ads);
  }


}
