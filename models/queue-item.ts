import { Queue } from '../utils/queue';

export class ItemId{
    codiceAds: string;
    codiceOdl: string;

    static toJsObject(itemId: ItemId): Object {
        var obj = {};

        obj["codiceAds"] = itemId.codiceAds;
        obj["codiceOdl"] = itemId.codiceOdl;
        return obj;
    }

    static parseServerDto(itemId: ItemId) {
        var i = new ItemId();
        i.codiceAds = itemId.codiceAds;
        i.codiceOdl = itemId.codiceOdl;
        return i;
    }

    static create(codiceAds: string, codiceOdl: string): ItemId {
        let obj = new ItemId();
        obj.codiceAds = codiceAds;
        obj.codiceOdl = codiceOdl;
        return obj;
    }
}

export class QueueItem{
    public itemId: ItemId;
    public adsManagerMethodName: string;
    public params: Object;
    public guid: string;
    public done: boolean = false;
    public retryCounter: number = 0;
    public lastTry: string;

    constructor(itemId: ItemId, adsManagerMethodName: string, params: Object) {
        this.itemId = itemId;
        this.adsManagerMethodName = adsManagerMethodName;
        this.params = params;

        this.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    }

    static toJsObject(queueItem: QueueItem): Object {
        var obj = {};
        if(queueItem==null) return;
        if(queueItem.itemId==null) queueItem.itemId = undefined;
        obj["itemId"] = queueItem.itemId ? ItemId.toJsObject(queueItem.itemId) : "";
        obj["adsManagerMethodName"] = queueItem.adsManagerMethodName;
        obj["params"] = queueItem.params;
        obj["guid"] = queueItem.guid;
        obj["done"] = queueItem.done;
        obj["retryCounter"] = queueItem.retryCounter;
        obj["lastTry"] = queueItem.lastTry;

        return obj;
    }

    static toJsObjectList(items: QueueItem[]): Object[] {
        var result: Object[] = [];

        if(items==undefined || items.length==0) return result;
        
        items.forEach(a => {
            if(a!=null)
                result.push(QueueItem.toJsObject(a))
        });
        return result;
    }

    static parseServerDtos(queueItems: QueueItem[]) : QueueItem[] {
        var _queueItems: QueueItem[] = [];
        //ads.forEach(a => _ads.push(Ads.parseServerDto(a)));
        queueItems["adsRequestQueue"].forEach(a => _queueItems.push(QueueItem.parseServerDto(a)));
        return _queueItems;
    }

    static parseServerDto(queueItem: QueueItem) {
        return new QueueItem(queueItem.itemId ? ItemId.parseServerDto(queueItem.itemId) : null, 
                            queueItem.adsManagerMethodName, queueItem.params);
    }

    static isAlreadyQueued(item: QueueItem, queue: Queue<QueueItem>): boolean {
        let found = false;
        queue.toArray().forEach(i => {
            if(item !== null && i !== null && item.adsManagerMethodName === i.adsManagerMethodName)
            {
                if(item.itemId && i.itemId){
                    if(item.itemId.codiceAds === i.itemId.codiceAds &&
                        item.itemId.codiceOdl === i.itemId.codiceOdl) 
                    {
                        let flag = true;
                        for(let key in item.params) {
                            if(i.params.hasOwnProperty(key) && item.params[key] === i.params[key]) {
                                
                            } else {
                                flag =  false;
                            }
                        }
                        found = flag;
                    }  
                } else if(item.params && i.params){
                    let flag = true;
                    for(let key in item.params) {
                        if(i.params.hasOwnProperty(key) && item.params[key] === i.params[key]) {
                            
                        } else {
                            flag =  false;
                        }
                    }
                    found = flag;
                }
                

            }
            

        });

        return found;
    }

    static adsListFirst(queue: Queue<QueueItem>){
        if(queue.size() > 0){
            queue.toArray().forEach((element, index) => {
                if(element.adsManagerMethodName === "getAds"){
                    let _getAds: QueueItem = queue.toArray().splice(index, 1)[0];
                    queue.toArray().unshift(_getAds);
                }
            });
        } 
    }


}