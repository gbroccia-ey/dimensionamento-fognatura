import { Ads } from '../../models/ads';
import { LoginUserData } from '../../DTO/Server/Login/LoginUserData';
import { LogManager } from '../log-manager/logManager';
import { Injectable } from '@angular/core';
import { QueueItem } from '../../models/queue-item';
import { FileBackupService } from '../../services/file-backup-service';

declare var WL;

var Password: string = "";

var initializedCollections = [];



@Injectable()
export class JSONStoreManager {

  flag: boolean = true;
  counterRequest: number = 0;
  errorInit = true;
  callbackArray = [];

  /*
    Static Properties Stored in GenericDataEntry
  */
  static ConfigData = { key: "ConfigDataKey", dataType: 'json' }
  static LastSessionRefreshTime = { key : "LastSessionRefreshTime", dataType: 'integer'}
  static RefreshedPage = { key : "RefreshedPage", dataType: 'integer'}

  //definition of generic data structure. the fields are only fieldName and 
  //value: usually the value field contains a stringified JSON. in this way the structure is always retrocompatible
  static genericDataEntry =
  {
    key: "genericData",
    fields: { fieldName: 'string', value: 'string' }
  };

  //the logged user has a dedicated structure. The "data" field contains a JSON that represents the LDAP data of the user
  //in this case the app will be single-user; eventually the username can be used as key to have the multi-user (by changing also the storeLoggedUserInternal method)
  static loggedUsersEntry =
  {
    key: "loggedUsers",
    fields: { username: 'string', password: 'string', passwordHash: 'string', lastSessionRefresh: 'string', data: 'string' }
  };

  static adsListEntry =
  {
    key: "adsList",
    fields: {  }
  };



  static adsRequestQueueEntry = 
  {
    key: "adsRequestQueueEntry",
    fields: { }
  }

  constructor(private logManager: LogManager, private fileBackupService:FileBackupService) { 
    
  }

  //adsList;
  adsRequestQueue;
  form;
  ads;
  secureDataForFile;
  readSecureDataFile;
  /*
  restoreAdsList(){
    console.error('adsList is broken');
    var self = this;
      this.inizializeCollection(JSONStoreManager.adsListEntry,function(){
        self.storeAdsList(self.adsList,function(){console.log('restoring complete')},function(){console.error('error on restoring');});
      },function(){console.error('error on restoring.');});
  }
*/

  getErrorInit(){
    return this.errorInit;
  }


  addForm(key,value){
    if(this.form!=undefined)
    for(let el of this.form){
        if(el.key==key){
          el.value = value;
          return;
        }
    }
    this.form.push({key:key,value: value});
  }

  getForm(key){
     if(this.form!=undefined)
    for(let el of this.form){
        if(el.key==key){
          return {value:el.value};
        }
    }
    return undefined;
  }


  /**
   * updates the time (in milliseconds from 1970) of the "last seen" value
   * @param successCallback 
   * @param failCallback 
   */
  public updateLastSessionRefreshTime( successCallback: () => any, failCallback: (errorMessage: string) => any) {
    this.storeSecureDataField(JSONStoreManager.LastSessionRefreshTime, new Date().getTime(), successCallback, failCallback);
  }


  public  initializeAllCollections(callback){
    var self = this;
      this.inizializeCollection(JSONStoreManager.genericDataEntry,function(){
           self.inizializeCollection(JSONStoreManager.loggedUsersEntry,function(){
               self.inizializeCollection(JSONStoreManager.adsListEntry,function(){
                  self.inizializeCollection(JSONStoreManager.adsRequestQueueEntry,function(){
                    self.errorInit = false;
                    callback();
                },function(){console.error('error in initialize adsRequestQueueEntry');});
            },function(){console.error('error in initialize adsListEntry');});
         },function(){console.error('error in initialize loggedUsersEntry');});
      },function(){console.error('error in initialize genericDataEntry');});
  }

