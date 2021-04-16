import { Component, EventEmitter, Output, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { Ads, SettoreMerceologico, DettaglioMerceologico } from '../../../models/ads';
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
            Quote
          </ion-title>
          <ion-buttons start>
            <!--<button id="closeModal" class="btn_closeModal" ion-button (click)="dismiss()">
              <span ion-text color="primary" showWhen="ios">Annulla</span>
              <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
            </button> -->
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>

      <ion-list>
          <div *ngFor="let item of quoteItems" class="containerQuote">
            <div col-12>
              <ion-label class="title">{{item.label}} :</ion-label>
            </div>
            <div col-12>
            <ion-list>
              <div *ngFor="let itemQuota of item.value" style="height:70px"> 
              <ion-item  *ngIf="itemQuota.selectValue"   class="row" col-7  style="float:left; margin-top:20px">
                  <ion-checkbox checked="{{itemQuota.checked}}" style="opacity:1"  disabled> </ion-checkbox>  
                  <ion-label style="opacity:1"> {{itemQuota.label}}</ion-label>   
                  <ion-select  (ionChange)="selezionaQuota(itemQuota, item)"
                          [(ngModel)]="itemQuota.selOption">
                            <ion-option *ngFor="let option of itemQuota.options" [value]="option">{{option.label}} {{option.value}}&euro;</ion-option>
                  </ion-select>
                </ion-item>
                <ion-item  *ngIf="!itemQuota.selectValue && !itemQuota.singleValue" (click)="selezionaQuota(itemQuota, item)"  class="row" col-7  style="float:left; margin-top:20px">
                  <ion-checkbox checked="{{itemQuota.checked}}" style="opacity:1"  disabled> </ion-checkbox>  
                  <ion-label style="opacity:1"> {{itemQuota.label}} {{itemQuota.value}}&euro;</ion-label>   
                </ion-item>
              <ion-item  *ngIf="!itemQuota.selectValue && itemQuota.singleValue" (click)="selezionaQuota(itemQuota, item)"  class="row" col-10  style="float:left; margin-top:20px">
                <ion-checkbox checked="{{itemQuota.checked}}" style="opacity:1"  disabled> </ion-checkbox>  
                <ion-label style="opacity:1"> {{itemQuota.label}} {{itemQuota.value}}&euro;</ion-label>   
              </ion-item>
                <ion-item *ngIf="!itemQuota.selectValue && !itemQuota.singleValue" col-3 style="float:left">
                  <ion-label floating  style="opacity:1"> {{itemQuota.placeholder}}</ion-label>  
                  <ion-input  type="number" [(ngModel)]="itemQuota.num" disabled="{{isDisabled(itemQuota)}}" style="float:left"></ion-input>    
                </ion-item>
                <ion-label col-2 *ngIf="itemQuota.num > 0 && !itemQuota.selectValue" class="labelQuote">
                &euro; {{itemQuota.num * itemQuota.value}}
                </ion-label>
                <ion-label col-2 *ngIf="itemQuota.selectValue" class="labelQuote">
                &euro; {{itemQuota.selOption?.value}}
                </ion-label>
                <ion-label col-2 *ngIf="!itemQuota.num ||  itemQuota.num  == 0" style="padding-top:16px;  margin-top:20px">
                .
                </ion-label>
                 
              </div>
                 
              </ion-list>
              </div>
          </div>
          <div *ngIf="quoteItems" class="containerQuote">
            <div col-12>
              <ion-label class="title">altro :</ion-label>
            </div>
            <div col-12 class="row">
              <div col-6 class="element">
                <ion-input type="text" placeholder="Inserire descrizione altro" [(ngModel)]="quoteItems.altroDescrizione"></ion-input>
              </div>
              <div col-6 class="element" >
                <ion-input type="number" placeholder="valore in &euro;" [(ngModel)]="quoteItems.altroNum"></ion-input>
              </div>

            
            </div>
          </div>
      </ion-list>
      
    <button ion-button color="danger" (click)="save()">OK</button> 
          
    </ion-content>
  
  `
})
export class ModalQuote {

  ads: Ads;
  isEdited: boolean = false;
  totale;
  quoteItems;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public alertCtrl: AlertController, public zone: NgZone) {
    if(navParams.data.ads) {
      this.ads = navParams.data.ads;    
      this.quoteItems = navParams.data.quoteItems;
      for(let elem of this.quoteItems){
        for(let item of elem.value){
          if(item.checked == undefined) item.checked = false;
        }}
    }
  }

  
  ionViewDidEnter() {
    for(let elem of this.quoteItems){
      for(let item of elem.value){
        if(item.enabled) document.getElementById(item.id).click();
      }
    }
  }

  isDisabled(itemQuota){
    return !itemQuota.checked;
  }


  selezionaQuota(itemQuota, item){
    this.zone.run(() => {
      for(let elem of item.value){
        elem.num = undefined;
        if(elem.id != itemQuota.id){
          elem.checked = false;
          elem.num = "";
        }
        else {
          if((item.value[0].singleValue) ||  (item.value[0].selectValue)) elem.num = 1;
          if(elem.checked) elem.num = "";
          elem.checked = !elem.checked;
          
        }
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.totale = 0;
    for(let elem of this.quoteItems){
      for(let item of elem.value){
        if(item.checked &&  !item.num) {
          alert("Completa tutti i campi selezionati");
          return;
        }
        if(item.selectValue){
          item.value = item.selOption.value;
          item.label = item.selOption.label;         
          this.totale += item.selOption.value;
        }
        else {
          if(item.num > 0) this.totale += item.value * item.num ;
          if(item.enabled && item.singleValue) this.totale += item.value;
        }
        
      }
    }
    if(this.quoteItems && this.quoteItems.altroNum) this.totale += Number(this.quoteItems.altroNum);
    
    this.viewCtrl.dismiss({"result": this.totale, "edited": this.isEdited , "quote": this.quoteItems});
  }

}


@Component({
  selector: 'calcolatrice-quote',
  templateUrl: 'calcolatrice-quote.html'
})
export class CalcolatriceQuoteComponent {

  @Input()
  ads: Ads;

  @Input()
  preventivo;

  @Output()
  result: EventEmitter<Object>;

  @Output()
  isEnabled: EventEmitter<boolean>;

  @Output()
  isEdited: EventEmitter<boolean>;

  foundList: any[] = [];
  openModal;
  canGoBack: boolean = true;

  quoteItems;

  public unregisterBackButtonAction: any;


  @ViewChild(Navbar) navBar: Navbar;

  constructor(public modalCtrl: ModalController, 
              public platform: Platform, 
              public http: Http, public navCtrl: NavController) {
   this.result = new EventEmitter<number>();
   this.isEdited = new EventEmitter<boolean>();
   this.isEnabled = new EventEmitter<boolean>();
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

openQuote() {
  
  var settore = SettoreMerceologico[this.ads.SettoreMerceologico];
  if(settore === "ACQUA"){
    if(this.ads.DettaglioMerceologico==DettaglioMerceologico["FOGNATURA"]){
      settore = "FOGNATURA";
    }
  }

  let keyQuote = "QUOTE_"+this.ads.ProdServizio + "_"+settore;
  this.quoteItems = this.preventivo.QuoteItems;
  
  let modal = this.modalCtrl.create(ModalQuote, { "ads": this.ads, "quoteItems": this.quoteItems },{cssClass: 'largePopup'});

  modal.onDidDismiss(data => {
    this.openModal = undefined;
    if(data){
      this.result.emit({Totale: data.result, quoteInfo: data.quote});
      this.isEdited.emit(data.edited);
      
    }
  });
  modal.present();
  this.openModal = modal;

}



}
