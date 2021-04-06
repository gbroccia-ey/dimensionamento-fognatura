import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the MapTreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-tree',
  templateUrl: 'map-tree.html',
})
export class MapTreePage {

  public treeItems;
  public persistedName = "MyItemsPersisted";
  public treeViewName = "MyItemsTreeView";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.treeItems =  [{
      label: "Alta Tensione",
      checked: false,
      children: [
        {
          label: "Nodi Rigidi AT",
          layer: 1,
          checked: false,
          
        },
        {
          label: "Sbarre AT",
          layer: 2,
          checked: false,
        },
        {
          label: "Punti Fornitura AT",
          layer: 3,
          checked: false,
        },
        {
          label: "Sezionatore Elettrico AT",
          layer: 4,
          checked: false,
        },
        {
          label: "Rami AT",
          layer: 5,
          checked: false,
        }
      ]
    },
    {
      label: "Media Tensione",
      checked: false,
      children: [
        {
          label: "Nodi Rigidi MT",
          layer: 6,
          checked: false,
          
        },
        {
          label: "Sbarre MT",
          layer: 7,
          checked: false,
        },
        {
          label: "Punti Fornitura MT",
          layer: 8,
          checked: false,
        },
        {
          label: "Sezionatori Elettrici MT",
          layer: 9,
          checked: false,
        },
        {
          label: "Sezionatori Aerei Elettrici MT",
          layer: 10,
          checked: false,
        },
        {
          label: "Congiuntori MT",
          layer: 11,
          checked: false,
        },
        {
          label: "Rami MT",
          layer: 12,
          checked: false,
        }
      ]
    }];
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapTreePage');
  }

  confirmSelection(){

  }

  reset(){
    this.navCtrl.pop();
  }
}
