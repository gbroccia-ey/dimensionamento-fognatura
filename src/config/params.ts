import { Dictionary } from '../utils/dictionary';
import { SettoreMerceologico } from '../models/ads';

declare var exampleImg : any;

export class Params {

    static debugMode: boolean = false;

    static AllacciamentoCondMandata = [
        {value: "M", label: "Mandata"}, 
        {value: "R", label: "Ritorno"}, 
    ];

    static TempCondRit = [
        {value: "N", label: "Normale"}, 
        {value: "B", label:"Bassa"}
    ];

    static Enti = [
        {key: "M30_1", value: "Giorni 30 : Comune - Denuncia Inizio Attività (DIA)"},
        {key: "M60_1", value: "Giorni 60 : Canale Emiliano Rom. (C.E.R.)"},
        {key: "M60_2", value: "Giorni 60 : Comune - Rottura piano stradale (RSP)"},
        {key: "M60_3", value: "Giorni 60 : Enti Parchi zone protette"},
        {key: "M90_1", value: "Giorni 90 : ARPA"},
        {key: "M90_2", value: "Giorni 90 : Az U.S.L (autorizzazione all'uso potabile)"},
        {key: "M90_3", value: "Giorni 90 : Certificato Prevenzione Incendi (VV.FF)"},
        {key: "M90_4", value: "Giorni 90 : Genio Militare"},
        {key: "M90_5", value: "Giorni 90 : Sovrintendenza Beni Culturali"},
        {key: "M90_6", value: "Giorni 90 : Autorità Portuale Ravenna"},
        {key: "M120_1", value: "Giorni 120 : Bonifica Reno Palata"},
        {key: "M120_2", value: "Giorni 120 : Canale di Reno"},
        {key: "M120_3", value: "Giorni 120 : Comunità Montana"},
        {key: "M120_4", value: "Giorni 120 : Vincolo Idrogeologico"},
        {key: "M120_5", value: "Giorni 120 : ENEL"},
        {key: "M120_6", value: "Giorni 120 : Provincia"},
        {key: "M120_7", value: "Giorni 120 : Consorzio di Bonifica"},
        {key: "M180_1", value: "Giorni 180 : Autorità Bacino Reno"},
        {key: "M180_2", value: "Giorni 180 : Azienda U.S.L."},
        {key: "M180_3", value: "Giorni 180 : Bonifica Renana"},
        {key: "M180_4", value: "Giorni 180 : Comune (Autorizzazione Edilizia e Permesso Costruire)"},
        {key: "M180_5", value: "Giorni 180 : Ferrovia Suburbana F.B.T."},
        {key: "M240_1", value: "Giorni 240 : P.O.L. (Oleodotto Militare) "},
        {key: "M240_2", value: "Giorni 240 : Regione Emilia Romagna "},
        {key: "M360_1", value: "Giorni 360 : ANAS"},
        {key: "M360_2", value: "Giorni 360 : Autostrade"},
        {key: "M360_3", value: "Giorni 360 : Ferrovia Suburbana A.T.C."},
        {key: "M540_1", value: "Giorni 540 : Ferrovie di stato (FF.SS.)"}

    ];

    // PERMESSI
    static ubicazione= ['STRADA', 'MARCIAPIEDI', 'FASCIA LATERALE', 'PARCHEGGIO', 'PISTA CICLABILE', 'PERTINENZA STRADALE', 'BANCHINA STRADALE STERRATA E/O INERBITA', 'AIUOLA E/O AREA VERDE', 'PONTICELLO CARRABILE']
    static manto = ['TRASVERSALE RISPETTO ALL`ASSE STRADALE', 'LONGITUDINALE RISPETTO ALL`ASSE STRADALE', 'PUNTUALE', 'OBLIQUO RISPETTO ALL`ASSE STRADALE', 'IN PROSSIMITA` DI UNA INTERSEZIONE STRADALE']
    static scavo = ['SENZA SCAVO (SENZA RILIEVO)', 'ASFALTO+USURA STR. PROVINCIALE', 'ASFALTO+USURA STR. STATALE', 'ASFALTO+USURA AUT. PORT. RA', 'SENZA SCAVO (CON RILIEVO)', 'CON SCAVO (SENZA RILIEVO)', 'TERRENO VEGETALE', 'STABILIZZATO', 'GHIAIATO', 'MACADAM - NO USURA', 'ASFALTO+USURA STR. COMUNALE', 'LASTRICATO', 'PARTICOLARI - SI USURA', 'ASFALTO PROP.PRIV. - NO USURA', 'SPINGITUBO', 'SPINGITUBO+ASFALTO']

    // DATI RETE
    static valoriAccessibilita = ['Accessibile', 'Non accessibile', 'Parzialmente accessibile']
    static caratteristicheAlloggiamento = ['Esterno muratura', 'Esterno metallico', 'Esterno plastico', 'Interno muratura', 'Interno metallico', 'Interno plastico', 'Vano tecnico interno', 'Non presente', 'Pozzetto']
    static caratteristicaSportello = ['Metallico', 'Plastico', 'Non presente']
    static numChiave = ['12 Grande','12 Piccola','21','Quadra','Altro']
    static sezionamentoMorosita = ['Eseguibile', 'Non eseguibile']
    static flusso = ['Da dx a sx', 'Da sx a dx', 'Reversibile sx-dx']
    static posizione = ['Orizzontale', 'Orizzontale e verticale', 'Verticale']
    static booln = ['si', 'no']

    static codAttivitaDescrizione = 
        [{
            codAttivita: "AF1620",
            label: "APERT. CONT. DEL 40"
        },
        {
            codAttivita: "AF1650/1",
            label: "RIATT. IMP. MOD/TRASF. D.40"
        },
        {
            codAttivita: "AF1650/2",
            label: "APER. CONT + INST DEL 40"
        },
        {
            codAttivita: "AI1020",
            label: "BON. ORDINE SECON. ATTIVAZ."
        },
        {
            codAttivita: "B001",
            label: "BONIFICA RETE"
        },
        {
            codAttivita: "B002",
            label: "BONIFICA CON IMPIANTI"
        },
        {
            codAttivita: "B003",
            label: "BONIFICA ALLACCI"
        },
        {
            codAttivita: "B004",
            label: "BONIFICA IMPIANTI"
        },
        {
            codAttivita: "B005",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "B006",
            label: "ESTENSIONE RETE CON IMPIANTI"
        },
        {
            codAttivita: "B007",
            label: "LAVORI GENERICI DI AREA RETI"
        },
        {
            codAttivita: "B008",
            label: "COSTRUZIONE / AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "B009",
            label: "SPOSTAMENTO RETE CARICO HERA"
        },
        {
            codAttivita: "C001",
            label: "CONDUZIONE AD EVENTO"
        },
        {
            codAttivita: "C002",
            label: "OLD CONDUZIONE PROGRAMMATA"
        },
        {
            codAttivita: "C003",
            label: "ISPEZIONE RETE"
        },
        {
            codAttivita: "E001",
            label: "LAVORI VARI DA FATTURARE"
        },
        {
            codAttivita: "LF1020",
            label: "L - APERTURA CONTATORE CON INSTALLO"
        },
        {
            codAttivita: "LF1090",
            label: "SOST.CON.PARI CAL.FORFAIT"
        },
        {
            codAttivita: "LF1200",
            label: "VER. PRESS/TENSIONE/POTENZA"
        },
        {
            codAttivita: "LF1240",
            label: "INST. CONV. VOL. SU ATTACCO"
        },
        {
            codAttivita: "LF1630",
            label: "PRESA IMPULSIVA AGGIUNTIVA"
        },
        {
            codAttivita: "LF1650",
            label: "L - INSTALLO CONTATORE SOGGETTO DEL40"
        },
        {
            codAttivita: "LI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "LI1090",
            label: "LAVORI GENERICI AREA RETI"
        },
        {
            codAttivita: "LI1130",
            label: "RIMOZ. CORRETT. DI VOLUME"
        },
        {
            codAttivita: "LI1170",
            label: "RIMOZ. CONT. RICH. (HERA)"
        },
        {
            codAttivita: "LI1180",
            label: "RIM. CONT.GROS CALIB (HERA)"
        },
        {
            codAttivita: "LI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "LI1210",
            label: "SOST. CONT. MASSIVA (HERA)"
        },
        {
            codAttivita: "LI1220",
            label: "SOST. CONT. CONCOMITANTE ALTRA ATT. (HERA)"
        },
        {
            codAttivita: "LI1300",
            label: "SOST. CONV. VOLUMI GAS"
        },
        {
            codAttivita: "LI1310",
            label: "RIALLINEAM. CONV. VOL. GAS"
        },
        {
            codAttivita: "LI1320",
            label: "MANUTENZ. CONV. VOLUMI"
        },
        {
            codAttivita: "LI1610",
            label: "INTER. PDR ALLACC MOROSIT?"
        },
        {
            codAttivita: "LI1620",
            label: "INTER. ATTACCO MOROSIT?"
        },
        {
            codAttivita: "LI1700",
            label: "INSTALLAZIONE GATEWAY"
        },
        {
            codAttivita: "LI1710",
            label: "SOSTITUZIONE GATEWAY"
        },
        {
            codAttivita: "LI1720",
            label: "RIMOZIONE GATEWAY"
        },
        {
            codAttivita: "LI1800",
            label: "PRONTO INTERVENTO BEAM"
        },
        {
            codAttivita: "MLF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "MLI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "MLI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "MVI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "MVI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "MVI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "P001",
            label: "L - PI CARICO HERA"
        },
        {
            codAttivita: "P002",
            label: "L - PI CARICO TERZI DA FATTURARE"
        },
        {
            codAttivita: "R004",
            label: "RIL. PARERE SCARICO ACQUE REFLUE"
        },
        {
            codAttivita: "R005",
            label: "RIL. PARERE SCAR. ACQ. REFLUE 30 GG"
        },
        {
            codAttivita: "VF1010",
            label: "V - APERTURA CONTATORE GIÀ INSTALLATO"
        },
        {
            codAttivita: "VF1030",
            label: "APERTURA CONTATORE MOROSO"
        },
        {
            codAttivita: "VF1050",
            label: "CHIUSURA PER MOROSIT?"
        },
        {
            codAttivita: "VF1060",
            label: "CHIUSURA SICUREZZA/ABUSIVO"
        },
        {
            codAttivita: "VF1070",
            label: "V - CHIUSURA CONTATORE"
        },
        {
            codAttivita: "VF1100",
            label: "RIMOZIONE CONT. MOROSIT?"
        },
        {
            codAttivita: "VF1110",
            label: "RIMOZ. CONT. RICH. CLIENTE"
        },
        {
            codAttivita: "VF1120",
            label: "VERIFICA COMPOSIZ. UTENZA"
        },
        {
            codAttivita: "VF1130",
            label: "VER. METROLOGICA (G4 O G6)"
        },
        {
            codAttivita: "VF1140",
            label: "VER. GEN. CONT (DA FATT.)"
        },
        {
            codAttivita: "VF1150",
            label: "VERIFICA CONT. PUNTO UTENZA"
        },
        {
            codAttivita: "VF1160",
            label: "V - LETTURA C/CLIENTE DA FATTURARE"
        },
        {
            codAttivita: "VF1170",
            label: "CHIUSURA PER MANCANZA DDC"
        },
        {
            codAttivita: "VF1180",
            label: "RIATT. FOR. DOPO DDC"
        },
        {
            codAttivita: "VF1210",
            label: "RIAP. DOPO. POTENZ. PERIC."
        },
        {
            codAttivita: "VF1620",
            label: "V - RIATT. IMPIANTO MOD. CON DEL40"
        },
        {
            codAttivita: "VF1650",
            label: "V - RIATT. IMPIANTO MOD. CON DEL40"
        },
        {
            codAttivita: "VF1660",
            label: "V - RIATT. IMPIANTO MOD. CON DEL40"
        },
        {
            codAttivita: "VF1670",
            label: "V - LETTURA SU CONTRATTO APERTO"
        },
        {
            codAttivita: "VF1690",
            label: "MAN GRUP. RIDUZ. CLIENTE"
        },
        {
            codAttivita: "VI1000",
            label: "APER. CONT CHIUSO PER ERR."
        },
        {
            codAttivita: "VI1010",
            label: "CHIUSURA CONT. CARICO HERA"
        },
        {
            codAttivita: "VI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "VI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "VI1050",
            label: "VER. CONSUMI IRREG. (HERA)"
        },
        {
            codAttivita: "VI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "VI1080",
            label: "DISP. DATI TECN. + LETT M01"
        },
        {
            codAttivita: "VI1090",
            label: "DATI TECN. RETI M0A (GDM)"
        },
        {
            codAttivita: "VI1100",
            label: "DIS. ALTRI D. TECN. POD M0A"
        },
        {
            codAttivita: "VI1110",
            label: "VERIF.PREL. NO AUTOR."
        },
        {
            codAttivita: "VI1120",
            label: "VER. INVERSIONE CONTATORI"
        },
        {
            codAttivita: "VI1140",
            label: "RABBOCCO OLIO CONTATORI GAS"
        },
        {
            codAttivita: "VI1150",
            label: "VER. PRESS/TENS/POT. (HERA)"
        },
        {
            codAttivita: "VI1180",
            label: "AP.CONT. P/SPOST.(HERA)"
        },
        {
            codAttivita: "VI1320",
            label: "LETTURA PDR TELELETTO"
        },
        {
            codAttivita: "VI1330",
            label: "VERIFICA CONVERTITORE VOL."
        },
        {
            codAttivita: "VI1340",
            label: "VERIF.PERIODICA CONV.VOLUMI"
        },
        {
            codAttivita: "VI1350",
            label: "VERIF.CAS. CON.VOL. (CCIAA)"
        },
        {
            codAttivita: "VI1400",
            label: "DISALIMENT. GAS ACCESSO CONCORDATO"
        },
        {
            codAttivita: "VI1410",
            label: "DISALIMENT. GAS ACCESSO FORZOSO"
        },
        {
            codAttivita: "VI1420",
            label: "DISALIMENT. GAS ACCESSO IN AUTONOMIA"
        },
        {
            codAttivita: "VI1700",
            label: "RIPROGRAMMAZIONE GATEWAY"
        },
        {
            codAttivita: "WF1010",
            label: "COMPLETAMENTO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1040",
            label: "NUOVO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1060",
            label: "STRALCIO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1070",
            label: "SEZIONAM. ALLACC. INTERRATO"
        },
        {
            codAttivita: "WF1080",
            label: "DIST. TEMP. CONT. + RIPRIST"
        },
        {
            codAttivita: "WF1100LB",
            label: "VAR. PORT/ POT/ AUM. (LAV)"
        },
        {
            codAttivita: "WF1100RA",
            label: "VAR. PORT/ POT/ AUM. (R.A.)"
        },
        {
            codAttivita: "WF1110LB",
            label: "SOST.CONT. DIM. (LAV. BASE)"
        },
        {
            codAttivita: "WF1110VA",
            label: "SOST.CONT. DIM. (ACCESS.)"
        },
        {
            codAttivita: "WF1130A",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ (AEREO)"
        },
        {
            codAttivita: "WF1130I",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ.(INTER.)"
        },
        {
            codAttivita: "WF1140",
            label: "AGGIUNTA ATTACCO"
        },
        {
            codAttivita: "WF1150",
            label: "LAVORI GENERICI CONTO TERZI"
        },
        {
            codAttivita: "WF1160",
            label: "NUOVE LOTTIZZAZIONI"
        },
        {
            codAttivita: "WF1170",
            label: "SOPP. ATT. AER-DIRAM. UTEN."
        },
        {
            codAttivita: "WF1181A",
            label: "SPOS ATT INT-CONF(AEREO)"
        },
        {
            codAttivita: "WF1181I",
            label: "SPOST ATTACCO DALL'INTERNO A CONF. PROPR. (INTER.)"
        },
        {
            codAttivita: "WF1190",
            label: "SPOSTAMENTO RETE"
        },
        {
            codAttivita: "WF1220",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "WF1500",
            label: "EMISS. PARERI SOTTO SOGLIA"
        },
        {
            codAttivita: "WF1510",
            label: "EMISS. PARERI SOPRA SOGLIA"
        },
        {
            codAttivita: "WF1520",
            label: "PREDISPOSIZIONE PREVENTIVO"
        },
        {
            codAttivita: "WF1610",
            label: "RIP. ALLACC. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1620",
            label: "RIP. ATTACCO. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1660",
            label: "TRACCIAT. CAMPO SOTTOSERV."
        },
        {
            codAttivita: "WI1070",
            label: "VER. ALLACC. RETE STRADALE"
        },
        {
            codAttivita: "WI1140",
            label: "EST. RETE NO IMPIANTI DTC"
        },
        {
            codAttivita: "WI1150",
            label: "BONIFICA ALLACCI DTC"
        },
        {
            codAttivita: "WI1630",
            label: "RIP. ALL. INT. (NO MOROSO)"
        },
        {
            codAttivita: "WI1640",
            label: "RIP. ATT.. INT. (NO MOROSO)"
        },
        {
            codAttivita: "X001",
            label: "L - MAN GRUPPI RIDUZIONE+MISURA FISCALE"
        },
        {
            codAttivita: "X002",
            label: "MANUTENZIONE AD EVENTO ORDINARIA"
        },
        {
            codAttivita: "X003",
            label: "MANUTENZIONE AD EVENTO"
        },
        {
            codAttivita: "X004",
            label: "MANUTENZIONE PROGRAMMATA STRAORDINARIA"
        },
        {
            codAttivita: "X005",
            label: "MANUTENZIONE AD EVENTO STRAORDINARIA"
        },
        {
            codAttivita: "X006",
            label: "COSTRUZIONE/AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "X007",
            label: "MANUTENZIONE PROGRAMMATA ORDINARIA"
        },
        {
            codAttivita: "B001",
            label: "RINNOVO RETE E ALTRI ORGANI DI RETE"
        },
        {
            codAttivita: "B002",
            label: "RINNOVO SOLLEVAMENTI-SERBATOI"
        },
        {
            codAttivita: "B003",
            label: "RINNOVO ALLACCI"
        },
        {
            codAttivita: "B004",
            label: "RINNOVO IMPIANTI (NO SOLLEVAMENTI-SERBATOI"
        },
        {
            codAttivita: "B005",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "B006",
            label: "NUOVI/AMPLIAM. SOLLEVAMENTI-SERBATOI"
        },
        {
            codAttivita: "B007",
            label: "LAVORI GENERICI DI AREA RETI"
        },
        {
            codAttivita: "B008",
            label: "NUOVI/AMPLIAM. IMPIANTI (NO SOLLEVAMENTI-SERBATOI)"
        },
        {
            codAttivita: "B009",
            label: "SPOSTAMENTO RETE CARICO HERA"
        },
        {
            codAttivita: "C001",
            label: "CONDUZIONE AD EVENTO"
        },
        {
            codAttivita: "C002",
            label: "OLD CONDUZIONE PROGRAMMATA"
        },
        {
            codAttivita: "C003",
            label: "ISPEZIONE RETE"
        },
        {
            codAttivita: "E001",
            label: "LAVORI VARI DA FATTURARE"
        },
        {
            codAttivita: "EMERGELO",
            label: "SOSTITUZIONE CONTATORE EMERGENZA GELO"
        },
        {
            codAttivita: "LF1020",
            label: "L - APERTURA CONTATORE CON INSTALLO"
        },
        {
            codAttivita: "LF1090",
            label: "SOST.CON.PARI CAL.FORFAIT"
        },
        {
            codAttivita: "LF1200",
            label: "VER. PRESS/TENSIONE/POTENZA"
        },
        {
            codAttivita: "LF1260AC",
            label: "ANTINCENDIO COMPLESSO"
        },
        {
            codAttivita: "LF1260AN",
            label: "ANTINCENDIO NORMALE"
        },
        {
            codAttivita: "LF1260AS",
            label: "ANTINCENDIO SEMPLICE"
        },
        {
            codAttivita: "LF1260FC",
            label: "FOGNATURA COMPLESSO"
        },
        {
            codAttivita: "LF1260FN",
            label: "FOGNATURA NORMALE"
        },
        {
            codAttivita: "LF1260FS",
            label: "FOGNATURA SEMPLICE"
        },
        {
            codAttivita: "LF1630",
            label: "PRESA IMPULSIVA AGGIUNTIVA"
        },
        {
            codAttivita: "LI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "LI1090",
            label: "LAVORI GENERICI AREA RETI"
        },
        {
            codAttivita: "LI1170",
            label: "RIMOZ. CONT. RICH. (HERA)"
        },
        {
            codAttivita: "LI1180",
            label: "RIM. CONT.GROS CALIB (HERA)"
        },
        {
            codAttivita: "LI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "LI1210",
            label: "SOST. CONT. MASSIVA (HERA)"
        },
        {
            codAttivita: "LI1220",
            label: "SOST. CONT. CONCOMITANTE ALTRA ATT. (HERA)"
        },
        {
            codAttivita: "LI1610",
            label: "INTER. PDR ALLACC MOROSIT?"
        },
        {
            codAttivita: "LI1620",
            label: "INTER. ATTACCO MOROSIT?"
        },
        {
            codAttivita: "MLF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "MLI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "MLI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "MVI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "MVI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "MVI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "P001",
            label: "L - PI CARICO HERA"
        },
        {
            codAttivita: "P002",
            label: "L - PI CARICO TERZI DA FATTURARE"
        },
        {
            codAttivita: "R004",
            label: "RIL. PARERE SCARICO REFLUE"
        },
        {
            codAttivita: "R005",
            label: "RIL. PAR. SCAR. REFLUE 30 G"
        },
        {
            codAttivita: "VF1010",
            label: "V - APERTURA CONTATORE GIÀ INSTALLATO"
        },
        {
            codAttivita: "VF1030",
            label: "APERTURA CONTATORE MOROSO"
        },
        {
            codAttivita: "VF1050",
            label: "CHIUSURA PER MOROSIT?"
        },
        {
            codAttivita: "VF1060",
            label: "CHIUSURA SICUREZZA/ABUSIVO"
        },
        {
            codAttivita: "VF1070",
            label: "V - CHIUSURA CONTATORE"
        },
        {
            codAttivita: "VF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "VF1100",
            label: "RIMOZIONE CONT. MOROSIT?"
        },
        {
            codAttivita: "VF1110",
            label: "RIMOZ. CONT. RICH. CLIENTE"
        },
        {
            codAttivita: "VF1120",
            label: "VERIFICA COMPOSIZ. UTENZA"
        },
        {
            codAttivita: "VF1130",
            label: "VER. METROLOGICA"
        },
        {
            codAttivita: "VF1140",
            label: "VER. GEN. CONT (DA FATT.)"
        },
        {
            codAttivita: "VF1160",
            label: "V - LETTURA C/CLIENTE DA FATTURARE"
        },
        {
            codAttivita: "VF1670",
            label: "V - LETTURA SU CONTRATTO APERTO"
        },
        {
            codAttivita: "VI1000",
            label: "APER. CONT CHIUSO PER ERR."
        },
        {
            codAttivita: "VI1010",
            label: "CHIUSURA CONT. CARICO HERA"
        },
        {
            codAttivita: "VI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "VI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "VI1040",
            label: "VERIFICA ROTTURA ACQUA"
        },
        {
            codAttivita: "VI1050",
            label: "VER. CONSUMI IRREG. (HERA)"
        },
        {
            codAttivita: "VI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "VI1070",
            label: "VER. ALLACC. RETE STRADALE"
        },
        {
            codAttivita: "VI1080",
            label: "DISP. DATI TECN. + LETT M01"
        },
        {
            codAttivita: "VI1090",
            label: "V -MESSA DISP. ALTRI DATI TECN. RETI M02"
        },
        {
            codAttivita: "VI1100",
            label: "DIS. ALTRI D. TECN. POD M0A"
        },
        {
            codAttivita: "VI1110",
            label: "VERIF.PREL. NO AUTOR."
        },
        {
            codAttivita: "VI1120",
            label: "VER. INVERSIONE CONTATORI"
        },
        {
            codAttivita: "VI1150",
            label: "VER. PRESS/TENS/POT. (HERA)"
        },
        {
            codAttivita: "VI1170",
            label: "VERIF. BOCCHE ANTIN. (HERA)"
        },
        {
            codAttivita: "VI1360",
            label: "VER. PRES. LEN. CAL. (HERA)"
        },
        {
            codAttivita: "WF1010",
            label: "COMPLETAMENTO ALLAC. (H2O)"
        },
        {
            codAttivita: "WF1040A",
            label: "NUOVO ALLACCIAMENTO (ACQUA)"
        },
        {
            codAttivita: "WF1040F",
            label: "NUOVO ALLACC. (FOGNATURA)"
        },
        {
            codAttivita: "WF1050",
            label: "NUOVO ALLACCIO ANTINCENDIO"
        },
        {
            codAttivita: "WF1070",
            label: "SEZIONAM. ALLACC. INTERRATO"
        },
        {
            codAttivita: "WF1080",
            label: "DIST. TEMP. CONT. + RIPRIST"
        },
        {
            codAttivita: "WF1100LB",
            label: "VAR. PORT/ POT/ AUM. (LAV)"
        },
        {
            codAttivita: "WF1100RA",
            label: "VAR. PORT/ POT/ AUM. (R.A.)"
        },
        {
            codAttivita: "WF1110LB",
            label: "SOST.CONT. DIM. (LAV. BASE)"
        },
        {
            codAttivita: "WF1110VA",
            label: "SOST.CONT. DIM. (ACCESS.)"
        },
        {
            codAttivita: "WF1130A",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ(AEREO)"
        },
        {
            codAttivita: "WF1130I",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ (INTER.)"
        },
        {
            codAttivita: "WF1140",
            label: "AGGIUNTA ATTACCO"
        },
        {
            codAttivita: "WF1150",
            label: "LAVORI GENERICI CONTO TERZI"
        },
        {
            codAttivita: "WF1160",
            label: "NUOVE LOTTIZZAZIONI"
        },
        {
            codAttivita: "WF1170",
            label: "SOPP. ATT. AER-DIRAM. UTEN."
        },
        {
            codAttivita: "WF1181A",
            label: "SPOS ATT INT-CONF (AEREO)"
        },
        {
            codAttivita: "WF1181I",
            label: "SPOS ATT INT-CONF (INTERRA.)"
        },
        {
            codAttivita: "WF1191",
            label: "SPOSTAMENTO RETE"
        },
        {
            codAttivita: "WF1220",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "WF1500",
            label: "EMISS. PARERI SOTTO SOGLIA"
        },
        {
            codAttivita: "WF1510",
            label: "EMISS. PARERI SOPRA SOGLIA"
        },
        {
            codAttivita: "WF1520",
            label: "PREDISPOSIZIONE PREVENTIVO"
        },
        {
            codAttivita: "WF1610",
            label: "RIP. ALLACC. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1620",
            label: "RIP. ATTACCO. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1660",
            label: "TRACC. CAM. SOTTOSER. (H2O)"
        },
        {
            codAttivita: "WI1140",
            label: "EST. RETE NO IMPIANTI DTC"
        },
        {
            codAttivita: "WI1150",
            label: "BONIFICA ALLACCI DTC"
        },
        {
            codAttivita: "WI1630",
            label: "RIP. ALL. INT. (NO MOROSO)"
        },
        {
            codAttivita: "WI1640",
            label: "RIP. ATT.. INT. (NO MOROSO)"
        },
        {
            codAttivita: "X001",
            label: "L - MAN GRUPPI RIDUZIONE+MISURA FISCALE"
        },
        {
            codAttivita: "X002",
            label: "MANUTENZIONE AD EVENTO ORDINARIA"
        },
        {
            codAttivita: "X003",
            label: "MANUTENZIONE AD EVENTO"
        },
        {
            codAttivita: "X004",
            label: "MANUTENZIONE PROGRAMMATA STRAORDINARIA"
        },
        {
            codAttivita: "X005",
            label: "MANUTENZIONE AD EVENTO STRAORDINARIA"
        },
        {
            codAttivita: "X006",
            label: "COSTRUZIONE/AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "X007",
            label: "MANUTENZIONE PROGRAMMATA ORDINARIA"
        },
        {
            codAttivita: "B001",
            label: "BONIFICA RETE"
        },
        {
            codAttivita: "B002",
            label: "BONIFICA CON IMPIANTI"
        },
        {
            codAttivita: "B003",
            label: "BONIFICA ALLACCI"
        },
        {
            codAttivita: "B004",
            label: "BONIFICA IMPIANTI"
        },
        {
            codAttivita: "B005",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "B006",
            label: "ESTENSIONE RETE CON IMPIANTI"
        },
        {
            codAttivita: "B007",
            label: "LAVORI GENERICI DI AREA RETI"
        },
        {
            codAttivita: "B008",
            label: "NUOVI/AMPLIAM IMOSTRUZIONE / AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "B009",
            label: "SPOSTAMENTO RETE CARICO HERA"
        },
        {
            codAttivita: "C001",
            label: "CONDUZIONE AD EVENTO"
        },
        {
            codAttivita: "C002",
            label: "OLD CONDUZIONE PROGRAMMATA"
        },
        {
            codAttivita: "C003",
            label: "ISPEZIONE RETE"
        },
        {
            codAttivita: "E001",
            label: "LAVORI VARI DA FATTURARE"
        },
        {
            codAttivita: "LF1020",
            label: "L - APERTURA CONTATORE CON INSTALLO"
        },
        {
            codAttivita: "LF1090",
            label: "SOST.CON.PARI CAL.FORFAIT"
        },
        {
            codAttivita: "LF1120",
            label: "L - SOST. CONT. AUMENTO POTENZA"
        },
        {
            codAttivita: "LF1200",
            label: "VER. PRESS/TENSIONE/POTENZA"
        },
        {
            codAttivita: "LF1290",
            label: "RIP CONTATORE PER FASCE"
        },
        {
            codAttivita: "LI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "LI1090",
            label: "LAVORI GENERICI AREA RETI"
        },
        {
            codAttivita: "LI1160",
            label: "MANUT.CONCENTRATORI EE"
        },
        {
            codAttivita: "LI1170",
            label: "RIMOZ. CONT. RICH. (HERA)"
        },
        {
            codAttivita: "LI1180",
            label: "RIM. CONT.GROS CALIB (HERA)"
        },
        {
            codAttivita: "LI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "LI1210",
            label: "SOST. CONT. MASSIVA (HERA)"
        },
        {
            codAttivita: "LI1220",
            label: "SOST. CONT. CONCOMITANTE ALTRA ATT. (HERA)"
        },
        {
            codAttivita: "LI1610",
            label: "INTER. PDR ALLACC MOROSIT?"
        },
        {
            codAttivita: "LI1620",
            label: "INTER. ATTACCO MOROSIT?"
        },
        {
            codAttivita: "MLF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "MLI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "MLI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "MVI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "MVI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "MVI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "P001",
            label: "L - PI CARICO HERA"
        },
        {
            codAttivita: "P002",
            label: "L - PI CARICO TERZI DA FATTURARE"
        },
        {
            codAttivita: "R004",
            label: "RIL. PARERE SCARICO ACQUE REFLUE"
        },
        {
            codAttivita: "R005",
            label: "RIL. PARERE SCAR. ACQ. REFLUE 30 GG"
        },
        {
            codAttivita: "VF1010",
            label: "V - APERTURA CONTATORE GIÀ INSTALLATO"
        },
        {
            codAttivita: "VF1030",
            label: "APERTURA CONTATORE MOROSO"
        },
        {
            codAttivita: "VF1050",
            label: "CHIUSURA PER MOROSIT?"
        },
        {
            codAttivita: "VF1060",
            label: "CHIUSURA SICUREZZA/ABUSIVO"
        },
        {
            codAttivita: "VF1070",
            label: "V - CHIUSURA CONTATORE"
        },
        {
            codAttivita: "VF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "VF1100",
            label: "RIMOZIONE CONT. MOROSIT?"
        },
        {
            codAttivita: "VF1110",
            label: "RIMOZ. CONT. RICH. CLIENTE"
        },
        {
            codAttivita: "VF1120",
            label: "VERIFICA COMPOSIZ. UTENZA"
        },
        {
            codAttivita: "VF1140",
            label: "VER. GEN. CONT (DA FATT.)"
        },
        {
            codAttivita: "VF1150",
            label: "VERIFICA CONT. PUNTO UTENZA"
        },
        {
            codAttivita: "VF1160",
            label: "V - LETTURA C/CLIENTE DA FATTURARE"
        },
        {
            codAttivita: "VF1220",
            label: "CHIUSURA DOPO LIM. FORN.EE"
        },
        {
            codAttivita: "VF1670",
            label: "V - LETTURA SU CONTRATTO APERTO"
        },
        {
            codAttivita: "VF1690",
            label: "ASSISTENZA CONTROLLI METROLOGICI"
        },
        {
            codAttivita: "VI1000",
            label: "APER. CONT CHIUSO PER ERR."
        },
        {
            codAttivita: "VI1010",
            label: "CHIUSURA CONT. CARICO HERA"
        },
        {
            codAttivita: "VI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "VI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "VI1050",
            label: "VER. CONSUMI IRREG. (HERA)"
        },
        {
            codAttivita: "VI1060",
            label: "RIPROGRAMMAZIONE"
        },
        {
            codAttivita: "VI1070",
            label: "VER. ALLACC. RETE STRADALE"
        },
        {
            codAttivita: "VI1080",
            label: "DISP. DATI TECN. + LETT M01"
        },
        {
            codAttivita: "VI1090",
            label: "DATI TECN. RETI M0A (GDM)"
        },
        {
            codAttivita: "VI1100",
            label: "DIS. ALTRI D. TECN. POD M0A"
        },
        {
            codAttivita: "VI1110",
            label: "VERIF.PREL. NO AUTOR."
        },
        {
            codAttivita: "VI1120",
            label: "VER. INVERSIONE CONTATORI"
        },
        {
            codAttivita: "VI1130",
            label: "ASSIST.UFF.DOG. VERIF.FOTO."
        },
        {
            codAttivita: "VI1150",
            label: "VER. PRESS/TENS/POT. (HERA)"
        },
        {
            codAttivita: "WF1010",
            label: "COMPLETAMENTO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1040",
            label: "NUOVO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1070",
            label: "SEZIONAM. ALLACC. INTERRATO"
        },
        {
            codAttivita: "WF1080",
            label: "DIST. TEMP. CONT. + RIPRIST"
        },
        {
            codAttivita: "WF1100",
            label: "CAMBIO PORTATA/POTENZA"
        },
        {
            codAttivita: "WF1110",
            label: "SOST.CONT.PARI CALIB."
        },
        {
            codAttivita: "WF1130",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ"
        },
        {
            codAttivita: "WF1150",
            label: "LAVORI GENERICI CONTO TERZI"
        },
        {
            codAttivita: "WF1160",
            label: "NUOVE LOTTIZZAZIONI"
        },
        {
            codAttivita: "WF1170",
            label: "SOPP. ATT. AER-DIRAM. UTEN."
        },
        {
            codAttivita: "WF1181",
            label: "SPOST ALLACCIO CONF. PROPR."
        },
        {
            codAttivita: "WF1190",
            label: "SPOSTAMENTO RETE"
        },
        {
            codAttivita: "WF1220",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "WF1300",
            label: "APERTURA CONT. EE (ANTI TAMPER)"
        },
        {
            codAttivita: "WF1380",
            label: "COSTI AMMINISTR.-FORN.TEMP."
        },
        {
            codAttivita: "WF1400",
            label: "RDC ATTIVA - NUOVO ALLACC."
        },
        {
            codAttivita: "WF1410",
            label: "RDC ATTIVA - SPOSTAM. ALLACC."
        },
        {
            codAttivita: "WF1420",
            label: "RDC ATTIVA - AUMENTO POTENZ"
        },
        {
            codAttivita: "WF1430",
            label: "RDC ATT. SCAMB.EN. ATT/PASS"
        },
        {
            codAttivita: "WF1500",
            label: "EMISS. PARERI SOTTO SOGLIA"
        },
        {
            codAttivita: "WF1510",
            label: "EMISS. PARERI SOPRA SOGLIA"
        },
        {
            codAttivita: "WF1520",
            label: "PREDISPOSIZIONE PREVENTIVO"
        },
        {
            codAttivita: "WF1610",
            label: "RIP. ALLACC. INT. (MOROSO)"
        },
        {
            codAttivita: "WI1140",
            label: "EST. RETE NO IMPIANTI DTC"
        },
        {
            codAttivita: "WI1150",
            label: "BONIFICA ALLACCI DTC"
        },
        {
            codAttivita: "X001",
            label: "L - MAN GRUPPI RIDUZIONE+MISURA FISCALE"
        },
        {
            codAttivita: "X002",
            label: "MANUTENZIONE AD EVENTO ORDINARIA"
        },
        {
            codAttivita: "X003",
            label: "MANUTENZIONE AD EVENTO"
        },
        {
            codAttivita: "X004",
            label: "MANUTENZIONE PROGRAMMATA STRAORDINARIA"
        },
        {
            codAttivita: "X005",
            label: "MANUTENZIONE AD EVENTO STRAORDINARIA"
        },
        {
            codAttivita: "X006",
            label: "COSTRUZIONE/AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "X007",
            label: "MANUTENZIONE PROGRAMMATA ORDINARIA"
        },
        {
            codAttivita: "B001",
            label: "BONIFICA RETE"
        },
        {
            codAttivita: "B002",
            label: "BONIFICA CON IMPIANTI"
        },
        {
            codAttivita: "B003",
            label: "BONIFICA ALLACCI"
        },
        {
            codAttivita: "B004",
            label: "BONIFICA IMPIANTI"
        },
        {
            codAttivita: "B005",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "B006",
            label: "ESTENSIONE RETE CON IMPIANTI"
        },
        {
            codAttivita: "B007",
            label: "LAVORI GENERICI DI AREA RETI"
        },
        {
            codAttivita: "B008",
            label: "COSTRUZIONE / AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "B009",
            label: "SPOSTAMENTO RETE CARICO HERA"
        },
        {
            codAttivita: "C001",
            label: "CONDUZIONE AD EVENTO"
        },
        {
            codAttivita: "C002",
            label: "OLD CONDUZIONE PROGRAMMATA"
        },
        {
            codAttivita: "C003",
            label: "ISPEZIONE RETE"
        },
        {
            codAttivita: "E001",
            label: "LAVORI VARI DA FATTURARE"
        },
        {
            codAttivita: "LF1020",
            label: "L - APERTURA CONTATORE CON INSTALLO"
        },
        {
            codAttivita: "LF1090",
            label: "SOST.CON.PARI CAL.FORFAIT"
        },
        {
            codAttivita: "LF1210",
            label: "VERIFICA PORTATA TELERIS."
        },
        {
            codAttivita: "LF1630",
            label: "PRESA IMPULSIVA AGGIUNTIVA"
        },
        {
            codAttivita: "LI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "LI1090",
            label: "LAVORI GENERICI AREA RETI"
        },
        {
            codAttivita: "LI1170",
            label: "RIMOZ. CONT. RICH. (HERA)"
        },
        {
            codAttivita: "LI1180",
            label: "RIM. CONT.GROS CALIB (HERA)"
        },
        {
            codAttivita: "LI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "LI1210",
            label: "SOST. CONT. MASSIVA (HERA)"
        },
        {
            codAttivita: "LI1220",
            label: "SOST. CONT. CONCOMITANTE ALTRA ATT. (HERA)"
        },
        {
            codAttivita: "LI1610",
            label: "INTER. PDR ALLACC MOROSIT?"
        },
        {
            codAttivita: "LI1620",
            label: "INTER. ATTACCO MOROSIT?"
        },
        {
            codAttivita: "MLF1090",
            label: "LIMITAZ. FORN. (DOMESTICO)"
        },
        {
            codAttivita: "MLI1000",
            label: "SOST CONT PARI CALIB (HERA)"
        },
        {
            codAttivita: "MLI1200",
            label: "SOST. CONT. AD EVENTO (HERA)"
        },
        {
            codAttivita: "MVI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "MVI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "P001",
            label: "L - PI CARICO HERA"
        },
        {
            codAttivita: "P002",
            label: "L - PI CARICO TERZI DA FATTURARE"
        },
        {
            codAttivita: "R004",
            label: "RIL. PARERE SCARICO ACQUE REFLUE"
        },
        {
            codAttivita: "R005",
            label: "RIL. PARERE SCAR. ACQ. REFLUE 30 GG"
        },
        {
            codAttivita: "VF1010",
            label: "V - APERTURA CONTATORE GIÀ INSTALLATO"
        },
        {
            codAttivita: "VF1030",
            label: "APERTURA CONTATORE MOROSO"
        },
        {
            codAttivita: "VF1050",
            label: "CHIUSURA PER MOROSIT?"
        },
        {
            codAttivita: "VF1060",
            label: "CHIUSURA SICUREZZA/ABUSIVO"
        },
        {
            codAttivita: "VF1070",
            label: "V - CHIUSURA CONTATORE"
        },
        {
            codAttivita: "VF1100",
            label: "RIMOZIONE CONT. MOROSIT?"
        },
        {
            codAttivita: "VF1110",
            label: "RIMOZ. CONT. RICH. CLIENTE"
        },
        {
            codAttivita: "VF1120",
            label: "VERIFICA COMPOSIZ. UTENZA"
        },
        {
            codAttivita: "VF1130",
            label: "VER. METROLOGICA"
        },
        {
            codAttivita: "VF1140",
            label: "VER. GEN. CONT (DA FATT.)"
        },
        {
            codAttivita: "VF1150",
            label: "VERIFICA CONT. PUNTO UTENZA"
        },
        {
            codAttivita: "VF1160",
            label: "V - LETTURA C/CLIENTE DA FATTURARE"
        },
        {
            codAttivita: "VF1670",
            label: "V - LETTURA SU CONTRATTO APERTO"
        },
        {
            codAttivita: "VI1000",
            label: "APER. CONT CHIUSO PER ERR."
        },
        {
            codAttivita: "VI1010",
            label: "CHIUSURA CONT. CARICO HERA"
        },
        {
            codAttivita: "VI1020",
            label: "LETTURA"
        },
        {
            codAttivita: "VI1030",
            label: "VER. GENERICA CONT (HERA)"
        },
        {
            codAttivita: "VI1050",
            label: "VER. CONSUMI IRREG. (HERA)"
        },
        {
            codAttivita: "VI1070",
            label: "VER. ALLACC. RETE STRADALE"
        },
        {
            codAttivita: "VI1080",
            label: "DISP. DATI TECN. + LETT M01"
        },
        {
            codAttivita: "VI1090",
            label: "V -MESSA DISP. ALTRI DATI TECN. RETI M02"
        },
        {
            codAttivita: "VI1100",
            label: "DIS. ALTRI D. TECN. POD M0A"
        },
        {
            codAttivita: "VI1110",
            label: "VERIF.PREL. NO AUTOR."
        },
        {
            codAttivita: "VI1120",
            label: "VER. INVERSIONE CONTATORI"
        },
        {
            codAttivita: "VI1160",
            label: "VER. PROT/TEMP TLR (HERA)"
        },
        {
            codAttivita: "WF1010",
            label: "COMPLETAMENTO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1040",
            label: "NUOVO ALLACCIAMENTO"
        },
        {
            codAttivita: "WF1070",
            label: "SEZIONAM. ALLACC. INTERRATO"
        },
        {
            codAttivita: "WF1080",
            label: "DIST. TEMP. CONT. + RIPRIST"
        },
        {
            codAttivita: "WF1100LB",
            label: "VAR. PORT/ POT/ AUM. (LAV)"
        },
        {
            codAttivita: "WF1110LB",
            label: "SOST.CONT. DIM. (LAV. BASE)"
        },
        {
            codAttivita: "WF1110VA",
            label: "SOST.CONT. DIM. (ACCESS.)"
        },
        {
            codAttivita: "WF1130",
            label: "SPOSTAMENTO ATTACCO INTERNO PROPRIETÀ"
        },
        {
            codAttivita: "WF1140",
            label: "AGGIUNTA ATTACCO"
        },
        {
            codAttivita: "WF1150CS",
            label: "CAPP. SU SCAMBIATORE"
        },
        {
            codAttivita: "WF1160",
            label: "NUOVE LOTTIZZAZIONI"
        },
        {
            codAttivita: "WF1170",
            label: "SOPP. ATT. AER-DIRAM. UTEN."
        },
        {
            codAttivita: "WF1181",
            label: "SPOST ALLACCIO CONF. PROPR."
        },
        {
            codAttivita: "WF1190",
            label: "SPOSTAMENTO RETE"
        },
        {
            codAttivita: "WF1220",
            label: "ESTENSIONE RETE"
        },
        {
            codAttivita: "WF1310/1",
            label: "DEMOLIZIONE CALDAIA ESIST."
        },
        {
            codAttivita: "WF1310/2",
            label: "DEMOLIZIONE SOTTOSTAZIONE"
        },
        {
            codAttivita: "WF1340",
            label: "RIFACIM. INTEGR. SOTTOSTAZ."
        },
        {
            codAttivita: "WF1350",
            label: "SPOSTAMENTO SOTTOSTAZIONE"
        },
        {
            codAttivita: "WF1370",
            label: "MODULO SATELLITARE"
        },
        {
            codAttivita: "WF1500",
            label: "EMISS. PARERI SOTTO SOGLIA"
        },
        {
            codAttivita: "WF1510",
            label: "EMISS. PARERI SOPRA SOGLIA"
        },
        {
            codAttivita: "WF1520",
            label: "PREDISPOSIZIONE PREVENTIVO"
        },
        {
            codAttivita: "WF1610",
            label: "RIP. ALLACC. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1620",
            label: "RIP. ATTACCO. INT. (MOROSO)"
        },
        {
            codAttivita: "WF1660",
            label: "TRACCIAT. CAMPO SOTTOSERV."
        },
        {
            codAttivita: "WF1670",
            label: "INST. MIS. FISC MOD. SATELLIT."
        },
        {
            codAttivita: "WI1140",
            label: "EST. RETE NO IMPIANTI DTC"
        },
        {
            codAttivita: "WI1150",
            label: "BONIFICA ALLACCI DTC"
        },
        {
            codAttivita: "WI1630",
            label: "RIP. ALL. INT. (NO MOROSO)"
        },
        {
            codAttivita: "WI1640",
            label: "RIP. ATT.. INT. (NO MOROSO)"
        },
        {
            codAttivita: "X001",
            label: "L - MAN GRUPPI RIDUZIONE+MISURA FISCALE"
        },
        {
            codAttivita: "X002",
            label: "MANUTENZIONE AD EVENTO ORDINARIA"
        },
        {
            codAttivita: "X003",
            label: "MANUTENZIONE AD EVENTO"
        },
        {
            codAttivita: "X004",
            label: "MANUTENZIONE PROGRAMMATA STRAORDINARIA"
        },
        {
            codAttivita: "X005",
            label: "MANUTENZIONE AD EVENTO STRAORDINARIA"
        },
        {
            codAttivita: "X006",
            label: "COSTRUZIONE/AMPLIAMENTO IMPIANTI"
        },
        {
            codAttivita: "X007",
            label: "MANUTENZIONE PROGRAMMATA ORDINARIA"
        }
    ];

