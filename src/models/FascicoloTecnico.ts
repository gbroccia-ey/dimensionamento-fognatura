import { Ads,  DettaglioMerceologico,  SettoreMerceologico } from '../models/ads';
import { Params } from '../config/params'


declare var imgExample: any;

export class FascicoloTecnico {

  show_comp = [];
  descrizione = [];  
  
  _ads: Ads;
   // Tipo servizio
  _TipoServizio: String;
  _Acqua: boolean = false;
  _Fognatura: boolean = false;
  _Gas: boolean = false;
  _Energia_Elettrica: boolean = false;
  
  
   // Codici
  _Avviso: string;

   // Indirizzo lavoro
  _Indirizzo: string;

  _codice_sot;

  
  _NoteProgettuali: string;
  _NoteEsecutive: string;
  _Note;
  _Icon;
  _DataRedazione: string;


  _LogoSx;
  _LogoDx;
  _DottedLine;
  _Circle;
  _imagesPlanimetria ;
  _imagesAltre;
  _fillColor;

  _preventivo;
  _CDL;
  _GRP;
  _tipoAvviso;
  _datiCliente;
  _codiceAppuntamento;
  _appuntamento;
  _provenienza;
  _codice_attivita;
  _prod_servizio;
  _codice_odl;

  _DatiTecnici;
 _ClasseContatoreLabel;
 _TipoSpostamentoLabel;

