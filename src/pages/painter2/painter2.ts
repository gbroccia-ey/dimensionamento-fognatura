import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ViewController, ModalController } from 'ionic-angular';

//import { ColorPickerService } from 'ngx-color-picker';
//private cpService: ColorPickerService,
//import { Camera } from '@ionic-native/camera';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';
import { LogManager } from '../../providers/log-manager/logManager';
import { Ads, SettoreMerceologico, DettaglioMerceologico } from '../../models/ads';
import { AlertController } from 'ionic-angular';

import { JSONStoreManager } from '../../providers/jsonstore-manager/jsonstoremanager';
import { AdsService } from '../../services/ads-service';

declare var fabric: any;
declare var svgUtil: any;
declare var imgExample: any;

@Component({
  selector: 'page-painter2',
  templateUrl: 'painter2.html',
  providers: [
    //Camera
  ]
})
export class PainterPage2 {
  @ViewChild('colorPicker') fileInput:ElementRef;
color: string;
  SCALE_FACTOR = 1;
  backgroundImage;
  text;
  textBox;
  strokeWidth = 5;
  borderFDraw = 'hidden';
  showPicker:boolean;
  index_back;
  deleteColor = 'grey';
  ads;
  drawLine;
  lineStyle;
  typeLine;

  isPortrait: boolean = true;
  disegnoTecnico : boolean = false;
  manualSave;
  isRendering;

  canvasJSON;
  heightImg;
  widthImg;
  draw;
  svgData;
  selezionaElementi;
  boxWidth;
  selectLine;
  callback;
  self;

    showColore;
    showForme;
    showLinee;
    showSpessore;
    fontSizeIcon;

constructor(
                public navParams: NavParams,
                //public camera:Camera,
                private zone: NgZone,
                public adsService: AdsService,
                public jsonStoreManager: JSONStoreManager,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController, 
                public alertCtrl: AlertController,
                public widgets: WidgetManager,
                public LogManager: LogManager) {
        this.strokeWidth = 5;
        this.boxWidth = 5;
        this.borderFDraw = 'hidden';
        this.deleteColor = 'grey';
        this.isPortrait = true;
        this.disegnoTecnico = false;
        this.showPicker = false;
        this.backgroundImage = navParams.get('background');
        this.canvasJSON = navParams.get('canvasJSON');
        this.ads = navParams.get('ads');
        this.disegnoTecnico = navParams.get('disegnoTecnico');
        this.callback = navParams.get('callback');
        this.self = navParams.get('self');
        this.drawLine = false;
        
        this.showColore = false;
        this.showForme = false;
        this.showLinee = true;
        this.showSpessore = false;
        this.fontSizeIcon = "1em";


        if (Number(window.orientation) === 90 || Number(window.orientation) === -90) {
            this.isPortrait = false;
        }
        //   function doOnOrientationChange() {
        //     var self = this;
        //     switch(window.orientation) {  
        //       case -90 || 90:
        //         self.isPortrait = false;
        //         break; 
        //       default:
        //         self.isPortrait = true;
        //         break; 
        //     }
        // }
        // window.addEventListener('orientationchange', doOnOrientationChange);

       
    }
    

