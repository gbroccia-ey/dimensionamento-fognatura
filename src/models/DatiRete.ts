  export class DatiRete{

    dataRedazione: string

    valoriAccessibilita: string 
    caratteristicheAlloggiamento: string 
    caratteristicaSportello: string 
    conformitaInstallazione: string 
    telelettura: string 
    spazioConfinato: string 
    potenzialitaIniziale: string 
    pressioneFornitura: string 
    potenzaTecnica: string 
    bloccoAntimorosita: string 
    valvolaChiave: string 
    numChiave: string 
    presenzaChiavi: string 
    mensola: string 
    sezionamentoMorosita: string 
    presenzaEnergia: string 
    flusso: string 
    posizione: string 

    TipoServizio
    Pod

    constructor (existing? : DatiRete) {
      this.valoriAccessibilita = existing ? existing.valoriAccessibilita : null
      this.caratteristicheAlloggiamento = existing ? existing.caratteristicheAlloggiamento : null
      this.caratteristicaSportello = existing ? existing.caratteristicaSportello : null
      this.conformitaInstallazione = existing ? existing.conformitaInstallazione : null
      this.telelettura = existing ? existing.telelettura : null
      this.spazioConfinato = existing ? existing.spazioConfinato : null
      this.potenzialitaIniziale = existing ? existing.potenzialitaIniziale : null
      this.pressioneFornitura = existing ? existing.pressioneFornitura : null
      this.potenzaTecnica = existing ? existing.potenzaTecnica : null
      this.bloccoAntimorosita = existing ? existing.bloccoAntimorosita : null
      this.valvolaChiave = existing ? existing.valvolaChiave : null
      this.numChiave = existing ? existing.numChiave : null
      this.presenzaChiavi = existing ? existing.presenzaChiavi : null
      this.mensola = existing ? existing.mensola : null
      this.sezionamentoMorosita = existing ? existing.sezionamentoMorosita : null
      this.presenzaEnergia = existing ? existing.presenzaEnergia : null
      this.flusso = existing ? existing.flusso : null
      this.posizione = existing ? existing.posizione : null

      this.TipoServizio = existing ? existing.TipoServizio : null
      this.Pod = existing ? existing.Pod : null
    }
}