  public cleanAllCollection(callback){
        var self = this;
      this.cleanCollection(JSONStoreManager.genericDataEntry,function(){
           self.cleanCollection(JSONStoreManager.loggedUsersEntry,function(){
               self.cleanCollection(JSONStoreManager.adsListEntry,function(){
                  self.cleanCollection(JSONStoreManager.adsRequestQueueEntry,function(){
        callback();
      },function(){});
      },function(){});
      },function(){});
      },function(){});
  }


private cleanCollection(map_key, successCallback, failCallback) {
   WL.JSONStore.get(map_key.key).clear().then(() => {
      successCallback();
    }).fail((err) => {
      console.error("error on cleaning collection "+map_key);
      failCallback();
    })
  };

  /**
   * updates the logged user data
   * @param username username
   * @param password for security reasons this should be used only in case of silent login
   * @param passwordHash hashed password to compare in case of offline login
   * @param data the LDAP user data
   * @param successCallback 
   * @param failCallback 
   */
  public storeLoggedUser(username: string, password: string, passwordHash: string, data: LoginUserData, successCallback: () => any, failCallback: (errorMessage: string) => any) {
    
    this.logManager.info("Storing Logged User to JSONStore: " + username);
    //var successInternal = () => {
      var self = this;
      this.lockStorage("storeLoggedUserInternal",function(){
        self.storeLoggedUserInternal(JSONStoreManager.loggedUsersEntry, username, password, passwordHash, data, successCallback, failCallback);
      });
       //}

   // this.inizializeCollection(JSONStoreManager.loggedUsersEntry, successInternal, failCallback);
  }

  public storeAdsList(data: Ads[], successCallback: () => any, failCallback: (errorMessage: string) => any) {
    
    this.logManager.info("Storing Ads List");
    //this.adsList = data;
    this.fileBackupService.backupAdsList(data);
    this.ads = data;
    if(successCallback)
        successCallback();
    /*
    
    var self = this;
      this.lockStorage("storeAdsListInternal",function(){
         self.storeAdsListInternal(JSONStoreManager.adsListEntry, data, successCallback, failCallback);
      });
     //this.storeAdsListInternal(JSONStoreManager.adsListEntry, sanitaziedAdsListToSave, successCallback, failCallback);
    */
  }

  public removeAds(ads: Ads, successCallback: () => any, failCallback: () => any) {
    this.getAdsList((storedAds) => {
      if(storedAds!=undefined) {
          var stored: Ads[] = Ads.parseServerDtos(storedAds.ads_list);
          for(var j = 0; j < stored.length; j++) {

            if((ads.CodiceAds !== undefined && ads.CodiceAds === stored[j].CodiceAds) ||
            ads.CodiceOdl !== undefined && ads.CodiceOdl === stored[j].CodiceOdl)

                  stored.splice(j, 1);
              
          }

          //this.adsList = stored;
          this.storeAdsList(stored, () => {
            
              console.log("syncAds: Data stored successfully and item deleted");
          }, () => {
              this.logManager.error("syncAds: Error while storing data");
          });

          
      }
       else storedAds = undefined;
       successCallback();
    }, () => {
      this.logManager.error("REMOVEADS: Error while retrieving ads list");
      failCallback();
    });
  }



  
  /**
   * stores a generic field into the genericDataEntry. The value will be added or replaced
   * @param fieldName 
   * @param value 
   * @param successCallback 
   * @param failCallback 
   */
  public storeSecureDataField(fieldName: {key: string, dataType:string}, value, successCallback, failCallback) {
    this.logManager.info("Storing Field to JSONStore: " + fieldName.key);
    this.addForm(fieldName.key,value);
    var self = this;
    this.lockStorage("storeSecureDataFieldInternal",function(){
         self.storeSecureDataFieldInternalFile(JSONStoreManager.genericDataEntry, fieldName, value, successCallback, failCallback);
    });
  }

  public storeListFilter(fieldName: {key: string, dataType:string}, value, successCallback, failCallback) {
    this.logManager.info("Storing Field to JSONStore: " + fieldName.key);
 //   var successInternal = () => {
    var self = this;
    this.lockStorage("storeListFilterInternal",function(){
         self.storeListFilterInternal(JSONStoreManager.genericDataEntry, fieldName, value, successCallback, failCallback);
    });
     /*   }

    var failInternal = () => {
      failCallback();
    }
    this.inizializeCollection(JSONStoreManager.genericDataEntry, successInternal, failInternal);*/
  }

