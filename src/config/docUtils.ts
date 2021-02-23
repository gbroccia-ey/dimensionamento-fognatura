declare var fileUtil: any;

import { Ads } from '../models/ads';

export class InMemoryFile{
    public fileName: string;
    public base64: string;
}

export class MemoryDocumentManager{
      static inMemoryFiles: InMemoryFile[];
}

export class DocUtils {

    loadedFilename: any;
    loadedTag: any;

    addDocumentInMemory(path, base64){
        if(MemoryDocumentManager.inMemoryFiles == undefined)
            MemoryDocumentManager.inMemoryFiles = [];
        for(let mem of MemoryDocumentManager.inMemoryFiles){
            if(mem.fileName == path){
                mem.base64 = base64;
                return;
            }
        }

        let fileToStoreInMemomry = new InMemoryFile();

        fileToStoreInMemomry.base64 = base64;
        fileToStoreInMemomry.fileName = path;

        MemoryDocumentManager.inMemoryFiles.push(fileToStoreInMemomry);
    }

    removeDocumentFromMemory(path){
        var index = MemoryDocumentManager.inMemoryFiles.findIndex(x => x.fileName == path);

        if (index > -1) {
            MemoryDocumentManager.inMemoryFiles.splice(index,1)
        }
    }

    getBase64(callback, ads:Ads, path){
            var self = this;
            var tmp = path.split('/');
            //var dir1 = tmp[tmp.length - 3];
            //var dir2 = tmp[tmp.length - 2];
            self.loadedFilename = tmp[tmp.length - 1];
            var allDir = path.substring(0,path.length-self.loadedFilename.length);

             
            var succCallback = function(base64){
                var index = base64.indexOf(',');
                base64 = base64.substring(index+1,base64.length);
                callback(base64);
            }

            var errCallback = function(err){
                console.error(err);
            }

            if(MemoryDocumentManager.inMemoryFiles == undefined){
                MemoryDocumentManager.inMemoryFiles = [];
            }
            
            for(let mem of MemoryDocumentManager.inMemoryFiles)
                if(mem.fileName == path){
                    callback(mem.base64);
                    return;
                }
        
         
           fileUtil.readBase64ExternalDoc(allDir,self.loadedFilename,succCallback,errCallback);
         
    }

}