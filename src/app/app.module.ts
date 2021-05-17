import { NgModule, ErrorHandler } from '@angular/core';
import { DecimalPipe} from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SignaturePadModule } from 'angular2-signaturepad';
//import { IonicStorageModule } from '@ionic/storage';


import {DimensionamentoAllacciPage} from '../pages/dimensionamento-allacci/dimensionamento-allacci';
import {PreventivatorePage} from '../pages/preventivatore/preventivatore';
import {DimensionamentoAllacciFognaturaComponent,RemoveCommaPipe} from '../components/dimensionamento-allacci/dimensionamento-allacci-fognatura/dimensionamento-allacci-fognatura';
import { MyApp } from './app.component';
import { WidgetManager } from '../providers/widget-manager/widgetManager';
import { LogManager } from '../providers/log-manager/logManager';
import { PdfManager } from '../providers/pdfManager';
import { ModelAcqua} from '../models/ModelAcqua';
import { ModelGas} from '../models/ModelGas';
import { ModelEE} from '../models/ModelEE';
import { ModelFT} from '../models/ModelFT';
import { PreventivoPDF } from '../models/PreventivoPDF';
import { AdsService } from '../services/ads-service';
import { AdsSync } from '../services/ads-synchronizer';
import { JSONStoreManager } from '../providers/jsonstore-manager/jsonstoremanager';
import { FileBackupService } from '../services/file-backup-service';
import { RemoteCallsManager } from '../providers/remotecalls-manager/remoteCallsManager';

import { Lavfat1100GasComponent } from '../components/preventivatore/gas/lavfat1100-gas/lavfat1100-gas';
import { Lavfat1110GasComponent } from '../components/preventivatore/gas/lavfat1110-gas/lavfat1110-gas';
import { Lavfat1010GasComponent } from '../components/preventivatore/gas/lavfat1010-gas/lavfat1010-gas';
import { Lavfat1070GasComponent } from '../components/preventivatore/gas/lavfat1070-gas/lavfat1070-gas';
import { Lavfat1170GasComponent } from '../components/preventivatore/gas/lavfat1170-gas/lavfat1170-gas';
import { Lavfat1130GasComponent } from '../components/preventivatore/gas/lavfat1130-gas/lavfat1130-gas';
import { Lavfat1610GasComponent } from '../components/preventivatore/gas/lavfat1610-gas/lavfat1610-gas';
import { Lavint1630GasComponent } from '../components/preventivatore/gas/lavint1630-gas/lavint1630-gas';
import { Lavfat1631GasComponent } from '../components/preventivatore/gas/lavfat1631-gas/lavfat1631-gas';
import { Lavfat1040EeComponent } from '../components/preventivatore/ee/lavfat1040-ee/lavfat1040-ee';
import { Lavfat1100EeComponent } from '../components/preventivatore/ee/lavfat1100-ee/lavfat1100-ee';
import { Lavfat1010AcquaComponent } from '../components/preventivatore/acqua/lavfat1010-acqua/lavfat1010-acqua';
import { Lavfat1181EeComponent } from '../components/preventivatore/ee/lavfat1181-ee/lavfat1181-ee';
import { Lavfat1010FognaComponent } from '../components/preventivatore/fogna/lavfat1010-fogna/lavfat1010-fogna';
import { Lavfat1040FognaComponent } from '../components/preventivatore/fogna/lavfat1040-fogna/lavfat1040-fogna';
import { Lavfat1040AcquaComponent } from '../components/preventivatore/acqua/lavfat1040-acqua/lavfat1040-acqua';
import { Lavfat1070AcquaComponent } from '../components/preventivatore/acqua/lavfat1070-acqua/lavfat1070-acqua';
import { Lavfat1170AcquaComponent } from '../components/preventivatore/acqua/lavfat1170-acqua/lavfat1170-acqua';
import { Lavfat1130AcquaComponent } from '../components/preventivatore/acqua/lavfat1130-acqua/lavfat1130-acqua';
import { Lavfat1181AcquaComponent } from '../components/preventivatore/acqua/lavfat1181-acqua/lavfat1181-acqua';
import { Lavfat1100AcquaComponent } from '../components/preventivatore/acqua/lavfat1100-acqua/lavfat1100-acqua';
import { Lavfat1110AcquaComponent } from '../components/preventivatore/acqua/lavfat1110-acqua/lavfat1110-acqua';
import { Lavfat1610AcquaComponent } from '../components/preventivatore/acqua/lavfat1610-acqua/lavfat1610-acqua';
import { Lavint1610AcquaComponent } from '../components/preventivatore/acqua/lavint1610-acqua/lavint1610-acqua';