  /**
   * gets the value from the genericDataEntry
   * @param fieldName 
   * @param successCallback 
   * @param failCallback 
   */
  public getSecureDataField(fieldName: {key: string, dataType:string}, successCallback, failCallback) {
    this.logManager.info("Getting Field from JSONStore: " + fieldName.key);
    var self = this;
    
    if(this.readSecureDataFile != true){
        this.readSecureDataFile = true;
        this.fileBackupService.restoreSecureData(
          function(content){
              try{
                var tmp = JSON.parse(content).allData;

                //clean duplicate if exist
                self.form = [];
                if(tmp)
                for(var index = 0; index< tmp.length; index++){
                  self.addForm(tmp[index].key,tmp[index].value );
                }
                
                var form = self.getForm(fieldName.key);
                successCallback({value:form});
              }catch(err){
                self.form = [];
                successCallback({value:""});
            }
          },
          function(){
              self.form = [];
              var form = self.getForm(fieldName.key);
              successCallback({value:form});
          }
        );

    }
    else{
      var form = this.getForm(fieldName.key);
      if(form!=undefined) {
        successCallback({value:form});
      }
      else{
        successCallback(undefined);
      }
    }
   /* else{
      var self = this;
       this.lockStorage("getSecureDataFieldInternal",function(){
              self.getSecureDataFieldInternal(JSONStoreManager.genericDataEntry, fieldName, successCallback, failCallback);
       });
  
    }
    //}

    /*var failInternal = () => {
      console.error("error on getting "+fieldName.key);
      failCallback();
    }
    this.inizializeCollection(JSONStoreManager.genericDataEntry, successInternal, failInternal);*/
  }
  
  /**
   * gets the logged user data from the jsonstore
   * @param successCallback 
   * @param failCallback 
   */
  public getLoggedUser(successCallback: (userData: any) => any, failCallback: () => any) {
    this.logManager.info("Getting Logged User from JSONStore");
  //  var successInternal = () => {
    var self = this;
    this.lockStorage("getLoggedUserInternal",function(){
          self.getLoggedUserInternal(JSONStoreManager.loggedUsersEntry, successCallback, failCallback);
    });
    // }

    //this.inizializeCollection(JSONStoreManager.loggedUsersEntry, successInternal, failCallback);
  }

  public getAdsList(successCallback: (adsList: any) => any, failCallback: () => any) {
     this.logManager.info("Getting Ads from JSONStore");
     // var successInternal = () => {
    
     /*
       if(this.adsList!=undefined){ 
         successCallback({ads_list: this.adsList});
        }
       else{
         */
        var self = this;
        if(this.ads!=undefined){
          successCallback({"ads_list":this.ads});
        }
        else{
          this.fileBackupService.restoreAdsList(function(ads){
            self.ads = ads;
            successCallback({"ads_list":self.ads});
          },function(){
              failCallback();
          });
        }

        /*
        this.lockStorage("getAdsListInternal",function(){
           self.getAdsListInternal(JSONStoreManager.adsListEntry, successCallback, failCallback);
        });*/
       //}

    //  this.inizializeCollection(JSONStoreManager.adsListEntry, successInternal, failCallback);
  }


  public getAdsRequestQueue(successCallback: (adsRequestQueue: any) => any, failCallback: () => any) {
    this.logManager.info("Getting AdsRequestQueue from JSONStore");
    if(this.adsRequestQueue!=undefined){
      successCallback( { adsRequestQueue : this.adsRequestQueue});
    }
    // }

   //  this.inizializeCollection(JSONStoreManager.adsRequestQueueEntry, successInternal, failCallback);
 }
  
