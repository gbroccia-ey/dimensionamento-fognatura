import {Ads, DettaglioMerceologico, SettoreMerceologico} from './ads';

export class NotePlaceholder {
    name:string;
    type:string;
    value?: any;
}

export class NoteItem {
    text: string;
    placeholders : NotePlaceholder[]; 
    checked? : boolean;
    value?:string;
}

export class NotaSopralluogo{

    static _note_AAA_ACQUA: NoteItem[] = [
        {
            text : "L’allacciamento relativo al presente preventivo è stato dimensionato per una portata massima di {MAX_PORTATA} l/s per ciascuna utenza e prevede la posa di {NUM_CONTATORI} contatori calibro {CALIBRO_CONTATORI} mm.",
            placeholders : [
                { name:"MAX_PORTATA", type:"number" },
                { name:"NUM_CONTATORI", type:"number" },
                { name:"CALIBRO_CONTATORI", type:"string" },
            ],
            checked : false,
            value: ""
        },
        {
            text : "In condizioni normali di esercizio, si comunica che il valore di pressione al punto di consegna è pari a circa {PRESSIONE_CONSEGNA} bar ed è quindi indispensabile l’installazione di un riduttore di pressione tarato a {RIDUTT_MBAR} bar.",
            placeholders : [
                { name:"PRESSIONE_CONSEGNA", type:"number" },
                { name:"RIDUTT_MBAR", type:"number" }
            ],
            checked : false,
            value: ""
        },
        {
            text : "Si richiama altresì l'attenzione sul fatto che il valore minimo di pressione garantito dalla  ns. Società al punto di consegna, in accordo con la Carta dei Servizi e le norme di legge, è quello tale da assicurare un carico idraulico di 5 m, misurato al punto di consegna, relativo al solaio di copertura del piano abitabile più elevato.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Nel caso sia stata concordata l’installazione di contatori interni all’edificio, il richiedente dovrà far eseguire a propria cura e spese tutte le opere edili indicate dalla scrivente e gli eventuali spostamenti degli impianti tecnologici esistenti per consentire la posa in opera dell’entrata stradale, dell’impianto interno di trasporto e della batteria misuratori in conformità alla norma UNI 9182, In caso di installazione di contatori interni all’edificio, la costruzione degli impianti dal punto di consegna al misuratore sarà a cura e spese del richiedente e dovrà essere eseguita da un installatore abilitato ai sensi dell'art. 2 della Legge n° 46/1990 ovvero dell’art. 3 del D.M. 37/2008. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il locale/nicchia contatori, dovrà essere munito di chiusura a chiave quadra da 8 mm oppure chiave YALE n°12 grande, n°12 piccola o n°21.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Dovrà essere prevista l'installazione di contatori privati in ogni singola unità abitativa, nonché di contatori differenziati per le attività produttive e del settore terziario esercitate nel contesto urbano, come prescritto dalla Legge 5 gennaio 1994, n° 36.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "In tutti i casi è a cura e spese del richiedente la costruzione di gli impianti a valle del contatore.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "L'eventuale accesso all'interno dell'area di cantiere da parte di personale addetto ai lavori, dovrà essere preventivamente richiesto e conseguentemente autorizzato dalla ditta esecutrice degli scavi ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura del richiedente il ripristino della segnaletica stradale e/o della recinzione dello scavo che, a seguito di interventi edili eseguiti a propria cura, dovesse essere stata eventualmente rimossa.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Per impianti o parti di impianto con pericolo di reflusso di acqua inquinata ( uso antincendio – uso agricolo uso industriale il richiedente dovrà provvedere all’installazione di un disconnettore idraulico o di un organo antinquinamento scelto sulla base dei criteri imposti dalla norma UNI En 1717/2002.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Nel caso sia prevista l’installazione di contatori interni all’edificio, la costruzione dell’impianto stradale terminerà con un apposita flangia/ raccordo posto a circa 80 cm dalla proprietà o dall’edificio. che rappresenterà il punto di consegna dell’AcegasApsAmga. Nel caso sarà a cura della scrivente la fornitura dei kit di montaggio dei contatori previsti ( valvole , eventuali filtri, codoli o flangie e relativi campi distanziatori.). ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Nel caso gli scavi vengano eseguiti in proprietà private, il richiedente dovrà ottenere dai proprietari dei terreni o altri aventi titolo sugli stessi tutte le autorizzazioni necessarie all’esecuzione dello scavo ed alla posa della derivazione ed acquisire tutte le informazioni sui sottoservizi esistenti presso i rispettivi gestori, mantenendo indenne l’ACEGASAPSAMGA SpA da qualsiasi responsabilità ed onere.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Per terreni catastalmente adibiti a pascolo o ad uso boschivo o in zone di vincolo paesaggistico e/o idrogeologico è indispensabile l'ottenimento di un nullaosta alla fornitura idrica da parte dell'Ispettorato Ripartimentale delle Foreste, mediante presentazione di una dichiarazione ai sensi dell'art.31 del D.P.R. n°032/Pres./2003. ",
            placeholders : [],
            checked : false,
            value: ""
        },{
            text : "Durante l'esecuzione delle opere inerenti il presente preventivo, l'area di cantiere dove operano gli incaricati ACEGASAPSAMGA o suoi subappaltatori non dovranno essere contemporaneamente oggetto di attività da parte di imprese terze. Al mancare delle condizioni menzionate ACEGASAPSAMGA non avvierà o sospenderà immediatamente le attività di competenza.",
            placeholders : [],
            checked : false,
            value: ""
        },
    ];
    static _note_AAA_FOGNATURA: NoteItem[] = [
        {
            text : "La quota di ricevimento dei reflui fognari è normalmente compresa tra 50 e 70 cm sotto il livello del finito stradale. Si evidenzia che la stessa non può essere garantita fino all’esecuzione dell’allaccio.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "   La mera esecuzione dell’allaccio di fognatura non presuppone automaticamente ad un autorizzazione allo scarico nè alcuna validazione degli schemi progettuali eventualmente consegnati ad AcegasApsAmga.",
            placeholders : [],
            checked : false,
            value: ""
        },
    ];

