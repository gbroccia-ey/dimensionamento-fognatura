import { Component, EventEmitter, Output, Input, OnInit, ViewChild } from '@angular/core';
import { Ads } from '../../../models/ads';
import { CopInfo } from '../../../models/cop-info';
import { ViewController, ModalController, NavParams, Navbar, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Params } from '../../../config/params';

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
            Deroga
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

        <ion-grid>
          <ion-row col-12>
            <ion-label>Deroga: </ion-label>
            <ion-select  class="select_deroga" [(ngModel)]="selectedItem" (ionChange)="changeDeroga()"   name="deroga">
              <ion-option *ngFor="let item of derogaItems" [value]="item">{{item.label}}</ion-option>
              <ion-option  [value]="derogaItems.itemAltro">altro</ion-option>
            </ion-select>
          </ion-row>
          <ion-row *ngIf="selectedItem && selectedItem.id==5">
            <ion-col col-3>
              <ion-label>motivazione</ion-label>
            </ion-col>
            <ion-col col-9>
              <ion-input [(ngModel)]="derogaItems.itemAltro.descrizione" type="text"></ion-input>
            </ion-col>
            </ion-row>
          <ion-row *ngIf="selectedItem">
            <ion-col col-3>
              <ion-label>Numero U.i</ion-label>
            </ion-col>
            <ion-col col-3 *ngIf="selectedItem.id==5">
              <ion-input [(ngModel)]="derogaItems.itemAltro.num" type="number"></ion-input>
            </ion-col>
            <ion-col col-3 *ngIf="selectedItem.id != 5">
              <ion-input [(ngModel)]="selectedItem.num" type="number"></ion-input>
            </ion-col>
            <ion-col col-3>
              <ion-label>320 &euro; /u.i</ion-label>
            </ion-col>
            <ion-col col-3>
              <ion-label *ngIf="selectedItem.num">{{320 * (selectedItem.num - 1)}}</ion-label>
            </ion-col>
          </ion-row>
        
        </ion-grid>
      
    <button ion-button color="danger" (click)="save()">OK</button> 
          
    </ion-content>
  
  `
})
export class ModalDeroga implements OnInit{

  ads: Ads;
  isEdited: boolean = false;
  totale;
  derogaItems;
  selectedItem;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public alertCtrl: AlertController) {
    if(navParams.data.ads) {
      this.ads = navParams.data.ads;    
      this.derogaItems = navParams.data.derogaItems;

      if(!this.derogaItems.itemAltro) this.derogaItems.itemAltro = {id: 5, value : this.derogaItems[0].value};
    }
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    for(let item of this.derogaItems){
      if(item.num > 0) {
        this.selectedItem = item;
      }
    }

    if(this.derogaItems.itemAltro.num > 0){
      this.selectedItem = this.derogaItems.itemAltro;
    }
  }

  changeDeroga(){
    for(let item of this.derogaItems){
      if(item.num > 1) {

      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.totale = this.selectedItem.value * (this.selectedItem.num - 1);
   
    for(let item of this.derogaItems){
      if(item.num > 1 && this.selectedItem.id != item.id) {
        item.num = 0;
        item.checked = false;
      }
      if(this.selectedItem.id == item.id){
        item.num = Number(this.selectedItem.num);
        item.checked = true;
      }
    }

    if(this.selectedItem.id == this.derogaItems.itemAltro.id){
      this.derogaItems.itemAltro.checked = true;
    }
    else{
      this.derogaItems.itemAltro.checked = false;
      this.derogaItems.itemAltro.num = 0;
    }
   
    this.viewCtrl.dismiss({"result": this.totale, "edited": this.isEdited , "deroga": this.derogaItems});
  }

}


@Component({
  selector: 'calcolatrice-deroga',
  templateUrl: 'calcolatrice-deroga.html'
})
export class CalcolatriceDerogaComponent {

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
  derogaItems;
  public unregisterBackButtonAction: any;


  @ViewChild(Navbar) navBar: Navbar;

  constructor(public modalCtrl: ModalController, 
              public platform: Platform, 
              public http: Http, public navCtrl: NavController) {
   this.result = new EventEmitter<number>();
   this.isEdited = new EventEmitter<boolean>();
   this.isEnabled = new EventEmitter<boolean>();
   this.derogaItems = Params.Valori.get("deroga");

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

openDeroga() {
  
  let modal = this.modalCtrl.create(ModalDeroga, { "ads": this.ads, "derogaItems": this.derogaItems });

  modal.onDidDismiss(data => {
    this.openModal = undefined;
    if(data){
      this.result.emit({Totale: data.result, derogaInfo: data.deroga});
      this.isEdited.emit(data.edited);
      
    }
  });
  modal.present();
  this.openModal = modal;

}



}
