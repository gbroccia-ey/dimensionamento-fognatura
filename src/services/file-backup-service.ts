import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { QueueItem } from '../models/queue-item';
import { Ads } from '../models/ads';

declare var fileUtil: any;

@Injectable()
export class FileBackupService{

    queue: QueueItem[];
    ads: Ads[];
    plate: String;
    endOperation;
    endOperationSD;
    endOperationAL;

    constructor(){
       
    }

    restoreQueue(successCallback, failCallback) {

        var path = fileUtil.getExternalStoragePath()+"files/backup";

        fileUtil.readBinaryDoc(path,"backupQueue.txt", (content) => {
            //fix crash seriale
            /*var tmp = content.split(',');
            var erroreDetect = false;
            for(var a = 0; a < tmp.length; a++){
                if(tmp[a].length>10000) {
                   if(tmp[a-1].indexOf('base64')<0){
                        erroreDetect = true;
                        console.log(tmp[a].substr(0,7));
                       if(tmp[a].substr(0,8) == '"params"'){
                            tmp[a] = '"params": {"note":"crash prevention"';
                            var exitClean = false;
                            if(tmp[a+1] && ((tmp[a+1].indexOf('OdL')<0 ||tmp[a+1].indexOf('OdL')> 10) && (tmp[a+1].indexOf('TipoNota')<0 ||tmp[a+1].indexOf('TipoNota')> 10)))
                                tmp[a+1] = '"crash":"crash prevention"';
                            else exitClean = true;
                            if(exitClean == false && tmp[a+2] && ((tmp[a+2].indexOf('OdL')<0 ||tmp[a+2].indexOf('OdL')> 10) && (tmp[a+2].indexOf('TipoNota')<0 ||tmp[a+2].indexOf('TipoNota')> 10)) )
                            {
                                tmp[a+2] = '"crash":"crash prevention"';
                            }
                            else exitClean = true;
                            
                            if(exitClean == false && tmp[a+3] && ((tmp[a+3].indexOf('OdL')<0 ||tmp[a+3].indexOf('OdL')> 10) && (tmp[a+3].indexOf('TipoNota')<0 ||tmp[a+3].indexOf('TipoNota')> 10)))
                            {
                                tmp[a+3] = '"crash":"crash prevention"';
                            }
                            else exitClean = true;
                            if(exitClean == false && tmp[a+4] && ((tmp[a+4].indexOf('OdL')<0 ||tmp[a+4].indexOf('OdL')> 10) && (tmp[a+4].indexOf('TipoNota')<0 ||tmp[a+4].indexOf('TipoNota')> 10) ))
                            {
                                tmp[a+4] = '"crash":"crash prevention"';
                        
                            }
                            else exitClean = true;
                             if(exitClean == false && tmp[a+5] && ((tmp[a+5].indexOf('OdL')<0 ||tmp[a+5].indexOf('OdL')> 10) && (tmp[a+5].indexOf('TipoNota')<0 ||tmp[a+5].indexOf('TipoNota')> 10)) )
                            {
                                tmp[a+5] = '"crash":"crash prevention"';
                            
                            }
                            else exitClean = true;
                            
                             if(exitClean == false && tmp[a+6] && ((tmp[a+6].indexOf('OdL')<0 ||tmp[a+6].indexOf('OdL')> 10) && (tmp[a+6].indexOf('TipoNota')<0 ||tmp[a+6].indexOf('TipoNota')> 10)) )
                            {
                                tmp[a+6] = '"crash":"crash prevention"';
                               
                            }
                       }
                       else{
                        tmp[a] = '"crash":"crash prevention"';
                       }
                       
                       
                    }      
                }
            }

            if(erroreDetect){
                console.log('Trovato errore nei file di backup');
                content = '';
                for(var a = 0; a < tmp.length -1; a++){
                    content += tmp[a]+','
                }
                content += tmp[a];
                //console.log(content);
            }*/

            try{
                this.queue = JSON.parse(content);
            }catch(err){
                alert('Error on parse content');
                console.error(content.length ? content : "Backup Queue not found");
                this.queue = [];
            }
            successCallback();
         
        }, (err) => {
            console.log("Cannot restore Queue from file");
            failCallback(err);
        });
    }

    backupQueue(q: QueueItem[]) {
        console.log("START QUEUE FILE BACKUP " + new Date().getTime());
        if(this.endOperation == true){
            var self = this;
            console.log("Errore: backup operation in corso");
            setTimeout(function(){self.backupQueue(q);},3000);
            return;
        }
        this.endOperation = true;
        var objList = QueueItem.toJsObjectList(q);
        var objListToString = JSON.stringify(objList);
        var self = this;
        fileUtil.createFile("files","backup","backupQueue.txt", objListToString,() => {
            setTimeout(function(){
                self.endOperation = false;
                console.log("END QUEUE FILE BACKUP " + new Date().getTime());
                console.log("Backup Queue OK");
            },2000);


        }, () => {
             self.endOperation = false;
            console.log("Backup Queue FAILED");
        });
    }