    static _note_AAA_GAS: NoteItem[] = [
        {
            text : "Il locale/nicchia contatori, dovrà essere munito di chiusura a chiave quadra da 8 mm oppure chiave YALE n°12 grande, n°12 piccola o n°21.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "In tutti i casi è a cura e spese del richiedente la costruzione di gli impianti a valle del contatore.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "L'eventuale accesso all'interno dell'area di cantiere da parte di personale addetto ai lavori, dovrà essere preventivamente richiesto e conseguentemente autorizzato dalla ditta esecutrice degli scavi ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura del richiedente il ripristino della segnaletica stradale e/o della recinzione dello scavo che, a seguito di interventi edili eseguiti a propria cura, dovesse essere stata eventualmente rimossa.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Nel caso gli scavi vengano eseguiti in proprietà private, il richiedente dovrà ottenere dai proprietari dei terreni o altri aventi titolo sugli stessi tutte le autorizzazioni necessarie all’esecuzione dello scavo ed alla posa della derivazione ed acquisire tutte le informazioni sui sottoservizi esistenti presso i rispettivi gestori, mantenendo indenne l’ACEGASAPSAMGA SpA da qualsiasi responsabilità ed onere. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Durante l'esecuzione delle opere inerenti il presente preventivo, l'area di cantiere dove operano gli incaricati ACEGASAPSAMGA o suoi subappaltatori non dovranno essere contemporaneamente oggetto di attività da parte di imprese terze. Al mancare delle condizioni menzionate ACEGASAPSAMGA non avvierà o sospenderà immediatamente le attività di competenza.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Per gli scavi in strada comunale, la ditta installatrice avrà 5 giorni di tempo per ultimare tutte le opere di competenza. Trascorso tale periodo, la scrivente sarà autorizzata a rinterrare lo scavo stesso cosicché ogni ulteriore intervento verrà addebitato al richiedente.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura AcegasApsAmga la fornitura e posa in opera del riduttore di pressione a monte del contatore.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il richiedente dovrà far eseguire a propria cura e spese tutte le opere edili indicate dalla scrivente e gli eventuali spostamenti degli impianti tecnologici esistenti per consentire la posa in opera dell’entrata stradale, dell’impianto interno di trasporto e della batteria misuratori in conformità alle norme UNI CIG 9860 e 9036.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura dell’utente far ricollegare l'impianto interno di trasporto (colonna montante) e predisposizione del campo contatore nella posizione concordata in sede di sopralluogo. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "In riferimento al D.M. 37/2008 art.5 comma 2 lettera d  si ricorda che a tutela del progettista o dell’installatore, nel caso risulti necessaria l’installazione di impianti elettrici all’interno o in prossimità di vani contatori gas  è a propria tutela e a tutela dei futuri utilizzatori, obbligatoria una valutazione  riguardo al tipo  di costruzione della apparecchiature  e dell’impianto di collegamento  elettrico . Si consiglia a titolo informativo  l’applicazione della norma CEI EN 60079-14 e per l’eventuale valutazione del tipo di zona pericolosa la norma CEI-EN 60079-10.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A seguito dell'applicazione delle attuali normative e delle disposizioni dell'ARERA, non è ammesso:\n -estendere gli impianti di trasporto all'interno dell'edificio\n -Manomettere le giunzioni filettate sugli impianti esistenti. \n Nel caso di manomissione è necessaria la prova di tenuta di tutto l'impianto condominale alla pressione di collaudo (1000 mm c.a.). Sarà ammessa la manomissione di un solo filetto nel punto di giunzione tra l'impianto vecchio e il tratto di impianto nuovo. Nello stesso punto dovrà essere inserita una saracinesca di sezionamento per la prova di tenuta nel nuovo tratto di impianto. La giunzione manomessa andrà verificata con soluzione schiumosa.",
            placeholders : [],
            checked : false,
            value: ""
        },
    ];

