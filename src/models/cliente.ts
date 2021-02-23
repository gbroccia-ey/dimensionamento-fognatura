import { Indirizzo } from './indirizzo';

export class Cliente {
    _cognome: string;
    _nome: string;
    _ragione_sociale: any;
    _codice_cliente: string;
    _telefono: string;
    _email: string;
    _indirizzo: Indirizzo;

    constructor(cognome: string, nome: string, ragione_sociale: string, codice_cliente:string,
                telefono: string, email: string, indirizzo: Indirizzo){

                    this._cognome = cognome;
                    this._nome = nome;
                    this._ragione_sociale = ragione_sociale;
                    this._codice_cliente = codice_cliente;
                    this._telefono = telefono;
                    this._email = email;
                    this._indirizzo = indirizzo;

    }

    get Cognome() {
        return this._cognome;
    }

    set Cognome(cognome: string) {
        this._cognome = cognome;
    }

    get Nome() {
        return this._nome;
    }

    set Nome(nome: string) {
        this._nome = nome;
    }

    get RagioneSociale() {
        return this._ragione_sociale;
    }

    set RagioneSociale(ragione_sociale: string) {
        this._ragione_sociale = ragione_sociale;
    }

    get CodiceCliente() {
        return this._codice_cliente;
    }

    set CodiceCliente(codice_cliente: string) {
        this._codice_cliente = codice_cliente;
    }

    get Telefono() {
        return this._telefono;
    }

    set Telefono(telefono: string) {
        this._telefono = telefono;
    }

    get Email() {
        return this._email;
    }

    set Email(email: string) {
        this._email = email;
    }

    get Indirizzo() {
        return this._indirizzo;
    }

    set Indirizzo(indirizzo: Indirizzo) {
        this._indirizzo = indirizzo;
    }

    static parseServerDto(cliente: Cliente) : Cliente {
        return new Cliente(cliente.Cognome, cliente.Nome, cliente.RagioneSociale, 
                            cliente.CodiceCliente, cliente.Telefono, cliente.Email, 
                            Indirizzo.parseServerDto(cliente.Indirizzo));
    }

    static toJsObject(cliente: Cliente): Object {
        var obj = {};
        
        obj["Cognome"] = cliente.Cognome;
        obj["Nome"] = cliente.Nome;
        obj["RagioneSociale"] = cliente.RagioneSociale;
        obj["CodiceCliente"] = cliente.CodiceCliente;
        obj["Telefono"] = cliente.Telefono;
        obj["Email"] = cliente.Email;
        obj["Indirizzo"] = Indirizzo.toJsObject(cliente.Indirizzo);
        return obj;
    }
}