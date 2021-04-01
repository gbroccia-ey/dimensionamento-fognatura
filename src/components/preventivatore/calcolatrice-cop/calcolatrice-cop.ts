import { Component, EventEmitter, Output, Input, OnInit, ViewChild } from '@angular/core';
import { Ads, CodSocieta } from '../../../models/ads';
import { CopInfo } from '../../../models/cop-info';
import { ViewController, ModalController, NavParams, Navbar, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CalcolatriceCopComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */


@Component({
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>
            Cop
          </ion-title>
          <ion-buttons start>
            <button id="closeModal" class="btn_closeModal" ion-button (click)="dismiss()">
              <span ion-text color="primary" showWhen="ios">Annulla</span>
              <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>

      <ion-list>
        <ion-grid>
          <ion-row>
            <ion-col col-1>
              <input type="radio" name="tipo" (click)="selezionaTipo('comunale')" [checked]="comunaleChecked">
            </ion-col>
            <ion-col col-5>
              <ion-label>Scavo su strada Comunale:</ion-label>
            </ion-col>
            <ion-col col-6>
            <ion-select [(ngModel)]="comunale_valore" [disabled]="comunale.length === 0 || comunale.length === 1">
                <ion-option *ngFor="let c of comunale" [value]="c.Valore"  [selected]="comunale.length === 1">{{ c.ENTE }} - {{ c.Localita}}</ion-option>
            </ion-select>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col col-1>
              <input type="radio" name="tipo" (click)="selezionaTipo('provinciale')" [disabled]="provinciale.length === 0" [checked]="provincialeChecked">
            </ion-col>
            <ion-col col-5>
              <ion-label>Scavo su strada Provinciale:</ion-label>
            </ion-col>
            <ion-col col-6>
              <ion-select [(ngModel)]="provinciale_valore" [disabled]="provinciale.length === 0 || provinciale.length === 1">
                <ion-option *ngFor="let c of provinciale" [value]="c.Valore"  [selected]="provinciale.length === 1">{{ c.ENTE }} - {{ c.Localita}}</ion-option>
              </ion-select>
            </ion-col>
            <!--<ion-col col-6>
              <ion-label>{{provinciale.ENTE}}</ion-label>
            </ion-col>-->
          </ion-row>

          <ion-row>
            <ion-col col-1>
              <input type="radio" name="tipo" (click)="selezionaTipo('statale')" [disabled]="statale.length === 0" [checked]="stataleChecked">
            </ion-col>
            <ion-col col-5>
              <ion-label>Scavo su strada Statale (ANAS):</ion-label>
            </ion-col>
            <ion-col col-6>
              <ion-select [(ngModel)]="statale_valore" [disabled]="statale.length === 0 || statale.length === 1">
                <ion-option *ngFor="let c of statale" [value]="c.Valore"  [selected]="statale.length === 1">{{ c.ENTE }} - {{ c.Localita}}</ion-option>
              </ion-select>
              <!--
              <ion-label>{{statale.ENTE}}</ion-label>
              -->
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col col-1>
              <input type="radio" name="tipo" (click)="selezionaTipo('nessuno')" [checked]="nessunoChecked">
            </ion-col>
            <ion-col col-11>
              <ion-label>Senza scavo o con scavo fuori carreggiata </ion-label>
            </ion-col>
          </ion-row>

          </ion-grid>
          </ion-list>
          <ion-grid>
          <ion-row>
            <ion-col col-1>
              <ion-checkbox [(ngModel)]="isConsorzio" [disabled]="consorzio.length === 0"></ion-checkbox>            
            </ion-col>
            <ion-col col-5>
              <ion-label>Pertinenza Consorzio Bonifica:</ion-label>
            </ion-col>
            <ion-col col-6>
              <ion-label>{{consorzio.ENTE}}</ion-label>       
            </ion-col>
          </ion-row>
          </ion-grid>
          <button ion-button color="danger" (click)="dismiss()">OK</button> 
          


        

      </ion-content>
  
  `
})
export class ModalCalc implements OnInit{

  ads: Ads;
  copInfo: CopInfo;
  copItems = [];
  totale: number = 0;
  isEdited: boolean = false;
  comunale = [];
  provinciale = [];
  consorzio = [];
  statale = [];

  statale_valore: string;
  comunale_valore: string;
  provinciale_valore: string;
  consorzio_valore: string;
  tipoSelezionato: string = "";
  isConsorzio: boolean;

  comunaleChecked: boolean = false;
  provincialeChecked: boolean = false;
  stataleChecked: boolean = false;
  nessunoChecked: boolean = false;
  consorzioChecked: boolean = false;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public alertCtrl: AlertController) {
    if(navParams.data.ads) {
      this.ads = navParams.data.ads;
      this.copItems = navParams.data.copItems;

      if(this.ads){
        if(this.ads.CopInfo) {
          this.copInfo = this.ads.CopInfo;
          if(this.copInfo.Comunale === true) {
            this.comunaleChecked = true;
            this.comunale_valore = String(this.copInfo.ComunaleValore);
            this.tipoSelezionato = "comunale";
          }
          else if(this.copInfo.Provinciale === true){
            this.provincialeChecked = true;
            this.tipoSelezionato = "provinciale";
          }
          else if(this.copInfo.Nessuno === true){
            this.nessunoChecked = true;
            this.tipoSelezionato = "nessuno";
          }
          else if(this.copInfo.Statale === true){
            this.stataleChecked = true;
            this.tipoSelezionato = "statale";
          }
          if(this.copInfo.Consorzio === true){
            this.consorzioChecked = true;
            this.isConsorzio = true;
          }
        }
      }

      try {
        this.comunale = this.copItems.filter(x => x["TIPO COP"] === "COMUNALE" &&
                                              x["Localita"].toUpperCase() === this.ads.Indirizzo.Citta.toUpperCase());
        if(this.comunale === undefined) {
          this.comunale = [];
        }
      }catch(Error) {}
      try{
        this.provinciale = this.copItems.filter(x => x["TIPO COP"] === "PROVINCIALE" &&
                                                x["Provincia"].toUpperCase().includes(this.ads.Indirizzo.Provincia.toUpperCase()));
        if(this.provinciale === undefined) {
          this.provinciale = [];
        }
      }catch(Error){}
      try{
        this.statale = this.copItems.filter(x => x["TIPO COP"] === "STATALE" &&
                                            x["Provincia"].toUpperCase().includes(this.ads.Indirizzo.Provincia.toUpperCase()));        
        
        if(this.statale === undefined) {
          this.statale = [];
        }
        /*
        else {
          this.statale_valore = this.statale["Valore"];
        }
        */
      }catch(Error){}
      try{
        this.consorzio = this.copItems.filter(x => x["TIPO COP"] === "CONSORZIO")[0];        
        if(this.consorzio === undefined) {
          this.consorzio = [];
        }else{
          this.consorzio_valore = this.consorzio["Valore"];
        }
        
      }catch(Error){}
      
    }
    

  }

  ngOnInit() {
    
  }

  selezionaTipo(tipo){
    this.tipoSelezionato = tipo;
    if(tipo === "comunale") {
      if(this.comunale.length === 1) {
        this.comunale_valore = this.comunale[0].Valore;
      }
    }
    if(tipo === "provinciale") {
      if(this.provinciale.length === 1) {
        this.provinciale_valore = this.provinciale[0].Valore;
      }
    }
    if(tipo === "statale") {
      if(this.statale.length === 1) {
        this.statale_valore = this.statale[0].Valore;
      }
    }
  }

  setCopEdited() {
    this.isEdited = true;
  }

  dismiss() {
    //TODO o comunale o provinciale o statale
    //+ il consorzio eventualmente. radio sulle prime 3 checkbox su consorzio
    this.setCopEdited();
    this.copInfo = new CopInfo();

    switch(this.tipoSelezionato) {
      case "comunale":
        this.copInfo.Comunale = true;
        if(!this.comunale_valore) {
          this.comunale_valore = "0";
        }
        let val = parseFloat(this.comunale_valore.replace(",","."));
        this.totale = val;
        this.copInfo.ComunaleValore = val;
        break;
      case "statale":
        this.copInfo.Statale = true;
        this.totale = parseFloat(this.statale_valore.replace(",","."));
        break;
      case "provinciale":
        this.copInfo.Provinciale = true;
        this.totale = parseFloat(this.provinciale_valore.replace(",","."));
        break;
      default:
        this.copInfo.Nessuno = true;
        this.totale = 0;
    }

    if(this.isConsorzio) {
      this.copInfo.Consorzio = true;
      this.totale += parseFloat(this.consorzio_valore.replace(",","."));
    }
                   
    this.viewCtrl.dismiss({"result": this.totale, "edited": this.isEdited, "copInfo": this.copInfo });
   
  }

}


@Component({
  selector: 'calcolatrice-cop',
  templateUrl: 'calcolatrice-cop.html'
})
export class CalcolatriceCopComponent implements OnInit {

  @Input()
  ads: Ads;

  @Output()
  result: EventEmitter<Object>;

  @Output()
  isEnabled: EventEmitter<boolean>;

  @Output()
  isEdited: EventEmitter<boolean>;

  copList = [];
  foundList: any[] = [];
  disableCopFlag:boolean = true;
  openModal;
  canGoBack: boolean = true;
    public unregisterBackButtonAction: any;


  @ViewChild(Navbar) navBar: Navbar;

  constructor(public modalCtrl: ModalController, 
              public platform: Platform, 
              public http: Http, public navCtrl: NavController) {
   this.result = new EventEmitter<number>();
   this.isEdited = new EventEmitter<boolean>();
   this.isEnabled = new EventEmitter<boolean>();
}
  ngOnInit() {
    let url;
    
    switch(this.ads.CodiceSocieta){
       case CodSocieta.AAA:
       default:
         //url = 'assets/cop_aaa.txt'; 
         url = 'assets/cop.txt'; 
         break;
    }
 
 
 
    if (this.platform.is('cordova') && this.platform.is('android')) {
        url = "/android_asset/www/" + url;
    }
 
    this.http.get(url).subscribe(res => {
     this.copList = res.json();
 
     this.copList.forEach(val => {
       if(val["Provincia"].toUpperCase().includes(this.ads.Indirizzo.Provincia.toUpperCase())) 
       {
           this.foundList.push(val);
       }
     });
   
     if(this.foundList.length > 0) {
       this.disableCopFlag = false;
     }
     this.isEnabled.emit(true);
    });
  }

  ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
         this.naviga_back();
      }
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidEnter() {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
             this.naviga_back();
        }, 10);
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

openCalc() {
  
  let modal = this.modalCtrl.create(ModalCalc, { "ads": this.ads, "copItems": this.foundList });

  modal.onDidDismiss(data => {
    this.openModal = undefined;
    if(data){
      
      this.result.emit({result: data.result, copinfo: data.copInfo});
      this.isEdited.emit(data.edited);
      
    }
  });
  modal.present();
  this.openModal = modal;

}



}
