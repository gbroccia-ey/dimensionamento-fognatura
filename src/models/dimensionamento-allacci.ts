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
export class DimensionamentoAllacciFognatura{

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