  /**
   * returns a structure that represents the logged user
   * @param entry 
   * @param successCallback 
   * @param failCallback 
   */
  private async getLoggedUserInternal(entry, successCallback, failCallback) {
 
    console.log("inside lock getLoggedUserInternal: request number " + this.counterRequest);
    var options = {};
    console.log('accesso al jsonstore');
    WL.JSONStore.get(entry.key).findAll(options).then((arrayResults) => {
      var result = { exists: arrayResults.length > 0 };
      if (result.exists) {
        var value = arrayResults[0].json;
        value.data = JSON.parse(value.data);
        result['value'] = value;
        result['username'] = value.username;
        result['password'] = value.password;
        result['passwordHash'] = value.passwordHash;
        result['lastSessionRefresh'] = value.lastSessionRefresh;
        (value.data) ? result['sn'] = value.data.sn : result['sn'] = "";
        (value.data) ? result['givenName'] = value.data.givenName: result['givenName'] = "";
      } else result = undefined;
      successCallback(result);
      this.unlockStorage("getLoggedUserInternal");
     
    }).fail((err) => {
      this.logManager.error("Error retrieving user from JSONStore");
      console.error(err);
      console.error(JSON.stringify(err));
      var self = this;
      this.unlockStorage("getLoggedUserInternal");

      WL.JSONStore.destroy()
      .then(function() {
        self.initializeAllCollections(() => {
         

         /* self.fileBackupService.restorePlate(() => {
            let key = "license_plate";
            self.storeSecureDataField({key: key, dataType: 'string'}, self.fileBackupService.plate, () => {
              console.log("backup plate restored successfully.");
            }, (err) => {
              console.log(err);
            });
            
          }, () => {}); */

          self.fileBackupService.restoreAdsList(() => {
            self.storeAdsList(self.fileBackupService.ads, () => {
              console.log("backup ads restored successfully.");
            }, (err) => {
              console.log(err);
            });
            
          }, () => {});

          if (failCallback != null)
            failCallback(err);
        });
         
      })
      .fail(function(errorObject) {
        if (failCallback != null)
          failCallback(err);
        console.log("Impossibile cancellare il jsonStore: " + errorObject);
      });

     
     
    });
  }





  private async storeLoggedUserInternal(entry, username: string, password: string, passwordHash: string, dataParam, successCallback: () => any, failCallback: (errorMessage: string) => any) {

    console.log("inside lock storeLoggedUserInternal request number " + this.counterRequest);
     console.log('accesso al jsonstore');
    var storedCollection = WL.JSONStore.get(entry.key);
    storedCollection.findAll().then((data) => {
      var newValue = { username: username, password: password, passwordHash: passwordHash, data: JSON.stringify(dataParam) };
      if (data.length > 0) {
        var id = data[0]._id;
        var risultato = {
          _id: id,
          json: newValue
        };
        var options = {
          exact: false,
          limit: 1
        };
        storedCollection.replace(risultato, options).then(() => {
          this.logManager.info("Successfully stored logged user : " + username  + " into JSONStore");
          if (successCallback != undefined)
            successCallback();
          this.unlockStorage("storeLoggedUserInternal");
        }).fail((err) => {
          this.logManager.error("Failed to replace field logged user : " + username + " into JSONStore");
          if (failCallback != undefined)
            failCallback(err);
          this.unlockStorage("storeLoggedUserInternal");
        });
      } else {
        storedCollection.add(newValue).then(() => {
          this.logManager.info("Successfully stored logged user : " + username + " into JSONStore");
          if (successCallback != undefined)
            successCallback();
          this.unlockStorage("storeLoggedUserInternal");
        }).fail((err) => {
          this.logManager.error("Failed to insert new logged user : " + username + " into JSONStore");
          if (failCallback != undefined)
            failCallback(err);
          this.unlockStorage("storeLoggedUserInternal");
        });
      }
    }).fail((err) => {
      this.logManager.error("Error finding logged user : " + username + " from JSONStore");
      if (failCallback != undefined)
        failCallback("Impossibile memorizzare utente loggato: " + err);
      this.unlockStorage("storeLoggedUserInternal");
    });
  }

 
  private async storeSecureDataFieldInternalFile(entry, fieldName: {key: string, dataType:string}, value, successCallback, failCallback) {
        this.secureDataForFile = {allData: this.form};
        this.fileBackupService.backupSecureData( JSON.stringify(this.secureDataForFile));
        this.unlockStorage("storeListFilterInternal");
        successCallback();
  }


