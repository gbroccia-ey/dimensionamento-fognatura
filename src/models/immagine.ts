export enum TipoImmagine {
    VERBALE_SOPRALLUOGO,
    FASCICOLO_TECNICO_PLANIMENTRIA,
    FASCICOLO_TECNICO_ALTRE_FOTO,
    ALTRE
}
export class Immagine {
    _nome: string;
    _path: string;
    _tipo: TipoImmagine;

    constructor(path: string, nome: string, tipo: TipoImmagine) {
        this._path = path;
        this._tipo = tipo;
        this._nome = nome;
    }


}