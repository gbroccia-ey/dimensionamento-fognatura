import { Ads, CodSocieta } from './ads';

export enum EnteType {
    NO_ENTE = -1,
    COMUNE = 0,
    ALTRO = 2
}

export class EnteItem {
    key: string;
    value: string;
    label: string;
    type: EnteType;
}

export class Ente {
    static NO_KEY = "XXX";
    static NO_ENTE = "Nessun permesso obbligatorio";

    static _entiHeratech : EnteItem[] = [
        // RSP, Provincia poi tutto il resto in ordine alfabetico
        { key:Ente.NO_KEY,  type: EnteType.ALTRO,  value: Ente.NO_ENTE,                               label: "Nessun permesso obbligatorio" },
        { key:"M60_2",      type: EnteType.COMUNE, value: "Rottura piano stradale (RSP) - Comune",    label: "Rottura piano stradale (RSP) - Comune" },
        { key:"M120_6",     type: EnteType.ALTRO,  value: "Provincia",                                label: "Provincia" },
        { key:"M360_1",     type: EnteType.ALTRO,  value: "ANAS",                                     label: "ANAS" },
        { key:"M90_1",      type: EnteType.ALTRO,  value: "ARPA",                                     label: "ARPA" },
        { key:"M120_1",     type: EnteType.ALTRO,  value: "Altri corsi d'acqua",                      label: "Altri corsi d'acqua" },
        { key:"M90_6",      type: EnteType.ALTRO,  value: "Autorità Portuale",                        label: "Autorità Portuale" },
        { key:"M180_4",     type: EnteType.COMUNE, value: "Autorizzazione Edilizia e Permesso Costruire - Comune", label: "Autorizzazione Edilizia e Permesso Costruire - Comune" },
        { key:"M360_2",     type: EnteType.ALTRO,  value: "Autostrade",                               label: "Autostrade" },
        { key:"M180_2",     type: EnteType.ALTRO,  value: "Azienda U.S.L.",                           label: "Azienda U.S.L." },
        { key:"M60_1",      type: EnteType.ALTRO,  value: "Canale Emiliano Rom. (C.E.R.)",            label: "Canale Emiliano Rom. (C.E.R.)" },
        { key:"M30_3",      type: EnteType.ALTRO,  value: "Consorzio boschivo del Carso",             label: "Consorzio boschivo del Carso" },
        { key:"M120_7",     type: EnteType.ALTRO,  value: "Consorzio di Bonifica",                    label: "Consorzio di Bonifica" },
        { key:"M30_2",      type: EnteType.ALTRO,  value: "COSELAG",                                  label: "COSELAG" },
        { key:"M180_5",     type: EnteType.ALTRO,  value: "Demanio",                                  label: "Demanio" },
        { key:"M60_3",      type: EnteType.ALTRO,  value: "Enti Parchi zone protette",                label: "Enti Parchi zone protette" },
        { key:"M360_3",     type: EnteType.ALTRO,  value: "Ferrovia",                                 label: "Ferrovia" },
        { key:"M180_6",     type: EnteType.ALTRO,  value: "Friuli Venezia Giulia Strade",             label: "Friuli Venezia Giulia Strade" },
        { key:"M90_4",      type: EnteType.ALTRO,  value: "Genio Militare",                           label: "Genio Militare" },
        { key:"M180_7",     type: EnteType.ALTRO,  value: "Ministero delle Comunicazioni ",           label: "Ministero delle Comunicazioni " },
        { key:"M240_1",     type: EnteType.ALTRO,  value: "Oleodotto Militare (P.O.L.)",              label: "Oleodotto Militare (P.O.L.)" },
        { key:"M240_2",     type: EnteType.ALTRO,  value: "Regione",                                  label: "Regione" },
        { key:"M60_5",      type: EnteType.ALTRO,  value: "Reti ACQUA altri gestori ",                label: "Reti ACQUA altri gestori " },
        { key:"M120_5",     type: EnteType.ALTRO,  value: "Reti ELETTRICHE altri gestori ",           label: "Reti ELETTRICHE altri gestori " },
        { key:"M60_4",      type: EnteType.ALTRO,  value: "Reti GAS altri gestori ",                  label: "Reti GAS altri gestori " },
        { key:"M360_4",     type: EnteType.ALTRO,  value: "Sito di interesse nazionale",              label: "Sito di interesse nazionale" },
        { key:"M360_5",     type: EnteType.ALTRO,  value: "Sito di interesse regionale",              label: "Sito di interesse regionale" },
        { key:"M90_5",      type: EnteType.ALTRO,  value: "Sovrintendenza Beni Culturali",            label: "Sovrintendenza Beni Culturali" },
        { key:"M30_4",      type: EnteType.ALTRO,  value: "Uso Civico",                               label: "Uso Civico" }, // NOTA: queste sono le "comunelle"
        { key:"M120_4",     type: EnteType.ALTRO,  value: "Vincolo Idrogeologico",                    label: "Vincolo Idrogeologico" },
        /*        
        { type: EnteType.ALTRO,  value: "Certificato Prevenzione Incendi (VV.FF)",  label: "Certificato Prevenzione Incendi (VV.FF)" },
        { type: EnteType.COMUNE, value: "Genio Militare",                           label: "Genio Militare" },
        { type: EnteType.COMUNE, value: "Comune - Denuncia Inizio Attività (DIA)",  label: "Comune - Denuncia Inizio Attività (DIA)" },
        { type: EnteType.ALTRO,  value: "Az U.S.L (autorizzazione all'uso potabile)", label: "Az U.S.L (autorizzazione all'uso potabile)" },
        { type: EnteType.COMUNE, value: "Bonifica Reno Palata",                     label: "Bonifica Reno Palata" },
        { type: EnteType.COMUNE, value: "Canale di Reno",                           label: "Canale di Reno" },
        { type: EnteType.COMUNE, value: "Comunità Montana",                         label: "Comunità Montana" },
        { type: EnteType.COMUNE, value: "Vincolo Idrogeologico",                    label: "Vincolo Idrogeologico" },
        { type: EnteType.COMUNE, value: "ENEL",                                     label: "ENEL" },
        { type: EnteType.COMUNE, value: "Autorità Bacino Reno",                     label: "Autorità Bacino Reno" },
        { type: EnteType.COMUNE, value: "Azienda U.S.L.",                           label: "Azienda U.S.L." },
        { type: EnteType.COMUNE, value: "Bonifica Renana",                          label: "Bonifica Renana" },
        { type: EnteType.COMUNE, value: "Ferrovia Suburbana A.T.C.",                label: "Ferrovia Suburbana A.T.C." },
        { type: EnteType.COMUNE, value: "Ferrovie di stato (FF.SS.)",               label: "Ferrovie di stato (FF.SS.)" },
        */
    ];
    /*
    static _entiAAA : EnteItem[] = [
        { type: EnteType.COMUNE, value: Ente.NO_ENTE, label: "Nessun permesso obbligatorio" },
        { type: EnteType.ALTRO,  value: "ANAS",                                     label: "ANAS" },
        { type: EnteType.ALTRO,  value: "Autorità Portuale ",                       label: "Autorità Portuale " },
        { type: EnteType.COMUNE, value: "Autorizzazione Edilizia e Permesso Costruire - Comune", label: "Autorizzazione Edilizia e Permesso Costruire - Comune" },
        { type: EnteType.ALTRO,  value: "Consorzio boschivo del Carso",             label: "Consorzio boschivo del Carso" },
        { type: EnteType.ALTRO,  value: "Consorzio di bonifica del Bacchiglione",   label: "Consorzio di bonifica del Bacchiglione" },
        { type: EnteType.ALTRO,  value: "Consorzio di bonifica Pianura Friulana",   label: "Consorzio di bonifica Pianura Friulana" },
        { type: EnteType.ALTRO,  value: "COSELAG",                                  label: "COSELAG" },
        { type: EnteType.ALTRO,  value: "Demanio dello Stato",                      label: "Demanio dello Stato" },
        { type: EnteType.ALTRO,  value: "Ferrovie dello Stato",                     label: "Ferrovie dello Stato" },
        { type: EnteType.ALTRO,  value: "Friuli Venezia Giulia Strade ",            label: "Friuli Venezia Giulia Strade " },
        { type: EnteType.ALTRO,  value: "Ispettorato delle Foreste ",               label: "Ispettorato delle Foreste " },
        { type: EnteType.ALTRO,  value: "Ministero delle Comunicazioni ",           label: "Ministero delle Comunicazioni " },
        { type: EnteType.ALTRO,  value: "Provincia di Padova",                      label: "Provincia di Padova" },
        { type: EnteType.ALTRO,  value: "Regione Veneto ",                          label: "Regione Emilia Romagna" },
        { type: EnteType.COMUNE, value: "Rottura piano stradale (RSP) - Comune",    label: "Rottura piano stradale (RSP) - Comune" },
        { type: EnteType.ALTRO,  value: "Sito di interesse nazionale",              label: "Sito di interesse nazionale" },
        { type: EnteType.ALTRO,  value: "Sito di interesse regionale",              label: "Sito di interesse regionale" },
        { type: EnteType.ALTRO,  value: "Sovrintendenza Beni Culturali",            label: "Sovrintendenza Beni Culturali" },

    ];
    */

    static getEnti(ads: Ads) : EnteItem[]{
        // TODO: select by SOCIETA
        switch(ads.CodiceSocieta){
            /* Nessuna segregazione
            case CodSocieta.AAA:
                return Ente._entiAAA;
                break;
            */
            default:
                return Ente._entiHeratech;
                break;
        }
    }

    static getEntiDominantType(ads:Ads, enti:string[]){
        let adsEnti = Ente.getEnti(ads);
        let type = EnteType.COMUNE;
        for (let item of enti){
            if (adsEnti.filter(e => (e.value === item && e.type === EnteType.ALTRO)).length > 0){
                type = EnteType.ALTRO;
                break;
            }
        }
        return type;
    }
}