  constructor(
            ads: Ads,
            
            NoteProgettuali: string,
            NoteEsecutive: string,
            DataRedazione: string
            )
            {
                this._ads = ads;

                // Tipo servizio
                this._TipoServizio = SettoreMerceologico[ads.SettoreMerceologico];

                this._Acqua = false;
                this._Gas = false;
                this._Energia_Elettrica = false;
                this._Fognatura = false;
                this._imagesPlanimetria = ads.Base64ImgFt;
                this._imagesAltre = ads.Base64ImgFta;
                this._fillColor = '#cccccc';
                this._preventivo = ads.Preventivo;
                this._CDL = ads.CentroDiLavoro

                this._GRP = ads.GruppoResponsabilePianificazione;
                this._tipoAvviso = ads.TipoAvviso;
                this._datiCliente = ads.Bp;
                this._codiceAppuntamento = ads.CodiceAppuntamento;
                this._appuntamento = ads.DataAppuntamento+" "+ads.OraInizio;
                this._provenienza = ads.Provenienza;
                
                this._codice_sot = ads._codice_sot;
                this._codice_attivita = ads._codice_attivita+": "+this.getInfoCodAttivita(ads._codice_attivita) ;
                this._prod_servizio = ads._prod_servizio+": "+Params.getTitolo(ads._prod_servizio);
                this._codice_odl = ads._codice_odl;

                switch(this._TipoServizio ){
                  case('ACQUA'):{
                    this._Acqua = true;
                    this._fillColor = "#fcce5";
                    break;
                  }
                  case('GAS'):{
                    this._Gas = true;
                    this._fillColor = "#ead383";
                    break;
                  }
                  case('TLR'):{
                    this._Fognatura = true;
                    this._fillColor = "#ead383";
                    break;
                  }
                  case('ENERGIA_ELETTRICA'):{
                    this._Energia_Elettrica = true;
                    this._fillColor = "#f8eebe";
                    break;
                  }
                }

                if(ads.DettaglioMerceologico == DettaglioMerceologico.FOGNATURA) {
                    this._Acqua = false;
                    this._Fognatura = true;
                }

                // Codici
                this._Avviso= ads.CodiceAds;
                // Indirizzo lavoro
                this._Indirizzo = ads.Indirizzo.toString();

                // Indirizzo lavoro
                this._NoteProgettuali = NoteProgettuali;
                this._NoteEsecutive = NoteEsecutive;
                this._Note = ads.Note;
                this._DataRedazione = DataRedazione;

                this._Icon = ads.getIconBase64();

                if(ads.Preventivo != undefined){
                    this._ClasseContatoreLabel = ads.Preventivo.ClasseContatore;
                    if(this._ClasseContatoreLabel=='01') this._ClasseContatoreLabel = "Contatore Calibro DN 15";
                    if(this._ClasseContatoreLabel=='02') this._ClasseContatoreLabel = "Contatore Calibro DN 20";
                    if(this._ClasseContatoreLabel=='03') this._ClasseContatoreLabel = "Contatore Calibro DN 25";
                    if(this._ClasseContatoreLabel=='04') this._ClasseContatoreLabel = "Contatore Calibro DN 32";
                    if(this._ClasseContatoreLabel=='05') this._ClasseContatoreLabel = "Contatore Calibro DN 40";
                    if(this._ClasseContatoreLabel=='06') this._ClasseContatoreLabel = "Contatore Calibro DN 50";
                    if(this._ClasseContatoreLabel=='07') this._ClasseContatoreLabel = "Contatore Calibro DN 65";
                    if(this._ClasseContatoreLabel=='08') this._ClasseContatoreLabel = "Contatore Calibro DN 80";
                    if(this._ClasseContatoreLabel=='09') this._ClasseContatoreLabel = "Contatore Calibro DN 100";
                    if(this._ClasseContatoreLabel=='10') this._ClasseContatoreLabel = "Contatore Calibro > DN 100";
        
                    this._TipoSpostamentoLabel = ads.Preventivo.TipoSpostamento;
                    if(this._TipoSpostamentoLabel==1) this._TipoSpostamentoLabel = 'Lavoro Interrato';
                    if(this._TipoSpostamentoLabel==2) this._TipoSpostamentoLabel = 'Parte Idraulica Aerea';
                } 


                this._DatiTecnici = '';
                if (this.isEmpty(ads.Caratteristiche.NumeroAttacchi)==false) 
                    this._DatiTecnici += 'Numero Attacchi: '+ ads.Caratteristiche.NumeroAttacchi+'\n';
                 if (this.isEmpty(ads.Caratteristiche.PortataContatore)==false) {
                     switch(ads.SettoreMerceologico){
                            case SettoreMerceologico.ACQUA:
                            case SettoreMerceologico.GAS:
                                this._DatiTecnici += 	'Portata Contatore(mc/h): '+ads.Caratteristiche.PortataContatore+'\n';
                                break;
                            
                            default:
                                this._DatiTecnici += 	'Portata Contatore: '+ads.Caratteristiche.PortataContatore+'\n';
                                break;
                                    
                     }
                 }
                if (this.isEmpty(ads.Caratteristiche.ClasseContatoreCee)==false) 
                    this._DatiTecnici += 'Classe Contatore Cee: ' +ads.Caratteristiche.ClasseContatoreCee+'\n';
                if (this.isEmpty(ads.Caratteristiche.TipoLavoro)==false) 
                    this._DatiTecnici += 'Tipo lavoro: ' +ads.GetTipoLavoroLabel()+'\n';
                if (ads.Caratteristiche.DefinizioneLavoro)
                    this._DatiTecnici += 'Definizione complesso: '+this._ads.Caratteristiche.DefinizioneLavoro+' \n';    
                if (this.isEmpty(ads.TipoFornitura)==false) 
                    this._DatiTecnici += 'Tipo fornitura: ' +ads.GetTipoFornituraLabel()+'\n';
                if (this.isEmpty(ads.Caratteristiche.DestinazioneUso)==false) 
                    this._DatiTecnici += 'Destinazione di uso: ' +ads.GetDestinazioneLabel()+'\n';
                if (this.isEmpty(ads.Caratteristiche.PotenzaRichiesta)==false) 
                    this._DatiTecnici += 'Potenza Richiesta: ' +ads.Caratteristiche.PotenzaRichiesta+'\n';
                if (this.isEmpty(ads.Caratteristiche.PotenzaContrRichiesta)==false) 
                    this._DatiTecnici += 'Potenza Richiesta: ' +ads.Caratteristiche.PotenzaContrRichiesta+' kW\n';
                if (this.isEmpty(ads.Caratteristiche.NumeroFasi)==false) 
                    this._DatiTecnici += 'Numero Fasi: ' +ads.GetNumeroFasiLabel()+'\n';
                if (this.isEmpty(ads.Caratteristiche.AllacciamentoCondMandata)==false) 
                    this._DatiTecnici += 	'Allacciamento Conduttura Mandata: '+ads.Caratteristiche.AllacciamentoCondMandata+'\n';
                if (this.isEmpty(ads.Caratteristiche.TemperaturaCondRit)==false) 
                    this._DatiTecnici += 'Temperatura Conduttura Rit: ' +ads.Caratteristiche.TemperaturaCondRit+'\n';
                if (this.isEmpty(ads.Caratteristiche.NumeroScambiatori)==false) 
                    this._DatiTecnici += 'Numero Scambiatori: ' +ads.Caratteristiche.NumeroScambiatori+'\n';
                if (this.isEmpty(ads.Caratteristiche.TipologiaIntervento)==false) 
                    this._DatiTecnici += 'Tipologia Intervento: ' +ads.getTipologiaInterventoLabel()+'\n';
                if (this.isEmpty(ads.Caratteristiche.TipoTaglio)==false) 
                    this._DatiTecnici += 'Tipo taglio: ' +ads.GetTipoTaglioLabel()+'\n';
                if(this.isEmpty(ads.Caratteristiche.TipoFontePrimaria)==false)
                    this._DatiTecnici += 'Tipo fonte primaria: ' +ads.GetTipoFontePrimariaLabel()+'\n';
                if (this.isEmpty(ads.Caratteristiche.NumeroSezioni)==false)
                   this._DatiTecnici += 'Numero Sezioni: ' +ads.Caratteristiche.NumeroSezioni+'\n';
                if (this.isEmpty(ads.Caratteristiche.PotenzaImmissioneRichiesta)==false)            this._DatiTecnici += 'Potenza Immissione Richiesta: '  +ads.Caratteristiche.PotenzaImmissioneRichiesta+'\n';
                if (this.isEmpty(ads.Caratteristiche.PotenzaNominaleRichiesta)==false) this._DatiTecnici += 'Potenza Nominale Richiesta: ' +ads.Caratteristiche.PotenzaNominaleRichiesta+'\n';
                if (this.isEmpty(ads.Caratteristiche.AttivitaNormata)==false) 
                  this._DatiTecnici += 'Attivita Normata: ' +ads.Caratteristiche.AttivitaNormata+'\n';
                if (this.isEmpty(ads.TipologiaPreventivo)==false){
                    let tipoPreventivoLabel = ads.GetTipoPreventivoLabel();
                    if (tipoPreventivoLabel?.length > 0){
                        this._DatiTecnici += 'Tipologia Preventivo: ' +tipoPreventivoLabel+'\n';
                    }
                    
                  } 
                
                
                
                if (ads.Caratteristiche.TipoAllaccio==1)
                   this._DatiTecnici += 'Tipo allaccio: Nuovo allaccimento \n';
                if (ads.Caratteristiche.TipoAllaccio==2)
                   this._DatiTecnici += 'Tipo allaccio: Spostamento con nuovo allaccimento \n';
                

                if (this.isEmpty(ads.Caratteristiche.GRUPresente)==false)
                    this._DatiTecnici += 'Installazione/Modifica Gruppo di riduzione: '+ads.Caratteristiche.GRUPresente+'\n';
                   
                // this._LogoSx = imgExample.getLogoSxHera();
                // this._LogoDx = imgExample.getLogoDxHera();
                // if(this._Energia_Elettrica==true || this._Gas==true) this._LogoDx = imgExample.getLogoDxInRete();
                this._LogoSx = imgExample.getLogoSxImg(ads.NomeSettore,ads.CodiceSocieta);
                this._LogoDx = imgExample.getLogoDxImg(ads.NomeSettore,ads.CodiceSocieta);
                
                
                this._DottedLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABu8AAAK6CAYAAAA5GcGXAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgdBwsAZXRpSgAAGalJREFUeNrs3NFtg0AURcFdRBXuvzaqQNqUkCAFc2zNlPB0+Tpa5lprDQAAAAAAAOBxmxMAAAAAAABAg3gHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEbsTPOuY0xEYY4zxWsv+sX/7x/59A/gG7B/7t3/s3/axffvH/vkY53mOfZea/puXdwAAAAAAAFy2bTLTLXd1AgAAAAAAAK6aXtfeQrwDAAAAAADgMvHuHuIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAvMHhN5P8gXgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAALzBay1H4FfiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAAB8oWNOR/hA4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEXOttZwBAAAAAAAAnuflHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAAAAABAh3gEAAAAAAECEeAcAAAAAAAAR4h0AAAAAAABEiHcAAAAAAAAQId4BAAAAAABAhHgHAAAAAAAAEeIdAAAAAAAARIh3AAAAAAAAECHeAQAAAAAAQIR4BwAAAAAAABHiHQAAAAAAAESIdwAAAD/t2bEAAAAAwCB/62nsKI0AAABgQt4BAAAAAADAhLwDAAAAAACACXkHAAAAAAAAE/IOAAAAAAAAJuQdAAAAAAAATMg7AAAAAAAAmJB3AAAAAAAAMCHvAAAAAAAAYELeAQAAAAAAwIS8AwAAAAAAgAl5BwAAAAAAABPyDgAAAAAAACbkHQAAAAAAAEzIOwAAAAAAAJiQdwAAAAAAADAh7wAAAAAAAGBC3gEAAAAAAMCEvAMAAAAAAIAJeQcAAAAAAAAT8g4AAAAAAAAm5B0AAAAAAABMyDsAAAAAAACYkHcAAAAAAAAwIe8AAAAAAABgQt4BAAAAAADAhLwDAAAAAACACXkHAAAAAAAAE/IOAAAAAAAAJuQdAAAAAAAATMg7AAAAAAAAmJB3AAAAAAAAMCHvAAAAAAAAYELeAQAAAAAAwIS8AwAAAAAAgAl5BwAAAAAAABPyDgAAAAAAACbkHQAAAAAAAEzIOwAAAAAAAJiQdwAAAAAAADAh7wAAAAAAAGBC3gEAAAAAAMCEvAMAAAAAAIAJeQcAAAAAAAAT8g4AAAAAAAAm5B0AAAAAAABMyDsAAAAAAACYkHcAAAAAAAAwIe8AAAAAAABgQt4BAAAAAADAhLwDAAAAAACACXkHAAAAAAAAE/IOAAAAAAAAJuQdAAAAAAAATMg7AAAAAAAAmJB3AAAAAAAAMCHvAAAAAAAAYELeAQAAAAAAwIS8AwAAAAAAgAl5BwAAAAAAABPyDgAAAAAAACbkHQAAAAAAAEzIOwAAAAAAAJiQdwAAAAAAADAh7wAAAAAAAGBC3gEAAAAAAMCEvAMAAAAAAIAJeQcAAAAAAAAT8g4AAAAAAAAm5B0AAAAAAABMyDsAAAAAAACYkHcAAAAAAAAwIe8AAAAAAABgQt4BAAAAAADAhLwDAAAAAACACXkHAAAAAAAAE/IOAAAAAAAAJuQdAAAAAAAATMg7AAAAAAAAmJB3AAAAAAAAMCHvAAAAAAAAYELeAQAAAAAAwIS8AwAAAAAAgAl5BwAAAAAAABPyDgAAAAAAACbkHQAAAAAAAEzIOwAAAAAAAJiQdwAAAAAAADAh7wAAAAAAAGBC3gEAAAAAAMCEvAMAAAAAAIAJeQcAAAAAAAAT8g4AAAAAAAAm5B0AAAAAAABMyDsAAAAAAACYkHcAAAAAAAAwIe8AAAAAAABgQt4BAAAAAADAhLwDAAAAAACACXkHAAAAAAAAE/IOAAAAAAAAJuQdAAAAAAAATMg7AAAAAAAAmJB3AAAAAAAAMCHvAAAAAAAAYELeAQAAAAAAwIS8AwAAAAAAgAl5BwAAAAAAABPyDgAAAAAAACbkHQAAAAAAAEzIOwAAAAAAAJiQdwAAAAAAADAh7wAAAAAAAGBC3gEAAAAAAMCEvAMAAAAAAICJAKaYLGG1upbdAAAAAElFTkSuQmCC";

                this._Circle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgdBxMY9ANpRQAAESdJREFUeNrtnXtMVGcaxp85c+YCwyBTgQoELVZcYovbis260VqLdXW7aV1JmzRsceM2KjG7dFvNWowGiQTXRFsvjfGSYqJd0mqCts123Vq8VMm6qWgXV8OqlYpRLGARhmGY4cyc/WM6dUCQ21zOnPP8/lRm5szzvj/e75s5nKOTZVkGCTpSQwM8DQ3wNDbCc+sWPE1N8DY3w9vaCm9bG+T2dsgOB2SnE7LLBUgSIMuATgeIInQmE3QxMdBZLNCNGQPBZoOQmAghORn6lBTo09KgHz8e+owMiBkZDDxE6CjIKEX49lv0fPMNeurqIF26BKm+HtKVK0BPT/gOwmCAOHkyxKwsiE88AcPUqTA89RTExx9ngShI+JA9Hri/+grumhq4z55Fz9dfw9vcrNjjFZKTYXjmGRhnzIBx5kwYZ8+GTq9nISlI8HDX1sJ17Bhc1dVwnzzpWwpFK6II45w5MM2dC9O8eTDm5LDAFGT4dB89iu7PPoPr88/h+e471b5P/WOPwfTiizC/9BLMCxaw8BRkYFzV1XAeOoTuqip4W1o09/6FpCSY8/IQ8+qrMM2dy4agIIB07Rq6DhyAs7ISnmvX2A3+yTJpEmLy8xFbUABx0iQKorU37fzkE3RVVMD16ae0YRBML7+M2D/8ATELF1IQNSNLEhw7d6Jr925Ily+z84e7v58yBbHLl8OyYgV0okhB1IL33j04tm1D544dkO/eZaePtmHGjkXcn/4Ey5tvQkhIoCDRLEbn5s1wvPce5K4udnawGyc2Fpa33kLcqlWqFkV1gsheLzo3bkTnpk2Q7XZ2cqgbyGpF3OrViCsuhk4QKIiScezZA3tZGbw3b7Jzw4yQng7r2rWwLFtGQZSGq7oa9pISuGtq2KkRxjhzJqylpar5LiWqBfG0tsK+Zg269u5lZyqM2KVLYS0vhz4xkYJEZDn1wQfoWL2an0wpubnGjkX8pk2wvPEGBQkX0o0b6Hj7bXRXVbEDowRzXh7i330X4oQJFCSUdO3bh/Y//xlyRwe7LtoaLT4eY7ZuReySJRQk2Mjd3bi3YgWc+/ax06KcmCVLkLBzJ3RmMwUJBq7Tp9FeWMjTQ1SEOGUKxuzaBdOzzyr+WBX9zU7njh24O3s25VAZ0uXLuDt7Njp37OAEGSn3CgvRtXs3u0nlxC5fjoRduyjIUPHcuoW2xYvhPn6c3aMRjLm5sO3fD31aGgV5GO6zZ9GWnw9PQwO7RmPoMzJgq6yEccYMCtIfzsOH0fbaa4DbzW7R7CgxwvbRR4hZtIib9EAce/eiLS+PcmgdtxtteXlwKOjUoYgL0rllC9pVdgYoGR3ty5ahc8sWCmIvK0PHqlXsCPIAHatWwV5Wpl1BOtavh33dOnYCGfgX6Lp16Fi/XnuC2EtL0Vlayg4ggy/BS0thj2CvhP1TLPvGjbCvWcPKk2FhLS+HtbhY3YJ0bt+OjjffZLXJiIjftg1xRUXqFKTrwAHcW7yYVSajImH/fsQWFKhLkO6jR/HDr3/N6pKg8Mg//hG2i22HXJCeixfR+txzkNvaWFkSnKa12ZB46hQM2dkhf62QforltdvR9vrrlIMEFbmtDW2vvw5vGK57FlJB7i1eDKmujhUlQUeqqwvLnjZkgnQUF6P7yBFWkoRub3vkCDpC/NFvSPYgXZWVuPe737GCJCwk/O1viM3Pjw5Beurr0Tp9OmSHg5Uj4dm0WyxIPHcOhqws5S+x2gsLKQcJ76bd4UB7YaHy9yAda9bAfeoUK0bCjvvUKXSE4BSmoC2xuv/5T/zAO6WSCPPI0aMwz5+vLEFkSUJLdjak+npWiEQUMSsLSRcvBu02cUFZYnWsXEk5iCKQ6uvRsXKlciZI97Fj+OFXv2JliLKWWl98AfO8eZEXpCUnBz3nz7MiRFEYpk1DUm1tZJdY9vJyykEUSc/587CXl0dugkjXr6M5MxPwelkNokwEAclXr0KcODH8E8S+fj3lIMrG6/X1abgniOv4cdxVyU0aifoZW10NU25u+CaIEq5XREg4+nXYgjgPHoT7xAmmTqIG94kTcB48GJ4lVsv06egJwsdnhIQTQ04Oks6dC+0E6TpwgHKQqKSnthZdBw6EdoI0T5sG6cIFpk2iEvHpp5E8zO/thjxBnB9/TDlIVCNduADnxx+HRhDH++8zYRL1DLePhySI68sv4T5zhumSqMd95gxcX34ZXEEcvNssUdMUGUY/D7pJl65eRfPkyUyVqIrkK1cgZmaOfoJ0VVQwTaI6htrXg06QO6mp8DY1MVGiKoSUFIy7fXt0E8R58CDlIKrE29Q0pNNPHi5IZSWTJKplKP094BLLc+cOvk9JYYpE1Tza1AT9uHHDnyDOQ4eYHlH/FBmkzwcUpLuqiukR1TNYn/e7xPLcvInvx49nekQby6zGRujT04c+Qbo//ZSpEe1MkYf0e/+C/P3vTI1oR5CH9PsDSyzZ6USTxQKE7/bphEQWnQ4pDgd0MTGDT5DuL76gHERbyLKv74eyxHJXVzMwojkG6vsHBHHxiiVEgwzU9732IJ7bt/F9WhrTIprk0Vu3oE9NHXiCuGtqmBLR7jKrn/7vLci//sWUiHYF6af/ewvy738zJaJdQfrp/157kNsmE+B2MymiTYxGpLpc/U+QngsXKAfR+Ahx+zzoV5D//IcBEc3T14P7gvz3v0yHUJA+HvwkiHT5MtMhmqevB/cF+d//mA6hIH080MmyLMtuN5pMJqZDCIAUlws6o/H+BJGuX2cqhPinSIAPAgB4btxgKoT8SKAPPkEaG5kKIX5BAnwQAMA7hEswEqIVAn3wTZA7d5gKIf4JEuCDb4I0NzMVQvwTJMAHnyB37zIVQvyCBPjgE6StjakQ4hckwAcBAGS7nakQ8iOBPvgE6exkKoT4BQnwwSeI08lUCPELEuCDTxD+oRQh9wUJ8MF3Nq8kMRVC/AT44BOElxolJGCEyH0E0ekYCiF+AnzwCSKKDIUQPwE+CAB++uMQQkhvH3yC9HNfBEI0K0iADz5B4uKYCiF+QQJ88AlitTIVQvyCBPggAIBgszEVQvxSBPjgE2TsWKZCiF+KAB98giQnMxVC/FIE+CAAgH7cOKZCyI8E+uCbIH1uO0WIpidIgA++CTJ+PFMhxD9BAnzwCTJhAlMhxC9IgA+8Ni8hfXjg2rw6oxH6iROZDOH0mDjxwXOxAED82c+YDtE8fT24L8iUKUyHUJA+HvwkiOHJJ5kO0Tx9PbgvyM9/znQIBenjAe+TToifh90nHQAM06czJKLd6dFP//cSxPiLXzAlot0B0k//9xbkl79kSkS7gvTT/70FmTmTKRHtCtJP//cSRJ+aCpEf9xINIj75JPT9nNUu9P0H0/PPMy2iOQbq+wcEMc6dy7SI9pZXA/R9r+9BAN+l35ssFl6vl2gHnQ4pDke/14d7YILoYmJgWrCAoRHtLK8WLBjw4olCf/9o/s1vmBrRDA/r9weWWADguXkT3/PPcIlGeLSxEfr09KFPEH16Ooxz5jA5ov7N+Zw5A8oxoCAAYM7LY3pE/curQfq83yUWAHju3MH3KSlMkKh7edXU9NDrwg04QfTjxsG8cCETJOqdHgsXDnrRROFh/xmTn88UiWoZSn8PuMTycyc1Fd6mJqZJVIWQkoJxt28P/nOD/UDs73/PNInqGGpfDzpBpKtX0Tx5MhMlqiL5yhWImZmjnyBiZibMr7zCRIl6NuevvDIkOYYkCABYli9nqkQ1DKefhySI6YUXYJw1i8mSqMc4axZML7wQXEEAwPLHPzJdEv3TY5h9POgmPZDmadMgXbjAlElUIj79NJLPnx/WY4Th/HDcW28xZRK1jKR/hzVBAKBl+nT01NYybRJVGHJykHTu3LAfJwzbwr/8hWmT6JseI+zbYU8QAGjNzYX7xAmmTqIC4/PPI/H48RE9VhjJg6xr1zJ1EjWMpl9HJIgpNxcxBQVMniiemIICmHJzR/z4ES2xAEC6fh3NmZmA18sqEGUiCEi+ehXiKO6/KYz0geLEibBu2MAiEOUurTZsGJUco5ogflpyctAzzC9fCAk1hmnTkBSEryOEUVv617+yGkR50yNIfTlqQczz5sFSVMSKEMVgKSqCed68oDzXqJdYACBLElqysyHV17M6JKKIWVlIungROlFUxgQBAJ0oIn7rVlaHRJz4rVuDJkfQBAEA8/z5iCsuZoVIxIgrLoZ5/vygPmdQlliBtM6ZA/epU6wWCSvG555D4smTQX/eoAvSU1+P1unTITscrBoJCzqLBYnnzsGQlRX05xaC/YSGrCyM2bOHVSNhY8yePSGRIySCAEBsfj7i3nmHlSOh33e88w5iQ3gF0KAvsQL5YdEidB85wiqSkGD+7W/xyOHDoV2+hVIQr92O1lmzINXVsZokqIhTpyLxzBkIVmtIX0cI6ZNbrbB9+CF0NhsrSoL3W91mg+3DD0MuR8gFAQBDdjZslZWsKgkatspKGLKzw/JaQjhexLxgARL272dlyahJ2L8f5jDehVkI1wvFFhQgfts2VpiMmPht2xAb5r9kFcL5YnFFRbCWl7PSZNhYy8sRF4GzxoWwv9HiYljXr2fFydB7Zv16WCN0np8QkTdcUoK4khJWngy+6igpgTWCvRLS70EGw15WBvu6dewC0v8v0g0bIn6JqYgKAgCdW7agY9UqdgPpvSHfvBlxK1dG/DgiLggAOPbuRfuyZewKAsB38qFl6VJFHIsiBAEA5+HDaHvtNcDtZodoFaMRto8+QsyiRYo5JMUIAgDus2fRlp8PT0MDm0Vj6DMyYKushHHGDEUdl6CkgzHOmIHE06dhHMWlIkkUDo7cXF/dFSaH4gQBAH1aGhKrqxHLG4dqgtjly5FYXQ19Wpoij09QanAJu3Yhfvt2dpCKid++HQm7din6GBW1B+kP1+nTaC8shHT5MjtKJYhTpmDMrl0wPfus4o9V8YIAgNzdjXsrVsC5bx+7K8qJWbIECTt3Qmc2R8XxCtFwkDqzGbaKCiRUVEAXH88ui0J08fFIqKiAraIiauSImgkSiHTjBjrefhvdVVXsuijBnJeH+HffhThhQvSJHW2C+HF88AE6Vq+GfPcuO1CpzTV2LOI3bYLljTei9z1EqyAA4GlthX3NGnTt3ctuVBixS5fCWl4OfWJidEsezYL4cVVXw15SAndNDTszwhhnzoS1tBSmuXPVMQXVIMhPy649e2AvK4P35k12apgR0tNhXbsWFpWddKoqQQBA9nrRuXEjOjdtgmy3s3ND3UBWK+JWr0ZccTF0gqC+96c2Qfx4791D5+bNcLz3HuSuLnZyEElVZ8toS5BAURzbtqFzxw5+4kUZKMiASy9JgmPnTnTt3s3TVijI0PdWmvlNIIqIKypC8qVLsB05AtPLL7P7h4jzk084QbSIdO0aug4cgLOyEp5r12jCj+gnTUJMfj5iCwogTprEJRZbwvddivPQIXRXVcHb0qK9pURSEsx5eYh59VXVfIdBQUJE99Gj6P7sM7g+/xye775T76R47DGYXnwR5pdeCuv1bimIinDX1sJ17Bhc1dVwnzwJSFL0vhlRhHHOHJjmzoVp3jwYc3JYYAoSPGSPB+6vvoK7pgbus2fR8/XX8DY3K3fZlJwMwzPPwDhjBowzZ8I4ezZ0ej0LSUHCuNH/9lv0fPMNeurqIF26BKm+HtKVK0BPT/gOwmCAOHkyxKwsiE88AcPUqTA89RTExx9ngSiIQsVpaICnoQGexkZ4bt2Cp6kJ3uZmeFtb4W1rg9zeDtnhgOx0Qna5fEs3WQZ0OkAUoTOZoIuJgc5igW7MGAg2G4TERAjJydCnpECflgb9+PHQZ2RAzMhg4BSEkPDzf2QTde2p7ldjAAAAAElFTkSuQmCC";

                this.checkData();
            }

