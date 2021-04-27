import { Injectable } from '@angular/core';
import { Ads,SettoreMerceologico } from './ads';

declare var util: any;
declare var imgExample;

@Injectable()
export class PreventivoPDF {

    foto_planimetria; 
    foto_altre;
    fillColor;
    header;
    header2;
    PresaFornitura;
    logoSx;
    logoDx;

    constructor() {

    }


    getPage5(value){
            if(value.dati.form.preventivo==undefined || value.dati.form.preventivo == ' ') return[];
            var datiPreventivo = [];

            
            
          /*  if(value.dati.form.preventivo.Domestico!=undefined && value.dati.form.preventivo.Domestico==true) datiPreventivo.push([{text: 'Domestico', fillColor:this.fillColor},{text:'si [ X ] no [__] '}]);
            if(value.dati.form.preventivo.Istruttoria!=undefined  && value.dati.form.preventivo.Istruttoria==true) datiPreventivo.push([{text: 'Istruttoria', fillColor:this.fillColor},{text:'si [ X ] no [__] '}]);
            if(value.dati.form.preventivo.Rifacimento!=undefined  && value.dati.form.preventivo.Rifacimento==true) datiPreventivo.push([{text: 'Rifacimento', fillColor:this.fillColor},{text:'si [ X ] no [__] '}]);
            if(value.dati.form.preventivo.Completato!=undefined  && value.dati.form.preventivo.Completato==true) datiPreventivo.push([{text: 'Completato', fillColor:this.fillColor},{text:'si [ X ] no [__] '}]);
            if(value.dati.form.preventivo.Domestico!=undefined && value.dati.form.preventivo.Domestico==false) datiPreventivo.push([{text: 'Domestico', fillColor:this.fillColor},{text:'si [__] no [ X ] '}]);
            if(value.dati.form.preventivo.Istruttoria!=undefined  && value.dati.form.preventivo.Istruttoria==false) datiPreventivo.push([{text: 'Istruttoria', fillColor:this.fillColor},{text:'si [__] no [ X ] '}]);
            if(value.dati.form.preventivo.Rifacimento!=undefined  && value.dati.form.preventivo.Rifacimento==false) datiPreventivo.push([{text: 'Rifacimento', fillColor:this.fillColor},{text:'si [__] no [ X ] '}]);
            if(value.dati.form.preventivo.Completato!=undefined  && value.dati.form.preventivo.Completato==false) datiPreventivo.push([{text: 'Completato', fillColor:this.fillColor},{text:'si [__] no [ X ] '}]);
        */    
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'A') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true], alignment:'right',text: 'per 1 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'B') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 2 a 3 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'C') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 4 a 5 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'D') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 6 a 10 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'E') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 11 a 15 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'F') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 16 a 20 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'G') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 21 a 25 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'H') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 26 a 30 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'I') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'da 31 a 35 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'L') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'oltre 35 Uleq'}]);
            if(value.dati.form.preventivo.UiEqFogna!=undefined && value.dati.form.preventivo.UiEqFogna == 'Z') datiPreventivo.push([{text: 'UiEqFogna',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text: 'Solo quota completamento'}]);
            
            if(value.dati.form.preventivo.QuotaIstruttoria!=undefined && value.dati.form.preventivo.Istruttoria == true) datiPreventivo.push([{text: 'QuotaIstruttoria',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:   util.formatNumber(value.dati.form.preventivo.QuotaIstruttoria)}]);
            if(value.dati.form.preventivo.QuotaFissa!=undefined) datiPreventivo.push([{text: 'QuotaFissa',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaFissa)}]);
            if(value.dati.form.preventivo.Attributi!=undefined) {
                for(var a =0; a<value.dati.form.preventivo.Attributi.length;a++){
                    var obj = value.dati.form.preventivo.Attributi[a];
                    if(obj.Quantita>0)
                        datiPreventivo.push([{text: (obj.Descrizione)? obj.Descrizione:obj.Nome,	 alignment:'right', fillColor:this.fillColor},{ alignment:'right',text:util.formatNumber(obj.Prezzo)},{ alignment:'center',text:util.formatIntNumber(obj.Quantita)},{alignment:'right',text:util.formatNumber(obj.Quantita * obj.Prezzo)}]);
                }
            } 

            if(value.dati.form.preventivo.TipoSpostamento==1 && value.dati.form.ads.DettaglioMerceologico!=3) value.dati.form._TipoSpostamentoLabel = 'Lavoro Interrato';
            if( value.dati.form.preventivo.TipoSpostamento==2 && value.dati.form.ads.DettaglioMerceologico!=3) value.dati.form._TipoSpostamentoLabel = 'Parte Idraulica Aerea';

          
            if(value.dati.form.preventivo.ClasseContatore!=undefined) {
                value.dati.form.preventivo._ClasseContatoreLabel = value.dati.form.preventivo.ClasseContatore;
                if(value.dati.form.preventivo.ClasseContatore=='01') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 15";
                if(value.dati.form.preventivo.ClasseContatore=='02') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 20";
                if(value.dati.form.preventivo.ClasseContatore=='03') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 25";
                if(value.dati.form.preventivo.ClasseContatore=='04') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 32";
                if(value.dati.form.preventivo.ClasseContatore=='05') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 40";
                if(value.dati.form.preventivo.ClasseContatore=='06') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 50";
                if(value.dati.form.preventivo.ClasseContatore=='07') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 65";
                if(value.dati.form.preventivo.ClasseContatore=='08') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 80";
                if(value.dati.form.preventivo.ClasseContatore=='09') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro DN 100";
                if(value.dati.form.preventivo.ClasseContatore=='10') value.dati.form.preventivo._ClasseContatoreLabel = "Contatore Calibro > DN 100"; 
               datiPreventivo.push([{text: 'ClasseContatore',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo._ClasseContatoreLabel}]);
            }
            if(value.dati.form.preventivo.Unita!=undefined)  datiPreventivo.push([{text: 'Unita',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.Unita}]);
            if(value.dati.form.preventivo.EstensioneRete!=undefined)  datiPreventivo.push([{text: 'EstensioneRete',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.EstensioneRete}]);
            if(value.dati.form.preventivo.ContrComunale!=undefined) datiPreventivo.push([{text: 'ContrComunale',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.ContrComunale)}]);
            if(value.dati.form.preventivo.AltreSpese!=undefined) datiPreventivo.push([{text: 'AltreSpese', 	 alignment:'right',fillColor:this.fillColor},{text: 'Dettaglio nel riquadro sottostante',colSpan:2, border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.AltreSpese)}]);
            if(value.dati.form.preventivo.TipoAllaccio==1) datiPreventivo.push([{text: 'TipoAllaccio',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:"Nuovo allacciamento"}]);
            else if(value.dati.form.preventivo.TipoAllaccio==2) datiPreventivo.push([{text: 'TipoAllaccio',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text:'',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:"Nuovo all. con spostamento"}]);
            if(value.dati.form.preventivo.TipoSpostamento!=undefined) datiPreventivo.push([{text: 'TipoSpostamento',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form._TipoSpostamentoLabel?value.dati.form._TipoSpostamentoLabel:' '}]);
            if(value.dati.form.preventivo.NumeroAttacchi!=undefined) datiPreventivo.push([{text: 'NumeroAttacchi', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.NumeroAttacchi}]);
            
            if(value.dati.form.preventivo.TipoInterruzione!=undefined){
                if(value.dati.form.preventivo.PresaFornitura) {
                    datiPreventivo.push([
                        {
                            text: 'Tipo Uscita Presa Impulsiva/\nFornitura e installazione',
                            alignment:'right',
                            fillColor:this.fillColor
                        },
                        {text: '', border: [false, true,false,false ]},
                        {text: '',border: [false, true,false,false	]},
                        {
                            border: [false, true,true,true],
                            alignment:'right',
                            text: value.dati.form.preventivo.TipoInterruzione
                        }
                    ])
                }
                else {
                    datiPreventivo.push([{text: 'TipoInterruzione',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.TipoInterruzione}]);
                }
            } 
            
            
            
            if(value.dati.form.preventivo.QuotaContatore!=undefined) datiPreventivo.push([{text: 'QuotaContatore',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaContatore)}]);
            if(value.dati.form.preventivo.QuotaFissaPrimoAttacco!=undefined) datiPreventivo.push([{text: 'QuotaFissa 1° attacco',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaFissaPrimoAttacco)}]);
            if(value.dati.form.preventivo.QuotaFissaNAttacchi!=undefined && value.dati.form.preventivo.NumeroAttacchi>1) 
                    datiPreventivo.push([{text: "QuotaFissa ult. "+(value.dati.form.preventivo.NumeroAttacchi -1)+" attacchi",	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{ alignment:'right',text:"CAD "+util.formatNumber(value.dati.form.preventivo.QuotaFissaNAttacchi)},{alignment:'right',text:util.formatNumber((value.dati.form.preventivo.NumeroAttacchi-1)*value.dati.form.preventivo.QuotaFissaNAttacchi)}]);

            if(value.dati.form.preventivo.DistanzaDaCabina!=undefined) datiPreventivo.push([{text: 'DistanzaDaCabina', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.DistanzaDaCabina}]);
            if(value.dati.form.preventivo.PotenzaAttuale!=undefined) datiPreventivo.push([{text: 'PotenzaAttuale',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.PotenzaAttuale}]);
            if (value.dati.form.preventivo.PotenzaContrPrevista!=undefined){
                datiPreventivo.push([{text: 'PotenzaPrevista',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.PotenzaContrPrevista}]);
                datiPreventivo.push([{text: 'DifferenzaPotenzaPrevista',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.PotenzaPrevista}]);
            }
            else if(value.dati.form.preventivo.PotenzaPrevista!=undefined) {
                datiPreventivo.push([{text: 'PotenzaPrevista',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.PotenzaPrevista}]);
            }
                
            if(value.dati.form.preventivo.QuotaOneriAmm!=undefined) datiPreventivo.push([{text: 'QuotaOneriAmm', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaOneriAmm)}]);
            if(value.dati.form.preventivo.QuotaPotenza!=undefined) datiPreventivo.push([{text: 'QuotaPotenza', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaPotenza)}]);
            if(value.dati.form.preventivo.QuotaDistanza!=undefined) datiPreventivo.push([{text: 'QuotaDistanza', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaDistanza)}]);
            if(value.dati.form.preventivo.QuotaDistanzaCalcolata!=undefined) datiPreventivo.push([{text: 'QuotaDistanzaCalcolata', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaDistanzaCalcolata)}]);
            if(value.dati.form.preventivo.Condizione!=undefined) datiPreventivo.push([{text: 'Condizione', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.Condizione}]);
            if(value.dati.form.preventivo.QuotaDistanzaDaCabina!=undefined) datiPreventivo.push([{text: 'QuotaDistanzaDaCabina', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.QuotaDistanzaDaCabina)}]);
            if(value.dati.form.preventivo.PotenzaPrevistaManuale!=undefined) datiPreventivo.push([{text: 'PotenzaPrevistaManuale',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.PotenzaPrevistaManuale}]);
            if(value.dati.form.preventivo.Cop!=undefined)  datiPreventivo.push([{text: 'Cop',	 alignment:'right', fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.Cop)}]); 
            if(value.dati.form.preventivo.Cer !=undefined && value.dati.form.preventivo.Cer > 0) datiPreventivo.push([{text: 'Cer',	 alignment:'right', fillColor:this.fillColor},{text:  value.dati.form.preventivo.NumeroCer +" X "+ (value.dati.form.preventivo.Cer / value.dati.form.preventivo.NumeroCer ), border: [false, true,false,false ]},{text: "",border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.Cer)}]);
            if(value.dati.form.preventivo.Cvv!=undefined && value.dati.form.preventivo.Cvv > 0) datiPreventivo.push([{text: 'Cvv', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.Cvv)}]);
            if(value.dati.form.preventivo.Cif!=undefined ) {
               
                datiPreventivo.push([{text: 'Cif', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,false ]},{text: '',border: [false, true,false,false	]},{border: [false, true,true,true],	 alignment:'right',text:value.dati.form.preventivo.Cif}]);
            }

            if(value.dati.form.preventivo.Totale!=undefined) datiPreventivo.push([{text: 'Totale', 	 alignment:'right',fillColor:this.fillColor},{text: '', border: [false, true,false,true ]},{text: '',border: [false, true,false,true ]},{border: [false, true,true,true],	 alignment:'right',text:util.formatNumber(value.dati.form.preventivo.Totale)}]);

         var page = [  
               this.header2, 
                { style: 'separator',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [ {text:'\n\n\n',border: [ false, false, false, false]}
                                            ]
                                    ]
                            }
                                
                },
                  {
                        style: 'header',
                        table: {
                            widths: [1,'*'],
                            body: [
                                	[{text:' ',fillColor:this.fillColor, border:[true,true,false,true]},
                                    {text: 'PREVENTIVO', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor, 	border:[false,true,true,true]}],
                            ]
                        }
                    },
                     { style: 'separator',
                     table: {
                            widths: ['*'],
                            body: [
                                	[ {text:'\n',border: [ false, false, false, false]}
                                	]
                            ]
                    }
                         
                     },
                      {
                        style: 'tableImg',
                        table: {
                            widths: [150,80,80,'*'],
                            body: 
                                datiPreventivo
                              }
                    },   
                    {
                        style: 'separator',
                        table: {
                           widths: ['*'],
                           body: [
                                   [ {text:'\n',border: [ false, false, false, false]}
                                   ]
                           ]
                        }
                    },           
                    {
                        style: 'header',
                        table: {
                            widths: ['*',1],
                            body: [
                                	[{text: 'Note Progettuali', fillColor:this.fillColor, alignment:'center',border:[true,true,false,true]},{text:'',fillColor:this.fillColor,border:[false,true,true,true]}],
                                	[{text: value.dati.form.NoteProgettuali ,rowSpan:4,border:[true,true,false,true] },{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,true]}]
                            ]
                        }
                    },
                     { 
                         style: 'separator',
                     table: {
                            widths: ['*'],
                            body: [
                                	[ {text:'\n',border: [ false, false, false, false]}
                                	]
                            ]
                    }
                         
                     },
                     
                     ];


        var separator = 
        { 
            style: 'separator',
            table: {
               widths: ['*'],
               body: [
                       [ {text:'\n',border: [ false, false, false, false]}
                       ]
               ]
            }
        };

        if(value.dati.form.preventivo.Quote){
            page.push(separator);
            page.push({                  
                style: 'header',
                table: {
                    widths: [1,'*'],
                    body: [
                            [{text:' ',fillColor:this.fillColor, border:[true,true,false,true]},
                            {text: 'DETTAGLIO QUOTE AGGIUNTIVE', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor, 	border:[false,true,true,true]}],
                    ]
                }
            })
            page.push(separator);


            var tableQuoteElements = [];


            if(value.dati.form.preventivo.Quote && value.dati.form.preventivo.Quote.quoteInfo){
                var insertTablequota = false;
                for(let quota of value.dati.form.preventivo.Quote.quoteInfo){
                    for(let quotaItem of quota.value){
                        if(quotaItem.checked) {
                            insertTablequota = true;
                            tableQuoteElements.push([{text: quota.label, fillColor:this.fillColor},{text: quotaItem.label, border: [true, true,true, true ]},{text: quotaItem.num + " X "+quotaItem.value+ "€", border: [false, true,false,true ]},{text: "Tot. "+util.formatNumber(Number(quotaItem.num) * quotaItem.value) ,border: [true, true,true,true	], alignment:'right'}]);
                        }
                    }
                }

                if( value.dati.form.preventivo.Quote.quoteInfo.altroDescrizione && value.dati.form.preventivo.Quote.quoteInfo.altroNum ){
                    insertTablequota = true;
                    tableQuoteElements.push([{text: value.dati.form.preventivo.Quote.quoteInfo.altroDescrizione, fillColor:this.fillColor},{text: '', border: [false, true,false, true ]},{text: " ", border: [false, true,false,true ]},{text:  "Tot. "+util.formatNumber(value.dati.form.preventivo.Quote.quoteInfo.altroNum) ,border: [false, true,true,true	], alignment:'right'}]);
                }
    
                var tableQuote = 	{
                    "style": "tableImg",
                    "table": {
                        "widths": [
                            150,
                            80,
                            80,
                            "*"
                        ],
                        "body": 
                            tableQuoteElements
                    }
                }

                if(insertTablequota)
                page.push(tableQuote);
            }

        }
        
        if(value.dati.form.preventivo.Deroga && value.dati.form.preventivo.Deroga.derogaInfo){
            page.push(separator);
            page.push({                  
                style: 'header',
                table: {
                    widths: [1,'*'],
                    body: [
                            [{text:' ',fillColor:this.fillColor, border:[true,true,false,true]},
                            {text: 'DETTAGLIO DEROGA', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor, 	border:[false,true,true,true]}],
                    ]
                }
            })
            page.push(separator);
            var tableDerogaElements = [];
            for(let deroga of value.dati.form.preventivo.Deroga.derogaInfo){
                if(deroga.num > 1 )
                    tableDerogaElements.push([{text: deroga.label,	 alignment:'right', fillColor:this.fillColor, border:[true, true,true,true]},{alignement:"right",text: "("+deroga.num +"-1) X "+ deroga.value +"€" , border: [true, true,false,true]},{text: '' ,border: [false, true,true,true]}, {text: "Tot. "+util.formatNumber((Number(deroga.num) -1 ) *  Number(deroga.value)) ,border: [true, true,true,true],  alignment:'right'}]);
                if(deroga.num == 1 )
                    tableDerogaElements.push([{text: deroga.label,	 alignment:'right', fillColor:this.fillColor, border:[true, true,true,true]},{alignement:"right",text: "("+deroga.num +"-1) X "+ deroga.value +"€" , border: [true, true,false,true]},{text: '' ,border: [false, true,true,true]}, {text: "Tot. 0" ,border: [true, true,true,true],  alignment:'right'}]);
          
            }
     
            if(value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.num > 0)
                tableDerogaElements.push([{text: value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.descrizione ? value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.descrizione :'',	 alignment:'right', fillColor:this.fillColor},{text: "("+value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.num+'-1) X '+ value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.value, border: [false, true,false, true ]},{text: '', border: [false, true,false,true ]},{text: "Tot. "+util.formatNumber((value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.num - 1) * value.dati.form.preventivo.Deroga.derogaInfo.itemAltro.value) ,border: [false, true,true,true	], alignment:'right'}]);
     

            var tableDeroga = 	{
				"style": "tableImg",
				"table": {
					"widths": [
						250,
						60,
						60,
						"*"
					],
					"body": 
                        tableDerogaElements
                }
            }
         }
        
         if(tableDeroga)
        page.push(tableDeroga); 

        page.push(separator);
        /*page.push(
        {
            style: 'header',
            table: {
                widths: ['*',1],
                body: [
                        [{text: 'Note Progettuali', fillColor:this.fillColor, alignment:'center',border:[true,true,false,true]},{text:'',fillColor:this.fillColor,border:[false,true,true,true]}],
                        [{text: value.dati.form.NoteProgettuali ,rowSpan:4,border:[true,true,false,true] },{text: '\n',border:[false,false,true,false]}],
                        [{text:' '},{text: '\n',border:[false,false,true,false]}],
                        [{text:' '},{text: '\n',border:[false,false,true,false]}],
                        [{text:' '},{text: '\n',border:[false,false,true,true]}]
                ]
            }
        });*/

        return page;
    }




    

    public getTesProvDomDefinition(value): Promise<any> {

/*
        for(var i=0; i < value.download.ads.foto.length; i++ )
          this.foto_salvate[i] = fileUtil.readBase64Image(value.download.ads._codice_odl,"image",value.download.ads.foto[i].name);
  */     
        var ads: Ads = value.dati.form.ads

        this.foto_planimetria = [];   
        this.foto_altre = [];
        this.fillColor = value.dati.form.fillColor;

        
        this.header = {
            style: "header",
            table: {
                widths: ["*", 100],
                body: [[{
                            image: value.dati.form.LogoSx,
                            width: 150,
                            border: [false, false, false, false]
                        }, {
                            image: value.dati.form.LogoDx,
                            margin: [-30,10],
                            width: 125,
                            border: [false, false, false, false]
                        }
                    ]]
            }
        };
        this.header2 = {
            style: "header",
            table: {
                widths: ["*", 100],
                body: [[{
                            image: value.dati.form.LogoSx,
                            width: 150,
                            border: [false, false, false, false]
                        }, {
                            image: value.dati.form.LogoDx,
                            margin: [-30,10],
                            width: 125,
                            border: [false, false, false, false]
                        }
                    ]]
            }
        };


        return new Promise((resolve, reject) => {
        
        //var pdfContent = value;

    

        var page5 = this.getPage5(value);

        var contPdf = page5;
            var docDefinition = {
                    footer: function(currentPage, pageCount) {return {	"table": {
					"widths": [30, 50, "*", 160, 30],
					"body": [[{
								"text": "",
									"border": [false, false, false, false],
							}, {
								"text": "Pag."+ currentPage.toString() ,
									"border": [false, false, false, false],
							}, {
								"border": [false, false, false, false],
								"text": ""
							}, {
								"text": "Data Redazione: "+value.dati.form.timeWrite,
								"border": [false, false, false, false],
							}, {
								"text": "",
									"border": [false, false, false, false],
							}
						]]
				}}
				
                },
                content: [                
                   contPdf
                ]
            }
            resolve(docDefinition);
            contPdf = null;
            docDefinition = null;
        });


    }                


}
