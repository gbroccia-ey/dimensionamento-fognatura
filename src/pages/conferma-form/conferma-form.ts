import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import { Ads, Prestazione, SettoreMerceologico, DettaglioMerceologico, CodSocieta } from '../../models/ads';
import { Dictionary } from '../../utils/dictionary';
import { AlertController } from 'ionic-angular';
import { AdsSync } from '../../services/ads-synchronizer';
import { AdsService } from '../../services/ads-service';
import {LogManager } from '../../providers/log-manager/logManager';
import { Params } from '../../config/params';
import { ItemId } from '../../models/queue-item';

/**
 * Generated class for the ConfermaFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-conferma-form',
  templateUrl: 'conferma-form.html',
})
export class ConfermaFormPage {

  attivaLavoroComplesso = true;

  ads: Ads;
  Prestazione: Prestazione;
  itemChecked: number = 0;
  tabella_codici_attivita: Dictionary<string, Object[]> = new Dictionary<string, Object[]>();
  codici_attivita: Object[];
  canChangeCodiceAttivita: boolean = false;
  
  // 2020_B001 Rollout switch
  societyRolloutEnabled: boolean = true;
  // Rollout switches for EE
  numFasiEnabled: boolean = false;
  tipoFornituraEnabled: boolean = false;
  numAttacchiEnabled: boolean = false;
  destinazioneUsoEnabled: boolean = false;
  

  CodiceAttivitaRow: Object;
  SettoreMerceologico = SettoreMerceologico;
  DettaglioMerceologico = DettaglioMerceologico;
  codAttivitaDescr: string;

  infoPotenzaContrRichiestaViewed = false;
  static readonly infoPotenzaContrRichiesta = `
  La potenza richiesta può essere modificata con i seguenti vincoli:
  - PN1 monofase --> variazione concedibile entro 6 kW
  - PN1/PM1 trifase con potenza richiesta entro 30 kW --> variazione concedibile entro 30 kW
  - PN1/PM1 trifase con potenza richiesta maggiore 30 kW --> variazione concedibile entro 200 kW previa verifica della linea"
    `;


  definizioneLavoroGAS = [
    "Real./Modif. allaccio in MP con contatore > G6",
    "Real./Spost. di almeno 5 PdR"
  ];

  definizioneLavoroACQUA = [ 
    "Necessario permesso/autorizzazione da enti o terzi",
    "Interruzione servizio ad utenti diversi dal richiedente",
    "Necessario interventi per adattare alla nuova situazione i parametri idraulici"
  ];

  definizioneLavoroTLR = [
    "Real./Modif./Spost. dell’impianto di allacciamento",
    "Real./Modif./Spost.  sottostazione d’utenza e/o di condotte stradali",
    "Real./Modif./Spost. delle valvole di intercettazione ed eventuali componenti a monte"
  ];

  definizioneLavoroEE = [ 
    "Necessario permesso/autorizzazione da enti o terzi",
    "Interruzione servizio ad utenti diversi dal richiedente",
    "Necessario interventi per adattare alla nuova situazione i parametri idraulici"
  ];


  tipoFornitura;

  WF1140_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"},
  ];
  /*
    {value: "ATTIVAZIONE FORNITURA", key:"A"},
    {value: "DISATTIVAZIONE SU RICHIESTA", key:"D"},
    {value: "RIATTIVAZIONE DA MOROSITA'", key:"R"},
    {value: "VERIFICA", key:"V"},
    {value: "DISATTIVAZIONE PER DELIBERA 40", key:"E"},
    {value: "ATTIVAZIONE PER DELIBERA 40", key:"F"},
    {value: "DISATTIVAZIONE PER MOROSITA'", key:"G"}
  ];
  */

  WF1140_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Riscaldamento centralizzato", key:"8"},
    {value: "Domestico+Riscaldamento centr.o", key:"9"},
    {value: "Uso non domestico", key:"A"}
  ];

  WF1140_tipo_fornitura = [
    {value: "GAS", key: "5"}, 
    {value: "GPL", key:"6"}
  ];

  WF1140_gruppo_riduzione = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];


  WF1100IS_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1100IS_tipologia_intervento = [
    {value: "LAVORO BASE", key:"L"},
    {value: "RIFACIMENTO", key:"R"}
  ];



  WF1181I_tipologia_intervento = [
    {value: "AEREO", key: "A"}, 
    {value: "INTERRATO", key:"I"},
  ];

  WF1100IS_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Riscaldamento centralizzato", key:"8"},
    {value: "Domestico+Riscaldamento centr.o", key:"9"},
    {value: "Uso non domestico", key:"A"}
  ];

  WF1100IS_tipo_fornitura = [
    {value: "GAS", key: "5"}, 
    {value: "GPL", key:"6"}
  ];

  WF1100IS_gruppo_riduzione = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];

  WF1130_gruppo_riduzione = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];


  WF1610_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1610_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Riscaldamento centralizzato", key:"8"},
    {value: "Domestico+Riscaldamento centr.o", key:"9"},
    {value: "Uso non domestico", key:"A"}
  ];

  WF1610_tipo_taglio = [
      {value: "BASE", key: "B"}, 
      {value: "AUTOSCALA", key:"A"},
      {value: "SCAVO", key:"S"},
      {value: "BY-PASS", key:"Y"}
  ];


  WF1610_gruppo_riduzione = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];

  WF1130A_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1130A_tipologia_intervento = [
    {value: "AEREO", key: "A"}, 
    {value: "INTERRATO", key:"I"},
    // {value: "ISTRUTTORIA", key:"T"},
    // {value: "RIFACIMENTO", key:"R"},
    // {value: "LAVORO BASE", key:"L"},
    // {value: "SOSTITUZIONE VALVOLA", key:"S"}
  ];

  WF1130A_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Riscaldamento centralizzato", key:"8"},
    {value: "Domestico+Riscaldamento centr.o", key:"9"},
    {value: "Uso non domestico", key:"A"}
  ];

  WF1170_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1170_tipo_fornitura = [
    {value: "GAS", key: "5"}, 
    {value: "GPL", key:"6"}
  ]; 

  WF1010_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1010_tipo_fornitura = [
    {value: "ACQUEDOTTO CIVILE", key: "1"}, 
    {value: "ACQUEDOTTO INDUSTRIALE", key:"2"},
    {value: "FOGNATURA", key:"3"},
    {value: "DEPURAZIONE", key:"4"},
    {value: "ACQUE METEORICHE", key:"7"}
  ]; 

  WF1010_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Alberghi/pensioni", key:"3"},
    {value: "Ospedali/case di cura/", key:"4"},
    {value: "Antincendio", key:"5"},
    {value: "Attività di intratten. e altro", key:"6"},
    {value: "Completamento allacciamento", key:"7"}
  ]; 

  WF1100LB_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1100LB_tipologia_intervento = [
    {value: "LAVORO BASE", key:"L"},
    {value: "RIFACIMENTO", key:"R"}
  ];

  WF1100LB_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Alberghi/pensioni", key:"3"},
    {value: "Ospedali/case di cura/", key:"4"},
    {value: "Antincendio", key:"5"},
    {value: "Attività di intratten. e altro", key:"6"},
    {value: "Completamento allacciamento", key:"7"}
  ]; 

  WF1100LB_tipo_fornitura = [
    {value: "ACQUEDOTTO CIVILE", key: "1"}, 
    {value: "ACQUEDOTTO INDUSTRIALE", key:"2"},
    {value: "FOGNATURA", key:"3"},
    {value: "DEPURAZIONE", key:"4"},
    {value: "ACQUE METEORICHE", key:"7"}
  ];

  WF1610_ACQUA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1610_ACQUA_tipo_taglio = [
    {value: "BASE", key: "B"}, 
    {value: "AUTOSCALA", key:"A"},
    {value: "SCAVO", key:"S"},
    {value: "BY-PASS", key:"Y"}
  ];

  WF1130A_ACQUA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];
  
  WF1130A_ACQUA_tipologia_intervento = [
    {value: "AEREO", key: "A"}, 
    {value: "INTERRATO", key:"I"}
    
  ];

  WF1170_ACQUA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1170_ACQUA_tipo_fornitura = [
    {value: "ACQUEDOTTO CIVILE", key: "1"}, 
    {value: "ACQUEDOTTO INDUSTRIALE", key:"2"},
    {value: "FOGNATURA", key:"3"},
    {value: "DEPURAZIONE", key:"4"},
    {value: "ACQUE METEORICHE", key:"7"}
  ];

  WF1040_ENERGIA_ELETTRICA_tipo_fornitura = [
    {value: "ALTA TENSIONE", key: "9"}, 
    {value: "BASSA TENSIONE", key:"10"},
    {value: "MEDIA TENSIONE", key:"11"},
    {value: "MT MISURA BT", key:"12"}
  ];

  WF1040_ENERGIA_ELETTRICA_numero_fasi = [
    {value: "230 MONOFASE", key: "M"}, 
    {value: "400 TRIFASE", key:"T"}
  ];

  WF1040_ENERGIA_ELETTRICA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1040_ENERGIA_ELETTRICA_destinazione_uso = [
    {value: "Uso domestico", key: "1"}, 
    {value: "Uso non domestico", key:"A"},
    {value: "DOMES. TEMPORANEE ENTRO 40 kW", key:"B"},
    {value: "NO DOM TEMPOR. <=40kW-CANTIERE", key:"C"},
    {value: "NO DOM TEMPOR. <=40kW-FIERA", key:"D"},
    {value: "NO DOM TEMPOR. >40kW-CANTIERE", key:"E"},
    {value: "Uso condominiale/hobby", key:"F"},
    {value: "Altri usi e nessun uso", key:"G"},
    {value: "0090 Illuminazione pubblica", key:"H"},
    {value: "Usi irrigui non piombati", key:"I"},
    {value: "MANIFESTAZIONI POLITICHE", key:"V"},
    {value: "MANIFESTAZIONI RELIGIOSE", key:"X"}
  ];

  WF1100_ENERGIA_ELETTRICA_tipo_fornitura = [
    {value: "ALTA TENSIONE", key: "9"}, 
    {value: "BASSA TENSIONE", key:"10"},
    {value: "MEDIA TENSIONE", key:"11"},
    {value: "MT MISURA BT", key:"12"}
  ];

  WF1100_ENERGIA_ELETTRICA_numero_fasi = [
    {value: "230 MONOFASE", key: "M"}, 
    {value: "400 TRIFASE", key:"T"}
  ];

  WF1100_ENERGIA_ELETTRICA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1181_ENERGIA_ELETTRICA_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1181_ENERGIA_ELETTRICA_tipo_fornitura = [
    {value: "ALTA TENSIONE", key: "9"}, 
    {value: "BASSA TENSIONE", key:"10"},
    {value: "MEDIA TENSIONE", key:"11"},
    {value: "MT MISURA BT", key:"12"}
  ];

  WF1010_TLR_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1010_TLR_allacciamento_rete = [
    {value: "Primaria", key: "1"}, 
    {value: "Secondaria", key:"2"}
  ];

  WF1010_TLR_allacciamento_cond_mandata = [
    {value: "Mandata", key: "M"}, 
    {value: "Ritorno", key:"R"}
  ];

  WF1010_TLR_temperatura_cond_rit = [
    {value: "Normale", key: "N"}, 
    {value: "Bassa", key:"B"}
  ];

  WF1010_TLR_numero_scambiatori = [

  ];

  WF1100LB_TLR_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1100LB_TLR_tipologia_intervento = [
    {value: "LAVORO BASE", key:"L"},
    {value: "RIFACIMENTO", key:"R"}
  ];

  WF1181_TLR_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  WF1181_TLR_tipologia_intervento = [
    {value: "AEREO", key: "A"}, 
    {value: "INTERRATO", key:"I"},
   
  ];

  WF1170_TLR_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  LAVFAT1150_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  LAVFAT1400_tipo_lavoro = [
    {value: "SEMPLICE", key: "S"}, 
    {value: "COMPLESSO", key:"C"}
  ];

  LAVFAT1400_tipo_fornitura = [
    {value: "ALTA TENSIONE", key: "9"}, 
    {value: "BASSA TENSIONE", key:"10"},
    {value: "MEDIA TENSIONE", key:"11"},
    {value: "MT MISURA BT", key:"12"}
  ];

  LAVFAT1430_tipo_fornitura = [
    {value: "ALTA TENSIONE", key: "9"}, 
    {value: "BASSA TENSIONE", key:"10"},
    {value: "MEDIA TENSIONE", key:"11"},
    {value: "MT MISURA BT", key:"12"}
  ];

  LAVFAT1430_destinazione_uso = [
    {value: "Uso non domestico", key: "A"}, 
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Alberghi/pensioni", key:"3"},
    {value: "Ospedali/case di cura/", key:"4"},
    {value: "Antincendio", key:"5"},
    {value: "Attività di intratten. e altro", key:"6"},
    {value: "Completamento allacciamento", key:"7"}
  ];

  LAVFAT1430_tipo_cessione = [
    {key: "F2", value:	"CESSIONE TOTALE"},
    {key: "F3", value:	"CESSIONE ECCEDENZE VT"},
    {key: "F4", value:	"CESSIONE ECCEDENZE RD"},
    {key: "F5", value:	"SCAMBIO SUL POSTO"},
    {key: "F6", value:	"PRODUZIONE SENZA CESSIONE"}

  ];

  LAVFAT1400_destinazione_uso = [
    {value: "Uso non domestico", key: "A"}, 
    {value: "Uso domestico", key: "1"}, 
    {value: "Stralcio di allac. - Uso cant.", key:"2"},
    {value: "Alberghi/pensioni", key:"3"},
    {value: "Ospedali/case di cura/", key:"4"},
    {value: "Antincendio", key:"5"},
    {value: "Attività di intratten. e altro", key:"6"},
    {value: "Completamento allacciamento", key:"7"}
  ];

  LAVFAT1400_tipo_fonte_primaria = [
    {value: "Rinnovabile-car", key: "1"}, 
    {value: "Convenzionale", key:"2"},
  ];

  LAVFAT1400_fonte_primaria = [
    {key: "E", value: "RINNOV.-CAR - eolico"},
    {key: "F", value:"RINNOV.-CAR - fotovoltaico"},
    {key: "I", value:	"RINNOV.-CAR - idroelettrico"},
    {key: "G", value:	"RINNOV.-CAR - biomasse"},
    {key: "C", value: "RINNOV.-CAR - cog. alto rend."},
    {key: "T", value:	"RINNOV.-CAR - geotermico"},
    {key: "N", value: "CONV. - gas naturale"},
    {key: "D", value:	"CONV. - gas derivati"},
    {key: "P", value:	"CONV. - gas residui di process"},
    {key: "X", value:	"CONV. - gasolio"},
    {key: "U", value:	"CONV. - rifiuti solidi urbani"},
    {key: "A", value:	"CONV. - altri combustibili gas"},
    {key: "B", value:	"CONV. - olio combustibile BTZ"},
    {key: "S", value:	"CONV. - olio combustibile STZ"}

  ];

  LAVFAT1400_lotto = [
    {key: "SI", value: "SI"},
    {key: "NO", value:"NO"},
  ];

  LAVFAT1400_tipo_cessione = [
    {key: "F2", value:	"CESSIONE TOTALE"},
    {key: "F3", value:	"CESSIONE ECCEDENZE VT"},
    {key: "F4", value:	"CESSIONE ECCEDENZE RD"},
    {key: "F5", value:	"SCAMBIO SUL POSTO"},
    {key: "F6", value:	"PRODUZIONE SENZA CESSIONE"}

  ];

  LAVFAT1400_servizi_ausiliari = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];

  LAVFAT1430_tipo_fonte_primaria = [
    {value: "Rinnovabile-car", key: "1"}, 
    {value: "Convenzionale", key:"2"},
  ];

  LAVFAT1430_fonte_primaria = [
    {key: "E", value: "RINNOV.-CAR - eolico"},
    {key: "F", value:"RINNOV.-CAR - fotovoltaico"},
    {key: "I", value:	"RINNOV.-CAR - idroelettrico"},
    {key: "G", value:	"RINNOV.-CAR - biomasse"},
    {key: "C", value: "RINNOV.-CAR - cog. alto rend."},
    {key: "T", value:	"RINNOV.-CAR - geotermico"},
    {key: "N", value: "CONV. - gas naturale"},
    {key: "D", value:	"CONV. - gas derivati"},
    {key: "P", value:	"CONV. - gas residui di process"},
    {key: "X", value:	"CONV. - gasolio"},
    {key: "U", value:	"CONV. - rifiuti solidi urbani"},
    {key: "A", value:	"CONV. - altri combustibili gas"},
    {key: "B", value:	"CONV. - olio combustibile BTZ"},
    {key: "S", value:	"CONV. - olio combustibile STZ"}
  ];
  LAVFAT1430_servizi_ausiliari = [
    {key: "SI", value:	"SI"},
    {key: "NO", value:	"NO"},
  ];
  LAVFAT1430_lotto = [
    {key: "SI", value: "SI"},
    {key: "NO", value:"NO"},
  ];
  LAVFAT1040_tipo_allaccio = [
    {key:"1",value:"Nuovo allaccio"},
    {key:"2",value:"Spostamento con nuovo allaccio"}
  ];

  LAVFAT1040_diametro_fognatura = [
    {key:"DN160",value:"DN160"},
    {key:"DN200",value:"DN200"},
    {key:"DN250",value:"DN250"},
    {key:"DN315",value:"DN315"},
    {key:"DN400",value:"DN400"},
  ]

  LF1631_presa_impulsiva = [
    {key:Params.TipoPresaImpulsiva.AUTOALIMENTATA,value:"Autoalimentata"},
    {key:Params.TipoPresaImpulsiva.ALIMENTATA,value:"Alimentazione da rete elettrica"},
  ]

  LF1631_fornitura_installazione = [
    {key:Params.TipoFornituraInstallazione.CONTESTUALE,value:"Contestuale"},
    {key:Params.TipoFornituraInstallazione.SUCCESSIVA,value:"Successiva"},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public adsSync: AdsSync, public adsService: AdsService,
              public viewCtrl: ViewController, 
              public LogManager: LogManager) {

    //---------------------------------------------------
    //      Definizioni valide per tutte le societa 
    //--------------------------------------------------- 
    this.tabella_codici_attivita.addOrReplace("PN1_GAS", [
        {codice: "WF1140", canchange: true, prodServizio: "LAVFAT1140", checkCounter: 9, checkBoxList: [false, false, false, false, false, false, false, false]},
        {codice: "WF1010", canchange: true, prodServizio: "LAVFAT1010", checkCounter: 9, checkBoxList: [false, false, false, false, false, false, false, false] },
        {codice: "WF1040", canchange: true, prodServizio: "LAVFAT1040", checkCounter: 9, checkBoxList: [false, false, false, false, false, false, false, false] }
      ]);
    this.tabella_codici_attivita.addOrReplace("PM1_GAS", [
        {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false]},
        {codice: "WI1630", canchange: false, prodServizio: "LAVINT1630", checkCounter: 3, checkBoxList: [false, false, false] },
        
        {codice: "WF1100LB", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },
        {codice: "WF1100RA", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },
        {codice: "WF1110LB", canchange: true, prodServizio: "LAVFAT1110", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },
        
        {codice: "WF1130A", canchange: true, prodServizio: "LAVFAT1130", checkCounter: 4, checkBoxList: [false, false, false, false] },
        {codice: "WF1130I", canchange: true, prodServizio: "LAVFAT1130", checkCounter: 4, checkBoxList: [false, false, false, false] },
        {codice: "WF1181A", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 4, checkBoxList: [false, false, false, false] },
        {codice: "WF1181I", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 4, checkBoxList: [false, false, false, false] },
      ]);

    this.tabella_codici_attivita.addOrReplace("PR1_GAS", [
        {codice: "WF1170", canchange: true, prodServizio: "LAVFAT1170", checkCounter: 2, checkBoxList: [false, false] },
        {codice: "WF1070", canchange: true, prodServizio: "LAVFAT1070", checkCounter: 2, checkBoxList: [false, false] },
      ]);

    this.tabella_codici_attivita.addOrReplace("PN1_ACQUA", [
      {codice: "WF1010", canchange: true, prodServizio: "LAVFAT1010", checkCounter: 6, checkBoxList: [false, false, false, false, false, false] },
      {codice: "WF1040", canchange: true, prodServizio: "LAVFAT1040", checkCounter: 7, checkBoxList: [false, false,false, false, false, false, false] },
      {codice: "WF1040A", canchange: true, prodServizio: "LAVFAT1040", checkCounter: 6, checkBoxList: [false, false, false, false, false, false] },
      {codice: "WF1040F", canchange: true, prodServizio: "LAVFAT1040", checkCounter: 7, checkBoxList: [false, false, false, false, false, false, false] },
      {codice: "WF1050", canchange: true, prodServizio: "LAVFAT1050", checkCounter: 6, checkBoxList: [false, false, false, false, false, false] },
      {codice: "WF1140", canchange: true, prodServizio: "LAVFAT1140", checkCounter: 6, checkBoxList: [false, false, false, false, false, false] }
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ACQUA", [
      {codice: "WF1100LB", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 5, checkBoxList: [false, false, false, false, false] },
      {codice: "WF1100RA", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 5, checkBoxList: [false, false, false, false, false] },
      {codice: "WF1110LB", canchange: true, prodServizio: "LAVFAT1110", checkCounter: 5, checkBoxList: [false, false, false, false, false] },
       
      {codice: "WF1130A", canchange: true, prodServizio: "LAVFAT1130", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1130I", canchange: true, prodServizio: "LAVFAT1130", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1181A", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1181I", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 2, checkBoxList: [false, false] },

    ]);

     this.tabella_codici_attivita.addOrReplace("PR1_ACQUA", [
      {codice: "WF1170", canchange: true, prodServizio: "LAVFAT1170" , checkCounter: 2, checkBoxList: [false, false]},
      {codice: "WF1070", canchange: true, prodServizio: "LAVFAT1070" , checkCounter: 2, checkBoxList: [false, false]}
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_FOGNATURA", [
      {codice: "WF1040F", canchange: true, prodServizio: "LAVFAT1040" , checkCounter: 6, checkBoxList: [false,false,false,false,false,false]},
      {codice: "WF1010", canchange: true, prodServizio: "LAVFAT1010" , checkCounter: 4, checkBoxList: [false,false,false, false]}
    ]);

    this.tabella_codici_attivita.addOrReplace("PR1_FOGNATURA", [
      {codice: "WF1070", canchange: true, prodServizio: "LAVFAT1070" , checkCounter: 1, checkBoxList: [false]}
    ]);


    this.societyRolloutEnabled = true; // this.isRolloutEnabled()
    let wf1040_ee_checkCounter_1,wf1040_ee_checkBoxList_1;
    let wf1040_ee_checkCounter_3,wf1040_ee_checkBoxList_3;
    let wf1100_ee_checkCounter,wf1100_ee_checkBoxList;
    
    if (this.societyRolloutEnabled){
      this.numFasiEnabled= false;
      this.tipoFornituraEnabled= false;
      this.numAttacchiEnabled= false;
      this.destinazioneUsoEnabled= false;
      wf1040_ee_checkCounter_1 = 2;
      wf1040_ee_checkBoxList_1 = [false, false];
      wf1040_ee_checkCounter_3 = 2;
      wf1040_ee_checkBoxList_3 = [false, false];
      wf1100_ee_checkCounter = 3;
      wf1100_ee_checkBoxList = [false, false, false];
      
    }
    else {
      this.numFasiEnabled= true;
      this.tipoFornituraEnabled= true;
      this.numAttacchiEnabled= true;
      this.destinazioneUsoEnabled= true;
      wf1040_ee_checkCounter_1 = 6;
      wf1040_ee_checkBoxList_1 = [false, false, false, false, false, false];
      wf1040_ee_checkCounter_3 = 5;
      wf1040_ee_checkBoxList_3 = [false, false, false, false, false];
      wf1100_ee_checkCounter = 4;
      wf1100_ee_checkBoxList = [false, false, false, false];
    }

    this.tabella_codici_attivita.addOrReplace("PN1_ENERGIA_ELETTRICA_1", [
      {codice: "WF1040", canchange: false, prodServizio: "LAVFAT1040", checkCounter: wf1040_ee_checkCounter_1, checkBoxList: wf1040_ee_checkBoxList_1 }
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_ENERGIA_ELETTRICA_2", [
      {codice: "WF1040", canchange: false, prodServizio: "LAVFAT1040", checkCounter: wf1040_ee_checkCounter_1, checkBoxList: wf1040_ee_checkBoxList_1 }
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_ENERGIA_ELETTRICA_3", [
      {codice: "WF1040", canchange: false, prodServizio: "LAVFAT1040", checkCounter: wf1040_ee_checkCounter_3, checkBoxList: wf1040_ee_checkBoxList_3 }
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_ENERGIA_ELETTRICA_4", [
      {codice: "WF1040", canchange: false, prodServizio: "LAVFAT1040", checkCounter: wf1040_ee_checkCounter_3, checkBoxList: wf1040_ee_checkBoxList_3 }
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_ENERGIA_ELETTRICA_5", [
      {codice: "WF1040", canchange: false, prodServizio: "LAVFAT1040", checkCounter: wf1040_ee_checkCounter_3, checkBoxList: 3 }
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_6", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_7", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_8", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_9", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_10", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_14", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1100", canchange: false, prodServizio: "LAVFAT1100", checkCounter: wf1100_ee_checkCounter, checkBoxList: wf1100_ee_checkBoxList },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false] },
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_11", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 1, checkBoxList: [false] }
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_12", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 1, checkBoxList: [false] }
      
    ]); 

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_13", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 1, checkBoxList: [false] }
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_ENERGIA_ELETTRICA_15", [
      {codice: "WF1181", canchange: false, prodServizio: "LAVFAT1181", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1190", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1191", canchange: false, prodServizio: "LAVFAT1190", checkCounter: 1, checkBoxList: [false] },
      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 1, checkBoxList: [false] }
      
    ]);

    this.tabella_codici_attivita.addOrReplace("PN1_TLR", [
      {codice: "WF1010", canchange: true, prodServizio: "LAVFAT1010", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false, false] },
      {codice: "WF1040", canchange: true, prodServizio: "LAVFAT1040", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false, false] },
      {codice: "WF1140", canchange: true, prodServizio: "LAVFAT1140", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false, false] }
    ]);

     this.tabella_codici_attivita.addOrReplace("PM1_TLR", [
      {codice: "WF1100LB", canchange: true, prodServizio: "LAVFAT1100" , checkCounter: 4, checkBoxList: [false, false, false, false] },
      {codice: "WF1110LB", canchange: true, prodServizio: "LAVFAT1110" , checkCounter: 4, checkBoxList: [false, false, false, false] },
      {codice: "WF1181", canchange: true, prodServizio: "LAVFAT1181" , checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1130", canchange: true, prodServizio: "LAVFAT1130" , checkCounter: 3, checkBoxList: [false, false, false] }  
    ]);

     this.tabella_codici_attivita.addOrReplace("PR1_TLR", [
      {codice: "WF1170", canchange: true, prodServizio: "LAVFAT1170", checkCounter: 3, checkBoxList: [false, false, false] },
      {codice: "WF1070", canchange: true, prodServizio: "LAVFAT1070", checkCounter: 3, checkBoxList: [false, false, false] }
    ]);

    this.tabella_codici_attivita.addOrReplace("LAVFAT1150", [
      { codice: '', checkCounter: 1, checkBoxList: [false] }
    ]);

    this.tabella_codici_attivita.addOrReplace("LAVFAT1400", [
      { codice: '', checkCounter: 13, checkBoxList: [] }
    ]);

    this.tabella_codici_attivita.addOrReplace("LAVFAT1430", [
      { codice: '', checkCounter: 9, checkBoxList: [] }
    ]);

    this.tabella_codici_attivita.addOrReplace("PM1_GAS_AAA", [

      {codice: "WF1610", canchange: false, prodServizio: "LAVFAT1610", checkCounter: 3, checkBoxList: [false, false, false]},
      {codice: "WI1630", canchange: false, prodServizio: "LAVINT1630", checkCounter: 3, checkBoxList: [false, false, false] },
        
      {codice: "WF1100LB", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },
      {codice: "WF1100RA", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },
      {codice: "WF1100IS", canchange: true, prodServizio: "LAVFAT1100", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },

      {codice: "WF1110LB", canchange: true, prodServizio: "LAVFAT1110", checkCounter: 8, checkBoxList: [false, false, false, false, false, false, false] },

      /*
  ]);

    this.tabella_codici_attivita.addOrReplace("LAVFAT1130_AAA", [
*/
      {codice: "WF1130", canchange:   true, prodServizio: "LAVFAT1130", checkCounter: 4, checkBoxList: [false, false,  false, false] },
      {codice: "WF1130A", canchange:  true, prodServizio: "LAVFAT1130", checkCounter: 4, checkBoxList: [false, false,  false, false] },
      {codice: "WF1130I", canchange:  true, prodServizio: "LAVFAT1130", checkCounter: 4, checkBoxList: [false, false,  false, false] },

      {codice: "WF1181A", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 4, checkBoxList: [false, false, false, false] },
      {codice: "WF1181I", canchange: true, prodServizio: "LAVFAT1181", checkCounter: 4, checkBoxList: [false, false, false, false] },

      {codice: "LF1631", canchange:   true, prodServizio: "LAVFAT1631", checkCounter: 6, checkBoxList: [false, false,  false, false, false, false] },
    ]);

    

    //---------------------------------------------------
    //      Parametrizzazioni societarie
    //--------------------------------------------------- 


    this.loadData(navParams.data.ads);
    this.tipoFornitura = navParams.data.ads.GetTipoFornituraLabel();
    this.updateCodAttivitaDescr(this.ads.CodiceAttivita); 

  }

  loadData(ads?: any) {

    if(ads) {
      this.ads = ads;
    }

    

    if  ((this.ads.ProdServizio === "LAVFAT1150") ||
        ((this.ads.ProdServizio === "LAVFAT1400" || this.ads.ProdServizio === "LAVFAT1430") && this.ads.SettoreMerceologico === SettoreMerceologico.ENERGIA_ELETTRICA)){
          
          this.canChangeCodiceAttivita = false;
          // TODO: Handle Societa
          this.CodiceAttivitaRow = this.tabella_codici_attivita.get(this.ads.ProdServizio)[0];

      }
      else {

        let prestazioneStr:any = this.ads.Prestazione;
        let key: string = "";
        if(this.ads.SettoreMerceologico === SettoreMerceologico.ENERGIA_ELETTRICA) {

          if(prestazioneStr === Prestazione.E02) {
            prestazioneStr = "PM1";
          }
          if(this.ads.CodiceAttivita === "WF1100") {
            this.ads.TipoPreventivo = 6;
          }
          else if (this.ads.CodiceAttivita === "WF1181" ||
                   this.ads.CodiceAttivita === "WF1190" || this.ads.CodiceAttivita === "WF1191" ||
                   this.ads.CodiceAttivita === "WF1610") {
                    this.ads.TipoPreventivo = 11;
                  }

          key = prestazioneStr + "_" + 
                SettoreMerceologico[this.ads.SettoreMerceologico] + "_" +
                this.ads.TipoPreventivo;
        } else {
          key = prestazioneStr + "_" + SettoreMerceologico[this.ads.SettoreMerceologico];
        }


        if((this.ads.CodiceAttivita === "WF1010" || this.ads.CodiceAttivita === "WF1040F" ||this.ads.CodiceAttivita === "WF1070") && this.ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA) {
            key = prestazioneStr + "_FOGNATURA" ;
        }

        if (this.ads.CodiceSocieta === CodSocieta.AAA && this.ads.SettoreMerceologico === SettoreMerceologico.GAS && this.ads.Prestazione == Prestazione.PM1) {
            key = "PM1_GAS_AAA"
        }
      

        // TODO: Handle Societa
        this.CodiceAttivitaRow = this.getCodiceAttivitaValues(key);
        if(this.CodiceAttivitaRow){
          console.log(`${prestazioneStr}_${SettoreMerceologico[this.ads.SettoreMerceologico]}`);
          this.calcolaClasseContatore();
          this.codici_attivita = this.getCodiciAttivita(key);
          this.codici_attivita.forEach(obj => {
            if(obj["codice"] == this.ads.CodiceAttivita){
              if(this.ads.CodiceOdl) {
                this.canChangeCodiceAttivita = false;
              }
              else if(obj["canchange"] === true){
                  this.canChangeCodiceAttivita = true;
              }
              
              this.ads.ProdServizio = obj["prodServizio"];
              this.ads.Caratteristiche.PdS = obj["prodServizio"];
              
              this.adsService.updateAds(this.ads, {
                  ProdServizio: obj["prodServizio"],
                  CodiceAttivita: this.ads.CodiceAttivita,
                  Caratteristiche: this.ads.Caratteristiche
                  }, () => {}, () => {});
            }
          });

            if(this.ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA && this.ads.Prestazione.toString() == "PN1"){
                this.canChangeCodiceAttivita = true;
            }
            else if(this.ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA){
                this.canChangeCodiceAttivita = false;
            }
          } else {
          
          this.dismiss(undefined);
        }
      }
      
      // set default value for GRUPresente
      if((this.ads.SettoreMerceologico === SettoreMerceologico.GAS) && 
          this.ads.Prestazione && 
          (this.ads.Prestazione.toString() == "PN1" || 
            (this.ads.Prestazione.toString() == "PM1" && (this.ads.ProdServizio == "LAVFAT1100"|| this.ads.ProdServizio == "LAVFAT1110")) )){
        this.ads.Caratteristiche.GRUPresente = 'NO';
      }
   
  }

  ionViewDidLoad() {
    this.LogManager.info("conferma-form - ionViewDidLoad");
  }

  calcolaClasseContatore() {
    this.LogManager.info("conferma-form - calcolaClasseContatore", this.ads.SettoreMerceologico);
    if(this.ads.SettoreMerceologico === SettoreMerceologico.GAS) 
      this.calcolaClasseContatoreGas();
    else if(this.ads.SettoreMerceologico === SettoreMerceologico.ACQUA){
      this.calcolaClasseContatoreAcqua();
    }
  }

   calcolaClasseContatoreGas() {
    var portata = +this.ads.Caratteristiche.PortataContatore;
    this.LogManager.info("conferma-form - calcolaClasseContatoreGas", this.ads.Caratteristiche);
    if(portata) {
      if(portata <= 5.7) {
          this.ads.Caratteristiche.ClasseContatoreCee = "G4";
        }
      if(portata > 5.7 && portata <= 9.5) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G6";
      }
      if(portata > 9.5 && portata <= 15.20) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G10";
      }
      if(portata > 15.20 && portata <= 23.75) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G16";
      }
      if(portata > 23.75 && portata <= 38) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G25";
      }
      if(portata > 38 && portata <= 61.75) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G40";
      }
      if(portata > 61.75 && portata <= 95) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G65";
      }
      if(portata > 95 && portata <= 152) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G100";
      }
      if(portata > 152 && portata <= 237.5) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G160";
      }
      if(portata > 237.5 && portata <= 380) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G250";
      }
      if(portata > 380 && portata <= 617.5) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G400";
      }
      if(portata > 617.5 && portata <= 950) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G650";
      }
      if(portata > 950 && portata <= 1520) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G1000";
      }
      if(portata > 1520 && portata <= 2375) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G1600";
      }
      if(portata > 2375) {
        this.ads.Caratteristiche.ClasseContatoreCee = "G2500";
      }
      
    }
  }

  calcolaClasseContatoreAcqua() {
    var portata = +this.ads.Caratteristiche.PortataContatore;
    this.LogManager.info("conferma-form - calcolaClasseContatoreAcqua", this.ads.Caratteristiche);
    if(portata) {
      if(portata <= 2.5) {
          this.ads.Caratteristiche.ClasseContatoreCee = "3x15";
      }
      if(portata > 2.5 && portata <= 4) {
          this.ads.Caratteristiche.ClasseContatoreCee = "5x20";
      }

      if (this.ads.CodiceSocieta === CodSocieta.AAA){
        if(portata > 4 && portata <= 10) {
          this.ads.Caratteristiche.ClasseContatoreCee = "10x30";
        }  
      }
      else {
        if(portata > 4 && portata <= 6.3) {
          this.ads.Caratteristiche.ClasseContatoreCee = "7x25";
        }  
        if(portata > 6.3 && portata <= 10) {
            this.ads.Caratteristiche.ClasseContatoreCee = "10x30";
        }  
      
      }
      if(portata > 10 && portata <= 16) {
          this.ads.Caratteristiche.ClasseContatoreCee = "20x40";
      }
      if(portata > 16 && portata <= 25) {
          this.ads.Caratteristiche.ClasseContatoreCee = "WV50";
      }
      if(portata > 25 && portata <= 63) {
          this.ads.Caratteristiche.ClasseContatoreCee = "WV80";
      }
      if(portata > 63 && portata <= 100) {
          this.ads.Caratteristiche.ClasseContatoreCee = "WV100";
      }
      if(portata > 100) {
          this.ads.Caratteristiche.ClasseContatoreCee = "WV150";
      }      
    }
  }

 
  codiceAttivitaChanged() {

    this.loadData();
    this.updateCodAttivitaDescr(this.ads.CodiceAttivita);
  }

  updateCodAttivitaDescr(codAtt: string) {
    let codAttDes = Params.codAttivitaDescrizione.find(x => x.codAttivita === codAtt); 
    if(codAttDes){
      this.codAttivitaDescr = codAttDes.label;
      
    }  
  }

  getCodAttivitaDescr(codAtt:string) {
    let codAttDes = Params.codAttivitaDescrizione.find(x => x.codAttivita === codAtt); 
    if(codAttDes){
      return codAttDes.label;
      
    } 
    return ""; 
  }

  getCodiciAttivita(key: string): Object[] {
    this.LogManager.info("conferma-form - getCodiciAttivita", this.ads);
    //return this.tabella_codici_attivita.get(`${this.ads.Prestazione}_${SettoreMerceologico[this.ads.SettoreMerceologico]}`);
    return this.tabella_codici_attivita.get(key);
    
  }

  getCodiceAttivitaValues(key: string): Object {
    this.LogManager.info("conferma-form - getCodiceAttivitaValues", this.ads);
    var row = null;
    try{
      row =  this.tabella_codici_attivita.get(key).find(x => x["codice"] === this.ads.CodiceAttivita);
    }catch(err){
      alert("DATI MANCANTI DA SERVER: IMPOSSIBILE CONFERMARE I DATI TECNICI.");
      return null;
    }
    return row;
  }

  confermaForm() {
    this.LogManager.info("conferma-form - confermaForm", this.ads);

    if(this.ads.Caratteristiche.TipoLavoro != 'C')
      this.ads.Caratteristiche.DefinizioneLavoro = undefined;

    var itemsChecked = 0;
    this.CodiceAttivitaRow["checkBoxList"].forEach(x => {
     if(x === true) {
      itemsChecked++;
     }
   })


   // if(this.CodiceAttivitaRow["checkCounter"] === itemsChecked) {

      let items = {};
      if(String(this.ads.Caratteristiche.NumeroAttacchi) !== "undefined"){
        items["NumeroAttacchi"] = String(this.ads.Caratteristiche.NumeroAttacchi);
      }
      if(String(this.ads.Caratteristiche.PortataContatore) !== "undefined"){
        items["PortataContatore"] = String(this.ads.Caratteristiche.PortataContatore);
      }
      if(String(this.ads.Caratteristiche.ClasseContatoreCee) !== "undefined"){
        items["ClasseContatoreCee"] = String(this.ads.Caratteristiche.ClasseContatoreCee);
      }
      if(String(this.ads.Caratteristiche.TipoLavoro) !== "undefined"){
        items["TipoLavoro"] = String(this.ads.Caratteristiche.TipoLavoro);
      }
      if(String(this.ads.Caratteristiche.PotenzaContrRichiesta) !== "undefined"){
        items["PotenzaContrRichiesta"] = String(this.ads.Caratteristiche.PotenzaContrRichiesta);
      }
      if(String(this.ads.Caratteristiche.NumeroFasi) !== "undefined"){
        items["NumeroFasi"] = String(this.ads.Caratteristiche.NumeroFasi);
      }
      if(String(this.ads.Caratteristiche.AllacciamentoRete) !== "undefined"){
        items["AllacciamentoRete"] = String(this.ads.Caratteristiche.AllacciamentoRete);
      }
      if(String(this.ads.Caratteristiche.AllacciamentoCondMandata) !== "undefined"){
        items["AllacciamentoCondMandata"] = String(this.ads.Caratteristiche.AllacciamentoCondMandata);
      }
      if(String(this.ads.Caratteristiche.TemperaturaCondRit) !== "undefined"){
        items["TemperaturaCondRit"] = String(this.ads.Caratteristiche.TemperaturaCondRit);
      }
      if(String(this.ads.Caratteristiche.NumeroScambiatori) !== "undefined"){
        items["NumeroScambiatori"] = String(this.ads.Caratteristiche.NumeroScambiatori);
      }
      if(String(this.ads.Caratteristiche.TipologiaIntervento) !== "undefined"){
        items["TipologiaIntervento"] = String(this.ads.Caratteristiche.TipologiaIntervento);
      }
      if(String(this.ads.Caratteristiche.TipoTaglio) !== "undefined"){
        items["TipoTaglio"] = String(this.ads.Caratteristiche.TipoTaglio);
      }
      if(String(this.ads.Caratteristiche.FatturazioneParticolare) !== "undefined"){
        items["FatturazioneParticolare"] = String(this.ads.Caratteristiche.FatturazioneParticolare);
      }
      if(String(this.ads.Caratteristiche.TipoFontePrimaria) !== "undefined"){
        items["TipoFontePrimaria"] = String(this.ads.Caratteristiche.TipoFontePrimaria);
      }
      if(String(this.ads.Caratteristiche.FontePrimaria) !== "undefined"){
        items["FontePrimaria"] = String(this.ads.Caratteristiche.FontePrimaria);
      }
      if(String(this.ads.Caratteristiche.Lotto) !== "undefined"){
        items["Lotto"] = String(this.ads.Caratteristiche.Lotto);
      }
      if(String(this.ads.Caratteristiche.NumeroImpianti) !== "undefined"){
        items["NumeroImpianti"] = String(this.ads.Caratteristiche.NumeroImpianti);
      }
      if(String(this.ads.Caratteristiche.NumeroSezioni) !== "undefined"){
        items["NumeroSezioni"] = String(this.ads.Caratteristiche.NumeroSezioni);
      }
      if(String(this.ads.Caratteristiche.PotenzaImmissioneRichiesta) !== "undefined"){
        items["PotenzaImmissioneRichiesta"] = String(this.ads.Caratteristiche.PotenzaImmissioneRichiesta);
      }
      if(String(this.ads.Caratteristiche.PotenzaNominaleRichiesta) !== "undefined"){
        items["PotenzaNominaleRichiesta"] = String(this.ads.Caratteristiche.PotenzaNominaleRichiesta);
      }
      if(String(this.ads.Caratteristiche.PotenzaRichiesta) !== "undefined"){
        items["PotenzaRichiesta"] = String(this.ads.Caratteristiche.PotenzaRichiesta);
      }
      if(String(this.ads.Caratteristiche.TipoCessione) !== "undefined"){
        items["TipoCessione"] = String(this.ads.Caratteristiche.TipoCessione);
      }
      if(String(this.ads.Caratteristiche.ServiziAusiliari) !== "undefined"){
        items["ServiziAusiliari"] = String(this.ads.Caratteristiche.ServiziAusiliari);
      }
      if(String(this.ads.Caratteristiche.PotenzaImmissioneDisponibile) !== "undefined"){
        items["PotenzaImmissioneDisponibile"] = String(this.ads.Caratteristiche.PotenzaImmissioneDisponibile);
      }
      if(String(this.ads.Caratteristiche.PotenzaNominaleDisponibile) !== "undefined"){
        items["PotenzaNominaleDisponibile"] = String(this.ads.Caratteristiche.PotenzaNominaleDisponibile);
      }
      if(String(this.ads.Caratteristiche.PotenzaDisponibilePrelievo) !== "undefined"){
        items["PotenzaDisponibilePrelievo"] = String(this.ads.Caratteristiche.PotenzaDisponibilePrelievo);
      }
      if(String(this.ads.Caratteristiche.AttivitaNormata) !== "undefined"){
        items["AttivitaNormata"] = String(this.ads.Caratteristiche.AttivitaNormata);
      }
      if(String(this.ads.Caratteristiche.DestinazioneUso) !== "undefined"){
        items["Destinazione"] = String(this.ads.Caratteristiche.DestinazioneUso);
      }

      if(String(this.ads.Caratteristiche.TipoAllaccio) !== "undefined"){
        items["TipoAllaccio"] = String(this.ads.Caratteristiche.TipoAllaccio);
      }
      if(String(this.ads.Caratteristiche.Profondita) !== "undefined"){
        items["Profondita"] = String(this.ads.Caratteristiche.Profondita);
      } 
      if(String(this.ads.Caratteristiche.Diametro) !== "undefined"){
        items["Diametro"] = String(this.ads.Caratteristiche.Diametro);
      }

      if(String(this.ads.Caratteristiche.PressioneFornitura) !== "undefined"){
        items["PressioneFornitura"] = String(this.ads.Caratteristiche.PressioneFornitura);
      }

      if(String(this.ads.Caratteristiche.PresaImpulsiva) !== "undefined"){
        items["PresaImpulsiva"] = String(this.ads.Caratteristiche.PresaImpulsiva);
      }

      if(String(this.ads.Caratteristiche.FornituraInstallazione) !== "undefined"){
        items["FornituraInstallazione"] = String(this.ads.Caratteristiche.FornituraInstallazione);
      }


      items["CodiceOdl"] =  this.ads.CodiceOdl;
      items["CodiceAds"] =  this.ads.CodiceAds;
      items["CodiceAttivita"] =  this.ads.CodiceAttivita;
      items["TipoFornitura"] =  ""+this.ads.TipoFornitura;
      items["Prodotto"] =  this.ads.ProdServizio;
     

      
      //TipoFornitura cambia il dettaglio merceologico dell'ads. 
      this.ads.DettaglioMerceologico = +this.ads.TipoFornitura;

      let itemId: ItemId = ItemId.create(this.ads.CodiceAds, this.ads.CodiceOdl);
      
      this.adsSync.execute(itemId, "confPrevProdServ", items
      //{
        
        //NumeroAttacchi: String(this.ads.Caratteristiche.NumeroAttacchi),
        //PortataContatore: String(this.ads.Caratteristiche.PortataContatore), 
        //ClasseContatoreCee: String(this.ads.Caratteristiche.ClasseContatoreCee),
        //TipoLavoro: String(this.ads.Caratteristiche.TipoLavoro),
        //PotenzaContrRichiesta: String(this.ads.Caratteristiche.PotenzaContrRichiesta),
        //NumeroFasi: String(this.ads.Caratteristiche.NumeroFasi),
        //AllacciamentoRete: String(this.ads.Caratteristiche.AllacciamentoRete),
        //AllacciamentoCondMandata: String(this.ads.Caratteristiche.AllacciamentoCondMandata),
        //TemperaturaCondRit: String(this.ads.Caratteristiche.TemperaturaCondRit),
        //NumeroScambiatori: String(this.ads.Caratteristiche.NumeroScambiatori),
        //TipologiaIntervento: String(this.ads.Caratteristiche.TipologiaIntervento),
        //TipoTaglio: String(this.ads.Caratteristiche.TipoTaglio),
        //FatturazioneParticolare: String(this.ads.Caratteristiche.FatturazioneParticolare),
        //TipoFontePrimaria: String(this.ads.Caratteristiche.TipoFontePrimaria),
        //FontePrimaria: String(this.ads.Caratteristiche.FontePrimaria),
        //Lotto: String(this.ads.Caratteristiche.Lotto),
        //NumeroImpianti: String(this.ads.Caratteristiche.NumeroImpianti),
        //NumeroSezioni: String(this.ads.Caratteristiche.NumeroSezioni),
        //PotenzaImmissioneRichiesta: String(this.ads.Caratteristiche.PotenzaImmissioneRichiesta),
        //PotenzaNominaleRichiesta: String(this.ads.Caratteristiche.PotenzaNominaleRichiesta),
        //PotenzaRichiesta: String(this.ads.Caratteristiche.PotenzaRichiesta),
        //TipoCessione: String(this.ads.Caratteristiche.TipoCessione),
        //ServiziAusiliari: String(this.ads.Caratteristiche.ServiziAusiliari),
        //PotenzaImmissioneDisponibile: String(this.ads.Caratteristiche.PotenzaImmissioneDisponibile),
        //PotenzaNominaleDisponibile: String(this.ads.Caratteristiche.PotenzaNominaleDisponibile),
        //PotenzaDisponibilePrelievo: String(this.ads.Caratteristiche.PotenzaDisponibilePrelievo),
        //AttivitaNormata: String(this.ads.Caratteristiche.AttivitaNormata),
        //Destinazione: String(this.ads.Caratteristiche.DestinazioneUso),
        //CodiceOdl: this.ads.CodiceOdl,
        //CodiceAds: this.ads.CodiceAds,
        //CodiceAttivita: this.ads.CodiceAttivita,
        //TipoFornitura: this.ads.TipoFornitura,
        //Prodotto: this.ads.ProdServizio
      //}
    );

	this.ads.ConfermaAvviso = true;
      
      this.adsService.updateAds(this.ads, { 
        Caratteristiche: this.ads.Caratteristiche, 
        DataConfirmed: true,
        ConfermaAvviso: true,
        CodiceAttivita: this.ads.CodiceAttivita, 
        ProdServizio: this.ads.ProdServizio,
        DettaglioMerceologico: this.ads.DettaglioMerceologico
      }, () => {}, () => {});
      
      if(!this.ads.CodiceOdl) {
        let itemId: ItemId = ItemId.create(this.ads.CodiceAds, this.ads.CodiceOdl);
        
        this.adsSync.execute(itemId, "requestOdl", {});
      }
      this.dismiss("OK");

      /*
   }

   else {
      let alert = this.alertCtrl.create({
        title: 'Conferma',
        subTitle: 'Devi spuntare tutte le opzioni visualizzate prima di confermare',
        buttons: ['OK']
      });
      alert.present();
    }
    */
  }

  dismiss(result) {
    if(result === undefined) {
      this.viewCtrl.dismiss();
    }
    else {
      this.viewCtrl.dismiss({ modal_name: "confermaForm" });
    }
    
    this.LogManager.info("conferma-form - dismiss");
  }

  checkDisabled(val) {
    if(val){
      return true;
    }
    return false;
  }

  /*
  checkLavfatAAA() {
    if (this.ads.CodiceSocieta === CodSocieta.AAA &&
        this.ads.SettoreMerceologico === SettoreMerceologico.GAS &&
        ((this.ads.CodiceAttivita === "WF1130") ||
         (this.ads.CodiceAttivita === "WF1130A") ||
         (this.ads.CodiceAttivita === "WF1130I") ||
         (this.ads.CodiceAttivita === "LF1631"))) {
          return true
    } else {
          return false
    }
  }
  */
 
  enableConfirmButton() {
    var found: boolean = true;


    if(this.ads.CodiceAttivita === 'WF1010' && this.ads.TipoFornitura=="3" && SettoreMerceologico[this.ads.SettoreMerceologico] === 'ACQUA'){
      for(var a =0 ; a < 4; a++ ) {
        if(this.CodiceAttivitaRow["checkBoxList"][a] == false) found = false;
      }
    } else
    this.CodiceAttivitaRow["checkBoxList"].forEach(x => {
      if(x === false) {
       found =  false;
      }
    });

    if(this.ads.SettoreMerceologico !== SettoreMerceologico.ENERGIA_ELETTRICA && this.attivaLavoroComplesso && this.ads.Caratteristiche.TipoLavoro == 'C' && ! this.ads.Caratteristiche.DefinizioneLavoro)
      return false; 

    return found;
  }

  isCheckBoxDisabled(property) {
    if(property){
      return true;
    }
    return false;
  }

  isCheckBoxDisabledTL(tipoLavoro, defComplesso) {
    if(tipoLavoro=='C' && !defComplesso ){
      return false;
    }
    if(tipoLavoro){
      return true;
    }
    return false;
  }

  isRolloutEnabled(){
    // TODO: conferma criterio
    //return (this.ads.CodiceSocieta !== CodSocieta.INRETE);
    return true;
  }

  showPotRicContInfo(){
    if (this.infoPotenzaContrRichiestaViewed === false){
      alert(ConfermaFormPage.infoPotenzaContrRichiesta);
      this.infoPotenzaContrRichiestaViewed = true;
    }
  }
}
