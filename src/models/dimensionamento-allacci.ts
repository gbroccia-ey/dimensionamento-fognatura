export class RichiestaNonDomestica{
    constructor(
      public classeContatore: string,
      public numero: any,
      public portata: number
    ) { }   
}

export class RichiestaDomestica{
    constructor(
      public unitaAbitative: number,
      public contatoreDaInstallare: string,
      public portata: number  
    ){ }
}


export class UnitaSingola{
    constructor(
        public numero: any,
        public tipoContatore: string,
    ) { }   
}

export class UnitaDeroga{
    constructor(
      public numero: number,
      public tipoContatore: string
    ){ }
}

export class ContatoreAntincendio{
    constructor(
        public numero: number,
        public tipoContatore: string,
        public portataLS: number,
        public portataMH: number,
      ){ }
}

export class MaterialeEE{
    constructor(
        public nome: string,
        public numero: number,
        public desc: string
      ){ }
}



export class ParametriAcqueNere{
    //Divisori per calcolo delle Unità Immobiliari equivalenti a partire da varie tipologie di utenze
    static dividers = [1.0,5.0,30.0,250.0,100.0];   

    constructor(
        public usoDomestico: number,
        public alberghieri: number,
        public ospedali: number,
        public artigianali: number,
        public commerciali: number,
        public sommaUIeq: number,
        public portata: number
      ){ }

    sum(){
        return  this.usoDomestico+
                this.alberghieri+
                this.ospedali+
                this.artigianali+
                this.commerciali
    }


    sumEq(){
        return  this.usoDomestico/ParametriAcqueNere.dividers[0]+
            this.alberghieri/ParametriAcqueNere.dividers[1]+
            this.ospedali/ParametriAcqueNere.dividers[2]+
            this.artigianali/ParametriAcqueNere.dividers[3]+
            this.commerciali/ParametriAcqueNere.dividers[4] 
    
    }
}


export class ParametriAcqueBianche{
    static uiEqFisseAcqueBianche = 2.0;   // UIeq fisse in presenza di ACQUE BIANCHE

    constructor(
        public uiEqFisse: number,
        public supImpermeabili: number,
        public portataImpermeabili: number,
        public supSemipermeabili: number,
        public portataSemipermeabili: number,
        public portateLimitate: number,
        public sommaUIeq: number,
        public portata: number
      ){ }
}

export class ParametriVincoli{
    constructor(
        public portataMista: number,
        public totaleUIeq: number,
        public lunghezza: number,
        public dislivello: number,
        public pendenza: number,
        public diamIntMinimo: number
      ){ }
}




export class DimensionamentoAllacciGas{

    constructor(
        public TipoRete: string,
        public ReteStradale: string,
        public MaterialeAllaccio: string,
        public LunghezzaTubazione: number,
        public PortataDomestico: number,
        public PortataTotaleDomestico: number,
        public NumeroContatoriUsoDomestico: number,
        public ClasseContatoreDomestico: string,
        public RichiesteNonDomestiche: RichiestaNonDomestica[],
        public PortataTotaleAltriUsi: number,
        public PortataTotaleAllacciamento: number,
        public Risultato
    ){ 
        this.Risultato = {text:'',materiale:'',warning:''};
    }
}

export class DimensionamentoAllacciAcqua{

    constructor(
        public ReteStradale: string,
        public NumeroPerdite: number,
        public PressioneRete: number,
        public LunghezzaAllacciamento: number,
        public UnitaSingola: UnitaSingola,
        public UnitaDeroga: UnitaDeroga,
        public ContatoriAntincendio: Array<ContatoreAntincendio>,
        public PortataCalcoloA,
        public PortataCalcoloB,
        public PortataCalcoloTotale,
        public AllacciamentoNuovo1,
        public AllacciamentoNuovo2,
        public AllacciamentoNuovo3,
        public AllacciamentoNuovo4,
        public AllacciamentoNuovo5,
        public AllacciamentoNuovo6,
        public AllacciamentoEsistente,
        public Risultato
    ){ 
        this.Risultato = {text:'',materiale:'',warning:''};
    }
}


export class DimensionamentoAllacciEE{

    constructor(
        public ReteEE: Array<MaterialeEE>
    ) {
    }
}

export class DimensionamentoAllacciFognatura{
    

    constructor(
        public AllacciamentoNuovo1,
        public AllacciamentoNuovo2,
        public AllacciamentoNuovo3,
        public AllacciamentoNuovo4,
        public AllacciamentoNuovo5,
        public AllacciamentoNuovo6,
        public AllacciamentoEsistente,
        public Risultato,
        public AcqueNere : ParametriAcqueNere,
        public AcqueBianche : ParametriAcqueBianche,
        public Vincoli: ParametriVincoli,
    ){ 
        this.Risultato = {text:'',materiale:'',warning:''};
    }
}