    static _note_AAA_EE: NoteItem[] = [
        {
            text : "Il presente allacciamento verrà eseguito su un sistema di distribuzione concatenato tensione di fase di 220 V (a triangolo, 3 cavi). Quindi per garantire la tensione di 220 V la linea di alimentazione del contatore verrà collegata su 2 fasi.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il presente allacciamento verrà eseguito su un sistema di distribuzione concatenato tensione di fase di 220 V (a triangolo, 3 cavi) . La fornitura trifase quindi potrà avvenire solo con tensione di alimentazione 220 V.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura e spese del richiedente tutte le opere edili e la posa di {NUM_CORRUGATI} corrugato/i in pvc DN{DN_CORRUGATI} con filo guida, da posizionare in traccia sotto malta dalla cassetta valvole alla posizione del contatore concordata.",
            placeholders : [
                { name:"NUM_CORRUGATI", type:"number" },
                { name:"DN_CORRUGATI", type:"string" }
            ],
            checked : false,
            value: ""
        },
        {
            text : "A cura e spese del richiedente tutte le opere di scavo rinterro e ripristino e posa di {NUM_CORRUGATI} corrugato/i in pvc DN{DN_CORRUGATI} con filo guida, da posizionare in sede stradale /terreno/marciapiede dalla cassetta del contatore predisposta al limite della proprietà pubblica o alla base del palo sostegno Acegas  ( n° {COD_PALO}) come da indicazioni in fase di sopralluogo.",
            placeholders : [
                { name:"NUM_CORRUGATI", type:"number" },
                { name:"DN_CORRUGATI", type:"string" },
                { name:"COD_PALO", type:"string" }
            ],
            checked : false,
            value: ""
        },
        {
            text : "A cura AcegasApsAmga  la fattibilità degli interventi le verifiche di rete. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura del cliente la predisposizione, lo sgombero da apparecchiature private, o l'adeguamento delle dimensioni dell'alloggiamento per l'installazione del nuovo contatore.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "A cura AcegasApsAmga la posa del contatore nell'alloggiamento predisposto ",
            placeholders : [],
            checked : false,
            value: ""
        },
        
    ];