    ionViewDidLoad() {
        this.LogManager.info("painter - ionViewDidLoad");
        this.color = "#000000";
        this.strokeWidth = 5;
       var height = window.innerHeight;
        var width = window.innerWidth;
        if (height > width) {
            var tmp = width;
            width = height;

            height = tmp;
        }
        this.heightImg = height - 60;
        this.widthImg = width / 100 * 70;
        var self = this;
        svgUtil.init(function(base64){
            self.setImageInCanvas(base64);
        },
        function(text){
            self.textBox = text;
        });
       
        var imgFromGal;
        if(  this.disegnoTecnico && this.ads.dataFoto && (!this.canvasJSON || !this.canvasJSON.svg)){
            for(let item of this.ads.dataFoto){
               var tmpTitle = item.name.split('/');
               tmpTitle = tmpTitle[tmpTitle.length-1];
               var title = tmpTitle.split('.');
               if(item.tag == "sopralluogoDT" ){
                    this.backgroundImage = item.name;
              }   
            }
          }

        if (this.backgroundImage != undefined) {
            
            var callback = function(data) {
                self.draw = data;
                self.setImageInCanvas(self.backgroundImage);
                setTimeout(function(){svgUtil.addToHistory(svgUtil.save());},400);
            };
            svgUtil.draw(this.widthImg, this.heightImg, callback);
            
           
        }
      else if(this.canvasJSON && this.canvasJSON.svg){
          var callback = function(data) {
                self.draw = data;
                svgUtil.load(self.draw,JSON.parse(self.canvasJSON.svg));
            };
            svgUtil.draw(this.widthImg, this.heightImg, callback);
            
      }
      else{

           var callback = function(data) {
                self.draw = data;
            };
            svgUtil.draw(this.widthImg, this.heightImg, callback);
            this.setImageInCanvas(imgExample.getWhiteImgSVG());
            setTimeout(function(){svgUtil.addToHistory(svgUtil.save());},400);

      }
        document.getElementsByClassName('modal-wrapper')[0].setAttribute('style', 'width:100vw;height:100vh;left:0;top:0;');
        svgUtil.lock();

 };


    
    prevent(event) {
        event.preventDefault();
    };


    undo(){
       //this.removeSelectionLine();
        svgUtil.undo();
    }

    redo(){
        //this.removeSelectionLine();
        svgUtil.redo();
    }
    
otherForm(value){
    this.removeSelectionLine();
    this.selectLine = false;
    
    let modal = this.modalCtrl.create(ModalOtherForm2, {ads:this.ads });
    console.log("painter - otherForm");
    this.LogManager.info("painter - otherForm"); 
    modal.onDidDismiss(data => {
      if (data != null && data != undefined && data.value != 'none') {
                var imgElement = "./assets/icon/" + data.tipo + "/" + data.value;
               // var self = this;
               svgUtil.drawImage(this.draw,imgElement);
      }
    });
    modal.present();
  }

    removeSelection(){
        if(this.selectLine==false) svgUtil.removeSelection();   
    }
    
    openPalette(event) {
        console.log("open palette");
        document.getElementById('btn-colorpicker').click();
        document.getElementById('btn-colorpicker_show').style.color = event;
        this.removeSelectionLine();
        event.preventDefault();
        event.stopPropagation();
    };
     
    onSelectLine(){
        svgUtil.selectLine(this.selectLine);
    }

    onShowForme(){
        this.showColore = false;
        this.showForme = true;
        this.showLinee = false;
        this.showSpessore = false;
    }

    onShowLinee() {
        this.showColore = false;
        this.showForme = false;
        this.showLinee = true;
        this.showSpessore = false;
    };
    
    onShowSpessore() {
        this.zone.run(() => {
            this.showColore = false;
            this.showForme = false;
            this.showLinee = false;
            this.showSpessore = true;
            
        });
    };

    onShowColore() {
        this.zone.run(() => {
            this.showColore = true;
            this.showForme = false;
            this.showLinee = false;
            this.showSpessore = false;
        });
    };

    removeSelectionLine() {
        this.borderFDraw = 'hidden';
        this.drawLine = false;
        this.setTypeLine(-1);
        svgUtil.setDrawing("",false);
        svgUtil.setDrawingFree("",false);
    };
    


    setTypeLine(index) {
        if (index > -1){
            this.typeLine = index;
            var tmp = document.getElementsByClassName('btnLine');
            for(var a =0; a <tmp.length; a++){
                tmp[a].className = "btnLine item item-block item-md";
            }
            tmp[index].className = "btnLine item item-block item-md btnLineSelected";
        }
        else {
             var tmp = document.getElementsByClassName('btnLine');
            for(var a =0; a <tmp.length; a++){
                tmp[a].className = "btnLine item item-block item-md";
            }
        }
    };


