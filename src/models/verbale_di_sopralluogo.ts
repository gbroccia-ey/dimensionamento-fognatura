import { Ads } from './ads';
import { EnteType } from './ente';
import { NotaSopralluogo, NoteItem } from './nota_sopralluogo';

declare var imgExample;

export enum AdeguamentoCliente{
    NONE = -1,
    DA_REALIZZARE = 1,
    ADEGUATO = 2,
    NON_ADEGUATO = 3,
}

export enum AdeguamentoNecessarioCliente{
    NONE = -1,
    MANCA_SPORTELLO = 1,
    DIMENSIONI_NON_IDONEE = 2,
    SPESSORE_SCHIEMA_ARMADIO = 3,
    ALTRO = 4
}

export class VerbaleDiSopralluogo {

    
    show_comp = [];
    descrizione = [];  
    
    // Tipo servizio
    Acqua: boolean = false;
    Fognatura: boolean = false;
    Gas: boolean = false;
    Energia_Elettrica: boolean = false;
    Tlr : boolean = false;
    
    // Codici
    Rintracciabilita: string = "";
    Avviso: string= "";
    
    // Dati richiedente
    Cognome_Richiedente: string= "";
    Nome_Richiedente: string= "";
    Codice_Cliente: string= "";
    Telefono_Richiedente: string= "";
    Email: string= "";
    Ragione_Sociale: string = "";

    // Dati incaricato
    Cognome_Incaricato: string= "";
    Nome_Incaricato: string= "";
    Telefono_Incaricato: string= "";
    
    // Indirizzo lavoro
    Via_Lavoro: string= "";
    Comune_Lavoro: string= "";
    
    // Descrizione lavoro
    PN1: boolean = false;
    PM1: boolean = false;
    PR1: boolean = false;
    Note_Lavoro: string= "";
    
    // Tipo lavoro
    Lavoro_Semplice: boolean = false;
    Lavoro_Complesso: boolean = false;
    
    // Contatori esistenti
    Matricola_1_vecchio_contatore: string= "";
    Matricola_2_vecchio_contatore: string= "";
    Matricola_3_vecchio_contatore: string= "";  
    
    Matricola_1_vecchio_contatore_2: string= "";
    Matricola_2_vecchio_contatore_2: string= "";
    Matricola_3_vecchio_contatore_2: string= "";
    
    Matricola_1_vecchio_contatore_3: string= "";
    Matricola_2_vecchio_contatore_3: string= "";
    Matricola_3_vecchio_contatore_3: string= "";    
    
    Matricola_1_vecchio_contatore_4: string= "";
    Matricola_2_vecchio_contatore_4: string= "";
    Matricola_3_vecchio_contatore_4: string= "";   
    
    // Contatori richiesti
    Calibro_Contatore: string= "";
    Numero_Contatore: string= "";
    Portata_Contatore: string= "";
    Uso_Contatore: string= "";  
    
    Calibro_Contatore_2: string= "";
    Numero_Contatore_2: string= "";
    Portata_Contatore_2: string= "";
    Uso_Contatore_2: string= "";
    
    Calibro_Contatore_3: string= "";
    Numero_Contatore_3: string= "";
    Portata_Contatore_3: string= "";
    Uso_Contatore_3: string= "";  
    
    
    Potenza_Richiesta_Contatore: string= "";
    Potenza_Fornita_Contatore: string= "";
    Variante_Fasi: string = "";

    Potenza_Richiesta_Contatore_2: string= "";
    Potenza_Fornita_Contatore_2: string= "";
    Variante_Fasi_2: string = "";

    Potenza_Richiesta_Contatore_3: string= "";
    Potenza_Fornita_Contatore_3: string= "";
    Variante_Fasi_3: string = "";

    // Fognatura
    Tipo_Fogna: string= "";
    Portata_Fogna: string= "";
    Uso_Fogna: string= "";
    
    Tipo_Fogna_2: string= "";
    Portata_Fogna_2: string= "";
    Uso_Fogna_2: string= "";
    
    Tipo_Fogna_3: string= "";
    Portata_Fogna_3: string= "";
    Uso_Fogna_3: string= "";
    
    // Dati tecnico
    Cognome_Tecnico: string= "";
    Nome_Tecnico: string= "";
    Telefono_Tecnico: string = "";
    
    // Dati pratica
    Paratica_Sospesa: string= "";
    Pratica_Annullata: string= "";
    
    // Richieste aggiuntive
    Richiesta_Aggiuntiva: boolean = false;
    Descrizione_Aggiuntiva: string[];
    Consegnato_Allegato_tecnico: boolean = false;
    // Autorizzazioni cliente
    Nascondi_Numero: boolean;
    Autorizzazione_Zona_Vincolata: boolean = true;
    Autorizzazione_Strade: boolean = true;
    Autorizzazione_Comune: boolean = true;
    Autorizzazioni_Altro: boolean = true;
    Autorizzazioni_Altro_Note: string= "";
    
    // Adempimenti Hera
    Seleziona_Ente: string= "";
    Tipo_Ente: EnteType = EnteType.NO_ENTE;
    Adempimenti_Altro: boolean = false;
    Adempimenti_Altro_Note: string= "";
    Adempimenti_Altro_Stima: string= "";
    
    // Dati schema indicativo
    Servizio_Opere_1_IMG1: string= "";
    H_Opere_1_IMG1: string= "";
    L_Opere_1_IMG1: string= "";
    P_Opere_1_IMG1: string= "";
    A_Opere_1_IMG1: string= "";
    Servizio_Opere_2_IMG1: string= "";
    H_Opere_2_IMG1: string= "";
    L_Opere_2_IMG1: string= "";
    P_Opere_2_IMG1: string= "";
    A_Opere_2_IMG1: string= "";
    Servizio_Opere_3_IMG1: string= "";
    H_Opere_3_IMG1: string= "";
    L_Opere_3_IMG1: string= "";
    P_Opere_3_IMG1: string= "";
    A_Opere_3_IMG1: string= "";
    
    Servizio_Opere_1_IMG2: string= "";
    L_Opere_1_IMG2: string= "";
    P_Opere_1_IMG2: string= "";
    H_Opere_1_IMG2: string= "";
    Servizio_Opere_2_IMG2: string= "";
    L_Opere_2_IMG2: string= "";
    P_Opere_2_IMG2: string= "";
    H_Opere_2_IMG2: string= "";
    Servizio_Opere_3_IMG2: string= "";
    L_Opere_3_IMG2: string= "";
    P_Opere_3_IMG2: string= "";
    H_Opere_3_IMG2: string= "";
    
    // Dati fascia di puntualità
    App_Concordato_Data: string= "";
    App_Concordato_Ora_Inizio: string= "";
    App_Concordato_Ora_Fine: string= "";
    
    App_Anticipato_Data: string= "";
    App_Anticipato_Ora_Inizio: string= "";
    App_Anticipato_Ora_Fine: string= "";
    
    App_Effettivo_Data: string= "";
    App_Effettivo_Ora_Inizio: string= "";
    
    App_Verificata_Assenza: boolean;
    App_Verificata_Assenza_Data: string= "";
    App_Verificata_Assenza_Ora: string= "";
    App_Verificata_Assenza_Verificato: boolean;
    App_Verificata_Assenza_Forza_Maggiore: boolean;
    App_Verificata_Assenza_Cliente: boolean;
    App_Verificata_Assenza_Gestore: boolean;
    App_Verificata_Assenza_Letto_in_Data: string= "";
    App_Firma_Cliente: string= "";
    App_Firma_Tecnico: string= "";
    App_Firma_Cliente2: string= "";
    App_Firma_Tecnico2: string= "";  
    Letto_in_Data: string= "";
    Descrizione_note: string= "";
    TipoVerbale: string= "";
    NoteProgettuali: string= "";
    NoteEsecutive: string= "";
    Calibro_Contatore_4: string= "";
    Calibro_Contatore_5: string= "";
    Calibro_Contatore_6: string= "";
    Sopralluogo_Terminato: boolean;
    TICA: string= "";

    //DATI DOPPI PER RENAMING?
    A11: string = "";
    A12: string = "";
    A13: string = "";
    AltroNote: string = "";
    AltroTempiStimati: string = "";
    AppuntamentoAnticipatoData: string = "";
    AppuntamentoAnticipatoOraFine : string = "";
    AppuntamentoAnticipatoOraInizio : string = "";
    AppuntamentoConcordatoData : string = "";
    AppuntamentoConcordatoOraFine : string = "";
    AppuntamentoConcordatoOraInizio : string = "";
    AssenzaClienteData : string = "";
    AssenzaClienteOra : string = "";

    BarratoLavoro :string = "";

    CAPLavoro : string = "";

    CausaAppuntamentoMancato : string = "";

    CausaPraticaAnnullata;
    CausaPraticaSospesa;

    CivicoLavoro : string = "";
    CodiceClienteRichiedente : string = "";
    CodiceRintracciabilita : string = "";
    CognomeIncaricato : string = "";
    CognomeRichiedente : string = "";
    CognomeTecnicoReferente : string = "";
    ConsegnatoAllegatoTecnico : boolean = false;
    ContatoriRichiestAcquaUso1 : string = "";
    ContatoriRichiestiAcquaCalibro1 : string = "";
    ContatoriRichiestiAcquaCalibro2 : string = "";
    ContatoriRichiestiAcquaCalibro3 : string = "";
    ContatoriRichiestiAcquaNumero1 : string = "";
    ContatoriRichiestiAcquaNumero2 : string = "";
    ContatoriRichiestiAcquaNumero3 : string = "";
    ContatoriRichiestiAcquaPortata1 : string = "";
    ContatoriRichiestiAcquaPortata2 : string = "";
    ContatoriRichiestiAcquaPortata3 : string = "";
    ContatoriRichiestiAcquaUso2 : string = "";
    ContatoriRichiestiAcquaUso3 : string = "";
    ContatoriRichiestiFognaPortataRichiesta1 : string = "";
    ContatoriRichiestiFognaPortataRichiesta2 : string = "";
    ContatoriRichiestiFognaPortataRichiesta3 : string = "";
    ContatoriRichiestiFognaTipo1 : string = "";
    ContatoriRichiestiFognaTipo2 : string = "";
    ContatoriRichiestiFognaTipo3 : string = "";
    ContatoriRichiestiFognaUso1 : string = "";
    ContatoriRichiestiFognaUso2 : string = "";
    ContatoriRichiestiFognaUso3 : string = "";
    ContatoriRichiestiGasEECalibro1 : string = "";
    ContatoriRichiestiGasEECalibro2 : string = "";
    ContatoriRichiestiGasEECalibro3 : string = "";
    ContatoriRichiestiGasEENumero1 : string = "";
    ContatoriRichiestiGasEENumero2 : string = "";
    ContatoriRichiestiGasEENumero3 : string = "";
    ContatoriRichiestiGasEEPotenzaFornita1 : string = "";
    ContatoriRichiestiGasEEPotenzaFornita2 : string = "";
    ContatoriRichiestiGasEEPotenzaFornita3 : string = "";
    ContatoriRichiestiGasEEPotenzaRichiesta1 : string = "";
    ContatoriRichiestiGasEEPotenzaRichiesta2 : string = "";
    ContatoriRichiestiGasEEPotenzaRichiesta3 : string = "";
    ContatoriRichiestiGasEEUso1 : string = "";
    ContatoriRichiestiGasEEUso2 : string = "";
    ContatoriRichiestiGasEEUso3 : string = "";

