import { Injectable } from '@angular/core';

// import { Logo_Hera_Acqua } from '../img64/logo_hera_acqua';
import { Ads } from './ads';
import { Ente } from './ente';
import * as moment from 'moment';
import { AdeguamentoCliente, AdeguamentoNecessarioCliente, VerbaleDiSopralluogo } from './verbale_di_sopralluogo';
import { NotaSopralluogo } from './nota_sopralluogo';


declare var imgExample: any;

@Injectable()
export class ModelAcqua {
    sezioneImg;

    constructor() {
    }

    getSxLogo(ads : Ads){
        return ads.Logo;
    }

        getAllData( beforeImg,img,afterImg,adempimentoAcqua,AdeguamentoNicchiaCaricoCliente,retroPDF){
            var retData = [];
            for(let item of beforeImg){
                retData.push(item);
            }
            for(let item of img){
                retData.push(item);
            }
             
            //if(img.length>0)
             if (false) // Debug
             {
                    retData.push(
                        { 
                                     table: {
                                        widths: ['*', 100],
                                        body: [
                                                [{
                                                   text:' ',
                                                    border: [ false, false, false, false]
                                                }, {
                                                    text:'',
                                                    border: [ false, false, false, false]
                                                }
                                            ]
                                        ]
                                        },
                                         pageBreak: 'after'
                                    
                                }
                    )
                }
            for(let item of afterImg){      
                retData.push(item);
            }
            
            for(let item of retroPDF){
                retData.push(item);
            }

            //if(AdeguamentoNicchiaCaricoCliente)
            for(let item of adempimentoAcqua){      
                retData.push(item);
            }

            
            return retData;
    }


      getSezioneImg(value){
        this.sezioneImg = [];


        if(value.dati.form.Img != " " && value.dati.form.Img != undefined && value.dati.form.Img.length>0 && value.dati.form.Img.length<4)        
            this.sezioneImg = [{
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*', '*'],

                            body: [
                                [
                                    {width:160,height:100,image: value.dati.form.Img[0]},
                                    {width:160,height:100,image: value.dati.form.Img[1]},
                                    {width:160,height:100,image: value.dati.form.Img[2]}
                                        
                                ]
                            ]
                        }
                    }
                ]

