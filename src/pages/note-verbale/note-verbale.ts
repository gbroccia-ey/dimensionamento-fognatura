import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


import { AlertController } from 'ionic-angular';
import { LogManager } from '../../providers/log-manager/logManager';
import { WidgetManager } from '../../providers/widget-manager/widgetManager';

import { Ads } from '../../models/ads'; 
import { NotaSopralluogo,NoteItem,NotePlaceholder} from '../../models/nota_sopralluogo'; 



  
@Component({
  selector: 'page-note-verbale',
  templateUrl: 'note-verbale.html',
})
export class NoteVerbalePage implements OnInit{

  ads: Ads;
  notes: NoteItem[] = []; 
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public LogManager: LogManager,
              public widgets: WidgetManager) {

  }

  ionViewDidLoad() {
    document.getElementsByClassName('modal-wrapper')[0].setAttribute('style', 'width:100vw;height:100vh;left:0;top:0;');  
    this.LogManager.info('ionViewDidLoad NoteVerbalePage');
 
  
  }

  ionViewDidEnter(){
    this.initForm();  
  }

  initForm(){
    if (this.ads){
      let notes = NotaSopralluogo.getNotes(this.ads);
      for (let i = 0; i<notes.length;i++){
        notes[i].value = notes[i].text;
      }
      
      if (this.ads.VerbaleDiSopralluogo?.Note_dinamiche ){
        for (let vnote of this.ads.VerbaleDiSopralluogo.Note_dinamiche){         
          for (let i = 0; i<notes.length;i++){
            if (notes[i].text === vnote.text){
              notes[i] = JSON.parse(JSON.stringify(vnote));
              notes[i].checked = true;
              if (vnote.placeholders?.length > 0){
                this.interpolateNoteText(notes[i]); 
              }
            }
          }  
        }  
      }
      this.notes = notes;  
    }
  }

  ngOnInit() {
    if(this.navParams.data) {
        this.ads = this.navParams.data.ads;
      }
  }

  interpolateNoteText(note:NoteItem){
    note.value = NotaSopralluogo.interpolateNoteText(note,true);
  }


  confirm() {
    // Validate placeholders
    for (let note of this.notes){
      if (note.checked && note.placeholders.length > 0){
        for (let placeholder of note.placeholders){
          if (placeholder.value ===  undefined || placeholder.value.length == 0){
            alert("Compilare tutti i parametri di ciascuna nota se selezionata")
            return;
          }
        }    
      }
    }
    this.viewCtrl.dismiss({ Note_dinamiche: this.notes.filter((n) => n.checked === true) });
  }

  annulla() {
    this.viewCtrl.dismiss();
  }

  reset() {
    this.notes.map((note) => note.checked = false)
  }


}