    setColor(color) {
        console.log("painter - set color");
        this.color = color;
        var tmp = document.getElementsByClassName("colorContainer");
        svgUtil.setColor(color);
        var index = 0;
        if(color=='#000000') index = 0;
        if(color=='#C0C0C0') index = 1;
        if(color=='#FFFFFF') index = 2;
        if(color=='#800000') index = 3;
        if(color=='#FF0000') index = 4;
        if(color=='#008000') index = 5;
        if(color=='#00FF00') index = 6;
        if(color=='#ff9800') index = 7;
        if(color=='#FFFF00') index = 8;
        if(color=='#0000FF') index = 9;
        if(color=='#ec0efc') index = 10;
        if(color=='#00FFFF') index = 11;

        for(var a =0; a<tmp.length; a++){
            tmp[a].className = "colorContainer";
        }
        tmp[index].className = "colorContainer colorContainerSelected"; 
        /*this.zone.run(function () {
            this.borderFDraw = 'hidden';
            this.color = ev.currentTarget.style.background;
        });*/
    };



    setSpessore(stroke){
        this.strokeWidth = stroke;
        svgUtil.setSpessore(stroke);
        var index = 0;
        if(stroke==1) {
            this.fontSizeIcon = "1em";
            index = 0;
        }
        if(stroke==3){ 
            this.fontSizeIcon = "1.3em";
            index = 1;
        }
        if(stroke==5) {
            this.fontSizeIcon = "1.6em";
            index = 2;
        }
        if(stroke==8){ 
            this.fontSizeIcon = "1.9em";
            index = 3;
        }
        if(stroke==11) {
            this.fontSizeIcon = "2.2em";
            index = 4;
        }
        if(stroke==13) {
            this.fontSizeIcon = "2.5em";
            index = 5;
        }
        var tmp = document.getElementsByClassName("spessoreDiv");
        for(var a =0; a<tmp.length; a++){
            tmp[a].className = "spessoreDiv";
        }
        tmp[index].className = "spessoreDiv spessoreContainerSelected"; 
    }
 

   setImageInCanvas(base64, whiteImage?) {
        console.log("painter - set image in canvas");
        var self = this;
        var img = new Image();
        img.onload = function() {
            //self.canvas.setBackgroundImage(f_img);
            //self.canvas.renderAll();
            var height = window.innerHeight;
            var width = window.innerWidth;
            if (height > width) {
                var tmp = width;
                width = height;

                height = tmp;
            }
            height = height - 62;
            width = width / 100 * 70 -2;


            var imgHeight = height;
            var imgWidth = img.width / (img.height / height);
            if (imgWidth > width) {
                imgWidth = width;
                imgHeight = img.height / (img.width / width);
            }
            self.heightImg = imgHeight;
            self.widthImg = imgWidth;

            var callback = function(data) {
                self.draw = data;
                self.draw.image(base64,self.widthImg, self.heightImg);
                var el = document.getElementById('backgroundSVG');
                if(el) {
                    el.remove();
                }  
                var src = document.getElementById("drawing");
                var elem = <HTMLElement> document.getElementById("drawing").lastChild;
                elem.remove();
                elem.setAttribute("id","backgroundSVG");
                src.insertAdjacentElement('afterbegin',elem); 
            };
            if(whiteImage) self.widthImg = width;

            var SVG = svgUtil.draw(self.widthImg, self.heightImg, callback);
        };
        img.src = base64;
    };



   onLoadBackground(gallery) {
        /*
        var sourceType = this.camera.PictureSourceType.CAMERA;
        if (gallery)
            sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.LogManager.info("painter - onLoadBackground");
        var height = window.innerHeight - 100;
        var width = window.innerWidth;
        var quality = 100;
        var self = this;
        if (height > width) {
            height = width;
        }
        this.camera.getPicture({
            targetHeight: height + 300,
            quality: quality,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
        }).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            self.setImageInCanvas(base64Image);
            setTimeout(function(){svgUtil.addToHistory(svgUtil.save());},400);
        });
        */
    };