import { CalcolatriceCopComponent } from '../components/preventivatore/calcolatrice-cop/calcolatrice-cop';
import { ModalCalc } from '../components/preventivatore/calcolatrice-cop/calcolatrice-cop';
import { CalcolatriceDerogaComponent } from '../components/preventivatore/calcolatrice-deroga/calcolatrice-deroga';
import { ModalDeroga } from '../components/preventivatore/calcolatrice-deroga/calcolatrice-deroga';
import { CalcolatriceQuoteComponent } from '../components/preventivatore/calcolatrice-quote/calcolatrice-quote';
import { ModalQuote } from '../components/preventivatore/calcolatrice-quote/calcolatrice-quote';
import { CalcolatoreCerComponent } from '../components/preventivatore/calcolatore-cer/calcolatore-cer';
import { CerCalc } from '../components/preventivatore/calcolatore-cer/calcolatore-cer';
import { CvvCalc } from '../components/preventivatore/calcolatore-cvv/calcolatore-cvv';
import { CalcolatoreCvvComponent } from '../components/preventivatore/calcolatore-cvv/calcolatore-cvv';
import { BasePreventivatoreComponent } from '../components/preventivatore/base-preventivatore/base-preventivatore';
import { ResourceTree} from '../components/resource-tree/resource-tree'


import { HomePage } from '../pages/home/home';
import { AdsdetailsPage } from '../pages/adsdetails/adsdetails';
import { ModelDatiRetePdf } from '../models/ModelDatiRetePdf';
import { ModelPermessi } from '../models/ModelPermessi';
import { PreviewPdfNoSignatures } from '../pages/preview-pdf-no-signature/preview-pdf-no-signature';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { MapPage } from '../pages/map/map';
import { MapTreePage } from '../pages/map-tree/map-tree';
import { SceltapagePage } from '../pages/sceltapage/sceltapage';
import { Form1Page } from '../pages/form1/form1';
import { Form2Page } from '../pages/form2/form2';
import { ModalepdfPage } from '../pages/modalepdf/modalepdf';
import { PermessiPage } from '../pages/permessi/permessi';
import { PainterPage2 } from '../pages/painter2/painter2';
import { FotoPage } from '../pages/foto/foto';
import { NoteVerbalePage } from '../pages/note-verbale/note-verbale';
import { ModalenotePage } from '../pages/modalenote/modalenote';
import { PreviewPdfTwoSignatures } from '../pages/preview-pdf-two-signature/preview-pdf-two-signature';
import { ModalefirmaPage } from '../pages/modalefirma/modalefirma';
import { ConfermaFormPage } from '../pages/conferma-form/conferma-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    MapTreePage,
    Form1Page,
    Form2Page,
    ModalepdfPage,
    ModalenotePage,
    ModalefirmaPage,
    PainterPage2,
    FotoPage,
    NoteVerbalePage,
    SceltapagePage,
    ConfermaFormPage,
    PermessiPage,
    AdsdetailsPage,

    DimensionamentoAllacciFognaturaComponent,
    RemoveCommaPipe,
    PreventivatorePage,
    DimensionamentoAllacciPage,
    PdfViewerComponent,
	  Lavfat1100GasComponent ,
    Lavfat1110GasComponent ,
    Lavfat1010GasComponent ,
    Lavfat1070GasComponent ,
    Lavfat1170GasComponent ,
    Lavfat1130GasComponent ,
    Lavfat1610GasComponent ,
    Lavint1630GasComponent ,
    Lavfat1631GasComponent ,
    Lavfat1040EeComponent ,
    Lavfat1100EeComponent ,
    Lavfat1010AcquaComponent,
    Lavfat1181EeComponent ,
    Lavfat1010FognaComponent,
    Lavfat1040FognaComponent,
    Lavfat1040AcquaComponent,
    Lavfat1070AcquaComponent,
    Lavfat1170AcquaComponent,
    Lavfat1130AcquaComponent,
    Lavfat1181AcquaComponent,
    Lavfat1100AcquaComponent,
    Lavfat1110AcquaComponent,
    Lavfat1610AcquaComponent,
    Lavint1610AcquaComponent,
    CalcolatriceCopComponent,
    ModalCalc ,
    CalcolatriceDerogaComponent,
    ModalDeroga,
    CalcolatriceQuoteComponent,
    ModalQuote ,
    CalcolatoreCerComponent ,
    CerCalc ,
    CvvCalc ,
    CalcolatoreCvvComponent ,
    BasePreventivatoreComponent,
    PreviewPdfNoSignatures,
    PreviewPdfTwoSignatures,
    ResourceTree
  ],
  imports: [
  
    BrowserModule,
    SignaturePadModule,
    //IonicStorageModule.forRoot(),    
    
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    MapTreePage,
    Form1Page,
    Form2Page,
    SceltapagePage,
    PermessiPage,
    AdsdetailsPage,

    ModalepdfPage,
    ModalenotePage,
    ModalefirmaPage,
    PainterPage2,
    FotoPage,
    NoteVerbalePage,

    PreventivatorePage,
    DimensionamentoAllacciPage,
    PreviewPdfNoSignatures,
    PreviewPdfTwoSignatures,
    ConfermaFormPage,

    CerCalc,
    CvvCalc,
    ModalCalc,
    ModalDeroga,
    ModalQuote,
    ResourceTree
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
    DecimalPipe,
    RemoveCommaPipe,
    AdsService,
    JSONStoreManager,
    FileBackupService,
    RemoteCallsManager,
    AdsSync,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}

