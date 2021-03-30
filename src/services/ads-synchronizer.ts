import { Injectable } from '@angular/core';
import { Queue } from '../utils/queue';
import { Ads, Stato, SettoreMerceologico, DettaglioMerceologico, CodSocieta } from '../models/ads';

import { Preventivo } from '../models/preventivo';
import { Ente } from '../models/ente';
import { AdsService } from '../services/ads-service';
import { QueueItem, ItemId } from '../models/queue-item';
import { Platform } from 'ionic-angular';
import { Params } from '../config/params';
import { WidgetManager } from '../providers/widget-manager/widgetManager';
import { DocUtils } from '../config/docUtils';
import { Utils } from '../utils/utils';
import * as moment from 'moment';


declare var esriCtrl: any;

@Injectable()
export class AdsSync {
    _queue: Queue<QueueItem>;
    _queueTemp: Queue<QueueItem>;
    lock: boolean;
    tmpItem: any;
    isPaused: boolean = false;
    timestamp: any;
    queueStarted: boolean = false;
    showAlert: boolean = true;

    
    constructor(public adsService: AdsService, 
                public platform: Platform) {
        this._queue = new Queue<QueueItem>();
        this._queueTemp = new Queue<QueueItem>();
        this.lock = false;
        this.start();

        
    }


    checkChar(item){
        var note = item.params.note;
        var retNote = "";

        for(var a=0; a<note.length; a++){
            var res = note.charCodeAt(a);
            if(res == 215 || res<192 || res >222 ) retNote += note[a];
        }
        item.params.note = retNote;
        return item;
    }


    start() {
        

    }

    execute(itemId: ItemId, adsManagerMethodName: string, params: Object) {
    }

    processQueue() {
    }   

    clearQueue() {
       
    }


}

