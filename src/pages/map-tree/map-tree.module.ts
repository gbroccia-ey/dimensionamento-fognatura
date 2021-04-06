import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapTreePage } from './map-tree';

@NgModule({
  declarations: [
    MapTreePage,
  ],
  imports: [
    IonicPageModule.forChild(MapTreePage),
  ],
})
export class MapTreePageModule {}
