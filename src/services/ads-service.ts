import { Injectable } from '@angular/core';
import { Ads } from '../models/ads';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ItemId } from '../models/queue-item';

@Injectable()
export class AdsService {

    ads: Ads[];
    subject = new Subject();

    constructor( ) {

    }

    getAdsList() : Observable<any> {
        return this.subject.asObservable();
    }

    removeAllAds(){
        // this.jsonStoreManager.storeAdsList([], () => {},  () => {});
    }


    removeAds(a: Ads, successCallback: () => any, failCallback: (error) => any) {
        successCallback();
    }

    updateAds(a: Ads, values: Object, successCallback: (data: string) => any, failCallback: (err: string) => any) {
        successCallback("OK");
        //this.fileBackupService.backupAdsList(this.ads);
        
    }

    getByItemId(itemId: ItemId) {
        if(this.ads == undefined) return undefined;
        return this.ads.find(x => (x.CodiceAds !== undefined && x.CodiceAds === itemId.codiceAds) ||
                      (x.CodiceOdl !== undefined && x.CodiceOdl === itemId.codiceOdl));
                      
    }

}