    DescrizioneLavoro : string = "";

    EmailRichiedente : string = "";

   // File : this.pdfBase64,
    NomeFile : string = "";

    FirmaClienteAppuntamento : string = "";
    FirmaTecnicoAppuntamento : string = "";

    H11 : string = "";
    H12 : string = "";
    H13 : string = "";
    H21 : string = "";
    H22 : string = "";
    H23 : string = "";
    InizioEffettivoPrestazioneData : string = "";
    InizioEffettivoPrestazioneOra : string = "";

   // InvioRapido : this.InvioRapido,  false

    L11 : string = "";
    L12 : string = "";
    L13 : string = "";
    L21 : string = "";
    L22 : string = "";
    L23 : string = "";
    LocalitaLavoro : string = "";
    MatricoleContatoriEsistenti1 : string = "";
    MatricoleContatoriEsistenti2 : string = "";
    MatricoleContatoriEsistenti3 : string = "";
    MatricoleContatoriEsistenti4 : string = "";
    MatricoleContatoriEsistenti5 : string = "";
    MatricoleContatoriEsistenti6 : string = "";
    MatricoleContatoriEsistenti7 : string = "";
    MatricoleContatoriEsistenti8 : string = "";
    MatricoleContatoriEsistenti9 : string = "";
    MatricoleContatoriEsistenti10 : string = "";
    MatricoleContatoriEsistenti11 : string = "";
    MatricoleContatoriEsistenti12 : string = "";

    NomeIncaricato : string = "";
    NomeRichiedente : string = "";
    NomeTecnicoReferente : string = "";

    OdL : string = "";

    P11 : string = "";
    P12 : string = "";
    P13 : string = "";
    P21 : string = "";
    P22 : string = "";
    P23 : string = "";

    ProvinciaLavoro : string = "";

    RichiestaAttiAutorizzativi : string = "";

    

    RichiesteAggiuntiveDescrizione1 :  string = "";
    RichiesteAggiuntiveDescrizione2 :  string = "";
    RichiesteAggiuntiveDescrizione3 :  string = "";
    RichiesteAggiuntiveTipoRichiesta1 :  string = "";
    RichiesteAggiuntiveTipoRichiesta2 : string = "";
    RichiesteAggiuntiveTipoRichiesta3 : string = "";


    Servizio11 : string = "";
    Servizio12 : string = "";
    Servizio13 : string = "";
    Servizio21 : string = "";
    Servizio22 : string = "";
    Servizio23 :string = "";

    SettoreMerceologico : string = "";

    TelefonoIncaricato : string = "";
    TelefonoRichiedente : string = "";
    TelefonoTecnicoReferente : string = "";
    Tica : string = "";
    ViaLavoro : string = "";
    AdeguamentoNicchiaCaricoCliente: boolean ;
    ConsensoAppuntamentoAnticipatoCliente: boolean;

    AdeguamentoCaricoCliente: AdeguamentoCliente ;
    AdeguamentiNecessariCliente: AdeguamentoNecessarioCliente[];
    PrestazioniCorrelate: string;
    Note_dinamiche : NoteItem[];

    //FINE DATI DOPPI
    
    Path: string;
    Img;

    Disegno_Schema: any;
    Inviato;


    updAdeguamentoCaricoCliente() {
        this.AdeguamentoNicchiaCaricoCliente = (this.AdeguamentoCaricoCliente ==  AdeguamentoCliente.DA_REALIZZARE) ||
        (this.AdeguamentoCaricoCliente ==  AdeguamentoCliente.NON_ADEGUATO);

        if (!this.AdeguamentoNicchiaCaricoCliente){
            this.AdeguamentiNecessariCliente = [];
        }
    }
    

    setImg(images){
        this.Img = [];
        for(let img of images){
            this.Img.push(img.base64);
        }

        if(this.Img.length==1||this.Img.length==4){
            this.Img.push(imgExample.getWhiteImg());
            this.Img.push(imgExample.getWhiteImg());
        }
        if(this.Img.length==2||this.Img.length==5){
            this.Img.push(imgExample.getWhiteImg());
        }
    }

    /*
    get RetroPDF(){
        if(this.Acqua==true||this.Fognatura==true||this.Tlr) return imgExample.getRetroAcqua();
        else return imgExample.getRetroGas();
    }

    get AdeguamentoPDF(){
        if(this.Acqua==true && !this.Fognatura) return imgExample.getAllacciamentoACQUA();
        else if(this.Gas) return imgExample.getAllacciamentoGAS();
    }
    */

