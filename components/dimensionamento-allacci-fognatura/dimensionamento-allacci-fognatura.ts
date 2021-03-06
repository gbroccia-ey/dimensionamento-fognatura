import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { DimensionamentoAllacciFognatura, UnitaSingola, UnitaDeroga, ContatoreAntincendio, ParametriAcqueNere, ParametriAcqueBianche, ParametriVincoli } from '../../models/dimensionamento-allacci';
import { Ads } from '../../models/ads';
import { MathJs } from "mathjs";
// import { AdsService } from '../../services/ads-service';


class DefluxScaleRow{
  h_r:number;
  Q_Qr:number;
  P_r:number;
  A_r2:number;
  Rh_r:number;
  V_Vr:number;
  
}


class DefluxScale{
    
    static correctionFactor: number = 0.5;

    constructor(){

    }

    static compute(h_r:number) : DefluxScaleRow{
      let res = new DefluxScaleRow();
      if (h_r > 0.0 && h_r <= 2.0){
        res.P_r = 2.0*Math.acos(1.0-h_r);
        res.A_r2 = 0.5*(res.P_r - Math.sin(res.P_r));   // =0,5*((2*ARCCOS(1-E202))-SEN(2*ARCCOS(1-E202)))
        res.Rh_r = res.A_r2 / res.P_r;
        res.V_Vr = Math.pow(res.Rh_r,(2.0/3.0))/Math.pow(DefluxScale.correctionFactor,(2.0/3.0));              // =+(H202^(2/3))/($L$502^(2/3))
        res.Q_Qr = (res.V_Vr*res.A_r2)/Math.PI;
        res.h_r = h_r;
      }
      return res;
    }
    
    static computeKval(allaccio:any) {
      //   =4*RADQ(9,81*(32/(C3*0,001))^(1/6))*(LOG((3,71*C3*0,001)/(D3*0,001)))
      let res = 4.0;
      res *= Math.sqrt(9.81*Math.pow((32.0/(allaccio.dinterno*0.001)),1.0/6.0));
      res *= Math.log10((3.71*allaccio.dinterno*0.001)/(allaccio.scabrezza*0.001));
      return res;
    }
}