    backupAdsList(ads: Ads[]){
        console.log("START ADSLIST FILE BACKUP " + new Date().getTime());
        var self = this;
        if(this.endOperationAL == true){
            console.log("Errore: backup operation in corso");
            setTimeout(function(){self.backupAdsList(ads);},3000);
            return;
        }
        this.endOperationAL = true;
        var testSanitazied = Ads.toJsObjectList(ads);

        let sanitaziedAdsListToSave = JSON.parse(JSON.stringify(testSanitazied)); 
    
        sanitaziedAdsListToSave.forEach(element => {
            element._disegnoTecnicoBase64 = "";
            element.DisegnoTecnicoBase64 = "";

            if(element._base64Img!=undefined)
                for(let i = 0; i < element._base64Img.length; i++){
                element._base64Img[i].base64 = "";
                };
                if(element.Base64Img!=undefined)
                for(let i = 0; i < element.Base64Img.length; i++){
                element.Base64Img[i].base64 = "";
                };


                if(element._base64ImgFt!=undefined)
                for(let i = 0; i < element._base64ImgFt.length; i++){
                element._base64ImgFt[i].base64 = "";
                };
                if(element.Base64ImgFt!=undefined)
                for(let i = 0; i < element.Base64ImgFt.length; i++){
                element.Base64ImgFt[i].base64 = "";
                };

                if(element._base64ImgFta!=undefined)
                for(let i = 0; i < element._base64ImgFta.length; i++){
                element._base64ImgFta[i].base64 = "";
                };
                if(element.Base64ImgFta!=undefined)
                for(let i = 0; i < element.Base64ImgFta.length; i++){
                element.Base64ImgFta[i].base64 = "";
                };

                if(element._base64ImgSopralluogo!=undefined)
                for(let i = 0; i < element._base64ImgSopralluogo.length; i++){
                element._base64ImgSopralluogo[i].base64 = "";
                }; 
                if(element.Base64ImgSopralluogo!=undefined)
                for(let i = 0; i < element.Base64ImgSopralluogo.length; i++){
                element.Base64ImgSopralluogo[i].base64 = "";
                }; 

            
            if(element._verbaleDiSopralluogo !== undefined) {
                element._verbaleDiSopralluogo.Disegno_Schema = "";
                element._verbaleDiSopralluogo.Img = [];
            }
            if(element.VerbaleDiSopralluogo !== undefined) {
                element.VerbaleDiSopralluogo.Disegno_Schema = "";
                element.VerbaleDiSopralluogo.Img = [];
            }

            
        });

        fileUtil.createFile("files","backup","backupAdsList.txt", JSON.stringify(sanitaziedAdsListToSave),() => {
            setTimeout(function(){
                 console.log("Backup Ads List OK");
                console.log("END ADSLIST FILE BACKUP " + new Date().getTime());
                self.endOperationAL = false;
            },2000);
           
        }, () => {
            console.log("Backup Ads List FAILED");
            self.endOperationAL = false;
        });
    }

    backupSecureData(data){
        var self = this;
        if(this.endOperationSD == true){
            console.log("Errore: backup operation in corso");
            setTimeout(function(){self.backupSecureData(data);},3000);
            return;
        }
        this.endOperationSD = true;
        fileUtil.createFile("files","backup","backupPlate.txt", data,() => {
            setTimeout(function(){
                self.endOperationSD = false;
                console.log("END securedata FILE BACKUP " + new Date().getTime());
            },2000);

        }, () => {
             self.endOperationSD = false;
            console.log("Backup securedata  FAILED");
        });
    }


    restoreSecureData(successCallback, failCallback){
        var path = fileUtil.getExternalStoragePath()+"files/backup";

        fileUtil.readBinaryDoc(path,"backupPlate.txt", (content) => {
            successCallback(content);
        }, () => {
            console.log("Cannot restore secure Data from file");
            failCallback();
        });
    }

    restoreAdsList(successCallback, failCallback){
        var path = fileUtil.getExternalStoragePath()+"files/backup";

        fileUtil.readBinaryDoc(path,"backupAdsList.txt", (content) => {
            this.ads = JSON.parse(content);
            successCallback(this.ads);
         
        }, () => {
            console.log("Cannot restore Ads List from file");
            failCallback();
        });
    }


    backupPlate(plate){
          fileUtil.createFile("files","backup","backupPlate.txt", plate,() => {
            console.log("Backup plate OK");

        }, () => {
            console.log("Backup plate FAILED");
        });
    }

    restorePlate(successCallback, failCallback){
        var path = fileUtil.getExternalStoragePath()+"files/backup";
          fileUtil.readBinaryDoc(path,"backupPlate.txt", (content) => {
            this.plate = content;
            successCallback();
        }, () => {
            console.log("Cannot restore plate from file");
            failCallback();
        });
    }

    
}