import { Attributo } from './attributo';

export class Preventivo {
    Domestico: boolean;
    Istruttoria: boolean;
    Rifacimento: boolean;
    QuotaIstruttoria: number;
    QuotaVariabile: number;
    QuotaFissa: number;
    Attributi: Attributo[];
    ClasseContatore: string;
    Cop:number;
    Unita: number;
    EstensioneRete: number;
    ContrComunale: number;
    AltreSpese: number;
    TipoSpostamento: number;
    NumeroAttacchi:number;
    TipoInterruzione: string;
    TipoAllaccio: string;
    QuotaContatore: number;
    QuotaFissaPrimoAttacco: number;
    QuotaFissaNAttacchi: number;
    DistanzaDaCabina: number;
    PotenzaPrevista: number;
    Totale: number;
    Completato: boolean;
    QuotaOneriAmm: number;
    QuotaPotenza: number;
    QuotaDistanza: number;
    QuotaDistanzaCalcolata: number;
    Condizione: string;
    QuotaDistanzaDaCabina: number;
    Cer: number;
    Cvv: number;
    Cif: number;
    PotenzaPrevistaManuale: number;
    Progressivo:number;
    UiEqFogna: string;
    _hasCop:boolean;

    selectedLabel: string;
    Deroga;
    Quote;
    _hasDeroga:boolean;
    QuoteItems;
    NumeroCer: number;
    PresaFornitura: string;
    
}