/**
 * Generated class for the DimensionamentoAllacciFognaturaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'dimensionamento-allacci-fognatura',
  templateUrl: 'dimensionamento-allacci-fognatura.html'
})
export class DimensionamentoAllacciFognaturaComponent implements OnInit{
  lockUpdateAntincendio;

  @Input()
  ads: Ads;

  @Output()
  saveAction: EventEmitter<string>;


  rete_stradale = ['Acciaio DN 15',
  'Acciaio DN 20',
  'Acciaio DN 25',
  'Acciaio DN 27',
  'Acciaio DN 30',
  'Acciaio DN 32',
  'Acciaio DN 33',
  'Acciaio DN 35',
  'Acciaio DN 40',
  'Acciaio DN 42',
  'Acciaio DN 50',
  'Acciaio DN 55',
  'Acciaio DN 60',
  'Acciaio DN 63',
  'Acciaio DN 65',
  'Acciaio DN 68',
  'Acciaio DN 70',
  'Acciaio DN 75',
  'Acciaio DN 76',
  'Acciaio DN 80',
  'Acciaio DN 90',
  'Acciaio DN 100',
  'Acciaio DN 108',
  'Acciaio DN 110',
  'Acciaio DN 120',
  'Acciaio DN 125',
  'Acciaio DN 130',
  'Acciaio DN 140',
  'Acciaio DN 150',
  'Acciaio DN 160',
  'Acciaio DN 175',
  'Acciaio DN 184',
  'Acciaio DN 200',
  'Acciaio DN 225',
  'Acciaio DN 250',
  'Acciaio DN 275',
  'Acciaio DN 300',
  'Acciaio DN 350',
  'Acciaio DN 400',
  'Acciaio DN 450',
  'Acciaio DN 500',
  'Acciaio DN 503',
  'Acciaio DN 550',
  'Acciaio DN 600',
  'Acciaio DN 700',
  'Acciaio DN 750',
  'Acciaio DN 800',
  'Acciaio DN 900',
  'Acciaio DN 1000',
  'Acciaio DN 1200',
  'Acciaio DN 1400',
  'Acciaio DN 1500',
  'Bonna (cemento/acciaio) DN 200',
  'Bonna (cemento/acciaio) DN 400',
  'Bonna (cemento/acciaio) DN 700',
  'Fibrocemento - cemento amianto DN     20',
  'Fibrocemento - cemento amianto DN     25',
  'Fibrocemento - cemento amianto DN     32',
  'Fibrocemento - cemento amianto DN     40',
  'Fibrocemento - cemento amianto DN     50',
  'Fibrocemento - cemento amianto DN     60',
  'Fibrocemento - cemento amianto DN     63',
  'Fibrocemento - cemento amianto DN     65',
  'Fibrocemento - cemento amianto DN     70',
  'Fibrocemento - cemento amianto DN     75',
  'Fibrocemento - cemento amianto DN     80',
  'Fibrocemento - cemento amianto DN     90',
  'Fibrocemento - cemento amianto DN   100',
  'Fibrocemento - cemento amianto DN   110',
  'Fibrocemento - cemento amianto DN   125',
  'Fibrocemento - cemento amianto DN   140',
  'Fibrocemento - cemento amianto DN   150',
  'Fibrocemento - cemento amianto DN   160',
  'Fibrocemento - cemento amianto DN   175',
  'Fibrocemento - cemento amianto DN   200',
  'Fibrocemento - cemento amianto DN   225',
  'Fibrocemento - cemento amianto DN   250',
  'Fibrocemento - cemento amianto DN   275',
  'Fibrocemento - cemento amianto DN   300',
  'Fibrocemento - cemento amianto DN   350',
  'Fibrocemento - cemento amianto DN   375',
  'Fibrocemento - cemento amianto DN   400',
  'Fibrocemento - cemento amianto DN   450',
  'Fibrocemento - cemento amianto DN   500',
  'Fibrocemento - cemento amianto DN   600',
  'Fibrocemento - cemento amianto DN   700',
  'Fibrocemento - cemento amianto DN   800',
  'Fibrocemento - cemento amianto DN   900',
  'Fibrocemento - cemento amianto DN 1000',
  'Calcestruzzo DN     60',
  'Calcestruzzo DN   100',
  'Calcestruzzo DN   150',
  'Calcestruzzo DN   160',
  'Calcestruzzo DN   175',
  'Calcestruzzo DN   200',
  'Calcestruzzo DN   220',
  'Calcestruzzo DN   225',
  'Calcestruzzo DN   300',
  'Calcestruzzo DN   400',
  'Calcestruzzo DN   500',
  'Calcestruzzo DN 1000',
  'Calcestruzzo DN 4000',
  'Ghisa DN     11',
  'Ghisa DN     20',
  'Ghisa DN     25',
  'Ghisa DN     32',
  'Ghisa DN     40',
  'Ghisa DN     50',
  'Ghisa DN     60',
  'Ghisa DN     63',
  'Ghisa DN     65',
  'Ghisa DN     70',
  'Ghisa DN     75',
  'Ghisa DN     76',
  'Ghisa DN     80',
  'Ghisa DN     90',
  'Ghisa DN   100',
  'Ghisa DN   108',
  'Ghisa DN   110',
  'Ghisa DN   115',
  'Ghisa DN   125',
  'Ghisa DN   135',
  'Ghisa DN   140',
  'Ghisa DN   150',
  'Ghisa DN   160',
  'Ghisa DN   170',
  'Ghisa DN   175',
  'Ghisa DN   180',
  'Ghisa DN   200',
  'Ghisa DN   225',
  'Ghisa DN   250',
  'Ghisa DN   275',
  'Ghisa DN   280',
  'Ghisa DN   300',
  'Ghisa DN   325',
  'Ghisa DN   350',
  'Ghisa DN   355',
  'Ghisa DN   375',
  'Ghisa DN   400',
  'Ghisa DN   450',
  'Ghisa DN   475',
  'Ghisa DN   500',
  'Ghisa DN   550',
  'Ghisa DN   600',
  'Ghisa DN   700',
  'Ghisa DN   800',
  'Ghisa DN   900',
  'Ghisa DN 1000',
  'Ghisa DN 1200',
  'Piombo  15',
  'Piombo  20',
  'Piombo  25',
  'Piombo  27',
  'Piombo  30',
  'Piombo  32',
  'Piombo  35',
  'Piombo  40',
  'Piombo  50',
  'Piombo  60',
  'Piombo  63',
  'Piombo  110',
  'Polietilene dn   10',
  'Polietilene dn   11',
  'Polietilene dn   12',
  'Polietilene dn   14',
  'Polietilene dn   15',
  'Polietilene dn   16',
  'Polietilene dn   18',
  'Polietilene dn   20',
  'Polietilene dn   21',
  'Polietilene dn   25',
  'Polietilene dn   27',
  'Polietilene dn   30',
  'Polietilene dn   32',
  'Polietilene dn   35',
  'Polietilene dn   40',
  'Polietilene dn   42',
  'Polietilene dn   44',
  'Polietilene dn   50',
  'Polietilene dn   52',
  'Polietilene dn   53',
  'Polietilene dn   60',
  'Polietilene dn   63',
  'Polietilene dn   65',
  'Polietilene dn   68',
  'Polietilene dn   70',
  'Polietilene dn   74',
  'Polietilene dn   75',
  'Polietilene dn   80',
  'Polietilene dn   90',
  'Polietilene dn   96',
  'Polietilene dn 100',
  'Polietilene dn 110',
  'Polietilene dn 120',
  'Polietilene dn 125',
  'Polietilene dn 140',
  'Polietilene dn 147',
  'Polietilene dn 150',
  'Polietilene dn 160',
  'Polietilene dn 175',
  'Polietilene dn 180',
  'Polietilene dn 200',
  'Polietilene dn 225',
  'Polietilene dn 232',
  'Polietilene dn 250',
  'Polietilene dn 280',
  'Polietilene dn 300',
  'Polietilene dn 315',
  'Polietilene dn 350',
  'Polietilene dn 355',
  'Polietilene dn 400',
  'Polietilene dn 450',
  'Polietilene dn 560',
  'Polietilene dn 750',
  'Polietilene multistrato dn   16',
  'Polietilene multistrato dn   20',
  'Polietilene multistrato dn   25',
  'Polietilene multistrato dn   32',
  'Polietilene multistrato dn   40',
  'Polietilene multistrato dn   50',
  'Polietilene multistrato dn   63',
  'Polietilene multistrato dn   75',
  'Polietilene multistrato dn   80',
  'Polietilene multistrato dn   90',
  'Polietilene multistrato dn 100',
  'Polietilene multistrato dn 110',
  'Polietilene multistrato dn 125',
  'Polietilene multistrato dn 160',
  'Polietilene multistrato dn 200',
  'Pvc biorientato dn 110',
  'Pvc biorientato dn 315',
  'Pvc dn    15',
  'Pvc dn    18',
  'Pvc dn    20',
  'Pvc dn    25',
  'Pvc dn    30',
  'Pvc dn    32',
  'Pvc dn    35',
  'Pvc dn    40',
  'Pvc dn    50',
  'Pvc dn    60',
  'Pvc dn    63',
  'Pvc dn    65',
  'Pvc dn    75',
  'Pvc dn    80',
  'Pvc dn    90',
  'Pvc dn 100',
  'Pvc dn 110',
  'Pvc dn 125',
  'Pvc dn 130',
  'Pvc dn 140',
  'Pvc dn 150',
  'Pvc dn 160',
  'Pvc dn 175',
  'Pvc dn 180',
  'Pvc dn 200',
  'Pvc dn 220',
  'Pvc dn 225',
  'Pvc dn 250',
  'Pvc dn 280',
  'Pvc dn 300',
  'Pvc dn 315',
  'Pvc dn 350',
  'Pvc dn 355',
  'Pvc dn 400',
  'Pvc dn 500',
  'Vetroresina dn   75',
  'Vetroresina dn 100',
  'Vetroresina dn 125',
  'Vetroresina dn 150',
  'Vetroresina dn 250',
  'Vetroresina dn 300',
  'Vetroresina dn 315',
  'Vetroresina dn 350',
  'Vetroresina dn 355',
  'Vetroresina dn 400',
  'Vetroresina dn 500'  
                  ];

allacciEsistentiArray = [];

allacciNuoviArray = []

tableParams = {
  sumUnitaScarico: 10.0,                  // Somma Unità di scarico
  freqCoef: 0.5,                          // Coefficiente di frequenza (contemporaneità) per appartamenti / locande / uffici
  dividers: [1.0,5.0,30.0,250.0,100.0],   // Divisori per calcolo delle Unità Immobiliari equivalenti a partire da varie tipologie di utenze
  affluxCoef:[1.0,0.6,0.5,0.1],           // Coefficienti di afflusso	
  maxRainIntensity: 100.0,                // Intensità massima di pioggia [mm/h]
  uiEqFisseAcqueBianche: 2.0,             // UIeq fisse in presenza di ACQUE BIANCHE
  def_h_r : 1.4,
}

allacciArray = [
 /* 000 */ {"nome":"PVC SN8 DN110",                      "desterno":110.0, "dinterno":103.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 001 */ {"nome":"PVC SN8 DN125",                      "desterno":125.0, "dinterno":117.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 002 */ {"nome":"PVC SN8 DN160",                      "desterno":160.0, "dinterno":150.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 003 */ {"nome":"PVC SN8 DN200",                      "desterno":200.0, "dinterno":188.2, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 004 */ {"nome":"PVC SN8 DN250",                      "desterno":250.0, "dinterno":235.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 005 */ {"nome":"PVC SN8 DN315",                      "desterno":315.0, "dinterno":296.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 006 */ {"nome":"PVC SN8 DN355",                      "desterno":355.0, "dinterno":334.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 007 */ {"nome":"PVC SN8 DN400",                      "desterno":400.0, "dinterno":376.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 008 */ {"nome":"PVC SN8 DN450",                      "desterno":450.0, "dinterno":423.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 009 */ {"nome":"PVC SN8 DN500",                      "desterno":500.0, "dinterno":470.8, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 010 */ {"nome":"PVC SN8 DN630",                      "desterno":630.0, "dinterno":593.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 011 */ {"nome":"PVC SN8 DN710",                      "desterno":710.0, "dinterno":668.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 012 */ {"nome":"PVC SN8 DN800",                      "desterno":800.0, "dinterno":753.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 013 */ {"nome":"PVC STRUTTURATO SN8 DN200",          "desterno":200.0, "dinterno":187.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 014 */ {"nome":"PVC STRUTTURATO SN8 DN250",          "desterno":250.0, "dinterno":234.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 015 */ {"nome":"PVC STRUTTURATO SN8 DN315",          "desterno":315.0, "dinterno":295.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 016 */ {"nome":"PVC STRUTTURATO SN8 DN400",          "desterno":400.0, "dinterno":375,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 017 */ {"nome":"PVC STRUTTURATO SN8 DN500",          "desterno":500.0, "dinterno":469,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 018 */ {"nome":"PVC STRUTTURATO SN8 DN630",          "desterno":630.0, "dinterno":591.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 019 */ {"nome":"PVC STRUTTURATO SN8 DN710",          "desterno":710.0, "dinterno":660,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 020 */ {"nome":"PVC STRUTTURATO SN8 DN800",          "desterno":800.0, "dinterno":751.1, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 021 */ {"nome":"PVC STRUTTURATO SN8 DN900",          "desterno":900.0, "dinterno":844, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 022 */ {"nome":"PVC STRUTTURATO SN8 DN1000",         "desterno":1000.0,"dinterno":944, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90},
 /* 023 */ {"nome":"PE x scarichi fognari PN3.2 DN110",  "desterno":110,   "dinterno":103.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 024 */ {"nome":"PE x scarichi fognari PN3.2 DN125",  "desterno":125,   "dinterno":117.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 025 */ {"nome":"PE x scarichi fognari PN3.2 DN140",  "desterno":140,   "dinterno":131.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 026 */ {"nome":"PE x scarichi fognari PN3.2 DN160",  "desterno":160,   "dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 027 */ {"nome":"PE x scarichi fognari PN3.2 DN180",  "desterno":180,   "dinterno":168.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 028 */ {"nome":"PE x scarichi fognari PN3.2 DN200",  "desterno":200,   "dinterno":187.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 029 */ {"nome":"PE x scarichi fognari PN3.2 DN225",  "desterno":225,   "dinterno":211.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 030 */ {"nome":"PE x scarichi fognari PN3.2 DN250",  "desterno":250,   "dinterno":234.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 031 */ {"nome":"PE x scarichi fognari PN3.2 DN280",  "desterno":280,   "dinterno":262.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 032 */ {"nome":"PE x scarichi fognari PN3.2 DN315",  "desterno":315,   "dinterno":295.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 033 */ {"nome":"PE x scarichi fognari PN3.2 DN355",  "desterno":355,   "dinterno":332.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 034 */ {"nome":"PE x scarichi fognari PN3.2 DN400",  "desterno":400,   "dinterno":375.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 035 */ {"nome":"PE x scarichi fognari PN3.2 DN450",  "desterno":450,   "dinterno":422.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 036 */ {"nome":"PE x scarichi fognari PN3.2 DN500",  "desterno":500,   "dinterno":469.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 037 */ {"nome":"PE x scarichi fognari PN3.2 DN560",  "desterno":560,   "dinterno":525.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 038 */ {"nome":"PE x scarichi fognari PN3.2 DN630",  "desterno":630,   "dinterno":590.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 039 */ {"nome":"PE x scarichi fognari PN3.2 DN710",  "desterno":710,   "dinterno":666.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 040 */ {"nome":"PE x scarichi fognari PN3.2 DN800",  "desterno":800,   "dinterno":750.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 041 */ {"nome":"PE x scarichi fognari PN3.2 DN900",  "desterno":900,   "dinterno":844.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 042 */ {"nome":"PE x scarichi fognari PN3.2 DN1000", "desterno":1000,  "dinterno":938.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 043 */ {"nome":"PE100 PN10 DN50",                    "desterno":50,    "dinterno":44.0,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 044 */ {"nome":"PE100 PN10 DN63",                    "desterno":63,    "dinterno":55.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 045 */ {"nome":"PE100 PN10 DN75",                    "desterno":75,    "dinterno":66.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 046 */ {"nome":"PE100 PN10 DN90",                    "desterno":90,    "dinterno":79.2,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 047 */ {"nome":"PE100 PN10 DN110",                   "desterno":110,"dinterno":96.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 048 */ {"nome":"PE100 PN10 DN125",                   "desterno":125,"dinterno":110.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 049 */ {"nome":"PE100 PN10 DN140",                   "desterno":140,"dinterno":123.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 050 */ {"nome":"PE100 PN10 DN160",                   "desterno":160,"dinterno":141.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 051 */ {"nome":"PE100 PN10 DN180",                   "desterno":180,"dinterno":158.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 052 */ {"nome":"PE100 PN10 DN200",                   "desterno":200,"dinterno":176.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 053 */ {"nome":"PE100 PN10 DN225",                   "desterno":225,"dinterno":198.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 054 */ {"nome":"PE100 PN10 DN250",                   "desterno":250,"dinterno":220.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 055 */ {"nome":"PE100 PN10 DN280",                   "desterno":280,"dinterno":246.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 056 */ {"nome":"PE100 PN10 DN315",                   "desterno":315,"dinterno":277.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 057 */ {"nome":"PE100 PN10 DN355",                   "desterno":355,"dinterno":312.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 058 */ {"nome":"PE100 PN10 DN400",                   "desterno":400,"dinterno":352.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 059 */ {"nome":"PE100 PN10 DN450",                   "desterno":450,"dinterno":396.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 060 */ {"nome":"PE100 PN10 DN500",                   "desterno":500,"dinterno":440.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 061 */ {"nome":"PE100 PN10 DN560",                   "desterno":560,"dinterno":493.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 062 */ {"nome":"PE100 PN10 DN630",                   "desterno":630,"dinterno":555.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 063 */ {"nome":"PE100 PN10 DN710",                   "desterno":710,"dinterno":625.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 064 */ {"nome":"PE100 PN10 DN800",                   "desterno":800,"dinterno":705.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 065 */ {"nome":"PE100 PN10 DN900",                   "desterno":900,"dinterno":793.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 066 */ {"nome":"PE100 PN10 DN1000",                  "desterno":1000,"dinterno":881.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 067 */ {"nome":"PE100 PN16 DN20",                    "desterno":20,"dinterno":16.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
 /* 068 */ {"nome":"PE100 PN16 DN25",                    "desterno":25,"dinterno":20.4,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 069 */ {"nome":"PE100 PN16 DN32",                    "desterno":32,"dinterno":26.0,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 070 */ {"nome":"PE100 PN16 DN40",                    "desterno":40,"dinterno":32.6,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 071 */ {"nome":"PE100 PN16 DN50",                    "desterno":50,"dinterno":40.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 072 */ {"nome":"PE100 PN16 DN63",                    "desterno":63,"dinterno":51.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 073 */ {"nome":"PE100 PN16 DN75",                    "desterno":75,"dinterno":61.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 074 */ {"nome":"PE100 PN16 DN90",                    "desterno":90,"dinterno":73.6,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 075 */ {"nome":"PE100 PN16 DN110",                   "desterno":110,"dinterno":90.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":0},
 /* 076 */ {"nome":"PE100 PN16 DN125",                   "desterno":125,"dinterno":102.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 077 */ {"nome":"PE100 PN16 DN140",                   "desterno":140,"dinterno":114.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 078 */ {"nome":"PE100 PN16 DN160",                   "desterno":160,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 079 */ {"nome":"PE100 PN16 DN180",                   "desterno":180,"dinterno":147.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 080 */ {"nome":"PE100 PN16 DN200",                   "desterno":200,"dinterno":163.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 081 */ {"nome":"PE100 PN16 DN225",                   "desterno":225,"dinterno":184.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 082 */ {"nome":"PE100 PN16 DN250",                   "desterno":250,"dinterno":204.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 083 */ {"nome":"PE100 PN16 DN280",                   "desterno":280,"dinterno":229.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 084 */ {"nome":"PE100 PN16 DN315",                   "desterno":315,"dinterno":257.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 085 */ {"nome":"PE100 PN16 DN355",                   "desterno":355,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 086 */ {"nome":"PE100 PN16 DN400",                   "desterno":400,"dinterno":327.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 087 */ {"nome":"PE100 PN16 DN450",                   "desterno":450,"dinterno":368.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 088 */ {"nome":"PE100 PN16 DN500",                   "desterno":500,"dinterno":409.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 089 */ {"nome":"PE100 PN16 DN560",                   "desterno":560,"dinterno":458.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 090 */ {"nome":"PE100 PN16 DN630",                   "desterno":630,"dinterno":515.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 091 */ {"nome":"PE100 PN25 DN20",                    "desterno":20,"dinterno":14.0,"scabrezza":0.02,"kval":81,"scabrezzaGS":90},
 /* 092 */ {"nome":"PE100 PN25 DN25",                    "desterno":25,"dinterno":18.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
 /* 093 */ {"nome":"PE100 PN25 DN32",                    "desterno":32,"dinterno":23.2,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 094 */ {"nome":"PE100 PN25 DN40",                    "desterno":40,"dinterno":29.0,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 095 */ {"nome":"PE100 PN25 DN50",                    "desterno":50,"dinterno":36.2,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 096 */ {"nome":"PE100 PN25 DN63",                    "desterno":63,"dinterno":45.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 097 */ {"nome":"PE100 PN25 DN75",                    "desterno":75,"dinterno":54.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 098 */ {"nome":"PE100 PN25 DN90",                    "desterno":90,"dinterno":65.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 099 */ {"nome":"PE100 PN25 DN110",                   "desterno":110,"dinterno":79.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 100 */ {"nome":"PE100 PN25 DN125",                   "desterno":125,"dinterno":90.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 101 */ {"nome":"PE100 PN25 DN140",                   "desterno":140,"dinterno":101.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 102 */ {"nome":"PE100 PN25 DN160",                   "desterno":160,"dinterno":116.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 103 */ {"nome":"PE100 PN25 DN180",                   "desterno":180,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 104 */ {"nome":"PE100 PN25 DN200",                   "desterno":200,"dinterno":145.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 105 */ {"nome":"PE100 PN25 DN225",                   "desterno":225,"dinterno":163.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 106 */ {"nome":"PE100 PN25 DN250",                   "desterno":250,"dinterno":201.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 107 */ {"nome":"PE100 PN25 DN280",                   "desterno":280,"dinterno":203.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 108 */ {"nome":"PE100 PN25 DN315",                   "desterno":315,"dinterno":228.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 109 */ {"nome":"PE100 PN25 DN355",                   "desterno":355,"dinterno":258.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 110 */ {"nome":"PE100 PN25 DN400",                   "desterno":400,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 111 */ {"nome":"PE100 PN25 DN450",                   "desterno":450,"dinterno":327.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 112 */ {"nome":"PE CORRUGATO SN8 DN125",             "desterno":125,"dinterno":105.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 113 */ {"nome":"PE CORRUGATO SN8 DN160",             "desterno":160,"dinterno":137.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 114 */ {"nome":"PE CORRUGATO SN8 DN200",             "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 115 */ {"nome":"PE CORRUGATO SN8 DN250",             "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 116 */ {"nome":"PE CORRUGATO SN8 DN315",             "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 117 */ {"nome":"PE CORRUGATO SN8 DN400",             "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 118 */ {"nome":"PE CORRUGATO SN8 DN500",             "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 119 */ {"nome":"PE CORRUGATO SN8 DN630",             "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 120 */ {"nome":"PE CORRUGATO SN8 DN800",             "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 121 */ {"nome":"PE CORRUGATO SN8 DN1000",            "desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 122 */ {"nome":"PE CORRUGATO SN8 DN1200",            "desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 123 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN200", "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 124 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN250", "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 125 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN315", "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 126 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN400", "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 127 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN500", "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 128 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN630", "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 129 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN800", "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 130 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN1000","desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 131 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN1200","desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 132 */ {"nome":"CLS DN300",                          "desterno":300,"dinterno":300.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
 /* 133 */ {"nome":"CLS DN400",                          "desterno":400,"dinterno":400.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
 /* 134 */ {"nome":"CLS DN500",                          "desterno":500,"dinterno":500.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
 /* 135 */ {"nome":"CLS DN600",                          "desterno":600,"dinterno":600.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
 /* 136 */ {"nome":"CLS DN800",                          "desterno":800,"dinterno":800.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
 /* 137 */ {"nome":"CLS DN1000",                         "desterno":1000,"dinterno":1000.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
 /* 138 */ {"nome":"CLS DN1200",                         "desterno":1200,"dinterno":1200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 139 */ {"nome":"CLS DN1400",                         "desterno":1400,"dinterno":1400.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 140 */ {"nome":"CLS DN1600",                         "desterno":1600,"dinterno":1600.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 141 */ {"nome":"CLS DN1800",                         "desterno":1800,"dinterno":1800.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 142 */ {"nome":"CLS DN2000",                         "desterno":2000,"dinterno":2000.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 143 */ {"nome":"CLS DN2200",                         "desterno":2200,"dinterno":2200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 144 */ {"nome":"CLS DN2400",                         "desterno":2400,"dinterno":2400.0,"scabrezza":0.4,"kval":68,"scabrezzaGS":90},
 /* 145 */ {"nome":"GHISA DN40",                         "desterno":40,"dinterno":40.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
 /* 146 */ {"nome":"GHISA DN50",                         "desterno":50,"dinterno":50.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
 /* 147 */ {"nome":"GHISA DN75",                         "desterno":75,"dinterno":75.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
 /* 148 */ {"nome":"GHISA DN80",                         "desterno":80,"dinterno":80.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
 /* 149 */ {"nome":"GHISA DN100",                        "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 150 */ {"nome":"GHISA DN125",                        "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 151 */ {"nome":"GHISA DN150",                        "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
 /* 152 */ {"nome":"GHISA DN200",                        "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 153 */ {"nome":"GHISA DN250",                        "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 154 */ {"nome":"GHISA DN300",                        "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 155 */ {"nome":"GHISA DN350",                        "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 156 */ {"nome":"GHISA DN400",                        "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 157 */ {"nome":"GHISA DN450",                        "desterno":450,"dinterno":450.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 158 */ {"nome":"GHISA DN500",                        "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 159 */ {"nome":"GHISA DN600",                        "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 160 */ {"nome":"GHISA DN700",                        "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 161 */ {"nome":"GHISA DN800",                        "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 162 */ {"nome":"GHISA DN900",                        "desterno":900,"dinterno":900.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 163 */ {"nome":"GHISA DN1000",                       "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 164 */ {"nome":"GHISA DN1100",                       "desterno":1100,"dinterno":1100.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 165 */ {"nome":"GHISA DN1200",                       "desterno":1200,"dinterno":1200.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 166 */ {"nome":"GHISA DN1400",                       "desterno":1400,"dinterno":1400.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 167 */ {"nome":"GHISA DN1500",                       "desterno":1500,"dinterno":1500.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 168 */ {"nome":"GHISA DN1600",                       "desterno":1600,"dinterno":1600.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 169 */ {"nome":"GHISA DN1800",                       "desterno":1800,"dinterno":1800.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 170 */ {"nome":"GHISA DN2000",                       "desterno":2000,"dinterno":2000.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 171 */ {"nome":"GRES DN100",                         "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 172 */ {"nome":"GRES DN125",                         "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 173 */ {"nome":"GRES DN150",                         "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
 /* 174 */ {"nome":"GRES DN200",                         "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 175 */ {"nome":"GRES DN250",                         "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 176 */ {"nome":"GRES DN300",                         "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 177 */ {"nome":"GRES DN350",                         "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 178 */ {"nome":"GRES DN400",                         "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 179 */ {"nome":"GRES DN500",                         "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 180 */ {"nome":"GRES DN600",                         "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 181 */ {"nome":"GRES DN700",                         "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 182 */ {"nome":"GRES DN800",                         "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 183 */ {"nome":"GRES DN1000",                        "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 184 */ {"nome":"PRFV (vetroresina) DN150",           "desterno":150,"dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 185 */ {"nome":"PRFV (vetroresina) DN200",           "desterno":200,"dinterno":200.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 186 */ {"nome":"PRFV (vetroresina) DN250",           "desterno":250,"dinterno":250.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 187 */ {"nome":"PRFV (vetroresina) DN300",           "desterno":300,"dinterno":300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 188 */ {"nome":"PRFV (vetroresina) DN350",           "desterno":350,"dinterno":350.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 189 */ {"nome":"PRFV (vetroresina) DN400",           "desterno":400,"dinterno":400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 190 */ {"nome":"PRFV (vetroresina) DN500",           "desterno":500,"dinterno":500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 191 */ {"nome":"PRFV (vetroresina) DN600",           "desterno":600,"dinterno":600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 192 */ {"nome":"PRFV (vetroresina) DN650",           "desterno":650,"dinterno":650.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 193 */ {"nome":"PRFV (vetroresina) DN700",           "desterno":700,"dinterno":700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 194 */ {"nome":"PRFV (vetroresina) DN750",           "desterno":750,"dinterno":750.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 195 */ {"nome":"PRFV (vetroresina) DN800",           "desterno":800,"dinterno":800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 196 */ {"nome":"PRFV (vetroresina) DN850",           "desterno":850,"dinterno":850.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 197 */ {"nome":"PRFV (vetroresina) DN900",           "desterno":900,"dinterno":900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 198 */ {"nome":"PRFV (vetroresina) DN950",           "desterno":950,"dinterno":950.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 199 */ {"nome":"PRFV (vetroresina) DN1000",          "desterno":1000.0,"dinterno":1000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 200 */ {"nome":"PRFV (vetroresina) DN1100",          "desterno":1100.0,"dinterno":1100.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 201 */ {"nome":"PRFV (vetroresina) DN1200",          "desterno":1200.0,"dinterno":1200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 202 */ {"nome":"PRFV (vetroresina) DN1300",          "desterno":1300.0,"dinterno":1300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 203 */ {"nome":"PRFV (vetroresina) DN1400",          "desterno":1400.0,"dinterno":1400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 204 */ {"nome":"PRFV (vetroresina) DN1500",          "desterno":1500.0,"dinterno":1500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 205 */ {"nome":"PRFV (vetroresina) DN1600",          "desterno":1600.0,"dinterno":1600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 206 */ {"nome":"PRFV (vetroresina) DN1700",          "desterno":1700.0,"dinterno":1700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 207 */ {"nome":"PRFV (vetroresina) DN1800",          "desterno":1800.0,"dinterno":1800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 208 */ {"nome":"PRFV (vetroresina) DN1900",          "desterno":1900.0,"dinterno":1900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 209 */ {"nome":"PRFV (vetroresina) DN2000",          "desterno":2000.0,"dinterno":2000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 210 */ {"nome":"PRFV (vetroresina) DN2200",          "desterno":2200.0,"dinterno":2200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 211 */ {"nome":"PRFV (vetroresina) DN2400",          "desterno":2400.0,"dinterno":2400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 212 */ {"nome":"PRFV (vetroresina) DN2500",          "desterno":2500.0,"dinterno":2500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 213 */ {"nome":"PRFV (vetroresina) DN2600",          "desterno":2600.0,"dinterno":2600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 214 */ {"nome":"PRFV (vetroresina) DN2700",          "desterno":2700.0,"dinterno":2700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 215 */ {"nome":"PRFV (vetroresina) DN2800",          "desterno":2800.0,"dinterno":2800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 216 */ {"nome":"PRFV (vetroresina) DN3000",          "desterno":3000.0,"dinterno":3000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90}
  ];




constructor() {
  this.saveAction = new EventEmitter<string>();
  console.log('Hello DimensionamentoAllacciFognaturaComponent Component');
  this.allacciArray.forEach((part,index,arr)=>{
    arr[index].kval = DefluxScale.computeKval(arr[index]);
  });
}  

ngOnInit() {
    if(this.ads.DimensionamentoAllacciFognatura) {
      this.ads.DimensionamentoAllacciFognatura = this.ads.DimensionamentoAllacciFognatura;

      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.nome) {
        for(let allEs of this.allacciEsistentiArray){
          if(allEs.nome == this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.nome) this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente = allEs;
        }
      }

    }
    else {
      var arrayContatore = new Array<ContatoreAntincendio>();
      arrayContatore.push(new ContatoreAntincendio(undefined,"",undefined,undefined));
      arrayContatore.push(new ContatoreAntincendio(undefined,"",undefined,undefined));
      arrayContatore.push(new ContatoreAntincendio(undefined,"",undefined,undefined));
      arrayContatore.push(new ContatoreAntincendio(undefined,"",undefined,undefined));
          //this.ads.DimensionamentoAllacciFognatura.RichiesteNonDomestiche.push(new RichiestaNonDomestica("G4", 0, 0)); 
      var AllacciamentoNuovo1 = {... this.allacciArray[2]};   // PVC SN8 DN160
      var AllacciamentoNuovo2 = {... this.allacciArray[3]};   // PVC SN8 DN200
      var AllacciamentoNuovo3 = {... this.allacciArray[124]}; // POLIPROPILENE CORRUGATO SN16 DN250
      var AllacciamentoNuovo4 = {... this.allacciArray[175]}; // GRES DN250
      var AllacciamentoNuovo5 = {... this.allacciArray[6]};   // PVC SN8 DN355
      var AllacciamentoNuovo6 = {};
      var AllacciamentoEsistente = {};
     
      this.ads.DimensionamentoAllacciFognatura = new DimensionamentoAllacciFognatura(
        // old parameters
        this.rete_stradale[0], 0, 0, 0,new UnitaSingola(0,""), new UnitaDeroga(0,""), arrayContatore,0,0,0,AllacciamentoNuovo1,AllacciamentoNuovo2,AllacciamentoNuovo3,AllacciamentoNuovo4,AllacciamentoNuovo5,AllacciamentoNuovo6,AllacciamentoEsistente,{},
        // old parameters
        new ParametriAcqueNere(0,0,0,0,0,0,0),new ParametriAcqueBianche(0,0,0,0,0,0,0,0), new ParametriVincoli(0,0,1.0,1.0,0,0),
        );  
        this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1);
        this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2);
        this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3);
        this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4);
        this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5);
        //this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6);
        
        //this.allacciEsistentiArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente);
        
        this.updateVincoli();
        
    }
  }

  updateAcqueNere(){
    if (this.ads.DimensionamentoAllacciFognatura){
      let sum = this.ads.DimensionamentoAllacciFognatura.AcqueNere.sumEq(this.tableParams.dividers);
      this.ads.DimensionamentoAllacciFognatura.AcqueNere.portata = this.tableParams.freqCoef*Math.sqrt(sum*this.tableParams.sumUnitaScarico);
      this.ads.DimensionamentoAllacciFognatura.AcqueNere.sommaUIeq = sum;
      this.updateVincoli();
    }
  } 

  updateAcqueBianche(){
    if (this.ads.DimensionamentoAllacciFognatura){
      let ab = this.ads.DimensionamentoAllacciFognatura.AcqueBianche;
      ab.portataImpermeabili = ((Number(ab.supImpermeabili)*this.tableParams.affluxCoef[0])*this.tableParams.maxRainIntensity)/3600.0;
      ab.portataSemipermeabili = ((Number(ab.supSemipermeabili)*this.tableParams.affluxCoef[1])*this.tableParams.maxRainIntensity)/3600.0;
      ab.portata = ab.portataImpermeabili + ab.portataSemipermeabili + Number(ab.portateLimitate);
      
      ab.uiEqFisse = (ab.portata > 0)? this.tableParams.uiEqFisseAcqueBianche:0;
      ab.sommaUIeq = ab.uiEqFisse;
      this.ads.DimensionamentoAllacciFognatura.AcqueBianche = ab;

      this.updateVincoli();
    }
  } 

  updateVincoli(){
    if (this.ads.DimensionamentoAllacciFognatura){
      var self = this;

      let vincoli = this.ads.DimensionamentoAllacciFognatura.Vincoli;
      vincoli.portataMista = this.ads.DimensionamentoAllacciFognatura.AcqueBianche.portata + this.ads.DimensionamentoAllacciFognatura.AcqueNere.portata;
      vincoli.totaleUIeq = this.ads.DimensionamentoAllacciFognatura.AcqueBianche.sommaUIeq + this.ads.DimensionamentoAllacciFognatura.AcqueNere.sommaUIeq;
      vincoli.pendenza = (+vincoli.lunghezza > 0)? +vincoli.dislivello/+vincoli.lunghezza : 1.0;
      let deflux = DefluxScale.compute(this.tableParams.def_h_r);
      
      // = ((($C$17/1000)/(90*(Tabelle!$G$341)*((Tabelle!$H$341)^(2/3))*RADQ(FOGNATURA!$C$21)))^(3/8))*2*1000
      vincoli.diamIntMinimo = Math.pow(((vincoli.portataMista/1000.0)/(90.0*deflux?.A_r2*(Math.pow(deflux.Rh_r,(2.0/3.0)))*Math.sqrt(vincoli.pendenza))),(3.0/8.0))*2000.0;  
      
      this.allacciNuoviArray.forEach((part,index,allacci) =>{
        if (allacci[index]?.nome){
          self.updateAllacciamento(allacci[index]);
        }
      });
      self.updateAllacciamento(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente);
      
      
    }

  } 

  calcolaPortataEVelocita(dim,percentage){
    console.log("calcola Portata e Velocita");
    // Portata
    /*
     3600*(
        CERCA.VERT((2*C9/100);$C$201:$K$401;2;FALSO)*
        $D$5*
        RADQ($C$2)*
        PI.GRECO()*
        ((($C$5/1000)^2) / 4)*
        (($C$5/4000)^(2/3))
      )/3.6
    */
    let deflux = DefluxScale.compute(2.0*percentage/100.0);
    let portata = (deflux.Q_Qr);
    portata *= dim.kval;
    portata *= Math.sqrt(this.ads.DimensionamentoAllacciFognatura.Vincoli.pendenza);
    portata *= Math.PI;
    portata *= (Math.pow(dim.dinterno/1000.0,2) / 4.0);
    portata *= Math.pow(dim.dinterno/4000.0,(2.0/3.0));
    portata *= 1000.0;

    // Velocita
    /* =+(((CERCA.VERT((2*C9/100);$C$201:$K$401;6;FALSO))*(($C$5/2000)))^(2/3))*$D$5*($C$2^0,5) */
    let velocita = Math.pow((deflux.Rh_r * dim.dinterno/2000.0),2.0/3.0);
    velocita *= dim.kval;
    velocita *= Math.sqrt(this.ads.DimensionamentoAllacciFognatura.Vincoli.pendenza);

    let res = {
      portata: portata,
      velocita: velocita,
      percentuale: percentage
    }  

    return res;
  }

  

  updateAllacciamento(allacciamento){
    if (allacciamento.nome){
      console.log("update Allacciamento")
      allacciamento.portata = this.calcolaPortataEVelocita(allacciamento,70.0).portata;

      if (this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista > 0){
        if (allacciamento.portata >= this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista){
          // Calcola percRiempimento e velocita per approssimazioni successive
          let min : any = false,
          max : any = false,
          portataMista = this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista;

          for (let k=5.0; k<= 100.0; k += 5.0){
            let val = this.calcolaPortataEVelocita(allacciamento,k);
            if (val.portata <= portataMista){
                min = val;
              }
            else if (max === false){
              if (val.portata >= portataMista){
                max = val;
              }
            }
          }
          if (min && max){
            allacciamento.percRiempimento = min.percentuale + ' - ' + max.percentuale + ' %';
            allacciamento.velocita = min.velocita.toFixed(2) + ' - ' + max.velocita.toFixed(2) + ' m/s';
            allacciamento.risultato = "CONDOTTA IDONEA"
          }
          else if (max){
            allacciamento.percRiempimento = '0 - ' + max.percentuale + ' %';
            allacciamento.velocita = '0 - ' + max.velocita.toFixed(2) + ' m/s';
            allacciamento.risultato = "CONDOTTA IDONEA"
          }
          else {
            allacciamento.percRiempimento = "DN INSUFFICIENTE";
            allacciamento.velocita = "DN INSUFFICIENTE";
            allacciamento.risultato = "CONDOTTA NON IDONEA"
          }
        }
        else {
          allacciamento.percRiempimento = "DN INSUFFICIENTE";
          allacciamento.velocita = "DN INSUFFICIENTE";
          allacciamento.risultato = "CONDOTTA NON IDONEA"
        }
      }
      else {
        allacciamento.percRiempimento = "ERRORE: PORTATA COMPLESSIVA NULLA";
        allacciamento.velocita = "ERRORE: PORTATA COMPLESSIVA NULLA";
        allacciamento.risultato = "ERRORE"
      }

      
  
    }

  }
  
  setColorForMessage(msg){
    switch(msg){
      case 'DN INSUFFICIENTE':
      case 'ERRORE: PORTATA COMPLESSIVA NULLA':
      case 'ERRORE':
      case 'CONDOTTA NON IDONEA':
            return 'red';
      default:
        return 'green';
    }

  }


  //--------------------------------------------------------------------------------
  //          OLD METHODS
  //--------------------------------------------------------------------------------



  setColorVelocita(item){
    //console.log("setColorVelocita")
    var soglia = 2;
    if(!item) return;
    if(item.diametro>60) soglia = 2.5;
      item.colorVelocita  = (item.velocita>soglia)? 'red':'green';
    
  }

  setColorPerdita(item, esistente?){
    var soglia = 0.15;
    if(!item) return;
    setTimeout(()=>{
      item.colorPerdita  = (item.perdita>soglia)? 'red':'green';
    },100);
    if(item.perdita > soglia) item.VerificaCondotta = "Condotta non idonea";
    else if( esistente) item.VerificaCondotta = "Condotta idonea";
    else if(item.VerificaCondotta != "Condotta di progetto") item.VerificaCondotta = "";
    if(item.perdita == undefined) item.VerificaCondotta = "";
  }


  
  onSubmit() {
    let found = false;
    this.ads.DimensionamentoSaved = true;
    this.saveAction.emit("save");

    /*
    this.adsService.updateAds(this.ads, { 
      DimensionamentoSaved: this.ads.DimensionamentoSaved, 
    }, () => {}, () => {});
    */

  }


}