    static _note_INRETE_GAS: NoteItem[] = [
        {
            text : "Informato il cliente che il punto di consegna dell'allacciamento richiesto non è ubicato in luogo dove già esistono le condotte e quindi si procede rispondere negativamente alla richiesta di accesso alla rete. Il cliente dichiara di NON essere interessato a ricevere un preventivo di estensione e/o potenziamento della rete e di rinunciare quindi espressamente a ricevere tale preventivo.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che dovrà presentare una  nuova richiesta al Venditore. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che la sua richiesta non è fattibile perché è in contrasto con norme e regolamenti vigenti.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Sulla base di quanto emerso durante il sopralluogo la prestazione richiesta non risulta necessaria. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente  si dichiara non più  interessato al lavoro richiesto e di rinunciare  quindi espressamente a ricevere il relativo preventivo.  ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che prima di accettare il preventivo dovrà ottenere il benestare del condominio per le parti comuni e/o di terzi per altre proprietà affinchè INRETE DISTRIBUZIONE ENERGIA sia autorizzata ad eseguire le opere richieste.  ",
            placeholders : [],
            checked : false,
            value: ""
        },
        
        
    ];
    
    static _note_HERA_ACQUA: NoteItem[] = [
        {
            text : "Informato il cliente che il punto di consegna dell'allacciamento richiesto non è ubicato in luogo dove già esistono le condotte e quindi si procede rispondere negativamente alla richiesta di accesso alla rete. Il cliente dichiara di NON essere interessato a ricevere un preventivo di estensione e/o potenziamento della rete e di rinunciare quindi espressamente a ricevere tale preventivo.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che dovrà presentare una  nuova richiesta ad HERA SPA. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che la sua richiesta non è fattibile perché è in contrasto con norme e regolamenti vigenti.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : " Il cliente è stato informato che la sua richiesta di avere un contatore acqua condominiale è in contrasto con norme e regolamenti vigenti.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Sulla base di quanto emerso durante il sopralluogo la prestazione richiesta non risulta necessaria. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che dovrà installare un riduttore di pressione. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che dovrà installare una autoclave. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente  si dichiara non più interessato al lavoro richiesto e di rinunciare  quindi espressamente a ricevere il relativo preventivo.  ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che prima di accettare il preventivo dovrà ottenere il benestare del condominio per le parti comuni e/o di terzi per altre proprietà affinchè HERA SPA sia autorizzata ad eseguire le opere richieste.  ",
            placeholders : [],
            checked : false,
            value: ""
        },
        
    ];

    static _note_HERA_FOGNATURA: NoteItem[] = [
        {
            text : "Il cliente è stato informato che dovrà presentare una  nuova richiesta ad HERA SPA. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Il cliente è stato informato che la sua richiesta non è fattibile perché è in contrasto con norme e regolamenti vigenti.",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Sulla base di quanto emerso durante il sopralluogo la prestazione richiesta non risulta necessaria. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        {
            text : "Nel caso la quota di scorrimento della rete privata realizzata dal cliente al punto di conferimento sia inferiore alla quota di scorrimento della rete fognaria sarà cura e onere del cliente provvedere a un sistema di sollevamento dei reflui. ",
            placeholders : [],
            checked : false,
            value: ""
        },
        
    ];

    static _note_HERATECH_ACQUA:  NoteItem[] = NotaSopralluogo._note_HERA_ACQUA;
    static _note_HERATECH_FOGNATURA:  NoteItem[] = NotaSopralluogo._note_HERA_FOGNATURA;


    static getNotes(ads:Ads): NoteItem[]{
        // TODO: fetch by ads
        let res = [],name;

        if (ads.SettoreMerceologico === SettoreMerceologico.ACQUA && ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA){
            name = "_note_"+ads.CodiceSocieta+"_FOGNATURA"
        }
        else {
            name = "_note_"+ads.CodiceSocieta+"_"+ads.NomeSettore
        }
            


        if (NotaSopralluogo[name] !== undefined)
            res = NotaSopralluogo[name];

        // Clone array
        return JSON.parse(JSON.stringify(res));
    }

    static interpolateNoteText(note:NoteItem, strong?: boolean){
        let res = note.text;
        for (let placeholder of note.placeholders){
          if (placeholder.value?.length > 0){

            res = (strong)? res.replace(`{${placeholder.name}}`,`<strong>${placeholder.value}</strong>`) :
                            res.replace(`{${placeholder.name}}`,placeholder.value);
          }
        }
        return res;
      }
};