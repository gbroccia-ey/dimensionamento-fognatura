declare var WL;
import * as moment from 'moment';


export class Utils {
    

    static getDeviceEnvironment(): string {

        var env: string =  "preview"//WL.Client.getEnvironment();
        var device: string = "unsupported";
        
        switch(env.toLowerCase()) {
            case "android":
                device =  "Android";
                break;
            case "ipad":
                device = "IOS";
                break;
            case "iphone":
                device = "IOS";
                break;
            case "preview":
                device = "preview";
                break;
            default:
                device = "Android";
        }

        return device;

    }

    static checkConnection(successCallback: () => any, failCallback: () => any) {
        successCallback();
    
    }

    //input: AAAAMMDD
    static formatDate(dateString: string) {
        if(dateString=="Invalid date") return "01-01-2000";
        if(dateString==undefined) return "01-01-2000";
        if(dateString.indexOf('-')==2) return dateString;
        return dateString.substring(0,4) + "-" + dateString.substring(4,6) + "-" + dateString.substring(6,8);
    }

    static deserialize<T>(target: T, obj: T){
        const objectKeys = Object.keys(obj) as Array<keyof T>;
        for(let key of objectKeys) {
            target[key] = obj[key];  
        }
        return target;
    }

    static getSAPDate(sapStr: string) {
        if(sapStr){
            if(sapStr.indexOf("-")>-1) return sapStr;
            if(sapStr.length>8) return sapStr;
            try{
                var tmpDate = moment(sapStr).format("DD-MM-YYYY");
                if(tmpDate.indexOf('Invalid')>-1) return sapStr;
                return tmpDate;
            }catch(err) {
                console.log(err);
                return sapStr;
            }
        }
            
        return undefined;
    }

    static toSAPDate(dateStr) {

        if(dateStr=='Invalid') return '';
        if(dateStr=='d .li.Inva') return '';
        if(dateStr){
            if(isNaN(dateStr) == false ) return dateStr;
            if(dateStr.length < 8 ) {
                console.error("wrong tosap date"+dateStr);
                return dateStr;
            }
            try{
                var d = dateStr.substring(3,5) + "-" + dateStr.substring(0,2) + "-" + dateStr.substring(6,10);
            
                
                let result = moment(d).format("YYYYMMDD");
                if(result.includes("Invalid")){
                    
                    try{
                        d = dateStr.replace(/-/g, "");
                        return d.substr(0, 8);
                    }catch(err){
                        return "";
                    }
                }
                return result;
            }catch(err){ 
                console.log(err);
                return undefined;
            }
            
        }
        return undefined;
        
    }

    static getSAPTime(sapStr: string) {
        if(sapStr){
            try{
                if(sapStr.indexOf(':')>0)  return sapStr;
                return sapStr.substring(0,2) + ":" + sapStr.substring(2,4);
            }catch(err) {
                console.log(err);
                return undefined;
            }
            
        }
        return undefined;
        
    }

    static toSAPTime(timeStr) {
        if(timeStr){
            try{
                 if(isNaN(timeStr) == false ) return timeStr;
                return timeStr.substring(0,2) + timeStr.substring(3,5) + "00";
            }catch(err) {
                console.log(err);
                return undefined;
            }
            
        }
        return undefined;
        
    }

    static getFloatFromString(str: string) {
        str = str.replace(",",".");
        let regex = /[+-]?\d+(\.\d+)?/g;
        let floats = str.match(regex).map(function(v) { return parseFloat(v); });
        return floats;
    }

    static cutInitialFloat(str: string) {
        str = str.replace(".", "");
        return str.replace(/^[\d-]*\s*/, "");
    }

    static isQueueRunning(timestamp: any){
        let now = moment();
        let msDiff = now.diff(timestamp) / 1000;
        if(msDiff > 20) {
            return false;
        }
        else{
            return true;
        }
        
    }


    static dateCompare(sourceDate: string, targetDate: string): boolean {

        let sDate = moment(sourceDate, "DD/MM/YYYY");
        let tDate = moment(targetDate, "DD/MM/YYYY");
        let difference:number = sDate.diff(tDate, "days");
        return difference >= -1 && difference <= 1;
    }

    static round(num: number) : number{
        return Math.round(num * 100) / 100;
    }

    static stringToBoolean(str: string): boolean{
        switch(str.toLowerCase().trim()){
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(str);
        }
    }

    static strDateToArray(str:string): string{
        
        let res:any;
        try {
            // try first if date is in Iso format
            res= str.split('T')[0].split('-');
            if (res.length === 1){
                // check if "YYYY/MM/DD"
                res = res[0].split('/');
                if (res.length === 3){
                    // check if "DD/MM/YYYY"
                    if (Number(res[0]) < 2000){
                        res.reverse();
                    }
                }
            }
        }
        catch(e){
            console.error(e);
        }
            
        return res
    }

    static resizedataURL(datas, wantedWidth, wantedHeight){
        return new Promise(async function(resolve,reject){
    
            // We create an image to receive the Data URI
            var img = document.createElement('img');
    
            // When the event "onload" is triggered we can resize the image.
            img.onload = function()
            {        
                // We create a canvas and get its context.
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                img.width = (img.width > 0)? img.width : 300 ;
                img.height = (img.height > 0)? img.height : 300 ;
                        
                if (wantedWidth < 0 || wantedHeight < 0){
                    var ratio = img.height / img.width;
                    if (wantedHeight > 0){
                        wantedWidth = wantedHeight / ratio;
                    }
                    else {
                        wantedHeight = wantedWidth * ratio; 
                    }
                }
                
                // We set the dimensions at the wanted size.
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
    
                // We resize the image with the canvas method drawImage();
                ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
    
                var dataURI = canvas.toDataURL("image/jpeg",0.5);
    
                // This is the return of the Promise
                resolve(dataURI);
            };
    
            // We put the Data URI in the image's src attribute
            img.src = datas;
    
        })
    }// Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);

}