    normalizzaVerbale(ads: Ads) {
        this.A11 = this.A_Opere_1_IMG1;
        this.A12 = this.A_Opere_2_IMG1;
        this.A13 = this.A_Opere_3_IMG1;
        

        this.Cognome_Incaricato = ads.VerbaleDiSopralluogo.Cognome_Incaricato;
        this.Nome_Incaricato = ads.VerbaleDiSopralluogo.Nome_Incaricato;
        this.Telefono_Incaricato = ads.VerbaleDiSopralluogo.Telefono_Incaricato;

        this.AltroNote = this.Descrizione_note;
        this.AltroTempiStimati = this.Adempimenti_Altro_Stima;
        this.AppuntamentoAnticipatoData = this.App_Anticipato_Data;
        this.AppuntamentoAnticipatoOraFine = this.App_Anticipato_Ora_Fine;
        this.AppuntamentoAnticipatoOraInizio = this.App_Anticipato_Ora_Inizio;
        this.AppuntamentoConcordatoData = this.App_Concordato_Data;
        this.AppuntamentoConcordatoOraFine = this.App_Concordato_Ora_Fine;
        this.AppuntamentoConcordatoOraInizio = this.App_Concordato_Ora_Inizio;
        this.AssenzaClienteData = this.App_Verificata_Assenza_Data;
        this.AssenzaClienteOra = this.App_Verificata_Assenza_Ora;
        
        this.BarratoLavoro =ads._indirizzo._barrato;
        
        this.CAPLavoro = ads._indirizzo._cap;
        
        if(this.App_Verificata_Assenza_Forza_Maggiore == true)
            this.CausaAppuntamentoMancato = "Cause di forza maggiore"
    
        if(this.App_Verificata_Assenza_Cliente == true)
            this.CausaAppuntamentoMancato = "Assenza cliente"

        if(this.App_Verificata_Assenza_Gestore == true)
            this.CausaAppuntamentoMancato = "Assenza gestore"    
        
        this.CausaPraticaAnnullata = this.Pratica_Annullata;
        this.CausaPraticaSospesa = this.Paratica_Sospesa;
        
        this.CivicoLavoro = ads._indirizzo._civico;
        
        this.CodiceClienteRichiedente = this.Codice_Cliente;
        this.CodiceRintracciabilita = this.Rintracciabilita;
        this.CognomeIncaricato = this.Cognome_Incaricato;
        this.CognomeRichiedente = this.Cognome_Richiedente;
        this.Ragione_Sociale = this.Ragione_Sociale;
        this.CognomeTecnicoReferente = this.Cognome_Tecnico;
        this.ConsegnatoAllegatoTecnico = this.Consegnato_Allegato_tecnico;
        this.ContatoriRichiestAcquaUso1 = this.Uso_Contatore;
        this.ContatoriRichiestiAcquaCalibro1 = this.Calibro_Contatore;
        this.ContatoriRichiestiAcquaCalibro2 = this.Calibro_Contatore_2;
        this.ContatoriRichiestiAcquaCalibro3 = this.Calibro_Contatore_3;
        this.ContatoriRichiestiAcquaNumero1 = this.Numero_Contatore;
        this.ContatoriRichiestiAcquaNumero2 = this.Numero_Contatore_2;
        this.ContatoriRichiestiAcquaNumero3 = this.Numero_Contatore_3;
        this.ContatoriRichiestiAcquaPortata1 = this.Portata_Contatore;
        this.ContatoriRichiestiAcquaPortata2 = this.Portata_Contatore_2;
        this.ContatoriRichiestiAcquaPortata3 = this.Portata_Contatore_3;
        this.ContatoriRichiestiAcquaUso2 = this.Uso_Contatore_2;
        this.ContatoriRichiestiAcquaUso3 = this.Uso_Contatore_3;
        this.ContatoriRichiestiFognaPortataRichiesta1 = this.Portata_Fogna;
        this.ContatoriRichiestiFognaPortataRichiesta2 = this.Portata_Fogna_2;
        this.ContatoriRichiestiFognaPortataRichiesta3 = this.Portata_Fogna_3;
        this.ContatoriRichiestiFognaTipo1 = this.Tipo_Fogna;
        this.ContatoriRichiestiFognaTipo2 = this.Tipo_Fogna_2;
        this.ContatoriRichiestiFognaTipo3 = this.Tipo_Fogna_3;
        this.ContatoriRichiestiFognaUso1 = this.Uso_Fogna;
        this.ContatoriRichiestiFognaUso2 = this.Uso_Fogna_2;
        this.ContatoriRichiestiFognaUso3 = this.Uso_Fogna_3;
        this.ContatoriRichiestiGasEECalibro1 = this.Calibro_Contatore;
        this.ContatoriRichiestiGasEECalibro2 = this.Calibro_Contatore_2;
        this.ContatoriRichiestiGasEECalibro3 = this.Calibro_Contatore_3;
        this.ContatoriRichiestiGasEENumero1 = this.Numero_Contatore;
        this.ContatoriRichiestiGasEENumero2 = this.Numero_Contatore_2;
        this.ContatoriRichiestiGasEENumero3 = this.Numero_Contatore_3;
        this.ContatoriRichiestiGasEEPotenzaFornita1 = String(this.Potenza_Fornita_Contatore);
        this.ContatoriRichiestiGasEEPotenzaFornita2 = String(this.Potenza_Fornita_Contatore_2);
        this.ContatoriRichiestiGasEEPotenzaFornita3 = String(this.Potenza_Fornita_Contatore_3);
        this.ContatoriRichiestiGasEEPotenzaRichiesta1 = String(this.Potenza_Richiesta_Contatore);
        this.ContatoriRichiestiGasEEPotenzaRichiesta2 = String(this.Potenza_Richiesta_Contatore_2);
        this.ContatoriRichiestiGasEEPotenzaRichiesta3 = String(this.Potenza_Richiesta_Contatore_3);
        this.ContatoriRichiestiGasEEUso1 = this.Uso_Contatore;
        this.ContatoriRichiestiGasEEUso2 = this.Uso_Contatore_2;
        this.ContatoriRichiestiGasEEUso3 = this.Uso_Contatore_3;
        

        if(this.PN1 == true) 
            this.DescrizioneLavoro = "PN1";
        if(this.PM1 == true) 
            this.DescrizioneLavoro = "PM1";
        if(this.PR1 == true) 
            this.DescrizioneLavoro = "PR1";  

        
        this.EmailRichiedente = this.Email;
        
        // File = this.pdfBase64;
        
        
        this.NomeFile = "Verbale di sopralluogo".concat(new Date().getTime().toString()).concat(".pdf");
        
        this.FirmaClienteAppuntamento = "";
        this.FirmaTecnicoAppuntamento = "";
        
        this.H11 = this.H_Opere_1_IMG1;
        this.H12 = this.H_Opere_2_IMG1;
        this.H13 = this.H_Opere_3_IMG1;
        this.H21 = this.H_Opere_1_IMG2;
        this.H22 = this.H_Opere_2_IMG2;
        this.H23 = this.H_Opere_3_IMG2;
        this.InizioEffettivoPrestazioneData = this.App_Effettivo_Data;
        this.InizioEffettivoPrestazioneOra = this.App_Effettivo_Ora_Inizio;
        
        // InvioRapido = this.InvioRapido;  false
        
        this.L11 = this.L_Opere_1_IMG1;
        this.L12 = this.L_Opere_2_IMG1;
        this.L13 = this.L_Opere_3_IMG1;
        this.L21 = this.L_Opere_1_IMG2;
        this.L22 = this.L_Opere_2_IMG2;
        this.L23 = this.L_Opere_3_IMG2;
        this.LocalitaLavoro = this.Comune_Lavoro;
        this.MatricoleContatoriEsistenti1 = this.Matricola_1_vecchio_contatore;
        this.MatricoleContatoriEsistenti2 = this.Matricola_2_vecchio_contatore;
        this.MatricoleContatoriEsistenti3 = this.Matricola_3_vecchio_contatore;
        this.MatricoleContatoriEsistenti4 = this.Matricola_1_vecchio_contatore_2;
        this.MatricoleContatoriEsistenti5 = this.Matricola_2_vecchio_contatore_2;
        this.MatricoleContatoriEsistenti6 = this.Matricola_3_vecchio_contatore_2;
        this.MatricoleContatoriEsistenti7 = this.Matricola_1_vecchio_contatore_3;
        this.MatricoleContatoriEsistenti8 = this.Matricola_2_vecchio_contatore_3;
        this.MatricoleContatoriEsistenti9 = this.Matricola_3_vecchio_contatore_3;
        this.MatricoleContatoriEsistenti10 = this.Matricola_1_vecchio_contatore_4;
        this.MatricoleContatoriEsistenti11 = this.Matricola_2_vecchio_contatore_4;
        this.MatricoleContatoriEsistenti12 = this.Matricola_3_vecchio_contatore_4;
        
        
        this.NomeIncaricato = this.Nome_Incaricato;
        this.NomeRichiedente = this.Nome_Richiedente;
        this.Ragione_Sociale = this.Ragione_Sociale;
        this.NomeTecnicoReferente = this.Nome_Tecnico;
        
        this.OdL = ads._codice_odl;
        
        this.P11 = this.P_Opere_1_IMG1;
        this.P12 = this.P_Opere_2_IMG1;
        this.P13 = this.P_Opere_3_IMG1;
        this.P21 = this.P_Opere_1_IMG2;
        this.P22 = this.P_Opere_2_IMG2;
        this.P23 = this.P_Opere_3_IMG2;
        
        this.ProvinciaLavoro = ads._indirizzo._provincia;
        
        this.RichiestaAttiAutorizzativi = this.Seleziona_Ente;
        
        if(this.show_comp.length  > 0){
            if((this.show_comp[0].descrizione != null) && (this.show_comp[0].descrizione != "") && (this.show_comp[0].descrizione != " ")){
                this.RichiesteAggiuntiveDescrizione1 = this.show_comp[0].descrizione;
            }
        }
        
        if(this.show_comp.length  > 0)
        { 
            if((this.show_comp[0].descrizione != null) && (this.show_comp[0].descrizione != "") && (this.show_comp[0].descrizione != " "))
                this.RichiesteAggiuntiveDescrizione1 = this.show_comp[0].descrizione;
            if((this.show_comp[0].tipo != null) && (this.show_comp[0].tipo != "") && (this.show_comp[0].tipo != " "))
                this.RichiesteAggiuntiveTipoRichiesta1 = this.show_comp[0].tipo;
        }
        if(this.show_comp.length  > 1)
        {        
            if((this.show_comp[1].descrizione != null) && (this.show_comp[1].descrizione != "") && (this.show_comp[1].descrizione != " "))
                this.RichiesteAggiuntiveDescrizione2 = this.show_comp[1].descrizione;
            if((this.show_comp[1].tipo != null) && (this.show_comp[1].tipo != "") && (this.show_comp[1].tipo != undefined)&& (this.show_comp[1].tipo != " "))
                this.RichiesteAggiuntiveTipoRichiesta2 = this.show_comp[1].tipo;
        }
        if(this.show_comp.length  > 2)
        {    
            if((this.show_comp[2].descrizione != null) && (this.show_comp[2].descrizione != "") && (this.show_comp[2].descrizione != undefined)&& (this.show_comp[2].descrizione != " "))
                this.RichiesteAggiuntiveDescrizione3 = this.show_comp[2].descrizione;
            if((this.show_comp[2].tipo != null) && (this.show_comp[2].tipo != "") && (this.show_comp[2].tipo != undefined)&& (this.show_comp[2].tipo != " "))
                this.RichiesteAggiuntiveTipoRichiesta3 = this.show_comp[2].tipo;               
        }      

        this.Servizio11 = this.Servizio_Opere_1_IMG1;
        this.Servizio12 = this.Servizio_Opere_2_IMG1;
        this.Servizio13 = this.Servizio_Opere_3_IMG1;
        this.Servizio21 = this.Servizio_Opere_1_IMG2;
        this.Servizio22 = this.Servizio_Opere_2_IMG2;
        this.Servizio23 = this.Servizio_Opere_3_IMG2;
        
        this.SettoreMerceologico = ads._settore_merceologico.toString();
        
        this.TelefonoIncaricato = this.Telefono_Incaricato;
        this.TelefonoRichiedente = this.Telefono_Richiedente;
        this.TelefonoTecnicoReferente = this.Telefono_Tecnico;
        this.Tica = this.TICA;
        this.ViaLavoro = this.Via_Lavoro;
        
        this.NoteEsecutive= this.NoteEsecutive;
        this.NoteProgettuali= this.NoteProgettuali;
        this.Disegno_Schema = ads.getDisegnoTecnicoBase64();
        this.ConsensoAppuntamentoAnticipatoCliente = this.ConsensoAppuntamentoAnticipatoCliente;
        this.AdeguamentoCaricoCliente = this.AdeguamentoCaricoCliente;
        this.AdeguamentiNecessariCliente = this.AdeguamentiNecessariCliente;
        this.PrestazioniCorrelate = this.PrestazioniCorrelate;
        this.updAdeguamentoCaricoCliente();
        
        this.Note_dinamiche = this.Note_dinamiche;
        this.Variante_Fasi = this.Variante_Fasi;
        this.Variante_Fasi_2 = this.Variante_Fasi_2;
        this.Variante_Fasi_3 = this.Variante_Fasi_3;
        this.Tipo_Ente = this.Tipo_Ente;
    }


