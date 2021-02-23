import { Ads } from './ads';

export enum EnteType {
    NO_ENTE = -1,
    COMUNE = 0,
    PROVINCIA = 1,
    CONSORZIO = 2
}

export class EnteItem {
    value: string;
    label: string;
    type: EnteType;
}

export class Ente {
    static NO_ENTE = "Nessun permesso obbligatorio";

    static _entiAcqua : EnteItem[] = [
        { type: EnteType.COMUNE, value: Ente.NO_ENTE, label: "Nessun permesso obbligatorio" },
        { type: EnteType.COMUNE, value: "Giorni 30 : Comune - Denuncia Inizio Attività (DIA)", label: "Giorni 30 : Comune - Denuncia Inizio Attività (DIA)" },
        { type: EnteType.COMUNE, value: "Giorni 60 : Canale Emiliano Rom. (C.E.R.)", label: "Giorni 60 : Canale Emiliano Rom. (C.E.R.)" },
        { type: EnteType.COMUNE, value: "Giorni 60 : Comune - Rottura piano stradale (RSP)", label: "Giorni 60 : Comune - Rottura piano stradale (RSP)" },
        { type: EnteType.COMUNE, value: "Giorni 60 : Enti Parchi zone protette", label: "Giorni 60 : Enti Parchi zone protette" },
        { type: EnteType.COMUNE, value: "Giorni 90 : ARPA", label: "Giorni 90 : ARPA" },
        { type: EnteType.COMUNE, value: "Giorni 90 : Az U.S.L (autorizzazione all'uso potabile)", label: "Giorni 90 : Az U.S.L (autorizzazione all'uso potabile)" },
        { type: EnteType.COMUNE, value: "Giorni 90 : Certificato Prevenzione Incendi (VV.FF)", label: "Giorni 90 : Certificato Prevenzione Incendi (VV.FF)" },
        { type: EnteType.COMUNE, value: "Giorni 90 : Genio Militare", label: "Giorni 90 : Genio Militare" },
        { type: EnteType.COMUNE, value: "Giorni 90 : Sovrintendenza Beni Culturali", label: "Giorni 90 : Sovrintendenza Beni Culturali" },
        { type: EnteType.COMUNE, value: "Giorni 90 : Autorità Portuale Ravenna", label: "Giorni 90 : Autorità Portuale Ravenna" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Bonifica Reno Palata", label: "Giorni 120 : Bonifica Reno Palata" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Canale di Reno", label: "Giorni 120 : Canale di Reno" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Comunità Montana", label: "Giorni 120 : Comunità Montana" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Vincolo Idrogeologico", label: "Giorni 120 : Vincolo Idrogeologico" },
        { type: EnteType.COMUNE, value: "Giorni 120 : ENEL", label: "Giorni 120 : ENEL" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Provincia", label: "Giorni 120 : Provincia" },
        { type: EnteType.COMUNE, value: "Giorni 120 : Consorzio di Bonifica", label: "Giorni 120 : Consorzio di Bonifica" },
        { type: EnteType.COMUNE, value: "Giorni 180 : Autorità Bacino Reno", label: "Giorni 180 : Autorità Bacino Reno" },
        { type: EnteType.COMUNE, value: "Giorni 180 : Azienda U.S.L.", label: "Giorni 180 : Azienda U.S.L." },
        { type: EnteType.COMUNE, value: "Giorni 180 : Bonifica Renana", label: "Giorni 180 : Bonifica Renana" },
        { type: EnteType.COMUNE, value: "Giorni 180 : Comune (Autorizzazione Edilizia e Permesso Costruire)", label: "Giorni 180 : Comune (Autorizzazione Edilizia e Permesso Costruire)" },
        { type: EnteType.COMUNE, value: "Giorni 180 : Ferrovia Suburbana F.B.T.", label: "Giorni 180 : Ferrovia Suburbana F.B.T." },
        { type: EnteType.COMUNE, value: "Giorni 240 : P.O.L. (Oleodotto Militare) ", label: "Giorni 240 : P.O.L. (Oleodotto Militare)" },
        { type: EnteType.COMUNE, value: "Giorni 240 : Regione Emilia Romagna ", label: "Giorni 240 : Regione Emilia Romagna" },
        { type: EnteType.COMUNE, value: "Giorni 360 : ANAS", label: "Giorni 360 : ANAS" },
        { type: EnteType.COMUNE, value: "Giorni 360 : Autostrade", label: "Giorni 360 : Autostrade" },
        { type: EnteType.COMUNE, value: "Giorni 360 : Ferrovia Suburbana A.T.C.", label: "Giorni 360 : Ferrovia Suburbana A.T.C." },
        { type: EnteType.COMUNE, value: "Giorni 540 : Ferrovie di stato (FF.SS.)", label: "Giorni 540 : Ferrovie di stato (FF.SS.)" },
    ];

    static getEnti(ads: Ads) : EnteItem[]{
        // TODO: select by SM+SOCIETA
        return Ente._entiAcqua;
    }

    static getEntiDominantType(ads:Ads, enti:string[]){
        let adsEnti = Ente.getEnti(ads);
        let type = EnteType.COMUNE;
        for (let item of enti){
            if (adsEnti.filter(e => (e.value === item && e.type === EnteType.PROVINCIA)).length > 0){
                type = EnteType.PROVINCIA;
                break;
            }
            if (adsEnti.filter(e => (e.value === item && e.type === EnteType.CONSORZIO)).length > 0){
                type = EnteType.CONSORZIO;
                break;
            }
        }
        return type;
    }
}

