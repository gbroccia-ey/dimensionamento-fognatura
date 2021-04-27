
  

export class Caratteristiche {

    PdS;
   
    DestinazioneUso;

    AttivitaNormata;

    FatturazioneParticolare;

    TipoFontePrimaria;

    FontePrimaria;

    Lotto;

    NumeroImpianti;

    NumeroSezioni;

    PotenzaImmissioneRichiesta;

    PotenzaNominaleRichiesta;

    PotenzaRichiesta;

    PotenzaAttuale; //  TODO: agganciare in SAP

    TipoCessione;

    ServiziAusiliari;

    PotenzaImmissioneDisponibile;

    PotenzaNominaleDisponibile;

    PotenzaDisponibilePrelievo;

    TipologiaIntervento;

    TipoTaglio;

    NumeroAttacchi;

    PortataContatore;

    ClasseContatoreCee;

    TipoLavoro;

    PotenzaContrRichiesta;

    NumeroFasi;

    AllacciamentoRete;

    AllacciamentoCondMandata;

    TemperaturaCondRit;

    NumeroScambiatori;

    TipoAllaccio;
    DefinizioneLavoro;
    PressioneFornitura;
    Diametro;
    Profondita;

    GRUPresente;

    PresaImpulsiva;
    FornituraInstallazione;
    TipoInterruzione;

    static parseServerDto(caratteristiche: Caratteristiche) : Caratteristiche {
        var c = new Caratteristiche();
        c.NumeroAttacchi = caratteristiche.NumeroAttacchi;
        c.PortataContatore = caratteristiche.PortataContatore;
        c.ClasseContatoreCee = caratteristiche.ClasseContatoreCee;
        c.TipoLavoro = caratteristiche.TipoLavoro;
        if(caratteristiche.PotenzaContrRichiesta) {
            c.PotenzaContrRichiesta = +(String(caratteristiche.PotenzaContrRichiesta).replace(",","."));
        }
        //c.PotenzaContrRichiesta = caratteristiche.PotenzaContrRichiesta;

        c.NumeroFasi = caratteristiche.NumeroFasi;
        c.AllacciamentoRete = caratteristiche.AllacciamentoRete;
        c.AllacciamentoCondMandata = caratteristiche.AllacciamentoCondMandata;
        c.TemperaturaCondRit = caratteristiche.TemperaturaCondRit;
        c.NumeroScambiatori =  caratteristiche.NumeroScambiatori;
        c.TipologiaIntervento = caratteristiche.TipologiaIntervento;
        c.TipoTaglio = caratteristiche.TipoTaglio;
        c.FatturazioneParticolare = caratteristiche.FatturazioneParticolare;
        c.TipoFontePrimaria = caratteristiche.TipoFontePrimaria;
        c.FontePrimaria = caratteristiche.FontePrimaria;
        c.Lotto =  caratteristiche.Lotto;
        c.NumeroImpianti = caratteristiche.NumeroImpianti;
        c.NumeroSezioni = caratteristiche.NumeroSezioni;
        if(caratteristiche.PotenzaImmissioneRichiesta){
            c.PotenzaImmissioneRichiesta = caratteristiche.PotenzaImmissioneRichiesta.trim().replace(",",".");
        }
        
        if(caratteristiche.PotenzaNominaleRichiesta){
            c.PotenzaNominaleRichiesta = caratteristiche.PotenzaNominaleRichiesta.trim().replace(",",".");
        }

        
        if(caratteristiche.PotenzaRichiesta){
            c.PotenzaRichiesta = caratteristiche.PotenzaRichiesta.trim().replace(",",".");
        }
        
        // TODO : da confermare
        if(caratteristiche.PotenzaAttuale){
            c.PotenzaAttuale = caratteristiche.PotenzaAttuale.trim().replace(",",".");
        }
        
        c.TipoCessione = caratteristiche.TipoCessione;
        c.ServiziAusiliari = caratteristiche.ServiziAusiliari;

        if(caratteristiche.PotenzaImmissioneDisponibile){
            c.PotenzaImmissioneDisponibile = caratteristiche.PotenzaImmissioneDisponibile.trim().replace(",",".");
        }
        
        if(caratteristiche.PotenzaNominaleDisponibile){
            c.PotenzaNominaleDisponibile = caratteristiche.PotenzaNominaleDisponibile.trim().replace(",",".");
        }

        if(caratteristiche.PotenzaDisponibilePrelievo){
            c.PotenzaDisponibilePrelievo = caratteristiche.PotenzaDisponibilePrelievo.trim().replace(",",".");
        }
        

        c.AttivitaNormata = caratteristiche.AttivitaNormata;
        c.DestinazioneUso =  caratteristiche.DestinazioneUso;
        c.PdS = caratteristiche.PdS;
        c.TipoAllaccio = caratteristiche.TipoAllaccio;
        c.DefinizioneLavoro = caratteristiche.DefinizioneLavoro;
        c.PressioneFornitura = caratteristiche.PressioneFornitura;
        c.Diametro = caratteristiche.Diametro;
        c.Profondita = caratteristiche.Profondita;
        //c.DestinazioneUso = c.Destinazione;
        if(c.PortataContatore) {
            //c.PortataContatore = Utils.getFloatFromString(c.PortataContatore).toString();
            c.PortataContatore = parseFloat(c.PortataContatore.toString().replace(",","."));
            //c.PortataContatoreUnitaMisura = Utils.cutInitialFloat(c.PortataContatore);
        }
        
        c.GRUPresente =  caratteristiche.GRUPresente;

        c.PresaImpulsiva =  caratteristiche.PresaImpulsiva
        c.FornituraInstallazione =  caratteristiche.FornituraInstallazione;
        c.TipoInterruzione = caratteristiche.TipoInterruzione
        
        return c;

    }

