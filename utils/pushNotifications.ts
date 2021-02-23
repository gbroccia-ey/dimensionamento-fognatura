declare var WL;
declare var cordova;

import { Utils } from '../utils/utils';

export class PushNotifications {

    static GLOBAL_PUSH_NAME: string = "myPush";
    static GLOBAL_PUSH_ADAPTER: string = "pushNotificationManagerAdapter";
    static GLOBAL_PUSH_EVENT: string = "PushHeratechEventSource";

    

    static setBadge(number:any){
        if(Utils.getDeviceEnvironment()==="Android"){
            cordova.exec(function(){
                console.log("OK");
            }, function(error){
                console.log("KO: "+error);
            }, "BadgeUtils", "setBadge", [number]);	
        }else{
            WL.Badge.setNumber(number);
        }
    }

    static pushNotificationReceived(props, payload) {
        
        console.log("pushNotificationReceived");
        WL.SimpleDialog.show("Push Notifications","We got push\n" +
        "Custom: " + payload.custom + "\n" +
        "Long Message: " +payload.longMsg, [ {
            text : 'Close',
            handler : function() {}
        }]);
        PushNotifications.setBadge(0);
        
    }

    static doSubscribe(username) {
        
        WL.Client.login("PushAppRealm",{
            onSuccess: function() {
                var PushRealmChallengeHandler = WL.Client.createChallengeHandler("PushAppRealm");
                PushRealmChallengeHandler.submitLoginForm("/j_security_check", {parameters: {j_username:username, j_password:"fake"}}, function(response) {PushRealmChallengeHandler.handleChallenge(response); PushRealmChallengeHandler.submitSuccess();})
                


                if (WL.Client.Push) {
                    WL.Client.Push.registerEventSourceCallback(
                        PushNotifications.GLOBAL_PUSH_NAME, 
                        PushNotifications.GLOBAL_PUSH_ADAPTER, 
                        PushNotifications.GLOBAL_PUSH_EVENT, 
                            PushNotifications.pushNotificationReceived);
                    var	isSubscribed = WL.Client.Push.isSubscribed(PushNotifications.GLOBAL_PUSH_NAME);
                    if(isSubscribed){
                        console.log("WL.Client.Push.onReadyToSubscribe... Initialized! ");
                    }else{
                        console.log("WL.Client.Push.onReadyToSubscribe... Not Initialized!");
                        if(WL.Client.Push.isPushSupported()){
                            console.log("WL.Client.Push.onReadyToSubscribe... Initializing! ");
                            try{
                                WL.Client.Push.subscribe(PushNotifications.GLOBAL_PUSH_NAME, {
                                    onSuccess: function doSubscribeSuccess() {
                                        console.log("WL.Client.Push.onReadyToSubscribe... Initialized! ");
                                        
                                    },
                                    onFailure: function doSubscribeFailure(error) {
                                        console.log("WL.Client.Push.onReadyToSubscribe... Initialization Failed! "+JSON.stringify(error));
                                    }
                                });
                            }catch(err){ 
                                console.log(err);
                            }
                            
                                    
                        }else{
                            console.log("WL.Client.Push.onReadyToSubscribe... Not Supported!");
                        }
                        
                            
                    }
                }
                else{
                    console.log("WL.Client.Push.onReadyToSubscribe... Not enabled!");
                }


            }
        });
        

            console.log("Set Up pushNotification");
                
            
        }
        

    static doUnsubscribe(callback: () => any) {
        console.log("doUnsubscribe");
        if(WL.Client.Push && WL.Client.Push.isPushSupported()){
            WL.Client.Push.unsubscribe(PushNotifications.GLOBAL_PUSH_NAME, {
                onSuccess: function doUnsubscribeSuccess() {
                    console.log("doUnsubscribeSuccess");
                    if(callback){
                        callback();	
                    }
                    
                },
                onFailure: function doUnsubscribeFailure() {
                    console.log("doUnsubscribeFailure");
                    if(callback){
                        callback();
                    }
                }
            });
        }else{
            console.log("push not supported");
        }
    }
}