    static parseServerDto(verbaledisopralluogo: VerbaleDiSopralluogo) : VerbaleDiSopralluogo {
        
        var v = new VerbaleDiSopralluogo();

        //if(verbaledisopralluogo==undefined) return v;
        
        v.show_comp = verbaledisopralluogo.show_comp;
        v.descrizione = verbaledisopralluogo.descrizione;
        
        // Tipo servizio
        v.Acqua = verbaledisopralluogo.Acqua;
        v.Fognatura = verbaledisopralluogo.Fognatura;
        v.Gas = verbaledisopralluogo.Gas;
        v.Energia_Elettrica = verbaledisopralluogo.Energia_Elettrica;
        v.Tlr = verbaledisopralluogo.Tlr;
        
        // Codici
        v.Rintracciabilita = verbaledisopralluogo.Rintracciabilita;
        v.Avviso = verbaledisopralluogo.Avviso;
        
        // Dati richiedente
        v.Cognome_Richiedente = verbaledisopralluogo.Cognome_Richiedente;
        v.Nome_Richiedente = verbaledisopralluogo.Nome_Richiedente;
        v.Ragione_Sociale = verbaledisopralluogo.Ragione_Sociale;
        v.Codice_Cliente = verbaledisopralluogo.Codice_Cliente;
        v.Telefono_Richiedente = verbaledisopralluogo.Telefono_Richiedente;
        v.Email = verbaledisopralluogo.Email;
        
        // Dati incaricato
        v.Cognome_Incaricato = verbaledisopralluogo.Cognome_Incaricato;
        v.Nome_Incaricato = verbaledisopralluogo.Nome_Incaricato;
        v.Telefono_Incaricato = verbaledisopralluogo.Telefono_Incaricato;
        
        // Indirizzo lavoro
        v.Via_Lavoro = verbaledisopralluogo.Via_Lavoro;
        v.Comune_Lavoro = verbaledisopralluogo.Comune_Lavoro;
        
        // Descrizione lavoro
        v.PN1 = verbaledisopralluogo.PN1;
        v.PM1 = verbaledisopralluogo.PM1;
        v.PR1 = verbaledisopralluogo.PR1;
        v.Note_Lavoro = verbaledisopralluogo.Note_Lavoro;
        
        // Tipo lavoro
        v.Lavoro_Semplice = verbaledisopralluogo.Lavoro_Semplice;
        v.Lavoro_Complesso = verbaledisopralluogo.Lavoro_Complesso;
        
        // Contatori esistenti
        v.Matricola_1_vecchio_contatore = verbaledisopralluogo.Matricola_1_vecchio_contatore;
        v.Matricola_2_vecchio_contatore = verbaledisopralluogo.Matricola_2_vecchio_contatore;
        v.Matricola_3_vecchio_contatore = verbaledisopralluogo.Matricola_3_vecchio_contatore;
        
        v.Matricola_1_vecchio_contatore_2 = verbaledisopralluogo.Matricola_1_vecchio_contatore_2;
        v.Matricola_2_vecchio_contatore_2 = verbaledisopralluogo.Matricola_2_vecchio_contatore_2;
        v.Matricola_3_vecchio_contatore_2 = verbaledisopralluogo.Matricola_3_vecchio_contatore_2;
        
        v.Matricola_1_vecchio_contatore_3 = verbaledisopralluogo.Matricola_1_vecchio_contatore_3;
        v.Matricola_2_vecchio_contatore_3 = verbaledisopralluogo.Matricola_2_vecchio_contatore_3;
        v.Matricola_3_vecchio_contatore_3 = verbaledisopralluogo.Matricola_3_vecchio_contatore_3;
        
        v.Matricola_1_vecchio_contatore_4 = verbaledisopralluogo.Matricola_1_vecchio_contatore_4;
        v.Matricola_2_vecchio_contatore_4 = verbaledisopralluogo.Matricola_2_vecchio_contatore_4;
        v.Matricola_3_vecchio_contatore_4 = verbaledisopralluogo.Matricola_3_vecchio_contatore_4 ;
        
        // Contatori richiesti
        v.Calibro_Contatore = verbaledisopralluogo.Calibro_Contatore;
        v.Numero_Contatore = verbaledisopralluogo.Numero_Contatore;
        v.Portata_Contatore = verbaledisopralluogo.Portata_Contatore;
        v.Uso_Contatore = verbaledisopralluogo.Uso_Contatore;
        
        v.Calibro_Contatore_2 = verbaledisopralluogo.Calibro_Contatore_2;
        v.Numero_Contatore_2 = verbaledisopralluogo.Numero_Contatore_2;
        v.Portata_Contatore_2 = verbaledisopralluogo.Portata_Contatore_2;
        v.Uso_Contatore_2 = verbaledisopralluogo.Uso_Contatore_2;
        
        v.Calibro_Contatore_3 = verbaledisopralluogo.Calibro_Contatore_3;
        v.Numero_Contatore_3 = verbaledisopralluogo.Numero_Contatore_3;
        v.Portata_Contatore_3 = verbaledisopralluogo.Portata_Contatore_3;
        v.Uso_Contatore_3 = verbaledisopralluogo.Uso_Contatore_3;
        
        
        v.Potenza_Richiesta_Contatore = verbaledisopralluogo.Potenza_Richiesta_Contatore;
        v.Potenza_Fornita_Contatore = verbaledisopralluogo.Potenza_Fornita_Contatore;
        v.Variante_Fasi = verbaledisopralluogo.Variante_Fasi;

        v.Potenza_Richiesta_Contatore_2 = verbaledisopralluogo.Potenza_Richiesta_Contatore_2;
        v.Potenza_Fornita_Contatore_2 = verbaledisopralluogo.Potenza_Fornita_Contatore_2;
        v.Variante_Fasi_2 = verbaledisopralluogo.Variante_Fasi_2;
        
        v.Potenza_Richiesta_Contatore_3 = verbaledisopralluogo.Potenza_Richiesta_Contatore_3;
        v.Potenza_Fornita_Contatore_3 = verbaledisopralluogo.Potenza_Fornita_Contatore_3;
        v.Variante_Fasi_3 = verbaledisopralluogo.Variante_Fasi_3;
        
        // Fognatura
        v.Tipo_Fogna = verbaledisopralluogo.Tipo_Fogna;
        v.Portata_Fogna = verbaledisopralluogo.Portata_Fogna;
        v.Uso_Fogna = verbaledisopralluogo.Uso_Fogna;
        
        v.Tipo_Fogna_2 = verbaledisopralluogo.Tipo_Fogna_2;
        v.Portata_Fogna_2 = verbaledisopralluogo.Portata_Fogna_2;
        v.Uso_Fogna_2 = verbaledisopralluogo.Uso_Fogna_2;
        
        v.Tipo_Fogna_3 = verbaledisopralluogo.Tipo_Fogna_3;
        v.Portata_Fogna_3 = verbaledisopralluogo.Portata_Fogna_3;
        v.Uso_Fogna_3 = verbaledisopralluogo.Uso_Fogna_3;
        
        // Dati tecnico
        v.Cognome_Tecnico = verbaledisopralluogo.Cognome_Tecnico;
        v.Nome_Tecnico = verbaledisopralluogo.Nome_Tecnico;
        v.Telefono_Tecnico = verbaledisopralluogo.Telefono_Tecnico;
        
        // Dati pratica
        v.Paratica_Sospesa = verbaledisopralluogo.Paratica_Sospesa;
        v.Pratica_Annullata = verbaledisopralluogo.Pratica_Annullata;
        
        // Richieste aggiuntive
        v.Richiesta_Aggiuntiva = verbaledisopralluogo.Richiesta_Aggiuntiva;
        v.Descrizione_Aggiuntiva = verbaledisopralluogo.Descrizione_Aggiuntiva;
        v.Consegnato_Allegato_tecnico = verbaledisopralluogo.Consegnato_Allegato_tecnico;
        // Autorizzazioni cliente
        v.Nascondi_Numero = verbaledisopralluogo.Nascondi_Numero;
        v.Autorizzazione_Zona_Vincolata = verbaledisopralluogo.Autorizzazione_Zona_Vincolata;
        v.Autorizzazione_Strade = verbaledisopralluogo.Autorizzazione_Strade;
        v.Autorizzazione_Comune = verbaledisopralluogo.Autorizzazione_Comune;
        v.Autorizzazioni_Altro = verbaledisopralluogo.Autorizzazioni_Altro;
        v.Autorizzazioni_Altro_Note = verbaledisopralluogo.Autorizzazioni_Altro_Note;
        
        // Adempimenti Hera
        v.Seleziona_Ente = verbaledisopralluogo.Seleziona_Ente;
        v.Adempimenti_Altro = verbaledisopralluogo.Adempimenti_Altro;
        v.Adempimenti_Altro_Note = verbaledisopralluogo.Adempimenti_Altro_Note;
        v.Adempimenti_Altro_Stima = verbaledisopralluogo.Adempimenti_Altro_Stima;
        
        // Dati schema indicativo
        v.Servizio_Opere_1_IMG1 = verbaledisopralluogo.Servizio_Opere_1_IMG1;
        v.H_Opere_1_IMG1 = verbaledisopralluogo.H_Opere_1_IMG1;
        v.L_Opere_1_IMG1 = verbaledisopralluogo.L_Opere_1_IMG1;
        v.P_Opere_1_IMG1 = verbaledisopralluogo.P_Opere_1_IMG1;
        v.A_Opere_1_IMG1 = verbaledisopralluogo.A_Opere_1_IMG1;
        v.Servizio_Opere_2_IMG1 = verbaledisopralluogo.Servizio_Opere_2_IMG1;
        v.H_Opere_2_IMG1 = verbaledisopralluogo.H_Opere_2_IMG1;
        v.L_Opere_2_IMG1 = verbaledisopralluogo.L_Opere_2_IMG1;
        v.P_Opere_2_IMG1 = verbaledisopralluogo.P_Opere_2_IMG1;
        v.A_Opere_2_IMG1 = verbaledisopralluogo.A_Opere_2_IMG1;
        v.Servizio_Opere_3_IMG1 = verbaledisopralluogo.Servizio_Opere_3_IMG1;
        v.H_Opere_3_IMG1 = verbaledisopralluogo.H_Opere_3_IMG1;
        v.L_Opere_3_IMG1 = verbaledisopralluogo.L_Opere_3_IMG1;
        v.P_Opere_3_IMG1 = verbaledisopralluogo.P_Opere_3_IMG1;
        v.A_Opere_3_IMG1 = verbaledisopralluogo.A_Opere_3_IMG1;
        
        v.Servizio_Opere_1_IMG2 = verbaledisopralluogo.Servizio_Opere_1_IMG2;
        v.L_Opere_1_IMG2 = verbaledisopralluogo.L_Opere_1_IMG2;
        v.P_Opere_1_IMG2 = verbaledisopralluogo.P_Opere_1_IMG2;
        v.H_Opere_1_IMG2 = verbaledisopralluogo.H_Opere_1_IMG2;
        v.Servizio_Opere_2_IMG2 = verbaledisopralluogo.Servizio_Opere_2_IMG2;
        v.L_Opere_2_IMG2 = verbaledisopralluogo.L_Opere_2_IMG2;
        v.P_Opere_2_IMG2 = verbaledisopralluogo.P_Opere_2_IMG2;
        v.P_Opere_2_IMG2 = verbaledisopralluogo.P_Opere_2_IMG2;
        v.H_Opere_2_IMG2 = verbaledisopralluogo.H_Opere_2_IMG2;
        v.Servizio_Opere_3_IMG2 = verbaledisopralluogo.Servizio_Opere_3_IMG2;
        v.L_Opere_3_IMG2 = verbaledisopralluogo.L_Opere_3_IMG2;
        v.P_Opere_3_IMG2 = verbaledisopralluogo.P_Opere_3_IMG2;
        v.H_Opere_3_IMG2 = verbaledisopralluogo.H_Opere_3_IMG2;
        
        // Dati fascia di puntualità
        v.App_Concordato_Data = verbaledisopralluogo.App_Concordato_Data;
        v.App_Concordato_Ora_Inizio = verbaledisopralluogo.App_Concordato_Ora_Inizio;
        v.App_Concordato_Ora_Fine = verbaledisopralluogo.App_Concordato_Ora_Fine;
        
        v.App_Anticipato_Data = verbaledisopralluogo.App_Anticipato_Data;
        v.App_Anticipato_Ora_Inizio = verbaledisopralluogo.App_Anticipato_Ora_Inizio;
        v.App_Anticipato_Ora_Fine = verbaledisopralluogo.App_Anticipato_Ora_Fine;
        
        v.App_Effettivo_Data = verbaledisopralluogo.App_Effettivo_Data;
        v.App_Effettivo_Ora_Inizio = verbaledisopralluogo.App_Effettivo_Ora_Inizio;
        
        v.App_Verificata_Assenza = verbaledisopralluogo.App_Verificata_Assenza;
        v.App_Verificata_Assenza_Data = verbaledisopralluogo.App_Verificata_Assenza_Data;
        v.App_Verificata_Assenza_Ora = verbaledisopralluogo.App_Verificata_Assenza_Ora;
        v.App_Verificata_Assenza_Verificato = verbaledisopralluogo.App_Verificata_Assenza_Verificato;
        v.App_Verificata_Assenza_Forza_Maggiore = verbaledisopralluogo.App_Verificata_Assenza_Forza_Maggiore;
        v.App_Verificata_Assenza_Cliente = verbaledisopralluogo.App_Verificata_Assenza_Cliente;
        v.App_Verificata_Assenza_Gestore = verbaledisopralluogo.App_Verificata_Assenza_Gestore;
        v.App_Verificata_Assenza_Letto_in_Data = verbaledisopralluogo.App_Verificata_Assenza_Letto_in_Data;
        v.App_Firma_Cliente = verbaledisopralluogo.App_Firma_Cliente;
        v.App_Firma_Tecnico = verbaledisopralluogo.App_Firma_Tecnico;
        v.App_Firma_Cliente2 = verbaledisopralluogo.App_Firma_Cliente2;
        v.App_Firma_Tecnico2 = verbaledisopralluogo.App_Firma_Tecnico2;
        v.Letto_in_Data = verbaledisopralluogo.Letto_in_Data;
        v.Descrizione_note = verbaledisopralluogo.Descrizione_note;
        v.TipoVerbale = verbaledisopralluogo.TipoVerbale;
        v.NoteProgettuali = verbaledisopralluogo.NoteProgettuali;
        v.NoteEsecutive = verbaledisopralluogo.NoteEsecutive;
        v.Calibro_Contatore_4 = verbaledisopralluogo.Calibro_Contatore_4;
        v.Calibro_Contatore_5 = verbaledisopralluogo.Calibro_Contatore_5;
        v.Calibro_Contatore_6 = verbaledisopralluogo.Calibro_Contatore_6;
        v.Sopralluogo_Terminato = verbaledisopralluogo.Sopralluogo_Terminato;
        v.TICA = verbaledisopralluogo.TICA;
    
        //DATI DOPPI PER RENAMING?
        v.A11 = verbaledisopralluogo.A11;
        v.A12 = verbaledisopralluogo.A12;
        v.A13 = verbaledisopralluogo.A13;
        v.AltroNote = verbaledisopralluogo.AltroNote;
        v.AltroTempiStimati = verbaledisopralluogo.AltroTempiStimati;
        v.AppuntamentoAnticipatoData = verbaledisopralluogo.AppuntamentoAnticipatoData;
        v.AppuntamentoAnticipatoOraFine = verbaledisopralluogo.AppuntamentoAnticipatoOraFine;
        v.AppuntamentoAnticipatoOraInizio = verbaledisopralluogo.AppuntamentoAnticipatoOraInizio;
        v.AppuntamentoConcordatoData = verbaledisopralluogo.AppuntamentoConcordatoData;
        v.AppuntamentoConcordatoOraFine = verbaledisopralluogo.AppuntamentoConcordatoOraFine;
        v.AppuntamentoConcordatoOraInizio = verbaledisopralluogo.AppuntamentoConcordatoOraInizio;
        v.AssenzaClienteData = verbaledisopralluogo.AssenzaClienteData;
        v.AssenzaClienteOra = verbaledisopralluogo.AssenzaClienteOra;
    
        v.BarratoLavoro = verbaledisopralluogo.BarratoLavoro;
    
        v.CAPLavoro = verbaledisopralluogo.CAPLavoro;
    
        v.CausaAppuntamentoMancato = verbaledisopralluogo.CausaAppuntamentoMancato;
    
        v.CausaPraticaAnnullata = verbaledisopralluogo.CausaPraticaAnnullata;
        v.CausaPraticaSospesa = verbaledisopralluogo.CausaPraticaSospesa;
    
        v.CivicoLavoro = verbaledisopralluogo.CivicoLavoro;
        v.CodiceClienteRichiedente = verbaledisopralluogo.CodiceClienteRichiedente;
        v.CodiceRintracciabilita = verbaledisopralluogo.CodiceRintracciabilita;
        v.CognomeIncaricato = verbaledisopralluogo.CognomeIncaricato;
        v.CognomeRichiedente = verbaledisopralluogo.CognomeRichiedente;
        v.CognomeTecnicoReferente = verbaledisopralluogo.CognomeTecnicoReferente;
        v.ConsegnatoAllegatoTecnico = verbaledisopralluogo.ConsegnatoAllegatoTecnico;
        v.ContatoriRichiestAcquaUso1 = verbaledisopralluogo.ContatoriRichiestAcquaUso1;
        v.ContatoriRichiestiAcquaCalibro1 = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro1;
        v.ContatoriRichiestiAcquaCalibro2 = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro2;
        v.ContatoriRichiestiAcquaCalibro3 = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro3;
        v.ContatoriRichiestiAcquaNumero1 = verbaledisopralluogo.ContatoriRichiestiAcquaNumero1;
        v.ContatoriRichiestiAcquaNumero2 = verbaledisopralluogo.ContatoriRichiestiAcquaNumero2;
        v.ContatoriRichiestiAcquaNumero3 = verbaledisopralluogo.ContatoriRichiestiAcquaNumero3;
        v.ContatoriRichiestiAcquaPortata1 = verbaledisopralluogo.ContatoriRichiestiAcquaPortata1;
        v.ContatoriRichiestiAcquaPortata2 = verbaledisopralluogo.ContatoriRichiestiAcquaPortata2;
        v.ContatoriRichiestiAcquaPortata3 = verbaledisopralluogo.ContatoriRichiestiAcquaPortata3;
        v.ContatoriRichiestiAcquaUso2 = verbaledisopralluogo.ContatoriRichiestiAcquaUso2;
        v.ContatoriRichiestiAcquaUso3 = verbaledisopralluogo.ContatoriRichiestiAcquaUso3;
        v.ContatoriRichiestiFognaPortataRichiesta1 = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta1;
        v.ContatoriRichiestiFognaPortataRichiesta2 = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta2;
        v.ContatoriRichiestiFognaPortataRichiesta3 = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta3;
        v.ContatoriRichiestiFognaTipo1 = verbaledisopralluogo.ContatoriRichiestiFognaTipo1;
        v.ContatoriRichiestiFognaTipo2 = verbaledisopralluogo.ContatoriRichiestiFognaTipo2;
        v.ContatoriRichiestiFognaTipo3 = verbaledisopralluogo.ContatoriRichiestiFognaTipo3;
        v.ContatoriRichiestiFognaUso1 = verbaledisopralluogo.ContatoriRichiestiFognaUso1;
        v.ContatoriRichiestiFognaUso2 = verbaledisopralluogo.ContatoriRichiestiFognaUso2;
        v.ContatoriRichiestiFognaUso3 = verbaledisopralluogo.ContatoriRichiestiFognaUso3;
        v.ContatoriRichiestiGasEECalibro1 = verbaledisopralluogo.ContatoriRichiestiGasEECalibro1;
        v.ContatoriRichiestiGasEECalibro2 = verbaledisopralluogo.ContatoriRichiestiGasEECalibro2;
        v.ContatoriRichiestiGasEECalibro3 = verbaledisopralluogo.ContatoriRichiestiGasEECalibro3;
        v.ContatoriRichiestiGasEENumero1 = verbaledisopralluogo.ContatoriRichiestiGasEENumero1;
        v.ContatoriRichiestiGasEENumero2 = verbaledisopralluogo.ContatoriRichiestiGasEENumero2;
        v.ContatoriRichiestiGasEENumero3 = verbaledisopralluogo.ContatoriRichiestiGasEENumero3;
        v.ContatoriRichiestiGasEEPotenzaFornita1 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita1;
        v.ContatoriRichiestiGasEEPotenzaFornita2 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita2;
        v.ContatoriRichiestiGasEEPotenzaFornita3 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita3;
        v.ContatoriRichiestiGasEEPotenzaRichiesta1 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta1;
        v.ContatoriRichiestiGasEEPotenzaRichiesta2 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta2;
        v.ContatoriRichiestiGasEEPotenzaRichiesta3 = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta3;
        v.ContatoriRichiestiGasEEUso1 = verbaledisopralluogo.ContatoriRichiestiGasEEUso1;
        v.ContatoriRichiestiGasEEUso2 = verbaledisopralluogo.ContatoriRichiestiGasEEUso2;
        v.ContatoriRichiestiGasEEUso3 = verbaledisopralluogo.ContatoriRichiestiGasEEUso3;
    
        v.DescrizioneLavoro = verbaledisopralluogo.DescrizioneLavoro;
    
        v.EmailRichiedente = verbaledisopralluogo.EmailRichiedente;
    
       // File : this.pdfBase64,
        v.NomeFile = verbaledisopralluogo.NomeFile;
    
        v.FirmaClienteAppuntamento = verbaledisopralluogo.FirmaClienteAppuntamento;
        v.FirmaTecnicoAppuntamento = verbaledisopralluogo.FirmaTecnicoAppuntamento;
    
        v.H11 = verbaledisopralluogo.H11;
        v.H12 = verbaledisopralluogo.H12;
        v.H13 = verbaledisopralluogo.H13;
        v.H21 = verbaledisopralluogo.H21;
        v.H22 = verbaledisopralluogo.H22;
        v.H23 = verbaledisopralluogo.H23;
        v.InizioEffettivoPrestazioneData = verbaledisopralluogo.InizioEffettivoPrestazioneData;
        v.InizioEffettivoPrestazioneOra = verbaledisopralluogo.InizioEffettivoPrestazioneOra;
    
       // InvioRapido : this.InvioRapido,  false
    
       v.L11 = verbaledisopralluogo.L11;
       v.L12 = verbaledisopralluogo.L12;
       v.L13 = verbaledisopralluogo.L13;
       v.L21 = verbaledisopralluogo.L21;
       v.L22 = verbaledisopralluogo.L22;
       v.L23 = verbaledisopralluogo.L23;
       v.LocalitaLavoro = verbaledisopralluogo.LocalitaLavoro;
       v.MatricoleContatoriEsistenti1 = verbaledisopralluogo.MatricoleContatoriEsistenti1;
       v.MatricoleContatoriEsistenti2 = verbaledisopralluogo.MatricoleContatoriEsistenti2;
       v.MatricoleContatoriEsistenti3 = verbaledisopralluogo.MatricoleContatoriEsistenti3;
       v.MatricoleContatoriEsistenti4 = verbaledisopralluogo.MatricoleContatoriEsistenti4;
       v.MatricoleContatoriEsistenti5 = verbaledisopralluogo.MatricoleContatoriEsistenti5;
       v.MatricoleContatoriEsistenti6 = verbaledisopralluogo.MatricoleContatoriEsistenti6;
       v.MatricoleContatoriEsistenti7 = verbaledisopralluogo.MatricoleContatoriEsistenti7;
       v.MatricoleContatoriEsistenti8 = verbaledisopralluogo.MatricoleContatoriEsistenti8;
       v.MatricoleContatoriEsistenti9 = verbaledisopralluogo.MatricoleContatoriEsistenti9;
       v.MatricoleContatoriEsistenti10 = verbaledisopralluogo.MatricoleContatoriEsistenti10;
       v.MatricoleContatoriEsistenti11 = verbaledisopralluogo.MatricoleContatoriEsistenti11;
       v.MatricoleContatoriEsistenti12 = verbaledisopralluogo.MatricoleContatoriEsistenti12;
    
       v.NomeIncaricato = verbaledisopralluogo.NomeIncaricato;
       v.NomeRichiedente = verbaledisopralluogo.NomeRichiedente;
       v.NomeTecnicoReferente = verbaledisopralluogo.NomeTecnicoReferente;
    
       v.OdL = verbaledisopralluogo.OdL;
    
       v.P11 = verbaledisopralluogo.P11;
       v.P12 = verbaledisopralluogo.P12;
       v.P13 = verbaledisopralluogo.P13;
       v.P21 = verbaledisopralluogo.P21;
       v.P22 = verbaledisopralluogo.P22;
       v.P23 = verbaledisopralluogo.P23;
    
       v.ProvinciaLavoro = verbaledisopralluogo.ProvinciaLavoro;
    
       v.RichiestaAttiAutorizzativi = verbaledisopralluogo.RichiestaAttiAutorizzativi;
    
        
    
       v.RichiesteAggiuntiveDescrizione1 = verbaledisopralluogo.RichiesteAggiuntiveDescrizione1;
       v.RichiesteAggiuntiveDescrizione2 = verbaledisopralluogo.RichiesteAggiuntiveDescrizione2;
       v.RichiesteAggiuntiveDescrizione3 = verbaledisopralluogo.RichiesteAggiuntiveDescrizione3;
       v.RichiesteAggiuntiveTipoRichiesta1 = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta1;
       v.RichiesteAggiuntiveTipoRichiesta2 = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta2;
       v.RichiesteAggiuntiveTipoRichiesta3 = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta3;
    
    
       v.Servizio11  = verbaledisopralluogo.Servizio11;
       v.Servizio12 = verbaledisopralluogo.Servizio12;
       v.Servizio13 = verbaledisopralluogo.Servizio13;
       v.Servizio21 = verbaledisopralluogo.Servizio21;
       v.Servizio22 = verbaledisopralluogo.Servizio22;
       v.Servizio23 = verbaledisopralluogo.Servizio23;
    
       v.SettoreMerceologico = verbaledisopralluogo.SettoreMerceologico;
    
       v.TelefonoIncaricato = verbaledisopralluogo.TelefonoIncaricato;
       v.TelefonoRichiedente = verbaledisopralluogo.TelefonoRichiedente;
       v.TelefonoTecnicoReferente = verbaledisopralluogo.TelefonoTecnicoReferente;
       v.Tica = verbaledisopralluogo.Tica;
       v.ViaLavoro = verbaledisopralluogo.ViaLavoro;
       //v.AdeguamentoNicchiaCaricoCliente = verbaledisopralluogo.AdeguamentoNicchiaCaricoCliente;
       v.ConsensoAppuntamentoAnticipatoCliente = verbaledisopralluogo.ConsensoAppuntamentoAnticipatoCliente;

        //FINE DATI DOPPI
        
        v.Path = verbaledisopralluogo.Path;
        v.Img = verbaledisopralluogo.Img;
    
        v.Disegno_Schema = verbaledisopralluogo.Disegno_Schema;
        v.Inviato = verbaledisopralluogo.Inviato;

        v.AdeguamentoCaricoCliente = verbaledisopralluogo.AdeguamentoCaricoCliente;
        v.AdeguamentiNecessariCliente = verbaledisopralluogo.AdeguamentiNecessariCliente;
        
        v.updAdeguamentoCaricoCliente();
        
        v.PrestazioniCorrelate = verbaledisopralluogo.PrestazioniCorrelate;

        v.Note_dinamiche = verbaledisopralluogo.Note_dinamiche;

        v.Tipo_Ente = verbaledisopralluogo.Tipo_Ente;

        return v;

    }

