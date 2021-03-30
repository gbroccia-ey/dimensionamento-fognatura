import { Injectable } from '@angular/core';
import { DecimalPipe} from '@angular/common';
import { SettoreMerceologico,DettaglioMerceologico } from './ads';
import { Utils } from '../utils/utils';
import { DimensionamentoAllacciFognatura, ParametriAcqueNere, DIMFOGNA_MSG } from './dimensionamento-allacci';


declare var util: any;
declare var imgExample;

@Injectable()
export class ModelFT {

    foto_planimetria; 
    foto_altre;
    fillColor;
    header;
    header2;

    constructor(private _decimalPipe : DecimalPipe) {

    }

    getFotoLayout(foto,page){
                var fotoLayout1 =  [
                     { style: 'image',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [460, 480],image:foto[0].base64}
                                    
                                           ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [{text:'Nome file:'+foto[0].name+'\nTag (descrizione):'+foto[0].tag,border:[true,false,true,true]}]
                                    ]
                            }
                                
                }
                ];

                var fotoLayout2 = [];
                if(foto.length>1)
                fotoLayout2 = [
                   { style: 'image',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [400, 240],image:foto[0].base64}
                                    
                                           ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [{text:'Nome file:'+foto[0].name+'\nTag (descrizione):'+foto[0].tag,border:[true,false,true,true]}]
                                    ]
                            }
                                
                }, { style: 'image',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [400, 240],image:foto[1].base64}
                                            ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*'],
                                    body: [
                                            [{text:'Nome file:'+foto[1].name+'\nTag (descrizione):'+foto[1].tag,border:[true,false,true,true]}]
                                    ]
                            }
                                
                }
                ]


                var fotoLayout4 = [];
                if(foto.length>2)
                fotoLayout4 = [
               
                      { style: 'image',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [245, 220],image:foto[0].base64}
                                            ,{border:[true,true,true,false],alignment:'center',fit: [245, 220],image:foto[1].base64}
                                            ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [{  fontSize:9,text:'Nome:'+foto[0].name+'\nTag (descrizione):'+foto[0].tag,border:[true,false,true,true]},{  fontSize:9,border:[true,false,true,true],text:'Nome:'+foto[1].name+'\nTag (descrizione):'+foto[1].tag}]
                                    ]
                            }
                                
                },{ style: 'image',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [245, 220],image:foto[2].base64}
                                            ,{border:[true,true,true,false],alignment:'center',fit: [245, 220],image:foto[3].base64}
                                            ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [{  fontSize:9,text:'Nome:'+foto[2].name+'\nTag (descrizione):'+foto[2].tag,border:[true,false,true,true]},{  fontSize:9,border:[true,false,true,true],text:'Nome:'+foto[3].name+'\nTag (descrizione):'+foto[3].tag}]
                                    ]
                            }
                                
                }

                ]


                var fotoLayout6 = [];
                if(foto.length>4)
                fotoLayout6 = [
                    { style: 'image',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [245, 130],image:foto[0].base64}
                                            ,{border:[true,true,true,false],alignment:'center',fit: [245, 130],image:foto[1].base64}
                                            ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [{  fontSize:9,text:'Nome:'+foto[0].name+'\nTag (descrizione):'+foto[0].tag,border:[true,false,true,true]},{  fontSize:9,border:[true,false,true,true],text:'Nome:'+foto[1].name+'\nTag (descrizione):'+foto[1].tag}]
                                    ]
                            }
                                
                },{ style: 'image',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [245, 130],image:foto[2].base64}
                                            ,{border:[true,true,true,false],alignment:'center',fit: [245, 130],image: foto[3].base64}
                                            ]
                                    ]
                            }
                                
                },{ style: 'text',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [{  fontSize:9,text:'Nome:'+foto[2].name+'\nTag (descrizione):'+foto[2].tag,border:[true,false,true,true]},{  fontSize:9,border:[true,false,true,true],text:'Nome:'+foto[3].name+'\nTag (descrizione):'+foto[3].tag}]
                                    ]
                            }
                                
                },{ style: 'image',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [ {border:[true,true,true,false],alignment:'center',fit: [245, 130],image:foto[4].base64}
                                            ,{border:[true,true,true,false],alignment:'center',fit: [245, 130],image:foto[5].base64}
                                            ]
                                    ]
                            }
                                
                },
                { style: 'text',
                            table: {
                                    widths: ['*','*'],
                                    body: [
                                            [{  fontSize:9,text:'Nome:'+foto[4].name+'\nTag (descrizione):'+foto[4].tag,border:[true,false,true,true]},{  fontSize:9,border:[true,false,true,true],text:'Nome:'+foto[5].name+'\nTag (descrizione):'+foto[5].tag}]
                                    ]
                            }
                                
                }
                ];

              var numFoto = foto.length;
                if(numFoto==1){
                    page.push(fotoLayout1[0]);
                    page.push(fotoLayout1[1]);
                }
                if(numFoto==2){
                    page.push(fotoLayout2[0]);
                    page.push(fotoLayout2[1]);
                    page.push(fotoLayout2[2]);
                    page.push(fotoLayout2[3]);
                }
                if(numFoto==3 || numFoto==4){
                    page.push(fotoLayout4[0]);
                    page.push(fotoLayout4[1]);
                    page.push(fotoLayout4[2]);
                    page.push(fotoLayout4[3]);
                }
                 if(numFoto==5 || numFoto==6){
                    page.push(fotoLayout6[0]);
                    page.push(fotoLayout6[1]);
                    page.push(fotoLayout6[2]);
                    page.push(fotoLayout6[3]);
                    page.push(fotoLayout6[4]);
                    page.push(fotoLayout6[5]);
                }
                
}

    //dimensionamento allacci
    getPage6(value) {
        let dimAllacci: any;
        let isDimensionamentoAllacciGas: boolean = false;
        let isDimensionamentoAllacciAcqua: boolean = false;
        let isDimensionamentoAllacciFognatura: boolean = false;
        let isDimensionamentoAllacciEE: boolean = false;

        if(value.dati.form._ads.SettoreMerceologico === SettoreMerceologico.GAS && value.dati.form._ads.DimensionamentoSaved){
            dimAllacci = value.dati.form._ads.DimensionamentoAllacciGas;
            isDimensionamentoAllacciGas = true;
        }else if(value.dati.form._ads.SettoreMerceologico === SettoreMerceologico.ACQUA && value.dati.form._ads.DimensionamentoSaved){
            if (value.dati.form._ads.DettaglioMerceologico === DettaglioMerceologico.FOGNATURA){
                dimAllacci = value.dati.form._ads.DimensionamentoAllacciFognatura;
                isDimensionamentoAllacciFognatura = true;    
            }
            else {
                dimAllacci = value.dati.form._ads.DimensionamentoAllacciAcqua;
                isDimensionamentoAllacciAcqua = true;    
            }
        } else if(value.dati.form._ads.SettoreMerceologico === SettoreMerceologico.ENERGIA_ELETTRICA && value.dati.form._ads.DimensionamentoSaved){
            dimAllacci = value.dati.form._ads.DimensionamentoAllacciEE;
            isDimensionamentoAllacciEE = true;
        }

        console.log(dimAllacci)

        if(!dimAllacci) {
            return null;
        }

        else if(isDimensionamentoAllacciGas){
            let dataList = [];
            dataList.push([{text: 'OdL', fillColor:this.fillColor},{text: value.dati.form._codice_odl}]);
            dataList.push([{text: 'Comune', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.Citta}]);
            dataList.push([{text: 'Indirizzo', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.toString()}]);
            let clienteTxt: string = (value.dati.form._ads.Cliente.CodiceCliente ?  value.dati.form._ads.Cliente.CodiceCliente : "") + " " +
                             (value.dati.form._ads.Cliente.Cognome ? value.dati.form._ads.Cliente.Cognome : "") + " " + 
                             (value.dati.form._ads.Cliente.Nome ? value.dati.form._ads.Cliente.Nome : " ");
            dataList.push([{text: 'Cliente', fillColor:this.fillColor},{text: clienteTxt}]);
    
            let dimensionamentoList = [];
            dimensionamentoList.push([{text: 'Tipo rete', fillColor:this.fillColor},
                                {text: dimAllacci.TipoRete}]);
            dimensionamentoList.push([{text: 'Rete stradale', fillColor:this.fillColor},{text: ""+dimAllacci.ReteStradale}]);
            dimensionamentoList.push([{text: 'Materiale allaccio', fillColor:this.fillColor},{text: ""+dimAllacci.MaterialeAllaccio}]);
            dimensionamentoList.push([{text: 'Lunghezza tubazione', fillColor:this.fillColor},{text: ""+dimAllacci.LunghezzaTubazione}]);
            
            let richiesteNonDomestiche = []; 
            richiesteNonDomestiche.push(
                [
                    { text: 'Classe > G4 o non domestico', fillColor:this.fillColor }, 
                    { text: 'Numero', fillColor:this.fillColor}, 
                    { text: 'Portata (Smc/h)', fillColor:this.fillColor }
                ],        
            );
            if(dimAllacci.RichiesteNonDomestiche && dimAllacci.RichiesteNonDomestiche.length === 0) {
                richiesteNonDomestiche.push([
                   " ","",""
                ]);
            }
            for(var i = 0; i < dimAllacci.RichiesteNonDomestiche.length; i++) {
                richiesteNonDomestiche.push([
                    "Classe contatore: " + dimAllacci.RichiesteNonDomestiche[i].classeContatore,
                    ""+dimAllacci.RichiesteNonDomestiche[i].numero,
                    ""+util.formatNumber(dimAllacci.RichiesteNonDomestiche[i].portata)
                ]);
            }
            
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
                                     {text: 'CALCOLO DIMENSIONALE', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor, 	border:[false,true,true,true]}],
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
                        style: 'header',
                        table: {
                            widths: [1,'*'],
                            body: [
                                    [{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'Dati Progetto', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                             widths: [150,'*'],
                             body: 
                                dataList
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
                        style: 'header',
                        table: {
                            widths: [1,'*'],
                            body: [
                                    [{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'Dimensionamento allaccio gas', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                            widths: [150,'*'],
                            body: 
                               dimensionamentoList
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
                        columns: [
                            
                                
                                {
                                    width: 350,
                                    headerRows: 1,
                                    style: 'tableExample',
                                    table: {
                                        body: [
                                            [
                                                { text: 'Richieste uso domestico', fillColor:this.fillColor }, 
                                                { text: 'Numero', fillColor:this.fillColor}, 
                                                { text: 'Portata (Smc/h)', fillColor:this.fillColor }
                                            ],                                        
                                            ['Classe contatore: ' + dimAllacci.ClasseContatoreDomestico, 
                                            ""+dimAllacci.NumeroContatoriUsoDomestico, 
                                            ""+util.formatNumber(dimAllacci.PortataDomestico)]
                                        ]
                                    }
                                },
                            
                            {
                                    fontSize: 9.5,
                                    headerRows: 1,
                                    width: '*',
                                    table: {
                                        body: [
                                            [{ text: 'PORTATA TOTALE USO DOMESTICO', fillColor:this.fillColor }],
                                            [dimAllacci.PortataTotaleDomestico ? util.formatNumber(dimAllacci.PortataTotaleDomestico) : 0]
                                        ]
                                    }
                            },
            
                        ]
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
                        columns: [
                                {
                                    width: 350,
                                    style: 'tableExample',
                                    headerRows: 1,
                                    table: {
                                        body: richiesteNonDomestiche
                                    }
                                },
                            
                            {
                                    fontSize: 9.5,
                                    width: '*',
                                    table: {
                                        body: [
                                            [{ text: 'PORTATA TOTALE ALTRI USI', fillColor:this.fillColor }],
                                            [dimAllacci.PortataTotaleAltriUsi ? util.formatNumber(dimAllacci.PortataTotaleAltriUsi) : 0],
                                            [{ text: 'PORTATA TOTALE ALLACCIAMENTO', fillColor:this.fillColor }],
                                            [dimAllacci.PortataTotaleAllacciamento ? util.formatNumber(dimAllacci.PortataTotaleAllacciamento) : 0]
                                        ]
                                    }
                            },
            
                        ]
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
				    style: "tableImg",
				    table: {
					    widths: ['50%', '50%'],
							body: [[{
                                        text: ((dimAllacci && dimAllacci.Risultato && dimAllacci.Risultato.materiale) ?  dimAllacci.Risultato.materiale : '') +'\n'+ 
                                        (dimAllacci && dimAllacci.Risultato && dimAllacci.Risultato.text ? String(dimAllacci.Risultato.text).toUpperCase() : ""),
                                        fillColor: "#ead383",
										alignment: "center",
                                        bold: true,
										fontSize: 12.5,
										border: [true, true, true, true]
									},{
                                        text: (dimAllacci && dimAllacci.Risultato && dimAllacci.Risultato.warning) ? dimAllacci.Risultato.warning : '',
										fillColor: "#ead383",
										alignment: "center",
                                        fontSize: 9,
										border: [true, true, true, true]
                                    }
								]]
						}
					
				
			}



                      
                      
                      ];
    
         return page;
        }

        else if(isDimensionamentoAllacciAcqua) {
            let dataList = [];
            dataList.push([{text: 'OdL', fillColor:this.fillColor},{text: value.dati.form._codice_odl}]);
           // dataList.push([{text: 'Comune', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.Citta}]);
            dataList.push([{text: 'Indirizzo', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.toString()}]);
            let clienteTxt: string = (value.dati.form._ads.Cliente.CodiceCliente ?  value.dati.form._ads.Cliente.CodiceCliente : "") + " " +
                             (value.dati.form._ads.Cliente.Cognome ? value.dati.form._ads.Cliente.Cognome : "") + " " + 
                             (value.dati.form._ads.Cliente.Nome ? value.dati.form._ads.Cliente.Nome : " ");

            if ( (clienteTxt == "   ") && value.dati.form._ads.Cliente.RagioneSociale) {
                clienteTxt = value.dati.form._ads.Cliente.RagioneSociale;
            }
            dataList.push([{text: 'Cliente', fillColor:this.fillColor},{text: clienteTxt}]);
    
            let dimensionamentoList = [];
            
            dimensionamentoList.push([{text: 'Tubazione stradale', fillColor:this.fillColor},{text: dimAllacci.ReteStradale}]);
            dimensionamentoList.push([{text: 'Pressione di rete [bar]', fillColor:this.fillColor},{text: dimAllacci.PressioneRete}]);
            dimensionamentoList.push([{text: 'Lunghezza allacciamento [m]', fillColor:this.fillColor},{text: dimAllacci.LunghezzaAllacciamento}]);
            dimensionamentoList.push([{text: 'Numero perdite di carico concentrate (curve, tee,..)', fillColor:this.fillColor},{text: dimAllacci.NumeroPerdite}]);
            
            let richiesteTipoA = [];
            if(dimAllacci.UnitaSingola && dimAllacci.UnitaSingola.numero > 0)
            richiesteTipoA.push(
                [
                    { text: '', fillColor:this.fillColor }, 
                    { text: 'Numero contatori', fillColor:this.fillColor}, 
                    { text: 'Tipo di contatore', fillColor:this.fillColor }
                ],  [
                    { text: '"A" Contatore per unità abitativa singola' }, 
                    { text: ""+dimAllacci.UnitaSingola.numero}, 
                    { text: ""+dimAllacci.UnitaSingola.tipoContatore }
          
                ]      
            );
            if(dimAllacci.UnitaDeroga && dimAllacci.UnitaDeroga.numero > 0)
            richiesteTipoA.push(
                [
                    { text: '', fillColor:this.fillColor }, 
                    { fontsize:8,text: 'Numero unità abitative civili singole servite', fillColor:this.fillColor}, 
                    { text: 'Tipo di contatore', fillColor:this.fillColor }
                ],   
                [
                    { fontSize:8, text: '"A" Contatore condominiale per unità abitative (in deroga)' }, 
                    { text: ""+dimAllacci.UnitaDeroga.numero}, 
                    { text: ""+dimAllacci.UnitaDeroga.tipoContatore }
          
                ]        
            );


            if(dimAllacci && dimAllacci.UnitaSingola && dimAllacci.UnitaDeroga && dimAllacci.UnitaSingola.numero <1 &&  dimAllacci.UnitaDeroga.numero<1){

             richiesteTipoA.push(
                [
                    { text: '', fillColor:this.fillColor }, 
                    { text: 'Numero contatori', fillColor:this.fillColor}, 
                    { text: 'Tipo di contatore', fillColor:this.fillColor }
                ])
            }


            let richiesteUsoAntincendio = [];
            richiesteUsoAntincendio.push(
                [
                    { fontSize:10, text: '', fillColor:this.fillColor }, 
                    { fontSize:8,text: 'N. contatori', fillColor:this.fillColor}, 
                    { fontSize:10,text: 'Portata [l/s]', fillColor:this.fillColor },
                    { fontSize:10,text: 'Portata [mc/h]', fillColor:this.fillColor },
                    { fontSize:10,text: 'Tipo di contatore', fillColor:this.fillColor }
                ],        
            );

            if(dimAllacci.ContatoriAntincendio && dimAllacci.ContatoriAntincendio.length === 0 ){
                richiesteUsoAntincendio.push([
                    " ","","","",""
                ]);
            }

            for(var i = 0; i < dimAllacci.ContatoriAntincendio.length; i++) {
                if(dimAllacci.ContatoriAntincendio[i].numero>0)
                richiesteUsoAntincendio.push([
                  '"B" Contatore per antincendio', 
                  "" + dimAllacci.ContatoriAntincendio[i].numero, 
                  "" + dimAllacci.ContatoriAntincendio[i].portataLS, 
                  "" + dimAllacci.ContatoriAntincendio[i].portataMH, 
                  "" + dimAllacci.ContatoriAntincendio[i].tipoContatore
                ]);
            }

            var portate = [];
            portate.push([{	text: 'PORTATA  DI CALCOLO "A" [mc/h]\n(contatori a servizio di unità abitative civili)', fillColor:this.fillColor},{text: dimAllacci.PortataCalcoloA}]);
            portate.push([{	text: 'PORTATA  DI CALCOLO "B" [mc/h]\n(altri contatori)', fillColor:this.fillColor},{text: dimAllacci.PortataCalcoloB}]);
            portate.push([{ text: 'PORTATA  DI CALCOLO COMPLESSIVA (A+B) [mc/h]', fillColor:this.fillColor},{text: dimAllacci.PortataCalcoloTotale}]);
         
            var condotte =  [];
            condotte.push( [{text:'Condotta allacciamento',fontSize:7, fillColor:this.fillColor},
            {text:'Diametro interno [mm]',fontSize:7, fillColor:this.fillColor},
            {text:'Scabrezza [mm]',fontSize:7, fillColor:this.fillColor},
            {text:'Perdita di carico [bar]',fontSize:7,  fillColor:this.fillColor},
            {text:'Pressione al contatore [bar]',fontSize:7,  fillColor:this.fillColor},
            {text:'Velocità [m/s]',fontSize:7, fillColor:this.fillColor},
            {text:'Verifica cond. esistente o nuova',fontSize:7, fillColor:this.fillColor}
            ]);

            condotte.push([{fontSize:10, text:"VERIFICA ALLACCIAMENTO ESISTENTE (scelta libera)", bold:true, fillColor:this.fillColor},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""}]);
            if(dimAllacci.AllacciamentoEsistente && dimAllacci.AllacciamentoEsistente.nome) condotte.push([{  fontSize: 8, text:dimAllacci.AllacciamentoEsistente.nome ? 
                dimAllacci.AllacciamentoEsistente.nome: ' '},{ text:dimAllacci.AllacciamentoEsistente.diametro?dimAllacci.AllacciamentoEsistente.diametro: ' '},{text:dimAllacci.AllacciamentoEsistente.scabrezza? dimAllacci.AllacciamentoEsistente.scabrezza : ' '},{text:dimAllacci.AllacciamentoEsistente.perdita?dimAllacci.AllacciamentoEsistente.perdita: ' ' ,fillColor:dimAllacci.AllacciamentoEsistente.colorPerdita},{text:dimAllacci.AllacciamentoEsistente.pressione ? dimAllacci.AllacciamentoEsistente.pressione : ' '},{text:dimAllacci.AllacciamentoEsistente.velocita? dimAllacci.AllacciamentoEsistente.velocita: ' ',fillColor:dimAllacci.AllacciamentoEsistente.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoEsistente.VerificaCondotta? dimAllacci.AllacciamentoEsistente.VerificaCondotta:''}]);
            condotte.push([{fontSize:10,text:"DIMENSIONAMENTO ALLACCIAMENTO NUOVO (scelta predefinita)", bold:true, fillColor:this.fillColor},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""}]);

            if(dimAllacci.AllacciamentoNuovo1) condotte.push([{fontSize:8,fillColor:this.fillColor,text:dimAllacci.AllacciamentoNuovo1.nome ? dimAllacci.AllacciamentoNuovo1.nome: ' ' },{text:dimAllacci.AllacciamentoNuovo1.diametro? dimAllacci.AllacciamentoNuovo1.diametro : ' '},{text:dimAllacci.AllacciamentoNuovo1.scabrezza ? dimAllacci.AllacciamentoNuovo1.scabrezza : ' '},{text:dimAllacci.AllacciamentoNuovo1.perdita ? dimAllacci.AllacciamentoNuovo1.perdita : ' ',fillColor:dimAllacci.AllacciamentoNuovo1.colorPerdita},{text:dimAllacci.AllacciamentoNuovo1.pressione ? dimAllacci.AllacciamentoNuovo1.pressione : ' '},{text:dimAllacci.AllacciamentoNuovo1.velocita? dimAllacci.AllacciamentoNuovo1.velocita : ' ', fillColor:dimAllacci.AllacciamentoNuovo1.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo1.VerificaCondotta ? dimAllacci.AllacciamentoNuovo1.VerificaCondotta:''}]);
           
            if(dimAllacci.AllacciamentoNuovo2) condotte.push([{fontSize: 8, fillColor:this.fillColor,text:dimAllacci.AllacciamentoNuovo2.nome ? dimAllacci.AllacciamentoNuovo2.nome : ' '},{text:dimAllacci.AllacciamentoNuovo2.diametro? dimAllacci.AllacciamentoNuovo2.diametro : ' '},{text:dimAllacci.AllacciamentoNuovo2.scabrezza? dimAllacci.AllacciamentoNuovo2.scabrezza : ' '},{text:dimAllacci.AllacciamentoNuovo2.perdita ? dimAllacci.AllacciamentoNuovo2.perdita : ' ',fillColor:dimAllacci.AllacciamentoNuovo2.colorPerdita},{text:dimAllacci.AllacciamentoNuovo2.pressione ? dimAllacci.AllacciamentoNuovo2.pressione : ''},{text:dimAllacci.AllacciamentoNuovo2.velocita ? dimAllacci.AllacciamentoNuovo2.velocita : ' ', fillColor:dimAllacci.AllacciamentoNuovo2.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo2.VerificaCondotta?dimAllacci.AllacciamentoNuovo2.VerificaCondotta:''}]);
            
            if(dimAllacci.AllacciamentoNuovo3) condotte.push([{fontSize: 8, fillColor:this.fillColor,text:dimAllacci.AllacciamentoNuovo3.nome? dimAllacci.AllacciamentoNuovo3.nome : ' '},{text:dimAllacci.AllacciamentoNuovo3.diametro ? dimAllacci.AllacciamentoNuovo3.diametro : ''},{text:dimAllacci.AllacciamentoNuovo3.scabrezza ? dimAllacci.AllacciamentoNuovo3.scabrezza : ' '},{text:dimAllacci.AllacciamentoNuovo3.perdita ? dimAllacci.AllacciamentoNuovo3.perdita : ' ',fillColor:dimAllacci.AllacciamentoNuovo3.colorPerdita},{text:dimAllacci.AllacciamentoNuovo3.pressione ?dimAllacci.AllacciamentoNuovo3.pressione :""},{text:dimAllacci.AllacciamentoNuovo3.velocita ? dimAllacci.AllacciamentoNuovo3.velocita : '', fillColor:dimAllacci.AllacciamentoNuovo3.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo3.VerificaCondotta?dimAllacci.AllacciamentoNuovo3.VerificaCondotta:''}]);
            
            if(dimAllacci.AllacciamentoNuovo4) condotte.push([{fontSize: 8, fillColor:this.fillColor,text:dimAllacci.AllacciamentoNuovo4.nome},{text:dimAllacci.AllacciamentoNuovo4.diametro},{text:dimAllacci.AllacciamentoNuovo4.scabrezza},{text:dimAllacci.AllacciamentoNuovo4.perdita?
                dimAllacci.AllacciamentoNuovo4.perdita: '',fillColor:dimAllacci.AllacciamentoNuovo4.colorPerdita},{text:dimAllacci.AllacciamentoNuovo4.pressione? dimAllacci.AllacciamentoNuovo4.pressione : ' '},{text:dimAllacci.AllacciamentoNuovo4.velocita ? dimAllacci.AllacciamentoNuovo4.velocita : '', fillColor:dimAllacci.AllacciamentoNuovo4.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo4.VerificaCondotta?dimAllacci.AllacciamentoNuovo4.VerificaCondotta:''}]);
            
            if(dimAllacci.AllacciamentoNuovo5) condotte.push([{fontSize: 8, fillColor:this.fillColor,text:dimAllacci.AllacciamentoNuovo5.nome ? dimAllacci.AllacciamentoNuovo5.nome : ''},{text:dimAllacci.AllacciamentoNuovo5.diametro? dimAllacci.AllacciamentoNuovo5.diametro : ''},{text:dimAllacci.AllacciamentoNuovo5.scabrezza ? dimAllacci.AllacciamentoNuovo5.scabrezza : ''},{text:dimAllacci.AllacciamentoNuovo5.perdita? dimAllacci.AllacciamentoNuovo5.perdita : '',fillColor:dimAllacci.AllacciamentoNuovo5.colorPerdita},{text:dimAllacci.AllacciamentoNuovo5.pressione ? dimAllacci.AllacciamentoNuovo5.pressione : ''},{text:dimAllacci.AllacciamentoNuovo5.velocita ? dimAllacci.AllacciamentoNuovo5.velocita : '', fillColor:dimAllacci.AllacciamentoNuovo5.colorVelocita},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo5.VerificaCondotta?dimAllacci.AllacciamentoNuovo5.VerificaCondotta:''}]);
            
            if(dimAllacci.AllacciamentoNuovo6 && dimAllacci.AllacciamentoNuovo6.nome) condotte.push([{fontSize: 8, text:dimAllacci.AllacciamentoNuovo6.nome?dimAllacci.AllacciamentoNuovo6.nome: ' '},{text:dimAllacci.AllacciamentoNuovo6.diametro ? dimAllacci.AllacciamentoNuovo6.diametro : ' '},{text:dimAllacci.AllacciamentoNuovo6.scabrezza? dimAllacci.AllacciamentoNuovo6.scabrezza : ''},{text:dimAllacci.AllacciamentoNuovo6.perdita ? dimAllacci.AllacciamentoNuovo6.perdita : ' ',fillColor:dimAllacci.AllacciamentoNuovo6.colorPerdita ?
            dimAllacci.AllacciamentoNuovo6.colorPerdita : ''},{text:dimAllacci.AllacciamentoNuovo6.pressione ? dimAllacci.AllacciamentoNuovo6.pressione : ''},{text:dimAllacci.AllacciamentoNuovo6.velocita? dimAllacci.AllacciamentoNuovo6.velocita : '', fillColor:dimAllacci.AllacciamentoNuovo6.colorVelocita ? dimAllacci.AllacciamentoNuovo6.colorVelocita : ''},{fontSize: 8, text:dimAllacci.AllacciamentoNuovo6.VerificaCondotta?dimAllacci.AllacciamentoNuovo6.VerificaCondotta:''}]);
         

            var page = [  
                this.header2, 
                {
                    style: 'header',
                    table: {
                        widths: [1,'*'],
                        body: [
                                [
                                {text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                {border:[false,true,true,true],text: 'Dimensionamento allaccio acqua (interrato/aereo)', fontSize: 12,bold:true, alignment: 'center', fillColor:this.fillColor}
                                ],
                              ]
                    }
                  },
                 {
                         style: 'tableImg',
                         table: {
                             widths: [150,'*'],
                             body: 
                                dataList
                               }
                     },
                 
                      {
                        style: 'tableImg',
                        table: {
                            widths: [300,'*'],
                            body: 
                               dimensionamentoList
                            
                        }
                      },
                 
                 {
                     table:
                             {
                                 headerRows: 1,
                                 widths: ['50%','25%','25%'],
                                 body: richiesteTipoA        
                             },                  
                 },
              
                    
                    {
                        table:
                                {
                                    headerRows: 1,
                                    widths: ['35%','10%','15%','15%','25%'],
                                    body: richiesteUsoAntincendio
                                }, 
                    },

                    {
                        table:
                                {
                                    headerRows: 1,
                                    widths: ['34%','6%','24%','6%','24%','6%'],
                                    body: [[{fontSize:8, text:"PORTATA DI CALCOLO A [MC/H] (contatori a servizio di unità abitative civili)", fillColor:this.fillColor},{	fontSize: 8,text:dimAllacci.PortataCalcoloA},{fontSize:10,text:"PORTATA DI CALCOLO B [MC/H] (altri contatori)",fillColor:this.fillColor},{	fontSize: 8, text:dimAllacci.PortataCalcoloB},{fontSize:8,text:"PORTATA DI CALCOLO COMPLESSIVA (A+B) [MC/H]", fillColor:this.fillColor},{	fontSize: 8, text:dimAllacci.PortataCalcoloTotale}]]
                                }, 
                    },


                    {
                        style: 'tableExample',
                        table:
                                {
                                    headerRows: 1,
                                    fontSize:10,
                                    widths: ['100%'],
                                    body: [
                                        [ {text:"Verifica allacciamento esistente / Dimensionamento nuovo allaccio", fillColor:this.fillColor}
                                        ]
                                    ]
                                    
                                }, 
                    },
                    {
                        style: 'tableExample',
                        table:
                                {
                                    headerRows: 1,
                                    widths: ['30%','10%','10%','12%','12%','10%','16%'],
                                    body: 
                                      condotte
                                    
                                    
                                }, 
                    },
                      {   
                        style: 'big',
                          table: {
                              widths: ['*'],
                              body: [
                                      [{	
                                          image: imgExample.getNoteFT(),
                                          width: 500, alignment:'center', border: [ true, false, true, false]}]
                                    ]
                          }
                      },
                      ];
    
         return page;
        }

        else if(isDimensionamentoAllacciFognatura) {
            this.fillColor      = '#6c4e03';
            let headerBG        = '#6d4f00', headerFontColor = 'white', headerFontSize=14;
            
            let header2BG       = '#fed254', header2FontSize=10, header2ColFontSize=7,header2ColFontSize2=5;
            let acqueNereBG     = '#15a43f';
            let acqueNereBG2    = '#badba5';
            let acqueBiancheBG  = '#8cb3e0';
            let acqueBiancheBG2 = '#d5e6f4';
            let vincoliBG       = '#feff0d';
            let vincoli2BG      = header2BG;
            let paramBG         = '#cfd0d0';
            let paramRedBG      = '#febac2';
            let paramGreenBG    = '#bbedc4';
            

            var formatVal = (val) => {
                // use precision and remove commas
                if (isNaN(+val)) return " "+val;
                return ""+this._decimalPipe.transform(+val,"1.1-2").replace(/,/g, "");
            }
            
            var setColorForPortata = (msg) =>{
                switch(msg){
                    case DIMFOGNA_MSG.DN_INSUFF:
                    case DIMFOGNA_MSG.NON_IDONEA:
                    case DIMFOGNA_MSG.ERRORE:
                          return paramRedBG;
                    case DIMFOGNA_MSG.PORTATA_NULL:
                          return 'white';
                    default:
                      return paramGreenBG;
                  }
            }
            
            var setColorForMessage = (msg) =>{
                switch(msg){
                    case DIMFOGNA_MSG.DN_INSUFF:
                    case DIMFOGNA_MSG.PORTATA_NULL:
                    case DIMFOGNA_MSG.ERRORE:
                    case DIMFOGNA_MSG.NON_IDONEA:
                    case DIMFOGNA_MSG.FUORI_LIMITE:  
                          return paramRedBG;
                    default:
                      return paramGreenBG;
                  }
            }
            

            let dataList = [];
            /*
            dataList.push([{text: 'OdL', fillColor:header2BG},{text: value.dati.form._ads.CodiceOdl}]);
            dataList.push([{text: 'Comune', fillColor:header2BG},{text: value.dati.form._ads.Indirizzo.Citta}]);
            dataList.push([{text: 'Indirizzo', fillColor:header2BG},{text: value.dati.form._ads.Indirizzo.toString()}]);
            let clienteTxt: string = (value.dati.form._ads.Cliente.CodiceCliente ?  value.dati.form._ads.Cliente.CodiceCliente : "") + " " +
                             (value.dati.form._ads.Cliente.Cognome ? value.dati.form._ads.Cliente.Cognome : "") + " " + 
                             (value.dati.form._ads.Cliente.Nome ? value.dati.form._ads.Cliente.Nome : " ");

            if ( (clienteTxt == "   ") && value.dati.form._ads.Cliente.RagioneSociale) {
                clienteTxt = value.dati.form._ads.Cliente.RagioneSociale;
            }
            dataList.push([{text: 'Cliente', fillColor:header2BG,fontSize:header2FontSize},{text: clienteTxt}]);
            */
            let datiProgettoList = [];
            datiProgettoList.push([
                {text:"ACQUE NERE",         fillColor: acqueNereBG,     alignment:"center", bold:true, fontSize:header2FontSize},
                {text:"",                   fillColor: acqueNereBG,     alignment:"center", bold:true, fontSize:header2ColFontSize},
                {text:"UIeq",               fillColor: acqueNereBG,     alignment:"center", bold:true, fontSize:header2ColFontSize},
                {text:"ACQUE BIANCHE",      fillColor: acqueBiancheBG,  alignment:"center", bold:true, fontSize:header2FontSize},
                {text:"Superficie\n(mq)",   fillColor: acqueBiancheBG,  alignment:"center", bold:true, fontSize:header2ColFontSize},
                {text:"Portata (l/s)",      fillColor: acqueBiancheBG,  alignment:"center", bold:true, fontSize:header2ColFontSize},
                {text:"UIeq",               fillColor: acqueBiancheBG,  alignment:"center", bold:true, fontSize:header2ColFontSize},

            ]);
            
            datiProgettoList.push([
                {   
                    text:"Uso domestico, uso servizi condominiali (numero UNITA' IMMOBILIARI)",         
                    fillColor: acqueNereBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {
                    text:""+dimAllacci.AcqueNere.usoDomestico,                                             
                    fillColor: "white",     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.usoDomestico/ParametriAcqueNere.dividers[0]),                                             
                    fillColor: acqueNereBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Unità equivalenti "fisse" in presenza di portata bianca',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },
                {   
                    text:dimAllacci.AcqueBianche.uiEqFisse,         
                    fillColor: acqueBiancheBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                
            ]);
            datiProgettoList.push([
                {   
                    text:"Alberghi, pensioni, residence alberghieri (NUMERO CAMERE/APPARTAMENTI)",         
                    fillColor: acqueNereBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {
                    text:""+dimAllacci.AcqueNere.alberghieri,                                             
                    fillColor: "white",     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.alberghieri/ParametriAcqueNere.dividers[1]),                                             
                    fillColor: acqueNereBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Superfici impermeabili (tetti, strade) [mq]',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:formatVal(dimAllacci.AcqueBianche.supImpermeabili),         
                    fillColor: 'white',     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   text:formatVal(dimAllacci.AcqueBianche.portataImpermeabili),
                    fillColor: acqueBiancheBG2,
                    alignment:"center", 
                    fontSize:header2ColFontSize 
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },
                
                
            ]);
            datiProgettoList.push([
                {   
                    text:"Ospedali, case di cura, altre comunità numerose (NUMERO POSTI LETTO)",         
                    fillColor: acqueNereBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {
                    text:""+dimAllacci.AcqueNere.ospedali,                                             
                    fillColor: "white",     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.ospedali/ParametriAcqueNere.dividers[2]),                                             
                    fillColor: acqueNereBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Superfici semipermeabili drenati (parcheggi) [mq]',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:formatVal(dimAllacci.AcqueBianche.supSemipermeabili),         
                    fillColor: 'white',     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   text:formatVal(dimAllacci.AcqueBianche.portataSemipermeabili),
                    fillColor: acqueBiancheBG2,
                    alignment:"center", 
                    fontSize:header2ColFontSize 
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },
                
                
            ]);
            datiProgettoList.push([
                {   
                    text:"Attività artigianali, industriali, zootecniche (MQ SUPERFICIE UTILE COPERTA *)",         
                    fillColor: acqueNereBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {
                    text:""+dimAllacci.AcqueNere.artigianali,                                             
                    fillColor: "white",     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.artigianali/ParametriAcqueNere.dividers[3]),                                             
                    fillColor: acqueNereBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   text:'',
                    fillColor: acqueBiancheBG2,
                    alignment:"center", 
                    fontSize:header2ColFontSize 
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },                
            ]);
            datiProgettoList.push([
                {   
                    text:"Attività commerciali, di intrattenimento, impianti sportivi e tutto quanto non compreso nelle voci precedenti (MQ SUPERFICIE UTILE COPERTA *)",         
                    fillColor: acqueNereBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {
                    text:""+dimAllacci.AcqueNere.commerciali,                                             
                    fillColor: "white",     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.commerciali/ParametriAcqueNere.dividers[4]),                                             
                    fillColor: acqueNereBG2,     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Portate di acque bianche con limitazione (es. vasche laminazione, strozzature, etc) [l/s]',         
                    fillColor: acqueBiancheBG2,     
                    alignment:"left", 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },
                {   
                    text:formatVal(dimAllacci.AcqueBianche.portateLimitate),         
                    fillColor: 'white',     
                    alignment:"center", 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG2,fontSize:header2ColFontSize },                
            ]);

            datiProgettoList.push([
                {   
                    text:"Somma Uieq (ACQUE NERE)",         
                    fillColor: acqueNereBG,     
                    alignment:"left",
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:'',                                             
                    fillColor: acqueNereBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.sumEq()),                                             
                    fillColor: acqueNereBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Somma Uieq (ACQUE BIANCHE)',         
                    fillColor: acqueBiancheBG,     
                    alignment:"left", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG,fontSize:header2ColFontSize },
                {   text:'',fillColor: acqueBiancheBG,fontSize:header2ColFontSize },      
                {   
                    text:formatVal(dimAllacci.AcqueBianche.sommaUIeq),         
                    fillColor: acqueBiancheBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                          
            ]);

            datiProgettoList.push([
                {   
                    text:"Portata relativa alle unità abitative [l/s]\n(ACQUE NERE)",         
                    fillColor: acqueNereBG,     
                    alignment:"left",
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:formatVal(dimAllacci.AcqueNere.portata),                                             
                    fillColor: acqueNereBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:'',                                             
                    fillColor: acqueNereBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {   
                    text:'Portata meteorica totale [l/s]\n(ACQUE BIANCHE)',         
                    fillColor: acqueBiancheBG,     
                    alignment:"left", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG,fontSize:header2ColFontSize },
                {   
                    text:formatVal(dimAllacci.AcqueBianche.portata),         
                    fillColor: acqueBiancheBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {   text:'',fillColor: acqueBiancheBG,fontSize:header2ColFontSize },      
                          
            ]);

            /* Vincoli */
            datiProgettoList.push([
                {   
                    text:"Portata complessiva di calcolo [l/s]",         
                    fillColor: vincoliBG,     
                    alignment:"left",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.portataMista),                                             
                    fillColor: vincoliBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);
            datiProgettoList.push([
                {   
                    text:"TOTALE Uieq (acque nere + acque bianche)",         
                    fillColor: vincoliBG,     
                    alignment:"left",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.totaleUIeq),                                             
                    fillColor: vincoliBG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);
            datiProgettoList.push([
                {   
                    text:"Lunghezza [m]",         
                    fillColor: vincoli2BG,     
                    alignment:"left",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.lunghezza),                                             
                    fillColor: 'white',     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);
            datiProgettoList.push([
                {   
                    text:"Dislivello [m]",         
                    fillColor: vincoli2BG,     
                    alignment:"left",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.dislivello),                                             
                    fillColor: 'white',     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);
            datiProgettoList.push([
                {   
                    text:"Pendenza (dislivello/lunghezza)",         
                    fillColor: vincoli2BG,     
                    alignment:"right",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.pendenza),                                             
                    fillColor: vincoli2BG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);
            datiProgettoList.push([
                {   
                    text:"Diametro interno minimo necessario [mm]",         
                    fillColor: vincoli2BG,     
                    alignment:"right",
                    bold:true,
                    colSpan:2, 
                    fontSize:header2ColFontSize
                },
                {   text:''},
                {
                    text:formatVal(dimAllacci.Vincoli.diamIntMinimo),                                             
                    fillColor: vincoli2BG,     
                    alignment:"center", 
                    bold:true, 
                    fontSize:header2ColFontSize
                },
                {
                    text:' ',                                             
                    fillColor: 'white',     
                    colSpan:4, 
                },
                {   text:''},
                {   text:''},
                {   text:''},
                          
            ]);


            let allacciamentiList = [];
            allacciamentiList.push([
                {text:"Condotta allacciamento",         
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize},
                {text:"Diam. Int. tubo scelto [mm]",                   
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize},
                {text:"K (coef. Scabr.) [m1/3s-1]",               
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize},
                {text:"Port. smaltibile con riemp. 70% [l/s]",      
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize2},
                {text:"alfa",     
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize},
                {text:"% di riemp. tubo a Portata compl.",      
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize2},
                {text:"Vel. a Portata compl. [m/s]",      
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize},
                {text:"Verifica condotta esist. e/o Dim. condotta nuova",               
                    fillColor: vincoli2BG,  alignment:"center", fontSize:header2ColFontSize2},

            ]);
            allacciamentiList.push([
                {text:'VERIFICA ALLACCIAMENTO ESISTENTE (scelta libera "materiale/DE/PN")',         
                    fillColor: vincoli2BG,  alignment:"left", bold:true, colSpan:8, fontSize:header2ColFontSize},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""}
            ]);
            // Allacciamento Esistente
            allacciamentiList.push([
                {text:""+dimAllacci.AllacciamentoEsistente.nome,         
                    fillColor: "white",  alignment:"left",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.dinterno),         
                    fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.kval),         
                    fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.portata),         
                    fillColor: setColorForPortata(dimAllacci.AllacciamentoEsistente.velocita),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.alfa),         
                    fillColor: paramBG,  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.percRiempimento),         
                    fillColor: setColorForMessage(dimAllacci.AllacciamentoEsistente.percRiempimento),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.velocita),         
                    fillColor: setColorForMessage(dimAllacci.AllacciamentoEsistente.risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                
                {text:formatVal(dimAllacci.AllacciamentoEsistente.risultato),         
                    fillColor: setColorForMessage(dimAllacci.AllacciamentoEsistente.risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                                                                    
            ]);                

            // Allacciamenti consigliati
            allacciamentiList.push([
                {text:'DIMENSIONAMENTO ALLACCIAMENTO NUOVO (scelta predefinita o libera "materiale/DE/PN")',         
                    fillColor: vincoli2BG,  alignment:"left", bold:true, colSpan:8, fontSize:header2ColFontSize},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""}
            ]);
            // Allacciamento consigliati [01-05, fissi ]
            let listaAllacciamenti = [
                dimAllacci.AllacciamentoNuovo1,
                dimAllacci.AllacciamentoNuovo2,
                dimAllacci.AllacciamentoNuovo3,
                dimAllacci.AllacciamentoNuovo4,
                dimAllacci.AllacciamentoNuovo5,
            ];
            for(var i = 0; i < listaAllacciamenti.length; i++) {
                allacciamentiList.push([
                    {text:""+listaAllacciamenti[i].nome,         
                        fillColor: vincoli2BG,  alignment:"left", bold:true, fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].dinterno),         
                        fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].kval),         
                        fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].portata),         
                        fillColor: setColorForPortata(listaAllacciamenti[i].velocita),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].alfa),         
                        fillColor: paramBG,  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].percRiempimento),         
                        fillColor: setColorForMessage(listaAllacciamenti[i].percRiempimento),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].velocita),         
                        fillColor: setColorForMessage(listaAllacciamenti[i].risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(listaAllacciamenti[i].risultato),         
                        fillColor: setColorForMessage(listaAllacciamenti[i].risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                                                                        
                ]);
            }    
            
            // Allacciamento consigliato [06, scelto dall'utente]
            if (dimAllacci.AllacciamentoNuovo6.nome){
                allacciamentiList.push([
                    {text:""+dimAllacci.AllacciamentoNuovo6.nome,         
                        fillColor: "white",  alignment:"left",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.dinterno),         
                        fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.kval),         
                        fillColor: paramBG,  alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.portata),         
                        fillColor: setColorForPortata(dimAllacci.AllacciamentoNuovo6.velocita),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.alfa),         
                        fillColor: paramBG,  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.percRiempimento),         
                        fillColor: setColorForMessage(dimAllacci.AllacciamentoNuovo6.percRiempimento),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.velocita),         
                        fillColor: setColorForMessage(dimAllacci.AllacciamentoNuovo6.risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                    
                    {text:formatVal(dimAllacci.AllacciamentoNuovo6.risultato),         
                        fillColor: setColorForMessage(dimAllacci.AllacciamentoNuovo6.risultato),  bold:true, alignment:"center",  fontSize:header2ColFontSize},
                                                                        
                ]);            
            }

            
            var page = [  
                this.header2, 
                {
                    style: 'header',
                    table: {
                        widths: [1,'*'],
                        body: [
                                [
                                {text:' ',fillColor:headerBG, 	border:[true,true,false,true]},
                                {
                                    border:[false,true,true,true],
                                    text: 'PROGETTO ALLACCIAMENTO FOGNATURA', 
                                    fontSize: headerFontSize,
                                    bold:true, 
                                    alignment: 'center', 
                                    color: headerFontColor,
                                    fillColor:headerBG}
                                ],
                              ]
                    }
                  },
                  /*
                 {
                    style: 'tableImg',
                    table: {
                        widths: [120,'*'],
                        body: 
                        dataList
                        }
                },
                */
                {
                    style: 'header',
                    table: {
                        widths: [1,'*'],
                        body: [
                                [
                                {text:' ',fillColor:headerBG, 	border:[true,true,false,true]},
                                {
                                    border:[false,true,true,true],
                                    text: 'Dati Progetto', 
                                    fontSize: 12,
                                    bold:true, 
                                    alignment: 'center', 
                                    color: headerFontColor,
                                    fillColor:headerBG}
                                ],
                              ]
                    }
                  },
                {
                    style: 'tableImg',
                    table: {
                        widths: [160,30,30,150,30,30,'*'],
                        body: 
                            datiProgettoList
                      
                    }
                },
                {
                    style: 'header',
                    table: {
                        widths: [1,'*'],
                        body: [
                                [
                                {text:' ',fillColor:headerBG, 	border:[true,true,false,true]},
                                {
                                    border:[false,true,true,true],
                                    text: 'Verifica allacciamento esistente / Dimensionamento nuovo allaccio', 
                                    fontSize: 12,
                                    bold:true, 
                                    alignment: 'center', 
                                    color: headerFontColor,
                                    fillColor:headerBG}
                                ],
                              ]
                    }
                  },
                {
                    style: 'tableImg',
                    table: {
                        widths: [90,50,50,50,50,50,50,'*'],
                        body: 
                            allacciamentiList
                        
                    }
                },
                {   
                    style: 'big',
                        table: {
                            widths: ['*'],
                            body: [
                                    [{	
                                        image: imgExample.getNoteFTFogna(),
                                        width: 500, alignment:'center', border: [ true, true, true, true]}]
                                ]
                        }
                    },
            
            ];
    
         return page;
        }

        else if(isDimensionamentoAllacciEE){
            let dataList = [];
            dataList.push([{text: 'OdL', fillColor:this.fillColor},{text: value.dati.form._codice_odl}]);
            dataList.push([{text: 'Comune', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.Citta}]);
            dataList.push([{text: 'Indirizzo', fillColor:this.fillColor},{text: value.dati.form._ads.Indirizzo.toString()}]);
            let clienteTxt: string = (value.dati.form._ads.Cliente.CodiceCliente ?  value.dati.form._ads.Cliente.CodiceCliente : "") + " " +
                             (value.dati.form._ads.Cliente.Cognome ? value.dati.form._ads.Cliente.Cognome : "") + " " + 
                             (value.dati.form._ads.Cliente.Nome ? value.dati.form._ads.Cliente.Nome : " ");
            dataList.push([{text: 'Cliente', fillColor:this.fillColor},{text: clienteTxt}]);
    
            let reteEE = [];
            reteEE.push(
                [
                    { text: 'Nome', fillColor:this.fillColor }, 
                    { text: 'Numero', fillColor:this.fillColor}, 
                    { text: 'Descrizione', fillColor:this.fillColor }
                ],        
            );
            if(dimAllacci.ReteEE && dimAllacci.ReteEE.length === 0) {
                reteEE.push([
                   " ","",""
                ]);
            }
            for(var i = 0; i < dimAllacci.ReteEE.length; i++) {
                reteEE.push([
                    dimAllacci.ReteEE[i].nome,
                    dimAllacci.ReteEE[i].numero,
                    dimAllacci.ReteEE[i].desc,
                ]);
            }
            
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
                                     {text: 'CALCOLO DIMENSIONALE', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor, 	border:[false,true,true,true]}],
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
                        style: 'header',
                        table: {
                            widths: [1,'*'],
                            body: [
                                    [{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'Dati Progetto', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                             widths: [150,'*'],
                             body: 
                                dataList
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
                        style: 'header',
                        table: {
                            widths: [1,'*'],
                            body: [
                                    [{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'Dimensionamento allaccio energia elettrica', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                        columns: [
                                {
                                    width: 350,
                                    style: 'tableExample',
                                    headerRows: 1,
                                    table: {
                                        widths: ["auto", "auto", "*"],
                                        body: reteEE
                                    }
                                },
                            ]
                    },                     
                      
                ];
    
         return page;
        }
    }

  
    getPage4(value){

        var page = [];
           page = [ 

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
                                    {	border:[false,true,true,true],text: 'Relazione fotografica', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                                
                }];
                

                this.getFotoLayout(this.foto_altre,page);
             

        return page;
    }

    getPage3(value){
            var datiTecnici = [];
            datiTecnici.push([{text: 'GRP', fillColor:this.fillColor},{text:value.dati.form._GRP},{text:' ', border:[true,false,true,false]},{text: 'CDL', fillColor:this.fillColor},{text:value.dati.form._CDL}]);
	        datiTecnici.push([{text: 'Tipo Avv.', fillColor:this.fillColor},{text:value.dati.form._tipoAvviso},{text:' ', border:[true,false,true,false]},{text: 'Dati Cliente', fillColor:this.fillColor},{text:value.dati.form._datiCliente}]);
	        datiTecnici.push([{text: 'Cod.App.', fillColor:this.fillColor},{text:value.dati.form._codiceAppuntamento},{text:' ', border:[true,false,true,false]},{text: 'Provenienza', fillColor:this.fillColor},{text:value.dati.form._provenienza}]);
           
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
                                	[{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'Dati Tecnici', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                            widths: [100,'*',1,100,'*'],
                            body: datiTecnici
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
                        style: 'header',
                        table: {
                            widths: ['*',1],
                            body: [
                                	[{text: 'Caratteristiche di configurazione', fillColor:this.fillColor, alignment:'center',border:[true,true,false,true]},{text:'',fillColor:this.fillColor,border:[false,true,true,true]}],
                                	[{text: value.dati.form._DatiTecnici ,rowSpan:4,border:[true,true,false,true] },{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,true]}]
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
                        style: 'header',
                        table: {
                            widths: ['*',1],
                            body: [
                                	[{text: 'Note Avviso/Odl', fillColor:this.fillColor, alignment:'center',border:[true,true,false,true]},{text:'',fillColor:this.fillColor,border:[false,true,true,true]}],
                                	[{text: value.dati.form._Note ,rowSpan:4,border:[true,true,false,true] },{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,true]}]
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
                        style: 'header',
                        table: {
                            widths: ['*',1],
                            body: [
                                	[{text: 'Note Esecutive', fillColor:this.fillColor, alignment:'center',border:[true,true,false,true]},{text:'',fillColor:this.fillColor,border:[false,true,true,true]}],
                                	[{text: value.dati.form._NoteEsecutive ,rowSpan:4,border:[true,true,false,true] },{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,false]}],
                                	[{text:' '},{text: '\n',border:[false,false,true,true]}]
                            ]
                        }
                    }
            ]
        return page;
    }

    getPage2(value){
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
                                	[{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'COROGRAFIA - PLANIMETRIA', fontSize: 20, bold:true, alignment: 'center',fillColor:this.fillColor}],
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
                         
                     }
                    
                ];

                this.getFotoLayout(this.foto_planimetria,page);

        return page;
    }


    getPage1(value){
        var page = [
         this.header, 
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
                        style: '',
                        table: {
                            widths: [1,'*'],
                            body: [
                                	[{text:' ',fillColor:this.fillColor, 	border:[true,true,false,true]},
                                    {	border:[false,true,true,true],text: 'FASCICOLO TECNICO', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
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
                        style: 'tableExample',
                        table: {
                            widths: [50, 150,'*', 50, 150],
                            body: [
                                [{
                                    text:'Avviso',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text:value.dati.form._Avviso
                                },
                                {
                                    border: [ false, false, false, false],
                                    text:''
                                }, 
                                {
                                    text:'Odl',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text:value.dati.form._codice_odl
                                }]
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
                      style: 'big',
                        table: {
                            widths: ['*'],
                            body: [
                                	[{text: 'Settore merceologico', bold:true, fontSize: 10, alignment: 'center', border: [ true, true, true, false]}],
                                	[{text: value.dati.form._TipoServizio, fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor,  border: [ true, false, true, false]}],
                                  	[{text: '', fontSize: 20,bold:true, alignment: 'center',  border: [ true, false, true, false]}],
                                	[{	image: value.dati.form._Icon,
							            width: 60, alignment:'center', border: [ true, false, true, false]}],   [{text: '', fontSize: 20,bold:true, alignment: 'center',  border: [ true, false, true, true]}]
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
                        style: 'tableExample',
                        table: {
                            widths: [50, '*'],
                            body: [
                                [{
                                    text:'Pds',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text: value.dati.form._prod_servizio
                                }]
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
                        style: 'tableExample',
                        table: {
                            widths: [50, '*'],
                            body: [
                                [{
                                    text:'Cod.Att.',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text:value.dati.form._codice_attivita
                                }]
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
                        style: 'tableExample',
                        table: {
                            widths: [50, '*'],
                            body: [
                                [{
                                    text:'SOT',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text: value.dati.form._codice_sot
                                }]
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
                        style: 'tableExample',
                        table: {
                            widths: [50, '*'],
                            body: [
                                [{
                                    text:'Indirizzo',
                                    fillColor:this.fillColor
                                }, 
                                {
                                    text:value.dati.form._Indirizzo
                                }]
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
                        style: 'tableExample',
                        table: {
                            widths: ['*'],
                            body: [
                                [{
                                    text:'Note manuali post redazione fascicolo tecnico',
                                    fillColor:this.fillColor,
                                    alignment: 'center'
                                }],
                                [ 
                                {
                                    text:'\n\n\n\n\n\n\n\n\n'
                                }]
                             ]
                        }
                    }
            ];
                    return page;
    }


    getAllDoc(page1,page2,page3,page4, page6){
        var retPage = [];
         for(let item of page1){
            retPage.push(item);
        }
        for(let item of page2){
            retPage.push(item);
        }
        for(let item of page3){
            retPage.push(item);
        }
        for(let item of page4){
            retPage.push(item);
        }
        if(page6) {
            for(let item of page6) {
                retPage.push(item);
            }
        }
        return retPage;
    }

    public getTesProvDomDefinition(value): Promise<any> {

/*
        for(var i=0; i < value.download.ads.foto.length; i++ )
          this.foto_salvate[i] = fileUtil.readBase64Image(value.download.ads._codice_odl,"image",value.download.ads.foto[i].name);
  */     
        this.foto_planimetria = [];   
        this.foto_altre = [];
        this.fillColor = value.dati.form._fillColor;

        if(value.dati.form._Gas==true||value.dati.form._Energia_Elettrica==true){
            this.header = {
				style: "header",
				table: {
					widths: ["*", 100],
					body: [[{
								image: value.dati.form._LogoSx,
								width: 150,
								border: [false, false, false, false]
							}, {
								image: value.dati.form._LogoDx,
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
								image: value.dati.form._LogoSx,
								width: 150,
								border: [false, false, false, false]
							}, {
								image: value.dati.form._LogoDx,
							   margin: [-30,10],
								width: 125,
								border: [false, false, false, false]
							}
						]]
				},
				pageBreak: "before"
			};

        }
        else {
            this.header = {
            	style: "header",
				table: {
					widths: ["*", 100],
					body: [[{
								image: value.dati.form._LogoSx,
								width: 150,
								border: [false, false, false, false]
							}, {
								image: value.dati.form._LogoDx,
								width: 100,
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
								image: value.dati.form._LogoSx,
								width: 150,
								border: [false, false, false, false]
							}, {
								image: value.dati.form._LogoDx,
								width: 100,
								border: [false, false, false, false]
							}
						]]
				},	pageBreak: "before"
        }
    
        }

        return new Promise(async (resolve, reject) => {
        
        //var pdfContent = value;


        let thumbSize;
        if (value.dati.form._imagesPlanimetria != " "){
            thumbSize = 1400;
            for(let img of value.dati.form._imagesPlanimetria){
                if (thumbSize > 0){
                    var thumb = await Utils.resizedataURL(img.base64,-1,thumbSize);
                    if(thumb){ 
                        img.base64 = thumb;
                    }
                }
                this.foto_planimetria.push(img);
            }    
        }
        if(this.foto_planimetria.length>0 && this.foto_planimetria[0]==' ') this.foto_planimetria = [];
        if(this.foto_planimetria.length == 0||this.foto_planimetria.length == 3||this.foto_planimetria.length == 5){      
            this.foto_planimetria.push({name:'',tag:'',base64:imgExample.getWhiteImg()});
        }

        if (value.dati.form._imagesAltre != " "){
            thumbSize = 1200;    
            for(let img of value.dati.form._imagesAltre){
                if (thumbSize > 0){
                    var thumb = await Utils.resizedataURL(img.base64,-1,thumbSize);
                    if(thumb){ 
                        img.base64 = thumb;
                    }
                }
                this.foto_altre.push(img);
            }
        }
        if(this.foto_altre.length>0 && this.foto_altre[0]==' ') this.foto_altre = [];
        if(this.foto_altre.length == 0||this.foto_altre.length == 3||this.foto_altre.length == 5){      
           this.foto_altre.push({name:'',tag:'',base64:imgExample.getWhiteImg()});
        }
    

        
        var page1 = this.getPage1(value);
        var page2 = []; //this.getPage2(value);
        var page3 = []; //this.getPage3(value);
        var page4 = []; //this.getPage4(value);    
        var page6 = this.getPage6(value);

        var contPdf = this.getAllDoc(page1,page2,page3,page4, page6);
        
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
								"text": "Data Redazione: "+value.dati.form._DataRedazione,
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