            if(value.dati.form.Img != " " && value.dati.form.Img != undefined && value.dati.form.Img.length>3 && value.dati.form.Img.length<7)        
                this.sezioneImg = [
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*', '*'],

                            body: [
                                [
                                    {width:160,height:100,image: value.dati.form.Img[0]},
                                    {width:160,height:100,image: value.dati.form.Img[1]},
                                    {width:160,height:100,image: value.dati.form.Img[2]}
                                        
                                ]
                            ]
                        }
                    },
                       {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*', '*'],

                            body: [
                                [
                                    {width:160,height:100,image: value.dati.form.Img[3]},
                                    {width:160,height:100,image: value.dati.form.Img[4]},
                                    {width:160,height:100,image: value.dati.form.Img[5]}
                                        
                                ]
                            ]
                        }
                    }
                    
                    ]
                    return this.sezioneImg;
													
    }

    public getTesProvDomDefinition(value): Promise<any> {
        var today = new Date();
        var month = today.getMonth() + 1;
        var sMonth = ""+month;
        var day = today.getDate()
        var sDay = ""+day;
        if(month<10) sMonth = '0'+month;
        if(day<10) sDay = '0'+day;

        var timeWrite = sDay + "/" + sMonth + "/" + (today.getFullYear());                
        var messaggio_data = "Letto, confermato e sottoscritto il: " + timeWrite;

        let vs:VerbaleDiSopralluogo = value.download.ads.VerbaleDiSopralluogo;
        
        // Tipo servizio
        var servizio;
        if(value.dati.form.Tlr==true)
            servizio = 'Servizio: Acqua [__]        fognatura [__]       Teleriscaldamento [ X ]';
        else if(value.dati.form.Acqua == true)
            servizio = 'Servizio: Acqua [ X ]       Fognatura [__]       Teleriscaldamento [__]' ;
        else
            servizio = 'Servizio: Acqua [__]       Fognatura [ X ]       Teleriscaldamento [__]';    

        
        // Descrizione lavoro
        var descrizione_lavoro = " ";

        if(value.dati.form.PN1 == true)
            descrizione_lavoro = "Descrizione del lavoro PN1 [ X ]      PM1 [__]      PR1 [__]"
        if(value.dati.form.PM1 == true)
            descrizione_lavoro = "Descrizione del lavoro PN1 [__]      PM1 [ X ]      PR1 [__]"
        if(value.dati.form.PR1 == true)
            descrizione_lavoro = "Descrizione del lavoro PN1 [__]      PM1 [__]      PR1 [ X ]"                        

        
        // Richieste aggiuntive
        let aggFlag = false;
        let note_prestazioni;
        
        
        
        var descrizioni_aggiuntive_aggregate = " ";
       
        var PN1 = "PN1 [__]";
        var PM1 = "PM1 [__]";  
        var PR1 = "PR1 [__]";              
        

        if(value.dati.form.show_comp[0]['tipo'] === true){
            PN1 = "PN1 [ X ]";
            aggFlag = true;
        }
            
        if(value.dati.form.show_comp[1]['tipo'] === true){
            PM1 = "PM1 [ X ]";
            aggFlag = true;
        }
            
        if(value.dati.form.show_comp[2]['tipo'] === true){
            PR1 = "PR1 [ X ]";
            aggFlag = true;
        }
                
        
        let checked = "[ X ]";
        let unchecked = "[__]";

        
        // Prestazioni correlate
        var prestazioni_correlate,prestazioni_correlate_chk,prestazioni_correlate_notes;
                
        if (vs.PrestazioniCorrelate?.length > 2){
            prestazioni_correlate = vs.PrestazioniCorrelate;
            prestazioni_correlate_chk = checked;
            prestazioni_correlate_notes = "Il richiedente la prestazione ha avanzato richiesta, sempre per lo stesso indirizzo di lavoro, di preventivo anche per altre prestazioni. Essendo le esecuzioni dei vari interventi correlate, con la presente nota si rende edotto il richiedente che il distributore potrà sospendere il computo dei tempi di esecuzione, ai fini del calcolo dei livelli specifici o generali di qualità commerciale, di ognuno dei singoli interventi, fintantoché il richiedente non abbia provveduto a trasmettere l’accettazione di tutti i preventivi tra loro correlati e non abbia eseguito i lavori da realizzarsi a sua cura ed ottenuto le concessioni, autorizzazioni o servitù di sua spettanza, dandone comunicazione al distributore, il tutto con le modalità e nei termini riportati nei preventivi medesimi.";
        } else {
            prestazioni_correlate = "____________________";
            prestazioni_correlate_chk = unchecked;
            prestazioni_correlate_notes = "";
        }
        

        var descrizioni_aggiuntive_check_txt = " Altre prestazioni per le quali il richiedente ha manifestato interesse           " + PN1 + " " + PM1 +  " " + PR1;
        let descrizioni_aggiuntive_check = "";
        
        if(aggFlag === true) {
            descrizioni_aggiuntive_check = checked + descrizioni_aggiuntive_check_txt;
            note_prestazioni = "Il cliente dovra' richiedere un preventivo per le “prestazioni aggiuntive” sopra indicate (il presente Verbale non costituisce richiesta). In assenza di richiesta di tale preventivo e quindi di sua accettazione l’esecuzione dei lavori relativa alla presente pratica non potrà essere eseguita.";
        }
        else {
            descrizioni_aggiuntive_check = unchecked + descrizioni_aggiuntive_check_txt;
            note_prestazioni = "";
        }


        // Adeguamenti a carico cliente
        let alloggiamento_non_esistente_check = (vs.AdeguamentoCaricoCliente === AdeguamentoCliente.DA_REALIZZARE)? checked : unchecked;
        let alloggiamento_adeguato_check = (vs.AdeguamentoCaricoCliente === AdeguamentoCliente.ADEGUATO)? checked : unchecked;
        let alloggiamento_non_adeguato_check = (vs.AdeguamentoCaricoCliente === AdeguamentoCliente.NON_ADEGUATO)? checked : unchecked;
            
        let alloggiamento_manca_sportello_check = (vs.AdeguamentiNecessariCliente?.includes(AdeguamentoNecessarioCliente.MANCA_SPORTELLO))? checked : unchecked;
        let alloggiamento_dimensioni_non_idonee_check = (vs.AdeguamentiNecessariCliente?.includes(AdeguamentoNecessarioCliente.DIMENSIONI_NON_IDONEE))? checked : unchecked;
        let alloggiamento_spessore_schiena_armadio_check = (vs.AdeguamentiNecessariCliente?.includes(AdeguamentoNecessarioCliente.SPESSORE_SCHIEMA_ARMADIO))? checked : unchecked;
        let alloggiamento_altro_check = (vs.AdeguamentiNecessariCliente?.includes(AdeguamentoNecessarioCliente.ALTRO))? checked : unchecked;
            




        // if(value.dati.form.Descrizione_Aggiuntiva[0].tipo == "PN1")
        //     descrizioni_aggiuntive_check = "[ X ] RICHIESTE AGGIUNTIVE DEL CLIENTE IN SEDE DI SOPRALLUOGO  PN1 [ X ]  PM1 [__]  PR1 [__]";

        // if(value.dati.form.Descrizione_Aggiuntiva[0].tipo == "PM1")
        //     descrizioni_aggiuntive_check = "[ X ] RICHIESTE AGGIUNTIVE DEL CLIENTE IN SEDE DI SOPRALLUOGO  PN1 [__]  PM1 [ X ]  PR1 [__]";

        // if(value.dati.form.Descrizione_Aggiuntiva[0].tipo == "PR1")
        //     descrizioni_aggiuntive_check = "[ X ] RICHIESTE AGGIUNTIVE DEL CLIENTE IN SEDE DI SOPRALLUOGO  PN1 [__]  PM1 [__]  PR1 [ X ]"; 


        if(value.dati.form.show_comp[0].descrizione !== undefined 
            && value.dati.form.show_comp[0].descrizione !== ''
            && value.dati.form.show_comp[0].descrizione !== ' ')
            

            descrizioni_aggiuntive_aggregate += value.dati.form.show_comp[0].descrizione;


        if(value.dati.form.show_comp[1].descrizione !== undefined 
            && value.dati.form.show_comp[1].descrizione !== ''
            && value.dati.form.show_comp[1].descrizione !== ' ')
            
            if(descrizioni_aggiuntive_aggregate.length > 1){
                descrizioni_aggiuntive_aggregate += " / ";
            }
            descrizioni_aggiuntive_aggregate += value.dati.form.show_comp[1].descrizione;

        if(value.dati.form.show_comp[2].descrizione !== undefined 
            && value.dati.form.show_comp[2].descrizione !== ''
            && value.dati.form.show_comp[2].descrizione !== ' ')
            if(descrizioni_aggiuntive_aggregate.length > 1){
                descrizioni_aggiuntive_aggregate += " / ";
            }

            descrizioni_aggiuntive_aggregate += value.dati.form.show_comp[2].descrizione;

        
        var max_caratteri = 1222250;    
        if(descrizioni_aggiuntive_aggregate.length > max_caratteri)
            descrizioni_aggiuntive_aggregate = descrizioni_aggiuntive_aggregate.substr(0, max_caratteri);    

     

        

        // Pratica sospesa e Pratica annullata    
        var ZS05, ZS06, ZS03, ZS08, N33, N29, N30, N31, N32, N21, N28;
        var messaggio_ZS03 = "";
        var messaggio_ZS05 = "(*) Per le sospensioni ZS05 e ZS06 Il cliente (o suo incaricato) ha 8 (otto) giorni solari di tempo dalla data di sopralluogo per comunicare eventuali variazioni alle informazioni definite durante il sopralluogo, trascorsi i quali al netto di eventuali proroghe il preventivo verrà chiuso con Esito Negativo.";
        var messaggio_ZS06 = "(*) Per le sospensioni ZS05 e ZS06 Il cliente (o suo incaricato) ha 8 (otto) giorni solari di tempo dalla data di sopralluogo per comunicare eventuali variazioni alle informazioni definite durante il sopralluogo, trascorsi i quali al netto di eventuali proroghe il preventivo verrà chiuso con Esito Negativo.";
        var messaggio_ZS08 = "(**) Per la ZS08 trascorsi 30(trenta) giorni solari dalla data del sopralluogo, al netto di eventuali proroghe in mancanza di consegna dell'autorizzazione da parte del cliente, il preventivo verrà chiuso con Esito Negativo.";
        var messaggio_N29  = "(***) Il Cliente si dichiara interessato a ricevere un preventivo/progetto di estensione/potenziamento della rete";
        var messaggio_N29_N30_N32 = "Gli esiti negativi N29,N30 e N32 specificano le motivazioni del rifiuto del Gestore all'accesso alla rete di distribuzione nel caso non sia possibile eseguire i lavori richiesti.";


        ZS05 = "[__] ZS05 Attesa dati tecnici (*)";
        ZS06 = "[__] ZS06 Decisione punto fornitura (*)"; 
        ZS08 = "[__] ZS08 Mancanza autorizzazione terzi (**)";
            
        N33 = "[__] N33 Revoca del richiedente";
        N29 = "[__] N29 Rete non disponibile (***)";
        N30 = "[__] N30 Non tecnicamente fattibile";
        N31 = "[__] N31 Impianto cliente non a norma";
        N32 = "[__] N32 Prest. non comp. con la richiesta";
        N21 = "[__] N21 Cliente assente ODL con appuntamento";
        N28 = "[__] N28 Cliente finale/indirizzo sconosciuto";

        switch(value.dati.form.Pratica_Annullata)
        {
            case "N33":
                N33 = "[ X ] N33 Revoca del richiedente";
            break;
            case "N29":
                N29 = "[ X ] N29 Rete non disponibile (***)";
            break;
            case "N30":
                N30 = "[ X ] N30 Non tecnicamente fattibile";
            break;
            case "N31":
                N31 = "[ X ] N31 Impianto cliente non a norma";
            break;      
            case "N32":
                N32 = "[ X ] N32 Prest. non comp. con la richiesta";
            break;
            case "N21":
                N21 = "[ X ] N21 Cliente assente ODL con appuntamento";
            break;
            case "N28":
                N28 = "[ X ] N28 Cliente finale/indirizzo sconosciuto";
            break;                        
        }        

        var pratica_sospesa_per_label = "[__] PRATICA SOSPESA PER:";
        var pratica_con_esito_negativo_label = "[__] PRATICA CON ESITO NEGATIVO PER:";
                                               
        if(value.dati.form.Paratica_Sospesa != " ") pratica_sospesa_per_label = "[ X ] PRATICA SOSPESA PER:";
        if(value.dati.form.Pratica_Annullata != " ") pratica_con_esito_negativo_label = "[ X ] PRATICA CON ESITO NEGATIVO PER:";

        // Consegnato allegato tecnico
        var allegato_tecnico;
        if(value.dati.form.Consegnato_Allegato_tecnico == true)
            allegato_tecnico = "[ X ] consegnato allegato tecnico (le misure sono da intendersi utili interne e si riferiscono agli ingombri dei soli impianti GESTORE)";
        else 
            allegato_tecnico = "[__] consegnato allegato tecnico (le misure sono da intendersi utili interne e si riferiscono agli ingombri dei soli impianti GESTORE)";   

        // Atti autorizzativi
        var atti_autorizzativi = "La stima dei tempi previsti per l’ottenimento degli atti autorizzativi necessari per l’esecuzione del lavoro richiesto sono riportati nel seguito del presente Verbale nella \"Tabella indicativa dei tempi necessari per l’ottenimento autorizzazione dagli Enti elencati\"";
        if (value.dati.form.Seleziona_Ente === Ente.NO_ENTE){
            atti_autorizzativi = ""; 
        }
        else {
            if((value.dati.form.Seleziona_Ente != undefined) && (value.dati.form.Seleziona_Ente != " ") && (value.dati.form.Seleziona_Ente != ""))
            {
                atti_autorizzativi = "Il gestore, ricevuta accettazione del preventivo, trasmetterà richiesta per i seguenti Atti Autorizzativi " + " \n"  + value.dati.form.Seleziona_Ente  + "\n "+atti_autorizzativi;
            }
            else
            {
                atti_autorizzativi = "Il gestore, ricevuta accettazione del preventivo, trasmetterà richiesta per i seguenti Atti Autorizzativi \n [__] (compilazione automatica mettendo flag anche multiplo su lista tabella \n "+atti_autorizzativi;
            }
        }


        // Cause mancato rispetto fascia oraria
        var causa_mancato_rispetto = "[__] Verificato che l'inizio effettivo della prestazione o sopralluogo non rispetta la fascia di puntualità, dichiaro che il mancato rispetto dell'appuntamento è causato da:\n [__] cause di forze maggiore        [__] cause imputabili al cliente       [__] cause imputabili al gestore" ;

        if(value.dati.form.App_Verificata_Assenza_Forza_Maggiore == true)
        {
            causa_mancato_rispetto = "[ X ] Verificato che l'inizio effettivo della prestazione o sopralluogo non rispetta la fascia di puntualità, dichiaro che il mancato rispetto dell'appuntamento è causato da:\n [ X ] cause di forze maggiore        [__] cause imputabili al cliente       [__] cause imputabili al gestore" ;            
        }

        if(value.dati.form.App_Verificata_Assenza_Cliente == true)
        {
            causa_mancato_rispetto = "[ X ] Verificato che l'inizio effettivo della prestazione o sopralluogo non rispetta la fascia di puntualità, dichiaro che il mancato rispetto dell'appuntamento è causato da:\n [__] cause di forze maggiore        [ X ] cause imputabili al cliente       [__] cause imputabili al gestore" ;            
        }        

        if(value.dati.form.App_Verificata_Assenza_Gestore == true)
        {
            causa_mancato_rispetto = "[ X ] Verificato che l'inizio effettivo della prestazione o sopralluogo non rispetta la fascia di puntualità, dichiaro che il mancato rispetto dell'appuntamento è causato da:\n [__] cause di forze maggiore        [__] cause imputabili al cliente        [ X ] cause imputabili al gestore" ;            
        }        

        //DATE
        var AppConcordatoData,AppConcordatoOraInizio,AppConcordatoOraFine;
        if (value.download.ads.ChiaveTestoStd === "ZES0"){
            AppConcordatoData="________";
            AppConcordatoOraInizio = "________";
            AppConcordatoOraFine = "________";
            
        }
        else {

            AppConcordatoData = value.dati.form.App_Concordato_Data;
            if(AppConcordatoData.indexOf("T") > -1){
                AppConcordatoData = moment(AppConcordatoData).format("DD-MM-YYYY");
                if(AppConcordatoData.includes("Invalid")){
                    AppConcordatoData = "";
                }
            }
            AppConcordatoOraInizio = value.dati.form.App_Concordato_Ora_Inizio;
            AppConcordatoOraFine = value.dati.form.App_Concordato_Ora_Fine;
        }
        
        var AppAnticipatoData = value.dati.form.App_Anticipato_Data;    
            if(AppAnticipatoData.indexOf("T") > -1){
                AppAnticipatoData = moment(AppAnticipatoData).format("DD-MM-YYYY");
                if(AppAnticipatoData.includes("Invalid")){
                    AppAnticipatoData = "";
                }
            }
        

        var DataRichiesta = value.download.ads.DataRichiesta?.replaceAll("-","/");
        
        
        // Descrizioni e note
        var descrizione_e_note = '';
        
        if((value.dati.form.Note_dinamiche?.length > 0)
            || ((value.dati.form.Descrizione_note != undefined) && (value.dati.form.Descrizione_note != " ") && (value.dati.form.Descrizione_note != "")))
        {
            var max_caratteri = 1222250;
            descrizione_e_note =  value.dati.form.Descrizione_note;
            if (value.dati.form.Note_dinamiche){
                for (let note of value.dati.form.Note_dinamiche){
                  if (note.checked){
                    descrizione_e_note += '\n'+ NotaSopralluogo.interpolateNoteText(note) ;
                  }
                }
              }

            if(descrizione_e_note.length > max_caratteri){
                descrizione_e_note = descrizione_e_note.substr(0, max_caratteri);   
            }
                
        }


        var errorMsg = '';
        var boldMsg = false;

        switch(value.dati.form.Paratica_Sospesa)
        {
            case "ZS05":
                ZS05 = "[ X ] ZS05 Attesa dati tecnici (*)";
                descrizione_e_note = " " + descrizione_e_note;
                errorMsg = messaggio_ZS05;
            break;
            case "ZS06":
                ZS06 = "[ X ] ZS06 Decisione punto fornitura (*)";
                descrizione_e_note = " " + descrizione_e_note;
                errorMsg = messaggio_ZS06;
            break;            
            case "ZS03":
                //ZS03 = "[ X ] ZS03 Causa carenza rete";
                 descrizione_e_note = " " + descrizione_e_note + "\n"+ messaggio_ZS03;
            break;
            case "ZS08":
                ZS08 = "[ X ] ZS08 Mancanza autorizzazione terzi (**)";
                errorMsg = messaggio_ZS08;
            break;                                    
        }

        // 2020_B001 aggiornamento 06/04/2021
        if(value.dati.form.Pratica_Annullata == "N29"){
            errorMsg = messaggio_N29 + "\n" + messaggio_N29_N30_N32;
            boldMsg = true;
        }

        if((value.dati.form.Pratica_Annullata == "N30")||(value.dati.form.Pratica_Annullata == "N32")){
            errorMsg = messaggio_N29_N30_N32;
            boldMsg = true;
        }

          
        var telefono_del_tecnico ="";  
        var tel ="";        
        if(value.dati.form.Telefono_Tecnico.length > 2)                    
        {
            tel = "Tel."
            telefono_del_tecnico = value.dati.form.Telefono_Tecnico;            
        }   

        var Disegno_Schema_TMP = value.dati.form.Disegno_Schema;
        //TODO: revert png?
        if(Disegno_Schema_TMP == undefined || Disegno_Schema_TMP == "" || Disegno_Schema_TMP == " ")
            Disegno_Schema_TMP = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAgMAAAD90d5fAAAADFBMVEX///8AAADc2c////83BRtzAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EJCw8FEzlIdVEAAACkSURBVHja7c0xAQAADAIg+5fWDHt2QQHSB5FIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCSSuwFEH6zWB0bbYAAAAABJRU5ErkJggg=="

        var check_necessario = '[__] necessario';
        var check_non_necessario = '[ X ] non necessario';
        var check_consegnato = '[__] consegnato documento tecnico'; 

        if(value.dati.form.Consegnato_Allegato_tecnico){
            check_consegnato = '[ X ] consegnato documento tecnico'; 
        }

        if(value.dati.form.AdeguamentoNicchiaCaricoCliente){
            check_necessario = '[ X ] necessario';
            check_non_necessario = '[__] non necessario';
        }

        var esecuzioneAnticipataLabel = 'Con il consenso del richiedente,il sopralluogo viene eseguito con orario di inizio anticipato rispetto alla fascia oraria di appuntamento prefissata ';
        if(value.dati.form.ConsensoAppuntamentoAnticipatoCliente && value.dati.form.ConsensoAppuntamentoAnticipatoCliente != " "){
            esecuzioneAnticipataLabel = '[ X ] '+esecuzioneAnticipataLabel; 
        }
        else{
            esecuzioneAnticipataLabel = '[__] '+esecuzioneAnticipataLabel; 
        }

        var assenzaClienteLabel;
        
        if(value.dati.form.App_Verificata_Assenza_Data && value.dati.form.App_Verificata_Assenza_Data != " "){

            if( value.dati.form.App_Verificata_Assenza_Data.indexOf("-")>0){
                var dataAssenzaTmp = value.dati.form.App_Verificata_Assenza_Data.split("-");
                value.dati.form.App_Verificata_Assenza_Data = dataAssenzaTmp[2] + "/" +  dataAssenzaTmp[1] + "/"+ dataAssenzaTmp[0];
            }

            assenzaClienteLabel = '[ X ] Verificata assenza dal luogo di appuntamento del Cliente in Data: ' 
        }
        else{
            assenzaClienteLabel = '[__] Verificata assenza dal luogo di appuntamento del Cliente in Data: ' 
        }
       

        return new Promise((resolve, reject) => {


        var imgBoxSize = 320;

        var errNote = { style: 'margin_Top_Font_Little', text:[ {text: errorMsg, bold:true}]};    
        var descrNote = { 
            style: 'margin_Top_Font_Little',
            table: {
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                widths: ["*"],
                body:[ 
                    [{text:"DESCRIZIONE E NOTE\n", bold:true}], 
                    [{text:descrizione_e_note, decoration: 'underline', bold:true }]
                ]
            }
        };               

        var infoSchemi = "Si intendono dimensioni minime, al netto della coibentazione.";
        infoSchemi += ((vs.AdeguamentoCaricoCliente === AdeguamentoCliente.DA_REALIZZARE) || (vs.AdeguamentoCaricoCliente === AdeguamentoCliente.NON_ADEGUATO))? 
            "\n\nNel caso realizzazione e/o modifica alloggiamento vedere in allegato al presente Verbale il modulo “Indicazioni per la realizzazione alloggiamento contatori“":
            "";

        var beforeImg = [                    
                            {
                    
                                table: {
                                    widths: ['*', '*'],
                                    body: [
                                        [ 
                                        {
                                            image: this.getSxLogo(value.download.ads),
                                            width: 130,
                                        }, 
                                        {
                                            width: '*',
                                            alignment: 'center',
                                            stack: [
                                                {
                                                    style: 'h1',
                                                    text: 'Verbale di sopralluogo' , fontSize: 10, bold: true
                                                },
                                                {
                                                    style: 'h2',
                                                    text: ' '
                                                },
                                                {
                                                    style: 'h2',
                                                    text: servizio , fontSize: 8
                                                },                            
                                            ]
                                        }
                                        ]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function(line) { return line === 2; },
                                    vLineWidth: function() { return 0; },
                                },
                            },

                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [90, '*', 55 ,40, 50 ,'*'],
                                    body: [
                                        [{text: 'Codice di rintracciabilità ', bold: true , border:[false, false, false, false]} , 
                                        {text: ""+value.dati.form.Rintracciabilita, border:[false, false, false, true]},
                                        {text: 'Data richiesta ', bold: true , border:[false, false, false, false]} , 
                                        {text: ""+DataRichiesta, border:[false, false, false, true]},
                                        {text: 'Avviso/Odl', border:[false, false, false, false]},
                                        {text: ""+value.dati.form.Avviso, border:[false, false, false, true]}] 
                                        ]
                                },
                            },

                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [90, 120 , '*' ],
                                    body: [
                                        [{text: 'DATI DEL RICHIEDENTE: ', bold: true , border:[false, false, false, false]},
                                        {text: 'Ragione sociale/Cognome Nome',  border:[false, false, false, false] },
                                        {text: (value.dati.form.Ragione_Sociale != undefined && value.dati.form.Ragione_Sociale != ' ') ? value.dati.form.Ragione_Sociale : value.dati.form.Cognome_Richiedente+' '+value.dati.form.Nome_Richiedente, border:[false, false, false, true]},
                                        ]
                                    ]
                                },
                            },		
                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [60, 50, 20 ,70 , 30 ,'*'],
                                    body: [
                                        [{text: 'Codice cliente ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Codice_Cliente, border:[false, false, false, true]},
                                            {text: 'Tel. ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Telefono_Richiedente, border:[false, false, false, true]},
                                            {text: 'E-Mail', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Email, border:[false, false, false, true]}
                                        ]
                                    ]
                                },                                                        
                            },
                            {text: '  DATI DELL\'INCARICATO PRESENTE AL SOPRALLUOGO', fontSize: 7, bold: true, style:'margin_top_mini'},
                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [40, '*', 30 ,'*' , 30 ,'*'],
                                    body: [
                                        [{text: 'Cognome ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Cognome_Incaricato, border:[false, false, false, true]},
                                            {text: 'Nome ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Nome_Incaricato, border:[false, false, false, true]},
                                            {text: 'Tel. ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Telefono_Incaricato, border:[false, false, false, true]}
                                        ]
                                    ]
                                },

                            },
                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [80, 40, '*' , 30 ,'*'],
                                    body: [
                                        [{text: 'INDIRIZZO LAVORO: ', bold: true , border:[false, false, false, false]},       
                                            {text: 'Via/P.zza ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Via_Lavoro, border:[false, false, false, true]},
                                            {text: 'Comune ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Comune_Lavoro, border:[false, false, false, true]}
                                        ]
                                    ]
                                },
                            },	
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        [descrizione_lavoro]
                                    ]
                                },
                                layout: 'noBorders'
                            },	
                            {
                                style: 'tableExample2',
                                alignment: 'center',
                                table: {
                                    widths: ['*', '*','*','*',10, 40,30,'*',70,30],
                                    body: [

                                        [{text: 'MATRICOLE CONTATORI ESISTENTI',colSpan:'3', fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_2,fontSize: 5},
                                        {text: 'CONTATORI RICHIESTI - ACQUA',colSpan:'4', fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_2,fontSize: 5},
                                        {text: 'SCARICHI RICHIESTI - FOGNATURA',colSpan:'3', fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_2,fontSize: 5},
                                        ],

                                        [{text: value.dati.form.Matricola_1_vecchio_contatore, fontSize: 5},
                                        {text: value.dati.form.Matricola_2_vecchio_contatore,fontSize: 5},
                                        {text: value.dati.form.Matricola_3_vecchio_contatore,fontSize: 5},
                                            {text:'Calibro'},
                                            {text: 'N°'}, 
                                            {text:'Portata (mc/h)'}, 
                                            {text:'Uso'}, 
                                            {text:'Tipo (N o B)'},
                                            {text: 'Portata (mc/h) - Uleq (mq)'},
                                            {text:'Uso'}
                                        ],
                                        
                                        [{text: value.dati.form.Matricola_1_vecchio_contatore_2,fontSize: 5},
                                        {text: value.dati.form.Matricola_2_vecchio_contatore_2,fontSize: 5},
                                        {text: value.dati.form.Matricola_3_vecchio_contatore_2,fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore,fontSize: 5}, 
                                        {text: value.dati.form.Portata_Contatore,fontSize: 5}, 
                                        {text: value.dati.form.Uso_Contatore,fontSize: 5},
                                        {text: value.dati.form.Tipo_Fogna,fontSize: 5},
                                        {text: value.dati.form.Portata_Fogna,fontSize: 5}, 
                                        {text: value.dati.form.Uso_Fogna,fontSize: 5},
                                        ],
                                        
                                        [{text: value.dati.form.Matricola_1_vecchio_contatore_3,fontSize: 5},
                                        {text: value.dati.form.Matricola_2_vecchio_contatore_3,fontSize: 5},
                                        {text: value.dati.form.Matricola_3_vecchio_contatore_3,fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Portata_Contatore_2,fontSize: 5}, 
                                        {text: value.dati.form.Uso_Contatore_2,fontSize: 5},
                                        {text: value.dati.form.Tipo_Fogna_2,fontSize: 5},
                                        {text: value.dati.form.Portata_Fogna_2,fontSize: 5}, 
                                        {text: value.dati.form.Uso_Fogna_2,fontSize: 5},
                                        ],
                                        
                                        [{text: value.dati.form.Matricola_1_vecchio_contatore_4,fontSize: 5},
                                        {text: value.dati.form.Matricola_2_vecchio_contatore_4,fontSize: 5},
                                        {text: value.dati.form.Matricola_3_vecchio_contatore_4,fontSize: 5},
                                        {text: value.dati.form.Calibro_Contatore_3,fontSize: 5},
                                        {text: value.dati.form.Numero_Contatore_3,fontSize: 5}, 
                                        {text: value.dati.form.Portata_Contatore_3,fontSize: 5},
                                        {text: value.dati.form.Uso_Contatore_3,fontSize: 5},                                                                    
                                        {text: value.dati.form.Tipo_Fogna_3,fontSize: 5},
                                        {text: value.dati.form.Portata_Fogna_3,fontSize: 5}, 
                                        {text: value.dati.form.Uso_Fogna_3,fontSize: 5}
                                        ]
                                        
                                    ]
                                }
                            
                            },
                            {
                                style: 'font_size_8',
                                table: {
                                    widths: [190, 40, '*', 30 ,'*' , 30 ,'*'],
                                    body: [
                                        [ 
                                            {text: 'DATI DEL TECNICO INCARICATO DAL GESTORE',  bold: true, border:[false, false, false, false]},
                                            {text: 'Cognome ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Cognome_Tecnico, border:[false, false, false, true]},
                                            {text: 'Nome ', bold: true , border:[false, false, false, false]},
                                            {text: value.dati.form.Nome_Tecnico, border:[false, false, false, true]},
                                            {text: 'tel', bold: true , border:[false, false, false, false]},                                                                 
                                            {text: telefono_del_tecnico, border:[false, false, false, true]}
                                        ]
                                    ]
                                },
                            },	
                                {
                                style: 'tableExample',
                                table: {
                                    widths: ['*', '*','*','*'],
                                    body: [
                                        [
                                            {bold: true, text: pratica_sospesa_per_label, fontSize: 6, colSpan:2,border:[true, true, false, false]}, 
                                            {text: '',border:[false, true, false, false]},
                                            {bold: true, text: pratica_con_esito_negativo_label, fontSize: 6, colSpan:2,border:[true, true, true, false]},  
                                            {text: '',border:[false, false, false, true]}
                                        ],
                                        [
                                            {text: ZS05, style:'checkbox',border:[true, false, false, false]},
                                            {text: ZS08, style:'checkbox',border:[false, false, false, false]},
                                            {text: N21, style:'checkbox',border:[true, false, true, false], colSpan:2},
                                            {text: '',border:[false, false, false, true]}
                                        ]
                                        ,
                                        [     
                                            {text: ZS06, style:'checkbox',border:[true, false, false, false]},
                                            {text: '',border:[false, false, false, false]},
                                            {text: N29, style:'checkbox',border:[true, false, false, false]},
                                            {text: N32, style:'checkbox',border:[false, false, true, false]},
                                        ]
                                        ,
                                        [
                                            {text: '', style:'checkbox',border:[true, false, false, true]},
                                            {text: '', style:'checkbox',border:[false, false, false, true]},
                                            {text: N30, style:'checkbox',border:[true, false, false, true]},
                                            {text: N33, style:'checkbox',border:[false, false, true, true]}
                                        ]
                                    ]
                                }
                            },
                            errNote,
                            {
                                layout: "noBorders",
                                table: {
                                    body: [
                                        [
                                            {
                                                fontSize: 8,
                                                text: prestazioni_correlate_chk + " PRESTAZIONI CORRELATE                         Avviso / OdL "+prestazioni_correlate
                                            }
                                        ],
                                        [
                                            {
                                                bold: true,
                                                fontSize: 6,
                                                text: prestazioni_correlate_notes,
                                            }
                                        ]
                                    ]
                                }
                            },

                            // BOX Adempimenti
                            {
                                text: 'ADEMPIMENTI A CARICO DEL CLIENTE:', 
                                fontSize: 8, 
                                bold:true
                            },
                            {
                                table: {
                                    body: [
                                        [
                                            {
                                                bold: true,
                                                border: [
                                                    true,
                                                    true,
                                                    false,
                                                    false
                                                ],
                                                //colSpan: 2,
                                                fontSize: 8,
                                                text: "REALIZZAZIONE ALLOGGIAMENTO MISURATORI"
                                            },
                                            {
                                                bold: true,
                                                border: [
                                                    true,
                                                    true,
                                                    true,
                                                    false
                                                ],
                                                fontSize: 8,
                                                text: "DESCRIZIONE E SCHEMA INDICATIVO OPERE DA ESEGUIRE"
                                            }
                                        ]
                                    ],
                                    widths: [
                                        181,
                                        imgBoxSize
                                    ]
                                }
                            },
                            {
                                style: "",
                                table: {
                                    "body": [
                                        [
                                            {
                                                "border": [
                                                    true,
                                                    true,
                                                    false,
                                                    false
                                                ],
                                                "colSpan": 3,
                                                "table": {
                                                    "body": [
                                                        [
                                                            {
                                                                "bold": true,
                                                                "border": [
                                                                    false,
                                                                    false,
                                                                    false,
                                                                    false
                                                                ],
                                                                "fontSize": 6,
                                                                "text": alloggiamento_non_esistente_check + " Alloggiamento non esistente: da realizzare "
                                                            }
                                                        ],
                                                        [
                                                            {
                                                                "bold": true,
                                                                "border": [
                                                                    false,
                                                                    false,
                                                                    false,
                                                                    false
                                                                ],
                                                                "fontSize": 6,
                                                                "text": alloggiamento_adeguato_check + " Alloggiamento esistente adeguato "
                                                            }
                                                        ],
                                                        [
                                                            {
                                                                "bold": true,
                                                                "border": [
                                                                    false,
                                                                    false,
                                                                    false,
                                                                    false
                                                                ],
                                                                "fontSize": 6,
                                                                "text": alloggiamento_non_adeguato_check + " Alloggiamento esistente non adeguato: "
                                                            }
                                                        ],
                                                        [
                                                            {
                                                                "border": [
                                                                    false,
                                                                    false,
                                                                    false,
                                                                    false
                                                                ],
                                                                "fontSize": 6,
                                                                "table": {
                                                                    "body": [
                                                                        [
                                                                            {
                                                                                "border": [
                                                                                    false,
                                                                                    false,
                                                                                    false,
                                                                                    false
                                                                                ],
                                                                                "fontSize": 6,
                                                                                "text": alloggiamento_manca_sportello_check + " Manca sportello "
                                                                            }
                                                                        ],
                                                                        [
                                                                            {
                                                                                "border": [
                                                                                    false,
                                                                                    false,
                                                                                    false,
                                                                                    false
                                                                                ],
                                                                                "fontSize": 6,
                                                                                "text": alloggiamento_dimensioni_non_idonee_check + " Dimensioni non idonee "
                                                                            }
                                                                        ],
                                                                        [
                                                                            {
                                                                                "border": [
                                                                                    false,
                                                                                    false,
                                                                                    false,
                                                                                    false
                                                                                ],
                                                                                "fontSize": 6,
                                                                                "text": alloggiamento_spessore_schiena_armadio_check + " Spessore schiena armadio "
                                                                            }
                                                                        ],
                                                                        [
                                                                            {
                                                                                "border": [
                                                                                    false,
                                                                                    false,
                                                                                    false,
                                                                                    false
                                                                                ],
                                                                                "fontSize": 6,
                                                                                "text": alloggiamento_altro_check + " Altro (vedi note)"
                                                                            }
                                                                        ]
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    ]
                                                    
                                                },
                                                
                                            },
                                            {
                                                "text":""
                                            },
                                            {
                                                "text":""
                                            },
                                            {
                                                "alignment": "center",
                                                "fit": [
                                                    imgBoxSize,
                                                    200
                                                ],
                                                "image": Disegno_Schema_TMP,
                                                "rowSpan": 4
                                            }
                                        ],
                                        [
                                            {
                                                "bold":true,
                                                "border": [
                                                    true,
                                                    true,
                                                    false,
                                                    false
                                                ],
                                                "colSpan": 3,
                                                "fontSize": 8,
                                                "text": "DIMENSIONI INTERNE ALLOGGIAMENTO",
                                                "width": 65
                                            },
                                            {
                                                "text":"",
                                                
                                                
                                            },
                                            {
                                                "text":""
                                            },
                                            {
                                                "text":""
                                            }
                                        ],
                                        [
                                            {
                                                "border": [
                                                    true,
                                                    true,
                                                    false,
                                                    false
                                                ],
                                                //"colSpan": 2,
                                                "image": imgExample.getDisegno2(),
                                                "width": 50
                                            },
                                            
                                            {
                                                "border": [false,true,false,false],
                                                "table": {
                                                    "body": [
                                                        [
                                                            {
                                                                "border": [false,false,false,false],
                                                                "colSpan": 3,
                                                                "fontSize": 6,
                                                                "text": "dimensioni interne pozzetto"
                                                            },
                                                            {   "text": "" },
                                                            {   "text": "" }
                                                        ],
                                                        [{fontSize:6,text:'L (cm)'},{fontSize:6,text: 'P (cm)'}, {fontSize:6,text:'H (cm)'}],
                                                        [{fontSize:8,text: value.dati.form.L_Opere_1_IMG2}, {fontSize:8,text: value.dati.form.P_Opere_1_IMG2}, { fontSize:8,text: value.dati.form.H_Opere_1_IMG2}],
                                                        
                                                    ],
                                                    "widths": [
                                                        25,
                                                        25,
                                                        25
                                                    ]
                                                },
                                                
                                            },
                                            {
                                                "border": [false,true,true,false],
                                                "text": ""
                                            },
                                            {   "text": "" },
                                        ],

                                        [
                                            {
                                                "border": [true,false,false,true],
                                                "image": imgExample.getDisegno1(),
                                                "width": 50
                                            },
                                            {
                                                "border": [false,false,false,true],
                                                "table": {
                                                    "body": [
                                                        [
                                                            {
                                                                "border": [false,false,false,false],
                                                                "colSpan": 5,
                                                                "fontSize": 6,
                                                                "text": "Dimensioni interne armadio o nicchia a parete"
                                                            },
                                                            {   "text": "" },
                                                            {   "text": "" },
                                                            {   "text": "" },
                                                            {   "text": "" },
                                                        ],
                                                        [ {fontSize:6,text:'L(cm)'},{fontSize:6, text:'P(cm)'}, {fontSize:6,text:'H(cm)'},{fontSize:6,text:'A(cm)'}, {fontSize:6,text:'S(cm)'}],
                                                        [{fontSize:8,text: value.dati.form.L_Opere_1_IMG1}, {fontSize:8,text: value.dati.form.P_Opere_1_IMG1}, {fontSize:8,text: value.dati.form.H_Opere_1_IMG1}, {fontSize:8,text: value.dati.form.A_Opere_1_IMG1}, {fontSize:8,text: 6}],                                                                                    
                                                        [
                                                            {
                                                                "bold": true,
                                                                "border": [false,false,false,false],
                                                                "colSpan": 5,
                                                                "fontSize": 6,
                                                                "text": infoSchemi
                                                            }
                                                        ]
                                                    ],
                                                    "widths": [
                                                        17,
                                                        17,
                                                        17,
                                                        17,
                                                        17
                                                    ]
                                                }
                                                
                                            },
                                            {
                                                "border": [false,false,false,true],
                                                "text": ""
                                            },
                                            {
                                                "border": [false,false,false,true],
                                                "text": ""
                                            }
                                        ]
                                    ],
                                    "widths": [
                                        45,
                                        20,
                                        98,
                                        imgBoxSize
                                    ]
                                }
                            },
                            descrNote,
                            
                                
                            ];
                                
        
        
        var adempimentiGestoreLabel = {style: 'margin_Top_Font_Little', text: 'ADEMPIMENTI A CARICO DEL GESTORE: ATTI AUTORIZZATIVI NECESSARI PER L\'ESECUZIONE DELLA PRESTAZIONE ',bold: true};
        var adempimentiGestoreSection = (atti_autorizzativi.length == 0)?
                {
                    style: 'tableExample',
                        table: {
                            widths: ['*', '*','*'],
                            headerRows: 1,
                            body: [
                            [{colSpan: 3,text: ' \n \n', style: 'no_border'}],
            
                            ]
                        },
                } : {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*','*'],
                            headerRows: 1,
                            body: [
                                [{colSpan: 3,text: atti_autorizzativi, style: 'no_border'}],
            
                            ]
                        },
            
                    };	
                
        var afterImg = [
                            { 
                                table: {
                                    body: [
                                        [{text: descrizioni_aggiuntive_check, style: 'margin_Top_Font_Little', bold: true}],
                                        [{bold: true, fontSize: 6,text: note_prestazioni}],
                                        [{bold: true, fontSize: 6,text: 'Note: ' + descrizioni_aggiuntive_aggregate}]

                                    ]
                                },
                                layout: 'noBorders'

                            },
                            
                            { 
                                table: {
                                   body: [
                                        [{ text:' ', border: [ false, false, false, false]}]
                                   ]
                                },
                                pageBreak: 'after'
                               
                           },
                            
                            // {style: 'margin_Top_Font_Little', text: allegato_tecnico},
                            
                            adempimentiGestoreLabel,
                            adempimentiGestoreSection,
                            
                            
                            {style: 'margin_Top_Font_Little', text: 'IL CLIENTE (O SUO INCARICATO) DICHIARA: ',bold: true},                
                    
                    
                    
                            {
                                style: 'tableExample',
                                table: {
                                    widths: ['*', '*','*'],
                                    headerRows: 1,
                                    body: [
                                        [{colSpan: 3,text: [
                                            {fontSize:7,text:'1) di aver letto e di'},
                                            {fontSize:7,text:" accettare le condizioni riportate sul presente verbale di sopralluogo in tutte le parti \n", decoration: 'underline',bold:true}, 
                                            {fontSize:7,text:'2) di predisporre '}, 
                                            {fontSize:7,text:'quanto indicato per l\'accettazione e l\'esecuzione dei lavori, dandone comunicazione secondo le indicazioni riportate nel preventivo', decoration: 'underline',bold:true} 
                                        ], style: 'no_border'}],
                                    ]
                                },
                    
                            },	
                            {                                                        
                                alignment: 'center',
                                table: {
                                    widths:['*', '*', '*'],                                                            
                                    body: [
                                        [                                                            
                                        { text: ' ' , fontSize: 7, border:[true, true,true, false]},                                                                
                                        { text: 'Firma del cliente o suo incaricato' , fontSize: 7,border:[true, true,true, false]},                                                                
                                        { text: 'Firma del tecnico o incaricato GESTORE' , fontSize: 7,border:[true, true,true, false]},
                                        ]
                                    ]
                                }
                            },

                            {
                                alignment: 'center',
                                table: {
                                    widths:[ '*', '*', '*'],
                                    
                                    body: [
                                        [{ text: messaggio_data , fontSize: 7, border:[true, false,true, true]},
                                            
                                        (value.signatureUser === undefined ?
                                            { text: '……………………………………………', width: 100, height: 25 ,border:[true, false,true, true]} : {border:[true, false,true, true], image: value.signatureUser, width: 100, height: 25 }
                                        )       ,                                                               
                                        (value.signatureOperator === undefined ?
                                            { text: '……………………………………………', width: 100, height: 25,border:[true, false,true, true] } : { border:[true, false,true, true],image: value.signatureOperator, width: 100, height: 25 }
                                        ),                                                        
                                                                                                    
                                        ]
                                    ]
                                }
                            },		
                    
                            {
                                bold:true, 
                                fontSize: 8, text:"DATI APPUNTAMENTO / ASSENZA CLIENTE NELLA FASCIA DI PUNTUALITA' / MANCATO RISPETTO FASCIA DI PUNTUALITA'"
                            },	
                    
                            {
                                
                                table: {
                                    widths:['*'],
                                    
                                    body: [
                                        [
                                            {fontSize: 8,border: [true,true,true, false],text:'APPUNTAMENTO CONCORDATO              Data:' +  AppConcordatoData + ' (fascia puntualità)         Ora inizio:' +  AppConcordatoOraInizio +'               Ora fine:' + AppConcordatoOraFine + '\n    (data e fascia puntualità)'  }
                                        ],
                                    ]
                                }
                                
                            },

                            //Appuntamento anticipato
                            (value.download.ads.ChiaveTestoStd == "ZAP3" ?
                            {
                                
                                table: {
                                    widths:[ '*'],
                                    
                                    body: [
                                        [{fontSize: 8, border: [true,true,true, false],text:'APPUNTAMENTO ANTICIPATO                 Data:' +  AppAnticipatoData + ' (fascia puntualità)        Ora inizio:' +  value.dati.form.App_Anticipato_Ora_Inizio + '          Ora fine:' + value.dati.form.App_Anticipato_Ora_Fine+'\n    (proposto dal gestore con consenso del cliente)'  } 
                                    ],
                                    ]
                                }
                            }
                            : {}
                            ),
                            (value.download.ads.ChiaveTestoStd == "ZAP3" ?
                                {
                                table: {
                                    widths:[ '*'],
                                    
                                    body: [
                                        [{fontSize: 7, border: [true,false,true, false], text: 'Con il consenso del richiedente, preliminarmente alla data inizialmente fissata, l’appuntamento per il sopralluogo è stato anticipato alla data e nella fascia oraria indicata”. '}
                                    ],
                                ]
                                }
                                }
                                : {}	
                            ),
                            //Fine appuntamento anticipato
                            
                            {
                                
                                table: {
                                    widths:['*'],
                                    
                                    body: [
                                        [
                                            {fontSize: 7,border: [true,false,true, false],text:' Inizio effettivo prestazione o sopralluogo          Data: ' +  value.dati.form.App_Effettivo_Data+ '                Ora: ' +  value.dati.form.App_Effettivo_Ora_Inizio+"    "+esecuzioneAnticipataLabel }]
                                    ]
                                }
                                
                            },	
                            {
                                
                                table: {
                                    widths:['*'],
                                    
                                    body: [
                                        [
                                            {fontSize: 6,border: [true,false,true, false],text:causa_mancato_rispetto}]
                                    ]
                                }
                                
                            },	
                            {
                                
                                table: {
                                    widths:['*'],
                                    
                                    body: [
                                        [
                                            {fontSize:6, border: [true,false,true, false],text:assenzaClienteLabel+'       ' + value.dati.form.App_Verificata_Assenza_Data + ' Ora:  ' + value.dati.form.App_Verificata_Assenza_Ora + "  dichiaro l\' impedimento ad eseguire l\' attività." }]
                                    ]
                                }
                                
                            },	
                    
                            
                            {                                                        
                                alignment: 'center',
                                table: {
                                    widths:['*', '*', '*'],                                                            
                                    body: [                                                         
                                        [                                                            
                                        { text: ' ' , fontSize: 7, border:[true, true,false, false]},                                                                
                                        { text: 'Firma del cliente o suo incaricato' , fontSize: 7, border:[true, true,true, false]},                                                                
                                        { text: 'Firma del tecnico o incaricato del GESTORE' , fontSize: 7, border:[false, true,true, false]},
                                        ]
                                    ]
                                }
                            },

                            {
                                alignment: 'center',
                                table: {
                                    widths:['*', '*', '*'],
                                    
                                    body: [
                                        [                                                            
                                        { text: messaggio_data , fontSize: 7, border:[true, false,false, true]},
                                        (value.dati.form.App_Firma_Cliente === undefined || value.dati.form.App_Firma_Cliente === " " ?
                                            { text: '……………………………………………', width: 100, height: 25 ,border:[true, false,true, true]} : {border:[true, false,true, true], image: value.dati.form.App_Firma_Cliente, width: 100, height: 25 }
                                        ),
                                        (value.dati.form.App_Firma_Tecnico === undefined || value.dati.form.App_Firma_Tecnico === " " ?
                                            { text: '……………………………………………', width: 100, height: 25 ,border:[true, false,true, true]} : { border:[false, false,true, true],image: value.dati.form.App_Firma_Tecnico, width: 100, height: 25 }
                                        ),
                                        
                                        
                                        ]
                                    ]
                                }
                            }
                ];



        // SECTION 2
        var retroAcqua = [];
        for (let img of VerbaleDiSopralluogo.GetRetroImg(value.download.ads)){
            retroAcqua.push(
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*'],

                        body: [
                            [
                                {width:500,height:750, border: [ false, false, false, false],image: img /* value.dati.form.RetroPDF*/}
                            ]
                        ]
                    }
                }
            );
        }
                
        // SECTION 3
        var adempimentoAcqua = [];
        for (let img of VerbaleDiSopralluogo.GetAlloggiamentoImg(value.download.ads)){
            adempimentoAcqua.push(
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*'],
        
                        body: [
                            [
                                {width:500,height:750, border: [ false, false, false, false],image: img /* value.dati.form.AdeguamentoPDF */}
                            ]
                        ]
                    }
                }
            );
        }
            
 
        //var pdfContent = value;

            var docDefinition = {
                pageSize: 'A4',
                content: [
                                {
                        style: 'MarginTop',
                        layout: 'noBorders',
                        table: {
                            widths: ['*'],
                            body: [
                                [
                                    {
                                        stack: this.getAllData(beforeImg,this.getSezioneImg(value),afterImg,adempimentoAcqua,value.dati.form.AdeguamentoNicchiaCaricoCliente && !value.dati.form.Fognatura,retroAcqua)
                           
                                                }
                                                
                                            ]
                                        ]
                                    }
                             },
	    
                ],

                styles: {
                    tableExample: {
                        fontSize: 8,
                        margin: [0, 2, 0, 0]
                    },
                    tableExample2: {
                        fontSize: 6,
                        margin: [0, 2, 0, 0]
                    },                    
            		margintop:{
            		    margin: [0, 25, 0, 0]
            		},
            		margin_top_mini:{
            		    margin: [0, 2, 0, 0]
            		},                    
            		margintop2:{
            		    margin: [0, 5, 0, 0]
            		}, 
            		margin_Top_Font_Little:{
            		    margin: [0, 3, 0, 0],
            		    fontSize: 7
            		},
            		MarginTop:{
            		    margin: [0, -44, 0, 0]
            		},
            		checkbox:{
            		     fontSize: 6
            		},
            		font_size_8:{
            		     fontSize: 8,
                         margin: [-5, 0, 0, 0]
            		},
                    no_margin_left:{
                        margin: [-2, 0, 0, 0]
                    }                    

                },
                defaultStyle: {
                    // alignment: 'justify'
                }	                


            }

            resolve(docDefinition);
        });


    }                


}
