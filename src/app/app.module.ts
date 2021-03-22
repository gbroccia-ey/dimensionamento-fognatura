import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {DimensionamentoAllacciPage} from '../pages/dimensionamento-allacci/dimensionamento-allacci';
import {DimensionamentoAllacciFognaturaComponent,RemoveCommaPipe} from '../components/dimensionamento-allacci-fognatura/dimensionamento-allacci-fognatura';
import { MyApp } from './app.component';
import { WidgetManager } from '../providers/widget-manager/widgetManager';
import { LogManager } from '../providers/log-manager/logManager';
import { PdfManager } from '../providers/pdfManager';
import { ModelAcqua} from '../models/ModelAcqua';
import { ModelGas} from '../models/ModelGas';
import { ModelEE} from '../models/ModelEE';
import { ModelFT} from '../models/ModelFT';
import { PreventivoPDF } from '../models/PreventivoPDF';

import { HomePage } from '../pages/home/home';
import { ModelDatiRetePdf } from '../models/ModelDatiRetePdf';
import { ModelPermessi } from '../models/ModelPermessi';
import { PreviewPdfNoSignatures } from '../pages/preview-pdf-no-signature/preview-pdf-no-signature';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DimensionamentoAllacciFognaturaComponent,
    RemoveCommaPipe,
    DimensionamentoAllacciPage,
    PdfViewerComponent,
	  
    PreviewPdfNoSignatures,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DimensionamentoAllacciPage,
    PreviewPdfNoSignatures,
  ],
  providers: [
    PdfManager,
    WidgetManager,
    LogManager,
    ModelAcqua,
    ModelGas,
    ModelEE,
    ModelFT,
    PreventivoPDF,
    ModelDatiRetePdf,
    ModelPermessi,
    
    { provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