   onDelete() {
        console.log("painter - delete");
        svgUtil.remove();
    };
   
   onLineInternal() {
        this.selectLine = false;
        //var line = this.draw.line().stroke({ width: this.strokeWidth, color: this.color });
        var options = {};
        var self = this;
        var id = Math.floor(Math.random() * 6000000) + 1; 
        svgUtil.setDrawing(id,true);
        svgUtil.setDrawingFree(id,false);
        svgUtil.drawLine( this.draw, this.lineStyle, id);
    };
   
   onDashLine() {
        console.log("painter - dashline");
        this.LogManager.info("painter - onDashLine");
        var strokeDashArray = [50, 5, 5, 5];
        this.lineStyle = strokeDashArray;
        this.borderFDraw = 'dotted';
        this.drawLine = true;
        this.onLineInternal();
    };
   
   onDashLineMultiple() {
        console.log("painter - ondash line multiple");
        this.LogManager.info("painter - onDashLineMultiple");
        var strokeDashArray = [50, 5, 5, 5, 5, 5, 5, 5];
        this.lineStyle = strokeDashArray;
        this.borderFDraw = 'dotted';
        this.drawLine = true;
        this.onLineInternal();
    };
   
   onLine() {
        console.log("painter - online");
        this.LogManager.info("painter - onLine");
        var strokeDashArray = [10000];
        this.lineStyle = strokeDashArray;
        this.drawLine = true;
        this.borderFDraw = 'dotted';
        this.onLineInternal();
    };
   
   
   onTextBox() {
        console.log("painter - on text");
        this.LogManager.info("painter - onText");
        this.removeSelectionLine();
        this.selectLine = false;
        if (this.textBox == "" || this.textBox == undefined)
            return;
        var self = this;
        svgUtil.drawTextBox(this.draw,this.textBox, 50+(this.boxWidth*40));
        
    };

   onCircle(full) {
        console.log("painter - on circle");
        this.LogManager.info("painter - onCircle");
        this.removeSelectionLine();
        this.selectLine = false;
        var colorFill = 'rgba(0,0,0,0)';
        var colorStroke = this.color;
        if(full){
             var colorFill = this.color;
        }
        //var colorFill = this.color;
        svgUtil.drawCircle(this.draw, colorFill,colorStroke,this.strokeWidth,full);
    };

   onTriangle(full) {
        console.log("painter - on triangle");
        this.LogManager.info("painter - onTriangle");
        this.removeSelectionLine();
        this.selectLine = false;
        var colorFill = 'rgba(0,0,0,0)';
        var colorStroke = this.color;
        if(full){
             var colorFill = this.color;
        }

        svgUtil.drawTriangle(this.draw, colorFill,colorStroke,this.strokeWidth,full);
    };

   onRect(full) {
        console.log("painter - on rect");
        this.LogManager.info("painter - onRect");
        this.removeSelectionLine();
        this.selectLine = false;
        var colorFill ='rgba(0,0,0,0)';
        var colorStroke = this.color;
        if(full){
             var colorFill = this.color;
             var colorStroke = "black";
        }
        var self = this;
        svgUtil.drawRect(this.draw, colorFill,colorStroke,this.strokeWidth,false);
    };

   onDrawing() {
        console.log("painter - on drawing");
        this.drawLine = true;
        this.borderFDraw = 'dotted';
        this.selectLine = false;
        svgUtil.setDrawing(undefined,false);
        svgUtil.setDrawingFree(undefined,true);
        svgUtil.drawFree(this.draw,undefined);
    };

   onSaveExit() {
        this.LogManager.info("painter - onSave");
        var self = this;
       svgUtil.unlock();
        svgUtil.cleanDrag();
        this.widgets.doWithDefaultLoader((loader) => {

            svgUtil.getBase64(this.widthImg, this.heightImg, function (obj) {
             
                obj.canvas = {svg:svgUtil.save()};
                self.viewCtrl.dismiss(obj); 
                loader.dismiss();
            });
        })
    };