    static getTitolo(prod_servizio){
        for(let item of this.prodServizioList){
            if(item.prodServizio==prod_servizio) return item.titolo;
        }
        return "";
    }

    static prodServizioList = [
        { prestazione: "ACQUA", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1050", titolo: "Nuovo allacciamento antincendio"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1010", titolo: "Completamento di allacciamento"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1140", titolo: "Aggiunta attacco"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1260", titolo: "Istruttoria allacciamento"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1130", titolo: "Spostam. attacco interno proprietà"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1181", titolo: "Spostam. attacco a confine proprietà"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1070", titolo: "Sezionamento allacciamento interrato"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1170", titolo: "Soppressione attacco/diramaz. utenza"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1110", titolo: "Variaz. portata/pot./uleq in diminuz."},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1100", titolo: "Variaz. portata/pot./uleq in aumento"},
        { prestazione: "ACQUA", prodServizio: "LAVINT1610", titolo: "Interr. PdR su allaccio per morosità"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1610", titolo: "Ripristino allaccio cliente moroso"},
        { prestazione: "ACQUA", prodServizio: "LAVINT1630", titolo: "Ripristino allaccio nuovo cliente"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1660", titolo: "Tracciatura in campo sottoservizi"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1520", titolo: "Fornitura mappe cartografiche reti"},
        { prestazione: "ACQUA", prodServizio: "LAVPI1010", titolo: "PI carico terzi da fatturare"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1010", titolo: "Attivazione contatore già installato"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1020", titolo: "Attivazione contatore con installo"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1030", titolo: "Riattivazione contatore moroso"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1070", titolo: "Chiusura contatore"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1080", titolo: "Installo cont. rimosso per morosità"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1090", titolo: "Sostituzione contatore pari calibro"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1670", titolo: "Lettura su contatore aperto"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1130", titolo: "Verifica gruppo di misura (laborat.)"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1160", titolo: "Subentro con lettura"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1210", titolo: "Riattiv. su chius. sicurezza/Ord. Aut"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1050", titolo: "Chiusura per morosità"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1090", titolo: "Limitazione fornitura"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1140", titolo: "Verifica contatore"},
        { prestazione: "ACQUA", prodServizio: "VERFAT1120", titolo: "Verifica composizione utenza"},
        { prestazione: "ACQUA", prodServizio: "LAVFAT1200", titolo: "Verifica pressione/tensione"},

        { prestazione: "FOGNA", prodServizio: "LAVFAT1260", titolo: "Istruttoria allacciamento"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1010", titolo: "Completamento di allacciamento"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1070", titolo: "Sezionamento allacciamento interrato"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1660", titolo: "Tracciatura in campo sottoservizi"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1270", titolo: "Ril. parere scarico acque reflue"},
        { prestazione: "FOGNA", prodServizio: "LAVFAT1280", titolo: "Ril. parere scarico acque reflue 30 gg"},
        
        { prestazione: "TLR", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "TLR", prodServizio: "LAVFAT1181", titolo: "Spostam. attacco a confine proprietà"},
        { prestazione: "TLR", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "TLR", prodServizio: "LAVFAT1010", titolo: "Completamento di allacciamento"},
        { prestazione: "TLR", prodServizio: "LAVFAT1320", titolo: "Dem sottostazione"},
        { prestazione: "TLR", prodServizio: "LAVFAT1070", titolo: "Sezionamento allacciamento interrato"},
        { prestazione: "TLR", prodServizio: "LAVFAT1110", titolo: "Variaz. portata/pot./uleq in diminuzione"},
        { prestazione: "TLR", prodServizio: "LAVFAT1100", titolo: "Variaz. portata/pot./uleq in aumento"},
        { prestazione: "TLR", prodServizio: "LAVFAT1370", titolo: "Modulo satellitare"},
        { prestazione: "TLR", prodServizio: "LAVFAT1340", titolo: "Rif. integrale di sottostazione"},
        { prestazione: "TLR", prodServizio: "LAVFAT1350", titolo: "Spost. di sottostazione"},
        { prestazione: "TLR", prodServizio: "LAVFAT1150", titolo: "Lavori generici da fatturare"},
        { prestazione: "TLR", prodServizio: "LAVINT1610", titolo: "Interr. PdR su allaccio per morosità"},
        { prestazione: "TLR", prodServizio: "LAVFAT1610", titolo: "Ripristino allaccio per cliente moroso"},
        { prestazione: "TLR", prodServizio: "LAVINT1630", titolo: "Ripristino allaccio nuovo cliente"},
        { prestazione: "TLR", prodServizio: "LAVFAT1660", titolo: "Tracciatura in campo sottoservizi"},
        { prestazione: "TLR", prodServizio: "LAVFAT1520", titolo: "Fornitura mappe cartografiche reti"},
        { prestazione: "TLR", prodServizio: "VERFAT1010", titolo: "Attivazione contatore già installato"},
        { prestazione: "TLR", prodServizio: "LAVFAT1020", titolo: "Attivazione contatore con installo"},
        { prestazione: "TLR", prodServizio: "VERFAT1030", titolo: "Riattivazione contatore moroso"},
        { prestazione: "TLR", prodServizio: "VERFAT1070", titolo: "Chiusura contatore"},
        { prestazione: "TLR", prodServizio: "VERFAT1080", titolo: "Installo cont. rimosso per morosità"},
        { prestazione: "TLR", prodServizio: "LAVFAT1090", titolo: "Sostituzione contatore pari calibro"},
        { prestazione: "TLR", prodServizio: "VERFAT1670", titolo: "Lettura su contratto aperto"},
        { prestazione: "TLR", prodServizio: "VERFAT1130", titolo: "Verifica gruppo di misura (laborat.)"},
        { prestazione: "TLR", prodServizio: "VERFAT1160", titolo: "Subentro con lettura"},
        { prestazione: "TLR", prodServizio: "VERFAT1210", titolo: "Riattiv. su chius. sicurezza/ord. aut."},
        { prestazione: "TLR", prodServizio: "VERFAT1050", titolo: "Chiusura per morosità"},
        { prestazione: "TLR", prodServizio: "VERFAT1140", titolo: "Verifica contatore"},
        { prestazione: "TLR", prodServizio: "VERFAT1150", titolo: "Taratura conv./Verifica cont. su PdR"},
        { prestazione: "TLR", prodServizio: "LAVFAT1210", titolo: "Verifica portata su PdR"},

        { prestazione: "GAS", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "GAS", prodServizio: "LAVFAT1010", titolo: "Completamento di allacciamento"},
        { prestazione: "GAS", prodServizio: "LAVFAT1140", titolo: "Aggiunta attacco"},
        { prestazione: "GAS", prodServizio: "LAVFAT1130", titolo: "Spostam. attacco interno proprietà"},
        { prestazione: "GAS", prodServizio: "LAVFAT1181", titolo: "Spostam. attacco a confine proprietà"},
        { prestazione: "GAS", prodServizio: "LAVFAT1070", titolo: "Sezionamento allacciamento interrato"},
        { prestazione: "GAS", prodServizio: "LAVFAT1170", titolo: "Soppressione attacco/diramaz. utenza"},
        { prestazione: "GAS", prodServizio: "LAVFAT1110", titolo: "Variaz. portata/pot./uleq in diminuzione"},
        { prestazione: "GAS", prodServizio: "LAVFAT1100", titolo: "Variaz. portata/pot./uleq in aumento"},
        { prestazione: "GAS", prodServizio: "LAVINT1610", titolo: "Interruzione fornitura PdR per morosità"},
        { prestazione: "GAS", prodServizio: "LAVFAT1610", titolo: "Ripristino allaccio cliente moroso"},
        { prestazione: "GAS", prodServizio: "LAVINT1630", titolo: "Ripristino allaccio nuovo cliente"},
        { prestazione: "GAS", prodServizio: "LAVFAT1660", titolo: "Tracciatura in campo sottoservizi"},
        { prestazione: "GAS", prodServizio: "LAVFAT1520", titolo: "Fornitura mappe cartografiche reti"},
        { prestazione: "GAS", prodServizio: "VERFAT1010", titolo: "Attivazione contatore già installato"},
        { prestazione: "GAS", prodServizio: "LAVFAT1020", titolo: "Attivazione contatore con installo"},
        { prestazione: "GAS", prodServizio: "VERFAT1620", titolo: "Attivazione cont. installato con Del.40"},
        { prestazione: "GAS", prodServizio: "LAVFAT1650", titolo: "Attivazione cont. con installo con Del.40"},
        { prestazione: "GAS", prodServizio: "VERFAT1650", titolo: "Riattivazione imp. modif. con Del40"},
        { prestazione: "GAS", prodServizio: "VERFAT1660", titolo: "Riattivazione imp. modif. senza Del40"},
        { prestazione: "GAS", prodServizio: "VERFAT1030", titolo: "Riattivazione contatore moroso"},
        { prestazione: "GAS", prodServizio: "VERFAT1070", titolo: "Chiusura contatore"},
        { prestazione: "GAS", prodServizio: "VERFAT1080", titolo: "Installo cont. rimosso per morosità"},
        { prestazione: "GAS", prodServizio: "VERFAT1670", titolo: "Lettura su contratto aperto"},
        { prestazione: "GAS", prodServizio: "VERFAT1130", titolo: "Verifica gruppo di misura (laborat.)"},
        { prestazione: "GAS", prodServizio: "VERFAT1160", titolo: "Subentro con lettura"},
        { prestazione: "GAS", prodServizio: "VERFAT1210", titolo: "Riattiv. su chius. sicurezza/ord aut"},
        { prestazione: "GAS", prodServizio: "VERFAT1050", titolo: "Chiusura per morosità"},
        { prestazione: "GAS", prodServizio: "LAVFAT1200", titolo: "Verifica pressione/tensione"},
        { prestazione: "GAS", prodServizio: "LAVFAT1090", titolo: "Sostituzione contatori pari calibro"},
        { prestazione: "GAS", prodServizio: "VERFAT1140", titolo: "Verifica contatore"},
        { prestazione: "GAS", prodServizio: "VERFAT1120", titolo: "Verifica composizione utenza"},
        { prestazione: "GAS", prodServizio: "VERFAT1150", titolo: "Taratura conv./Verifica cont. su PdR"},
        { prestazione: "GAS", prodServizio: "VERFAT1170", titolo: "Chiusura per mancanza DDC"},
        { prestazione: "GAS", prodServizio: "VERFAT1180", titolo: "Riattivazione su fornitura dopo DDC"},
        { prestazione: "GAS", prodServizio: "LAVFAT1630", titolo: "Realizz. presa impulsiva agg."},

        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1010", titolo: "Attivazione contatore già installato"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1020", titolo: "Attivazione contatore con installo"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1040", titolo: "Nuovo allacciamento"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1120", titolo: "Sost. cont. aumento potenza"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1100", titolo: "Variaz. portata/Pot./Uleq in aumento"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1380", titolo: "Costi amministrativi-Forn.Temp"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1660", titolo: "Tracciatura in campo sottoservizi"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1520", titolo: "Fornitura mappe cartografiche reti"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1160", titolo: "Subentro con lettura"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1090", titolo: "Limitazione fornitura"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1220", titolo: "Chiusura dopo limitazione forn. EE"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1050", titolo: "Chiusura per morosità"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1030", titolo: "Apertura contatore moroso"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1690", titolo: "Assistenza ai controlli metrologici"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1150", titolo: "Taratura conv./Verifica cont. su PdR"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1200", titolo: "Verifica pressione/tensione"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1181", titolo: "Spostam. attacco a confine proprietà"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1190", titolo: "Spostamento rete da fatturare"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1110", titolo: "Variazione portata/Pot./Uleq in diminuz."},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1630", titolo: "Realizz. presa impulsiva agg."},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1070", titolo: "Chiusura contatore"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1170", titolo: "Soppressione allacciamento"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1400", titolo: "RdC Attiva - nuovo allaccio (stacco POD)"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1430", titolo: "RdC Attiva - Scambio energia att/pass."},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1420", titolo: "RdC Attiva - Aumento potenza"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "LAVFAT1690", titolo: "Spostamento GdM di Produzione"},
        { prestazione: "ENERGIA_ELETTRICA", prodServizio: "VERFAT1615", titolo: "Rimozione GdM di Produzione Cliente"}

    ];

    static TipoPreventivoEE = [
        {label: "Nuova connes. perman. senza attiv. forn.", value: "1"}, 
        {label: "Nuova connes. perman. con attivaz. forn.", value:"2"},
        {label: "Passaggio da MT a BT per conn. perm.", value:"3"},
        {label: "Nuova connes. temp. in BT oltre 40 KW", value: "4"}, 
        {label: "Nuova connes. temp. in MT con attiv. Forn.", value:"5"},
        {label: "Aumento Pot. oltre 50 KW conn. perm. BT", value:"6"},
        {label: "Mod. Conn. Perm. in MT, AT e Altis. Tens.", value: "7"}, 
        {label: "Passaggio da BT a MT conn. perm.", value:"8"},
        {label: "Mod. Conn. Temp. in BT oltre 40 KW", value:"9"},
        {label: "Mod. Conn. Temp. in MT", value:"10"},
    ];
    
    static TipoPreventivoAcqua = [
        {label: "Preventivo nuovo allaccio", value: "1"}, 
        {label: "Preventivo nuovo allaccio con attivazione", value:"2"}
    ];

    static TipologiaIntervento = [
        {label: "AEREO", value: "A"}, 
        {label: "INTERRATO", value:"I"},
        {label: "ISTRUTTORIA", value:"T"},
        {label: "RIFACIMENTO", value:"R"},
        {label: "LAVORO BASE", value:"L"},
        {label: "SOSTITUZIONE VALVOLA", value:"S"}
    ];


    static classiContatore = [{value: "A", label: "Contatore 1"},
                              {value: "B", label: "Contatore 2"}];

    static TipoSpostamento = [{value: "1", label: "Lavoro Interrato"},
                              {value: "2", label: "Parte idraulica o aerea"}];

    static TipoInterruzione = [{value:"Autoscala", label:"Autoscala"},
                               {value:"Bypass", label:"Bypass"},
                               {value:"Scavo", label:"Scavo"},
                               {value:"Base", label:"Base"}];

    static TipoLavoro = [{value: "S", label: "Semplice"},
                         {value: "C", label: "Complesso"},
                         {value: "A", label: "Attivazione Fornitura"},
                         {value: "D", label: "Disattivazione si richiesta"},
                         {value: "R", label: "Riattivazione da morosità"},
                         {value: "V", label: "Verifica"},
                         {value: "E", label: "Disattivazione per delibera 40"},
                         {value: "F", label: "Attivazione per delibera 40"},
                         {value: "G", label: "Disattivazione per morosità"}];

    static TipoTaglio = [ 
                    {label: "BASE", value: "B"}, 
                    {label: "AUTOSCALA", value:"A"},
                    {label: "SCAVO", value:"S"},
                    {label: "BY-PASS", value:"Y"}
    ];

    static PotenzaPrevista = [{ value:0.55, label:"Pot. 0.55 kW"},
                              { value:1.1, label:"Pot. 1.1 kW"},
                              { value:1.65, label:"Pot. 1.65 kW"},
                              { value:2.2, label:"Pot. 2.2 kW"},
                              { value:2.75, label:"Pot. 2.75 kW"},
                              { value:3.3, label:"Pot. 3.3 kW"},
                              { value:3.85, label:"Pot. 3.85 kW"},
                              { value:4.4, label:"Pot. 4.4 kW"},
                              { value:4.95, label:"Pot. 4.95 kW"},
                              { value:5.5, label:"Pot. 5.5 kW"},
                              { value:6.05, label:"Pot. 6.05 kW"},
                              { value:6.6, label:"Pot. 6.6 kW"},
                              { value:7.7, label:"Pot. 7.7 kW"},
                              { value:8.8, label:"Pot. 8.8 kW"},
                              { value:9.9, label:"Pot. 9.9 kW"},
                              { value:11, label:"Pot. 11 kW"},
                              { value:16.5, label:"Pot. 16.5 kW"},
                              { value:22, label:"Pot. 22 kW"},
                              { value:27.5, label:"Pot. 27.5 kW"},
                              { value:33, label:"Pot. 33 kW"},
                              { value:34, label:"Pot. >33 kW"},


    ];

