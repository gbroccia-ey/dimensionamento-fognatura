import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams, Navbar, NavController } from 'ionic-angular';
import { Ads, SettoreMerceologico } from '../../../models/ads';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import * as moment from 'moment';


export class Cer{
  SM: string;
  TF: string;
  CCOM: string;
  COM: string;
  STRCODE: string;
  VIA: string;
  CIVMIN: string;
  CIVMAX: string;
  TIPO: string;
  INIZIO: string;
  DSCAD: string;
  NOTE: string;
  CFISSO: string;
}


@Component({
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>
            Cer
          </ion-title>
          <ion-buttons start>
            <button id="closeModal" ion-button class="btn_closeModal" (click)="dismiss()">
              <span ion-text color="primary" showWhen="ios">Annulla</span>
              <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>

       
          <ion-list radio-group [(ngModel)]="totale">
          <ion-grid>
            <ion-row *ngFor="let cer of cerList; let i = index">
              <ion-col col-10>
                {{cer["Nome Via"]}} - {{cer["CIVMIN"]}}/{{cer["CIVMAX"]}} {{cer["SUPPL MIN"]}} {{cer["SUPPL MAX"]}} {{cer["TIPO"]}} {{cer["NOTE"]}}
              </ion-col>
              <ion-col col-2>
                <ion-radio (ionSelect)="setEdited(i)" style="min-height: 25px"></ion-radio>
              </ion-col>
              <!-- <ion-col col-2>
                <ion-label>€{{cer["COSTOFISSO"]}}</ion-label>
              </ion-col> -->
            </ion-row>
          </ion-grid>  
            

          </ion-list>
          <ion-item>
            <ion-label>Numero quote</ion-label>
            <ion-input [(ngModel)]="numCer" type="number"></ion-input>
          </ion-item>
        
        <button ion-button (click)="dismiss()">OK</button> 
        
      </ion-content>
  `
})
export class CerCalc{

  cerList = [];
  totale: number = 0;
  isEdited: boolean = false;
  numCer: number = 1;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(navParams.data.cerList) {
      this.cerList = navParams.data.cerList;
    }


    

  }

  getCostoFisso(index) {
    this.totale =  parseFloat(this.cerList[index]["COSTOFISSO"].replace(",","."));
  }

  setEdited(index) {
    this.isEdited = true;
    this.getCostoFisso(index);
  }

  dismiss() {
    this.viewCtrl.dismiss({"result": this.totale * this.numCer, "edited": this.isEdited , "number": this.numCer});
  }

}

@Component({
  selector: 'calcolatore-cer',
  templateUrl: 'calcolatore-cer.html'
})
export class CalcolatoreCerComponent implements OnInit {

  disabledCerFlag:boolean = true;

  @Input()
  ads: Ads;

  @Output()
  result: EventEmitter<number>;

  @Output()
  isEnabled: EventEmitter<boolean>;

  @Output()
  isEdited: EventEmitter<boolean>;

  cerList = [];
  foundList: any[] = [];
  cer: Cer;
  openModal;
  canGoBack: boolean = true;
  
   @ViewChild(Navbar) navBar: Navbar;

  constructor(public modalCtrl: ModalController, public http: Http, public platform: Platform, public navCtrl: NavController) {
    this.result = new EventEmitter<number>();
    this.isEnabled = new EventEmitter<boolean>();
    this.isEdited = new EventEmitter<boolean>();

  }
  
  ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
        this.naviga_back();
      }
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

  ngOnInit() {
    let settore = SettoreMerceologico[this.ads.SettoreMerceologico];
    let comune = this.ads.Indirizzo.Citta.toLowerCase().substring(0,1);
    let fileName = `${settore}`;

    switch(comune) {
      case "a":
      case "b":
      case "c":
        fileName += "_a-c.txt";
        break;
      case "d":
      case "e":
      case "f":
      case "g":
      case "h":
        fileName += "_d-h.txt";
        break;
      case "i":
      case "l":
      case "m":
        fileName += "_i-m.txt";
        break;
      case "n":
      case "o":
      case "p":
      case "q":
      case "r":
      case "s":
        fileName += "_o-s.txt";
        break;
      case "t":
      case "u":
      case "v":
      case "z":
        fileName +="_t-z.txt";
        break;
      default:
        fileName +="_t-z.txt";
    }

    let url = 'assets/cerfiles/' + fileName; 
    
    if (this.platform.is('cordova') && this.platform.is('android')) {
        url = "/android_asset/www/" + url;
    }
    
    this.http.get(url).subscribe(res => {
      this.cerList = res.json();
      this.cer = new Cer();
      this.cer.SM = SettoreMerceologico[this.ads.SettoreMerceologico];
      this.cer.COM = this.ads.Indirizzo.Citta.toUpperCase();
      this.cer.VIA = this.ads.Indirizzo.Via.toUpperCase();
  
      
      this.cerList.forEach(val => {
        let dataScadenza = moment(val["DATASCADENZA"], "DD-MM-YYYY");
        let now = moment();

        if(val["Comune"].toUpperCase().includes(this.cer.COM.toUpperCase()) && 
           val["Nome Via"].toUpperCase().includes(this.cer.VIA.toUpperCase()) &&
           dataScadenza >= now){
          this.foundList.push(val);
        }
      });

      if(this.foundList.length > 0) {
        var nonDisponibileCER = {
          	"Nome Via": "NON APPLICARE",
		        COSTOFISSO: "0"
        };
        
        this.foundList.push(nonDisponibileCER);
        this.disabledCerFlag = false;
        this.isEnabled.emit(true);
      }

    }); 
   


    
  }

  openCalc() {
   let modal = this.modalCtrl.create(CerCalc, { "cerList": this.foundList });

   modal.onDidDismiss(data => {
     this.openModal = undefined;
     if(data){
       if(data.result !== undefined){
         this.result.emit(data);
         this.isEdited.emit(data.edited);
       }
     }
   });
   modal.present();
   this.openModal = modal;
 }
}