    onSave() {
        this.LogManager.info("painter - onSave");
        var self = this;
       svgUtil.unlock();
        svgUtil.cleanDrag();
        this.widgets.doWithDefaultLoader((loader) => {

            svgUtil.getBase64(this.widthImg, this.heightImg, function (obj) {
                obj.canvas = {svg:svgUtil.save()};
                if(self.callback) {
                    obj.self = self.self;
                    self.callback(obj);
                }

                var callback = function(data) {
                    self.draw = data;
                    svgUtil.cleanAll();
                    svgUtil.load(self.draw,JSON.parse(obj.canvas.svg));
                };
                svgUtil.draw(self.widthImg, self.heightImg, callback);;
                loader.dismiss();
            });
        })
    };

onExit(){
        let alert = this.alertCtrl.create({
          title: 'Attenzione!',
          subTitle: 'Uscendo le modifiche effettuate saranno perse',
          buttons: [
      {
        text: 'Ok',
        handler: data => {
            svgUtil.unlock();
            if(this.disegnoTecnico)
                this.viewCtrl.dismiss(this.manualSave);
            else   this.viewCtrl.dismiss();
        }
      },{
            text:'Annulla'
      }]
        });

        alert.present();   
}
}

@Component({
  template: `
      <ion-header (click)="dismiss()">
        <ion-toolbar>
          <ion-title>
            Indietro
          </ion-title>
          <ion-buttons  start>
            <button class="btn_closeModal" ion-button>
              <span ion-text color="primary" showWhen="ios">Annulla</span>
              <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>

        <ion-item>
        <h1>{{title}}</h1>
        <div class="divOther" *ngFor="let item of merceList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>

      <ion-item *ngIf="title!='Acqua'">
        <h1>Acqua</h1>
        <div class="divOther" *ngFor="let item of acquaList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>

        <ion-item *ngIf="title!='Fognatura'">
        <h1>Fognatura</h1>
        <div class="divOther" *ngFor="let item of fognaturaList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>


        <ion-item *ngIf="title!='Energia Elettrica'">
        <h1>Energia elettrica</h1>
        <div class="divOther" *ngFor="let item of eeList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>

        <ion-item *ngIf="title!='Gas'">
        <h1>Gas</h1>
        <div class="divOther" *ngFor="let item of gasList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>

        <ion-item *ngIf="title!='Tlr'">
        <h1>Tlr</h1>
        <div class="divOther" *ngFor="let item of tlrList">
            <ion-item (click)="useForm(item)">
                <img src="{{item.path}}">
                 <div class="divOtherText">{{item.text}}</div>
            </ion-item>
        </div>
        </ion-item>

      </ion-content>
  
  `
})
export class ModalOtherForm2 {
    acquaList;
    eeList;
    gasList;
    tlrList;
    fognaturaList;
    title;
    merceList;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.acquaList= [];
    this.acquaList.push({tipo:'Acqua',text:'Alimentatore cat acqua', value:'Alimentatore cat acqua.png',path:'./assets/icon/Acqua/Alimentatore cat acqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'Croce', value:'Croce.png',path:'./assets/icon/Acqua/Croce.png'});
    this.acquaList.push({tipo:'Acqua',text:'Idrante', value:'Idrante.png',path:'./assets/icon/Acqua/Idrante.png'});
    this.acquaList.push({tipo:'Acqua',text:'Intercettazione Utenza', value:'Intercettazione Utenza.png',path:'./assets/icon/Acqua/Intercettazione Utenza.png'});
    this.acquaList.push({tipo:'Acqua',text:'Posti di misura cat acqua', value:'Posti di misura cat acqua.png',path:'./assets/icon/Acqua/Posti di misura cat acqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'Riduttore di pressione', value:'Riduttore di pressione.png',path:'./assets/icon/Acqua/Riduttore di pressione.png'})
    this.acquaList.push({tipo:'Acqua',text:'Sezionamento', value:'Sezionamento.png',path:'./assets/icon/Acqua/Sezionamento.png'});
    this.acquaList.push({tipo:'Acqua',text:'Stacco utenza', value:'Stacco utenza.png',path:'./assets/icon/Acqua/Stacco utenza.png'});
    this.acquaList.push({tipo:'Acqua',text:'Valvola', value:'Valvola.png',path:'./assets/icon/Acqua/Valvola.png'});
    this.acquaList.push({tipo:'Acqua',text:'Contatore', value:'Contatore Acqua.png',path:'./assets/icon/Acqua/Contatore Acqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'Contatore Turbina Acqua', value:'ContatoreTurbinaAcqua.png',path:'./assets/icon/Acqua/ContatoreTurbinaAcqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'Contatore Woltmann Acqua', value:'ContatoreWoltmannAcqua.png',path:'./assets/icon/Acqua/ContatoreWoltmannAcqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'DimaAcqua', value:'DimaAcqua.png',path:'./assets/icon/Acqua/DimaAcqua.png'});
    this.acquaList.push({tipo:'Acqua',text:'DimaAcquaSX', value:'DimaAcquaSX.png',path:'./assets/icon/Acqua/DimaAcquaSX.png'});
    this.acquaList.push({tipo:'Acqua',text:'BaulettoDX', value:'BaulettoDX.png',path:'./assets/icon/Acqua/BaulettoDX.png'});
    this.acquaList.push({tipo:'Acqua',text:'BaulettoSX', value:'BaulettoSX.png',path:'./assets/icon/Acqua/BaulettoSX.png'});
    this.acquaList.push({tipo:'Acqua',text:'Chiusino acqua A', value:'Chiusino_Acqua_1.png',path:'./assets/icon/Acqua/Chiusino_Acqua_1.png'});
    // this.acquaList.push({tipo:'Acqua',text:'Chiusino acqua B', value:'Chiusino_Acqua_3.png',path:'./assets/icon/Acqua/Chiusino_Acqua_3.png'});
    //this.acquaList.push({tipo:'Acqua',text:'Pozzetto fognatura', value:'Pozzetto_Fognatura.png',path:'./assets/icon/Acqua/Pozzetto_Fognatura.png'});
    this.acquaList.push({tipo:'Acqua',text:'Chiusino acqua B', value:'Pozzetto_Fognatura.png',path:'./assets/icon/Acqua/Chiusura_fogna.png'});
    this.acquaList.push({tipo:'Acqua',text:'Pozzetto rotondo', value:'Pozzetto_rotondo.png',path:'./assets/icon/Acqua/Pozzetto_rotondo.png'});

    this.fognaturaList = [];
    this.fognaturaList.push({tipo:'Fognatura',text:'Alimentatore cat', value:'Alimentatore cat.png',path:'./assets/icon/Fognatura/Alimentatore cat.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Croce', value:'Croce.png',path:'./assets/icon/Fognatura/Croce.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Posti misura cat', value:'Posti misura cat.png',path:'./assets/icon/Fognatura/Posti misura cat.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Sezionamento', value:'Sezionamento.png',path:'./assets/icon/Fognatura/Sezionamento.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Stacco utenza', value:'Stacco utenza.png',path:'./assets/icon/Fognatura/Stacco utenza.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Valvola', value:'Valvola.png',path:'./assets/icon/Fognatura/Valvola.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'BaulettoDX', value:'BaulettoDX.png',path:'./assets/icon/Fognatura/BaulettoDX.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'BaulettoSX', value:'BaulettoSX.png',path:'./assets/icon/Fognatura/BaulettoSX.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Pozzetto rotondo', value:'Pozzetto_rotondo.png',path:'./assets/icon/Fognatura/Pozzetto_rotondo.png'});
    this.fognaturaList.push({tipo:'Fognatura',text:'Chiusino fognatura', value:'Pozzetto_Fognatura.png',path:'./assets/icon/Fognatura/Chiusura_fogna.png'});


    this.eeList= [];
    this.eeList.push({tipo:'EE',text:'Armadio elettrico BT', value:'Armadio elettrico BT.png',path:'./assets/icon/EE/Armadio elettrico BT.png'});
    this.eeList.push({tipo:'EE',text:'Cassetta di derivazione elettrica BT', value:'Cassetta di derivazione elettrica BT.png',path:'./assets/icon/EE/Cassetta di derivazione elettrica BT.png'});
    this.eeList.push({tipo:'EE',text:'Croce', value:'Croce.png',path:'./assets/icon/EE/Croce.png'});
    this.eeList.push({tipo:'EE',text:'Palina in acciaio', value:'Palina in acciaio.png',path:'./assets/icon/EE/Palina in acciaio.png'});
    this.eeList.push({tipo:'EE',text:'Palo in acciaio, in blocco fondazione', value:'Palo in acciaio, in blocco fondazione.png',path:'./assets/icon/EE/Palo in acciaio, in blocco fondazione.png'});
    this.eeList.push({tipo:'EE',text:'Palo in cemento armato, in blocco fondazione', value:'Palo in cemento armato, in blocco fondazione.png',path:'./assets/icon/EE/Palo in cemento armato, in blocco fondazione.png'});
    this.eeList.push({tipo:'EE',text:'Palo in cemento armato, senza blocco fondazione', value:'Palo in cemento armato, senza blocco fondazione.png',path:'./assets/icon/EE/Palo in cemento armato, senza blocco fondazione.png'});
    this.eeList.push({tipo:'EE',text:'Palo in resina, in blocco fondazione', value:'Palo in resina, in blocco fondazione.png',path:'./assets/icon/EE/Palo in resina, in blocco fondazione.png'});
    this.eeList.push({tipo:'EE',text:'Punti consegna elettrica BT', value:'Punti consegna elettrica BT.png',path:'./assets/icon/EE/Punti consegna elettrica BT.png'});
    this.eeList.push({tipo:'EE',text:'Sezionamento', value:'Sezionamento.png',path:'./assets/icon/EE/Sezionamento.png'});
    this.eeList.push({tipo:'EE',text:'Contatore', value:'Contatore EE.PNG',path:'./assets/icon/EE/Contatore EE.PNG'});
    this.eeList.push({tipo:'EE',text:'BaulettoDX', value:'BaulettoDX.png',path:'./assets/icon/EE/BaulettoDX.png'});
    this.eeList.push({tipo:'EE',text:'BaulettoSX', value:'BaulettoSX.png',path:'./assets/icon/EE/BaulettoSX.png'});
    this.eeList.push({tipo:'EE',text:'Chiusino elettrico', value:'Pozzetto_Fognatura.png',path:'./assets/icon/EE/Chiusura_fogna.png'});


    this.gasList = [];
    this.gasList.push({tipo:'Gas',text:'Alimentatore Protezione Catodica Gas', value:'Alimentatore Protezione Catodica Gas.png',path:'./assets/icon/Gas/Alimentatore Protezione Catodica Gas.png'});
    this.gasList.push({tipo:'Gas',text:'Croce', value:'Croce.png',path:'./assets/icon/Gas/Croce.png'});
    this.gasList.push({tipo:'Gas',text:'Intercettazione Utenza', value:'Intercettazione Utenza.png',path:'./assets/icon/Gas/Intercettazione Utenza.png'});
    this.gasList.push({tipo:'Gas',text:'Posto di misura Catodica Gas', value:'Posto di misura Catodica Gas.png',path:'./assets/icon/Gas/Posto di misura Catodica Gas.png'});
    this.gasList.push({tipo:'Gas',text:'Sezionamento', value:'Sezionamento.png',path:'./assets/icon/Gas/Sezionamento.png'});
    this.gasList.push({tipo:'Gas',text:'Stacco utenza', value:'Stacco utenza.png',path:'./assets/icon/Gas/Stacco utenza.png'});
    this.gasList.push({tipo:'Gas',text:'Valvola Fuori Terra', value:'Valvola Fuori Terra.png',path:'./assets/icon/Gas/Valvola Fuori Terra.png'});
    this.gasList.push({tipo:'Gas',text:'Valvola Interrata', value:'Valvola Interrata.png',path:'./assets/icon/Gas/Valvola Interrata.png'});
    this.gasList.push({tipo:'Gas',text:'GRU', value:'GRU Gas.png',path:'./assets/icon/Gas/GRU Gas.png'});
    this.gasList.push({tipo:'Gas',text:'Contatore', value:'Contatore Gas.png',path:'./assets/icon/Gas/Contatore Gas.png'});
    this.gasList.push({tipo:'Gas',text:'DimaGas', value:'DimaGas.png',path:'./assets/icon/Gas/DimaGas.png'});
    this.gasList.push({tipo:'Gas',text:'SmartMeterGas', value:'SmartMeterGas.png',path:'./assets/icon/Gas/SmartMeterGas.png'});
    this.gasList.push({tipo:'Gas',text:'BaulettoDX', value:'BaulettoDX.png',path:'./assets/icon/Gas/BaulettoDX.png'});
    this.gasList.push({tipo:'Gas',text:'BaulettoSX', value:'BaulettoSX.png',path:'./assets/icon/Gas/BaulettoSX.png'});
    
    this.tlrList = [];
    this.tlrList.push({tipo:'Tlr',text:'Centrale provvisoria', value:'Centrale provvisoria.png',path:'./assets/icon/Tlr/Centrale provvisoria.png'});
    this.tlrList.push({tipo:'Tlr',text:'Centrale Tradizionale', value:'Centrale Tradizionale.png',path:'./assets/icon/Tlr/Centrale Tradizionale.png'});
    this.tlrList.push({tipo:'Tlr',text:'Croce', value:'Croce.png',path:'./assets/icon/Tlr/Croce.png'});
    this.tlrList.push({tipo:'Tlr',text:'Sezionamento', value:'Sezionamento.png',path:'./assets/icon/Tlr/Sezionamento.png'});
    this.tlrList.push({tipo:'Tlr',text:'Valvola termostatica', value:'Valvola termostatica.png',path:'./assets/icon/Tlr/Valvola termostatica.png'});
    this.tlrList.push({tipo:'Tlr',text:'Valvola', value:'Valvola.png',path:'./assets/icon/Tlr/Valvola.png'});
    this.tlrList.push({tipo:'Tlr',text:'Contatore', value:'Contatore TLR.PNG',path:'./assets/icon/Tlr/Contatore TLR.PNG'});
    this.tlrList.push({tipo:'Tlr',text:'BaulettoDX', value:'BaulettoDX.png',path:'./assets/icon/Tlr/BaulettoDX.png'});
    this.tlrList.push({tipo:'Tlr',text:'BaulettoSX', value:'BaulettoSX.png',path:'./assets/icon/Tlr/BaulettoSX.png'});

    var ads : Ads = navParams.get('ads');

      switch(ads.SettoreMerceologico)
      {
        case SettoreMerceologico.ACQUA:
            //fognatura
            if(ads.DettaglioMerceologico == DettaglioMerceologico.FOGNATURA) {
                this.merceList = this.fognaturaList; 
                this.title = "Fognatura"
            }
            else {
                this.merceList = this.acquaList; 
                this.title = "Acqua";
            }
            break;                          
        case SettoreMerceologico.GAS:
            this.merceList = this.gasList; this.title = "Gas";
            break;
        case SettoreMerceologico.ENERGIA_ELETTRICA:
            this.merceList = this.eeList; this.title = "Energia Elettrica";
            break;
        case SettoreMerceologico.TLR:
           this.merceList = this.tlrList; this.title = "Tlr"
            break;
    }

  }


  useForm(item){
    this.viewCtrl.dismiss(item);
  }

  dismiss() {
    this.viewCtrl.dismiss({"value": "none"});
  }

}
