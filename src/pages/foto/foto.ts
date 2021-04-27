import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams , ViewController, Navbar, Platform} from 'ionic-angular';
import { AlertController,PopoverController,ModalController } from 'ionic-angular';

//import { Camera } from '@ionic-native/camera';
import { Utils } from '../../utils/utils';

import { AdsService } from '../../services/ads-service';

import { JSONStoreManager } from '../../providers/jsonstore-manager/jsonstoremanager';
import {LogManager } from '../../providers/log-manager/logManager';

//import { PainterPage } from '../painter/painter';
import { PainterPage2 } from '../painter2/painter2';

import { Ads, Stato } from '../../models/ads';
//import { RemoteCallsManager } from '../../providers/remotecalls-manager/remoteCallsManager';
//import { AdsManager } from '../../providers/ads-manager/AdsManager';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';


declare var fileUtil: any;
declare var readExifData: any;
declare var imgExample: any;


/**
 * Generated class for the FotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
  providers: [
    //Camera
    ]
})
export class FotoPage {
  fotoFT;
  fotoFTA;
  fotoAltre;
  fotoSopralluogo;
  fotoSopralluogoDT;
  codiceODL;
  showDivCamera = false;
  showBack = false;
  ads: Ads;
  canGoBack: boolean = true;
  useThumbs: boolean = true;
  thumbSize: number = 300;

  dataFoto = [];

  checkedIdx=0;
  checkedTagIdx = 0;

 paramsFoto = [
    {displayName:'fascicolo - planimetria',code:'ft',max:4,show:'true'},
    {displayName:'fascicolo - altre',code:'fta',max:4,show:'true'},
    {displayName:'altre preventivazioni',code:'altre',max:1000000,show:'true'},
    {displayName:'sopralluogo - foto aggiuntive',code:'sopralluogo',max:4,show:'true'},
    {displayName:'sopralluogo - schema opere',code:'sopralluogoDT',max:1,show:'true'}
  ];

  listTag = [];
  showTag;
  fotoTag;
  tagFontPx = 15;

  openModal;
  showBtn;
  selectedItem;

  public unregisterBackButtonAction: any;

  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController,  private zone: NgZone,
   public navParams: NavParams,private alertCtrl: AlertController,
   public popoverCtrl: PopoverController
   , public adsService: AdsService,public jsonStoreManager: JSONStoreManager,
   //public camera:Camera, 
   public modalCtrl: ModalController, public platform: Platform,
    public LogManager: LogManager, 
    //public remoteCallsManager: RemoteCallsManager,
    //public adsManager: AdsManager, 
    public widgetManager: WidgetManager) {
     this.ads = navParams.get('ads');

      /*
     if(this.remoteCallsManager.isConnected()){
       //chiamo il servizio per i tag.
       this.widgetManager.doWithDefaultLoader((loader) => {
        this.adsManager.tipoAllegati((data) => {
            let tipoAllegati = data.TipoAllegati;
            tipoAllegati.forEach(element => {
              try{
                if(element.flgAttivo === "Y"){
                  this.listTag.push(element.tipologiaAllegati);
                }
              }catch(err) {
                console.log(err);
              }
              
            });
            loader.dismiss();
          }, (err) => {
            loader.dismiss();
        });
       });
      
       
     }
     */

     var isSopralluogo = navParams.get('sopralluogo');
     var isPlanimetria = navParams.get('planimetria');
     var ftDone = this.ads.isDoneFt();
     var vsDone = this.ads.isDoneVs();

     if(isSopralluogo==true) {
       this.paramsFoto[0].show = 'false';
       this.paramsFoto[1].show = 'false';
       this.paramsFoto[2].show = 'false';
       this.paramsFoto[3].show = 'true';
       this.paramsFoto[4].show = 'false';
     }

     if(isPlanimetria==true) {
       this.paramsFoto[0].show = 'true';
       this.paramsFoto[1].show = 'true';
       this.paramsFoto[2].show = 'false';
       this.paramsFoto[3].show = 'true';
       this.paramsFoto[4].show = 'false';
     }
    if(ftDone==true){
        this.paramsFoto[0].show = 'false';
        this.paramsFoto[1].show = 'false';
        this.paramsFoto[3].show = 'false';
        this.paramsFoto[4].show = 'false';
    }
    if(vsDone==true){
        this.paramsFoto[3].show = 'false';
    }

     if(this.ads.Stato==Stato.SOPRALLUOGO_CONCLUSO || this.ads.Stato==Stato.SOPRALLUOGO_ANNULLATO){
        this.paramsFoto[0].show = 'false';
       this.paramsFoto[1].show = 'false';
       this.paramsFoto[2].show = 'false';
       this.paramsFoto[3].show = 'false';
       this.paramsFoto[4].show = 'false';
     }
   
     this.codiceODL = this.ads.CodiceOdl;
    
    var deviceName = Utils.getDeviceEnvironment();
      if(deviceName=='preview') return;
    
    this.fotoFT = [];
    this.fotoFTA = [];
    this.fotoAltre = [];
    this.fotoSopralluogo = [];
    this.fotoSopralluogoDT = [];
    
              this.dataFoto = this.ads.dataFoto;
              if(this.dataFoto==undefined) this.dataFoto = [];
  			      for(let item of this.dataFoto){
                 var tmpTitle = item.name.split('/');
                 tmpTitle = tmpTitle[tmpTitle.length-1];
                 var title = tmpTitle.split('.');
                 var tmpTag = tmpTitle.split('_');
                 var tagFt;
                 if(tmpTag.length>1){
                   tagFt = tmpTag[1];
                   if(tagFt)
                    tagFt = tagFt.replace("-", " ");
                 }
                 title = title[0];
				 this.addFotoInCarousel(item.tag, item.name, title, true);
                 /* switch(item.tag){
                    case(this.paramsFoto[0].code):{
                      this.fotoFT.push({src:item.name, tipo: this.paramsFoto[0].code, title: title});
                      break;
                    }
                    case(this.paramsFoto[1].code):{
                      this.fotoFTA.push({src:item.name, tipo: this.paramsFoto[1].code, title: title});
                      break;
                    }
                    case(this.paramsFoto[2].code):{
                      this.fotoAltre.push({src:item.name, tipo: this.paramsFoto[2].code, title: title, tagFt: tagFt});
                      break;
                    }
                    case(this.paramsFoto[3].code):{
                      this.fotoSopralluogo.push({src:item.name, tipo: this.paramsFoto[3].code, title: title});
                      break;
                    }
                    case(this.paramsFoto[4].code):{
                      this.fotoSopralluogoDT.push({src:item.name, tipo: this.paramsFoto[4].code, title: title});
                      break;
                    }
                  }*/
                  
              }
    
    this.showBtn = true;
    
    if(this.ads.Stato==Stato.SOPRALLUOGO_CONCLUSO || this.ads.Stato==Stato.SOPRALLUOGO_ANNULLATO){
        this.showBtn = false;
    }
 }

  ionViewDidLoad() {
    this.LogManager.info("form2 - ionViewDidLoad"); 
   
    fileUtil.createMultiDirectory(this.ads.Id,'images',function(){console.log('directory creata')},function(){console.log('errore nella creazione della directory')});
    
      this.navBar.backButtonClick = (e:UIEvent)=>{
        this.LogManager.info("form1 - ionViewDidLoad - naviga_back"); 
        this.naviga_back();
      }
 }

   ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidEnter() {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
        if( document.getElementById('closeModal')!=undefined){
        document.getElementById('closeModal').click();
      }
      else this.naviga_back();
    }, 10);
  }

  setTag(tag){
    var foto = this.fotoTag;
     var sources =  foto.src;
     if(sources.indexOf('file://')>-1){
        sources =  this.ads.getBase64Img(foto.src).base64;
        //TODO: revert png?
        if(sources.indexOf('base64')==-1) sources = 'data:image/jpg;base64,'+sources;
     }
   
    this.removeFile(foto);
    foto.tagFt = tag;
    if(tag)
    tag = tag.replace(" ", "-");

    var self = this;
    setTimeout(function(){
        foto.title = "altre_"+tag+"_"+self.ads.Id+"_"+Date.now().toString();
        if(tag==undefined)  foto.title = "altre_"+self.ads.Id+"_"+Date.now().toString();
        foto.src = sources;
        self.saveFile(foto,foto.tipo);
    },1000);

    this.showTag = false;
  }


  GoToFoto(){
    this.navCtrl.push(FotoPage,{ads:this.ads,sopralluogo:true});
  }

   naviga_back(){
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
    this.zone.run(() => {
      this.showBack = !this.showBack;
          if(this.showBack==true) document.getElementById('allPageFoto').className = 'glass';
    else document.getElementById('allPageFoto').className = '';
    })
  }


  getDisabled(index){
    if(index==0) {
      if(this.fotoFT != undefined && this.fotoFT.length>=this.paramsFoto[index].max) return true;
      else return false;
    }
    if(index==1) {
      if(this.fotoFTA != undefined && this.fotoFTA.length>=this.paramsFoto[index].max) return true;
      else return false;
  }
  if(index==2) {
      return false;
  }
  if(this.fotoSopralluogo != undefined && index==3) {
      if(this.fotoSopralluogo.length>=this.paramsFoto[index].max ) return true;
      else return false;
  }
  if(this.fotoSopralluogoDT != undefined && index==4) {
    if(this.fotoSopralluogoDT.length>=this.paramsFoto[index].max ) return true;
    else return false;
  }
  return false;
  }

  setChecked(index){
    this.checkedIdx = index;
  }

  getChecked(index){
    if(this.getDisabled(index)) {
      if(this.checkedIdx==index){
        this.checkedIdx = 2; 
      }
      return false;}

    if(this.checkedIdx==index) return true;
    return false;
  }

  setCheckedTag(index){
    this.checkedTagIdx = index;
  }

  getCheckedTag(index){
    if(this.checkedTagIdx==index) return true;
    return false;
  }



  saveToJSONStore(){
    this.adsService.updateAds(this.ads,{dataFoto:this.dataFoto},function(){
        
      console.log("form2 - saveToJSONStore"); 
    },function(){
         console.log("form2 - saveToJSONStore - error on save foto to jsonstore"); 

      });
  }