    static Destinazione = [
        {value:"1", label:"Uso domestico"},
        {value:"2", label:"Stralcio di allac. - Uso cant."},
        {value:"3", label:"Alberghi/pensioni"},    
        {value:"4", label:"Ospedali / case di cura"},
        {value:"5", label:"Antincendio"},
        {value:"6", label:"Attività di intratten. e altro"},
        {value:"7", label:"Completamento allacciamento"},
        {value:"8", label:"Riscaldamento centralizzato"},
        {value:"9", label:"Domestico+Riscaldamento centr."},
        {value:"A", label:"Uso non domestico"},
        {value:"B", label:"DOMES. TEMPORANEE ENTRO 40 kW"},
        {value:"C", label:"NO DOM TEMPOR. <=40kW-CANTIERE"},
        {value:"D", label:"NO DOM TEMPOR. <=40kW-FIERA"},
        {value:"E", label:"NO DOM TEMPOR. >40kW-CANTIERE"},
        {value:"F", label:"Uso condominiale/hobby"},
        {value:"G", label:"Altri usi e nessun uso"},
        {value:"H", label:"0090 Illuminazione pubblica"},
        {value:"I", label:"Usi irrigui non piombati"},
        {value:"L", label:"Domestico riscald. Centraliz."},
        {value:"M", label:"Domestico riscald. Individ."},
        {value:"N", label:"Domestico acqua Centraliz."},
        {value:"O", label:"Domestico acqua Individ."},
        {value:"P", label:"Domes. riscald.+acqua Central."},
        {value:"Q", label:"Domes. riscald.+acqua Individ."},
        {value:"R", label:"Extra dom. riscald. Centraliz."},
        {value:"S", label:"Extra dom. acqua Centraliz."},
        {value:"T", label:"Extra dom. riscal.+acq. Centr."},
        {value:"U", label:"Extra dom. raffresc. Centraliz"},
        {value:"V", label:"MANIFESTAZIONI POLITICHE"},
        {value:"X", label:"MANIFESTAZIONI RELIGIOSE"},
        {value:"J", label:"ALTRE MANIFESTAZIONI"},
        {value:"K", label:"LUMINARIE"},
        {value:"Z", label:"LEVIGATURA PAVIMENTI"},
        {value:"Y", label:"MANUNTEZIONE EDIFICI"},
        {value:"W", label:"NO DOM TEMPOR. >40kW-FIERA"}
    ];

    static TipoFontePrimaria = [
        {value:1, label:"RINNOVABILE-CAR"},
        {value:2, label:"CONVENZIONALE"}
    ]

    static FontePrimaria = [

        {value:"E", label:"RINNOV.-CAR - eolico"},
        {value:"F", label:"RINNOV.-CAR - fotovoltaico"},
        {value:"I", label:"RINNOV.-CAR - idroelettrico"},
        {value:"G", label:"RINNOV.-CAR - biomasse"},
        {value:"C", label:"RINNOV.-CAR - cog. alto rend."},
        {value:"T", label:"RINNOV.-CAR - geotermico"},
        {value:"N", label:"CONV. - gas naturale"},
        {value:"D", label:"CONV. - gas derivati"},
        {value:"P", label:"CONV. - gas residui di process"},
        {value:"X", label:"CONV. - gasolio"},
        {value:"U", label:"CONV. - rifiuti solidi urbani"},
        {value:"A", label:"CONV. - altri combustibili gas"},
        {value:"B", label:"CONV. - olio combustibile BTZ"},
        {value:"S", label:"CONV. - olio combustibile STZ"}



    ]

    static TipoCessione = [
        {value:"F2", label:"CESSIONE TOTALE"},
        {value:"F3", label:"CESSIONE ECCEDENZE VT"},
        {value:"F4", label:"CESSIONE ECCEDENZE RD"},
        {value:"F5", label:"SCAMBIO SUL POSTO"},
        {value:"F6", label:"PRODUZIONE SENZA CESSIONE"}	
    ]

    static TipoFornitura = [
        {value:1, label:"ACQUEDOTTO CIVILE"},
        {value:2, label:"ACQUEDOTTO INDUSTRIALE"},
        {value:3, label:"FOGNATURA"},
        {value:4, label:"DEPURAZIONE"},
        {value:5, label:"GAS"},
        {value:6, label:"GPL"},
        {value:7, label:"ACQUE METEORICHE"},
        {value:8, label:"TELERISCALDAMENTO"},
        {value:9, label:"ALTA TENSIONE"},
        {value:10, label:"BASSA TENSIONE"},
        {value:11, label:"MEDIA TENSIONE"},
        {value:12, label:"MT MISURA BT"}
    ]

    static NumeroFasi = [
        {value: "230 MONOFASE", key: "M"}, 
        {value: "400 TRIFASE", key:"T"}
    ]

    static DiametroTubazione = [
        {materiale:'acciaio DN 15 (1/2")', diametro: 16.7,	valore: 1},
        {materiale:'acciaio DN 20 (3/4")', diametro: 21.7,	valore: 2},
        {materiale:'acciaio DN 25 (1")', diametro:27.9,	valore: 3},
        {materiale:'acciaio DN 32 (1"1/4)', diametro:36.6,	valore: 4},
        {materiale:'acciaio DN 40 (1"1/2)', diametro:42.5,	valore: 5},
        {materiale:'acciaio DN 50 (2")', diametro:53.9,	valore: 6},
        {materiale:'acciaio DN 65 (2"1/2)', diametro:69.7,	valore: 7},
        {materiale:'acciaio DN 80 (3")', diametro:82.5,	valore: 8},
        {materiale:'acciaio DN 100 (4")', diametro:107.1,	valore: 9},
        {materiale:'acciaio DN 150 (6")', diametro: 0,	valore: 10},
        {materiale:'acciaio DN 200 (8")', diametro: 0,	valore: 11},
        {materiale:'polietilene DN15 DE20 (1/2")', diametro: 0,	valore: 1},
        {materiale:'polietilene DN20 DE25 (3/4")', diametro:0, valore: 2},
        {materiale:'polietilene DN25 DE32 (1")', diametro:26, valore: 3},
        {materiale:'polietilene DN32 DE40 (1"1/4', diametro:32.6, valore: 4},
        {materiale:'polietilene DN40 DE50 (1"1/2)', diametro:40.8, valore: 5},
        {materiale:'polietilene DN50 DE63 (2")', diametro:51.4,	valore: 6},
        {materiale:'polietilene DN60-65 DE75 (2"1/2)', diametro:61.2, valore: 7},
        {materiale:'polietilene DN80 DE90 (3")', diametro: 0, valore:  8},
        {materiale:'polietilene DN100 DE110 (4")', diametro: 0,	valore: 9},
        {materiale:'polietilene DN150 DE160 (6")', diametro: 0,	valore: 10},
        {materiale:'polietilene DN200 DE210 (8")', diametro: 0,	valore: 11}
    ]

