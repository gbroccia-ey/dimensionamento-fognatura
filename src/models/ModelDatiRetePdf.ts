import { Injectable } from '@angular/core';
import { SettoreMerceologico } from '../models/ads'
import { DatiRete } from './DatiRete';

declare var util: any;
declare var imgExample;

@Injectable()
export class ModelDatiRetePdf {

    fillColor = '#cccccc';
    icon;
    indirizzo;
    settoreMerceologico;
    odlCode= '';
    datiRete: DatiRete;
    header;
    header2;

    constructor() {

    }

    getPage2(value) {
        let dataList = [];

        dataList.push([{text: 'Valori accessibilità', fillColor:this.fillColor},{text: this.datiRete.valoriAccessibilita}]);
        dataList.push([{text: 'Caratteristiche alloggiamento', fillColor:this.fillColor},{text: this.datiRete.caratteristicheAlloggiamento}]);
        dataList.push([{text: 'Caratteristica Sportello', fillColor:this.fillColor},{text: this.datiRete.caratteristicaSportello}]);
        dataList.push([{text: 'Conformità installazione GdM', fillColor:this.fillColor},{text: this.datiRete.conformitaInstallazione}]);
        dataList.push([{text: 'Telelettura', fillColor:this.fillColor},{text: this.datiRete.telelettura}]);
        dataList.push([{text: 'Spazio Confinato', fillColor:this.fillColor},{text: this.datiRete.spazioConfinato}]);
        dataList.push([{text: 'Potenzialità Iniziale di Progetto', fillColor:this.fillColor},{text: this.datiRete.potenzialitaIniziale}]);
        dataList.push([{text: 'Pressione di Fornitura di Progetto', fillColor:this.fillColor},{text: this.datiRete.pressioneFornitura}]);
        dataList.push([{text: 'Potenza tecnica impianto (kW)', fillColor:this.fillColor},{text: this.datiRete.potenzaTecnica}]);
        dataList.push([{text: 'Presenza blocco antimorosità', fillColor:this.fillColor},{text: this.datiRete.bloccoAntimorosita}]);
        dataList.push([{text: 'Valvola con chiave', fillColor:this.fillColor},{text: this.datiRete.valvolaChiave}]);
        dataList.push([{text: 'Chiave n°', fillColor:this.fillColor},{text: this.datiRete.numChiave}]);
        dataList.push([{text: 'Presenza chiavi condominio', fillColor:this.fillColor},{text: this.datiRete.presenzaChiavi}]);
        dataList.push([{text: 'Mensola', fillColor:this.fillColor},{text: this.datiRete.mensola}]);
        dataList.push([{text: 'Indicazione per sezionamento morosità', fillColor:this.fillColor},{text: this.datiRete.sezionamentoMorosita}]);
        dataList.push([{text: 'Presenza Produzione Energia (Gas)', fillColor:this.fillColor},{text: this.datiRete.presenzaEnergia}]);
        dataList.push([{text: 'Flusso', fillColor:this.fillColor},{text: this.datiRete.flusso}]);
        dataList.push([{text: 'Posizione', fillColor:this.fillColor},{text: this.datiRete.posizione}]);

        var page = [
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
                    widths: [250,'*'],
                    body: 
                    dataList
                }
            }
        ];
    
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
                        {	border:[false,true,true,true],text: 'DATI RETE PM', fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor}],
                ]
            }
        },
        {   style: 'separator',
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
                widths: [100, '*'],
                body: [
                    [{
                        text:'ADS',
                        fillColor:this.fillColor
                    }, 
                    {
                        text:value.download.ads.CodiceAds
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
                widths: [100,'*'],
                body: [
                    [{
                        text:'ODL',
                        fillColor:this.fillColor
                    }, 
                    {
                        text: this.odlCode
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
                widths: [100, '*'],
                body: [
                    [{
                        text:'Indirizzo',
                        fillColor:this.fillColor
                    }, 
                    {
                        text:this.indirizzo
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
                            [{text: this.datiRete.TipoServizio, fontSize: 20,bold:true, alignment: 'center', fillColor:this.fillColor,  border: [ true, false, true, false]}],
                            [{text: '', fontSize: 20,bold:true, alignment: 'center',  border: [ true, false, true, false]}],
                            [{	image: this.icon,
                                width: 60, alignment:'center', border: [ true, false, true, false]}],
                            [{text: '', fontSize: 20,bold:true, alignment: 'center',  border: [ true, false, true, true]}]
                    ]
                }
            }    
        ];
        return page;
    }


    getAllDoc(page1, page2){
        var retPage = [];
         for(let item of page1){
            retPage.push(item);
        }
        for(let item of page2){
            retPage.push(item);
        }
        return retPage;
    }

    public getTesProvDomDefinition(value): Promise<any> {

        this.odlCode = value.download.ads.CodiceOdl != null || undefined ? value.download.ads.CodiceOdl : ' '

        this.datiRete = new DatiRete(value.dati.form)

        // sostituzione dati null, undefined e "" con " "
        for(let key in this.datiRete) {
            if(this.datiRete[key] == undefined || this.datiRete[key] == null || this.datiRete[key] ==""){
                this.datiRete[key] = " ";
            }
        }

        switch(this.datiRete.TipoServizio ){
            case('ACQUA'):{
              this.fillColor = "#fcce5";
              break;
            }
            case('GAS'):{
              this.fillColor = "#ead383";
              break;
            }
            case('TLR'):{
              this.fillColor = "#ead383";
              break;
            }
            case('ENERGIA_ELETTRICA'):{
              this.fillColor = "#f8eebe";
              break;
            }
          }

        this.header = {
        style: "header",
        table: {
            widths: ["*"],
            body: [[{
                        image: value.download.ads.Logo,
                        width: 150,
                        border: [false, false, false, false]
                    }
                ]]
            }
        };

        // Two logo header layout

        // this.header = {
        //     style: "header",
        //     table: {
        //         widths: ["*", 100],
        //         body: [[{
        //                     image: value.dati.form.LogoSx,
        //                     width: 150,
        //                     border: [false, false, false, false]
        //                 },
        //                 {
        //                     image: value.dati.form.LogoDx,
        //                     margin: [-30,10],
        //                     width: 125,
        //                     border: [false, false, false, false]
        //                 }
        //             ]]
        //         }
        //     };

        this.icon = value.download.ads.getIconBase64()
        this.indirizzo = value.download.ads.Indirizzo.toString();

        return new Promise((resolve, reject) => {    

        var page1 = this.getPage1(value);
        var page2 = this.getPage2(value);

        var contPdf = this.getAllDoc(page1, page2);
            var docDefinition = {
                    footer: function(currentPage, pageCount) {
                        return {
                            "table": {
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
                                    "text": "Data Redazione: "+value.dati.form.dataRedazione,
                                    "border": [false, false, false, false],
                                }, {
                                    "text": "",
                                        "border": [false, false, false, false],
                                }
                            ]]
                            }
                        }
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