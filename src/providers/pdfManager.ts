import { Injectable } from '@angular/core';
import { ModelAcqua } from '../models/ModelAcqua';
import { ModelGas } from '../models/ModelGas';
import { ModelEE } from '../models/ModelEE';
import { ModelFT } from '../models/ModelFT';
import { PreventivoPDF } from '../models/PreventivoPDF';
import { WidgetManager } from '../providers/widget-manager/widgetManager';
import { ModelDatiRetePdf } from '../models/ModelDatiRetePdf';
import { ModelPermessi } from '../models/ModelPermessi';


declare let pdfMake: any;
declare let window: any;

@Injectable()
export class PdfManager {

    constructor(
        public modelAcqua: ModelAcqua,
        public modelGas: ModelGas,
        public modelEE: ModelEE,
        public modelFT: ModelFT,
        public preventivoPDF: PreventivoPDF,
        public modelDatiRete: ModelDatiRetePdf,
        public widgetManager: WidgetManager,
        public modelPermessi: ModelPermessi
        
    ) { }

    /**
     * this method create the pdf and save it if is required
     * @typology: string with name of the typology of pdf to create
     * @value: bean with values necessary for the pdf
     */
    public pdfCreate(typology, value): Promise<{ pdfObj: any,blob: Blob, url: string, base64: string }> {
        console.log('value:', value)

        return new Promise((resolve, reject) => {
            this.widgetManager.doWithLoader("Creazione pdf in corso...", (loader) => {
                var pdf;
                //loader.dismiss();
                //var myDate: string = new Date().toTimeString();

                var successCallback: Function = (dd) => {
                    //Create pdf
                    //console.log(JSON.stringify(dd));
                    pdf = pdfMake.createPdf(dd);
                    //convert pdf to base64
                    pdf.getBase64((output) => {
                        //create blob for the pdf
                        var blob = new Blob([this.base64ToUint8Array(output)], { type: 'application/pdf' });

                         const binary_string =  window.atob(output);
                          const len = binary_string.length;
                          const bytes = new Uint8Array(len);
                          for (let i = 0; i < len; i++) {
                            bytes[i] = binary_string.charCodeAt(i);
                          }
                        var pdfObj = bytes.buffer;

                        //check if pdf need to be saved to sd card
                        if (value.download.needDownload) {
                            // for trace and debug purpose only. The pdf will be saved directly into the DB as base64
                            //this.pdfSave(value.download.pdfName, blob);
                        }
                        //create object url to show in pdf page
                        var url = URL.createObjectURL(blob);
                        //create object with url and blob. Blob is used for generate other pdf
                        var res1 = {pdfObj: pdfObj ,blob: blob, url: url, base64: output };
                        loader.dismiss();
                        resolve(res1);

                        pdf = null;
                        return;
                    }, (err) => {
                        loader.dismiss();
                        reject(err);
                    });
                }

               // this.logManager.info("Choosing the correct template of the pdf. Input typology is:" + typology);
                //Check typology to use 
                switch (typology) {
                    case 'ModelAcqua': {
                        this.modelAcqua.getTesProvDomDefinition(value).then(dd => {
                            successCallback(dd);
                        }, err => {
                            loader.dismiss();
                            reject(err);
                        });
                        break;
                    }
                    case 'ModelGas': {
                        this.modelGas.getTesProvDomDefinition(value).then(dd => {
                            successCallback(dd);
                        }, err => {
                            loader.dismiss();
                            reject(err);
                        });
                        break;
                    }                    
                    case 'ModelEE': {
                        this.modelEE.getTesProvDomDefinition(value).then(dd => {
                            successCallback(dd);
                        }, err => {
                            loader.dismiss();
                            reject(err);
                        });
                        break;
                    }                    
                    case 'datiRete':{
                        this.modelDatiRete.getTesProvDomDefinition(value).then(dd => {
                           successCallback(dd);
                       }, err => {
                          loader.dismiss();
                           reject(err);
                       });
                       break;
                   }
                   case 'Permesso_Scheda':{
                        this.modelPermessi.getTesProvDomDefinition(value).then(dd => {
                            successCallback(dd);
                        }, err => {
                            loader.dismiss();
                            reject(err);
                        });
                        break;
                    }                         
                    case 'fascicoloTecnico':{
                         this.modelFT.getTesProvDomDefinition(value).then(dd => {
                            successCallback(dd);
                        }, err => {
                           loader.dismiss();
                            reject(err);
                        });
                        break;
                    }
                    case 'PreventivoPDF':{
                        this.preventivoPDF.getTesProvDomDefinition(value).then(dd => {
                           successCallback(dd);
                       }, err => {
                          loader.dismiss();
                           reject(err);
                       });
                       break;
                   }
                    default: {
                       loader.dismiss();
                        reject('[ERRORE]: Modello pdf non trovato');
                    }
                }
            });
        });
    }

    /**
     * method used for generate pdf file on sd card
     
    private pdfSave(pdfName: string, blob: Blob) {
        //get sd path for the device
        this.deviceManager.getExternalSDPath((path) => {
            //Control if path is on the divice 
            window.resolveLocalFileSystemURL(path, (fs) => {
                console.log('file system open: ' + fs.name);
                //Write empty file
                fs.getFile(pdfName + ".pdf", { create: true }, (fileEntry) => {

                    //Create buffer
                    fileEntry.createWriter((fileWriter) => {

                        fileWriter.onwriteend = function () {
                            console.log("Successful pdf write for: " + pdfName);
                        };
                        fileWriter.onerror = function (e) {
                            alert('File non scritto');
                            console.log("Failed write pdf write: " + pdfName + " because: " + e.toString());
                        };

                        //put blob  into the file
                        fileWriter.write(blob);
                    });

                }, (err) => {
                    alert('Pdf non salvato su SD: Controllare il corretto inserimento della scheda SD');
                });

            }, err => alert('Path sd non risolto'));
        }, err => alert('Path sd non trovato'));
    }
*/
    /**
     * Private class used for convert base64 to array 8 bit
     */
    private base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
}

export class PdfResult {
    blob: Blob;
    url: string;
    base64: string;
     pdfObj: any;
}
