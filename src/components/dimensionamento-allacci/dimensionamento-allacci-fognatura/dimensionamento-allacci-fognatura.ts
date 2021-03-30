import { Component, Input, Output, OnInit, EventEmitter,Pipe,PipeTransform } from '@angular/core';

import { DimensionamentoAllacciFognatura, DIMFOGNA_MSG, ContatoreAntincendio, ParametriAcqueNere, ParametriAcqueBianche, ParametriVincoli } from '../../../models/dimensionamento-allacci';
import { Ads } from '../../../models/ads';
import { AdsService } from '../../../services/ads-service';


@Pipe({
  name: 'removeComma'
})
export class RemoveCommaPipe implements PipeTransform {

  transform(value: string): string {
    if (value !== undefined && value !== null) {
      return value.replace(/,/g, "");
    } else {
      return "";
    }
  }
}



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


allacciEsistentiArray = [];


tableParams = {
  sumUnitaScarico: 10.0,                  // Somma Unità di scarico
  freqCoef: 0.5,                          // Coefficiente di frequenza (contemporaneità) per appartamenti / locande / uffici
  dividers: ParametriAcqueNere.dividers,   // Divisori per calcolo delle Unità Immobiliari equivalenti a partire da varie tipologie di utenze
  affluxCoef:[1.0,0.6,0.5,0.1],           // Coefficienti di afflusso	
  maxRainIntensity: 100.0,                // Intensità massima di pioggia [mm/h]
  uiEqFisseAcqueBianche: ParametriAcqueBianche.uiEqFisseAcqueBianche, // UIeq fisse in presenza di ACQUE BIANCHE
  def_h_r : 1.4,
}