    static toJsObject(verbaledisopralluogo: VerbaleDiSopralluogo): Object {
        var obj = {};
        
        obj["show_comp"] = verbaledisopralluogo.show_comp;
        obj["descrizione"] = verbaledisopralluogo.descrizione;
        
        // Tipo servizio
        obj["Acqua"] = verbaledisopralluogo.Acqua;
        obj["Fognatura"] = verbaledisopralluogo.Fognatura;
        obj["Gas"] = verbaledisopralluogo.Gas;
        obj["Energia_Elettrica"] = verbaledisopralluogo.Energia_Elettrica;
        obj["Tlr"] = verbaledisopralluogo.Tlr;
        
        // Codici
        obj["Rintracciabilita"] = verbaledisopralluogo.Rintracciabilita;
        obj["Avviso"] = verbaledisopralluogo.Avviso;
        
        // Dati richiedente
        obj["Cognome_Richiedente"] = verbaledisopralluogo.Cognome_Richiedente;
        obj["Nome_Richiedente"] = verbaledisopralluogo.Nome_Richiedente;
        obj["Codice_Cliente"] = verbaledisopralluogo.Codice_Cliente;
        obj["Telefono_Richiedente"] = verbaledisopralluogo.Telefono_Richiedente;
        obj["Email"] = verbaledisopralluogo.Email;
        obj["Ragione_Sociale"] = verbaledisopralluogo.Ragione_Sociale;
        
        // Dati incaricato
        obj["Cognome_Incaricato"] = verbaledisopralluogo.Cognome_Incaricato;
        obj["Nome_Incaricato"] = verbaledisopralluogo.Nome_Incaricato;
        obj["Telefono_Incaricato"] = verbaledisopralluogo.Telefono_Incaricato;
        
        // Indirizzo lavoro
        obj["Via_Lavoro"] = verbaledisopralluogo.Via_Lavoro;
        obj["Comune_Lavoro"] = verbaledisopralluogo.Comune_Lavoro;
        
        // Descrizione lavoro
        obj["PN1"] = verbaledisopralluogo.PN1;
        obj["PM1"] = verbaledisopralluogo.PM1;
        obj["PR1"] = verbaledisopralluogo.PR1;
        obj["Note_Lavoro"] = verbaledisopralluogo.Note_Lavoro;
        
        // Tipo lavoro
        obj["Lavoro_Semplice"] = verbaledisopralluogo.Lavoro_Semplice;
        obj["Lavoro_Complesso"] = verbaledisopralluogo.Lavoro_Complesso;
        
        // Contatori esistenti
        obj["Matricola_1_vecchio_contatore"] = verbaledisopralluogo.Matricola_1_vecchio_contatore;
        obj["Matricola_2_vecchio_contatore"] = verbaledisopralluogo.Matricola_2_vecchio_contatore;
        obj["Matricola_3_vecchio_contatore"] = verbaledisopralluogo.Matricola_3_vecchio_contatore;
        
        obj["Matricola_1_vecchio_contatore_2"] = verbaledisopralluogo.Matricola_1_vecchio_contatore_2;
        obj["Matricola_2_vecchio_contatore_2"] = verbaledisopralluogo.Matricola_2_vecchio_contatore_2;
        obj["Matricola_3_vecchio_contatore_2"] = verbaledisopralluogo.Matricola_3_vecchio_contatore_2;
        
        obj["Matricola_1_vecchio_contatore_3"] = verbaledisopralluogo.Matricola_1_vecchio_contatore_3;
        obj["Matricola_2_vecchio_contatore_3"] = verbaledisopralluogo.Matricola_2_vecchio_contatore_3;
        obj["Matricola_3_vecchio_contatore_3"] = verbaledisopralluogo.Matricola_3_vecchio_contatore_3;
        
        obj["Matricola_1_vecchio_contatore_4"] = verbaledisopralluogo.Matricola_1_vecchio_contatore_4;
        obj["Matricola_2_vecchio_contatore_4"] = verbaledisopralluogo.Matricola_2_vecchio_contatore_4;
        obj["Matricola_3_vecchio_contatore_4"] = verbaledisopralluogo.Matricola_3_vecchio_contatore_4 ;
        
        // Contatori richiesti
        obj["Calibro_Contatore"] = verbaledisopralluogo.Calibro_Contatore;
        obj["Numero_Contatore"] = verbaledisopralluogo.Numero_Contatore;
        obj["Portata_Contatore"] = verbaledisopralluogo.Portata_Contatore;
        obj["Uso_Contatore"] = verbaledisopralluogo.Uso_Contatore;
        
        obj["Calibro_Contatore_2"] = verbaledisopralluogo.Calibro_Contatore_2;
        obj["Numero_Contatore_2"] = verbaledisopralluogo.Numero_Contatore_2;
        obj["Portata_Contatore_2"] = verbaledisopralluogo.Portata_Contatore_2;
        obj["Uso_Contatore_2"] = verbaledisopralluogo.Uso_Contatore_2;
        
        obj["Calibro_Contatore_3"] = verbaledisopralluogo.Calibro_Contatore_3;
        obj["Numero_Contatore_3"] = verbaledisopralluogo.Numero_Contatore_3;
        obj["Portata_Contatore_3"] = verbaledisopralluogo.Portata_Contatore_3;
        obj["Uso_Contatore_3"] = verbaledisopralluogo.Uso_Contatore_3;
        
        
        obj["Potenza_Richiesta_Contatore"] = verbaledisopralluogo.Potenza_Richiesta_Contatore;
        obj["Potenza_Fornita_Contatore"] = verbaledisopralluogo.Potenza_Fornita_Contatore;
        obj["Variante_Fasi"] = verbaledisopralluogo.Variante_Fasi;
        
        obj["Potenza_Richiesta_Contatore_2"] = verbaledisopralluogo.Potenza_Richiesta_Contatore_2;
        obj["Potenza_Fornita_Contatore_2"] = verbaledisopralluogo.Potenza_Fornita_Contatore_2;
        obj["Variante_Fasi_2"] = verbaledisopralluogo.Variante_Fasi_2;
        
        obj["Potenza_Richiesta_Contatore_3"] = verbaledisopralluogo.Potenza_Richiesta_Contatore_3;
        obj["Potenza_Fornita_Contatore_3"] = verbaledisopralluogo.Potenza_Fornita_Contatore_3;
        obj["Variante_Fasi_3"] = verbaledisopralluogo.Variante_Fasi_3;
        
        // Fognatura
        obj["Tipo_Fogna"] = verbaledisopralluogo.Tipo_Fogna;
        obj["Portata_Fogna"] = verbaledisopralluogo.Portata_Fogna;
        obj["Uso_Fogna"] = verbaledisopralluogo.Uso_Fogna;
        
        obj["Tipo_Fogna_2"] = verbaledisopralluogo.Tipo_Fogna_2;
        obj["Portata_Fogna_2"] = verbaledisopralluogo.Portata_Fogna_2;
        obj["Uso_Fogna_2"] = verbaledisopralluogo.Uso_Fogna_2;
        
        obj["Tipo_Fogna_3"] = verbaledisopralluogo.Tipo_Fogna_3;
        obj["Portata_Fogna_3"] = verbaledisopralluogo.Portata_Fogna_3;
        obj["Uso_Fogna_3"] = verbaledisopralluogo.Uso_Fogna_3;
        
        // Dati tecnico
        obj["Cognome_Tecnico"] = verbaledisopralluogo.Cognome_Tecnico;
        obj["Nome_Tecnico"] = verbaledisopralluogo.Nome_Tecnico;
        obj["Telefono_Tecnico"] = verbaledisopralluogo.Telefono_Tecnico;
        
        // Dati pratica
        obj["Paratica_Sospesa"] = verbaledisopralluogo.Paratica_Sospesa;
        obj["Pratica_Annullata"] = verbaledisopralluogo.Pratica_Annullata;
        
        // Richieste aggiuntive
        obj["Richiesta_Aggiuntiva"] = verbaledisopralluogo.Richiesta_Aggiuntiva;
        obj["Descrizione_Aggiuntiva"] = verbaledisopralluogo.Descrizione_Aggiuntiva;
        obj["Consegnato_Allegato_tecnico"] = verbaledisopralluogo.Consegnato_Allegato_tecnico;
        // Autorizzazioni cliente
        obj["Nascondi_Numero"] = verbaledisopralluogo.Nascondi_Numero;
        obj["Autorizzazione_Zona_Vincolata"] = verbaledisopralluogo.Autorizzazione_Zona_Vincolata;
        obj["Autorizzazione_Strade"] = verbaledisopralluogo.Autorizzazione_Strade;
        obj["Autorizzazione_Comune"] = verbaledisopralluogo.Autorizzazione_Comune;
        obj["Autorizzazioni_Altro"] = verbaledisopralluogo.Autorizzazioni_Altro;
        obj["Autorizzazioni_Altro_Note"] = verbaledisopralluogo.Autorizzazioni_Altro_Note;
        
        // Adempimenti Hera
        obj["Seleziona_Ente"] = verbaledisopralluogo.Seleziona_Ente;
        obj["Adempimenti_Altro"] = verbaledisopralluogo.Adempimenti_Altro;
        obj["Adempimenti_Altro_Note"] = verbaledisopralluogo.Adempimenti_Altro_Note;
        obj["Adempimenti_Altro_Stima"] = verbaledisopralluogo.Adempimenti_Altro_Stima;
        
        // Dati schema indicativo
        // obj["Servizio_Opere_1_IMG1"] = verbaledisopralluogo.Servizio_Opere_1_IMG1;
        obj["H_Opere_1_IMG1"] = verbaledisopralluogo.H_Opere_1_IMG1;
        obj["L_Opere_1_IMG1"] = verbaledisopralluogo.L_Opere_1_IMG1;
        obj["P_Opere_1_IMG1"] = verbaledisopralluogo.P_Opere_1_IMG1;
        obj["A_Opere_1_IMG1"] = verbaledisopralluogo.A_Opere_1_IMG1;
        // obj["Servizio_Opere_2_IMG1"] = verbaledisopralluogo.Servizio_Opere_2_IMG1;
        obj["H_Opere_2_IMG1"] = verbaledisopralluogo.H_Opere_2_IMG1;
        obj["L_Opere_2_IMG1"] = verbaledisopralluogo.L_Opere_2_IMG1;
        obj["P_Opere_2_IMG1"] = verbaledisopralluogo.P_Opere_2_IMG1;
        obj["A_Opere_2_IMG1"] = verbaledisopralluogo.A_Opere_2_IMG1;
        // obj["Servizio_Opere_3_IMG1"] = verbaledisopralluogo.Servizio_Opere_3_IMG1;
        obj["H_Opere_3_IMG1"] = verbaledisopralluogo.H_Opere_3_IMG1;
        obj["L_Opere_3_IMG1"] = verbaledisopralluogo.L_Opere_3_IMG1;
        obj["P_Opere_3_IMG1"] = verbaledisopralluogo.P_Opere_3_IMG1;
        obj["A_Opere_3_IMG1"] = verbaledisopralluogo.A_Opere_3_IMG1;
        
        // obj["Servizio_Opere_1_IMG2"] = verbaledisopralluogo.Servizio_Opere_1_IMG2;
        obj["L_Opere_1_IMG2"] = verbaledisopralluogo.L_Opere_1_IMG2;
        obj["P_Opere_1_IMG2"] = verbaledisopralluogo.P_Opere_1_IMG2;
        obj["H_Opere_1_IMG2"] = verbaledisopralluogo.H_Opere_1_IMG2;
        // obj["Servizio_Opere_2_IMG2"] = verbaledisopralluogo.Servizio_Opere_2_IMG2;
        obj["L_Opere_2_IMG2"] = verbaledisopralluogo.L_Opere_2_IMG2;
        obj["P_Opere_2_IMG2"] = verbaledisopralluogo.P_Opere_2_IMG2;
        obj["P_Opere_2_IMG2"] = verbaledisopralluogo.P_Opere_2_IMG2;
        obj["H_Opere_2_IMG2"] = verbaledisopralluogo.H_Opere_2_IMG2;
        // obj["Servizio_Opere_3_IMG2"] = verbaledisopralluogo.Servizio_Opere_3_IMG2;
        obj["L_Opere_3_IMG2"] = verbaledisopralluogo.L_Opere_3_IMG2;
        obj["P_Opere_3_IMG2"] = verbaledisopralluogo.P_Opere_3_IMG2;
        obj["H_Opere_3_IMG2"] = verbaledisopralluogo.H_Opere_3_IMG2;
        
        // Dati fascia di puntualità
        obj["App_Concordato_Data"] = verbaledisopralluogo.App_Concordato_Data;
        obj["App_Concordato_Ora_Inizio"] = verbaledisopralluogo.App_Concordato_Ora_Inizio;
        obj["App_Concordato_Ora_Fine"] = verbaledisopralluogo.App_Concordato_Ora_Fine;
        
        obj["App_Anticipato_Data"] = verbaledisopralluogo.App_Anticipato_Data;
        obj["App_Anticipato_Ora_Inizio"] = verbaledisopralluogo.App_Anticipato_Ora_Inizio;
        obj["App_Anticipato_Ora_Fine"] = verbaledisopralluogo.App_Anticipato_Ora_Fine;
        
        obj["App_Effettivo_Data"] = verbaledisopralluogo.App_Effettivo_Data;
        obj["App_Effettivo_Ora_Inizio"] = verbaledisopralluogo.App_Effettivo_Ora_Inizio;
        
        obj["App_Verificata_Assenza"] = verbaledisopralluogo.App_Verificata_Assenza;
        obj["App_Verificata_Assenza_Data"] = verbaledisopralluogo.App_Verificata_Assenza_Data;
        obj["App_Verificata_Assenza_Ora"] = verbaledisopralluogo.App_Verificata_Assenza_Ora;
        obj["App_Verificata_Assenza_Verificato"] = verbaledisopralluogo.App_Verificata_Assenza_Verificato;
        obj["App_Verificata_Assenza_Forza_Maggiore"] = verbaledisopralluogo.App_Verificata_Assenza_Forza_Maggiore;
        obj["App_Verificata_Assenza_Cliente"] = verbaledisopralluogo.App_Verificata_Assenza_Cliente;
        obj["App_Verificata_Assenza_Gestore"] = verbaledisopralluogo.App_Verificata_Assenza_Gestore;
        obj["App_Verificata_Assenza_Letto_in_Data"] = verbaledisopralluogo.App_Verificata_Assenza_Letto_in_Data;
        obj["App_Firma_Cliente"] = verbaledisopralluogo.App_Firma_Cliente;
        obj["App_Firma_Tecnico"] = verbaledisopralluogo.App_Firma_Tecnico;
        obj["App_Firma_Cliente2"] = verbaledisopralluogo.App_Firma_Cliente2;
        obj["App_Firma_Tecnico2"] = verbaledisopralluogo.App_Firma_Tecnico2;
        obj["Letto_in_Data"] = verbaledisopralluogo.Letto_in_Data;
        obj["Descrizione_note"] = verbaledisopralluogo.Descrizione_note;
        obj["TipoVerbale"] = verbaledisopralluogo.TipoVerbale;
        obj["NoteProgettuali"] = verbaledisopralluogo.NoteProgettuali;
        obj["NoteEsecutive"] = verbaledisopralluogo.NoteEsecutive;
        obj["Calibro_Contatore_4"] = verbaledisopralluogo.Calibro_Contatore_4;
        obj["Calibro_Contatore_5"] = verbaledisopralluogo.Calibro_Contatore_5;
        obj["Calibro_Contatore_6"] = verbaledisopralluogo.Calibro_Contatore_6;
        obj["Sopralluogo_Terminato"] = verbaledisopralluogo.Sopralluogo_Terminato;
        obj["TICA"] = verbaledisopralluogo.TICA;
    
        //DATI DOPPI PER RENAMING?
        obj["A11"] = verbaledisopralluogo.A11;
        obj["A12"] = verbaledisopralluogo.A12;
        obj["A13"] = verbaledisopralluogo.A13;
        obj["AltroNote"] = verbaledisopralluogo.AltroNote;
        obj["AltroTempiStimati"] = verbaledisopralluogo.AltroTempiStimati;
        obj["AppuntamentoAnticipatoData"] = verbaledisopralluogo.AppuntamentoAnticipatoData;
        obj["AppuntamentoAnticipatoOraFine"] = verbaledisopralluogo.AppuntamentoAnticipatoOraFine;
        obj["AppuntamentoAnticipatoOraInizio"] = verbaledisopralluogo.AppuntamentoAnticipatoOraInizio;
        obj["AppuntamentoConcordatoData"] = verbaledisopralluogo.AppuntamentoConcordatoData;
        obj["AppuntamentoConcordatoOraFine"] = verbaledisopralluogo.AppuntamentoConcordatoOraFine;
        obj["AppuntamentoConcordatoOraInizio"] = verbaledisopralluogo.AppuntamentoConcordatoOraInizio;
        obj["AssenzaClienteData"] = verbaledisopralluogo.AssenzaClienteData;
        obj["AssenzaClienteOra"] = verbaledisopralluogo.AssenzaClienteOra;
    
        obj["BarratoLavoro"] = verbaledisopralluogo.BarratoLavoro;
    
        obj["CAPLavoro"] = verbaledisopralluogo.CAPLavoro;
    
        obj["CausaAppuntamentoMancato"] = verbaledisopralluogo.CausaAppuntamentoMancato;
    
        obj["CausaPraticaAnnullata"] = verbaledisopralluogo.CausaPraticaAnnullata;
        obj["CausaPraticaSospesa"] = verbaledisopralluogo.CausaPraticaSospesa;
    
        obj["CivicoLavoro"] = verbaledisopralluogo.CivicoLavoro;
        obj["CodiceClienteRichiedente"] = verbaledisopralluogo.CodiceClienteRichiedente;
        obj["CodiceRintracciabilita"] = verbaledisopralluogo.CodiceRintracciabilita;
        obj["CognomeIncaricato"] = verbaledisopralluogo.CognomeIncaricato;
        obj["CognomeRichiedente"] = verbaledisopralluogo.CognomeRichiedente;
        obj["CognomeTecnicoReferente"] = verbaledisopralluogo.CognomeTecnicoReferente;
        obj["ConsegnatoAllegatoTecnico"] = verbaledisopralluogo.ConsegnatoAllegatoTecnico;
        obj["ContatoriRichiestAcquaUso1"] = verbaledisopralluogo.ContatoriRichiestAcquaUso1;
        obj["ContatoriRichiestiAcquaCalibro1"] = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro1;
        obj["ContatoriRichiestiAcquaCalibro2"] = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro2;
        obj["ContatoriRichiestiAcquaCalibro3"] = verbaledisopralluogo.ContatoriRichiestiAcquaCalibro3;
        obj["ContatoriRichiestiAcquaNumero1"] = verbaledisopralluogo.ContatoriRichiestiAcquaNumero1;
        obj["ContatoriRichiestiAcquaNumero2"] = verbaledisopralluogo.ContatoriRichiestiAcquaNumero2;
        obj["ContatoriRichiestiAcquaNumero3"] = verbaledisopralluogo.ContatoriRichiestiAcquaNumero3;
        obj["ContatoriRichiestiAcquaPortata1"] = verbaledisopralluogo.ContatoriRichiestiAcquaPortata1;
        obj["ContatoriRichiestiAcquaPortata2"] = verbaledisopralluogo.ContatoriRichiestiAcquaPortata2;
        obj["ContatoriRichiestiAcquaPortata3"] = verbaledisopralluogo.ContatoriRichiestiAcquaPortata3;
        obj["ContatoriRichiestiAcquaUso2"] = verbaledisopralluogo.ContatoriRichiestiAcquaUso2;
        obj["ContatoriRichiestiAcquaUso3"] = verbaledisopralluogo.ContatoriRichiestiAcquaUso3;
        obj["ContatoriRichiestiFognaPortataRichiesta1"] = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta1;
        obj["ContatoriRichiestiFognaPortataRichiesta2"] = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta2;
        obj["ContatoriRichiestiFognaPortataRichiesta3"] = verbaledisopralluogo.ContatoriRichiestiFognaPortataRichiesta3;
        obj["ContatoriRichiestiFognaTipo1"] = verbaledisopralluogo.ContatoriRichiestiFognaTipo1;
        obj["ContatoriRichiestiFognaTipo2"] = verbaledisopralluogo.ContatoriRichiestiFognaTipo2;
        obj["ContatoriRichiestiFognaTipo3"] = verbaledisopralluogo.ContatoriRichiestiFognaTipo3;
        obj["ContatoriRichiestiFognaUso1"] = verbaledisopralluogo.ContatoriRichiestiFognaUso1;
        obj["ContatoriRichiestiFognaUso2"] = verbaledisopralluogo.ContatoriRichiestiFognaUso2;
        obj["ContatoriRichiestiFognaUso3"] = verbaledisopralluogo.ContatoriRichiestiFognaUso3;
        obj["ContatoriRichiestiGasEECalibro1"] = verbaledisopralluogo.ContatoriRichiestiGasEECalibro1;
        obj["ContatoriRichiestiGasEECalibro2"] = verbaledisopralluogo.ContatoriRichiestiGasEECalibro2;
        obj["ContatoriRichiestiGasEECalibro3"] = verbaledisopralluogo.ContatoriRichiestiGasEECalibro3;
        obj["ContatoriRichiestiGasEENumero1"] = verbaledisopralluogo.ContatoriRichiestiGasEENumero1;
        obj["ContatoriRichiestiGasEENumero2"] = verbaledisopralluogo.ContatoriRichiestiGasEENumero2;
        obj["ContatoriRichiestiGasEENumero3"] = verbaledisopralluogo.ContatoriRichiestiGasEENumero3;
        obj["ContatoriRichiestiGasEEPotenzaFornita1"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita1;
        obj["ContatoriRichiestiGasEEPotenzaFornita2"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita2;
        obj["ContatoriRichiestiGasEEPotenzaFornita3"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaFornita3;
        obj["ContatoriRichiestiGasEEPotenzaRichiesta1"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta1;
        obj["ContatoriRichiestiGasEEPotenzaRichiesta2"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta2;
        obj["ContatoriRichiestiGasEEPotenzaRichiesta3"] = verbaledisopralluogo.ContatoriRichiestiGasEEPotenzaRichiesta3;
        obj["ContatoriRichiestiGasEEUso1"] = verbaledisopralluogo.ContatoriRichiestiGasEEUso1;
        obj["ContatoriRichiestiGasEEUso2"] = verbaledisopralluogo.ContatoriRichiestiGasEEUso2;
        obj["ContatoriRichiestiGasEEUso3"] = verbaledisopralluogo.ContatoriRichiestiGasEEUso3;
    
        obj["DescrizioneLavoro"] = verbaledisopralluogo.DescrizioneLavoro;
    
        obj["EmailRichiedente"] = verbaledisopralluogo.EmailRichiedente;
    
       // File : this.pdfBase64,
        obj["NomeFile"] = verbaledisopralluogo.NomeFile;
    
        obj["FirmaClienteAppuntamento"] = verbaledisopralluogo.FirmaClienteAppuntamento;
        obj["FirmaTecnicoAppuntamento"] = verbaledisopralluogo.FirmaTecnicoAppuntamento;
    
        obj["H11"] = verbaledisopralluogo.H11;
        obj["H12"] = verbaledisopralluogo.H12;
        obj["H13"] = verbaledisopralluogo.H13;
        obj["H21"] = verbaledisopralluogo.H21;
        obj["H22"] = verbaledisopralluogo.H22;
        obj["H23"] = verbaledisopralluogo.H23;
        obj["InizioEffettivoPrestazioneData"] = verbaledisopralluogo.InizioEffettivoPrestazioneData;
        obj["InizioEffettivoPrestazioneOra"] = verbaledisopralluogo.InizioEffettivoPrestazioneOra;
    
       // InvioRapido : this.InvioRapido,  false
    
       obj["L11"] = verbaledisopralluogo.L11;
       obj["L12"] = verbaledisopralluogo.L12;
       obj["L13"] = verbaledisopralluogo.L13;
       obj["L21"] = verbaledisopralluogo.L21;
       obj["L22"] = verbaledisopralluogo.L22;
       obj["L23"] = verbaledisopralluogo.L23;
       obj["LocalitaLavoro"] = verbaledisopralluogo.LocalitaLavoro;
       obj["MatricoleContatoriEsistenti1"] = verbaledisopralluogo.MatricoleContatoriEsistenti1;
       obj["MatricoleContatoriEsistenti2"] = verbaledisopralluogo.MatricoleContatoriEsistenti2;
       obj["MatricoleContatoriEsistenti3"] = verbaledisopralluogo.MatricoleContatoriEsistenti3;
       obj["MatricoleContatoriEsistenti4"] = verbaledisopralluogo.MatricoleContatoriEsistenti4;
       obj["MatricoleContatoriEsistenti5"] = verbaledisopralluogo.MatricoleContatoriEsistenti5;
       obj["MatricoleContatoriEsistenti6"] = verbaledisopralluogo.MatricoleContatoriEsistenti6;
       obj["MatricoleContatoriEsistenti7"] = verbaledisopralluogo.MatricoleContatoriEsistenti7;
       obj["MatricoleContatoriEsistenti8"] = verbaledisopralluogo.MatricoleContatoriEsistenti8;
       obj["MatricoleContatoriEsistenti9"] = verbaledisopralluogo.MatricoleContatoriEsistenti9;
       obj["MatricoleContatoriEsistenti10"] = verbaledisopralluogo.MatricoleContatoriEsistenti10;
       obj["MatricoleContatoriEsistenti11"] = verbaledisopralluogo.MatricoleContatoriEsistenti11;
       obj["MatricoleContatoriEsistenti12"] = verbaledisopralluogo.MatricoleContatoriEsistenti12;
    
       obj["NomeIncaricato"] = verbaledisopralluogo.NomeIncaricato;
       obj["NomeRichiedente"] = verbaledisopralluogo.NomeRichiedente;
       obj["NomeTecnicoReferente"] = verbaledisopralluogo.NomeTecnicoReferente;
    
       obj["OdL"] = verbaledisopralluogo.OdL;
    
       obj["P11"] = verbaledisopralluogo.P11;
       obj["P12"] = verbaledisopralluogo.P12;
       obj["P13"] = verbaledisopralluogo.P13;
       obj["P21"] = verbaledisopralluogo.P21;
       obj["P22"] = verbaledisopralluogo.P22;
       obj["P23"] = verbaledisopralluogo.P23;
    
       obj["ProvinciaLavoro"] = verbaledisopralluogo.ProvinciaLavoro;
    
       obj["RichiestaAttiAutorizzativi"] = verbaledisopralluogo.RichiestaAttiAutorizzativi;
    
        
    
       obj["RichiesteAggiuntiveDescrizione1"] = verbaledisopralluogo.RichiesteAggiuntiveDescrizione1;
       obj["RichiesteAggiuntiveDescrizione2"] = verbaledisopralluogo.RichiesteAggiuntiveDescrizione2;
       obj["RichiesteAggiuntiveDescrizione3"] = verbaledisopralluogo.RichiesteAggiuntiveDescrizione3;
       obj["RichiesteAggiuntiveTipoRichiesta1"] = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta1;
       obj["RichiesteAggiuntiveTipoRichiesta2"] = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta2;
       obj["RichiesteAggiuntiveTipoRichiesta3"] = verbaledisopralluogo.RichiesteAggiuntiveTipoRichiesta3;
    
    
       obj["Servizio11 "] = verbaledisopralluogo.Servizio11;
       obj["Servizio12"] = verbaledisopralluogo.Servizio12;
       obj["Servizio13"] = verbaledisopralluogo.Servizio13;
       obj["Servizio21"] = verbaledisopralluogo.Servizio21;
       obj["Servizio22"] = verbaledisopralluogo.Servizio22;
       obj["Servizio23"] = verbaledisopralluogo.Servizio23;
    
       obj["SettoreMerceologico"] = verbaledisopralluogo.SettoreMerceologico;
    
       obj["TelefonoIncaricato"] = verbaledisopralluogo.TelefonoIncaricato;
       obj["TelefonoRichiedente"] = verbaledisopralluogo.TelefonoRichiedente;
       obj["TelefonoTecnicoReferente"] = verbaledisopralluogo.TelefonoTecnicoReferente;
       obj["Tica"] = verbaledisopralluogo.Tica;
       obj["ViaLavoro"] = verbaledisopralluogo.ViaLavoro;

        //FINE DATI DOPPI
        
        obj["Path"] = verbaledisopralluogo.Path;
        obj["Img"] = verbaledisopralluogo.Img;
    
        obj["Disegno_Schema"] = verbaledisopralluogo.Disegno_Schema;
        obj["AdeguamentoNicchiaCaricoCliente"] = verbaledisopralluogo.AdeguamentoNicchiaCaricoCliente;
        obj["ConsensoAppuntamentoAnticipatoCliente"] = verbaledisopralluogo.ConsensoAppuntamentoAnticipatoCliente;
        obj["Inviato"] =  verbaledisopralluogo.Inviato;

        obj["AdeguamentoCaricoCliente"] = verbaledisopralluogo.AdeguamentoCaricoCliente;
        obj["AdeguamentiNecessariCliente"] = verbaledisopralluogo.AdeguamentiNecessariCliente;
        obj["PrestazioniCorrelate"] = verbaledisopralluogo.PrestazioniCorrelate;
        
        obj["Note_dinamiche"] = verbaledisopralluogo.Note_dinamiche;
        
        obj["Tipo_Ente"] = verbaledisopralluogo.Tipo_Ente;
        
        return obj;
    }

    static GetRetroImg(ads: Ads) {
        return imgExample.getRetroImg(ads.NomeSettore,ads.CodiceSocieta);
    }

    static GetAlloggiamentoImg(ads: Ads) {
        return imgExample.getAlloggiamentoImg(ads.NomeSettore,ads.CodiceSocieta);
    }

}