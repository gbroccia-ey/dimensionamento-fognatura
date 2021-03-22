import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class WidgetManager {

    static StandardToastDuration: number = 3000;
    static LongToastDuration: number = 5000;
    static UfastDuration: number = 600;
    static DefaultLoadingMessage: string = "Loading...";

    constructor(
        public loading: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    }
    
    /**
     * wraps the "todo" function execution with a loader that is automatically dismissed in case of error. 
     * it is not dismissed after the todo execution in order to avoid double-dismiss errors
     * @param title 
     * @param todo 
     */
    public doWithLoader(title: string, todo: (loading: Loading) => any) {
        let loader = this.loading.create({
            content: title,
            dismissOnPageChange: true
            //enableBackdropDismiss
        });
        loader.present().then(() => {
            todo(loader);
        }, (err) => {
            try {
                loader.dismiss();
            } catch (Exception) {
                //TODO logging
            }
        });
    }

    public doWithDefaultLoader(todo: (loading: Loading) => any) {
        this.doWithLoader(WidgetManager.DefaultLoadingMessage, todo);
    }
    
    /**
     * shows an alert with a title
     * @param message 
     */
    public showAlert(message: string) {
        this.showAlertWithTitle(undefined, message);
    }

    public showToastStandardDuration(message: string) {
        this.showToastWithDuration(message, WidgetManager.StandardToastDuration);
    }

    public showToastLongDuration(message: string) {
        this.showToastWithDuration(message, WidgetManager.LongToastDuration);
    }

    public showToastUFastDuration(message: string) {
        this.showToastWithDuration(message, WidgetManager.UfastDuration);
    }

    public showToastWithDuration(message: string, durationMilli: number) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: durationMilli
        });
        toast.present();
    }

    public loader(title: string): Loading {
        let loader = this.loading.create({
            content: title,
        });
        loader.present();

        return loader;
    }
    
    /**
     * shows the default loader widget
     */
    public defaultLoader(): Loading {
        return this.loader(WidgetManager.DefaultLoadingMessage);
    }

    public showAlertWithTitle(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: () => { }
                }
            ]
        });
        alert.present();
    }
    
    /**
     * shows the standard alert for offline situations
     */
    public showAlertOffline() {
        let alert = this.alertCtrl.create({
            title: "Connessione Assente",
            message: "Il device è offline. Questa funzionalit\u00E0 non pu\u00D2 essere usata",
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        alert.dismiss();
                    }
                }
            ]
        });
        alert.present();
    }
}