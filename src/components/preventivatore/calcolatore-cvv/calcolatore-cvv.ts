import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { ViewController, ModalController, NavParams, Navbar,NavController } from 'ionic-angular';
import { Ads, SettoreMerceologico } from '../../../models/ads';


@Component({
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>
            Cvv
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

       
          <ion-list radio-group [(ngModel)]="totale">
          <ion-grid>
            <ion-row *ngFor="let cvv of cvvList; let i = index">
              <ion-col col-10>
                {{cvv["Denominazione"]}} - {{cvv["Vie interessate"]}}
              </ion-col>
              <ion-col col-2>
                <ion-radio value="{{getCostoFisso(i)}}" (ionSelect)="setCvvEdited()"></ion-radio>
              </ion-col>
            </ion-row>
          </ion-grid>  
            

          </ion-list>
        
        <button ion-button (click)="dismiss()">OK</button> 
        
      </ion-content>
  `
})
export class CvvCalc{

  cvvList = [];
  totale: number = 0;
  isEdited: boolean = false;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(navParams.data.cvvList) {
      this.cvvList = navParams.data.cvvList;
    }

  }



  getCostoFisso(index) {
    return parseFloat(this.cvvList[index]["Totale"]);
  }


  setCvvEdited() {
    this.isEdited = true;
  }

  dismiss() {
   
    this.viewCtrl.dismiss({"result": this.totale, "edited": this.isEdited });
  }

}


@Component({
  selector: 'calcolatore-cvv',
  templateUrl: 'calcolatore-cvv.html'
})
export class CalcolatoreCvvComponent implements OnInit {

  @Input()
  ads: Ads;

  @Output()
  result: EventEmitter<number>;

  @Output()
  isEnabled: EventEmitter<boolean>;

  @Output()
  isEdited: EventEmitter<boolean>;

  cvvList = [];
  foundList: any[] = [];  
  disabledCvvFlag: boolean = true;
  _settoreMerceologico: string = "";
  openModal;
  canGoBack: boolean = true;
  public unregisterBackButtonAction: any;
  
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

  ngOnInit() {
    let url = 'assets/cvv.txt'; 
    
    if (this.platform.is('cordova') && this.platform.is('android')) {
        url = "/android_asset/www/" + url;
    }

    this._settoreMerceologico = SettoreMerceologico[this.ads.SettoreMerceologico];
    if(this._settoreMerceologico === "GAS"){
      this._settoreMerceologico = "Gas";
    }
    if(this._settoreMerceologico === "ACQUA"){
      this._settoreMerceologico = "Acquedotto";
    }
    
    this.http.get(url).subscribe(res => {
      this.cvvList = res.json();  
      this.cvvList.forEach(val => {
        if(val["Comune"].toUpperCase().includes(this.ads.Indirizzo.Citta.toUpperCase()) && 
           val["Vie interessate"].toUpperCase().includes(this.ads.Indirizzo.Via.toUpperCase()) &&
           +this.ads.Indirizzo.Civico >= +val["CIVMIN"] &&
           +this.ads.Indirizzo.Civico <= +val["CIVMAX"] &&
           val["Servizio"] === this._settoreMerceologico
          ){
          this.foundList.push(val);
        }
      });

      if(this.foundList.length > 0) {
        this.disabledCvvFlag = false;
        this.isEnabled.emit(true);
      }

    }); 
  }

  openCalc() {
    let modal = this.modalCtrl.create(CvvCalc, { "cvvList": this.foundList });
 
    modal.onDidDismiss(data => {
      this.openModal = undefined;
      if(data){
        if(data.result != undefined){
          this.result.emit(data.result);
          this.isEdited.emit(data.edited);
        }
      }
    });
    modal.present();
    this.openModal = modal;
  }

}