  private async storeListFilterInternal(entry, fieldName: {key: string, dataType:string}, value, successCallback, failCallback) {

    console.log("inside lock storeListFilterInternal request number " + this.counterRequest);
     console.log('accesso al jsonstore');
    var storedCollection = WL.JSONStore.get(entry.key);
    storedCollection.find({ fieldName: fieldName.key }).then((data) => {
      if (fieldName.dataType == 'json') {
        value = JSON.stringify(value);
      }

      var newValue = { fieldName: fieldName.key, value: value };

      if (data.length > 0) {
        var id = data[0]._id;
        var oldIndexes = data[0].json.value.indexes;
        if(oldIndexes instanceof Array) {
          oldIndexes.push(newValue.value.indexes);
        }
        else {
          oldIndexes = [oldIndexes, newValue.value.indexes];
        }
        //oldIndexes.push(newValue.value.indexes);
        newValue.value.indexes = oldIndexes;
        
        var risultato = {
          _id: id,
          json: newValue
        };
       

        var options = {
          exact: false,
          limit: 1
        };
        storedCollection.replace(risultato, options).then(() => {
          this.logManager.info("Successfully stored field (REPLACE): " + fieldName.key + " into JSONStore");
          if (successCallback != undefined)
            successCallback(value);
          this.unlockStorage("storeListFilterInternal");
        }).fail(() => {
          this.logManager.error("Failed storing field : " + fieldName.key + " into JSONStore");
          if (failCallback != undefined)
            failCallback();
          this.unlockStorage("storeListFilterInternal");
        });
      } else {
        storedCollection.add(newValue).then(() => {
          this.logManager.info("Successfully stored field (ADD): " + fieldName.key + " into JSONStore");
          if (successCallback != undefined)
            successCallback(value);
          this.unlockStorage("storeListFilterInternal");
        }).fail(() => {
          this.logManager.error("Failed storing field : " + fieldName.key + " into JSONStore");
          if (failCallback != undefined)
            failCallback();
          this.unlockStorage("storeListFilterInternal");
        });
      }
    }).fail(() => {
      this.logManager.error("Error fielding field: " + fieldName.key + " from JSONStore");
        console.error(JSON.stringify(value));
      if (failCallback != undefined)
        failCallback();
      this.unlockStorage("storeListFilterInternal");
    });
  }

  private inizializeCollection(map_key, successCallback, failCallback) {
    if (WL.JSONStore.get(map_key.key)==undefined) {
      this.logManager.info("Initializing JSONStore Collection: " + map_key.key);
      var collections = {};

      collections[map_key.key] = {};
      collections[map_key.key].searchFields = map_key.fields;

      var options = {
        password: Password,
        localKeyGen: false,
        clear: false,
        pbkdf2Iterations: 5
      }

      WL.JSONStore.init(collections, options)
        .then(() => {
          this.logManager.info("Successfully Initialized JSONStore Collection: " + map_key.key);
          initializedCollections.push(map_key.key);
          if (successCallback != undefined)
            successCallback();
        })
        .fail((errorObject) => {
          this.logManager.error("Initialization Failed JSONStore Collection: " + map_key.key);
          if (failCallback != undefined)
            failCallback();
        });
    } else {
      if (successCallback != undefined)
        successCallback();
    }
  };

  /*
  private updateAdsListInternal(ads: Ads[], successCallback: (data: string) => any, failCallback: (err: string) => any) {

            this.storeAdsList(ads, () => {
                console.log("updateAds: Data Stored Successfully");
                successCallback("OK");
            }, () => {
                console.log("updateAds: Error while storing data");
                failCallback("error");
            });
 
      }
*/

  lockStorage(methodName: string,successCallback) {
    if(this.flag === true) {
      console.log("JSONSTORE: Storage locked by " + methodName+" : request number"+this.counterRequest);
      this.flag = false;
      successCallback();
    }
    else {
      this.callbackArray.push({methodName: methodName, callback: successCallback});
     // setTimeout(() => { this.lockStorage(methodName,successCallback); }, 100);
    }
  }

  unlockStorage(methodName) {
    console.log("Storage unlocked by " + methodName + ": request number " + this.counterRequest);
    this.counterRequest++;
    this.flag = true;

    var nextOperationMethod;
    var nextOperationCallback;

    if(this.callbackArray.length>0){
      nextOperationCallback = this.callbackArray[0].callback;
      nextOperationMethod = this.callbackArray[0].methodName;
      this.callbackArray.splice(0,1);
    }

    if(nextOperationMethod)
      this.lockStorage(nextOperationMethod,nextOperationCallback);

  }



}