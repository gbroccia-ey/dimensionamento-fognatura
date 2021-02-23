export class Indirizzo {

    _strada: string;
    _via: string;
    _cap: string;
    _barrato: any;
    _civico: string;
    _citta: string;
    _provincia: string;

    constructor(strada: string, via: string, cap: string, civico: string,
                barrato: any, citta: string, provincia: string ) {
        this._strada = strada;
        this._via = via;
        this._cap = cap;
        this._civico = civico;
        this._barrato = barrato;
        this._citta = citta;
        this._provincia = provincia;
    }

    get Strada() {
        return this._strada;
    }

    set Strada(strada: string) {
        this._strada = strada;
    }

    get Via() {
        return this._via;
    }

    set Via(via: string){ this._via = via; }

    get Cap() { return this._cap; }

    set Cap(cap: string) { this._cap = cap; }

    get Civico() { return this._civico; }

    set Civico(civico: string) { this._civico = civico; }

    get Barrato() { return this._barrato; }

    set Barrato(barrato: string ) { this._barrato = barrato; }

    get Citta() { return this._citta; }

    set Citta(citta: string) { this._citta = citta; }

    get Provincia() { return this._provincia; }

    set Provincia(provincia: string) { this._provincia = provincia; }

    toString(): string {
        
        //return `${this.Strada} ${this.Via} ${this.Civico} ${this.Barrato || ""} ${this.Citta} ${this.Provincia}`;
        return `${this.Via} ${this.Civico} ${this.Barrato || ""} ${this.Citta} ${this.Provincia} ${this.Cap}`;
        
    }

    toShortString(): string {
        return `${this.Via} ${this.Civico} ${this.Barrato || ""} ${this.Citta}`;
        
    }

    static parseServerDto(indirizzo: Indirizzo) : Indirizzo {
        return new Indirizzo(indirizzo.Strada, indirizzo.Via, indirizzo.Cap, 
                            indirizzo.Civico, indirizzo.Barrato, indirizzo.Citta, 
                            indirizzo.Provincia);
    }

     static toJsObject(indirizzo: Indirizzo): Object {
        var obj = {};
        obj["Strada"] = indirizzo.Strada;
        obj["Via"] = indirizzo.Via;
        obj["Cap"] = indirizzo.Cap;
        obj["Barrato"] = indirizzo.Barrato;
        obj["Civico"] = indirizzo.Civico;
        obj["Citta"] = indirizzo.Citta;
        obj["Provincia"] = indirizzo.Provincia;
        return obj;
     }
    
}