allacciArray = [
 /* 000 */ {"nome":"PVC SN8 DN110",                      "asNew":false, "desterno":110.0, "dinterno":103.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 001 */ {"nome":"PVC SN8 DN125",                      "asNew":false, "desterno":125.0, "dinterno":117.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 002 */ {"nome":"PVC SN8 DN160",                      "asNew":true , "desterno":160.0, "dinterno":150.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 003 */ {"nome":"PVC SN8 DN200",                      "asNew":true , "desterno":200.0, "dinterno":188.2, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 004 */ {"nome":"PVC SN8 DN250",                      "asNew":true , "desterno":250.0, "dinterno":235.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 005 */ {"nome":"PVC SN8 DN315",                      "asNew":true , "desterno":315.0, "dinterno":296.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 006 */ {"nome":"PVC SN8 DN355",                      "asNew":true , "desterno":355.0, "dinterno":334.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 007 */ {"nome":"PVC SN8 DN400",                      "asNew":true , "desterno":400.0, "dinterno":376.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 008 */ {"nome":"PVC SN8 DN450",                      "asNew":false, "desterno":450.0, "dinterno":423.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 009 */ {"nome":"PVC SN8 DN500",                      "asNew":false, "desterno":500.0, "dinterno":470.8, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 010 */ {"nome":"PVC SN8 DN630",                      "asNew":false, "desterno":630.0, "dinterno":593.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 011 */ {"nome":"PVC SN8 DN710",                      "asNew":false, "desterno":710.0, "dinterno":668.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 012 */ {"nome":"PVC SN8 DN800",                      "asNew":false, "desterno":800.0, "dinterno":753.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 013 */ {"nome":"PVC STRUTTURATO SN8 DN200",          "asNew":true , "desterno":200.0, "dinterno":187.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
 /* 014 */ {"nome":"PVC STRUTTURATO SN8 DN250",          "asNew":true , "desterno":250.0, "dinterno":234.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 015 */ {"nome":"PVC STRUTTURATO SN8 DN315",          "asNew":true , "desterno":315.0, "dinterno":295.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 016 */ {"nome":"PVC STRUTTURATO SN8 DN400",          "asNew":true , "desterno":400.0, "dinterno":375,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 017 */ {"nome":"PVC STRUTTURATO SN8 DN500",          "asNew":false, "desterno":500.0, "dinterno":469,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 018 */ {"nome":"PVC STRUTTURATO SN8 DN630",          "asNew":false, "desterno":630.0, "dinterno":591.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 019 */ {"nome":"PVC STRUTTURATO SN8 DN710",          "asNew":false, "desterno":710.0, "dinterno":660,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 020 */ {"nome":"PVC STRUTTURATO SN8 DN800",          "asNew":false, "desterno":800.0, "dinterno":751.1, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 021 */ {"nome":"PVC STRUTTURATO SN8 DN900",          "asNew":false, "desterno":900.0, "dinterno":844, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
 /* 022 */ {"nome":"PVC STRUTTURATO SN8 DN1000",         "asNew":false, "desterno":1000.0,"dinterno":944, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90},
 /* 023 */ {"nome":"PE x scarichi fognari PN3.2 DN110",  "asNew":false, "desterno":110,   "dinterno":103.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 024 */ {"nome":"PE x scarichi fognari PN3.2 DN125",  "asNew":false, "desterno":125,   "dinterno":117.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 025 */ {"nome":"PE x scarichi fognari PN3.2 DN140",  "asNew":false, "desterno":140,   "dinterno":131.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 026 */ {"nome":"PE x scarichi fognari PN3.2 DN160",  "asNew":false, "desterno":160,   "dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 027 */ {"nome":"PE x scarichi fognari PN3.2 DN180",  "asNew":false, "desterno":180,   "dinterno":168.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 028 */ {"nome":"PE x scarichi fognari PN3.2 DN200",  "asNew":false, "desterno":200,   "dinterno":187.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 029 */ {"nome":"PE x scarichi fognari PN3.2 DN225",  "asNew":false, "desterno":225,   "dinterno":211.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 030 */ {"nome":"PE x scarichi fognari PN3.2 DN250",  "asNew":false, "desterno":250,   "dinterno":234.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 031 */ {"nome":"PE x scarichi fognari PN3.2 DN280",  "asNew":false, "desterno":280,   "dinterno":262.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 032 */ {"nome":"PE x scarichi fognari PN3.2 DN315",  "asNew":false, "desterno":315,   "dinterno":295.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 033 */ {"nome":"PE x scarichi fognari PN3.2 DN355",  "asNew":false, "desterno":355,   "dinterno":332.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 034 */ {"nome":"PE x scarichi fognari PN3.2 DN400",  "asNew":false, "desterno":400,   "dinterno":375.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 035 */ {"nome":"PE x scarichi fognari PN3.2 DN450",  "asNew":false, "desterno":450,   "dinterno":422.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 036 */ {"nome":"PE x scarichi fognari PN3.2 DN500",  "asNew":false, "desterno":500,   "dinterno":469.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 037 */ {"nome":"PE x scarichi fognari PN3.2 DN560",  "asNew":false, "desterno":560,   "dinterno":525.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 038 */ {"nome":"PE x scarichi fognari PN3.2 DN630",  "asNew":false, "desterno":630,   "dinterno":590.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 039 */ {"nome":"PE x scarichi fognari PN3.2 DN710",  "asNew":false, "desterno":710,   "dinterno":666.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 040 */ {"nome":"PE x scarichi fognari PN3.2 DN800",  "asNew":false, "desterno":800,   "dinterno":750.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 041 */ {"nome":"PE x scarichi fognari PN3.2 DN900",  "asNew":false, "desterno":900,   "dinterno":844.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 042 */ {"nome":"PE x scarichi fognari PN3.2 DN1000", "asNew":false, "desterno":1000,  "dinterno":938.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 043 */ {"nome":"PE100 PN10 DN50",                    "asNew":false, "desterno":50,    "dinterno":44.0,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 044 */ {"nome":"PE100 PN10 DN63",                    "asNew":false, "desterno":63,    "dinterno":55.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 045 */ {"nome":"PE100 PN10 DN75",                    "asNew":false, "desterno":75,    "dinterno":66.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 046 */ {"nome":"PE100 PN10 DN90",                    "asNew":false, "desterno":90,    "dinterno":79.2,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 047 */ {"nome":"PE100 PN10 DN110",                   "asNew":false, "desterno":110,"dinterno":96.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 048 */ {"nome":"PE100 PN10 DN125",                   "asNew":false, "desterno":125,"dinterno":110.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 049 */ {"nome":"PE100 PN10 DN140",                   "asNew":false, "desterno":140,"dinterno":123.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 050 */ {"nome":"PE100 PN10 DN160",                   "asNew":false, "desterno":160,"dinterno":141.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 051 */ {"nome":"PE100 PN10 DN180",                   "asNew":false, "desterno":180,"dinterno":158.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 052 */ {"nome":"PE100 PN10 DN200",                   "asNew":false, "desterno":200,"dinterno":176.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 053 */ {"nome":"PE100 PN10 DN225",                   "asNew":false, "desterno":225,"dinterno":198.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 054 */ {"nome":"PE100 PN10 DN250",                   "asNew":false, "desterno":250,"dinterno":220.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 055 */ {"nome":"PE100 PN10 DN280",                   "asNew":false, "desterno":280,"dinterno":246.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 056 */ {"nome":"PE100 PN10 DN315",                   "asNew":false, "desterno":315,"dinterno":277.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 057 */ {"nome":"PE100 PN10 DN355",                   "asNew":false, "desterno":355,"dinterno":312.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 058 */ {"nome":"PE100 PN10 DN400",                   "asNew":false, "desterno":400,"dinterno":352.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 059 */ {"nome":"PE100 PN10 DN450",                   "asNew":false, "desterno":450,"dinterno":396.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 060 */ {"nome":"PE100 PN10 DN500",                   "asNew":false, "desterno":500,"dinterno":440.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 061 */ {"nome":"PE100 PN10 DN560",                   "asNew":false, "desterno":560,"dinterno":493.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 062 */ {"nome":"PE100 PN10 DN630",                   "asNew":false, "desterno":630,"dinterno":555.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 063 */ {"nome":"PE100 PN10 DN710",                   "asNew":false, "desterno":710,"dinterno":625.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 064 */ {"nome":"PE100 PN10 DN800",                   "asNew":false, "desterno":800,"dinterno":705.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 065 */ {"nome":"PE100 PN10 DN900",                   "asNew":false, "desterno":900,"dinterno":793.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 066 */ {"nome":"PE100 PN10 DN1000",                  "asNew":false, "desterno":1000,"dinterno":881.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 067 */ {"nome":"PE100 PN16 DN20",                    "asNew":false, "desterno":20,"dinterno":16.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
 /* 068 */ {"nome":"PE100 PN16 DN25",                    "asNew":false, "desterno":25,"dinterno":20.4,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 069 */ {"nome":"PE100 PN16 DN32",                    "asNew":false, "desterno":32,"dinterno":26.0,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 070 */ {"nome":"PE100 PN16 DN40",                    "asNew":false, "desterno":40,"dinterno":32.6,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 071 */ {"nome":"PE100 PN16 DN50",                    "asNew":false, "desterno":50,"dinterno":40.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 072 */ {"nome":"PE100 PN16 DN63",                    "asNew":false, "desterno":63,"dinterno":51.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 073 */ {"nome":"PE100 PN16 DN75",                    "asNew":false, "desterno":75,"dinterno":61.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 074 */ {"nome":"PE100 PN16 DN90",                    "asNew":false, "desterno":90,"dinterno":73.6,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 075 */ {"nome":"PE100 PN16 DN110",                   "asNew":false, "desterno":110,"dinterno":90.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":0},
 /* 076 */ {"nome":"PE100 PN16 DN125",                   "asNew":false, "desterno":125,"dinterno":102.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 077 */ {"nome":"PE100 PN16 DN140",                   "asNew":false, "desterno":140,"dinterno":114.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 078 */ {"nome":"PE100 PN16 DN160",                   "asNew":false, "desterno":160,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 079 */ {"nome":"PE100 PN16 DN180",                   "asNew":false, "desterno":180,"dinterno":147.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 080 */ {"nome":"PE100 PN16 DN200",                   "asNew":false, "desterno":200,"dinterno":163.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 081 */ {"nome":"PE100 PN16 DN225",                   "asNew":false, "desterno":225,"dinterno":184.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 082 */ {"nome":"PE100 PN16 DN250",                   "asNew":false, "desterno":250,"dinterno":204.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 083 */ {"nome":"PE100 PN16 DN280",                   "asNew":false, "desterno":280,"dinterno":229.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 084 */ {"nome":"PE100 PN16 DN315",                   "asNew":false, "desterno":315,"dinterno":257.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 085 */ {"nome":"PE100 PN16 DN355",                   "asNew":false, "desterno":355,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 086 */ {"nome":"PE100 PN16 DN400",                   "asNew":false, "desterno":400,"dinterno":327.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 087 */ {"nome":"PE100 PN16 DN450",                   "asNew":false, "desterno":450,"dinterno":368.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 088 */ {"nome":"PE100 PN16 DN500",                   "asNew":false, "desterno":500,"dinterno":409.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 089 */ {"nome":"PE100 PN16 DN560",                   "asNew":false, "desterno":560,"dinterno":458.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 090 */ {"nome":"PE100 PN16 DN630",                   "asNew":false, "desterno":630,"dinterno":515.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 091 */ {"nome":"PE100 PN25 DN20",                    "asNew":false, "desterno":20,"dinterno":14.0,"scabrezza":0.02,"kval":81,"scabrezzaGS":90},
 /* 092 */ {"nome":"PE100 PN25 DN25",                    "asNew":false, "desterno":25,"dinterno":18.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
 /* 093 */ {"nome":"PE100 PN25 DN32",                    "asNew":false, "desterno":32,"dinterno":23.2,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
 /* 094 */ {"nome":"PE100 PN25 DN40",                    "asNew":false, "desterno":40,"dinterno":29.0,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 095 */ {"nome":"PE100 PN25 DN50",                    "asNew":false, "desterno":50,"dinterno":36.2,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
 /* 096 */ {"nome":"PE100 PN25 DN63",                    "asNew":false, "desterno":63,"dinterno":45.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 097 */ {"nome":"PE100 PN25 DN75",                    "asNew":false, "desterno":75,"dinterno":54.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
 /* 098 */ {"nome":"PE100 PN25 DN90",                    "asNew":false, "desterno":90,"dinterno":65.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 099 */ {"nome":"PE100 PN25 DN110",                   "asNew":false, "desterno":110,"dinterno":79.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 100 */ {"nome":"PE100 PN25 DN125",                   "asNew":false, "desterno":125,"dinterno":90.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
 /* 101 */ {"nome":"PE100 PN25 DN140",                   "asNew":false, "desterno":140,"dinterno":101.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 102 */ {"nome":"PE100 PN25 DN160",                   "asNew":false, "desterno":160,"dinterno":116.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 103 */ {"nome":"PE100 PN25 DN180",                   "asNew":false, "desterno":180,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 104 */ {"nome":"PE100 PN25 DN200",                   "asNew":false, "desterno":200,"dinterno":145.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 105 */ {"nome":"PE100 PN25 DN225",                   "asNew":false, "desterno":225,"dinterno":163.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 106 */ {"nome":"PE100 PN25 DN250",                   "asNew":false, "desterno":250,"dinterno":201.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 107 */ {"nome":"PE100 PN25 DN280",                   "asNew":false, "desterno":280,"dinterno":203.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 108 */ {"nome":"PE100 PN25 DN315",                   "asNew":false, "desterno":315,"dinterno":228.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 109 */ {"nome":"PE100 PN25 DN355",                   "asNew":false, "desterno":355,"dinterno":258.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 110 */ {"nome":"PE100 PN25 DN400",                   "asNew":false, "desterno":400,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 111 */ {"nome":"PE100 PN25 DN450",                   "asNew":false, "desterno":450,"dinterno":327.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 112 */ {"nome":"PE CORRUGATO SN8 DN125",             "asNew":false, "desterno":125,"dinterno":105.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 113 */ {"nome":"PE CORRUGATO SN8 DN160",             "asNew":true , "desterno":160,"dinterno":137.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 114 */ {"nome":"PE CORRUGATO SN8 DN200",             "asNew":true , "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 115 */ {"nome":"PE CORRUGATO SN8 DN250",             "asNew":true , "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 116 */ {"nome":"PE CORRUGATO SN8 DN315",             "asNew":true , "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 117 */ {"nome":"PE CORRUGATO SN8 DN400",             "asNew":true , "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 118 */ {"nome":"PE CORRUGATO SN8 DN500",             "asNew":false, "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 119 */ {"nome":"PE CORRUGATO SN8 DN630",             "asNew":false, "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 120 */ {"nome":"PE CORRUGATO SN8 DN800",             "asNew":false, "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 121 */ {"nome":"PE CORRUGATO SN8 DN1000",            "asNew":false, "desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 122 */ {"nome":"PE CORRUGATO SN8 DN1200",            "asNew":false, "desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 123 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN200", "asNew":true , "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 124 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN250", "asNew":true , "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 125 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN315", "asNew":true , "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 126 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN400", "asNew":true , "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 127 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN500", "asNew":false, "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 128 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN630", "asNew":false, "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 129 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN800", "asNew":false, "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 130 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN1000","asNew":false, "desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 131 */ {"nome":"POLIPROPILENE CORRUGATO SN16 DN1200","asNew":false, "desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 132 */ {"nome":"CLS DN300",                          "asNew":false, "desterno":300,"dinterno":300.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
 /* 133 */ {"nome":"CLS DN400",                          "asNew":false, "desterno":400,"dinterno":400.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
 /* 134 */ {"nome":"CLS DN500",                          "asNew":false, "desterno":500,"dinterno":500.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
 /* 135 */ {"nome":"CLS DN600",                          "asNew":false, "desterno":600,"dinterno":600.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
 /* 136 */ {"nome":"CLS DN800",                          "asNew":false, "desterno":800,"dinterno":800.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
 /* 137 */ {"nome":"CLS DN1000",                         "asNew":false, "desterno":1000,"dinterno":1000.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
 /* 138 */ {"nome":"CLS DN1200",                         "asNew":false, "desterno":1200,"dinterno":1200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 139 */ {"nome":"CLS DN1400",                         "asNew":false, "desterno":1400,"dinterno":1400.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 140 */ {"nome":"CLS DN1600",                         "asNew":false, "desterno":1600,"dinterno":1600.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 141 */ {"nome":"CLS DN1800",                         "asNew":false, "desterno":1800,"dinterno":1800.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 142 */ {"nome":"CLS DN2000",                         "asNew":false, "desterno":2000,"dinterno":2000.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 143 */ {"nome":"CLS DN2200",                         "asNew":false, "desterno":2200,"dinterno":2200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
 /* 144 */ {"nome":"CLS DN2400",                         "asNew":false, "desterno":2400,"dinterno":2400.0,"scabrezza":0.4,"kval":68,"scabrezzaGS":90},
 /* 145 */ {"nome":"GHISA DN40",                         "asNew":false, "desterno":40,"dinterno":40.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
 /* 146 */ {"nome":"GHISA DN50",                         "asNew":false, "desterno":50,"dinterno":50.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
 /* 147 */ {"nome":"GHISA DN75",                         "asNew":false, "desterno":75,"dinterno":75.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
 /* 148 */ {"nome":"GHISA DN80",                         "asNew":false, "desterno":80,"dinterno":80.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
 /* 149 */ {"nome":"GHISA DN100",                        "asNew":false, "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 150 */ {"nome":"GHISA DN125",                        "asNew":false, "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 151 */ {"nome":"GHISA DN150",                        "asNew":true , "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
 /* 152 */ {"nome":"GHISA DN200",                        "asNew":true , "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 153 */ {"nome":"GHISA DN250",                        "asNew":true , "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 154 */ {"nome":"GHISA DN300",                        "asNew":true , "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 155 */ {"nome":"GHISA DN350",                        "asNew":true , "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 156 */ {"nome":"GHISA DN400",                        "asNew":true , "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 157 */ {"nome":"GHISA DN450",                        "asNew":false, "desterno":450,"dinterno":450.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 158 */ {"nome":"GHISA DN500",                        "asNew":false, "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 159 */ {"nome":"GHISA DN600",                        "asNew":false, "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 160 */ {"nome":"GHISA DN700",                        "asNew":false, "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 161 */ {"nome":"GHISA DN800",                        "asNew":false, "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 162 */ {"nome":"GHISA DN900",                        "asNew":false, "desterno":900,"dinterno":900.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 163 */ {"nome":"GHISA DN1000",                       "asNew":false, "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 164 */ {"nome":"GHISA DN1100",                       "asNew":false, "desterno":1100,"dinterno":1100.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 165 */ {"nome":"GHISA DN1200",                       "asNew":false, "desterno":1200,"dinterno":1200.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 166 */ {"nome":"GHISA DN1400",                       "asNew":false, "desterno":1400,"dinterno":1400.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 167 */ {"nome":"GHISA DN1500",                       "asNew":false, "desterno":1500,"dinterno":1500.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 168 */ {"nome":"GHISA DN1600",                       "asNew":false, "desterno":1600,"dinterno":1600.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 169 */ {"nome":"GHISA DN1800",                       "asNew":false, "desterno":1800,"dinterno":1800.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 170 */ {"nome":"GHISA DN2000",                       "asNew":false, "desterno":2000,"dinterno":2000.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
 /* 171 */ {"nome":"GRES DN100",                         "asNew":false, "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 172 */ {"nome":"GRES DN125",                         "asNew":false, "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
 /* 173 */ {"nome":"GRES DN150",                         "asNew":true , "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
 /* 174 */ {"nome":"GRES DN200",                         "asNew":true , "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 175 */ {"nome":"GRES DN250",                         "asNew":true , "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
 /* 176 */ {"nome":"GRES DN300",                         "asNew":true , "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 177 */ {"nome":"GRES DN350",                         "asNew":true , "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 178 */ {"nome":"GRES DN400",                         "asNew":true , "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
 /* 179 */ {"nome":"GRES DN500",                         "asNew":false, "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 180 */ {"nome":"GRES DN600",                         "asNew":false, "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 181 */ {"nome":"GRES DN700",                         "asNew":false, "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 182 */ {"nome":"GRES DN800",                         "asNew":false, "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 183 */ {"nome":"GRES DN1000",                        "asNew":false, "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
 /* 184 */ {"nome":"PRFV (vetroresina) DN150",           "asNew":true , "desterno":150,"dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 185 */ {"nome":"PRFV (vetroresina) DN200",           "asNew":true , "desterno":200,"dinterno":200.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
 /* 186 */ {"nome":"PRFV (vetroresina) DN250",           "asNew":true , "desterno":250,"dinterno":250.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 187 */ {"nome":"PRFV (vetroresina) DN300",           "asNew":true , "desterno":300,"dinterno":300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 188 */ {"nome":"PRFV (vetroresina) DN350",           "asNew":true , "desterno":350,"dinterno":350.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 189 */ {"nome":"PRFV (vetroresina) DN400",           "asNew":true , "desterno":400,"dinterno":400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 190 */ {"nome":"PRFV (vetroresina) DN500",           "asNew":false, "desterno":500,"dinterno":500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 191 */ {"nome":"PRFV (vetroresina) DN600",           "asNew":false, "desterno":600,"dinterno":600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 192 */ {"nome":"PRFV (vetroresina) DN650",           "asNew":false, "desterno":650,"dinterno":650.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 193 */ {"nome":"PRFV (vetroresina) DN700",           "asNew":false, "desterno":700,"dinterno":700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 194 */ {"nome":"PRFV (vetroresina) DN750",           "asNew":false, "desterno":750,"dinterno":750.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 195 */ {"nome":"PRFV (vetroresina) DN800",           "asNew":false, "desterno":800,"dinterno":800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 196 */ {"nome":"PRFV (vetroresina) DN850",           "asNew":false, "desterno":850,"dinterno":850.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 197 */ {"nome":"PRFV (vetroresina) DN900",           "asNew":false, "desterno":900,"dinterno":900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 198 */ {"nome":"PRFV (vetroresina) DN950",           "asNew":false, "desterno":950,"dinterno":950.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 199 */ {"nome":"PRFV (vetroresina) DN1000",          "asNew":false, "desterno":1000.0,"dinterno":1000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 200 */ {"nome":"PRFV (vetroresina) DN1100",          "asNew":false, "desterno":1100.0,"dinterno":1100.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 201 */ {"nome":"PRFV (vetroresina) DN1200",          "asNew":false, "desterno":1200.0,"dinterno":1200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 202 */ {"nome":"PRFV (vetroresina) DN1300",          "asNew":false, "desterno":1300.0,"dinterno":1300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 203 */ {"nome":"PRFV (vetroresina) DN1400",          "asNew":false, "desterno":1400.0,"dinterno":1400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 204 */ {"nome":"PRFV (vetroresina) DN1500",          "asNew":false, "desterno":1500.0,"dinterno":1500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 205 */ {"nome":"PRFV (vetroresina) DN1600",          "asNew":false, "desterno":1600.0,"dinterno":1600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 206 */ {"nome":"PRFV (vetroresina) DN1700",          "asNew":false, "desterno":1700.0,"dinterno":1700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 207 */ {"nome":"PRFV (vetroresina) DN1800",          "asNew":false, "desterno":1800.0,"dinterno":1800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 208 */ {"nome":"PRFV (vetroresina) DN1900",          "asNew":false, "desterno":1900.0,"dinterno":1900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 209 */ {"nome":"PRFV (vetroresina) DN2000",          "asNew":false, "desterno":2000.0,"dinterno":2000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 210 */ {"nome":"PRFV (vetroresina) DN2200",          "asNew":false, "desterno":2200.0,"dinterno":2200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 211 */ {"nome":"PRFV (vetroresina) DN2400",          "asNew":false, "desterno":2400.0,"dinterno":2400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 212 */ {"nome":"PRFV (vetroresina) DN2500",          "asNew":false, "desterno":2500.0,"dinterno":2500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 213 */ {"nome":"PRFV (vetroresina) DN2600",          "asNew":false, "desterno":2600.0,"dinterno":2600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 214 */ {"nome":"PRFV (vetroresina) DN2700",          "asNew":false, "desterno":2700.0,"dinterno":2700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 215 */ {"nome":"PRFV (vetroresina) DN2800",          "asNew":false, "desterno":2800.0,"dinterno":2800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
 /* 216 */ {"nome":"PRFV (vetroresina) DN3000",          "asNew":false, "desterno":3000.0,"dinterno":3000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90}
  ];

precision:string = "1.1-2";

allacciEsempioArray = [];
allacciNuoviArray = [];


constructor(private adsService: AdsService) {
  this.saveAction = new EventEmitter<string>();
  console.log('Hello DimensionamentoAllacciFognaturaComponent Component');
  this.allacciArray.forEach((part,index,arr)=>{
    arr[index].kval = DefluxScale.computeKval(arr[index]);
    if (arr[index].asNew){
      this.allacciNuoviArray.push(arr[index]);
    }
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
        AllacciamentoNuovo1,AllacciamentoNuovo2,AllacciamentoNuovo3,AllacciamentoNuovo4,AllacciamentoNuovo5,AllacciamentoNuovo6,AllacciamentoEsistente,{},
        new ParametriAcqueNere(0,0,0,0,0,0,0),new ParametriAcqueBianche(0,0,0,0,0,0,0,0), new ParametriVincoli(0,0,1.0,1.0,0,0),
        );  
        this.allacciEsempioArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1);
        this.allacciEsempioArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2);
        this.allacciEsempioArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3);
        this.allacciEsempioArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4);
        this.allacciEsempioArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5);
        //this.allacciNuoviArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6);
        
        //this.allacciEsistentiArray.push(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente);
        
        this.updateVincoli();
        
    }
  }

  updateAcqueNere(){
    if (this.ads.DimensionamentoAllacciFognatura){
      let sum = this.ads.DimensionamentoAllacciFognatura.AcqueNere.sumEq();
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
      
      this.allacciEsempioArray.forEach((part,index,allacci) =>{
        if (allacci[index]?.nome){
          self.updateAllacciamento(allacci[index]);
        }
      });
      self.updateAllacciamento(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente);
      self.updateAllacciamento(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6);
      
      
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

  calcolaPortata(dim,percentage){
    console.log("calcola Portata");
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


    return portata;
  }

  calcolaAlfaParams(dim){
    /*
(Q, D, k, i)
    Q = (portata complessiva di calcolo / 1000 per m3/s)
    D = portata smaltibile al 70%
    k = coefficente scabrezza
    i = pendenza



    Q = Q / 1000 'in m3/s
    D = D / 1000 'in metri
    r = D / 2

    EstremoSup = 6.28
    EstremoInf = 0.1 'alfa Ë compreso tra 2pigreco e 0.1.
    Precisione = 1   'inizializzazione della variabile Precisione

Rem Si tratta di trovare lo "0" della equazione.
Rem Si procede per tentativi: ipotizzando un valore di alfa si controlla se il risultato dell'equazione si avvicina a zero.

Do While Precisione <> 0
        alfa = (EstremoSup + EstremoInf) / 2
        
        Risultato = (Q / (((k * (((((alfa - Sin(alfa)) / 2) * (r ^ 2)) / (alfa * r)) ^ (2 / 3)) * (i ^ (1 / 2)) * (((alfa - Sin(alfa)) / 2) * (r ^ 2))  )))) - 1
   
                
        Select Case Risultato
            Case Is > 0
                EstremoInf = alfa
            Case Is < 0
                EstremoSup = alfa
        End Select
        Precisione = Int(Risultato * 100000) 'ci si ferma se il risultato dell'equazione Ë inferiore a 0,000001.
    */
   console.log("calcola Alfa");
   let Q = this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista / 1000.0;
   let D = dim.dinterno,
       r = D / 2000.0; 


   let alfa,velocita;
   
   let Precisione = 1.0,
        EstremoSup = Math.PI*2.0, 
        EstremoInf = 0.1,  //alfa è compreso tra 2pigreco e 0.1.
        maxIterations = 100,
        iteration = 1;

    while((Precisione > 0.000001) && (iteration < maxIterations)){
      alfa = (EstremoSup + EstremoInf) / 2.0;
    
      // D28*(((((F28-SEN(F28))/2)*((C28/2000)^2))/(F28*(C28/2000)))^(2/3))*RADQ($C$21)
      velocita = dim.kval * ( Math.pow((( (alfa - Math.sin(alfa)) / 2.0  * Math.pow(r,2.0)) / (alfa * r)), 2.0/3.0))
      velocita *= Math.sqrt(this.ads.DimensionamentoAllacciFognatura.Vincoli.pendenza);

      let result = (velocita * ((alfa - Math.sin(alfa)) / 2.0)  * Math.pow(r,2.0));
          result = Q / result;
          result -= 1.0;
      if (result > 0.0){
        EstremoInf = alfa;
      }
      else {
        EstremoSup = alfa;  
      }
      Precisione = Math.abs(result);
      console.log("Precisione="+Precisione+" step="+iteration);
      iteration++;
    }
  let percentuale : number = (1.0 - Math.cos(alfa/2)) / 2.0;
  
    
   let res = {
     alfa: alfa,
     velocita: velocita,
     percentuale: percentuale
   }  

   return res;

  }

  

  updateAllacciamento(allacciamento){
    if (allacciamento.nome){
      console.log("update Allacciamento")
      allacciamento.portata = this.calcolaPortataEVelocita(allacciamento,70.0).portata;
      
      if (this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista > 0){
        let val = this.calcolaAlfaParams(allacciamento);
        allacciamento.alfa = val.alfa ;
        allacciamento.percRiempimento = (val.percentuale * 100.0).toFixed(0) + ' %';
        allacciamento.velocita = val.velocita.toFixed(2) + ' m/s';
        
        if (allacciamento.portata >= this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista){
        
          if (val.velocita < 0.5 || val.velocita > 5.0){
            allacciamento.risultato = DIMFOGNA_MSG.FUORI_LIMITE;
          
          }
          else {
            allacciamento.risultato = DIMFOGNA_MSG.IDONEA;
          
          }
          /*
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
          */
        }
        else {
          allacciamento.percRiempimento = DIMFOGNA_MSG.DN_INSUFF;
          allacciamento.velocita = DIMFOGNA_MSG.DN_INSUFF;
          allacciamento.risultato = DIMFOGNA_MSG.NON_IDONEA;
        }
      }
      else {
        allacciamento.percRiempimento = DIMFOGNA_MSG.PORTATA_NULL;
        allacciamento.velocita = DIMFOGNA_MSG.PORTATA_NULL;
        allacciamento.risultato = DIMFOGNA_MSG.PORTATA_NULL;
      }

      
  
    }

  }
  
  setColorForMessage(msg){
    switch(msg){
      case DIMFOGNA_MSG.DN_INSUFF:
      case DIMFOGNA_MSG.PORTATA_NULL:
      case DIMFOGNA_MSG.ERRORE:
      case DIMFOGNA_MSG.NON_IDONEA:
      case DIMFOGNA_MSG.FUORI_LIMITE:  
            return 'red';
      default:
        return 'green';
    }
  }

  setColorForPortata(msg){
    switch(msg){
      case DIMFOGNA_MSG.DN_INSUFF:
      case DIMFOGNA_MSG.NON_IDONEA:
      case DIMFOGNA_MSG.ERRORE:
            return 'red';
      case DIMFOGNA_MSG.PORTATA_NULL:
            return 'white';
      default:
        return 'green';
    }

  }



  setColorVelocita(item){
    //console.log("setColorVelocita")
    var soglia = 2;
    if(!item) return;
    if(item.diametro>60) soglia = 2.5;
      item.colorVelocita  = (item.velocita>soglia)? 'red':'green';
    
  }



  
  onSubmit() {
    if (+this.ads.DimensionamentoAllacciFognatura.Vincoli.portataMista > 0){
        this.ads.DimensionamentoSaved = true;
        this.saveAction.emit("save");
    
        this.adsService.updateAds(this.ads, { 
          DimensionamentoSaved: this.ads.DimensionamentoSaved, 
        }, () => {}, () => {});
        
      
    }
    else {
      alert("Attenzione: Portata complessiva di calcolo nulla! ");
    }
  
  }
  

}
