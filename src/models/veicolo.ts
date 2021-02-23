export class Veicolo {
    _nome: string;
    _targa: string;

    constructor(nome: string, targa: string){
        this._nome = nome;
        this._targa = targa;
    }

    get Targa() {
        return this._targa;
    }

    set Targa(targa: string) {
        this._targa = targa;
    }

    get Nome() {
        return this._nome;
    }

    set Nome(nome: string) {
        this._nome = nome;
    }

    static findByTarga(targa: string, veicoli: Veicolo[]) : Veicolo {
        return veicoli.filter(v => v.Targa == targa)[0];
    }
}