    static foglio1 = [
        
        {A:'7°',b:'ACCIAIO',c:'1',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'2',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'3',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'4',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'5',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'6',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'7',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'8',d:'0',e:'acciaio DN 25 (1")',f:'26,5',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'9',d:'0',e:'acciaio DN 25 (1")',f:'24,8',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'10',d:'0',e:'acciaio DN 25 (1")',f:'23,4',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'11',d:'0',e:'acciaio DN 25 (1")',f:'22,2',g:'acciaio DN 40 (1"1/2)',h:'39,9',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'12',d:'0',e:'acciaio DN 25 (1")',f:'21,2',g:'acciaio DN 40 (1"1/2)',h:'38,3',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'13',d:'0',e:'acciaio DN 25 (1")',f:'20,3',g:'acciaio DN 40 (1"1/2)',h:'36,6',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'14',d:'0',e:'acciaio DN 25 (1")',f:'19,5',g:'acciaio DN 40 (1"1/2)',h:'35,1',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'15',d:'0',e:'acciaio DN 25 (1")',f:'18,8',g:'acciaio DN 40 (1"1/2)',h:'33,8',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'16',d:'0',e:'acciaio DN 25 (1")',f:'18,1',g:'acciaio DN 40 (1"1/2)',h:'32,7',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'17',d:'0',e:'acciaio DN 25 (1")',f:'17,5',g:'acciaio DN 40 (1"1/2)',h:'31,6',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'18',d:'0',e:'acciaio DN 25 (1")',f:'17',g:'acciaio DN 40 (1"1/2)',h:'30,6',i:'acciaio DN 50 (2")',j:'92,5',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'19',d:'0',e:'acciaio DN 25 (1")',f:'16,5',g:'acciaio DN 40 (1"1/2)',h:'29,7',i:'acciaio DN 50 (2")',j:'90,6',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'20',d:'0',e:'acciaio DN 25 (1")',f:'16',g:'acciaio DN 40 (1"1/2)',h:'28,9',i:'acciaio DN 50 (2")',j:'88,1',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'21',d:'0',e:'acciaio DN 25 (1")',f:'15,6',g:'acciaio DN 40 (1"1/2)',h:'28,1',i:'acciaio DN 50 (2")',j:'85,8',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'22',d:'0',e:'acciaio DN 25 (1")',f:'15,2',g:'acciaio DN 40 (1"1/2)',h:'28,5',i:'acciaio DN 50 (2")',j:'83,6',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'23',d:'0',e:'acciaio DN 25 (1")',f:'14,8',g:'acciaio DN 40 (1"1/2)',h:'27,8',i:'acciaio DN 50 (2")',j:'81,6',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'24',d:'0',e:'acciaio DN 25 (1")',f:'14,5',g:'acciaio DN 40 (1"1/2)',h:'27,2',i:'acciaio DN 50 (2")',j:'79,7',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'25',d:'0',e:'acciaio DN 25 (1")',f:'14,2',g:'acciaio DN 40 (1"1/2)',h:'26,6',i:'acciaio DN 50 (2")',j:'77,9',k:'acciaio DN 80 (3")',l:'159,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'26',d:'0',e:'acciaio DN 25 (1")',f:'13,9',g:'acciaio DN 40 (1"1/2)',h:'26',i:'acciaio DN 50 (2")',j:'76,3',k:'acciaio DN 80 (3")',l:'157,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'27',d:'0',e:'acciaio DN 25 (1")',f:'13,6',g:'acciaio DN 40 (1"1/2)',h:'25,5',i:'acciaio DN 50 (2")',j:'74,7',k:'acciaio DN 80 (3")',l:'154',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'28',d:'0',e:'acciaio DN 25 (1")',f:'13,3',g:'acciaio DN 40 (1"1/2)',h:'25',i:'acciaio DN 50 (2")',j:'73,2',k:'acciaio DN 80 (3")',l:'150,9',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'29',d:'0',e:'acciaio DN 25 (1")',f:'13,1',g:'acciaio DN 40 (1"1/2)',h:'24,5',i:'acciaio DN 50 (2")',j:'71,8',k:'acciaio DN 80 (3")',l:'148',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'30',d:'0',e:'acciaio DN 25 (1")',f:'12,8',g:'acciaio DN 40 (1"1/2)',h:'24,1',i:'acciaio DN 50 (2")',j:'70,5',k:'acciaio DN 80 (3")',l:'145,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'31',d:'0',e:'acciaio DN 25 (1")',f:'12,6',g:'acciaio DN 40 (1"1/2)',h:'23,6',i:'acciaio DN 50 (2")',j:'69,3',k:'acciaio DN 80 (3")',l:'142,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'32',d:'0',e:'acciaio DN 25 (1")',f:'12,4',g:'acciaio DN 40 (1"1/2)',h:'23,2',i:'acciaio DN 50 (2")',j:'68,1',k:'acciaio DN 80 (3")',l:'140,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'33',d:'0',e:'acciaio DN 25 (1")',f:'12,2',g:'acciaio DN 40 (1"1/2)',h:'22,8',i:'acciaio DN 50 (2")',j:'66,9',k:'acciaio DN 80 (3")',l:'137,9',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'34',d:'0',e:'acciaio DN 25 (1")',f:'12',g:'acciaio DN 40 (1"1/2)',h:'22,5',i:'acciaio DN 50 (2")',j:'65,8',k:'acciaio DN 80 (3")',l:'135,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'35',d:'0',e:'acciaio DN 25 (1")',f:'11,8',g:'acciaio DN 40 (1"1/2)',h:'22,1',i:'acciaio DN 50 (2")',j:'64,8',k:'acciaio DN 80 (3")',l:'133,5',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'36',d:'0',e:'acciaio DN 25 (1")',f:'11,6',g:'acciaio DN 40 (1"1/2)',h:'21,8',i:'acciaio DN 50 (2")',j:'63,8',k:'acciaio DN 80 (3")',l:'131,5',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'37',d:'0',e:'acciaio DN 25 (1")',f:'11,4',g:'acciaio DN 40 (1"1/2)',h:'21,4',i:'acciaio DN 50 (2")',j:'62,8',k:'acciaio DN 80 (3")',l:'129,5',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'38',d:'0',e:'acciaio DN 25 (1")',f:'11,3',g:'acciaio DN 40 (1"1/2)',h:'21,1',i:'acciaio DN 50 (2")',j:'61,9',k:'acciaio DN 80 (3")',l:'127,6',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'39',d:'0',e:'acciaio DN 25 (1")',f:'11,1',g:'acciaio DN 40 (1"1/2)',h:'20,8',i:'acciaio DN 50 (2")',j:'61',k:'acciaio DN 80 (3")',l:'125,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'40',d:'0',e:'acciaio DN 25 (1")',f:'10,9',g:'acciaio DN 40 (1"1/2)',h:'20,5',i:'acciaio DN 50 (2")',j:'60,2',k:'acciaio DN 80 (3")',l:'124,1',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'41',d:'0',e:'acciaio DN 25 (1")',f:'10,8',g:'acciaio DN 40 (1"1/2)',h:'19,5',i:'acciaio DN 50 (2")',j:'59,4',k:'acciaio DN 80 (3")',l:'122,4',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'42',d:'0',e:'acciaio DN 25 (1")',f:'10,7',g:'acciaio DN 40 (1"1/2)',h:'19,2',i:'acciaio DN 50 (2")',j:'58,6',k:'acciaio DN 80 (3")',l:'120,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'43',d:'0',e:'acciaio DN 25 (1")',f:'10,5',g:'acciaio DN 40 (1"1/2)',h:'19',i:'acciaio DN 50 (2")',j:'57,9',k:'acciaio DN 80 (3")',l:'119,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'44',d:'0',e:'acciaio DN 25 (1")',f:'10,4',g:'acciaio DN 40 (1"1/2)',h:'18,7',i:'acciaio DN 50 (2")',j:'57,1',k:'acciaio DN 80 (3")',l:'117,7',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'45',d:'0',e:'acciaio DN 25 (1")',f:'10,3',g:'acciaio DN 40 (1"1/2)',h:'18,5',i:'acciaio DN 50 (2")',j:'56,4',k:'acciaio DN 80 (3")',l:'116,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'46',d:'0',e:'acciaio DN 25 (1")',f:'10,1',g:'acciaio DN 40 (1"1/2)',h:'18,3',i:'acciaio DN 50 (2")',j:'55,8',k:'acciaio DN 80 (3")',l:'114,9',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'47',d:'0',e:'acciaio DN 25 (1")',f:'10',g:'acciaio DN 40 (1"1/2)',h:'18,1',i:'acciaio DN 50 (2")',j:'55,1',k:'acciaio DN 80 (3")',l:'113,5',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'48',d:'0',e:'acciaio DN 25 (1")',f:'9,9',g:'acciaio DN 40 (1"1/2)',h:'17,9',i:'acciaio DN 50 (2")',j:'54,5',k:'acciaio DN 80 (3")',l:'112,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'49',d:'0',e:'acciaio DN 25 (1")',f:'9,8',g:'acciaio DN 40 (1"1/2)',h:'17,7',i:'acciaio DN 50 (2")',j:'53,9',k:'acciaio DN 80 (3")',l:'111',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'50',d:'0',e:'acciaio DN 25 (1")',f:'9,7',g:'acciaio DN 40 (1"1/2)',h:'17,5',i:'acciaio DN 50 (2")',j:'53,3',k:'acciaio DN 80 (3")',l:'109,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'55',d:'0',e:'acciaio DN 25 (1")',f:'9,2',g:'acciaio DN 40 (1"1/2)',h:'16,6',i:'acciaio DN 50 (2")',j:'50,5',k:'acciaio DN 80 (3")',l:'104,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'60',d:'0',e:'acciaio DN 25 (1")',f:'8,8',g:'acciaio DN 40 (1"1/2)',h:'15,8',i:'acciaio DN 50 (2")',j:'48,2',k:'acciaio DN 80 (3")',l:'99,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'65',d:'0',e:'acciaio DN 25 (1")',f:'8,4',g:'acciaio DN 40 (1"1/2)',h:'15,1',i:'acciaio DN 50 (2")',j:'46,1',k:'acciaio DN 80 (3")',l:'95',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'70',d:'0',e:'acciaio DN 25 (1")',f:'8',g:'acciaio DN 40 (1"1/2)',h:'14,5',i:'acciaio DN 50 (2")',j:'44,3',k:'acciaio DN 80 (3")',l:'91,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'75',d:'0',e:'acciaio DN 25 (1")',f:'7,7',g:'acciaio DN 40 (1"1/2)',h:'14',i:'acciaio DN 50 (2")',j:'42,6',k:'acciaio DN 80 (3")',l:'87,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'80',d:'0',e:'acciaio DN 25 (1")',f:'7,5',g:'acciaio DN 40 (1"1/2)',h:'13,5',i:'acciaio DN 50 (2")',j:'41,1',k:'acciaio DN 80 (3")',l:'84,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'85',d:'0',e:'acciaio DN 25 (1")',f:'7,2',g:'acciaio DN 40 (1"1/2)',h:'13',i:'acciaio DN 50 (2")',j:'39,8',k:'acciaio DN 80 (3")',l:'82',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'90',d:'0',e:'acciaio DN 25 (1")',f:'7',g:'acciaio DN 40 (1"1/2)',h:'12,6',i:'acciaio DN 50 (2")',j:'38,6',k:'acciaio DN 80 (3")',l:'79,5',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'95',d:'0',e:'acciaio DN 25 (1")',f:'6,8',g:'acciaio DN 40 (1"1/2)',h:'12,3',i:'acciaio DN 50 (2")',j:'37,4',k:'acciaio DN 80 (3")',l:'77,1',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'100',d:'0',e:'acciaio DN 25 (1")',f:'6,6',g:'acciaio DN 40 (1"1/2)',h:'11,9',i:'acciaio DN 50 (2")',j:'36,4',k:'acciaio DN 80 (3")',l:'75',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'105',d:'0',e:'acciaio DN 25 (1")',f:'6,4',g:'acciaio DN 40 (1"1/2)',h:'11,6',i:'acciaio DN 50 (2")',j:'35,4',k:'acciaio DN 80 (3")',l:'73',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'110',d:'0',e:'acciaio DN 25 (1")',f:'6,3',g:'acciaio DN 40 (1"1/2)',h:'11,3',i:'acciaio DN 50 (2")',j:'34,5',k:'acciaio DN 80 (3")',l:'71,2',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'115',d:'0',e:'acciaio DN 25 (1")',f:'6,1',g:'acciaio DN 40 (1"1/2)',h:'11',i:'acciaio DN 50 (2")',j:'33,7',k:'acciaio DN 80 (3")',l:'69,4',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'120',d:'0',e:'acciaio DN 25 (1")',f:'6',g:'acciaio DN 40 (1"1/2)',h:'10,8',i:'acciaio DN 50 (2")',j:'32,9',k:'acciaio DN 80 (3")',l:'67,8',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'125',d:'0',e:'acciaio DN 25 (1")',f:'5,9',g:'acciaio DN 40 (1"1/2)',h:'10,6',i:'acciaio DN 50 (2")',j:'32,2',k:'acciaio DN 80 (3")',l:'66,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'130',d:'0',e:'acciaio DN 25 (1")',f:'5,7',g:'acciaio DN 40 (1"1/2)',h:'10,3',i:'acciaio DN 50 (2")',j:'31,5',k:'acciaio DN 80 (3")',l:'64,9',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'135',d:'0',e:'acciaio DN 25 (1")',f:'5,6',g:'acciaio DN 40 (1"1/2)',h:'10,1',i:'acciaio DN 50 (2")',j:'30,9',k:'acciaio DN 80 (3")',l:'63,6',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'140',d:'0',e:'acciaio DN 25 (1")',f:'5,5',g:'acciaio DN 40 (1"1/2)',h:'9,9',i:'acciaio DN 50 (2")',j:'30,2',k:'acciaio DN 80 (3")',l:'62,3',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'145',d:'0',e:'acciaio DN 25 (1")',f:'5,4',g:'acciaio DN 40 (1"1/2)',h:'9,7',i:'acciaio DN 50 (2")',j:'29,7',k:'acciaio DN 80 (3")',l:'61,1',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'ACCIAIO',c:'150',d:'0',e:'acciaio DN 25 (1")',f:'5,3',g:'acciaio DN 40 (1"1/2)',h:'9,5',i:'acciaio DN 50 (2")',j:'29,1',k:'acciaio DN 80 (3")',l:'60',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'1',d:'34,7',e:'acciaio DN 25 (1")',f:'80,4',g:'acciaio DN 40 (1"1/2)',h:'125,6',i:'acciaio DN 50 (2")',j:'291,6',k:'acciaio DN 80 (3")',l:'503,5',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'2',d:'34,6',e:'acciaio DN 25 (1")',f:'80,4',g:'acciaio DN 40 (1"1/2)',h:'125,5',i:'acciaio DN 50 (2")',j:'291,5',k:'acciaio DN 80 (3")',l:'503,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'3',d:'28,7',e:'acciaio DN 25 (1")',f:'80,3',g:'acciaio DN 40 (1"1/2)',h:'125,5',i:'acciaio DN 50 (2")',j:'291,4',k:'acciaio DN 80 (3")',l:'503,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'4',d:'24,5',e:'acciaio DN 25 (1")',f:'74,7',g:'acciaio DN 40 (1"1/2)',h:'125,4',i:'acciaio DN 50 (2")',j:'291,3',k:'acciaio DN 80 (3")',l:'503,2',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'5',d:'21,7',e:'acciaio DN 25 (1")',f:'66,1',g:'acciaio DN 40 (1"1/2)',h:'119,3',i:'acciaio DN 50 (2")',j:'291,2',k:'acciaio DN 80 (3")',l:'503',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'6',d:'19,6',e:'acciaio DN 25 (1")',f:'59,8',g:'acciaio DN 40 (1"1/2)',h:'107,9',i:'acciaio DN 50 (2")',j:'291,1',k:'acciaio DN 80 (3")',l:'502,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'7',d:'18',e:'acciaio DN 25 (1")',f:'55',g:'acciaio DN 40 (1"1/2)',h:'99,1',i:'acciaio DN 50 (2")',j:'291',k:'acciaio DN 80 (3")',l:'502,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'8',d:'16,8',e:'acciaio DN 25 (1")',f:'51,1',g:'acciaio DN 40 (1"1/2)',h:'92,1',i:'acciaio DN 50 (2")',j:'280,9',k:'acciaio DN 80 (3")',l:'502,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'9',d:'15,7',e:'acciaio DN 25 (1")',f:'47,9',g:'acciaio DN 40 (1"1/2)',h:'86,3',i:'acciaio DN 50 (2")',j:'263,3',k:'acciaio DN 80 (3")',l:'502,5',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'10',d:'14,8',e:'acciaio DN 25 (1")',f:'45,2',g:'acciaio DN 40 (1"1/2)',h:'81,5',i:'acciaio DN 50 (2")',j:'248,5',k:'acciaio DN 80 (3")',l:'502,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'11',d:'14,1',e:'acciaio DN 25 (1")',f:'42,9',g:'acciaio DN 40 (1"1/2)',h:'77,3',i:'acciaio DN 50 (2")',j:'235,8',k:'acciaio DN 80 (3")',l:'486',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'12',d:'13,4',e:'acciaio DN 25 (1")',f:'40,9',g:'acciaio DN 40 (1"1/2)',h:'73,7',i:'acciaio DN 50 (2")',j:'224,8',k:'acciaio DN 80 (3")',l:'463,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'13',d:'12,8',e:'acciaio DN 25 (1")',f:'39,1',g:'acciaio DN 40 (1"1/2)',h:'70,5',i:'acciaio DN 50 (2")',j:'215,1',k:'acciaio DN 80 (3")',l:'443,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'14',d:'12,3',e:'acciaio DN 25 (1")',f:'37,6',g:'acciaio DN 40 (1"1/2)',h:'67,7',i:'acciaio DN 50 (2")',j:'206,6',k:'acciaio DN 80 (3")',l:'425,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'15',d:'11,9',e:'acciaio DN 25 (1")',f:'36,2',g:'acciaio DN 40 (1"1/2)',h:'65,2',i:'acciaio DN 50 (2")',j:'198,9',k:'acciaio DN 80 (3")',l:'409,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'16',d:'11,4',e:'acciaio DN 25 (1")',f:'34,9',g:'acciaio DN 40 (1"1/2)',h:'62,9',i:'acciaio DN 50 (2")',j:'191,9',k:'acciaio DN 80 (3")',l:'395,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'17',d:'11,1',e:'acciaio DN 25 (1")',f:'33,8',g:'acciaio DN 40 (1"1/2)',h:'60,9',i:'acciaio DN 50 (2")',j:'185,7',k:'acciaio DN 80 (3")',l:'382,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'18',d:'10,7',e:'acciaio DN 25 (1")',f:'32,7',g:'acciaio DN 40 (1"1/2)',h:'59',i:'acciaio DN 50 (2")',j:'179,9',k:'acciaio DN 80 (3")',l:'370,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'19',d:'10,4',e:'acciaio DN 25 (1")',f:'31,8',g:'acciaio DN 40 (1"1/2)',h:'57,3',i:'acciaio DN 50 (2")',j:'174,7',k:'acciaio DN 80 (3")',l:'359,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'20',d:'10,1',e:'acciaio DN 25 (1")',f:'30,9',g:'acciaio DN 40 (1"1/2)',h:'55,7',i:'acciaio DN 50 (2")',j:'169,8',k:'acciaio DN 80 (3")',l:'349,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'21',d:'9,9',e:'acciaio DN 25 (1")',f:'30,1',g:'acciaio DN 40 (1"1/2)',h:'54,2',i:'acciaio DN 50 (2")',j:'165,3',k:'acciaio DN 80 (3")',l:'340,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'22',d:'9,6',e:'acciaio DN 25 (1")',f:'29,3',g:'acciaio DN 40 (1"1/2)',h:'52,8',i:'acciaio DN 50 (2")',j:'161,1',k:'acciaio DN 80 (3")',l:'332,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'23',d:'9,4',e:'acciaio DN 25 (1")',f:'28,6',g:'acciaio DN 40 (1"1/2)',h:'51,6',i:'acciaio DN 50 (2")',j:'157,2',k:'acciaio DN 80 (3")',l:'324,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'24',d:'9,2',e:'acciaio DN 25 (1")',f:'27,9',g:'acciaio DN 40 (1"1/2)',h:'50,4',i:'acciaio DN 50 (2")',j:'153,6',k:'acciaio DN 80 (3")',l:'316,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'25',d:'9',e:'acciaio DN 25 (1")',f:'27,3',g:'acciaio DN 40 (1"1/2)',h:'49,3',i:'acciaio DN 50 (2")',j:'150,2',k:'acciaio DN 80 (3")',l:'309,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'26',d:'8,8',e:'acciaio DN 25 (1")',f:'26,7',g:'acciaio DN 40 (1"1/2)',h:'48,2',i:'acciaio DN 50 (2")',j:'147',k:'acciaio DN 80 (3")',l:'303',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'27',d:'8,6',e:'acciaio DN 25 (1")',f:'26,2',g:'acciaio DN 40 (1"1/2)',h:'47,2',i:'acciaio DN 50 (2")',j:'144',k:'acciaio DN 80 (3")',l:'296,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'28',d:'8,4',e:'acciaio DN 25 (1")',f:'25,7',g:'acciaio DN 40 (1"1/2)',h:'46,3',i:'acciaio DN 50 (2")',j:'141,1',k:'acciaio DN 80 (3")',l:'290,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'29',d:'8,3',e:'acciaio DN 25 (1")',f:'25,2',g:'acciaio DN 40 (1"1/2)',h:'45,4',i:'acciaio DN 50 (2")',j:'138,4',k:'acciaio DN 80 (3")',l:'285,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'30',d:'8,1',e:'acciaio DN 25 (1")',f:'24,7',g:'acciaio DN 40 (1"1/2)',h:'44,6',i:'acciaio DN 50 (2")',j:'135,9',k:'acciaio DN 80 (3")',l:'280',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'31',d:'8',e:'acciaio DN 25 (1")',f:'24,3',g:'acciaio DN 40 (1"1/2)',h:'43,8',i:'acciaio DN 50 (2")',j:'133,5',k:'acciaio DN 80 (3")',l:'275',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'32',d:'7,8',e:'acciaio DN 25 (1")',f:'23,8',g:'acciaio DN 40 (1"1/2)',h:'43',i:'acciaio DN 50 (2")',j:'131,2',k:'acciaio DN 80 (3")',l:'270,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'33',d:'7,7',e:'acciaio DN 25 (1")',f:'23,4',g:'acciaio DN 40 (1"1/2)',h:'42,3',i:'acciaio DN 50 (2")',j:'129',k:'acciaio DN 80 (3")',l:'265,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'34',d:'7,6',e:'acciaio DN 25 (1")',f:'23,1',g:'acciaio DN 40 (1"1/2)',h:'41,6',i:'acciaio DN 50 (2")',j:'126,9',k:'acciaio DN 80 (3")',l:'261,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'35',d:'7,4',e:'acciaio DN 25 (1")',f:'22,7',g:'acciaio DN 40 (1"1/2)',h:'40,9',i:'acciaio DN 50 (2")',j:'124,9',k:'acciaio DN 80 (3")',l:'257,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'36',d:'7,3',e:'acciaio DN 25 (1")',f:'22,4',g:'acciaio DN 40 (1"1/2)',h:'40,3',i:'acciaio DN 50 (2")',j:'122,9',k:'acciaio DN 80 (3")',l:'253,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'37',d:'7,2',e:'acciaio DN 25 (1")',f:'22',g:'acciaio DN 40 (1"1/2)',h:'39,7',i:'acciaio DN 50 (2")',j:'121,1',k:'acciaio DN 80 (3")',l:'249,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'38',d:'7,1',e:'acciaio DN 25 (1")',f:'21,7',g:'acciaio DN 40 (1"1/2)',h:'39,1',i:'acciaio DN 50 (2")',j:'119,3',k:'acciaio DN 80 (3")',l:'245,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'39',d:'7',e:'acciaio DN 25 (1")',f:'21,4',g:'acciaio DN 40 (1"1/2)',h:'38,6',i:'acciaio DN 50 (2")',j:'117,6',k:'acciaio DN 80 (3")',l:'242,5',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'40',d:'1',e:'acciaio DN 25 (1")',f:'21,1',g:'acciaio DN 40 (1"1/2)',h:'38',i:'acciaio DN 50 (2")',j:'116',k:'acciaio DN 80 (3")',l:'239,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'41',d:'6,8',e:'acciaio DN 25 (1")',f:'20,8',g:'acciaio DN 40 (1"1/2)',h:'37,5',i:'acciaio DN 50 (2")',j:'114,5',k:'acciaio DN 80 (3")',l:'235,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'42',d:'6,7',e:'acciaio DN 25 (1")',f:'20,5',g:'acciaio DN 40 (1"1/2)',h:'37',i:'acciaio DN 50 (2")',j:'113',k:'acciaio DN 80 (3")',l:'232,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'43',d:'6,7',e:'acciaio DN 25 (1")',f:'20,3',g:'acciaio DN 40 (1"1/2)',h:'36,6',i:'acciaio DN 50 (2")',j:'111,5',k:'acciaio DN 80 (3")',l:'229,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'44',d:'6,6',e:'acciaio DN 25 (1")',f:'20',g:'acciaio DN 40 (1"1/2)',h:'36,1',i:'acciaio DN 50 (2")',j:'110,1',k:'acciaio DN 80 (3")',l:'226,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'45',d:'6,5',e:'acciaio DN 25 (1")',f:'19,8',g:'acciaio DN 40 (1"1/2)',h:'35,7',i:'acciaio DN 50 (2")',j:'108,7',k:'acciaio DN 80 (3")',l:'224,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'46',d:'6,4',e:'acciaio DN 25 (1")',f:'19,5',g:'acciaio DN 40 (1"1/2)',h:'35,2',i:'acciaio DN 50 (2")',j:'107,4',k:'acciaio DN 80 (3")',l:'221,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'47',d:'6,3',e:'acciaio DN 25 (1")',f:'19,3',g:'acciaio DN 40 (1"1/2)',h:'34,8',i:'acciaio DN 50 (2")',j:'106,2',k:'acciaio DN 80 (3")',l:'218,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'48',d:'6,3',e:'acciaio DN 25 (1")',f:'19,1',g:'acciaio DN 40 (1"1/2)',h:'34,4',i:'acciaio DN 50 (2")',j:'105',k:'acciaio DN 80 (3")',l:'216,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'49',d:'6,2',e:'acciaio DN 25 (1")',f:'18,9',g:'acciaio DN 40 (1"1/2)',h:'34',i:'acciaio DN 50 (2")',j:'103,8',k:'acciaio DN 80 (3")',l:'213,9',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'50',d:'6,1',e:'acciaio DN 25 (1")',f:'18,7',g:'acciaio DN 40 (1"1/2)',h:'33,7',i:'acciaio DN 50 (2")',j:'102,6',k:'acciaio DN 80 (3")',l:'211,5',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'55',d:'5,8',e:'acciaio DN 25 (1")',f:'17,7',g:'acciaio DN 40 (1"1/2)',h:'31,9',i:'acciaio DN 50 (2")',j:'97,4',k:'acciaio DN 80 (3")',l:'200,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'60',d:'5,5',e:'acciaio DN 25 (1")',f:'16,9',g:'acciaio DN 40 (1"1/2)',h:'30,4',i:'acciaio DN 50 (2")',j:'92,8',k:'acciaio DN 80 (3")',l:'191,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'65',d:'5,3',e:'acciaio DN 25 (1")',f:'16,2',g:'acciaio DN 40 (1"1/2)',h:'29,1',i:'acciaio DN 50 (2")',j:'88,9',k:'acciaio DN 80 (3")',l:'183,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'70',d:'5,1',e:'acciaio DN 25 (1")',f:'15,5',g:'acciaio DN 40 (1"1/2)',h:'28',i:'acciaio DN 50 (2")',j:'85,3',k:'acciaio DN 80 (3")',l:'175,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'75',d:'4,9',e:'acciaio DN 25 (1")',f:'14,9',g:'acciaio DN 40 (1"1/2)',h:'26,9',i:'acciaio DN 50 (2")',j:'82,1',k:'acciaio DN 80 (3")',l:'169,3',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'80',d:'4,7',e:'acciaio DN 25 (1")',f:'14,4',g:'acciaio DN 40 (1"1/2)',h:'26',i:'acciaio DN 50 (2")',j:'79,3',k:'acciaio DN 80 (3")',l:'163,4',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'85',d:'4,6',e:'acciaio DN 25 (1")',f:'13,9',g:'acciaio DN 40 (1"1/2)',h:'25,1',i:'acciaio DN 50 (2")',j:'76,7',k:'acciaio DN 80 (3")',l:'158',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'90',d:'4,4',e:'acciaio DN 25 (1")',f:'13,5',g:'acciaio DN 40 (1"1/2)',h:'24,4',i:'acciaio DN 50 (2")',j:'74,3',k:'acciaio DN 80 (3")',l:'153,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'95',d:'4,3',e:'acciaio DN 25 (1")',f:'13,1',g:'acciaio DN 40 (1"1/2)',h:'23,7',i:'acciaio DN 50 (2")',j:'72,1',k:'acciaio DN 80 (3")',l:'148,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'100',d:'4,2',e:'acciaio DN 25 (1")',f:'12,7',g:'acciaio DN 40 (1"1/2)',h:'23',i:'acciaio DN 50 (2")',j:'70,1',k:'acciaio DN 80 (3")',l:'144,5',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'105',d:'4,1',e:'acciaio DN 25 (1")',f:'12,4',g:'acciaio DN 40 (1"1/2)',h:'22,4',i:'acciaio DN 50 (2")',j:'68,3',k:'acciaio DN 80 (3")',l:'140,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'110',d:'4',e:'acciaio DN 25 (1")',f:'12,1',g:'acciaio DN 40 (1"1/2)',h:'21,8',i:'acciaio DN 50 (2")',j:'66,5',k:'acciaio DN 80 (3")',l:'137,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'115',d:'3,9',e:'acciaio DN 25 (1")',f:'11,8',g:'acciaio DN 40 (1"1/2)',h:'21,3',i:'acciaio DN 50 (2")',j:'64,9',k:'acciaio DN 80 (3")',l:'133,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'120',d:'3,8',e:'acciaio DN 25 (1")',f:'11,5',g:'acciaio DN 40 (1"1/2)',h:'20,8',i:'acciaio DN 50 (2")',j:'63,4',k:'acciaio DN 80 (3")',l:'130,7',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'125',d:'3,7',e:'acciaio DN 25 (1")',f:'11,3',g:'acciaio DN 40 (1"1/2)',h:'20,3',i:'acciaio DN 50 (2")',j:'62',k:'acciaio DN 80 (3")',l:'127,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'130',d:'3,6',e:'acciaio DN 25 (1")',f:'11',g:'acciaio DN 40 (1"1/2)',h:'19,9',i:'acciaio DN 50 (2")',j:'60,7',k:'acciaio DN 80 (3")',l:'125,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'135',d:'3,5',e:'acciaio DN 25 (1")',f:'10,8',g:'acciaio DN 40 (1"1/2)',h:'19,5',i:'acciaio DN 50 (2")',j:'59,5',k:'acciaio DN 80 (3")',l:'122,6',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'140',d:'3,5',e:'acciaio DN 25 (1")',f:'10,6',g:'acciaio DN 40 (1"1/2)',h:'19,1',i:'acciaio DN 50 (2")',j:'58,3',k:'acciaio DN 80 (3")',l:'120,1',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'145',d:'3,4',e:'acciaio DN 25 (1")',f:'10,4',g:'acciaio DN 40 (1"1/2)',h:'18,7',i:'acciaio DN 50 (2")',j:'57,2',k:'acciaio DN 80 (3")',l:'117,8',m:'acciaio DN 100 (4")'},
        {A:'6°',b:'ACCIAIO',c:'150',d:'3,3',e:'acciaio DN 25 (1")',f:'10,2',g:'acciaio DN 40 (1"1/2)',h:'18,4',i:'acciaio DN 50 (2")',j:'56,1',k:'acciaio DN 80 (3")',l:'115,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'1',d:'49,6',e:'acciaio DN 25 (1")',f:'115',g:'acciaio DN 40 (1"1/2)',h:'179,6',i:'acciaio DN 50 (2")',j:'417',k:'acciaio DN 80 (3")',l:'719,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'2',d:'49,5',e:'acciaio DN 25 (1")',f:'115',g:'acciaio DN 40 (1"1/2)',h:'179,5',i:'acciaio DN 50 (2")',j:'416,8',k:'acciaio DN 80 (3")',l:'719,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'3',d:'49,4',e:'acciaio DN 25 (1")',f:'114,9',g:'acciaio DN 40 (1"1/2)',h:'179,4',i:'acciaio DN 50 (2")',j:'416,7',k:'acciaio DN 80 (3")',l:'719,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'4',d:'49,4',e:'acciaio DN 25 (1")',f:'114,8',g:'acciaio DN 40 (1"1/2)',h:'179,3',i:'acciaio DN 50 (2")',j:'416,6',k:'acciaio DN 80 (3")',l:'719,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'5',d:'49,3',e:'acciaio DN 25 (1")',f:'114,7',g:'acciaio DN 40 (1"1/2)',h:'179,2',i:'acciaio DN 50 (2")',j:'416,4',k:'acciaio DN 80 (3")',l:'719,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'6',d:'49,3',e:'acciaio DN 25 (1")',f:'114,6',g:'acciaio DN 40 (1"1/2)',h:'179,1',i:'acciaio DN 50 (2")',j:'416,3',k:'acciaio DN 80 (3")',l:'719,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'7',d:'49,2',e:'acciaio DN 25 (1")',f:'114,6',g:'acciaio DN 40 (1"1/2)',h:'179',i:'acciaio DN 50 (2")',j:'416,2',k:'acciaio DN 80 (3")',l:'718,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'8',d:'49,2',e:'acciaio DN 25 (1")',f:'114,5',g:'acciaio DN 40 (1"1/2)',h:'178,9',i:'acciaio DN 50 (2")',j:'416',k:'acciaio DN 80 (3")',l:'718,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'9',d:'49,1',e:'acciaio DN 25 (1")',f:'114,4',g:'acciaio DN 40 (1"1/2)',h:'178,8',i:'acciaio DN 50 (2")',j:'415,9',k:'acciaio DN 80 (3")',l:'718,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'10',d:'49,1',e:'acciaio DN 25 (1")',f:'114,3',g:'acciaio DN 40 (1"1/2)',h:'178,7',i:'acciaio DN 50 (2")',j:'415,8',k:'acciaio DN 80 (3")',l:'718,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'11',d:'49',e:'acciaio DN 25 (1")',f:'114,3',g:'acciaio DN 40 (1"1/2)',h:'178,7',i:'acciaio DN 50 (2")',j:'415,6',k:'acciaio DN 80 (3")',l:'718,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'12',d:'48,9',e:'acciaio DN 25 (1")',f:'114,2',g:'acciaio DN 40 (1"1/2)',h:'178,6',i:'acciaio DN 50 (2")',j:'415,5',k:'acciaio DN 80 (3")',l:'718,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'13',d:'48,9',e:'acciaio DN 25 (1")',f:'114,1',g:'acciaio DN 40 (1"1/2)',h:'178,5',i:'acciaio DN 50 (2")',j:'415,4',k:'acciaio DN 80 (3")',l:'717,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'14',d:'48,8',e:'acciaio DN 25 (1")',f:'114',g:'acciaio DN 40 (1"1/2)',h:'178,4',i:'acciaio DN 50 (2")',j:'415,2',k:'acciaio DN 80 (3")',l:'717,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'15',d:'48,8',e:'acciaio DN 25 (1")',f:'113,9',g:'acciaio DN 40 (1"1/2)',h:'178,3',i:'acciaio DN 50 (2")',j:'415,1',k:'acciaio DN 80 (3")',l:'717,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'16',d:'48,7',e:'acciaio DN 25 (1")',f:'113,9',g:'acciaio DN 40 (1"1/2)',h:'178,2',i:'acciaio DN 50 (2")',j:'415',k:'acciaio DN 80 (3")',l:'717,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'17',d:'48,7',e:'acciaio DN 25 (1")',f:'113,8',g:'acciaio DN 40 (1"1/2)',h:'178,1',i:'acciaio DN 50 (2")',j:'414,8',k:'acciaio DN 80 (3")',l:'717,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'18',d:'48,6',e:'acciaio DN 25 (1")',f:'113,7',g:'acciaio DN 40 (1"1/2)',h:'178',i:'acciaio DN 50 (2")',j:'414,7',k:'acciaio DN 80 (3")',l:'717,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'19',d:'48,6',e:'acciaio DN 25 (1")',f:'113,6',g:'acciaio DN 40 (1"1/2)',h:'177,9',i:'acciaio DN 50 (2")',j:'414,6',k:'acciaio DN 80 (3")',l:'717',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'20',d:'48,5',e:'acciaio DN 25 (1")',f:'113,6',g:'acciaio DN 40 (1"1/2)',h:'177,8',i:'acciaio DN 50 (2")',j:'414,4',k:'acciaio DN 80 (3")',l:'716,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'21',d:'48,5',e:'acciaio DN 25 (1")',f:'113,5',g:'acciaio DN 40 (1"1/2)',h:'177,7',i:'acciaio DN 50 (2")',j:'414,3',k:'acciaio DN 80 (3")',l:'716,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'22',d:'48,4',e:'acciaio DN 25 (1")',f:'113,4',g:'acciaio DN 40 (1"1/2)',h:'177,6',i:'acciaio DN 50 (2")',j:'414,2',k:'acciaio DN 80 (3")',l:'716,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'23',d:'48,4',e:'acciaio DN 25 (1")',f:'113,3',g:'acciaio DN 40 (1"1/2)',h:'177,6',i:'acciaio DN 50 (2")',j:'414',k:'acciaio DN 80 (3")',l:'716,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'24',d:'48,3',e:'acciaio DN 25 (1")',f:'113,3',g:'acciaio DN 40 (1"1/2)',h:'177,5',i:'acciaio DN 50 (2")',j:'413,9',k:'acciaio DN 80 (3")',l:'716,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'25',d:'47,4',e:'acciaio DN 25 (1")',f:'113,2',g:'acciaio DN 40 (1"1/2)',h:'177,4',i:'acciaio DN 50 (2")',j:'413,8',k:'acciaio DN 80 (3")',l:'716',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'26',d:'46,4',e:'acciaio DN 25 (1")',f:'113,1',g:'acciaio DN 40 (1"1/2)',h:'177,3',i:'acciaio DN 50 (2")',j:'413,7',k:'acciaio DN 80 (3")',l:'715,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'27',d:'45,5',e:'acciaio DN 25 (1")',f:'113',g:'acciaio DN 40 (1"1/2)',h:'177,2',i:'acciaio DN 50 (2")',j:'413,5',k:'acciaio DN 80 (3")',l:'715,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'28',d:'44,6',e:'acciaio DN 25 (1")',f:'113',g:'acciaio DN 40 (1"1/2)',h:'177,1',i:'acciaio DN 50 (2")',j:'413,4',k:'acciaio DN 80 (3")',l:'715,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'29',d:'43,7',e:'acciaio DN 25 (1")',f:'112,9',g:'acciaio DN 40 (1"1/2)',h:'177',i:'acciaio DN 50 (2")',j:'413,3',k:'acciaio DN 80 (3")',l:'715,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'30',d:'42,9',e:'acciaio DN 25 (1")',f:'112,8',g:'acciaio DN 40 (1"1/2)',h:'176,9',i:'acciaio DN 50 (2")',j:'413,1',k:'acciaio DN 80 (3")',l:'715,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'31',d:'42,1',e:'acciaio DN 25 (1")',f:'112,7',g:'acciaio DN 40 (1"1/2)',h:'176,8',i:'acciaio DN 50 (2")',j:'413',k:'acciaio DN 80 (3")',l:'715',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'32',d:'41,4',e:'acciaio DN 25 (1")',f:'112,7',g:'acciaio DN 40 (1"1/2)',h:'176,7',i:'acciaio DN 50 (2")',j:'412,9',k:'acciaio DN 80 (3")',l:'714,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'33',d:'40,7',e:'acciaio DN 25 (1")',f:'112,6',g:'acciaio DN 40 (1"1/2)',h:'176,6',i:'acciaio DN 50 (2")',j:'412,7',k:'acciaio DN 80 (3")',l:'714,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'34',d:'40,1',e:'acciaio DN 25 (1")',f:'112,5',g:'acciaio DN 40 (1"1/2)',h:'176,6',i:'acciaio DN 50 (2")',j:'412,6',k:'acciaio DN 80 (3")',l:'714,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'35',d:'39,4',e:'acciaio DN 25 (1")',f:'112,4',g:'acciaio DN 40 (1"1/2)',h:'176,5',i:'acciaio DN 50 (2")',j:'412,5',k:'acciaio DN 80 (3")',l:'714,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'36',d:'38,8',e:'acciaio DN 25 (1")',f:'112,4',g:'acciaio DN 40 (1"1/2)',h:'176,4',i:'acciaio DN 50 (2")',j:'412,4',k:'acciaio DN 80 (3")',l:'714,2',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'37',d:'38,2',e:'acciaio DN 25 (1")',f:'112,3',g:'acciaio DN 40 (1"1/2)',h:'176,3',i:'acciaio DN 50 (2")',j:'412,2',k:'acciaio DN 80 (3")',l:'714',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'38',d:'37,7',e:'acciaio DN 25 (1")',f:'112,2',g:'acciaio DN 40 (1"1/2)',h:'176,2',i:'acciaio DN 50 (2")',j:'412,1',k:'acciaio DN 80 (3")',l:'713,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'39',d:'37,1',e:'acciaio DN 25 (1")',f:'112,1',g:'acciaio DN 40 (1"1/2)',h:'176,1',i:'acciaio DN 50 (2")',j:'412',k:'acciaio DN 80 (3")',l:'713,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'40',d:'36,6',e:'acciaio DN 25 (1")',f:'111,7',g:'acciaio DN 40 (1"1/2)',h:'176',i:'acciaio DN 50 (2")',j:'411,8',k:'acciaio DN 80 (3")',l:'713,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'41',d:'36,1',e:'acciaio DN 25 (1")',f:'110,2',g:'acciaio DN 40 (1"1/2)',h:'175,9',i:'acciaio DN 50 (2")',j:'411,7',k:'acciaio DN 80 (3")',l:'713,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'42',d:'35,7',e:'acciaio DN 25 (1")',f:'108,7',g:'acciaio DN 40 (1"1/2)',h:'175,8',i:'acciaio DN 50 (2")',j:'411,6',k:'acciaio DN 80 (3")',l:'713,2',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'43',d:'35,2',e:'acciaio DN 25 (1")',f:'107,3',g:'acciaio DN 40 (1"1/2)',h:'175,7',i:'acciaio DN 50 (2")',j:'411,5',k:'acciaio DN 80 (3")',l:'713',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'44',d:'34,8',e:'acciaio DN 25 (1")',f:'106',g:'acciaio DN 40 (1"1/2)',h:'175,7',i:'acciaio DN 50 (2")',j:'411,3',k:'acciaio DN 80 (3")',l:'712,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'45',d:'34,3',e:'acciaio DN 25 (1")',f:'104,7',g:'acciaio DN 40 (1"1/2)',h:'175,6',i:'acciaio DN 50 (2")',j:'411,2',k:'acciaio DN 80 (3")',l:'712,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'46',d:'33,9',e:'acciaio DN 25 (1")',f:'103,4',g:'acciaio DN 40 (1"1/2)',h:'175,5',i:'acciaio DN 50 (2")',j:'411,1',k:'acciaio DN 80 (3")',l:'712,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'47',d:'33,5',e:'acciaio DN 25 (1")',f:'102,2',g:'acciaio DN 40 (1"1/2)',h:'175,4',i:'acciaio DN 50 (2")',j:'410,9',k:'acciaio DN 80 (3")',l:'712,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'48',d:'33,1',e:'acciaio DN 25 (1")',f:'101',g:'acciaio DN 40 (1"1/2)',h:'175,3',i:'acciaio DN 50 (2")',j:'410,8',k:'acciaio DN 80 (3")',l:'712,2',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'49',d:'32,8',e:'acciaio DN 25 (1")',f:'99,9',g:'acciaio DN 40 (1"1/2)',h:'175,2',i:'acciaio DN 50 (2")',j:'410,7',k:'acciaio DN 80 (3")',l:'712,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'50',d:'32,4',e:'acciaio DN 25 (1")',f:'98,8',g:'acciaio DN 40 (1"1/2)',h:'175,1',i:'acciaio DN 50 (2")',j:'410,6',k:'acciaio DN 80 (3")',l:'711,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'55',d:'30,8',e:'acciaio DN 25 (1")',f:'93,7',g:'acciaio DN 40 (1"1/2)',h:'169,1',i:'acciaio DN 50 (2")',j:'409,9',k:'acciaio DN 80 (3")',l:'711,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'60',d:'29,3',e:'acciaio DN 25 (1")',f:'89,4',g:'acciaio DN 40 (1"1/2)',h:'161,2',i:'acciaio DN 50 (2")',j:'409,3',k:'acciaio DN 80 (3")',l:'710,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'65',d:'28,1',e:'acciaio DN 25 (1")',f:'85,5',g:'acciaio DN 40 (1"1/2)',h:'154,2',i:'acciaio DN 50 (2")',j:'408,7',k:'acciaio DN 80 (3")',l:'709,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'70',d:'26,9',e:'acciaio DN 25 (1")',f:'82,1',g:'acciaio DN 40 (1"1/2)',h:'148,1',i:'acciaio DN 50 (2")',j:'408',k:'acciaio DN 80 (3")',l:'708,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'75',d:'25,9',e:'acciaio DN 25 (1")',f:'79,1',g:'acciaio DN 40 (1"1/2)',h:'142,6',i:'acciaio DN 50 (2")',j:'407,4',k:'acciaio DN 80 (3")',l:'707,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'80',d:'25',e:'acciaio DN 25 (1")',f:'76,3',g:'acciaio DN 40 (1"1/2)',h:'137,6',i:'acciaio DN 50 (2")',j:'406,8',k:'acciaio DN 80 (3")',l:'707,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'85',d:'24,2',e:'acciaio DN 25 (1")',f:'73,8',g:'acciaio DN 40 (1"1/2)',h:'133,1',i:'acciaio DN 50 (2")',j:'405,9',k:'acciaio DN 80 (3")',l:'706,3',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'90',d:'23,5',e:'acciaio DN 25 (1")',f:'71,5',g:'acciaio DN 40 (1"1/2)',h:'129',i:'acciaio DN 50 (2")',j:'393,4',k:'acciaio DN 80 (3")',l:'705,5',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'95',d:'22,8',e:'acciaio DN 25 (1")',f:'69,4',g:'acciaio DN 40 (1"1/2)',h:'125,2',i:'acciaio DN 50 (2")',j:'381,9',k:'acciaio DN 80 (3")',l:'704,7',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'100',d:'22,1',e:'acciaio DN 25 (1")',f:'67,5',g:'acciaio DN 40 (1"1/2)',h:'121,7',i:'acciaio DN 50 (2")',j:'371,2',k:'acciaio DN 80 (3")',l:'703,9',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'105',d:'21,6',e:'acciaio DN 25 (1")',f:'65,7',g:'acciaio DN 40 (1"1/2)',h:'118,5',i:'acciaio DN 50 (2")',j:'361,4',k:'acciaio DN 80 (3")',l:'703,1',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'110',d:'21',e:'acciaio DN 25 (1")',f:'64,1',g:'acciaio DN 40 (1"1/2)',h:'115,5',i:'acciaio DN 50 (2")',j:'352,3',k:'acciaio DN 80 (3")',l:'702,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'115',d:'20,5',e:'acciaio DN 25 (1")',f:'62,5',g:'acciaio DN 40 (1"1/2)',h:'112,7',i:'acciaio DN 50 (2")',j:'343,8',k:'acciaio DN 80 (3")',l:'701,6',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'120',d:'20',e:'acciaio DN 25 (1")',f:'61,1',g:'acciaio DN 40 (1"1/2)',h:'110,1',i:'acciaio DN 50 (2")',j:'335,9',k:'acciaio DN 80 (3")',l:'692,2',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'125',d:'19,6',e:'acciaio DN 25 (1")',f:'59,7',g:'acciaio DN 40 (1"1/2)',h:'107,7',i:'acciaio DN 50 (2")',j:'328,4',k:'acciaio DN 80 (3")',l:'676,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'130',d:'19,2',e:'acciaio DN 25 (1")',f:'58,4',g:'acciaio DN 40 (1"1/2)',h:'105,4',i:'acciaio DN 50 (2")',j:'321,4',k:'acciaio DN 80 (3")',l:'662,4',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'135',d:'18,8',e:'acciaio DN 25 (1")',f:'57,2',g:'acciaio DN 40 (1"1/2)',h:'103,2',i:'acciaio DN 50 (2")',j:'314,8',k:'acciaio DN 80 (3")',l:'648,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'140',d:'18,4',e:'acciaio DN 25 (1")',f:'56,1',g:'acciaio DN 40 (1"1/2)',h:'101,2',i:'acciaio DN 50 (2")',j:'308,6',k:'acciaio DN 80 (3")',l:'636',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'145',d:'18,1',e:'acciaio DN 25 (1")',f:'55',g:'acciaio DN 40 (1"1/2)',h:'99,3',i:'acciaio DN 50 (2")',j:'302,7',k:'acciaio DN 80 (3")',l:'623,8',m:'acciaio DN 100 (4")'},
        {A:'5°',b:'ACCIAIO',c:'150',d:'17,7',e:'acciaio DN 25 (1")',f:'54',g:'acciaio DN 40 (1"1/2)',h:'97,4',i:'acciaio DN 50 (2")',j:'297,1',k:'acciaio DN 80 (3")',l:'612,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'1',d:'136,5',e:'acciaio DN 25 (1")',f:'317,1',g:'acciaio DN 40 (1"1/2)',h:'495,2',i:'acciaio DN 50 (2")',j:'1150,1',k:'acciaio DN 80 (3")',l:'1986',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'2',d:'136,2',e:'acciaio DN 25 (1")',f:'316,6',g:'acciaio DN 40 (1"1/2)',h:'494,6',i:'acciaio DN 50 (2")',j:'1149,2',k:'acciaio DN 80 (3")',l:'1984,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'3',d:'135,8',e:'acciaio DN 25 (1")',f:'316,1',g:'acciaio DN 40 (1"1/2)',h:'494',i:'acciaio DN 50 (2")',j:'1148,4',k:'acciaio DN 80 (3")',l:'1983,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'4',d:'135,5',e:'acciaio DN 25 (1")',f:'315,6',g:'acciaio DN 40 (1"1/2)',h:'493,4',i:'acciaio DN 50 (2")',j:'1147,5',k:'acciaio DN 80 (3")',l:'1982,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'5',d:'135,1',e:'acciaio DN 25 (1")',f:'315,2',g:'acciaio DN 40 (1"1/2)',h:'492,8',i:'acciaio DN 50 (2")',j:'1146,7',k:'acciaio DN 80 (3")',l:'1981,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'6',d:'134,8',e:'acciaio DN 25 (1")',f:'314,7',g:'acciaio DN 40 (1"1/2)',h:'492,3',i:'acciaio DN 50 (2")',j:'1145,8',k:'acciaio DN 80 (3")',l:'1980,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'7',d:'134,5',e:'acciaio DN 25 (1")',f:'314,2',g:'acciaio DN 40 (1"1/2)',h:'491,7',i:'acciaio DN 50 (2")',j:'1145',k:'acciaio DN 80 (3")',l:'1979,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'8',d:'134,1',e:'acciaio DN 25 (1")',f:'313,7',g:'acciaio DN 40 (1"1/2)',h:'491,1',i:'acciaio DN 50 (2")',j:'1144,2',k:'acciaio DN 80 (3")',l:'1978,6',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'9',d:'133,8',e:'acciaio DN 25 (1")',f:'313,2',g:'acciaio DN 40 (1"1/2)',h:'490,5',i:'acciaio DN 50 (2")',j:'1143,3',k:'acciaio DN 80 (3")',l:'1977,6',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'10',d:'133,5',e:'acciaio DN 25 (1")',f:'312,7',g:'acciaio DN 40 (1"1/2)',h:'489,9',i:'acciaio DN 50 (2")',j:'1142,5',k:'acciaio DN 80 (3")',l:'1976,5',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'11',d:'133,1',e:'acciaio DN 25 (1")',f:'312,2',g:'acciaio DN 40 (1"1/2)',h:'489,3',i:'acciaio DN 50 (2")',j:'1141,7',k:'acciaio DN 80 (3")',l:'1975,5',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'12',d:'132,8',e:'acciaio DN 25 (1")',f:'311,8',g:'acciaio DN 40 (1"1/2)',h:'488,8',i:'acciaio DN 50 (2")',j:'1140,8',k:'acciaio DN 80 (3")',l:'1974,4',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'13',d:'132,5',e:'acciaio DN 25 (1")',f:'311,3',g:'acciaio DN 40 (1"1/2)',h:'488,2',i:'acciaio DN 50 (2")',j:'1140',k:'acciaio DN 80 (3")',l:'1973,4',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'14',d:'132,2',e:'acciaio DN 25 (1")',f:'310,8',g:'acciaio DN 40 (1"1/2)',h:'487,6',i:'acciaio DN 50 (2")',j:'1139,2',k:'acciaio DN 80 (3")',l:'1972,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'15',d:'131,8',e:'acciaio DN 25 (1")',f:'310,4',g:'acciaio DN 40 (1"1/2)',h:'487',i:'acciaio DN 50 (2")',j:'1138,4',k:'acciaio DN 80 (3")',l:'1971,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'16',d:'131,5',e:'acciaio DN 25 (1")',f:'309,9',g:'acciaio DN 40 (1"1/2)',h:'486,5',i:'acciaio DN 50 (2")',j:'1137,5',k:'acciaio DN 80 (3")',l:'1970,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'17',d:'131,2',e:'acciaio DN 25 (1")',f:'309,4',g:'acciaio DN 40 (1"1/2)',h:'485,9',i:'acciaio DN 50 (2")',j:'1136,7',k:'acciaio DN 80 (3")',l:'1969,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'18',d:'130,9',e:'acciaio DN 25 (1")',f:'308,9',g:'acciaio DN 40 (1"1/2)',h:'485,3',i:'acciaio DN 50 (2")',j:'1135,9',k:'acciaio DN 80 (3")',l:'1968,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'19',d:'130,6',e:'acciaio DN 25 (1")',f:'308,5',g:'acciaio DN 40 (1"1/2)',h:'484,8',i:'acciaio DN 50 (2")',j:'1135,1',k:'acciaio DN 80 (3")',l:'1967,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'20',d:'130,3',e:'acciaio DN 25 (1")',f:'308',g:'acciaio DN 40 (1"1/2)',h:'484,2',i:'acciaio DN 50 (2")',j:'1134,3',k:'acciaio DN 80 (3")',l:'1966,1',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'21',d:'129,9',e:'acciaio DN 25 (1")',f:'307,6',g:'acciaio DN 40 (1"1/2)',h:'483,6',i:'acciaio DN 50 (2")',j:'1133,5',k:'acciaio DN 80 (3")',l:'1965,1',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'22',d:'129,6',e:'acciaio DN 25 (1")',f:'307,1',g:'acciaio DN 40 (1"1/2)',h:'483,1',i:'acciaio DN 50 (2")',j:'1132,6',k:'acciaio DN 80 (3")',l:'1964,1',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'23',d:'129,3',e:'acciaio DN 25 (1")',f:'306,6',g:'acciaio DN 40 (1"1/2)',h:'482,5',i:'acciaio DN 50 (2")',j:'1131,8',k:'acciaio DN 80 (3")',l:'1963',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'24',d:'129',e:'acciaio DN 25 (1")',f:'306,2',g:'acciaio DN 40 (1"1/2)',h:'481,9',i:'acciaio DN 50 (2")',j:'1131',k:'acciaio DN 80 (3")',l:'1962',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'25',d:'128,7',e:'acciaio DN 25 (1")',f:'305,7',g:'acciaio DN 40 (1"1/2)',h:'481,4',i:'acciaio DN 50 (2")',j:'1130,2',k:'acciaio DN 80 (3")',l:'1961',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'26',d:'128,4',e:'acciaio DN 25 (1")',f:'305,3',g:'acciaio DN 40 (1"1/2)',h:'480,8',i:'acciaio DN 50 (2")',j:'1129,4',k:'acciaio DN 80 (3")',l:'1960',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'27',d:'128,1',e:'acciaio DN 25 (1")',f:'304,8',g:'acciaio DN 40 (1"1/2)',h:'480,3',i:'acciaio DN 50 (2")',j:'1128,6',k:'acciaio DN 80 (3")',l:'1958,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'28',d:'127,8',e:'acciaio DN 25 (1")',f:'304,4',g:'acciaio DN 40 (1"1/2)',h:'479,7',i:'acciaio DN 50 (2")',j:'1127,8',k:'acciaio DN 80 (3")',l:'1957,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'29',d:'127,5',e:'acciaio DN 25 (1")',f:'303,9',g:'acciaio DN 40 (1"1/2)',h:'479,2',i:'acciaio DN 50 (2")',j:'1127',k:'acciaio DN 80 (3")',l:'1956,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'30',d:'127',e:'acciaio DN 25 (1")',f:'303,5',g:'acciaio DN 40 (1"1/2)',h:'478,6',i:'acciaio DN 50 (2")',j:'1126,2',k:'acciaio DN 80 (3")',l:'1955,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'31',d:'124,7',e:'acciaio DN 25 (1")',f:'303,1',g:'acciaio DN 40 (1"1/2)',h:'478,1',i:'acciaio DN 50 (2")',j:'1125,4',k:'acciaio DN 80 (3")',l:'1954,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'32',d:'122,5',e:'acciaio DN 25 (1")',f:'302,6',g:'acciaio DN 40 (1"1/2)',h:'477,5',i:'acciaio DN 50 (2")',j:'1124,6',k:'acciaio DN 80 (3")',l:'1953,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'33',d:'120,5',e:'acciaio DN 25 (1")',f:'302,2',g:'acciaio DN 40 (1"1/2)',h:'477',i:'acciaio DN 50 (2")',j:'1123,8',k:'acciaio DN 80 (3")',l:'1952,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'34',d:'118,5',e:'acciaio DN 25 (1")',f:'301,7',g:'acciaio DN 40 (1"1/2)',h:'476,5',i:'acciaio DN 50 (2")',j:'1123',k:'acciaio DN 80 (3")',l:'1951,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'35',d:'116,7',e:'acciaio DN 25 (1")',f:'301,3',g:'acciaio DN 40 (1"1/2)',h:'475,9',i:'acciaio DN 50 (2")',j:'1122,2',k:'acciaio DN 80 (3")',l:'1950,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'36',d:'114,9',e:'acciaio DN 25 (1")',f:'300,9',g:'acciaio DN 40 (1"1/2)',h:'475,4',i:'acciaio DN 50 (2")',j:'1121,4',k:'acciaio DN 80 (3")',l:'1949,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'37',d:'113,1',e:'acciaio DN 25 (1")',f:'300,4',g:'acciaio DN 40 (1"1/2)',h:'474,9',i:'acciaio DN 50 (2")',j:'1120,6',k:'acciaio DN 80 (3")',l:'1948,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'38',d:'111,5',e:'acciaio DN 25 (1")',f:'300',g:'acciaio DN 40 (1"1/2)',h:'474,3',i:'acciaio DN 50 (2")',j:'1119,8',k:'acciaio DN 80 (3")',l:'1947,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'39',d:'109,9',e:'acciaio DN 25 (1")',f:'299,6',g:'acciaio DN 40 (1"1/2)',h:'473,8',i:'acciaio DN 50 (2")',j:'1119',k:'acciaio DN 80 (3")',l:'1946,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'40',d:'108,4',e:'acciaio DN 25 (1")',f:'299,2',g:'acciaio DN 40 (1"1/2)',h:'473,3',i:'acciaio DN 50 (2")',j:'1118,3',k:'acciaio DN 80 (3")',l:'1945,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'41',d:'106,9',e:'acciaio DN 25 (1")',f:'298,7',g:'acciaio DN 40 (1"1/2)',h:'472,7',i:'acciaio DN 50 (2")',j:'1117,5',k:'acciaio DN 80 (3")',l:'1944,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'42',d:'105,5',e:'acciaio DN 25 (1")',f:'298,3',g:'acciaio DN 40 (1"1/2)',h:'472,2',i:'acciaio DN 50 (2")',j:'1116,7',k:'acciaio DN 80 (3")',l:'1943,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'43',d:'104,2',e:'acciaio DN 25 (1")',f:'297,9',g:'acciaio DN 40 (1"1/2)',h:'471,7',i:'acciaio DN 50 (2")',j:'1115,9',k:'acciaio DN 80 (3")',l:'1942,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'44',d:'102,9',e:'acciaio DN 25 (1")',f:'297,5',g:'acciaio DN 40 (1"1/2)',h:'471,1',i:'acciaio DN 50 (2")',j:'1115,1',k:'acciaio DN 80 (3")',l:'1941,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'45',d:'101,6',e:'acciaio DN 25 (1")',f:'297',g:'acciaio DN 40 (1"1/2)',h:'470,6',i:'acciaio DN 50 (2")',j:'1114,3',k:'acciaio DN 80 (3")',l:'1940,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'46',d:'100,4',e:'acciaio DN 25 (1")',f:'296,6',g:'acciaio DN 40 (1"1/2)',h:'470,1',i:'acciaio DN 50 (2")',j:'1113,6',k:'acciaio DN 80 (3")',l:'1939,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'47',d:'99,2',e:'acciaio DN 25 (1")',f:'296,2',g:'acciaio DN 40 (1"1/2)',h:'469,6',i:'acciaio DN 50 (2")',j:'1112,8',k:'acciaio DN 80 (3")',l:'1938,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'48',d:'98,1',e:'acciaio DN 25 (1")',f:'295,8',g:'acciaio DN 40 (1"1/2)',h:'469,1',i:'acciaio DN 50 (2")',j:'1112',k:'acciaio DN 80 (3")',l:'1937,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'49',d:'97',e:'acciaio DN 25 (1")',f:'295,4',g:'acciaio DN 40 (1"1/2)',h:'468,5',i:'acciaio DN 50 (2")',j:'1111,2',k:'acciaio DN 80 (3")',l:'1936,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'50',d:'95,9',e:'acciaio DN 25 (1")',f:'292,3',g:'acciaio DN 40 (1"1/2)',h:'468',i:'acciaio DN 50 (2")',j:'1110,5',k:'acciaio DN 80 (3")',l:'1935,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'55',d:'91',e:'acciaio DN 25 (1")',f:'277,4',g:'acciaio DN 40 (1"1/2)',h:'465,5',i:'acciaio DN 50 (2")',j:'1106,6',k:'acciaio DN 80 (3")',l:'1930,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'60',d:'86,8',e:'acciaio DN 25 (1")',f:'264,5',g:'acciaio DN 40 (1"1/2)',h:'462,9',i:'acciaio DN 50 (2")',j:'1102,8',k:'acciaio DN 80 (3")',l:'1926',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'65',d:'83',e:'acciaio DN 25 (1")',f:'253,1',g:'acciaio DN 40 (1"1/2)',h:'456,4',i:'acciaio DN 50 (2")',j:'1099,1',k:'acciaio DN 80 (3")',l:'1921,1',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'70',d:'79,7',e:'acciaio DN 25 (1")',f:'243',g:'acciaio DN 40 (1"1/2)',h:'438,2',i:'acciaio DN 50 (2")',j:'1095,3',k:'acciaio DN 80 (3")',l:'1916,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'75',d:'76,7',e:'acciaio DN 25 (1")',f:'234',g:'acciaio DN 40 (1"1/2)',h:'421,9',i:'acciaio DN 50 (2")',j:'1091,6',k:'acciaio DN 80 (3")',l:'1911,5',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'80',d:'74,1',e:'acciaio DN 25 (1")',f:'225,8',g:'acciaio DN 40 (1"1/2)',h:'407,2',i:'acciaio DN 50 (2")',j:'1088',k:'acciaio DN 80 (3")',l:'1906,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'85',d:'71,6',e:'acciaio DN 25 (1")',f:'218,4',g:'acciaio DN 40 (1"1/2)',h:'393,9',i:'acciaio DN 50 (2")',j:'1084,3',k:'acciaio DN 80 (3")',l:'1902',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'90',d:'69,4',e:'acciaio DN 25 (1")',f:'211,6',g:'acciaio DN 40 (1"1/2)',h:'381,7',i:'acciaio DN 50 (2")',j:'1080,7',k:'acciaio DN 80 (3")',l:'1897,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'95',d:'67,4',e:'acciaio DN 25 (1")',f:'205,5',g:'acciaio DN 40 (1"1/2)',h:'370,5',i:'acciaio DN 50 (2")',j:'1077,1',k:'acciaio DN 80 (3")',l:'1892,6',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'100',d:'65,5',e:'acciaio DN 25 (1")',f:'199,7',g:'acciaio DN 40 (1"1/2)',h:'360,2',i:'acciaio DN 50 (2")',j:'1073,6',k:'acciaio DN 80 (3")',l:'1887,9',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'105',d:'63,8',e:'acciaio DN 25 (1")',f:'194,5',g:'acciaio DN 40 (1"1/2)',h:'350,7',i:'acciaio DN 50 (2")',j:'1069,6',k:'acciaio DN 80 (3")',l:'1883,3',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'110',d:'62,2',e:'acciaio DN 25 (1")',f:'189,6',g:'acciaio DN 40 (1"1/2)',h:'341,9',i:'acciaio DN 50 (2")',j:'1042,6',k:'acciaio DN 80 (3")',l:'1878,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'115',d:'60,7',e:'acciaio DN 25 (1")',f:'185',g:'acciaio DN 40 (1"1/2)',h:'333,6',i:'acciaio DN 50 (2")',j:'1017,4',k:'acciaio DN 80 (3")',l:'1874,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'120',d:'59,3',e:'acciaio DN 25 (1")',f:'180,7',g:'acciaio DN 40 (1"1/2)',h:'325,9',i:'acciaio DN 50 (2")',j:'993,9',k:'acciaio DN 80 (3")',l:'1869,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'125',d:'58',e:'acciaio DN 25 (1")',f:'176,7',g:'acciaio DN 40 (1"1/2)',h:'318,7',i:'acciaio DN 50 (2")',j:'971,9',k:'acciaio DN 80 (3")',l:'1865,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'130',d:'56,7',e:'acciaio DN 25 (1")',f:'172,9',g:'acciaio DN 40 (1"1/2)',h:'311,9',i:'acciaio DN 50 (2")',j:'951,1',k:'acciaio DN 80 (3")',l:'1860,7',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'135',d:'55,6',e:'acciaio DN 25 (1")',f:'169,4',g:'acciaio DN 40 (1"1/2)',h:'305,5',i:'acciaio DN 50 (2")',j:'931,6',k:'acciaio DN 80 (3")',l:'1856,2',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'140',d:'54,5',e:'acciaio DN 25 (1")',f:'166',g:'acciaio DN 40 (1"1/2)',h:'299,4',i:'acciaio DN 50 (2")',j:'913,2',k:'acciaio DN 80 (3")',l:'1851,8',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'145',d:'53,4',e:'acciaio DN 25 (1")',f:'162,9',g:'acciaio DN 40 (1"1/2)',h:'293,7',i:'acciaio DN 50 (2")',j:'895,7',k:'acciaio DN 80 (3")',l:'1846',m:'acciaio DN 100 (4")'},
        {A:'4°',b:'ACCIAIO',c:'150',d:'52,4',e:'acciaio DN 25 (1")',f:'159,9',g:'acciaio DN 40 (1"1/2)',h:'288,3',i:'acciaio DN 50 (2")',j:'879,2',k:'acciaio DN 80 (3")',l:'1812',m:'acciaio DN 100 (4")'},
        {A:'7°',b:'POLIETILENE',c:'1',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'2',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'3',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'4',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'5',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'6',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'7',d:'24,4',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'8',d:'23,8',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'9',d:'22,3',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'10',d:'21',e:'polietilene DN40 DE50 (1"1/2)',f:'37,3',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'11',d:'20',e:'polietilene DN40 DE50 (1"1/2)',f:'36,8',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'12',d:'19',e:'polietilene DN40 DE50 (1"1/2)',f:'35,1',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'13',d:'18,2',e:'polietilene DN40 DE50 (1"1/2)',f:'33,6',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'14',d:'17,5',e:'polietilene DN40 DE50 (1"1/2)',f:'32,2',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'15',d:'16,8',e:'polietilene DN40 DE50 (1"1/2)',f:'31',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'16',d:'16,3',e:'polietilene DN40 DE50 (1"1/2)',f:'30',g:'polietilene DN50 DE63 (2")',h:'76,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'17',d:'15,7',e:'polietilene DN40 DE50 (1"1/2)',f:'29',g:'polietilene DN50 DE63 (2")',h:'75',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'18',d:'15,2',e:'polietilene DN40 DE50 (1"1/2)',f:'28,1',g:'polietilene DN50 DE63 (2")',h:'72,7',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'19',d:'14,8',e:'polietilene DN40 DE50 (1"1/2)',f:'27,3',g:'polietilene DN50 DE63 (2")',h:'70,5',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'20',d:'14,4',e:'polietilene DN40 DE50 (1"1/2)',f:'26,5',g:'polietilene DN50 DE63 (2")',h:'68,6',i:'polietilene DN80 DE90 (3")',j:'114,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'21',d:'14',e:'polietilene DN40 DE50 (1"1/2)',f:'25,8',g:'polietilene DN50 DE63 (2")',h:'66,8',i:'polietilene DN80 DE90 (3")',j:'113,8',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'22',d:'13,6',e:'polietilene DN40 DE50 (1"1/2)',f:'25,2',g:'polietilene DN50 DE63 (2")',h:'65,1',i:'polietilene DN80 DE90 (3")',j:'110,9',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'23',d:'13,3',e:'polietilene DN40 DE50 (1"1/2)',f:'24,5',g:'polietilene DN50 DE63 (2")',h:'63,5',i:'polietilene DN80 DE90 (3")',j:'108,2',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'24',d:'13',e:'polietilene DN40 DE50 (1"1/2)',f:'24',g:'polietilene DN50 DE63 (2")',h:'62',i:'polietilene DN80 DE90 (3")',j:'105,7',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'25',d:'12,7',e:'polietilene DN40 DE50 (1"1/2)',f:'23,4',g:'polietilene DN50 DE63 (2")',h:'60,7',i:'polietilene DN80 DE90 (3")',j:'103,4',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'26',d:'12,4',e:'polietilene DN40 DE50 (1"1/2)',f:'22,9',g:'polietilene DN50 DE63 (2")',h:'59,4',i:'polietilene DN80 DE90 (3")',j:'101,2',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'27',d:'12,2',e:'polietilene DN40 DE50 (1"1/2)',f:'22,5',g:'polietilene DN50 DE63 (2")',h:'58,2',i:'polietilene DN80 DE90 (3")',j:'99,1',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'28',d:'12',e:'polietilene DN40 DE50 (1"1/2)',f:'22',g:'polietilene DN50 DE63 (2")',h:'57',i:'polietilene DN80 DE90 (3")',j:'97,1',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'29',d:'11,7',e:'polietilene DN40 DE50 (1"1/2)',f:'21,6',g:'polietilene DN50 DE63 (2")',h:'55,9',i:'polietilene DN80 DE90 (3")',j:'95,3',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'30',d:'11,5',e:'polietilene DN40 DE50 (1"1/2)',f:'21,2',g:'polietilene DN50 DE63 (2")',h:'54,9',i:'polietilene DN80 DE90 (3")',j:'93,5',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'31',d:'11,3',e:'polietilene DN40 DE50 (1"1/2)',f:'20,8',g:'polietilene DN50 DE63 (2")',h:'53,9',i:'polietilene DN80 DE90 (3")',j:'91,8',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'32',d:'11,1',e:'polietilene DN40 DE50 (1"1/2)',f:'20,5',g:'polietilene DN50 DE63 (2")',h:'53',i:'polietilene DN80 DE90 (3")',j:'90,3',k:'polietilene DN100 DE110 (4")',l:'241,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'33',d:'10,9',e:'polietilene DN40 DE50 (1"1/2)',f:'20,1',g:'polietilene DN50 DE63 (2")',h:'52,1',i:'polietilene DN80 DE90 (3")',j:'88,7',k:'polietilene DN100 DE110 (4")',l:'238,8',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'34',d:'10,7',e:'polietilene DN40 DE50 (1"1/2)',f:'19,8',g:'polietilene DN50 DE63 (2")',h:'51,2',i:'polietilene DN80 DE90 (3")',j:'87,3',k:'polietilene DN100 DE110 (4")',l:'235',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'35',d:'10,6',e:'polietilene DN40 DE50 (1"1/2)',f:'19,5',g:'polietilene DN50 DE63 (2")',h:'50,4',i:'polietilene DN80 DE90 (3")',j:'85,9',k:'polietilene DN100 DE110 (4")',l:'231,2',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'36',d:'10,4',e:'polietilene DN40 DE50 (1"1/2)',f:'19,2',g:'polietilene DN50 DE63 (2")',h:'49,7',i:'polietilene DN80 DE90 (3")',j:'84,6',k:'polietilene DN100 DE110 (4")',l:'227,7',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'37',d:'10,3',e:'polietilene DN40 DE50 (1"1/2)',f:'18,9',g:'polietilene DN50 DE63 (2")',h:'48,9',i:'polietilene DN80 DE90 (3")',j:'83,3',k:'polietilene DN100 DE110 (4")',l:'224,3',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'38',d:'10,1',e:'polietilene DN40 DE50 (1"1/2)',f:'18,6',g:'polietilene DN50 DE63 (2")',h:'48,2',i:'polietilene DN80 DE90 (3")',j:'82,1',k:'polietilene DN100 DE110 (4")',l:'221',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'39',d:'10',e:'polietilene DN40 DE50 (1"1/2)',f:'18,4',g:'polietilene DN50 DE63 (2")',h:'47,5',i:'polietilene DN80 DE90 (3")',j:'81',k:'polietilene DN100 DE110 (4")',l:'217,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'40',d:'9,8',e:'polietilene DN40 DE50 (1"1/2)',f:'18,1',g:'polietilene DN50 DE63 (2")',h:'46,9',i:'polietilene DN80 DE90 (3")',j:'79,8',k:'polietilene DN100 DE110 (4")',l:'214,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'41',d:'9,7',e:'polietilene DN40 DE50 (1"1/2)',f:'17,9',g:'polietilene DN50 DE63 (2")',h:'46,2',i:'polietilene DN80 DE90 (3")',j:'78,8',k:'polietilene DN100 DE110 (4")',l:'212',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'42',d:'9,6',e:'polietilene DN40 DE50 (1"1/2)',f:'17,6',g:'polietilene DN50 DE63 (2")',h:'45,6',i:'polietilene DN80 DE90 (3")',j:'77,7',k:'polietilene DN100 DE110 (4")',l:'209,2',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'43',d:'9,4',e:'polietilene DN40 DE50 (1"1/2)',f:'17,4',g:'polietilene DN50 DE63 (2")',h:'45',i:'polietilene DN80 DE90 (3")',j:'76,7',k:'polietilene DN100 DE110 (4")',l:'206,5',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'44',d:'9,3',e:'polietilene DN40 DE50 (1"1/2)',f:'17,2',g:'polietilene DN50 DE63 (2")',h:'44,5',i:'polietilene DN80 DE90 (3")',j:'75,8',k:'polietilene DN100 DE110 (4")',l:'203,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'45',d:'9,2',e:'polietilene DN40 DE50 (1"1/2)',f:'17',g:'polietilene DN50 DE63 (2")',h:'43,9',i:'polietilene DN80 DE90 (3")',j:'74,8',k:'polietilene DN100 DE110 (4")',l:'201,4',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'46',d:'9,1',e:'polietilene DN40 DE50 (1"1/2)',f:'16,8',g:'polietilene DN50 DE63 (2")',h:'43,4',i:'polietilene DN80 DE90 (3")',j:'73,9',k:'polietilene DN100 DE110 (4")',l:'199',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'47',d:'9',e:'polietilene DN40 DE50 (1"1/2)',f:'16,6',g:'polietilene DN50 DE63 (2")',h:'42,9',i:'polietilene DN80 DE90 (3")',j:'73,1',k:'polietilene DN100 DE110 (4")',l:'196,7',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'48',d:'8,9',e:'polietilene DN40 DE50 (1"1/2)',f:'16,4',g:'polietilene DN50 DE63 (2")',h:'42,4',i:'polietilene DN80 DE90 (3")',j:'72,2',k:'polietilene DN100 DE110 (4")',l:'194,4',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'49',d:'8,8',e:'polietilene DN40 DE50 (1"1/2)',f:'16,2',g:'polietilene DN50 DE63 (2")',h:'41,9',i:'polietilene DN80 DE90 (3")',j:'71,4',k:'polietilene DN100 DE110 (4")',l:'192,2',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'50',d:'8,7',e:'polietilene DN40 DE50 (1"1/2)',f:'16',g:'polietilene DN50 DE63 (2")',h:'41,5',i:'polietilene DN80 DE90 (3")',j:'70,6',k:'polietilene DN100 DE110 (4")',l:'190,1',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'55',d:'8,2',e:'polietilene DN40 DE50 (1"1/2)',f:'15,2',g:'polietilene DN50 DE63 (2")',h:'39,3',i:'polietilene DN80 DE90 (3")',j:'67',k:'polietilene DN100 DE110 (4")',l:'180,4',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'60',d:'7,9',e:'polietilene DN40 DE50 (1"1/2)',f:'14,5',g:'polietilene DN50 DE63 (2")',h:'37,5',i:'polietilene DN80 DE90 (3")',j:'63,9',k:'polietilene DN100 DE110 (4")',l:'172',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'65',d:'7,5',e:'polietilene DN40 DE50 (1"1/2)',f:'13,9',g:'polietilene DN50 DE63 (2")',h:'35,9',i:'polietilene DN80 DE90 (3")',j:'61,1',k:'polietilene DN100 DE110 (4")',l:'164,6',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'70',d:'7,2',e:'polietilene DN40 DE50 (1"1/2)',f:'13,3',g:'polietilene DN50 DE63 (2")',h:'34,5',i:'polietilene DN80 DE90 (3")',j:'58,7',k:'polietilene DN100 DE110 (4")',l:'158',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'75',d:'7',e:'polietilene DN40 DE50 (1"1/2)',f:'12,8',g:'polietilene DN50 DE63 (2")',h:'33,2',i:'polietilene DN80 DE90 (3")',j:'56,5',k:'polietilene DN100 DE110 (4")',l:'152,1',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'80',d:'6,7',e:'polietilene DN40 DE50 (1"1/2)',f:'12,4',g:'polietilene DN50 DE63 (2")',h:'32',i:'polietilene DN80 DE90 (3")',j:'54,6',k:'polietilene DN100 DE110 (4")',l:'146,8',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'85',d:'6,5',e:'polietilene DN40 DE50 (1"1/2)',f:'12',g:'polietilene DN50 DE63 (2")',h:'31',i:'polietilene DN80 DE90 (3")',j:'52,8',k:'polietilene DN100 DE110 (4")',l:'142',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'90',d:'6,3',e:'polietilene DN40 DE50 (1"1/2)',f:'11,6',g:'polietilene DN50 DE63 (2")',h:'30',i:'polietilene DN80 DE90 (3")',j:'51,1',k:'polietilene DN100 DE110 (4")',l:'137,6',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'95',d:'6,1',e:'polietilene DN40 DE50 (1"1/2)',f:'11,3',g:'polietilene DN50 DE63 (2")',h:'29,1',i:'polietilene DN80 DE90 (3")',j:'49,6',k:'polietilene DN100 DE110 (4")',l:'133,6',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'100',d:'5,9',e:'polietilene DN40 DE50 (1"1/2)',f:'10,9',g:'polietilene DN50 DE63 (2")',h:'28,3',i:'polietilene DN80 DE90 (3")',j:'48,3',k:'polietilene DN100 DE110 (4")',l:'129,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'105',d:'5,8',e:'polietilene DN40 DE50 (1"1/2)',f:'10,7',g:'polietilene DN50 DE63 (2")',h:'27,6',i:'polietilene DN80 DE90 (3")',j:'47',k:'polietilene DN100 DE110 (4")',l:'126,5',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'110',d:'5,6',e:'polietilene DN40 DE50 (1"1/2)',f:'10,4',g:'polietilene DN50 DE63 (2")',h:'26,9',i:'polietilene DN80 DE90 (3")',j:'45,8',k:'polietilene DN100 DE110 (4")',l:'123,3',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'115',d:'5,5',e:'polietilene DN40 DE50 (1"1/2)',f:'10,1',g:'polietilene DN50 DE63 (2")',h:'26,2',i:'polietilene DN80 DE90 (3")',j:'44,7',k:'polietilene DN100 DE110 (4")',l:'120,3',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'120',d:'5,4',e:'polietilene DN40 DE50 (1"1/2)',f:'9,9',g:'polietilene DN50 DE63 (2")',h:'25,6',i:'polietilene DN80 DE90 (3")',j:'43,7',k:'polietilene DN100 DE110 (4")',l:'117,5',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'125',d:'5,3',e:'polietilene DN40 DE50 (1"1/2)',f:'9,7',g:'polietilene DN50 DE63 (2")',h:'25,1',i:'polietilene DN80 DE90 (3")',j:'42,7',k:'polietilene DN100 DE110 (4")',l:'114,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'130',d:'5,1',e:'polietilene DN40 DE50 (1"1/2)',f:'9,5',g:'polietilene DN50 DE63 (2")',h:'24,5',i:'polietilene DN80 DE90 (3")',j:'41,8',k:'polietilene DN100 DE110 (4")',l:'112,5',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'135',d:'5',e:'polietilene DN40 DE50 (1"1/2)',f:'9,3',g:'polietilene DN50 DE63 (2")',h:'24',i:'polietilene DN80 DE90 (3")',j:'40,9',k:'polietilene DN100 DE110 (4")',l:'110,1',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'140',d:'4,9',e:'polietilene DN40 DE50 (1"1/2)',f:'9,1',g:'polietilene DN50 DE63 (2")',h:'23,5',i:'polietilene DN80 DE90 (3")',j:'40,1',k:'polietilene DN100 DE110 (4")',l:'108',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'145',d:'4,8',e:'polietilene DN40 DE50 (1"1/2)',f:'8,9',g:'polietilene DN50 DE63 (2")',h:'23,1',i:'polietilene DN80 DE90 (3")',j:'39,3',k:'polietilene DN100 DE110 (4")',l:'105,9',m:'polietilene DN150 DE160 (6")'},
        {A:'7°',b:'POLIETILENE',c:'150',d:'4,8',e:'polietilene DN40 DE50 (1"1/2)',f:'8,8',g:'polietilene DN50 DE63 (2")',h:'22,7',i:'polietilene DN80 DE90 (3")',j:'38,6',k:'polietilene DN100 DE110 (4")',l:'103,9',m:'polietilene DN150 DE160 (6")'},
        {A:'6°',b:'POLIETILENE',c:'1',d:'30,1',e:'polietilene DN25 DE32 (1")',f:'74,1',g:'polietilene DN40 DE50 (1"1/2)',h:'117,7',i:'polietilene DN50 DE63 (2")',j:'241,4',k:'polietilene DN80 DE90 (3")',l:'360,9',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'2',d:'29,8',e:'polietilene DN25 DE32 (1")',f:'74,1',g:'polietilene DN40 DE50 (1"1/2)',h:'117,6',i:'polietilene DN50 DE63 (2")',j:'241,3',k:'polietilene DN80 DE90 (3")',l:'360,8',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'3',d:'23,8',e:'polietilene DN25 DE32 (1")',f:'74',g:'polietilene DN40 DE50 (1"1/2)',h:'117,6',i:'polietilene DN50 DE63 (2")',j:'241,2',k:'polietilene DN80 DE90 (3")',l:'360,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'4',d:'20,3',e:'polietilene DN25 DE32 (1")',f:'67,1',g:'polietilene DN40 DE50 (1"1/2)',h:'117,5',i:'polietilene DN50 DE63 (2")',j:'241,1',k:'polietilene DN80 DE90 (3")',l:'360,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'5',d:'18',e:'polietilene DN25 DE32 (1")',f:'59,3',g:'polietilene DN40 DE50 (1"1/2)',h:'109,4',i:'polietilene DN50 DE63 (2")',j:'241',k:'polietilene DN80 DE90 (3")',l:'360,5',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'6',d:'16,3',e:'polietilene DN25 DE32 (1")',f:'53,7',g:'polietilene DN40 DE50 (1"1/2)',h:'99',i:'polietilene DN50 DE63 (2")',j:'240,9',k:'polietilene DN80 DE90 (3")',l:'360,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'7',d:'15',e:'polietilene DN25 DE32 (1")',f:'49,3',g:'polietilene DN40 DE50 (1"1/2)',h:'90,9',i:'polietilene DN50 DE63 (2")',j:'235,3',k:'polietilene DN80 DE90 (3")',l:'360,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'8',d:'13,9',e:'polietilene DN25 DE32 (1")',f:'45,8',g:'polietilene DN40 DE50 (1"1/2)',h:'84,5',i:'polietilene DN50 DE63 (2")',j:'218,7',k:'polietilene DN80 DE90 (3")',l:'360,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'9',d:'13',e:'polietilene DN25 DE32 (1")',f:'43',g:'polietilene DN40 DE50 (1"1/2)',h:'79,2',i:'polietilene DN50 DE63 (2")',j:'205',k:'polietilene DN80 DE90 (3")',l:'349,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'10',d:'12,3',e:'polietilene DN25 DE32 (1")',f:'40,6',g:'polietilene DN40 DE50 (1"1/2)',h:'74,8',i:'polietilene DN50 DE63 (2")',j:'193,4',k:'polietilene DN80 DE90 (3")',l:'329,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'11',d:'11,7',e:'polietilene DN25 DE32 (1")',f:'38,5',g:'polietilene DN40 DE50 (1"1/2)',h:'70,9',i:'polietilene DN50 DE63 (2")',j:'183,6',k:'polietilene DN80 DE90 (3")',l:'312,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'12',d:'11,1',e:'polietilene DN25 DE32 (1")',f:'36,7',g:'polietilene DN40 DE50 (1"1/2)',h:'67,6',i:'polietilene DN50 DE63 (2")',j:'175',k:'polietilene DN80 DE90 (3")',l:'298,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'13',d:'10,6',e:'polietilene DN25 DE32 (1")',f:'35,1',g:'polietilene DN40 DE50 (1"1/2)',h:'64,7',i:'polietilene DN50 DE63 (2")',j:'167,5',k:'polietilene DN80 DE90 (3")',l:'285,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'14',d:'10,2',e:'polietilene DN25 DE32 (1")',f:'33,7',g:'polietilene DN40 DE50 (1"1/2)',h:'62,1',i:'polietilene DN50 DE63 (2")',j:'160,8',k:'polietilene DN80 DE90 (3")',l:'273,9',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'15',d:'9,8',e:'polietilene DN25 DE32 (1")',f:'32,5',g:'polietilene DN40 DE50 (1"1/2)',h:'59,8',i:'polietilene DN50 DE63 (2")',j:'154,8',k:'polietilene DN80 DE90 (3")',l:'263,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'16',d:'9,5',e:'polietilene DN25 DE32 (1")',f:'31,3',g:'polietilene DN40 DE50 (1"1/2)',h:'57,7',i:'polietilene DN50 DE63 (2")',j:'149,4',k:'polietilene DN80 DE90 (3")',l:'254,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'17',d:'9,2',e:'polietilene DN25 DE32 (1")',f:'30,3',g:'polietilene DN40 DE50 (1"1/2)',h:'55,9',i:'polietilene DN50 DE63 (2")',j:'144,5',k:'polietilene DN80 DE90 (3")',l:'246,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'18',d:'8,9',e:'polietilene DN25 DE32 (1")',f:'29,4',g:'polietilene DN40 DE50 (1"1/2)',h:'54,1',i:'polietilene DN50 DE63 (2")',j:'140,1',k:'polietilene DN80 DE90 (3")',l:'238,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'19',d:'8,6',e:'polietilene DN25 DE32 (1")',f:'28,5',g:'polietilene DN40 DE50 (1"1/2)',h:'52,5',i:'polietilene DN50 DE63 (2")',j:'136',k:'polietilene DN80 DE90 (3")',l:'231,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'20',d:'8,4',e:'polietilene DN25 DE32 (1")',f:'27,7',g:'polietilene DN40 DE50 (1"1/2)',h:'51,1',i:'polietilene DN50 DE63 (2")',j:'132,2',k:'polietilene DN80 DE90 (3")',l:'225,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'21',d:'8,2',e:'polietilene DN25 DE32 (1")',f:'27',g:'polietilene DN40 DE50 (1"1/2)',h:'49,7',i:'polietilene DN50 DE63 (2")',j:'128,7',k:'polietilene DN80 DE90 (3")',l:'219,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'22',d:'8',e:'polietilene DN25 DE32 (1")',f:'26,3',g:'polietilene DN40 DE50 (1"1/2)',h:'48,5',i:'polietilene DN50 DE63 (2")',j:'125,4',k:'polietilene DN80 DE90 (3")',l:'213,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'23',d:'7,8',e:'polietilene DN25 DE32 (1")',f:'25,7',g:'polietilene DN40 DE50 (1"1/2)',h:'47,3',i:'polietilene DN50 DE63 (2")',j:'122,4',k:'polietilene DN80 DE90 (3")',l:'208,5',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'24',d:'7,6',e:'polietilene DN25 DE32 (1")',f:'25,1',g:'polietilene DN40 DE50 (1"1/2)',h:'46,2',i:'polietilene DN50 DE63 (2")',j:'119,6',k:'polietilene DN80 DE90 (3")',l:'203,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'25',d:'7,4',e:'polietilene DN25 DE32 (1")',f:'24,5',g:'polietilene DN40 DE50 (1"1/2)',h:'45,2',i:'polietilene DN50 DE63 (2")',j:'116,9',k:'polietilene DN80 DE90 (3")',l:'199,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'26',d:'7,3',e:'polietilene DN25 DE32 (1")',f:'24',g:'polietilene DN40 DE50 (1"1/2)',h:'44,2',i:'polietilene DN50 DE63 (2")',j:'114,4',k:'polietilene DN80 DE90 (3")',l:'195',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'27',d:'7,1',e:'polietilene DN25 DE32 (1")',f:'23,5',g:'polietilene DN40 DE50 (1"1/2)',h:'43,3',i:'polietilene DN50 DE63 (2")',j:'112,1',k:'polietilene DN80 DE90 (3")',l:'191',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'28',d:'7',e:'polietilene DN25 DE32 (1")',f:'23',g:'polietilene DN40 DE50 (1"1/2)',h:'42,5',i:'polietilene DN50 DE63 (2")',j:'109,9',k:'polietilene DN80 DE90 (3")',l:'187,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'29',d:'6,9',e:'polietilene DN25 DE32 (1")',f:'22,6',g:'polietilene DN40 DE50 (1"1/2)',h:'41,6',i:'polietilene DN50 DE63 (2")',j:'107,8',k:'polietilene DN80 DE90 (3")',l:'183,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'30',d:'6,7',e:'polietilene DN25 DE32 (1")',f:'22,2',g:'polietilene DN40 DE50 (1"1/2)',h:'40,9',i:'polietilene DN50 DE63 (2")',j:'105,8',k:'polietilene DN80 DE90 (3")',l:'180,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'31',d:'6,6',e:'polietilene DN25 DE32 (1")',f:'21,8',g:'polietilene DN40 DE50 (1"1/2)',h:'40,1',i:'polietilene DN50 DE63 (2")',j:'103,9',k:'polietilene DN80 DE90 (3")',l:'177',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'32',d:'6,5',e:'polietilene DN25 DE32 (1")',f:'21,4',g:'polietilene DN40 DE50 (1"1/2)',h:'39,5',i:'polietilene DN50 DE63 (2")',j:'102,1',k:'polietilene DN80 DE90 (3")',l:'173,9',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'33',d:'6,4',e:'polietilene DN25 DE32 (1")',f:'21',g:'polietilene DN40 DE50 (1"1/2)',h:'38,8',i:'polietilene DN50 DE63 (2")',j:'100,4',k:'polietilene DN80 DE90 (3")',l:'171',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'34',d:'6,3',e:'polietilene DN25 DE32 (1")',f:'20,7',g:'polietilene DN40 DE50 (1"1/2)',h:'38,2',i:'polietilene DN50 DE63 (2")',j:'98,8',k:'polietilene DN80 DE90 (3")',l:'168,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'35',d:'6,2',e:'polietilene DN25 DE32 (1")',f:'20,4',g:'polietilene DN40 DE50 (1"1/2)',h:'37,6',i:'polietilene DN50 DE63 (2")',j:'97,2',k:'polietilene DN80 DE90 (3")',l:'165,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'36',d:'6,1',e:'polietilene DN25 DE32 (1")',f:'20,1',g:'polietilene DN40 DE50 (1"1/2)',h:'37',i:'polietilene DN50 DE63 (2")',j:'95,7',k:'polietilene DN80 DE90 (3")',l:'163',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'37',d:'6',e:'polietilene DN25 DE32 (1")',f:'19,8',g:'polietilene DN40 DE50 (1"1/2)',h:'36,4',i:'polietilene DN50 DE63 (2")',j:'94,3',k:'polietilene DN80 DE90 (3")',l:'160,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'38',d:'5,9',e:'polietilene DN25 DE32 (1")',f:'19,5',g:'polietilene DN40 DE50 (1"1/2)',h:'35,9',i:'polietilene DN50 DE63 (2")',j:'92,9',k:'polietilene DN80 DE90 (3")',l:'158,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'39',d:'5,8',e:'polietilene DN25 DE32 (1")',f:'19,2',g:'polietilene DN40 DE50 (1"1/2)',h:'35,4',i:'polietilene DN50 DE63 (2")',j:'91,6',k:'polietilene DN80 DE90 (3")',l:'356,8',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'40',d:'5,7',e:'polietilene DN25 DE32 (1")',f:'18,9',g:'polietilene DN40 DE50 (1"1/2)',h:'34,9',i:'polietilene DN50 DE63 (2")',j:'90,3',k:'polietilene DN80 DE90 (3")',l:'356,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'41',d:'5,7',e:'polietilene DN25 DE32 (1")',f:'18,7',g:'polietilene DN40 DE50 (1"1/2)',h:'34,4',i:'polietilene DN50 DE63 (2")',j:'89,1',k:'polietilene DN80 DE90 (3")',l:'356,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'42',d:'5,6',e:'polietilene DN25 DE32 (1")',f:'18,4',g:'polietilene DN40 DE50 (1"1/2)',h:'34',i:'polietilene DN50 DE63 (2")',j:'87,9',k:'polietilene DN80 DE90 (3")',l:'356,5',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'43',d:'5,5',e:'polietilene DN25 DE32 (1")',f:'18,2',g:'polietilene DN40 DE50 (1"1/2)',h:'33,5',i:'polietilene DN50 DE63 (2")',j:'86,8',k:'polietilene DN80 DE90 (3")',l:'356,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'44',d:'5,4',e:'polietilene DN25 DE32 (1")',f:'18',g:'polietilene DN40 DE50 (1"1/2)',h:'33,1',i:'polietilene DN50 DE63 (2")',j:'85,7',k:'polietilene DN80 DE90 (3")',l:'356,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'45',d:'5,4',e:'polietilene DN25 DE32 (1")',f:'17,7',g:'polietilene DN40 DE50 (1"1/2)',h:'32,7',i:'polietilene DN50 DE63 (2")',j:'84,7',k:'polietilene DN80 DE90 (3")',l:'356,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'46',d:'5,3',e:'polietilene DN25 DE32 (1")',f:'17,5',g:'polietilene DN40 DE50 (1"1/2)',h:'32,3',i:'polietilene DN50 DE63 (2")',j:'83,6',k:'polietilene DN80 DE90 (3")',l:'356,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'47',d:'5,3',e:'polietilene DN25 DE32 (1")',f:'17,3',g:'polietilene DN40 DE50 (1"1/2)',h:'31,9',i:'polietilene DN50 DE63 (2")',j:'82,7',k:'polietilene DN80 DE90 (3")',l:'356',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'48',d:'5,2',e:'polietilene DN25 DE32 (1")',f:'17,1',g:'polietilene DN40 DE50 (1"1/2)',h:'31,6',i:'polietilene DN50 DE63 (2")',j:'81,7',k:'polietilene DN80 DE90 (3")',l:'355,9',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'49',d:'5,1',e:'polietilene DN25 DE32 (1")',f:'16,9',g:'polietilene DN40 DE50 (1"1/2)',h:'31,2',i:'polietilene DN50 DE63 (2")',j:'80,8',k:'polietilene DN80 DE90 (3")',l:'355,8',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'50',d:'5,1',e:'polietilene DN25 DE32 (1")',f:'16,7',g:'polietilene DN40 DE50 (1"1/2)',h:'30,9',i:'polietilene DN50 DE63 (2")',j:'79,9',k:'polietilene DN80 DE90 (3")',l:'355,7',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'55',d:'4,8',e:'polietilene DN25 DE32 (1")',f:'15,9',g:'polietilene DN40 DE50 (1"1/2)',h:'29,3',i:'polietilene DN50 DE63 (2")',j:'75,8',k:'polietilene DN80 DE90 (3")',l:'355,2',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'60',d:'4,6',e:'polietilene DN25 DE32 (1")',f:'15,2',g:'polietilene DN40 DE50 (1"1/2)',h:'27,9',i:'polietilene DN50 DE63 (2")',j:'72,3',k:'polietilene DN80 DE90 (3")',l:'354,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'65',d:'4,4',e:'polietilene DN25 DE32 (1")',f:'14,5',g:'polietilene DN40 DE50 (1"1/2)',h:'26,7',i:'polietilene DN50 DE63 (2")',j:'69,2',k:'polietilene DN80 DE90 (3")',l:'354,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'70',d:'4,2',e:'polietilene DN25 DE32 (1")',f:'13,9',g:'polietilene DN40 DE50 (1"1/2)',h:'25,7',i:'polietilene DN50 DE63 (2")',j:'66,4',k:'polietilene DN80 DE90 (3")',l:'353,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'75',d:'4,1',e:'polietilene DN25 DE32 (1")',f:'13,4',g:'polietilene DN40 DE50 (1"1/2)',h:'24,7',i:'polietilene DN50 DE63 (2")',j:'63,9',k:'polietilene DN80 DE90 (3")',l:'349,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'80',d:'3,9',e:'polietilene DN25 DE32 (1")',f:'12,9',g:'polietilene DN40 DE50 (1"1/2)',h:'23,8',i:'polietilene DN50 DE63 (2")',j:'61,7',k:'polietilene DN80 DE90 (3")',l:'337,5',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'85',d:'3,8',e:'polietilene DN25 DE32 (1")',f:'12,5',g:'polietilene DN40 DE50 (1"1/2)',h:'23,1',i:'polietilene DN50 DE63 (2")',j:'59,7',k:'polietilene DN80 DE90 (3")',l:'326,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'90',d:'3,7',e:'polietilene DN25 DE32 (1")',f:'12,1',g:'polietilene DN40 DE50 (1"1/2)',h:'22,4',i:'polietilene DN50 DE63 (2")',j:'57,8',k:'polietilene DN80 DE90 (3")',l:'316,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'95',d:'3,6',e:'polietilene DN25 DE32 (1")',f:'11,8',g:'polietilene DN40 DE50 (1"1/2)',h:'21,7',i:'polietilene DN50 DE63 (2")',j:'56,2',k:'polietilene DN80 DE90 (3")',l:'307',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'100',d:'3,5',e:'polietilene DN25 DE32 (1")',f:'11,4',g:'polietilene DN40 DE50 (1"1/2)',h:'21,1',i:'polietilene DN50 DE63 (2")',j:'54,6',k:'polietilene DN80 DE90 (3")',l:'298,5',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'105',d:'3,4',e:'polietilene DN25 DE32 (1")',f:'11,1',g:'polietilene DN40 DE50 (1"1/2)',h:'20,5',i:'polietilene DN50 DE63 (2")',j:'53,1',k:'polietilene DN80 DE90 (3")',l:'290,6',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'110',d:'3,3',e:'polietilene DN25 DE32 (1")',f:'10,9',g:'polietilene DN40 DE50 (1"1/2)',h:'20',i:'polietilene DN50 DE63 (2")',j:'51,8',k:'polietilene DN80 DE90 (3")',l:'283,3',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'115',d:'3,2',e:'polietilene DN25 DE32 (1")',f:'10,6',g:'polietilene DN40 DE50 (1"1/2)',h:'19,5',i:'polietilene DN50 DE63 (2")',j:'50,6',k:'polietilene DN80 DE90 (3")',l:'276,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'120',d:'3,1',e:'polietilene DN25 DE32 (1")',f:'10,4',g:'polietilene DN40 DE50 (1"1/2)',h:'19,1',i:'polietilene DN50 DE63 (2")',j:'49,4',k:'polietilene DN80 DE90 (3")',l:'270,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'125',d:'3,1',e:'polietilene DN25 DE32 (1")',f:'10,1',g:'polietilene DN40 DE50 (1"1/2)',h:'18,7',i:'polietilene DN50 DE63 (2")',j:'48,3',k:'polietilene DN80 DE90 (3")',l:'264,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'130',d:'3',e:'polietilene DN25 DE32 (1")',f:'9,9',g:'polietilene DN40 DE50 (1"1/2)',h:'18,3',i:'polietilene DN50 DE63 (2")',j:'47,3',k:'polietilene DN80 DE90 (3")',l:'258,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'135',d:'2,9',e:'polietilene DN25 DE32 (1")',f:'9,7',g:'polietilene DN40 DE50 (1"1/2)',h:'17,9',i:'polietilene DN50 DE63 (2")',j:'46,3',k:'polietilene DN80 DE90 (3")',l:'253,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'140',d:'2,9',e:'polietilene DN25 DE32 (1")',f:'9,5',g:'polietilene DN40 DE50 (1"1/2)',h:'17,5',i:'polietilene DN50 DE63 (2")',j:'45,4',k:'polietilene DN80 DE90 (3")',l:'248,1',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'145',d:'2,8',e:'polietilene DN25 DE32 (1")',f:'9,3',g:'polietilene DN40 DE50 (1"1/2)',h:'17,2',i:'polietilene DN50 DE63 (2")',j:'44,5',k:'polietilene DN80 DE90 (3")',l:'243,4',m:'polietilene DN100 DE110 (4")'},
        {A:'6°',b:'POLIETILENE',c:'150',d:'2,8',e:'polietilene DN25 DE32 (1")',f:'9,2',g:'polietilene DN40 DE50 (1"1/2)',h:'16,9',i:'polietilene DN50 DE63 (2")',j:'43,7',k:'polietilene DN80 DE90 (3")',l:'238,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'1',d:'43',e:'polietilene DN25 DE32 (1")',f:'106',g:'polietilene DN40 DE50 (1"1/2)',h:'168,3',i:'polietilene DN50 DE63 (2")',j:'345,1',k:'polietilene DN80 DE90 (3")',l:'516',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'2',d:'43',e:'polietilene DN25 DE32 (1")',f:'105,9',g:'polietilene DN40 DE50 (1"1/2)',h:'168,2',i:'polietilene DN50 DE63 (2")',j:'345',k:'polietilene DN80 DE90 (3")',l:'515,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'3',d:'42,9',e:'polietilene DN25 DE32 (1")',f:'105,9',g:'polietilene DN40 DE50 (1"1/2)',h:'168,1',i:'polietilene DN50 DE63 (2")',j:'344,8',k:'polietilene DN80 DE90 (3")',l:'515,8',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'4',d:'42,9',e:'polietilene DN25 DE32 (1")',f:'105,8',g:'polietilene DN40 DE50 (1"1/2)',h:'168',i:'polietilene DN50 DE63 (2")',j:'344,7',k:'polietilene DN80 DE90 (3")',l:'515,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'5',d:'42,8',e:'polietilene DN25 DE32 (1")',f:'105,7',g:'polietilene DN40 DE50 (1"1/2)',h:'167,9',i:'polietilene DN50 DE63 (2")',j:'344,6',k:'polietilene DN80 DE90 (3")',l:'515,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'6',d:'42,8',e:'polietilene DN25 DE32 (1")',f:'105,6',g:'polietilene DN40 DE50 (1"1/2)',h:'167,8',i:'polietilene DN50 DE63 (2")',j:'344,5',k:'polietilene DN80 DE90 (3")',l:'515,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'7',d:'42,7',e:'polietilene DN25 DE32 (1")',f:'105,6',g:'polietilene DN40 DE50 (1"1/2)',h:'167,7',i:'polietilene DN50 DE63 (2")',j:'344,3',k:'polietilene DN80 DE90 (3")',l:'515,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'8',d:'42,7',e:'polietilene DN25 DE32 (1")',f:'105,5',g:'polietilene DN40 DE50 (1"1/2)',h:'167,6',i:'polietilene DN50 DE63 (2")',j:'344,2',k:'polietilene DN80 DE90 (3")',l:'515',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'9',d:'42,6',e:'polietilene DN25 DE32 (1")',f:'105,4',g:'polietilene DN40 DE50 (1"1/2)',h:'167,5',i:'polietilene DN50 DE63 (2")',j:'344,1',k:'polietilene DN80 DE90 (3")',l:'514,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'10',d:'42,6',e:'polietilene DN25 DE32 (1")',f:'105,3',g:'polietilene DN40 DE50 (1"1/2)',h:'167,5',i:'polietilene DN50 DE63 (2")',j:'344',k:'polietilene DN80 DE90 (3")',l:'514,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'11',d:'42,5',e:'polietilene DN25 DE32 (1")',f:'105,3',g:'polietilene DN40 DE50 (1"1/2)',h:'167,4',i:'polietilene DN50 DE63 (2")',j:'343,9',k:'polietilene DN80 DE90 (3")',l:'514,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'12',d:'42,5',e:'polietilene DN25 DE32 (1")',f:'105,2',g:'polietilene DN40 DE50 (1"1/2)',h:'167,3',i:'polietilene DN50 DE63 (2")',j:'343,7',k:'polietilene DN80 DE90 (3")',l:'514,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'13',d:'42,4',e:'polietilene DN25 DE32 (1")',f:'105,1',g:'polietilene DN40 DE50 (1"1/2)',h:'167,2',i:'polietilene DN50 DE63 (2")',j:'343,6',k:'polietilene DN80 DE90 (3")',l:'514,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'14',d:'42,4',e:'polietilene DN25 DE32 (1")',f:'105',g:'polietilene DN40 DE50 (1"1/2)',h:'167,1',i:'polietilene DN50 DE63 (2")',j:'343,5',k:'polietilene DN80 DE90 (3")',l:'514,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'15',d:'42,3',e:'polietilene DN25 DE32 (1")',f:'105',g:'polietilene DN40 DE50 (1"1/2)',h:'167',i:'polietilene DN50 DE63 (2")',j:'343,4',k:'polietilene DN80 DE90 (3")',l:'514',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'16',d:'42,3',e:'polietilene DN25 DE32 (1")',f:'104,9',g:'polietilene DN40 DE50 (1"1/2)',h:'166,9',i:'polietilene DN50 DE63 (2")',j:'343,3',k:'polietilene DN80 DE90 (3")',l:'513,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'17',d:'42,2',e:'polietilene DN25 DE32 (1")',f:'104,8',g:'polietilene DN40 DE50 (1"1/2)',h:'166,8',i:'polietilene DN50 DE63 (2")',j:'343,1',k:'polietilene DN80 DE90 (3")',l:'513,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'18',d:'42,2',e:'polietilene DN25 DE32 (1")',f:'104,7',g:'polietilene DN40 DE50 (1"1/2)',h:'166,7',i:'polietilene DN50 DE63 (2")',j:'343',k:'polietilene DN80 DE90 (3")',l:'513,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'19',d:'42,1',e:'polietilene DN25 DE32 (1")',f:'104,7',g:'polietilene DN40 DE50 (1"1/2)',h:'166,6',i:'polietilene DN50 DE63 (2")',j:'342,9',k:'polietilene DN80 DE90 (3")',l:'513,4',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'20',d:'42,1',e:'polietilene DN25 DE32 (1")',f:'104,6',g:'polietilene DN40 DE50 (1"1/2)',h:'166,6',i:'polietilene DN50 DE63 (2")',j:'342,8',k:'polietilene DN80 DE90 (3")',l:'513,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'21',d:'42',e:'polietilene DN25 DE32 (1")',f:'104,5',g:'polietilene DN40 DE50 (1"1/2)',h:'166,5',i:'polietilene DN50 DE63 (2")',j:'342,6',k:'polietilene DN80 DE90 (3")',l:'513,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'22',d:'42',e:'polietilene DN25 DE32 (1")',f:'104,4',g:'polietilene DN40 DE50 (1"1/2)',h:'166,4',i:'polietilene DN50 DE63 (2")',j:'342,5',k:'polietilene DN80 DE90 (3")',l:'513',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'23',d:'41,2',e:'polietilene DN25 DE32 (1")',f:'104,4',g:'polietilene DN40 DE50 (1"1/2)',h:'166,3',i:'polietilene DN50 DE63 (2")',j:'342,4',k:'polietilene DN80 DE90 (3")',l:'512,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'24',d:'40,2',e:'polietilene DN25 DE32 (1")',f:'104,3',g:'polietilene DN40 DE50 (1"1/2)',h:'166,2',i:'polietilene DN50 DE63 (2")',j:'342,3',k:'polietilene DN80 DE90 (3")',l:'512,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'25',d:'39,3',e:'polietilene DN25 DE32 (1")',f:'104,2',g:'polietilene DN40 DE50 (1"1/2)',h:'166,1',i:'polietilene DN50 DE63 (2")',j:'342,2',k:'polietilene DN80 DE90 (3")',l:'512,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'26',d:'38,5',e:'polietilene DN25 DE32 (1")',f:'104,2',g:'polietilene DN40 DE50 (1"1/2)',h:'166',i:'polietilene DN50 DE63 (2")',j:'342',k:'polietilene DN80 DE90 (3")',l:'512,4',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'27',d:'37,7',e:'polietilene DN25 DE32 (1")',f:'104,1',g:'polietilene DN40 DE50 (1"1/2)',h:'165,9',i:'polietilene DN50 DE63 (2")',j:'341,9',k:'polietilene DN80 DE90 (3")',l:'512,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'28',d:'37',e:'polietilene DN25 DE32 (1")',f:'104',g:'polietilene DN40 DE50 (1"1/2)',h:'165,8',i:'polietilene DN50 DE63 (2")',j:'341,8',k:'polietilene DN80 DE90 (3")',l:'512,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'29',d:'36,3',e:'polietilene DN25 DE32 (1")',f:'103,9',g:'polietilene DN40 DE50 (1"1/2)',h:'165,8',i:'polietilene DN50 DE63 (2")',j:'341,7',k:'polietilene DN80 DE90 (3")',l:'512',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'30',d:'35,6',e:'polietilene DN25 DE32 (1")',f:'103,9',g:'polietilene DN40 DE50 (1"1/2)',h:'165,7',i:'polietilene DN50 DE63 (2")',j:'341,6',k:'polietilene DN80 DE90 (3")',l:'511,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'31',d:'35',e:'polietilene DN25 DE32 (1")',f:'103,8',g:'polietilene DN40 DE50 (1"1/2)',h:'165,6',i:'polietilene DN50 DE63 (2")',j:'341,4',k:'polietilene DN80 DE90 (3")',l:'511,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'32',d:'34,4',e:'polietilene DN25 DE32 (1")',f:'103,7',g:'polietilene DN40 DE50 (1"1/2)',h:'165,5',i:'polietilene DN50 DE63 (2")',j:'341,3',k:'polietilene DN80 DE90 (3")',l:'511,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'33',d:'33,8',e:'polietilene DN25 DE32 (1")',f:'103,7',g:'polietilene DN40 DE50 (1"1/2)',h:'165,4',i:'polietilene DN50 DE63 (2")',j:'341,2',k:'polietilene DN80 DE90 (3")',l:'511,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'34',d:'33,2',e:'polietilene DN25 DE32 (1")',f:'103,6',g:'polietilene DN40 DE50 (1"1/2)',h:'165,3',i:'polietilene DN50 DE63 (2")',j:'341,1',k:'polietilene DN80 DE90 (3")',l:'511,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'35',d:'32,7',e:'polietilene DN25 DE32 (1")',f:'103,5',g:'polietilene DN40 DE50 (1"1/2)',h:'165,2',i:'polietilene DN50 DE63 (2")',j:'341',k:'polietilene DN80 DE90 (3")',l:'511,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'36',d:'32,2',e:'polietilene DN25 DE32 (1")',f:'103,4',g:'polietilene DN40 DE50 (1"1/2)',h:'165,1',i:'polietilene DN50 DE63 (2")',j:'340,8',k:'polietilene DN80 DE90 (3")',l:'511',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'37',d:'31,7',e:'polietilene DN25 DE32 (1")',f:'103,4',g:'polietilene DN40 DE50 (1"1/2)',h:'165,1',i:'polietilene DN50 DE63 (2")',j:'340,7',k:'polietilene DN80 DE90 (3")',l:'510,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'38',d:'31,3',e:'polietilene DN25 DE32 (1")',f:'103,1',g:'polietilene DN40 DE50 (1"1/2)',h:'165',i:'polietilene DN50 DE63 (2")',j:'340,6',k:'polietilene DN80 DE90 (3")',l:'510,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'39',d:'30,8',e:'polietilene DN25 DE32 (1")',f:'101,6',g:'polietilene DN40 DE50 (1"1/2)',h:'164,9',i:'polietilene DN50 DE63 (2")',j:'340,5',k:'polietilene DN80 DE90 (3")',l:'510,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'40',d:'30,4',e:'polietilene DN25 DE32 (1")',f:'100,2',g:'polietilene DN40 DE50 (1"1/2)',h:'164,8',i:'polietilene DN50 DE63 (2")',j:'340,4',k:'polietilene DN80 DE90 (3")',l:'510,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'41',d:'30',e:'polietilene DN25 DE32 (1")',f:'98,9',g:'polietilene DN40 DE50 (1"1/2)',h:'164,7',i:'polietilene DN50 DE63 (2")',j:'340,2',k:'polietilene DN80 DE90 (3")',l:'510,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'42',d:'29,6',e:'polietilene DN25 DE32 (1")',f:'97,6',g:'polietilene DN40 DE50 (1"1/2)',h:'164,6',i:'polietilene DN50 DE63 (2")',j:'340,1',k:'polietilene DN80 DE90 (3")',l:'510,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'43',d:'29,2',e:'polietilene DN25 DE32 (1")',f:'96,3',g:'polietilene DN40 DE50 (1"1/2)',h:'164,5',i:'polietilene DN50 DE63 (2")',j:'340',k:'polietilene DN80 DE90 (3")',l:'510',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'44',d:'28,8',e:'polietilene DN25 DE32 (1")',f:'95,1',g:'polietilene DN40 DE50 (1"1/2)',h:'164,4',i:'polietilene DN50 DE63 (2")',j:'339,9',k:'polietilene DN80 DE90 (3")',l:'509,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'45',d:'28,5',e:'polietilene DN25 DE32 (1")',f:'93,9',g:'polietilene DN40 DE50 (1"1/2)',h:'164,4',i:'polietilene DN50 DE63 (2")',j:'339,8',k:'polietilene DN80 DE90 (3")',l:'509,8',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'46',d:'28,1',e:'polietilene DN25 DE32 (1")',f:'92,8',g:'polietilene DN40 DE50 (1"1/2)',h:'164,3',i:'polietilene DN50 DE63 (2")',j:'339,7',k:'polietilene DN80 DE90 (3")',l:'509,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'47',d:'27,8',e:'polietilene DN25 DE32 (1")',f:'91,7',g:'polietilene DN40 DE50 (1"1/2)',h:'164,2',i:'polietilene DN50 DE63 (2")',j:'339,5',k:'polietilene DN80 DE90 (3")',l:'509,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'48',d:'27,5',e:'polietilene DN25 DE32 (1")',f:'90,7',g:'polietilene DN40 DE50 (1"1/2)',h:'164,1',i:'polietilene DN50 DE63 (2")',j:'339,4',k:'polietilene DN80 DE90 (3")',l:'509,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'49',d:'27,2',e:'polietilene DN25 DE32 (1")',f:'89,7',g:'polietilene DN40 DE50 (1"1/2)',h:'164',i:'polietilene DN50 DE63 (2")',j:'339,3',k:'polietilene DN80 DE90 (3")',l:'509,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'50',d:'26,9',e:'polietilene DN25 DE32 (1")',f:'88,7',g:'polietilene DN40 DE50 (1"1/2)',h:'163,4',i:'polietilene DN50 DE63 (2")',j:'339,2',k:'polietilene DN80 DE90 (3")',l:'509,1',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'55',d:'25,5',e:'polietilene DN25 DE32 (1")',f:'84,1',g:'polietilene DN40 DE50 (1"1/2)',h:'155,1',i:'polietilene DN50 DE63 (2")',j:'338,6',k:'polietilene DN80 DE90 (3")',l:'508,4',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'60',d:'24,3',e:'polietilene DN25 DE32 (1")',f:'80,2',g:'polietilene DN40 DE50 (1"1/2)',h:'147,9',i:'polietilene DN50 DE63 (2")',j:'338',k:'polietilene DN80 DE90 (3")',l:'507,7',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'65',d:'23,3',e:'polietilene DN25 DE32 (1")',f:'76,8',g:'polietilene DN40 DE50 (1"1/2)',h:'141,5',i:'polietilene DN50 DE63 (2")',j:'337,4',k:'polietilene DN80 DE90 (3")',l:'507',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'70',d:'22,3',e:'polietilene DN25 DE32 (1")',f:'73,7',g:'polietilene DN40 DE50 (1"1/2)',h:'135,9',i:'polietilene DN50 DE63 (2")',j:'336,9',k:'polietilene DN80 DE90 (3")',l:'506,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'75',d:'21,5',e:'polietilene DN25 DE32 (1")',f:'71',g:'polietilene DN40 DE50 (1"1/2)',h:'130,8',i:'polietilene DN50 DE63 (2")',j:'336,3',k:'polietilene DN80 DE90 (3")',l:'505,6',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'80',d:'20,8',e:'polietilene DN25 DE32 (1")',f:'68,5',g:'polietilene DN40 DE50 (1"1/2)',h:'126,2',i:'polietilene DN50 DE63 (2")',j:'326,7',k:'polietilene DN80 DE90 (3")',l:'504,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'85',d:'20,1',e:'polietilene DN25 DE32 (1")',f:'66,2',g:'polietilene DN40 DE50 (1"1/2)',h:'122,1',i:'polietilene DN50 DE63 (2")',j:'316',k:'polietilene DN80 DE90 (3")',l:'504,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'90',d:'19,5',e:'polietilene DN25 DE32 (1")',f:'64,2',g:'polietilene DN40 DE50 (1"1/2)',h:'118,3',i:'polietilene DN50 DE63 (2")',j:'306,2',k:'polietilene DN80 DE90 (3")',l:'503,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'95',d:'18,9',e:'polietilene DN25 DE32 (1")',f:'62,3',g:'polietilene DN40 DE50 (1"1/2)',h:'114,9',i:'polietilene DN50 DE63 (2")',j:'297,3',k:'polietilene DN80 DE90 (3")',l:'502,8',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'100',d:'18,4',e:'polietilene DN25 DE32 (1")',f:'60,6',g:'polietilene DN40 DE50 (1"1/2)',h:'111,7',i:'polietilene DN50 DE63 (2")',j:'289',k:'polietilene DN80 DE90 (3")',l:'492,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'105',d:'17,9',e:'polietilene DN25 DE32 (1")',f:'59',g:'polietilene DN40 DE50 (1"1/2)',h:'108,7',i:'polietilene DN50 DE63 (2")',j:'281,4',k:'polietilene DN80 DE90 (3")',l:'479,3',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'110',d:'17,4',e:'polietilene DN25 DE32 (1")',f:'57,5',g:'polietilene DN40 DE50 (1"1/2)',h:'106',i:'polietilene DN50 DE63 (2")',j:'274,3',k:'polietilene DN80 DE90 (3")',l:'467,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'115',d:'17',e:'polietilene DN25 DE32 (1")',f:'56,1',g:'polietilene DN40 DE50 (1"1/2)',h:'103,4',i:'polietilene DN50 DE63 (2")',j:'267,6',k:'polietilene DN80 DE90 (3")',l:'455,9',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'120',d:'16,6',e:'polietilene DN25 DE32 (1")',f:'54,8',g:'polietilene DN40 DE50 (1"1/2)',h:'101',i:'polietilene DN50 DE63 (2")',j:'261,4',k:'polietilene DN80 DE90 (3")',l:'445,4',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'125',d:'16,2',e:'polietilene DN25 DE32 (1")',f:'53,6',g:'polietilene DN40 DE50 (1"1/2)',h:'98,8',i:'polietilene DN50 DE63 (2")',j:'255,7',k:'polietilene DN80 DE90 (3")',l:'435,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'130',d:'15,9',e:'polietilene DN25 DE32 (1")',f:'52,4',g:'polietilene DN40 DE50 (1"1/2)',h:'96,7',i:'polietilene DN50 DE63 (2")',j:'250,2',k:'polietilene DN80 DE90 (3")',l:'426,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'135',d:'15,6',e:'polietilene DN25 DE32 (1")',f:'51,4',g:'polietilene DN40 DE50 (1"1/2)',h:'94,7',i:'polietilene DN50 DE63 (2")',j:'245,1',k:'polietilene DN80 DE90 (3")',l:'417,5',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'140',d:'15,3',e:'polietilene DN25 DE32 (1")',f:'50,4',g:'polietilene DN40 DE50 (1"1/2)',h:'92,8',i:'polietilene DN50 DE63 (2")',j:'240,2',k:'polietilene DN80 DE90 (3")',l:'409,2',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'145',d:'15',e:'polietilene DN25 DE32 (1")',f:'49,4',g:'polietilene DN40 DE50 (1"1/2)',h:'91,1',i:'polietilene DN50 DE63 (2")',j:'235,6',k:'polietilene DN80 DE90 (3")',l:'401,4',m:'polietilene DN100 DE110 (4")'},
        {A:'5°',b:'POLIETILENE',c:'150',d:'14,7',e:'polietilene DN25 DE32 (1")',f:'48,5',g:'polietilene DN40 DE50 (1"1/2)',h:'89,4',i:'polietilene DN50 DE63 (2")',j:'231,3',k:'polietilene DN80 DE90 (3")',l:'394',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'1',d:'118,5',e:'polietilene DN25 DE32 (1")',f:'292,2',g:'polietilene DN40 DE50 (1"1/2)',h:'464',i:'polietilene DN50 DE63 (2")',j:'951,8',k:'polietilene DN80 DE90 (3")',l:'1423,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'2',d:'118,2',e:'polietilene DN25 DE32 (1")',f:'291,8',g:'polietilene DN40 DE50 (1"1/2)',h:'463,4',i:'polietilene DN50 DE63 (2")',j:'951',k:'polietilene DN80 DE90 (3")',l:'1422,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'3',d:'117,9',e:'polietilene DN25 DE32 (1")',f:'291,3',g:'polietilene DN40 DE50 (1"1/2)',h:'462,8',i:'polietilene DN50 DE63 (2")',j:'950,2',k:'polietilene DN80 DE90 (3")',l:'1421,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'4',d:'117,6',e:'polietilene DN25 DE32 (1")',f:'290,8',g:'polietilene DN40 DE50 (1"1/2)',h:'462,3',i:'polietilene DN50 DE63 (2")',j:'949,4',k:'polietilene DN80 DE90 (3")',l:'1420,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'5',d:'117,2',e:'polietilene DN25 DE32 (1")',f:'290,3',g:'polietilene DN40 DE50 (1"1/2)',h:'461,7',i:'polietilene DN50 DE63 (2")',j:'948,7',k:'polietilene DN80 DE90 (3")',l:'1419,8',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'6',d:'116,9',e:'polietilene DN25 DE32 (1")',f:'289,9',g:'polietilene DN40 DE50 (1"1/2)',h:'461,1',i:'polietilene DN50 DE63 (2")',j:'947,9',k:'polietilene DN80 DE90 (3")',l:'1418,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'7',d:'116,6',e:'polietilene DN25 DE32 (1")',f:'289,4',g:'polietilene DN40 DE50 (1"1/2)',h:'460,5',i:'polietilene DN50 DE63 (2")',j:'947,1',k:'polietilene DN80 DE90 (3")',l:'1417,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'8',d:'116,3',e:'polietilene DN25 DE32 (1")',f:'288,9',g:'polietilene DN40 DE50 (1"1/2)',h:'460',i:'polietilene DN50 DE63 (2")',j:'946,3',k:'polietilene DN80 DE90 (3")',l:'1417',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'9',d:'116',e:'polietilene DN25 DE32 (1")',f:'288,5',g:'polietilene DN40 DE50 (1"1/2)',h:'459,4',i:'polietilene DN50 DE63 (2")',j:'945,6',k:'polietilene DN80 DE90 (3")',l:'1416,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'10',d:'115,7',e:'polietilene DN25 DE32 (1")',f:'288',g:'polietilene DN40 DE50 (1"1/2)',h:'458,8',i:'polietilene DN50 DE63 (2")',j:'944,8',k:'polietilene DN80 DE90 (3")',l:'1415,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'11',d:'115,3',e:'polietilene DN25 DE32 (1")',f:'287,5',g:'polietilene DN40 DE50 (1"1/2)',h:'458,3',i:'polietilene DN50 DE63 (2")',j:'944',k:'polietilene DN80 DE90 (3")',l:'1414,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'12',d:'115',e:'polietilene DN25 DE32 (1")',f:'287,1',g:'polietilene DN40 DE50 (1"1/2)',h:'457,7',i:'polietilene DN50 DE63 (2")',j:'943,3',k:'polietilene DN80 DE90 (3")',l:'1413,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'13',d:'114,7',e:'polietilene DN25 DE32 (1")',f:'286,6',g:'polietilene DN40 DE50 (1"1/2)',h:'457,1',i:'polietilene DN50 DE63 (2")',j:'942,5',k:'polietilene DN80 DE90 (3")',l:'1412,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'14',d:'114,4',e:'polietilene DN25 DE32 (1")',f:'286,2',g:'polietilene DN40 DE50 (1"1/2)',h:'456,6',i:'polietilene DN50 DE63 (2")',j:'941,7',k:'polietilene DN80 DE90 (3")',l:'1411,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'15',d:'114,1',e:'polietilene DN25 DE32 (1")',f:'285,7',g:'polietilene DN40 DE50 (1"1/2)',h:'456',i:'polietilene DN50 DE63 (2")',j:'941',k:'polietilene DN80 DE90 (3")',l:'1410,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'16',d:'113,8',e:'polietilene DN25 DE32 (1")',f:'285,2',g:'polietilene DN40 DE50 (1"1/2)',h:'455,5',i:'polietilene DN50 DE63 (2")',j:'940,2',k:'polietilene DN80 DE90 (3")',l:'1409,8',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'17',d:'113,5',e:'polietilene DN25 DE32 (1")',f:'284,8',g:'polietilene DN40 DE50 (1"1/2)',h:'454,9',i:'polietilene DN50 DE63 (2")',j:'939,5',k:'polietilene DN80 DE90 (3")',l:'1408,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'18',d:'113,2',e:'polietilene DN25 DE32 (1")',f:'284,3',g:'polietilene DN40 DE50 (1"1/2)',h:'454,4',i:'polietilene DN50 DE63 (2")',j:'938,7',k:'polietilene DN80 DE90 (3")',l:'1408',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'19',d:'112,9',e:'polietilene DN25 DE32 (1")',f:'283,9',g:'polietilene DN40 DE50 (1"1/2)',h:'453,8',i:'polietilene DN50 DE63 (2")',j:'938',k:'polietilene DN80 DE90 (3")',l:'1407,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'20',d:'112,6',e:'polietilene DN25 DE32 (1")',f:'283,5',g:'polietilene DN40 DE50 (1"1/2)',h:'453,3',i:'polietilene DN50 DE63 (2")',j:'937,2',k:'polietilene DN80 DE90 (3")',l:'1406,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'21',d:'112,4',e:'polietilene DN25 DE32 (1")',f:'283',g:'polietilene DN40 DE50 (1"1/2)',h:'452,7',i:'polietilene DN50 DE63 (2")',j:'936,5',k:'polietilene DN80 DE90 (3")',l:'1405,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'22',d:'112,1',e:'polietilene DN25 DE32 (1")',f:'282,6',g:'polietilene DN40 DE50 (1"1/2)',h:'452,2',i:'polietilene DN50 DE63 (2")',j:'935,7',k:'polietilene DN80 DE90 (3")',l:'1404,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'23',d:'111,8',e:'polietilene DN25 DE32 (1")',f:'282,1',g:'polietilene DN40 DE50 (1"1/2)',h:'451,6',i:'polietilene DN50 DE63 (2")',j:'935',k:'polietilene DN80 DE90 (3")',l:'1403,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'24',d:'111,5',e:'polietilene DN25 DE32 (1")',f:'281,7',g:'polietilene DN40 DE50 (1"1/2)',h:'451,1',i:'polietilene DN50 DE63 (2")',j:'934,2',k:'polietilene DN80 DE90 (3")',l:'1402,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'25',d:'111,2',e:'polietilene DN25 DE32 (1")',f:'281,3',g:'polietilene DN40 DE50 (1"1/2)',h:'450,6',i:'polietilene DN50 DE63 (2")',j:'933,5',k:'polietilene DN80 DE90 (3")',l:'1401,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'26',d:'110,9',e:'polietilene DN25 DE32 (1")',f:'280,8',g:'polietilene DN40 DE50 (1"1/2)',h:'450',i:'polietilene DN50 DE63 (2")',j:'932,7',k:'polietilene DN80 DE90 (3")',l:'1400,8',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'27',d:'110,7',e:'polietilene DN25 DE32 (1")',f:'280,4',g:'polietilene DN40 DE50 (1"1/2)',h:'449,5',i:'polietilene DN50 DE63 (2")',j:'932',k:'polietilene DN80 DE90 (3")',l:'1400',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'28',d:'109,4',e:'polietilene DN25 DE32 (1")',f:'280',g:'polietilene DN40 DE50 (1"1/2)',h:'448,9',i:'polietilene DN50 DE63 (2")',j:'931,2',k:'polietilene DN80 DE90 (3")',l:'1399,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'29',d:'107,3',e:'polietilene DN25 DE32 (1")',f:'279,5',g:'polietilene DN40 DE50 (1"1/2)',h:'448,4',i:'polietilene DN50 DE63 (2")',j:'930,5',k:'polietilene DN80 DE90 (3")',l:'1398,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'30',d:'105,3',e:'polietilene DN25 DE32 (1")',f:'279,1',g:'polietilene DN40 DE50 (1"1/2)',h:'447,9',i:'polietilene DN50 DE63 (2")',j:'929,8',k:'polietilene DN80 DE90 (3")',l:'1397,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'31',d:'103,5',e:'polietilene DN25 DE32 (1")',f:'278,7',g:'polietilene DN40 DE50 (1"1/2)',h:'447,4',i:'polietilene DN50 DE63 (2")',j:'929',k:'polietilene DN80 DE90 (3")',l:'1396,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'32',d:'101,7',e:'polietilene DN25 DE32 (1")',f:'278,3',g:'polietilene DN40 DE50 (1"1/2)',h:'446,8',i:'polietilene DN50 DE63 (2")',j:'928,3',k:'polietilene DN80 DE90 (3")',l:'1395,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'33',d:'100',e:'polietilene DN25 DE32 (1")',f:'277,8',g:'polietilene DN40 DE50 (1"1/2)',h:'446,3',i:'polietilene DN50 DE63 (2")',j:'927,6',k:'polietilene DN80 DE90 (3")',l:'1394,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'34',d:'98,3',e:'polietilene DN25 DE32 (1")',f:'277,4',g:'polietilene DN40 DE50 (1"1/2)',h:'445,8',i:'polietilene DN50 DE63 (2")',j:'926,8',k:'polietilene DN80 DE90 (3")',l:'1393,8',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'35',d:'96,8',e:'polietilene DN25 DE32 (1")',f:'277',g:'polietilene DN40 DE50 (1"1/2)',h:'445,2',i:'polietilene DN50 DE63 (2")',j:'926,1',k:'polietilene DN80 DE90 (3")',l:'1392,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'36',d:'95,3',e:'polietilene DN25 DE32 (1")',f:'276,6',g:'polietilene DN40 DE50 (1"1/2)',h:'444,7',i:'polietilene DN50 DE63 (2")',j:'925,4',k:'polietilene DN80 DE90 (3")',l:'1392,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'37',d:'93,9',e:'polietilene DN25 DE32 (1")',f:'276,2',g:'polietilene DN40 DE50 (1"1/2)',h:'444,2',i:'polietilene DN50 DE63 (2")',j:'924,7',k:'polietilene DN80 DE90 (3")',l:'1391,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'38',d:'92,5',e:'polietilene DN25 DE32 (1")',f:'275,7',g:'polietilene DN40 DE50 (1"1/2)',h:'443,7',i:'polietilene DN50 DE63 (2")',j:'923,9',k:'polietilene DN80 DE90 (3")',l:'1390,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'39',d:'91,2',e:'polietilene DN25 DE32 (1")',f:'275,3',g:'polietilene DN40 DE50 (1"1/2)',h:'443,2',i:'polietilene DN50 DE63 (2")',j:'923,2',k:'polietilene DN80 DE90 (3")',l:'1389,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'40',d:'89,9',e:'polietilene DN25 DE32 (1")',f:'274,9',g:'polietilene DN40 DE50 (1"1/2)',h:'442,7',i:'polietilene DN50 DE63 (2")',j:'922,5',k:'polietilene DN80 DE90 (3")',l:'1388,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'41',d:'88,7',e:'polietilene DN25 DE32 (1")',f:'274,5',g:'polietilene DN40 DE50 (1"1/2)',h:'442,1',i:'polietilene DN50 DE63 (2")',j:'921,8',k:'polietilene DN80 DE90 (3")',l:'1387,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'42',d:'87,6',e:'polietilene DN25 DE32 (1")',f:'274,1',g:'polietilene DN40 DE50 (1"1/2)',h:'441,6',i:'polietilene DN50 DE63 (2")',j:'921',k:'polietilene DN80 DE90 (3")',l:'1386,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'43',d:'86,4',e:'polietilene DN25 DE32 (1")',f:'273,7',g:'polietilene DN40 DE50 (1"1/2)',h:'441,1',i:'polietilene DN50 DE63 (2")',j:'920,3',k:'polietilene DN80 DE90 (3")',l:'1386',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'44',d:'85,3',e:'polietilene DN25 DE32 (1")',f:'273,3',g:'polietilene DN40 DE50 (1"1/2)',h:'440,6',i:'polietilene DN50 DE63 (2")',j:'919,6',k:'polietilene DN80 DE90 (3")',l:'1385,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'45',d:'84,3',e:'polietilene DN25 DE32 (1")',f:'272,9',g:'polietilene DN40 DE50 (1"1/2)',h:'440,1',i:'polietilene DN50 DE63 (2")',j:'918,9',k:'polietilene DN80 DE90 (3")',l:'1384,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'46',d:'83,3',e:'polietilene DN25 DE32 (1")',f:'272,5',g:'polietilene DN40 DE50 (1"1/2)',h:'439,6',i:'polietilene DN50 DE63 (2")',j:'918,2',k:'polietilene DN80 DE90 (3")',l:'1383,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'47',d:'82,3',e:'polietilene DN25 DE32 (1")',f:'271,4',g:'polietilene DN40 DE50 (1"1/2)',h:'439,1',i:'polietilene DN50 DE63 (2")',j:'917,5',k:'polietilene DN80 DE90 (3")',l:'1382,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'48',d:'81,4',e:'polietilene DN25 DE32 (1")',f:'268,3',g:'polietilene DN40 DE50 (1"1/2)',h:'438,6',i:'polietilene DN50 DE63 (2")',j:'916,8',k:'polietilene DN80 DE90 (3")',l:'1381,7',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'49',d:'80,4',e:'polietilene DN25 DE32 (1")',f:'265,3',g:'polietilene DN40 DE50 (1"1/2)',h:'438,1',i:'polietilene DN50 DE63 (2")',j:'916,1',k:'polietilene DN80 DE90 (3")',l:'1380,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'50',d:'79,6',e:'polietilene DN25 DE32 (1")',f:'262,4',g:'polietilene DN40 DE50 (1"1/2)',h:'437,6',i:'polietilene DN50 DE63 (2")',j:'915,4',k:'polietilene DN80 DE90 (3")',l:'1380',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'55',d:'75,5',e:'polietilene DN25 DE32 (1")',f:'249',g:'polietilene DN40 DE50 (1"1/2)',h:'435,1',i:'polietilene DN50 DE63 (2")',j:'911,8',k:'polietilene DN80 DE90 (3")',l:'1375,8',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'60',d:'72',e:'polietilene DN25 DE32 (1")',f:'237,4',g:'polietilene DN40 DE50 (1"1/2)',h:'432,7',i:'polietilene DN50 DE63 (2")',j:'908,4',k:'polietilene DN80 DE90 (3")',l:'1371,6',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'65',d:'68,9',e:'polietilene DN25 DE32 (1")',f:'227,2',g:'polietilene DN40 DE50 (1"1/2)',h:'418,8',i:'polietilene DN50 DE63 (2")',j:'904,9',k:'polietilene DN80 DE90 (3")',l:'1367,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'70',d:'66,1',e:'polietilene DN25 DE32 (1")',f:'218,1',g:'polietilene DN40 DE50 (1"1/2)',h:'402',i:'polietilene DN50 DE63 (2")',j:'901,5',k:'polietilene DN80 DE90 (3")',l:'1363,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'75',d:'63,7',e:'polietilene DN25 DE32 (1")',f:'210',g:'polietilene DN40 DE50 (1"1/2)',h:'387,1',i:'polietilene DN50 DE63 (2")',j:'898,1',k:'polietilene DN80 DE90 (3")',l:'1359,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'80',d:'61,5',e:'polietilene DN25 DE32 (1")',f:'202,7',g:'polietilene DN40 DE50 (1"1/2)',h:'373,6',i:'polietilene DN50 DE63 (2")',j:'894,8',k:'polietilene DN80 DE90 (3")',l:'1355,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'85',d:'59,4',e:'polietilene DN25 DE32 (1")',f:'196',g:'polietilene DN40 DE50 (1"1/2)',h:'361,4',i:'polietilene DN50 DE63 (2")',j:'891,5',k:'polietilene DN80 DE90 (3")',l:'1351,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'90',d:'57,6',e:'polietilene DN25 DE32 (1")',f:'190',g:'polietilene DN40 DE50 (1"1/2)',h:'350,2',i:'polietilene DN50 DE63 (2")',j:'888,2',k:'polietilene DN80 DE90 (3")',l:'1347',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'95',d:'55,9',e:'polietilene DN25 DE32 (1")',f:'184,4',g:'polietilene DN40 DE50 (1"1/2)',h:'339,9',i:'polietilene DN50 DE63 (2")',j:'879,7',k:'polietilene DN80 DE90 (3")',l:'1343,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'100',d:'54,4',e:'polietilene DN25 DE32 (1")',f:'179,3',g:'polietilene DN40 DE50 (1"1/2)',h:'330,5',i:'polietilene DN50 DE63 (2")',j:'855,2',k:'polietilene DN80 DE90 (3")',l:'1339,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'105',d:'52,9',e:'polietilene DN25 DE32 (1")',f:'174,5',g:'polietilene DN40 DE50 (1"1/2)',h:'321,7',i:'polietilene DN50 DE63 (2")',j:'832,6',k:'polietilene DN80 DE90 (3")',l:'1335,2',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'110',d:'51,6',e:'polietilene DN25 DE32 (1")',f:'170,1',g:'polietilene DN40 DE50 (1"1/2)',h:'313,6',i:'polietilene DN50 DE63 (2")',j:'811,6',k:'polietilene DN80 DE90 (3")',l:'1331,3',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'115',d:'50,3',e:'polietilene DN25 DE32 (1")',f:'166',g:'polietilene DN40 DE50 (1"1/2)',h:'306,1',i:'polietilene DN50 DE63 (2")',j:'792',k:'polietilene DN80 DE90 (3")',l:'1327,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'120',d:'49,2',e:'polietilene DN25 DE32 (1")',f:'162,2',g:'polietilene DN40 DE50 (1"1/2)',h:'299',i:'polietilene DN50 DE63 (2")',j:'773,7',k:'polietilene DN80 DE90 (3")',l:'1318,1',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'125',d:'48,1',e:'polietilene DN25 DE32 (1")',f:'158,6',g:'polietilene DN40 DE50 (1"1/2)',h:'292,4',i:'polietilene DN50 DE63 (2")',j:'756,5',k:'polietilene DN80 DE90 (3")',l:'1288,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'130',d:'47,1',e:'polietilene DN25 DE32 (1")',f:'155,2',g:'polietilene DN40 DE50 (1"1/2)',h:'286,1',i:'polietilene DN50 DE63 (2")',j:'740,4',k:'polietilene DN80 DE90 (3")',l:'1261,4',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'135',d:'46,1',e:'polietilene DN25 DE32 (1")',f:'152',g:'polietilene DN40 DE50 (1"1/2)',h:'280,3',i:'polietilene DN50 DE63 (2")',j:'725,2',k:'polietilene DN80 DE90 (3")',l:'1235,5',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'140',d:'45,2',e:'polietilene DN25 DE32 (1")',f:'149',g:'polietilene DN40 DE50 (1"1/2)',h:'274,7',i:'polietilene DN50 DE63 (2")',j:'710,9',k:'polietilene DN80 DE90 (3")',l:'1211',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'145',d:'44,3',e:'polietilene DN25 DE32 (1")',f:'146,2',g:'polietilene DN40 DE50 (1"1/2)',h:'269,5',i:'polietilene DN50 DE63 (2")',j:'697,3',k:'polietilene DN80 DE90 (3")',l:'1187,9',m:'polietilene DN100 DE110 (4")'},
        {A:'4°',b:'POLIETILENE',c:'150',d:'43,5',e:'polietilene DN25 DE32 (1")',f:'143,5',g:'polietilene DN40 DE50 (1"1/2)',h:'264,5',i:'polietilene DN50 DE63 (2")',j:'684,4',k:'polietilene DN80 DE90 (3")',l:'1166',m:'polietilene DN100 DE110 (4")'}
    ]
    

    static getValoriWrapper(key, nomeListino?){
        var retValue;
        switch(nomeListino){
            case 'LISTINO PREZZI 2 (PROVINCIA RIMINI)':{
                var startDate = new Date();
                startDate.setFullYear(2000);
                var endDate = new Date();
                endDate.setFullYear(2100);
                var today = new Date();
                if(today.getTime() > startDate.getTime() && today.getTime() < endDate.getTime()) {
                    retValue = this.ValoriRimini.get(key);
                }
                break;
            }
            case 'LISTINO PREZZI 2 (PROVINCIA BOLOGNA)':{
                var startDate = new Date();
                startDate.setFullYear(2000);
                var endDate = new Date();
                endDate.setFullYear(2100);
                var today = new Date();
                if(today.getTime() > startDate.getTime() && today.getTime() < endDate.getTime()) {
                    retValue = this.ValoriBologna.get(key);
                }
                break;
            }
            case 'LISTINO PREZZI 3 (PROVINCIA FORLÌCESENA)':{
                var startDate = new Date();
                startDate.setFullYear(2000);
                var endDate = new Date();
                endDate.setFullYear(2100);
                var today = new Date();
                if(today.getTime() > startDate.getTime() && today.getTime() < endDate.getTime()) {
                    retValue = this.ValoriForli.get(key);
                }
                break;
            }
            
        }
        if(!retValue) return this.Valori.get(key);
        else return retValue;
    }

    static ValoriBologna: Dictionary<string, Object[]> = new Dictionary<string, Object[]>().fromList([
        { key: "LAVFAT1040_GAS", value: [
            { quotaFissa:  1050 , quotaVariabile: [
                { classeContatore: "G4", prezzo: 266 },
                { classeContatore: "G6", prezzo: 532 },
                { classeContatore: "G10", prezzo: 679 },
                { classeContatore: "G16", prezzo: 826 },
                { classeContatore: "G25", prezzo: 1036 },
                { classeContatore: "G40", prezzo: 1246 },
                { classeContatore: "G65", prezzo: 1456 },
                { classeContatore: "G100", prezzo: 1666 }
                ] },

        ]},
        { key: "LAVFAT1140_GAS", value: [
            { quotaFissa: 245, quotaVariabile: [
               { classeContatore: "G4", prezzo: 266 },
                { classeContatore: "G6", prezzo: 532 },
                { classeContatore: "G10", prezzo: 679 },
                { classeContatore: "G16", prezzo: 826 },
                { classeContatore: "G25", prezzo: 1036 },
                { classeContatore: "G40", prezzo: 1246 },
                { classeContatore: "G65", prezzo: 1456 },
                { classeContatore: "G100", prezzo: 1666 }
                ] },
        ]},

    ]);

    static ValoriForli: Dictionary<string, Object[]> = new Dictionary<string, Object[]>().fromList([
        { key: "LAVFAT1040_GAS", value: [
            { quotaFissa:  1050 , quotaVariabile: [
                { classeContatore: "G4", prezzo: 266 },
                { classeContatore: "G6", prezzo: 532 },
                { classeContatore: "G10", prezzo: 679 },
                { classeContatore: "G16", prezzo: 826 },
                { classeContatore: "G25", prezzo: 1036 },
                { classeContatore: "G40", prezzo: 1246 },
                { classeContatore: "G65", prezzo: 1456 },
                { classeContatore: "G100", prezzo: 1666 }
                ] },

        ]},
    ]);

    static ValoriRimini: Dictionary<string, Object[]> = new Dictionary<string, Object[]>().fromList([
            { key: "LAVFAT1010_ACQUA", value: [
                { quotaFissa: 200, quotaVariabile: [
                      { classeContatore: "DN15", prezzo: 100 },
                      { classeContatore: "DN20", prezzo: 100 },
                      { classeContatore: "DN25", prezzo: 300 },
                      { classeContatore: "DN32", prezzo: 300 },
                      { classeContatore: "DN40", prezzo: 300 },
                      { classeContatore: "DN50", prezzo: 900 },
                ]}
            ]},
            { key: "LAVFAT1040_ACQUA", value: [
                { quotaFissa: 1350, quotaVariabile: [
                      { classeContatore: "DN15", prezzo: 100 },
                      { classeContatore: "DN20", prezzo: 100 },
                      { classeContatore: "DN25", prezzo: 300 },
                      { classeContatore: "DN32", prezzo: 300 },
                      { classeContatore: "DN40", prezzo: 300 },
                      { classeContatore: "DN50", prezzo: 900 },
                ]}
            ]},
            { key: "LAVFAT1050_ACQUA", value: [
                { quotaFissa: 1350, quotaVariabile: [
                      { classeContatore: "DN15", prezzo: 100 },
                      { classeContatore: "DN20", prezzo: 100 },
                      { classeContatore: "DN25", prezzo: 300 },
                      { classeContatore: "DN32", prezzo: 300 },
                      { classeContatore: "DN40", prezzo: 300 },
                      { classeContatore: "DN50", prezzo: 900 },
                ]}
            ]},
            { key: "LAVFAT1140_ACQUA", value: [
                { quotaFissa: 200, quotaVariabile: [
                      { classeContatore: "DN15", prezzo: 100 },
                      { classeContatore: "DN20", prezzo: 100 },
                      { classeContatore: "DN25", prezzo: 300 },
                      { classeContatore: "DN32", prezzo: 300 },
                      { classeContatore: "DN40", prezzo: 300 },
                      { classeContatore: "DN50", prezzo: 900 },
                ]}
            ]},
            { key: "LAVFAT1130_ACQUA", value: [
                { tipoSpostamento: "1", quotaFissa: 600,  label: "Lavoro Interrato", quotaVariabile: [
                  { classeContatore: "DN15", prezzo: 100 },
                  { classeContatore: "DN20", prezzo: 100 },
                  { classeContatore: "DN25", prezzo: 300 },
                  { classeContatore: "DN32", prezzo: 300 },
                  { classeContatore: "DN40", prezzo: 300 },
                  { classeContatore: "DN50", prezzo: 900 },
            ] },
              { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
          ]},
            { key: "LAVFAT1181_ACQUA", value: [
                { tipoSpostamento: "1", quotaFissa: 200,  label: "Lavoro Interrato", quotaVariabile: [
                    { classeContatore: "DN15", prezzo: 100 },
                    { classeContatore: "DN20", prezzo: 100 },
                    { classeContatore: "DN25", prezzo: 300 },
                    { classeContatore: "DN32", prezzo: 300 },
                    { classeContatore: "DN40", prezzo: 300 },
                    { classeContatore: "DN50", prezzo: 900 },
              ] },
                { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
            ]},
            { key: "LAVFAT1070_ACQUA", value: [
                { quotaFissa: 740 }
            ]},
            { key: "LAVFAT1170_ACQUA", value: [
                { quotaFissa: 175 }
            ]},
            { key: "LAVFAT1110_ACQUA", value: [
                { classeContatore: "01", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 15", quotaIstruttoria: 25 },
                { classeContatore: "02", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 20", quotaIstruttoria: 25 },
                { classeContatore: "03", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 25", quotaIstruttoria: 25 },
                { classeContatore: "04", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 32", quotaIstruttoria: 25 },
                { classeContatore: "05", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 40", quotaIstruttoria: 25 },
                { classeContatore: "06", quotaFissa: 1350, quotaVariabile: 1100, label: "Contatore Calibro DN 50", quotaIstruttoria: 25 },
            ]},
            { key: "LAVFAT1100_ACQUA", value: [
                { classeContatore: "01", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 15", quotaIstruttoria: 25 },
                { classeContatore: "02", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 20", quotaIstruttoria: 25 },
                { classeContatore: "03", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 25", quotaIstruttoria: 25 },
                { classeContatore: "04", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 32", quotaIstruttoria: 25 },
                { classeContatore: "05", quotaFissa: 1350, quotaVariabile: 500, label: "Contatore Calibro DN 40", quotaIstruttoria: 25 },
                { classeContatore: "06", quotaFissa: 1350, quotaVariabile: 1100, label: "Contatore Calibro DN 50", quotaIstruttoria: 25 },
            ]}, 
            { key: "LAVFAT1610_ACQUA", value: [
                { quotaFissa: 115 }
            ]},
            { key: "LAVFAT1040_FOGNA", value: [
                { label: 'Allacciamento DN160 (1 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5",  allacFogna: '01', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN160 (1 UIeq) e 1,5mt < Hm <= 2,5mt',  diametro:"DN160", maxprofondita:"2.5", allacFogna: '02', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN160 (2-3 UIeq) e Hm <= 1,5m', diametro:"DN160", maxprofondita:"1.5", allacFogna: '03', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN160 (2-3 UIeq) e 1,5mt < Hm <= 2,5mt',diametro:"DN160", maxprofondita:"2.5", allacFogna: '04', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN160 (4-5 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5",allacFogna: '05', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN160 (4-5 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '06', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN160 (6-10 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5", allacFogna: '07', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN160 (6-10 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '08', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN160 (>10 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5", allacFogna: '09', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN160 (>10 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '10', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN200 e Hm < 1,5mt', diametro:"DN200", maxprofondita:"1.5", allacFogna: '11', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
                { label: 'Allacciamento DN200 e 1,5mt < Hm <= 2,5mt',diametro:"DN200", maxprofondita:"2.5", allacFogna: '12', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                { label: 'Allacciamento DN250 e Hm <= 1,5mt',diametro:"DN250", maxprofondita:"1.5", allacFogna: '13', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
    
                { label: 'Allacciamento DN250 e 1,5mt < Hm <= 2,5mt',diametro:"DN250", maxprofondita:"2.5", allacFogna: '14', quotaFissaNuovo: 2200, quotaFissaSpostamento:2940},
                
                { label: 'Allacciamento DN315 e Hm <= 1,5mt', diametro:"DN315", maxprofondita:"1.5",allacFogna: '15', quotaFissaNuovo: 2400, quotaFissaSpostamento:3140},
                
                { label: 'Allacciamento DN315 e 1,5mt < Hm <= 2,5mt', diametro:"DN315", maxprofondita:"2.5", allacFogna: '16', quotaFissaNuovo: 2600, quotaFissaSpostamento:3340},
                { label: 'Allacciamento DN400 e Hm <= 1,5mt', diametro:"DN400", maxprofondita:"1.5", allacFogna: '17', quotaFissaNuovo: 2400, quotaFissaSpostamento:3140},
                { label: 'Allacciamento DN400 e 1,5mt < Hm <= 2,5mt', diametro:"DN400", maxprofondita:"2.5", allacFogna: '18', quotaFissaNuovo: 2600, quotaFissaSpostamento:3340},
             
    
                //   { label: 'Solo quota completamento', allacFogna: 'Z', quotaFissaNuovo: 707, quotaFissaSpostamento:707},
            ]},
        ])


    static Valori: Dictionary<string, Object[]> = new Dictionary<string, Object[]>().fromList([
        {
          key: 'QUOTE_LAVFAT1040_ACQUA',
          value:[
                    {label: 'lunghezza eccedente con scavo (> 10mt)',
                      value:  [
                        {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)", id:"quota1"},
                        {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)", id:"quota2"},
                        {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)", id:"quota3"},
                        {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                    ]},
                    {label: 'lunghezza eccedente aereo (> 3mt)',
                     value:  [
                      {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                      {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                    ]},
                    {label: 'autoscala (h>3,5mt)',
                     value:  [
                      {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                    ]},
                    {label: 'spingitubo standard',
                     value:  [
                      {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota8"},
                    ]},
                    {label: 'messa fuori tensione cavi elettrici',
                     value:  [
                      {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota9"},
                    ]},
            ] 
        },
        {
            key: 'QUOTE_LAVFAT1050_ACQUA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1010_ACQUA',
            value:[
                    {label: 'autoscala (h>3,5mt)',
                            value:  [
                            {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                    ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota1"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota2"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1140_ACQUA',
            value:[
                    {label: 'autoscala (h>3,5mt)',
                        value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                        ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota1"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota2"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1130_ACQUA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 3mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'spostamento su nuovo allaccio',
                      value:  [
                         {label: 'spostamento su nuovo allaccio', value: 360, placeholder:"rifacimento", singleValue:'true',id:"quota7"},
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                       value:  [
                        {label: 'soppressione attacco', value: 174, placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'calibro del nuovo contatore (aumento o diminuzione portata)',
                      value:  [
                       {label: 'DN 15', value: 50, placeholder:"numero",id:"quota10"},
                       {label: 'DN 20', value: 70, placeholder:"numero",id:"quota11"},
                       {label: 'DN 25', value: 110, placeholder:"numero",id:"quota12"},
                       {label: 'DN 32', value: 150, placeholder:"numero",id:"quota13"},
                       {label: 'DN 40', value: 320, placeholder:"numero",id:"quota14"},
                       {label: 'DN 50', value: 470, placeholder:"numero",id:"quota15"},
                       {label: 'DN 80', value: 720, placeholder:"numero",id:"quota16"},
                       {label: 'DN 100', value: 1020, placeholder:"numero",id:"quota17"}
                     ]},
                      {label: 'autoscala (h>3,5mt)',
                      value:  [
                       {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                     ]},
                     {label: 'spingitubo standard',
                      value:  [
                       {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota19"},
                     ]},
                     {label: 'messa fuori tensione cavi elettrici',
                      value:  [
                       {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota20"},
                     ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1181_ACQUA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 3mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'spostamento su nuovo allaccio',
                      value:  [
                         {label: 'spostamento su nuovo allaccio', value: 485, placeholder:"rifacimento", singleValue:'true',id:"quota7"},
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                       value:  [
                        {label: 'soppressione attacco', value: 174, placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'calibro del nuovo contatore (aumento o diminuzione portata)',
                       value:  [
                        {label: 'DN 15', value: 50, placeholder:"numero",id:"quota10"},
                        {label: 'DN 20', value: 70, placeholder:"numero",id:"quota11"},
                        {label: 'DN 25', value: 110, placeholder:"numero",id:"quota12"},
                        {label: 'DN 32', value: 150, placeholder:"numero",id:"quota13"},
                        {label: 'DN 40', value: 320, placeholder:"numero",id:"quota14"},
                        {label: 'DN 50', value: 470, placeholder:"numero",id:"quota15"},
                        {label: 'DN 80', value: 720, placeholder:"numero",id:"quota16"},
                        {label: 'DN 100', value: 1020, placeholder:"numero",id:"quota17"}
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                      value:  [
                       {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                     ]},
                     {label: 'spingitubo standard',
                      value:  [
                       {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota19"},
                     ]},
                     {label: 'messa fuori tensione cavi elettrici',
                      value:  [
                       {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota20"},
                     ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1100_ACQUA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                      value:  [
                       {label: 'soppressione attacco', value: 174, placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1110_ACQUA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                      value:  [
                       {label: 'soppressione attacco', value: 174, placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1070_ACQUA',
            value:[
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1170_ACQUA',
            value:[
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1040_FOGNATURA',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A, h<1.5mt', value: 45, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B, h<1.5mt', value: 85, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C, h<1.5mt', value: 165, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale, h<1.5mt', value: 210, placeholder:"lungh. eccedente (m)",id:"quota4"},
                          {label: 'scavo tipo A, 1.5mt<h<2.5mt', value: 85, placeholder:"lungh. eccedente (m)",id:"quota5"},
                          {label: 'scavo tipo B, 1.5mt<h<2.5mt', value: 150, placeholder:"lungh. eccedente (m)",id:"quota6"},
                          {label: 'scavo tipo C, 1.5mt<h<2.5mt', value: 250, placeholder:"lungh. eccedente (m)",id:"quota7"},
                          {label: 'scavo tipo speciale, 1.5mt<h<2.5mt', value: 295, placeholder:"lungh. eccedente (m)",id:"quota8"}
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1010_FOGNATURA',
            value:[
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1040_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)", id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)", id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)", id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota8"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota9"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1050_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)", id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)", id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)", id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota8"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota9"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1010_GAS',
            value:[
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota1"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota2"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1140_GAS',
            value:[
                      {label: 'autoscala (h>3,5mt)',
                            value:  [
                            {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota1"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota2"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1130_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 3mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'spostamento su nuovo allaccio',
                      value:  [
                         {label: 'spostamento su nuovo allaccio', value: 605, placeholder:"rifacimento", singleValue:'true',id:"quota7"},
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                       value:  [
                        {label: 'soppressione attacco', value: 203.5 , placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'calibro del nuovo contatore (aumento o diminuzione portata)',
                       value:  [
                        {label: 'G4', value: 50, placeholder:"numero",id:"quota10"},
                        {label: 'G6', value: 100, placeholder:"numero",id:"quota11"},
                        {label: 'G10', value: 200, placeholder:"numero",id:"quota12"},
                        {label: 'G16', value: 400, placeholder:"numero",id:"quota13"},
                        {label: 'G25', value: 450, placeholder:"numero",id:"quota14"},
                        {label: 'G40', value: 650, placeholder:"numero",id:"quota15"},
                        {label: 'G65', value: 1150, placeholder:"numero",id:"quota16"},
                        {label: 'G100', value: 1450, placeholder:"numero",id:"quota17"}
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                      value:  [
                       {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                     ]},
                     {label: 'spingitubo standard',
                      value:  [
                       {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota19"},
                     ]},
                     {label: 'messa fuori tensione cavi elettrici',
                      value:  [
                       {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota20"},
                     ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1181_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 3mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'lunghezza eccedente aereo (> 3mt)',
                       value:  [
                        {label: 'h<=3,5mt', value: 12, placeholder:"lungh. eccedente (m)",id:"quota5"},
                        {label: 'h>3,5mt', value: 21, placeholder:"lungh. eccedente (m)",id:"quota6"}
                      ]},
                      {label: 'spostamento su nuovo allaccio',
                      value:  [
                         {label: 'spostamento su nuovo allaccio', value: 660, placeholder:"rifacimento", singleValue:'true',id:"quota7"},
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                       value:  [
                        {label: 'soppressione attacco', value: 203.5 , placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'calibro del nuovo contatore (aumento o diminuzione portata)',
                      value:  [
                       {label: 'G4', value: 50, placeholder:"numero",id:"quota10"},
                       {label: 'G6', value: 100, placeholder:"numero",id:"quota11"},
                       {label: 'G10', value: 200, placeholder:"numero",id:"quota12"},
                       {label: 'G16', value: 400, placeholder:"numero",id:"quota13"},
                       {label: 'G25', value: 450, placeholder:"numero",id:"quota14"},
                       {label: 'G40', value: 650, placeholder:"numero",id:"quota15"},
                       {label: 'G65', value: 1150, placeholder:"numero",id:"quota16"},
                       {label: 'G100', value: 1450, placeholder:"numero",id:"quota17"}
                     ]},
                      {label: 'autoscala (h>3,5mt)',
                      value:  [
                       {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota18"},
                     ]},
                     {label: 'spingitubo standard',
                      value:  [
                       {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota19"},
                     ]},
                     {label: 'messa fuori tensione cavi elettrici',
                      value:  [
                       {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota20"},
                     ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1100_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                      value:  [
                       {label: 'soppressione attacco', value: 203.5 , placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1110_GAS',
            value:[
                      {label: 'lunghezza eccedente con scavo (> 10mt)',
                        value:  [
                          {label: 'scavo tipo A', value: 35, placeholder:"lungh. eccedente (m)",id:"quota1"},
                          {label: 'scavo tipo B', value: 60, placeholder:"lungh. eccedente (m)",id:"quota2"},
                          {label: 'scavo tipo C', value: 105, placeholder:"lungh. eccedente (m)",id:"quota3"},
                          {label: 'scavo tipo speciale', value: 150, placeholder:"lungh. eccedente (m)",id:"quota4"}
                      ]},
                      {label: 'sezionamento allaccio',
                       value:  [
                        {label: 'sezionamento allaccio', value: 741.5, placeholder:"numero sezionamenti",id:"quota8"},
                      ]},
                      {label: 'soppressione attacco',
                      value:  [
                       {label: 'soppressione attacco', value: 203.5 , placeholder:"numero soppressioni",id:"quota9"},
                      ]},
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'spingitubo standard',
                       value:  [
                        {label: 'spingitubo standard', value: 885, placeholder:"numero",id:"quota9"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1070_GAS',
            value:[
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },
          {
            key: 'QUOTE_LAVFAT1170_GAS',
            value:[
                      {label: 'autoscala (h>3,5mt)',
                       value:  [
                        {label: 'autoscala (h>3,5mt)', value: 300, placeholder:"n. mezze giornate",id:"quota7"},
                      ]},
                      {label: 'messa fuori tensione cavi elettrici',
                       value:  [
                        {label: 'messa fuori tensione cavi elettrici', value: 150, placeholder:"n. distacchi",id:"quota10"},
                      ]},
              ] 
          },


        { key: 'deroga',
            value:[
                {id:1 ,label: 'deroga 1: urbanizz. senza prescrizioni per contatori singoli', value: 320},
                {id:2 ,label: 'deroga 2: ristrutturaz. parziali senza modifiche a impianti int.', value: 320},
                {id:3 ,label: 'deroga 3: ristrutturaz. con vincoli arch./inaccessibilità batteria', value: 320},
                {id:4 ,label: 'deroga 4: necessità installazione autoclave', value: 320},
            ]
        },
        { key: "LAVFAT1100_GAS", 
     
          value: [
                  { classeContatore: "G4", quotaFissa: 1500, quotaVariabile: 350, quotaIstruttoria: 25 },
                  { classeContatore: "G6", quotaFissa: 1500, quotaVariabile: 450, quotaIstruttoria: 25 },
                   { classeContatore: "G10", quotaFissa: 1500, quotaVariabile: 550, quotaIstruttoria: 25 },
                  { classeContatore: "G16", quotaFissa: 1500, quotaVariabile: 750, quotaIstruttoria: 25 },
                  { classeContatore: "G25", quotaFissa: 1500, quotaVariabile: 800, quotaIstruttoria: 25 },
                   { classeContatore: "G40", quotaFissa: 1500, quotaVariabile: 1000, quotaIstruttoria: 25 },
                  { classeContatore: "G65", quotaFissa: 1500, quotaVariabile: 1500, quotaIstruttoria: 25 },
                   { classeContatore: "G100", quotaFissa: 1500, quotaVariabile: 1800, quotaIstruttoria: 25 }
        ]},
        
        { key: "LAVFAT1110_GAS", 
        
          value: [
                { classeContatore: "G4", quotaFissa: 350 , quotaIstruttoria: 25},
                { classeContatore: "G6", quotaFissa: 450 , quotaIstruttoria: 25},
				{ classeContatore: "G10", quotaFissa: 550, quotaIstruttoria: 25 },                  
                { classeContatore: "G16", quotaFissa: 750 , quotaIstruttoria: 25},
                { classeContatore: "G25", quotaFissa: 800 , quotaIstruttoria: 25},  
				{ classeContatore: "G40", quotaFissa: 1000 , quotaIstruttoria: 25},
				{ classeContatore: "G65", quotaFissa: 1500 , quotaIstruttoria: 25},
 				{ classeContatore: "G100", quotaFissa: 1800 , quotaIstruttoria: 25}
        ]},

        { key: "LAVFAT1010_GAS", value: [
            { quotaFissa: 350, quotaVariabile: [
                { classeContatore: "G4", prezzo: 380 },
                { classeContatore: "G6", prezzo: 760 },
                { classeContatore: "G10", prezzo: 970 },
                { classeContatore: "G16", prezzo: 1180 },
                { classeContatore: "G25", prezzo: 1480 },
                { classeContatore: "G40", prezzo: 1780 },
                { classeContatore: "G65", prezzo: 2080 },
                { classeContatore: "G100", prezzo: 2380 }
                ] },

        ]},

        { key: "LAVFAT1040_GAS", value: [
            { quotaFissa:  1500 , quotaVariabile: [
                { classeContatore: "G4", prezzo: 380 },
                { classeContatore: "G6", prezzo: 760 },
                { classeContatore: "G10", prezzo: 970 },
                { classeContatore: "G16", prezzo: 1180 },
                { classeContatore: "G25", prezzo: 1480 },
                { classeContatore: "G40", prezzo: 1780 },
                { classeContatore: "G65", prezzo: 2080 },
                { classeContatore: "G100", prezzo: 2380 }
                ] },

        ]},

        { key: "LAVFAT1140_GAS", value: [
            { quotaFissa: 350, quotaVariabile: [
               { classeContatore: "G4", prezzo: 380 },
                { classeContatore: "G6", prezzo: 760 },
                { classeContatore: "G10", prezzo: 970 },
                { classeContatore: "G16", prezzo: 1180 },
                { classeContatore: "G25", prezzo: 1480 },
                { classeContatore: "G40", prezzo: 1780 },
                { classeContatore: "G65", prezzo: 2080 },
                { classeContatore: "G100", prezzo: 2380 }
                ] },

        ]},

       /* { key: "LAVFAT1040_GAS", value: [
            { quotaFissa: 1500, quotaVariabile: 380 }
        ]},

         { key: "LAVFAT1140_GAS", value: [
            { quotaFissa: 350, quotaVariabile: 380 }
        ]},*/

        { key: "LAVFAT1070_GAS", value: [
            { quotaFissa: 741.5 }
        ]},

        { key: "LAVFAT1170_GAS", value: [
            { quotaFissa: 203.5 }
        ]},

        { key: "LAVFAT1130_GAS", value: [
            { tipoSpostamento: "1", quotaFissa: 495, label: "Lavoro Interrato", quotaVariabile: [
                { classeContatore: "G4", prezzo: 490 },
                { classeContatore: "G6", prezzo: 490 },
                { classeContatore: "G10", prezzo: 550 },
                { classeContatore: "G16", prezzo: 550 },
                { classeContatore: "G25", prezzo: 550 },
                { classeContatore: "G40", prezzo: 600 },
                { classeContatore: "G65", prezzo: 600 },
                { classeContatore: "G100", prezzo: 600 }
            ]},
            { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
        ]},

        { key: "LAVFAT1181_GAS", value: [
            { tipoSpostamento: "1", quotaFissa: 440, label: "Lavoro Interrato", quotaVariabile: [
                { classeContatore: "G4", prezzo: 350 },
                { classeContatore: "G6", prezzo: 350 },
                { classeContatore: "G10", prezzo: 400 },
                { classeContatore: "G16", prezzo: 400 },
                { classeContatore: "G25", prezzo: 400 },
                { classeContatore: "G40", prezzo: 500 },
                { classeContatore: "G65", prezzo: 500 },
                { classeContatore: "G100", prezzo: 500 }
            ]},
            { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
        ]},

        { key: "LAVFAT1610_GAS", value: [
            { tipoInterruzione: "AUTOSCALA", quotaFissa: 798,label:"A" },
            { tipoInterruzione: "BASE", quotaFissa: 365,label:"B" },
            { tipoInterruzione: "BYPASS", quotaFissa: 550, label:"Y" },
            { tipoInterruzione: "SCAVO", quotaFissa: 1700, label:"S" }
        ]},
        { key: "LAVINT1630_GAS", value: [
            { tipoInterruzione: "AUTOSCALA", quotaFissa: 798,label:"A" },
            { tipoInterruzione: "BASE", quotaFissa: 365,label:"B" },
            { tipoInterruzione: "BYPASS", quotaFissa: 550, label:"Y" },
            { tipoInterruzione: "SCAVO", quotaFissa: 1700, label:"S" }
        ]},
        { key: "CIF", value: [
            { tipoInterruzione: "AUTOSCALA", quotaFissa: 775,label:"A" },
            { tipoInterruzione: "BASE", quotaFissa: 420,label:"B" },
            { tipoInterruzione: "BYPASS", quotaFissa: 1260, label:"Y" },
            { tipoInterruzione: "SCAVO", quotaFissa: 1555, label:"S" }
        ]},

         { key: "LAVFAT1040_EE", value: [
            { descrizione: "Connessioni permanenti ordinarie in BT - Nuovo allacciamento", 
                quotaFissa: 188.95, quotaOneriAmm: 25.51, quota200_700:94.71, quota700_1200: 188.95, 
                quota1200: 377.89, quotaPotenza: 71.04, progr: 1 },
            { descrizione: "Passaggio da MT a BT - Nuovo allacciamento", 
                quotaFissa: 188.95, quotaOneriAmm: 25.51, quota200_700:94.71, quota700_1200: 188.95, 
                quota1200: 377.89, quotaPotenza: 71.04, progr: 2},
             { descrizione: "Connessioni permanenti particolari - Nuovo allacciamento", 
                quotaFissa: 486.64, quotaOneriAmm: 25.51, quota200_700:0, quota700_1200: 0, 
                quota1200: 0, quotaPotenza: 70.56, progr: 3 }
        ]},
        
        { key: "LAVFAT1100_EE", value: [
            { quotaOneriAmm: 25.51, quotaPotenza: 71.04 }
        ]},

        { key: "LAVFAT1181_EE", value: [
            { quotaFissa: 204.03 }
        ]},

         { key: "LAVFAT1010_ACQUA", value: [
            { quotaFissa: 355, quotaVariabile: [
                  { classeContatore: "DN15", prezzo: 320 },
                  { classeContatore: "DN20", prezzo: 520 },
                  { classeContatore: "DN25", prezzo: 820 },
                  { classeContatore: "DN32", prezzo: 1120 },
                  { classeContatore: "DN40", prezzo: 1420 },
                  { classeContatore: "DN50", prezzo: 1720 },
                  { classeContatore: "DN80", prezzo: 2020 },
                  { classeContatore: "DN100", prezzo: 2320 }
            ]}
        ]},

     { key: "LAVFAT1010_FOGNA", value: [
            { label: 'per 1 Uleq', allacFogna: 'A', quotaFissa: 1605},
            { label: 'da 2 a 3 Uleq', allacFogna: 'B', quotaFissa: 2470},
            { label: 'da 4 a 5 Uleq', allacFogna: 'C', quotaFissa: 2841},
            { label: 'da 6 a 10 Uleq', allacFogna: 'D', quotaFissa: 3459},
            { label: 'da 11 a 15 Uleq', allacFogna: 'E', quotaFissa: 4076},
            { label: 'da 16 a 20 Uleq', allacFogna: 'F', quotaFissa: 4695},
            { label: 'da 21 a 25 Uleq', allacFogna: 'G', quotaFissa: 5313},
            { label: 'da 26 a 30 Uleq', allacFogna: 'H', quotaFissa: 5928},
            { label: 'da 31 a 35 Uleq', allacFogna: 'I', quotaFissa: 6546},
            { label: 'oltre 35 Uleq', allacFogna: 'L', quotaFissa: 7165},
            { label: 'Solo quota completamento', allacFogna: 'Z', quotaFissa: 707},
        ]},
        { key: "LAVFAT1040_FOGNA", value: [
            { label: 'Allacciamento DN160 (1 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5",  allacFogna: '01', quotaFissaNuovo: 1600, quotaFissaSpostamento:2340},
            { label: 'Allacciamento DN160 (1 UIeq) e 1,5mt < Hm <= 2,5mt',  diametro:"DN160", maxprofondita:"2.5", allacFogna: '02', quotaFissaNuovo: 2400, quotaFissaSpostamento:3140},
            { label: 'Allacciamento DN160 (2-3 UIeq) e Hm <= 1,5m', diametro:"DN160", maxprofondita:"1.5", allacFogna: '03', quotaFissaNuovo: 2470, quotaFissaSpostamento:3210},
            { label: 'Allacciamento DN160 (2-3 UIeq) e 1,5mt < Hm <= 2,5mt',diametro:"DN160", maxprofondita:"2.5", allacFogna: '04', quotaFissaNuovo: 3270, quotaFissaSpostamento:4010},
            { label: 'Allacciamento DN160 (4-5 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5",allacFogna: '05', quotaFissaNuovo: 2840, quotaFissaSpostamento:3580},
            { label: 'Allacciamento DN160 (4-5 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '06', quotaFissaNuovo: 3640, quotaFissaSpostamento:4380},
            { label: 'Allacciamento DN160 (6-10 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5", allacFogna: '07', quotaFissaNuovo: 3460, quotaFissaSpostamento:4200},
            { label: 'Allacciamento DN160 (6-10 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '08', quotaFissaNuovo: 4260, quotaFissaSpostamento:5000},
            { label: 'Allacciamento DN160 (>10 UIeq) e Hm <= 1,5mt', diametro:"DN160", maxprofondita:"1.5", allacFogna: '09', quotaFissaNuovo: 4075, quotaFissaSpostamento:4815},
            { label: 'Allacciamento DN160 (>10 UIeq) e 1,5mt < Hm <= 2,5mt', diametro:"DN160", maxprofondita:"2.5", allacFogna: '10', quotaFissaNuovo: 4875, quotaFissaSpostamento:5615},
            { label: 'Allacciamento DN200 e Hm < 1,5mt', diametro:"DN200", maxprofondita:"1.5", allacFogna: '11', quotaFissaNuovo: 4690, quotaFissaSpostamento:5430},
            { label: 'Allacciamento DN200 e 1,5mt < Hm <= 2,5mt',diametro:"DN200", maxprofondita:"2.5", allacFogna: '12', quotaFissaNuovo: 5690, quotaFissaSpostamento:6430},
            { label: 'Allacciamento DN250 e Hm <= 1,5mt',diametro:"DN250", maxprofondita:"1.5", allacFogna: '13', quotaFissaNuovo: 5310, quotaFissaSpostamento:6050},
            { label: 'Allacciamento DN250 e 1,5mt < Hm <= 2,5mt',diametro:"DN250", maxprofondita:"2.5", allacFogna: '14', quotaFissaNuovo: 6310, quotaFissaSpostamento:7050},
            { label: 'Allacciamento DN315 e Hm <= 1,5mt', diametro:"DN315", maxprofondita:"1.5",allacFogna: '15', quotaFissaNuovo: 5930, quotaFissaSpostamento:6670},
            { label: 'Allacciamento DN315 e 1,5mt < Hm <= 2,5mt', diametro:"DN315", maxprofondita:"2.5", allacFogna: '16', quotaFissaNuovo: 6930, quotaFissaSpostamento:7670},
            { label: 'Allacciamento DN400 e Hm <= 1,5mt', diametro:"DN400", maxprofondita:"1.5", allacFogna: '17', quotaFissaNuovo: 6550, quotaFissaSpostamento:7290},
            { label: 'Allacciamento DN400 e 1,5mt < Hm <= 2,5mt', diametro:"DN400", maxprofondita:"2.5", allacFogna: '18', quotaFissaNuovo: 7550, quotaFissaSpostamento:8290},
         

            //   { label: 'Solo quota completamento', allacFogna: 'Z', quotaFissaNuovo: 707, quotaFissaSpostamento:707},
        ]},


        { key: "LAVFAT1040_ACQUA", value: [
            { quotaFissa: 1350, quotaVariabile: [
                  { classeContatore: "DN15", prezzo: 320 },
                  { classeContatore: "DN20", prezzo: 520 },
                  { classeContatore: "DN25", prezzo: 820 },
                  { classeContatore: "DN32", prezzo: 1120 },
                  { classeContatore: "DN40", prezzo: 1420 },
                  { classeContatore: "DN50", prezzo: 1720 },
                  { classeContatore: "DN80", prezzo: 2020 },
                  { classeContatore: "DN100", prezzo: 2320 }
            ]}
        ]},

        { key: "LAVFAT1050_ACQUA", value: [
            { quotaFissa: 1350, quotaVariabile: [
                 { classeContatore: "DN15", prezzo: 320 },
                  { classeContatore: "DN20", prezzo: 520 },
                  { classeContatore: "DN25", prezzo: 820 },
                  { classeContatore: "DN32", prezzo: 1120 },
                  { classeContatore: "DN40", prezzo: 1420 },
                  { classeContatore: "DN50", prezzo: 1720 },
                  { classeContatore: "DN80", prezzo: 2020 },
                  { classeContatore: "DN100", prezzo: 2320 }
            ]}
        ]},

        { key: "LAVFAT1140_ACQUA", value: [
            { quotaFissa: 355, quotaVariabile: [
                  { classeContatore: "DN15", prezzo: 320 },
                  { classeContatore: "DN20", prezzo: 520 },
                  { classeContatore: "DN25", prezzo: 820 },
                  { classeContatore: "DN32", prezzo: 1120 },
                  { classeContatore: "DN40", prezzo: 1420 },
                  { classeContatore: "DN50", prezzo: 1720 },
                  { classeContatore: "DN80", prezzo: 2020 },
                  { classeContatore: "DN100", prezzo: 2320 }
            ]}
        ]},

        { key: "LAVFAT1070_ACQUA", value: [
            { quotaFissa: 741.50 }
        ]},

        { key: "LAVFAT1170_ACQUA", value: [
            { quotaFissa: 174 }
        ]},

        { key: "LAVFAT1130_ACQUA", value: [
              { tipoSpostamento: "1", quotaFissa: 705,  label: "Lavoro Interrato", quotaVariabile: [
                { classeContatore: "DN15", prezzo: 280 },
                { classeContatore: "DN20", prezzo: 280 },
                { classeContatore: "DN25", prezzo: 400 },
                { classeContatore: "DN32", prezzo: 400 },
                { classeContatore: "DN40", prezzo: 400 },
                { classeContatore: "DN50", prezzo: 600 },
                { classeContatore: "DN80", prezzo: 600 },
                { classeContatore: "DN100", prezzo: 600 }
          ] },
            { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
        ]},

         { key: "LAVFAT1181_ACQUA", value: [
            { tipoSpostamento: "1", quotaFissa: 480, label: "Lavoro Interrato", quotaVariabile: [
                { classeContatore: "DN15", prezzo: 280 },
                { classeContatore: "DN20", prezzo: 280 },
                { classeContatore: "DN25", prezzo: 400 },
                { classeContatore: "DN32", prezzo: 400 },
                { classeContatore: "DN40", prezzo: 400 },
                { classeContatore: "DN50", prezzo: 600 },
                { classeContatore: "DN80", prezzo: 600 },
                { classeContatore: "DN100", prezzo: 600 }
          ] },
            { tipoSpostamento: "2", quotaFissa: 0, label: "Parte idraulica o aerea" }
        ]},


        { key: "LAVFAT1100_ACQUA", value: [
            { classeContatore: "01", quotaFissa: 1350, quotaVariabile: 280, label: "Contatore Calibro DN 15", quotaIstruttoria: 25 },
            { classeContatore: "02", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 20", quotaIstruttoria: 25 },
            { classeContatore: "03", quotaFissa: 1350, quotaVariabile: 340, label: "Contatore Calibro DN 25", quotaIstruttoria: 25 },
            { classeContatore: "04", quotaFissa: 1350, quotaVariabile: 380, label: "Contatore Calibro DN 32", quotaIstruttoria: 25 },
            { classeContatore: "05", quotaFissa: 1350, quotaVariabile: 550, label: "Contatore Calibro DN 40", quotaIstruttoria: 25 },
            { classeContatore: "06", quotaFissa: 1350, quotaVariabile: 700, label: "Contatore Calibro DN 50", quotaIstruttoria: 25 },
            { classeContatore: "08", quotaFissa: 1350, quotaVariabile: 950, label: "Contatore Calibro DN 80", quotaIstruttoria: 25 },
            { classeContatore: "09", quotaFissa: 1350, quotaVariabile: 1250, label: "Contatore Calibro DN 100", quotaIstruttoria: 25 },
        ]}, 

        { key: "LAVFAT1110_ACQUA", value: [
            { classeContatore: "01", quotaFissa: 1350, quotaVariabile: 280, label: "Contatore Calibro DN 15", quotaIstruttoria: 25 },
            { classeContatore: "02", quotaFissa: 1350, quotaVariabile: 300, label: "Contatore Calibro DN 20", quotaIstruttoria: 25 },
            { classeContatore: "03", quotaFissa: 1350, quotaVariabile: 340, label: "Contatore Calibro DN 25", quotaIstruttoria: 25 },
            { classeContatore: "04", quotaFissa: 1350, quotaVariabile: 380, label: "Contatore Calibro DN 32", quotaIstruttoria: 25 },
            { classeContatore: "05", quotaFissa: 1350, quotaVariabile: 550, label: "Contatore Calibro DN 40", quotaIstruttoria: 25 },
            { classeContatore: "06", quotaFissa: 1350, quotaVariabile: 700, label: "Contatore Calibro DN 50", quotaIstruttoria: 25 },
            { classeContatore: "08", quotaFissa: 1350, quotaVariabile: 950, label: "Contatore Calibro DN 80", quotaIstruttoria: 25 },
            { classeContatore: "09", quotaFissa: 1350, quotaVariabile: 1250, label: "Contatore Calibro DN 100", quotaIstruttoria: 25 }          
        ]},

        { key: "LAVFAT1610_ACQUA", value: [
            { quotaFissa: 115 }
        ]},

         { key: "LAVINT1610_ACQUA", value: [
            { condizione: 'A1', label: 'Aereo', quotaFissa: 325 },
            { condizione: 'B1', label: 'Base', quotaFissa: 330 },
            { condizione: 'V1', label: 'Valvola a vista', quotaFissa: 350 },
            { condizione: 'V2', label: 'Valvola da inserire', quotaFissa: 645 },
            { condizione: 'V3', label: 'Valvola non a vista', quotaFissa: 1165 }
        ]}


            

        
    ]);
    
    static attivitaDescrFromCodice(codAttivita: string) :string {
        let codAttDes = Params.codAttivitaDescrizione.find(x => x.codAttivita === codAttivita); 
        if(codAttDes){
          return codAttDes.label;
        }  
        return "";
    }

    static pdsDescrFromCodice(codPdS: string, settMerceologico: string) :string {
            
        let lavfatdescr = Params.prodServizioList.find(x => x.prestazione === SettoreMerceologico[settMerceologico]
                                                              && x.prodServizio === codPdS);
        if(lavfatdescr){
          return lavfatdescr["titolo"];
        }
        return "";
    }
    
}