import { Injectable } from '@angular/core';

declare var WL;

@Injectable()
export class LogManager {
    
    static INFO : string = "INFO"; 
    static DEBUG : string = "DEBUG";
    static WARNING : string = "WARNING";
    static ERROR : string = "ERROR";
    public logWildCard: boolean = true;
    public logIsCollaudo: boolean = true;
    public userLogin: string = "";


    logs : Array<{m: string, l: string, d:string }> = [];

   public info(message : string, objectMsg?, logWildCard?,actionInvokeValue?, userLogin?){
      this.logInternal(message, LogManager.INFO, objectMsg, logWildCard,actionInvokeValue, userLogin);
    }

    public debug(message : string, objectMsg?, logWildCard?,actionInvokeValue?, userLogin?){
      this.logInternal(message, LogManager.DEBUG, objectMsg, logWildCard, actionInvokeValue, userLogin);
    }

    public warning(message : string, objectMsg?, logWildCard?,actionInvokeValue?, userLogin?){
      this.logInternal(message, LogManager.WARNING, objectMsg, logWildCard, actionInvokeValue, userLogin);
    }

    public error(message : string, objectMsg?, logWildCard?,actionInvokeValue?, userLogin?){
      this.logInternal(message, LogManager.ERROR, objectMsg, logWildCard, actionInvokeValue, userLogin);
    }

    private logInternal(message : string, logLevel : string, objectMsg?, logWildCard?, actionInvokeValue?, userLogin?){
      var now : string = this.getNow();
      var logMessage = {m: message, l: logLevel, d:now };
      this.logs.push(logMessage);
      this.logMessageInConsole(logMessage, objectMsg);
     if (!actionInvokeValue){
        actionInvokeValue = "Debug";
     }

       if (!userLogin){
        actionInvokeValue = "Generico";
     }

      if (this.logIsCollaudo){
           this.logMessageInWorklight(logMessage, actionInvokeValue, userLogin);
      }
      else{
         if(logWildCard){
            this.logMessageInWorklight(logMessage, actionInvokeValue, userLogin);
         }
      }
       
     
    }

  private logMessageInWorklight(logMessage, actionInvokeValue, userLogin?){
      var stringMessage = this.logMessageToString(logMessage);
      try{
      if (logMessage.l == LogManager.INFO || logMessage.l == LogManager.DEBUG){
        WL.Logger.info(stringMessage);
     
       var logAdapter = {
         message :logMessage
       }
      
        WL.Analytics.log({actionInvoke: actionInvokeValue , 
                        message: JSON.stringify(logAdapter),
                        date: this.getNow(),
                        user: userLogin,
                        app: 'PreventiviCliente',
                        time: this.GetTimeStringForLog()});
       
        WL.Analytics.send();
      }
      else if (logMessage.l == LogManager.WARNING)
        WL.Logger.warn(stringMessage);
      else if (logMessage.l == LogManager.ERROR)
        WL.Logger.error(stringMessage);
      } catch (err) { }
    }

    private logMessageInConsole(logMessage, objectMsg?){
      var stringMessage = this.logMessageToString(logMessage);
      if (logMessage.l == LogManager.INFO || logMessage.l == LogManager.DEBUG)
        console.log(stringMessage);
       else if (logMessage.l == LogManager.WARNING)
        console.warn(stringMessage);
      else if (logMessage.l == LogManager.ERROR)
        console.error(stringMessage);
      
        if (objectMsg)
          console.log(objectMsg);
    }
   
     private logMessageToString(logMessage){
      return logMessage.d + " - ["+logMessage.l+"] - "+logMessage.m;
    }

private GetTimeStringForLog() {
    var now = new Date();
    var hours = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();
    
    var retString = hours +":" + minute + ":" + seconds;
    
    return retString;
}



    private getNow(){
      var now = new Date();
      var day = this.formatDateField(now.getDate().toString(),2);
      var month = this.formatDateField((now.getMonth()+1).toString(), 2);
      var year = now.getFullYear().toString();
      var hour = this.formatDateField(now.getHours().toString(),2);
      var minutes = this.formatDateField(now.getMinutes().toString(),2);
      var seconds = this.formatDateField(now.getSeconds().toString(),2);
      var milli = this.formatDateField(now.getMilliseconds().toString(), 3);

     var retString = year + "-" +
    				  	month+ "-" +
    					day+ "T" + hour + ":" + minutes + ":" + seconds + ":"  +milli;
    

      return retString;
    }

      private formatDateField(stringField : string, zeros : number){
      var diffZeroes = zeros-stringField.length;
      for(var i = 0; i<diffZeroes; i++){
        stringField = "0"+stringField;
      }
      return stringField;
    }

}