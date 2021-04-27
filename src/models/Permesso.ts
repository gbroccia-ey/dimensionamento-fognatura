
export class Permesso {

    odl: string;
    ubicazioneScavo: string;
    tipoManto: string;
    tipoScavo: string;
    numeroScavi: string;
    larghezza: string;
    lunghezza: string;
    profondita: string;
    numeroGiorni: string;
    chilometrica1: string;
    chilometrica2: string;
    chilometrica3: string;
    superficie: string;
    larghezzaTot: string;

    setPermesso (form) {
        this.ubicazioneScavo = form.ubicazioneScavo
        this.tipoManto = form.tipoManto
        this.tipoScavo = form.tipoScavo
        this.numeroScavi = form.numeroScavi
        this.larghezza = form.larghezza
        this.lunghezza = form.lunghezza
        this.profondita = form.profondita
        this.numeroGiorni = form.numeroGiorni
        this.superficie = form.superficie
        this.larghezzaTot = form.larghezzaTot

        if(form.chilometrica1){
            this.chilometrica1 = form.chilometrica1
            this.chilometrica2 = form.chilometrica2
            this.chilometrica3 = form.chilometrica3
        }
    }
}