saveFile(foto,tipo){

  this.LogManager.info("form2 - saveFile" , tipo); 
  var deviceName = Utils.getDeviceEnvironment();
  if(deviceName=='preview') return;

  //TODO: revert png?
  var filename =  fileUtil.getExternalStoragePath()+this.ads.Id+"/images/"+foto.title+'.jpg';

  var src = foto.src;
  src = foto.src.split(',')[1];
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

b64toBlob(b64Data, contentType, sliceSize?) {
    const binary_string =  window.atob(b64Data);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

removeFile(foto){
    var self = this;
    this.LogManager.info("form2 - removeFile"); 
    var deviceName = Utils.getDeviceEnvironment();
    if(deviceName=='preview') return;
    //TODO: revert png?
    fileUtil.removeFile(this.ads.Id,'images',foto.title+'.jpg',function(){
       self.LogManager.info("form2 - removeFile - file eliminato"); 
        var tmp = [];
        let index;
        let i = 0;
        for(let item of self.dataFoto){
          //TODO: revert png?
            if(item.name.indexOf(foto.title+'.jpg')<0) tmp.push(item);
            else index=i;
            i++;
        }
        self.dataFoto = tmp;
        self.ads.dataFoto = self.dataFoto;
		    self.ads.removeBase64Img(index);
        self.saveToJSONStore();
  
},function(err){

   self.LogManager.error("form2 - removeFile - errore nella eliminazione del file", err); 
})

}

  addFoto(typeCamera){
    /*
       this.LogManager.info("form2 - addFoto", typeCamera); 
        var sourceType = this.camera.PictureSourceType.CAMERA;
        var destinationType =  this.camera.DestinationType.DATA_URL;
        if(typeCamera=='gallery') {
          sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
          destinationType =  this.camera.DestinationType.DATA_URL;
        }
        var options = {
          targetHeight:  window.innerHeight+200,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: sourceType,
          quality:100,
          destinationType: destinationType,
        };

        this.camera.getPicture(options).then((imageData) => {
              var tipo;



              switch (this.checkedIdx)
              {
                case 0 :
                  tipo=this.paramsFoto[0].code;
                  break;
                case 1 :
                  tipo=this.paramsFoto[1].code;
                  break;
                case 2 :
                  tipo=this.paramsFoto[2].code;
                  break;
                case 3 :
                  tipo=this.paramsFoto[3].code;
                  break;
                case 4 :
                  tipo=this.paramsFoto[4].code;
                  break;
              default : 0;
            }
             var base64Image = 'data:image/jpeg;base64,'+imageData;

              var deviceName = Utils.getDeviceEnvironment();
              if(deviceName=='preview')
                this.addFotoInCarousel(tipo,imageData);
              else this.addFotoInCarousel(tipo,base64Image);
        }
        , (err) => {
           this.LogManager.error("form2 - addFoto - errore ", err); 
            
        });
        */
  }




  async addFotoInCarousel(tipo,src, titleToIns?, skipSave?){
    this.LogManager.info("form2 - addFotoInCarousel " + this.codiceODL, tipo); 
    var title = tipo+'_'+this.ads.Id+"_"+Date.now().toString();
    if(titleToIns) title = titleToIns;
    var sources = src;
    if(src.indexOf('file:///')>-1){
       sources =  this.ads.getBase64Img(src).base64;
       //TODO: revert png?
       if(sources.indexOf('base64')==-1) sources = 'data:image/jpg;base64,'+sources;
     }
    var thumb = await Utils.resizedataURL(sources,-1,this.thumbSize);

    var foto = {
      src:sources,
      title:title,
      tipo:tipo,
      thumb:thumb
    };
    if(tipo==this.paramsFoto[0].code){
      this.fotoFT.push(foto)
    }
    if(tipo==this.paramsFoto[1].code){
      this.fotoFTA.push(foto)
    }
    if(tipo==this.paramsFoto[2].code){
      this.fotoAltre.push(foto)
    }
    if(tipo==this.paramsFoto[3].code){
      this.fotoSopralluogo.push(foto)
    }
    if(tipo==this.paramsFoto[4].code){
      this.fotoSopralluogoDT.push(foto)
    }

    setTimeout(() =>{
      if(this.checkedTagIdx!=0) {
        this.fotoTag = this.fotoAltre[this.fotoAltre.length-1];
        this.setTag(this.listTag[this.checkedTagIdx-1]); 
      }
      else  if (!skipSave){
        // Don't save file if we are coming from start...
        this.saveFile(foto,tipo);
      } 
    },1000);
   
  }

  sendFoto(){
    this.LogManager.info("form2 - sendFoto "); 
    if(this.fotoFT.length+this.fotoFT.length+this.fotoAltre.length<2){
        let alert = this.alertCtrl.create({
          title: 'Foto insufficienti',
          subTitle: 'Per inviare i dati è obbligatorio caricare almeno 2 foto',
          buttons: ['ok']
        });
        alert.present();
    }
  }

  deleteItem(array,element){
    this.LogManager.info("form2 - deleteItem ", array); 
    this.LogManager.info("form2 - deleteItem ", element); 

    var index = -1;
    for(var a = 0; a < array.length; a++){
      if(array[a].title == element.title) index = a;
    }
    if (index !== -1) {
        array.splice(index, 1);
    }  
    this.removeFile(element);
  }


  fotoEdited(data){
    if (data==undefined) return;
    var self = this;
    if(data.self) self = data.self;
    self.selectedItem.jsonPaint = data.canvas;
    self.selectedItem.src = data.image;
    if(self.selectedItem.tipo==self.paramsFoto[0].code){
      self.deleteItem(self.fotoFT,self.selectedItem);
      self.addFotoInCarousel(self.paramsFoto[0].code,self.selectedItem.src, self.selectedItem.title);
    }
    if(self.selectedItem.tipo==self.paramsFoto[1].code){
        self.deleteItem(self.fotoFTA,self.selectedItem);
        self.addFotoInCarousel(self.paramsFoto[1].code,self.selectedItem.src, self.selectedItem.title);
    }
    if(self.selectedItem.tipo==self.paramsFoto[2].code){
        self.deleteItem(self.fotoAltre,self.selectedItem);
        self.addFotoInCarousel(self.paramsFoto[2].code,self.selectedItem.src, self.selectedItem.title);
    }
    if(self.selectedItem.tipo==self.paramsFoto[3].code){
        self.deleteItem(self.fotoSopralluogo,self.selectedItem);
        self.addFotoInCarousel(self.paramsFoto[3].code,self.selectedItem.src, self.selectedItem.title);
    }
    if(self.selectedItem.tipo==self.paramsFoto[4].code){
        self.deleteItem(self.fotoSopralluogoDT,self.selectedItem);
        self.addFotoInCarousel(self.paramsFoto[4].code,self.selectedItem.src, self.selectedItem.title);
    }

    self.ads.dataFoto = self.dataFoto;
    
  }


  presentPopover(item,event){
     this.LogManager.info("form2 - presentPopover ", item); 
     
    var showButton = {ft:true,fta:true,sopralluogo:true,sopralluogoDT:true,altre:true, tag:item.tipo=="altre"};
    if(this.fotoFT.length>=this.paramsFoto[0].max) showButton.ft = false;
    if(this.fotoFTA.length>=this.paramsFoto[1].max) showButton.fta = false;
    if(this.fotoSopralluogo.length>=this.paramsFoto[3].max) showButton.sopralluogo = false;
    if(this.fotoSopralluogoDT.length>=this.paramsFoto[4].max) showButton.sopralluogoDT = false;

    if(this.paramsFoto[0].show == 'false')  showButton.ft = false;
    if(this.paramsFoto[1].show == 'false')  showButton.fta = false;
    if(this.paramsFoto[2].show == 'false')  showButton.altre = false;  
    if(this.paramsFoto[3].show == 'false')  showButton.sopralluogo = false;
    if(this.paramsFoto[4].show == 'false')  showButton.sopralluogoDT = false;

    let popover = this.popoverCtrl.create(PopoverPage,{item:item,show:showButton,params:this.paramsFoto});
    popover.present({
      ev: event
    });
    popover.onDidDismiss((popoverEvent) => {
      if(popoverEvent==null||popoverEvent==undefined) return;
       this.LogManager.info("form2 - onDidDismiss ", popoverEvent);              
      if(popoverEvent.ev == 'tag'){
           this.fotoTag = item;
           this.showTag = true;
           setTimeout(function(){
             document.getElementById('fabTag').click();
           },500);
      }
      if(popoverEvent.ev == 'untag'){
           this.fotoTag = item;
           this.showTag = false;
           item.tagFt = undefined;
           this.setTag(undefined);
      }
      if(popoverEvent.ev == 'delete'){
        if(item.tipo==this.paramsFoto[0].code) this.deleteItem(this.fotoFT,item);
        if(item.tipo==this.paramsFoto[1].code) this.deleteItem(this.fotoFTA,item);
        if(item.tipo==this.paramsFoto[2].code) this.deleteItem(this.fotoAltre,item);
        if(item.tipo==this.paramsFoto[3].code) this.deleteItem(this.fotoSopralluogo,item);
        if(item.tipo==this.paramsFoto[4].code) this.deleteItem(this.fotoSopralluogoDT,item);
      }
      if(popoverEvent.ev == 'moveTo'){
        this.checkedTagIdx = 0;
        this.addFotoInCarousel(this.paramsFoto[popoverEvent.pos].code,item.src);
        if(item.tipo==this.paramsFoto[0].code) this.deleteItem(this.fotoFT,item);
        if(item.tipo==this.paramsFoto[1].code) this.deleteItem(this.fotoFTA,item);
        if(item.tipo==this.paramsFoto[2].code) this.deleteItem(this.fotoAltre,item);
        if(item.tipo==this.paramsFoto[3].code) this.deleteItem(this.fotoSopralluogo,item);
        if(item.tipo==this.paramsFoto[4].code) this.deleteItem(this.fotoSopralluogoDT,item);
      }
      if(popoverEvent.ev == 'clone'){
        if(item.tipo==this.paramsFoto[0].code){
          this.addFotoInCarousel(this.paramsFoto[0].code,item.src);
        }
        if(item.tipo==this.paramsFoto[1].code){
            this.addFotoInCarousel(this.paramsFoto[1].code,item.src);
        }
        if(item.tipo==this.paramsFoto[2].code){
            this.addFotoInCarousel(this.paramsFoto[2].code,item.src);
        }
        if(item.tipo==this.paramsFoto[3].code){
            this.addFotoInCarousel(this.paramsFoto[3].code,item.src);
        }
        if(item.tipo==this.paramsFoto[4].code){
          this.addFotoInCarousel(this.paramsFoto[4].code,item.src);
        }
      }

       if(popoverEvent.ev == 'edit'){
         this.selectedItem = item;
          let paintModal = this.modalCtrl.create(PainterPage2, {canvasJSON:item.jsonPaint,background:item.src,id:this.ads.Id,ads:this.ads, callback: this.fotoEdited, self: this });
          paintModal.onDidDismiss(data => {
             this.fotoEdited(data);
        });
        paintModal.present();
       }
    })

  }

showDivCam(show){
  this.showDivCamera = show;
}

  openImg(item){
     let modal = this.modalCtrl.create(ImgModal, { "foto": item });
     modal.onDidDismiss(data => {
       this.openModal = undefined;
     });
     modal.present();
     this.openModal = modal;
  }

}


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="delete()">Elimina la foto</button>
      <button *ngIf="showFT" ion-item (click)="move(0)">Muovi a {{paramsFoto[0].displayName}}</button>
      <button *ngIf="showFTA" ion-item (click)="move(1)">Muovi a {{paramsFoto[1].displayName}}</button>
      <button *ngIf="showAltre" ion-item (click)="move(2)">Muovi a {{paramsFoto[2].displayName}}</button>
      <button *ngIf="showSopralluogo" ion-item (click)="move(3)">Muovi a {{paramsFoto[3].displayName}}</button>
      <button *ngIf="showSopralluogoDT" ion-item (click)="move(4)">Muovi a {{paramsFoto[4].displayName}}</button>
      <button *ngIf="showTag" ion-item (click)="tag()">Tagga la foto</button> 
      <button *ngIf="showTag" ion-item (click)="deleteTag()">Elimina il tag</button> 
    <button ion-item (click)="edit()">Modifica la foto</button>  
    <button ion-item (click)="duplica()">Duplica la foto</button>    
</ion-list>
  `
})
export class PopoverPage {
  showFT;
  showFTA;
  showAltre;
  showTag;
  showSopralluogo;
  showSopralluogoDT;
  paramsFoto;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, 
              public LogManager: LogManager) {
    
     var tipo = navParams.get('item').tipo;
     var show = navParams.get('show');
     this.paramsFoto = navParams.get('params');
     this.showFT = show.ft;
     this.showFTA = show.fta;
     this.showSopralluogo = show.sopralluogo;
     this.showSopralluogoDT = show.sopralluogoDT;
     this.showAltre = show.altre;
     this.showTag = show.tag;

     if(tipo==this.paramsFoto[0].code){
        this.showFT = false;
     }
     if(tipo==this.paramsFoto[1].code){
       this.showFTA = false;
     }
     if(tipo==this.paramsFoto[2].code){
        this.showAltre = false;
    }
    if(tipo==this.paramsFoto[3].code){
        this.showSopralluogo = false;
    }
    if(tipo==this.paramsFoto[4].code){
      this.showSopralluogoDT = false;
    }
    

  }

  delete() {
    this.LogManager.info("form2 - PopoverPage - delete ");
    this.viewCtrl.dismiss({ev:'delete'});
  }

  move(index){
      this.LogManager.info("form2 - PopoverPage - move ");
      this.viewCtrl.dismiss({ev:'moveTo',pos:index});
  }

  edit(){
     this.viewCtrl.dismiss({ev:'edit'});
  }

  duplica(){
    this.viewCtrl.dismiss({ev:'clone'});
  }

  tag(){
     this.viewCtrl.dismiss({ev:'tag'});
  }

  deleteTag(){
     this.viewCtrl.dismiss({ev:'untag'});
  }

}



@Component({
  template: `
   <ion-header>
        <ion-toolbar>
          <ion-title>
            Anteprima
          </ion-title>
          <ion-buttons start>
            <button id="closeModal" ion-button class="btn_closeModal" (click)="dismiss()">
              <span ion-text color="primary" showWhen="ios">Annulla</span>
              <ion-icon name="md-close" hideWhen="ios"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>

          <ion-item>
            <img src="{{img.src}}">
          </ion-item>

      </ion-content>
  
  `
})
export class ImgModal {
  img;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
      this.img = navParams.get('foto');
   
  }

   ionViewDidLoad() {
      document.getElementsByClassName('modal-wrapper')[0].setAttribute('style', 'width:100vw;height:100vh;left:0;top:0;');  

   }

    dismiss(cleanFilter: boolean) {
    this.viewCtrl.dismiss({});
  }

}