    static toJsObject(caratteristiche: Caratteristiche): Object {
        var obj = {};
        
        obj["NumeroAttacchi"] = caratteristiche.NumeroAttacchi;
        obj["PortataContatore"] = caratteristiche.PortataContatore;
        //obj["PortataContatoreUnitaMisura"] = caratteristiche.PortataContatoreUnitaMisura;
        obj["ClasseContatoreCee"] = caratteristiche.ClasseContatoreCee;
        obj["TipoLavoro"] = caratteristiche.TipoLavoro;
        obj["DestinazioneUso"] = caratteristiche.DestinazioneUso;
        obj["PotenzaContrRichiesta"] = caratteristiche.PotenzaContrRichiesta;
        obj["NumeroFasi"] = caratteristiche.NumeroFasi;
        obj["AllacciamentoRete"] = caratteristiche.AllacciamentoRete;
        obj["AllacciamentoCondMandata"] = caratteristiche.AllacciamentoCondMandata;
        obj["TemperaturaCondRit"] = caratteristiche.TemperaturaCondRit;
        obj["NumeroScambiatori"] = caratteristiche.NumeroScambiatori;
        obj["TipologiaIntervento"] = caratteristiche.TipologiaIntervento;
        obj["TipoTaglio"] = caratteristiche.TipoTaglio;
        obj["FatturazioneParticolare"] = caratteristiche.FatturazioneParticolare;
        obj["TipoFontePrimaria"] = caratteristiche.TipoFontePrimaria;
        obj["FontePrimaria"] = caratteristiche.FontePrimaria;
        obj["Lotto"] = caratteristiche.Lotto;
        obj["NumeroImpianti"] = caratteristiche.NumeroImpianti;
        obj["NumeroSezioni"] = caratteristiche.NumeroSezioni;
        obj["PotenzaImmissioneRichiesta"] = caratteristiche.PotenzaImmissioneRichiesta;
        obj["PotenzaNominaleRichiesta"] = caratteristiche.PotenzaNominaleRichiesta;
        obj["PotenzaAttuale"] = caratteristiche.PotenzaAttuale; // TODO : da confermare
        obj["PotenzaRichiesta"] = caratteristiche.PotenzaRichiesta;
        obj["TipoCessione"] = caratteristiche.TipoCessione;
        obj["ServiziAusiliari"] = caratteristiche.ServiziAusiliari;
        obj["PotenzaImmissioneDisponibile"] = caratteristiche.PotenzaImmissioneDisponibile;
        obj["PotenzaNominaleDisponibile"] = caratteristiche.PotenzaNominaleDisponibile;
        obj["PotenzaDisponibilePrelievo"] = caratteristiche.PotenzaDisponibilePrelievo;
        obj["AttivitaNormata"] = caratteristiche.AttivitaNormata;
        obj["PdS"] = caratteristiche.PdS;
        obj["TipoAllaccio"] = caratteristiche.TipoAllaccio;
        obj["DefinizioneLavoro"] = caratteristiche.DefinizioneLavoro;
        obj["PressioneFornitura"] = caratteristiche.PressioneFornitura;
        obj["Diametro"] = caratteristiche.Diametro;
        obj["Profondita"] = caratteristiche.Profondita;
        obj["GRUPresente"] = caratteristiche.GRUPresente;
        obj["PresaImpulsiva"] = caratteristiche.PresaImpulsiva;
        obj["FornituraInstallazione"] = caratteristiche.FornituraInstallazione;
        obj["TipoInterruzione"] = caratteristiche.TipoInterruzione;
        return obj;
    }
}