      isEmpty(data){
        if(data==undefined||data==''||data==' ') return true;
        return false;
      }

      checkData(){
          if(this._TipoServizio==undefined) this._TipoServizio = ' ';
           if(this._Avviso==undefined) this._Avviso = ' ';
           if(this._Indirizzo==undefined) this._Indirizzo = ' ';
          
           if(this._NoteProgettuali==undefined) this._NoteProgettuali= ' ';
           if(this._NoteEsecutive==undefined) this._NoteEsecutive= ' ';
           if(this._Note==undefined) this._Note= ' ';
           
           if(this._DataRedazione==undefined) this._DataRedazione= ' ';

           if(this._CDL==undefined) this._CDL= ' ';
           if(this._GRP==undefined) this._GRP= ' ';
           if(this._tipoAvviso==undefined) this._tipoAvviso= ' ';
           if(this._datiCliente==undefined) this._datiCliente= ' ';
           if(this._codiceAppuntamento==undefined) this._codiceAppuntamento= ' ';
           if(this._appuntamento==undefined) this._appuntamento= ' ';
           if(this._provenienza==undefined) this._provenienza= ' ';

          if(this._codice_sot==undefined) this._codice_sot= ' ';
          if(this._codice_attivita ==undefined) this._codice_attivita= ' ';
          if(this._prod_servizio ==undefined) this._prod_servizio= ' ';
          if(this._codice_odl ==undefined) this._codice_odl= ' ';
          if(this._DatiTecnici == undefined) this._DatiTecnici = ' ';
      }

      getInfoCodAttivita(codice){
           let codAttDes = Params.codAttivitaDescrizione.find(
               x => x.codAttivita === codice); 
                if(codAttDes){
                    return codAttDes.label;
                }
        return "";  
      }

}