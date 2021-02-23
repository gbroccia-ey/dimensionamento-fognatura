import { Ads, SettoreMerceologico } from "./ads";

declare var imgExample: any;

  export class DatiRete{
    LogoSx: any
    LogoDx: any
    dataRedazione: string
    TipoServizio: String;
    
    constructor(
      public ads: Ads,
      public valoriAccessibilita: string,
      public caratteristicheAlloggiamento: string,
      public caratteristicaSportello: string,
      public conformitaInstallazione: string,
      public telettatura: string,
      public spazioConfinato: string,
      public potenzialitaIniziale: number,
      public pressioneFornitura: number,
      public potenzaTecnica: number,
      public bloccoAntimorosita: string,
      public valvolaChiave: string,
      public numChiave: string,
      public presenzaChiavi: string,
      public mensola: string,
      public sezionamentoMorosita: string,
      public presenzaEnergia: string,
      public flusso: string,
      public posizione: string
    )
  {
    //this.LogoSx = imgExample.getLogoSxHera()
    //this.LogoDx = imgExample.getLogoDxInRete()

    this.LogoSx = imgExample.getLogoSxImg(ads.SettoreMerceologico,ads.CodiceSocieta);
    this.LogoDx = imgExample.getLogoDxImg(ads.SettoreMerceologico,ads.CodiceSocieta);
                
    this.TipoServizio = SettoreMerceologico[ads.SettoreMerceologico];
  }
}