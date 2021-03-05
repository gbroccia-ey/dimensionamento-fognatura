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

  allacciEsistentiArray = [
    {'nome':'polietilene DE 20 (1/2) PE100 PN16','diametro':16,'perdit':20,'pression':2,'scabrezza':0.02},
{'nome':'polietilene DE 25 (3/4) PE100 PN16','diametro':20.4,'perdit':25,'pression':2.3,'scabrezza':0.02},
{'nome':'polietilene DE 32 (1") PE100 PN16','diametro':26,'perdit':32,'pression':3,'scabrezza':0.02},
{'nome':'polietilene DE 40 (1"1/4) PE100 PN16','diametro':32.6,'perdit':40,'pression':3.7,'scabrezza':0.02},
{'nome':'polietilene DE 50 (1"1/2) PE100 PN16','diametro':40.8,'perdit':50,'pression':4.6,'scabrezza':0.02},
{'nome':'polietilene DE 63 (2") PE100 PN16','diametro':51.4,'perdit':63,'pression':5.8,'scabrezza':0.02},
{'nome':'polietilene DE 75 (2"1/2) PE100 PN16','diametro':61.4,'perdit':75,'pression':6.8,'scabrezza':0.02},
{'nome':'polietilene DE 90 (3") PE100 PN16','diametro':73.6,'perdit':90,'pression':8.2,'scabrezza':0.02},
{'nome':'polietilene DE110 (4") PE100 PN16','diametro':90,'perdit':110,'pression':10,'scabrezza':0.02},
{'nome':'polietilene DE125 PE100 PN16','diametro':102.2,'perdit':125,'pression':11.4,'scabrezza':0.02},
{'nome':'polietilene DE140 PE100 PN16','diametro':114.6,'perdit':140,'pression':12.7,'scabrezza':0.02},
{'nome':'polietilene DE160 PE100 PN16','diametro':130.8,'perdit':160,'pression':14.6,'scabrezza':0.02},
{'nome':'polietilene DE180 PE100 PN16','diametro':147.2,'perdit':180,'pression':16.4,'scabrezza':0.02},
{'nome':'polietilene DE200 PE100 PN16','diametro':163.6,'perdit':200,'pression':18.2,'scabrezza':0.02},
{'nome':'polietilene DE225 PE100 PN16','diametro':184,'perdit':225,'pression':20.5,'scabrezza':0.02},
{'nome':'polietilene DE250 PE100 PN16','diametro':204.6,'perdit':250,'pression':22.7,'scabrezza':0.02},
{'nome':'polietilene DE280 PE100 PN16','diametro':229.2,'perdit':280,'pression':25.4,'scabrezza':0.02},
{'nome':'polietilene DE315 PE100 PN16','diametro':257.8,'perdit':315,'pression':28.6,'scabrezza':0.02},
{'nome':'polietilene DE 20 (1/2) PE100 PN25','diametro':14,'perdit':20,'pression':3,'scabrezza':0.02},
{'nome':'polietilene DE 25 (3/4) PE100 PN25','diametro':18,'perdit':25,'pression':3.5,'scabrezza':0.02},
{'nome':'polietilene DE 32 (1") PE100 PN25','diametro':23.2,'perdit':32,'pression':4.4,'scabrezza':0.02},
{'nome':'polietilene DE 40 (1"1/4) PE100 PN25','diametro':29,'perdit':40,'pression':5.5,'scabrezza':0.02},
{'nome':'polietilene DE 50 (1"1/2) PE100 PN25','diametro':36.2,'perdit':50,'pression':6.9,'scabrezza':0.02},
{'nome':'polietilene DE 63 (2") PE100 PN25','diametro':45.8,'perdit':63,'pression':8.6,'scabrezza':0.02},
{'nome':'polietilene DE 75 (2"1/2) PE100 PN25','diametro':54.4,'perdit':75,'pression':10.3,'scabrezza':0.02},
{'nome':'polietilene DE 90 (3") PE100 PN25','diametro':65.4,'perdit':90,'pression':12.3,'scabrezza':0.02},
{'nome':'polietilene DE110 (4") PE100 PN25','diametro':79.8,'perdit':110,'pression':15.1,'scabrezza':0.02},
{'nome':'polietilene DE125 PE100 PN25','diametro':90.8,'perdit':125,'pression':17.1,'scabrezza':0.02},
{'nome':'polietilene DE140 PE100 PN25','diametro':101.6,'perdit':140,'pression':19.2,'scabrezza':0.02},
{'nome':'polietilene DE160 PE100 PN25','diametro':116.2,'perdit':160,'pression':21.9,'scabrezza':0.02},
{'nome':'PVC dn 32 PN10','diametro':28.8,'perdit':32,'pression':1.6,'scabrezza':0.02},
{'nome':'PVC dn 40 PN10','diametro':36.2,'perdit':40,'pression':1.9,'scabrezza':0.02},
{'nome':'PVC dn 50 PN10','diametro':45.2,'perdit':50,'pression':2.4,'scabrezza':0.02},
{'nome':'PVC dn 63 PN10','diametro':57,'perdit':63,'pression':3,'scabrezza':0.02},
{'nome':'PVC dn 75 PN10','diametro':67.8,'perdit':75,'pression':3.6,'scabrezza':0.02},
{'nome':'PVC dn 90 PN10','diametro':81.4,'perdit':90,'pression':4.3,'scabrezza':0.02},
{'nome':'PVC dn110 PN10','diametro':101.6,'perdit':110,'pression':4.2,'scabrezza':0.02},
{'nome':'PVC dn125 PN10','diametro':115.4,'perdit':125,'pression':4.8,'scabrezza':0.02},
{'nome':'PVC dn140 PN10','diametro':129.2,'perdit':140,'pression':5.4,'scabrezza':0.02},
{'nome':'PVC dn160 PN10','diametro':147.6,'perdit':160,'pression':6.2,'scabrezza':0.02},
{'nome':'PVC dn180 PN10','diametro':166.2,'perdit':180,'pression':6.9,'scabrezza':0.02},
{'nome':'PVC dn200 PN10','diametro':184.6,'perdit':200,'pression':7.7,'scabrezza':0.02},
{'nome':'PVC dn225 PN10','diametro':207.8,'perdit':225,'pression':8.6,'scabrezza':0.02},
{'nome':'PVC dn250 PN10','diametro':230.8,'perdit':250,'pression':9.6,'scabrezza':0.02},
{'nome':'PVC dn280 PN10','diametro':258.6,'perdit':280,'pression':10.7,'scabrezza':0.02},
{'nome':'PVC dn315 PN10','diametro':290.8,'perdit':315,'pression':12.1,'scabrezza':0.02},
{'nome':'PVC dn 20 PN16','diametro':17,'perdit':20,'pression':1.5,'scabrezza':0.02},
{'nome':'PVC dn 25 PN16','diametro':21.2,'perdit':25,'pression':1.9,'scabrezza':0.02},
{'nome':'PVC dn 32 PN16','diametro':27.2,'perdit':32,'pression':2.4,'scabrezza':0.02},
{'nome':'PVC dn 40 PN16','diametro':35.2,'perdit':40,'pression':2.4,'scabrezza':0.02},
{'nome':'PVC dn 50 PN16','diametro':42.6,'perdit':50,'pression':3.7,'scabrezza':0.02},
{'nome':'PVC dn 63 PN16','diametro':53.6,'perdit':63,'pression':4.7,'scabrezza':0.02},
{'nome':'PVC dn 75 PN16','diametro':63.8,'perdit':75,'pression':5.6,'scabrezza':0.02},
{'nome':'PVC dn 90 PN16','diametro':76.6,'perdit':90,'pression':6.7,'scabrezza':0.02},
{'nome':'PVC dn110 PN16','diametro':96.8,'perdit':110,'pression':6.6,'scabrezza':0.02},
{'nome':'PVC dn125 PN16','diametro':110.2,'perdit':125,'pression':7.4,'scabrezza':0.02},
{'nome':'PVC dn140 PN16','diametro':123.4,'perdit':140,'pression':8.3,'scabrezza':0.02},
{'nome':'PVC dn160 PN16','diametro':141,'perdit':160,'pression':9.5,'scabrezza':0.02},
{'nome':'PVC dn180 PN16','diametro':158.6,'perdit':180,'pression':10.7,'scabrezza':0.02},
{'nome':'PVC dn200 PN16','diametro':176.2,'perdit':200,'pression':11.9,'scabrezza':0.02},
{'nome':'PVC dn225 PN16','diametro':198.2,'perdit':225,'pression':13.4,'scabrezza':0.02},
{'nome':'PVC dn250 PN16','diametro':220.4,'perdit':250,'pression':14.8,'scabrezza':0.02},
{'nome':'PVC dn280 PN16','diametro':246.8,'perdit':280,'pression':16.6,'scabrezza':0.02},
{'nome':'PVC dn315 PN16','diametro':277.6,'perdit':315,'pression':18.7,'scabrezza':0.02},
{'nome':'acciaio DN 25 (1") UNI EN 10255 serie media ','diametro':27.3,'perdit':33.7,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 32 (1" 1/4) UNI EN 10255 serie media ','diametro':36,'perdit':42.4,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 40 (1" 1/2) UNI EN 10255 serie media ','diametro':41.9,'perdit':48.3,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 50 (2") UNI EN 10255 serie media ','diametro':53.1,'perdit':60.3,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN 65 (2" 1/2) UNI EN 10255 serie media ','diametro':68.9,'perdit':76.1,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN 80 (3") UNI EN 10224','diametro':82.5,'perdit':88.9,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN100 (4") UNI EN 10224','diametro':107.9,'perdit':114.3,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN125 (5") UNI EN 10224','diametro':132.5,'perdit':139.7,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN150 (6") UNI EN 10224','diametro':160.3,'perdit':168.3,'pression':4,'scabrezza':0.15},
{'nome':'acciaio DN200 (8") UNI EN 10224','diametro':209.1,'perdit':219.1,'pression':5,'scabrezza':0.15},
{'nome':'ghisa DE 75 tipo BLUTOP','diametro':69,'perdit':75,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE 90 tipo BLUTOP','diametro':84,'perdit':90,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE110 tipo BLUTOP','diametro':104,'perdit':110,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE125 tipo BLUTOP','diametro':119,'perdit':125,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE140 tipo BLUTOP','diametro':133.6,'perdit':140,'pression':3.2,'scabrezza':0.15},
{'nome':'ghisa DE160 tipo BLUTOP','diametro':153.2,'perdit':160,'pression':3.4,'scabrezza':0.15},
{'nome':'ghisa DN 60  UNI EN 545','diametro':71,'perdit':77,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN 80  UNI EN 545','diametro':92,'perdit':98,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN100  UNI EN 545','diametro':112,'perdit':118,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN125  UNI EN 545','diametro':138,'perdit':144,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN150  UNI EN 545','diametro':164,'perdit':170,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN200  UNI EN 545','diametro':215.8,'perdit':222,'pression':3.1,'scabrezza':0.15},
{'nome':'ghisa DN250  UNI EN 545','diametro':266.2,'perdit':274,'pression':3.9,'scabrezza':0.15},
{'nome':'ghisa DN300  UNI EN 545','diametro':316.8,'perdit':326,'pression':4.6,'scabrezza':0.15},
{'nome':'polietilene multistr. DE 32 (1") PE100 PN16','diametro':26,'perdit':32,'pression':3,'scabrezza':0.02},
{'nome':'polietilene multistr. DE 50 (1"1/2) PE100 PN16','diametro':40.8,'perdit':50,'pression':4.6,'scabrezza':0.02},
{'nome':'polietilene multistr. DE 63 (2") PE100 PN16','diametro':51.4,'perdit':63,'pression':5.8,'scabrezza':0.02},
  ];


allacciNuoviArray = [
    {'nome':'polietilene multistr. DE 32 (1") PE100 PN16','diametro':26,'perdit':32,'pression':3,'scabrezza':0.02},
{'nome':'polietilene multistr. DE 50 (1"1/2) PE100 PN16','diametro':40.8,'perdit':50,'pression':4.6,'scabrezza':0.02},
{'nome':'polietilene multistr. DE 63 (2") PE100 PN16','diametro':51.4,'perdit':63,'pression':5.8,'scabrezza':0.02},
{'nome':'polietilene DE 90 (3") PE100 PN16','diametro':73.6,'perdit':90,'pression':8.2,'scabrezza':0.02},
{'nome':'polietilene DE110 (4") PE100 PN16','diametro':90,'perdit':110,'pression':10,'scabrezza':0.02},
{'nome':'polietilene DE140 PE100 PN16','diametro':114.6,'perdit':140,'pression':12.7,'scabrezza':0.02},
{'nome':'polietilene DE160 PE100 PN16','diametro':130.8,'perdit':160,'pression':14.6,'scabrezza':0.02},
{'nome':'polietilene DE180 PE100 PN16','diametro':147.2,'perdit':180,'pression':16.4,'scabrezza':0.02},
{'nome':'polietilene DE200 PE100 PN16','diametro':163.6,'perdit':200,'pression':18.2,'scabrezza':0.02},
{'nome':'polietilene DE225 PE100 PN16','diametro':184,'perdit':225,'pression':20.5,'scabrezza':0.02},
{'nome':'polietilene DE250 PE100 PN16','diametro':204.6,'perdit':250,'pression':22.7,'scabrezza':0.02},
{'nome':'polietilene DE280 PE100 PN16','diametro':229.2,'perdit':280,'pression':25.4,'scabrezza':0.02},
{'nome':'polietilene DE315 PE100 PN16','diametro':257.8,'perdit':315,'pression':28.6,'scabrezza':0.02},
{'nome':'PVC DE 90 PN16','diametro':76.6,'perdit':90,'pression':6.7,'scabrezza':0.02},
{'nome':'PVC DE110 PN16','diametro':96.8,'perdit':110,'pression':6.6,'scabrezza':0.02},
{'nome':'PVC DE140 PN16','diametro':123.4,'perdit':140,'pression':8.3,'scabrezza':0.02},
{'nome':'PVC DE160 PN16','diametro':141,'perdit':160,'pression':9.5,'scabrezza':0.02},
{'nome':'PVC DE180 PN16','diametro':158.6,'perdit':180,'pression':10.7,'scabrezza':0.02},
{'nome':'PVC DE200 PN16','diametro':176.2,'perdit':200,'pression':11.9,'scabrezza':0.02},
{'nome':'PVC DE225 PN16','diametro':198.2,'perdit':225,'pression':13.4,'scabrezza':0.02},
{'nome':'PVC DE250 PN16','diametro':220.4,'perdit':250,'pression':14.8,'scabrezza':0.02},
{'nome':'PVC DE280 PN16','diametro':246.8,'perdit':280,'pression':16.6,'scabrezza':0.02},
{'nome':'PVC DE315 PN16','diametro':277.6,'perdit':315,'pression':18.7,'scabrezza':0.02},
{'nome':'acciaio DN 25 (1") UNI EN 10255 serie media ','diametro':27.3,'perdit':33.7,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 32 (1" 1/4) UNI EN 10255 serie media ','diametro':36,'perdit':42.4,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 40 (1" 1/2) UNI EN 10255 serie media ','diametro':41.9,'perdit':48.3,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN 50 (2") UNI EN 10255 serie media ','diametro':53.1,'perdit':60.3,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN 65 (2" 1/2) UNI EN 10255 serie media ','diametro':68.9,'perdit':76.1,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN 80 (3") UNI EN 10224','diametro':82.5,'perdit':88.9,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN100 (4") UNI EN 10224','diametro':107.9,'perdit':114.3,'pression':3.2,'scabrezza':0.15},
{'nome':'acciaio DN125 (5") UNI EN 10224','diametro':132.5,'perdit':139.7,'pression':3.6,'scabrezza':0.15},
{'nome':'acciaio DN150 (6") UNI EN 10224','diametro':160.3,'perdit':168.3,'pression':4,'scabrezza':0.15},
{'nome':'acciaio DN200 (8") UNI EN 10224','diametro':209.1,'perdit':219.1,'pression':5,'scabrezza':0.15},
{'nome':'ghisa DE 90 tipo BLUTOP','diametro':84,'perdit':90,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE110 tipo BLUTOP','diametro':104,'perdit':110,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DE140 tipo BLUTOP','diametro':133.6,'perdit':140,'pression':3.2,'scabrezza':0.15},
{'nome':'ghisa DE160 tipo BLUTOP','diametro':153.2,'perdit':160,'pression':3.4,'scabrezza':0.15},
{'nome':'ghisa DN 80  UNI EN 545','diametro':92,'perdit':98,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN100  UNI EN 545','diametro':112,'perdit':118,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN150  UNI EN 545','diametro':164,'perdit':170,'pression':3,'scabrezza':0.15},
{'nome':'ghisa DN200  UNI EN 545','diametro':215.8,'perdit':222,'pression':3.1,'scabrezza':0.15},
{'nome':'ghisa DN250  UNI EN 545','diametro':266.2,'perdit':274,'pression':3.9,'scabrezza':0.15},
{'nome':'ghisa DN300  UNI EN 545','diametro':316.8,'perdit':326,'pression':4.6,'scabrezza':0.15}
  ]

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
  {"nome":"PVC SN8 DN110",                      "desterno":110.0, "dinterno":103.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN125",                      "desterno":125.0, "dinterno":117.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN160",                      "desterno":160.0, "dinterno":150.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN200",                      "desterno":200.0, "dinterno":188.2, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN250",                      "desterno":250.0, "dinterno":235.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN315",                      "desterno":315.0, "dinterno":296.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN355",                      "desterno":355.0, "dinterno":334.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN400",                      "desterno":400.0, "dinterno":376.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN450",                      "desterno":450.0, "dinterno":423.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN500",                      "desterno":500.0, "dinterno":470.8, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN630",                      "desterno":630.0, "dinterno":593.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN710",                      "desterno":710.0, "dinterno":668.6, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC SN8 DN800",                      "desterno":800.0, "dinterno":753.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN200",          "desterno":200.0, "dinterno":187.6, "scabrezza":0.02,"kval":87.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN250",          "desterno":250.0, "dinterno":234.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN315",          "desterno":315.0, "dinterno":295.4, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN400",          "desterno":400.0, "dinterno":375,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN500",          "desterno":500.0, "dinterno":469,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN630",          "desterno":630.0, "dinterno":591.2, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN710",          "desterno":710.0, "dinterno":660,   "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN800",          "desterno":800.0, "dinterno":751.1, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN900",          "desterno":900.0, "dinterno":844, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90.0},
  {"nome":"PVC STRUTTURATO SN8 DN1000",         "desterno":1000.0,"dinterno":944, "scabrezza":0.02,"kval":88.0,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN110",  "desterno":110,   "dinterno":103.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN125",  "desterno":125,   "dinterno":117.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN140",  "desterno":140,   "dinterno":131.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN160",  "desterno":160,   "dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN180",  "desterno":180,   "dinterno":168.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN200",  "desterno":200,   "dinterno":187.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN225",  "desterno":225,   "dinterno":211.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN250",  "desterno":250,   "dinterno":234.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN280",  "desterno":280,   "dinterno":262.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN315",  "desterno":315,   "dinterno":295.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN355",  "desterno":355,   "dinterno":332.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN400",  "desterno":400,   "dinterno":375.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN450",  "desterno":450,   "dinterno":422.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN500",  "desterno":500,   "dinterno":469.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN560",  "desterno":560,   "dinterno":525.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN630",  "desterno":630,   "dinterno":590.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN710",  "desterno":710,   "dinterno":666.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN800",  "desterno":800,   "dinterno":750.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN900",  "desterno":900,   "dinterno":844.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE x scarichi fognari PN3.2 DN1000", "desterno":1000,  "dinterno":938.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN50",                    "desterno":50,    "dinterno":44.0,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN63",                    "desterno":63,    "dinterno":55.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN75",                    "desterno":75,    "dinterno":66.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN90",                    "desterno":90,    "dinterno":79.2,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN110",                   "desterno":110,"dinterno":96.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN125",                   "desterno":125,"dinterno":110.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN140",                   "desterno":140,"dinterno":123.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN160",                   "desterno":160,"dinterno":141.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN180",                   "desterno":180,"dinterno":158.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN200",                   "desterno":200,"dinterno":176.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN225",                   "desterno":225,"dinterno":198.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN250",                   "desterno":250,"dinterno":220.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN280",                   "desterno":280,"dinterno":246.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN315",                   "desterno":315,"dinterno":277.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN355",                   "desterno":355,"dinterno":312.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN400",                   "desterno":400,"dinterno":352.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN450",                   "desterno":450,"dinterno":396.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN500",                   "desterno":500,"dinterno":440.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN560",                   "desterno":560,"dinterno":493.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN630",                   "desterno":630,"dinterno":555.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN710",                   "desterno":710,"dinterno":625.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN800",                   "desterno":800,"dinterno":705.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN900",                   "desterno":900,"dinterno":793.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN10 DN1000",                  "desterno":1000,"dinterno":881.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN20",                    "desterno":20,"dinterno":16.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN25",                    "desterno":25,"dinterno":20.4,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN32",                    "desterno":32,"dinterno":26.0,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN40",                    "desterno":40,"dinterno":32.6,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN50",                    "desterno":50,"dinterno":40.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN63",                    "desterno":63,"dinterno":51.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN75",                    "desterno":75,"dinterno":61.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN90",                    "desterno":90,"dinterno":73.6,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN110",                   "desterno":110,"dinterno":90.0,"scabrezza":0.02,"kval":86,"scabrezzaGS":0},
  {"nome":"PE100 PN16 DN125",                   "desterno":125,"dinterno":102.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN140",                   "desterno":140,"dinterno":114.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN160",                   "desterno":160,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN180",                   "desterno":180,"dinterno":147.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN200",                   "desterno":200,"dinterno":163.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN225",                   "desterno":225,"dinterno":184.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN250",                   "desterno":250,"dinterno":204.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN280",                   "desterno":280,"dinterno":229.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN315",                   "desterno":315,"dinterno":257.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN355",                   "desterno":355,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN400",                   "desterno":400,"dinterno":327.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN450",                   "desterno":450,"dinterno":368.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN500",                   "desterno":500,"dinterno":409.2,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN560",                   "desterno":560,"dinterno":458.4,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN16 DN630",                   "desterno":630,"dinterno":515.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN20",                    "desterno":20,"dinterno":14.0,"scabrezza":0.02,"kval":81,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN25",                    "desterno":25,"dinterno":18.0,"scabrezza":0.02,"kval":82,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN32",                    "desterno":32,"dinterno":23.2,"scabrezza":0.02,"kval":83,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN40",                    "desterno":40,"dinterno":29.0,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN50",                    "desterno":50,"dinterno":36.2,"scabrezza":0.02,"kval":84,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN63",                    "desterno":63,"dinterno":45.8,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN75",                    "desterno":75,"dinterno":54.4,"scabrezza":0.02,"kval":85,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN90",                    "desterno":90,"dinterno":65.4,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN110",                   "desterno":110,"dinterno":79.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN125",                   "desterno":125,"dinterno":90.8,"scabrezza":0.02,"kval":86,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN140",                   "desterno":140,"dinterno":101.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN160",                   "desterno":160,"dinterno":116.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN180",                   "desterno":180,"dinterno":130.8,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN200",                   "desterno":200,"dinterno":145.2,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN225",                   "desterno":225,"dinterno":163.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN250",                   "desterno":250,"dinterno":201.6,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN280",                   "desterno":280,"dinterno":203.4,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN315",                   "desterno":315,"dinterno":228.8,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN355",                   "desterno":355,"dinterno":258.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN400",                   "desterno":400,"dinterno":290.6,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE100 PN25 DN450",                   "desterno":450,"dinterno":327.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN125",             "desterno":125,"dinterno":105.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN160",             "desterno":160,"dinterno":137.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN200",             "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN250",             "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN315",             "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN400",             "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN500",             "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN630",             "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN800",             "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN1000",            "desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PE CORRUGATO SN8 DN1200",            "desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN200", "desterno":200,"dinterno":172.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN250", "desterno":250,"dinterno":218.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN315", "desterno":315,"dinterno":272.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN400", "desterno":400,"dinterno":347.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN500", "desterno":500,"dinterno":433.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN630", "desterno":630,"dinterno":535.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN800", "desterno":800,"dinterno":678.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN1000","desterno":1000,"dinterno":852.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"POLIPROPILENE CORRUGATO SN16 DN1200","desterno":1200,"dinterno":1030.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"CLS DN300",                          "desterno":300,"dinterno":300.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
  {"nome":"CLS DN400",                          "desterno":400,"dinterno":400.0,"scabrezza":0.4,"kval":64,"scabrezzaGS":90},
  {"nome":"CLS DN500",                          "desterno":500,"dinterno":500.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
  {"nome":"CLS DN600",                          "desterno":600,"dinterno":600.0,"scabrezza":0.4,"kval":65,"scabrezzaGS":90},
  {"nome":"CLS DN800",                          "desterno":800,"dinterno":800.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
  {"nome":"CLS DN1000",                         "desterno":1000,"dinterno":1000.0,"scabrezza":0.4,"kval":66,"scabrezzaGS":90},
  {"nome":"CLS DN1200",                         "desterno":1200,"dinterno":1200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN1400",                         "desterno":1400,"dinterno":1400.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN1600",                         "desterno":1600,"dinterno":1600.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN1800",                         "desterno":1800,"dinterno":1800.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN2000",                         "desterno":2000,"dinterno":2000.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN2200",                         "desterno":2200,"dinterno":2200.0,"scabrezza":0.4,"kval":67,"scabrezzaGS":90},
  {"nome":"CLS DN2400",                         "desterno":2400,"dinterno":2400.0,"scabrezza":0.4,"kval":68,"scabrezzaGS":90},
  {"nome":"GHISA DN40",                         "desterno":40,"dinterno":40.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
  {"nome":"GHISA DN50",                         "desterno":50,"dinterno":50.0,"scabrezza":0.15,"kval":66,"scabrezzaGS":90},
  {"nome":"GHISA DN75",                         "desterno":75,"dinterno":75.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
  {"nome":"GHISA DN80",                         "desterno":80,"dinterno":80.0,"scabrezza":0.15,"kval":68,"scabrezzaGS":90},
  {"nome":"GHISA DN100",                        "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
  {"nome":"GHISA DN125",                        "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
  {"nome":"GHISA DN150",                        "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
  {"nome":"GHISA DN200",                        "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
  {"nome":"GHISA DN250",                        "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
  {"nome":"GHISA DN300",                        "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GHISA DN350",                        "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GHISA DN400",                        "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GHISA DN450",                        "desterno":450,"dinterno":450.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GHISA DN500",                        "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN600",                        "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN700",                        "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN800",                        "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN900",                        "desterno":900,"dinterno":900.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN1000",                       "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GHISA DN1100",                       "desterno":1100,"dinterno":1100.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN1200",                       "desterno":1200,"dinterno":1200.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN1400",                       "desterno":1400,"dinterno":1400.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN1500",                       "desterno":1500,"dinterno":1500.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN1600",                       "desterno":1600,"dinterno":1600.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN1800",                       "desterno":1800,"dinterno":1800.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GHISA DN2000",                       "desterno":2000,"dinterno":2000.0,"scabrezza":0.15,"kval":74,"scabrezzaGS":90},
  {"nome":"GRES DN100",                         "desterno":100,"dinterno":100.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
  {"nome":"GRES DN125",                         "desterno":125,"dinterno":125.0,"scabrezza":0.15,"kval":69,"scabrezzaGS":90},
  {"nome":"GRES DN150",                         "desterno":150,"dinterno":150.0,"scabrezza":0.15,"kval":70,"scabrezzaGS":90},
  {"nome":"GRES DN200",                         "desterno":200,"dinterno":200.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
  {"nome":"GRES DN250",                         "desterno":250,"dinterno":250.0,"scabrezza":0.15,"kval":71,"scabrezzaGS":90},
  {"nome":"GRES DN300",                         "desterno":300,"dinterno":300.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GRES DN350",                         "desterno":350,"dinterno":350.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GRES DN400",                         "desterno":400,"dinterno":400.0,"scabrezza":0.15,"kval":72,"scabrezzaGS":90},
  {"nome":"GRES DN500",                         "desterno":500,"dinterno":500.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GRES DN600",                         "desterno":600,"dinterno":600.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GRES DN700",                         "desterno":700,"dinterno":700.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GRES DN800",                         "desterno":800,"dinterno":800.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"GRES DN1000",                        "desterno":1000,"dinterno":1000.0,"scabrezza":0.15,"kval":73,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN150",           "desterno":150,"dinterno":150.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN200",           "desterno":200,"dinterno":200.0,"scabrezza":0.02,"kval":87,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN250",           "desterno":250,"dinterno":250.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN300",           "desterno":300,"dinterno":300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN350",           "desterno":350,"dinterno":350.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN400",           "desterno":400,"dinterno":400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN500",           "desterno":500,"dinterno":500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN600",           "desterno":600,"dinterno":600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN650",           "desterno":650,"dinterno":650.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN700",           "desterno":700,"dinterno":700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN750",           "desterno":750,"dinterno":750.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN800",           "desterno":800,"dinterno":800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN850",           "desterno":850,"dinterno":850.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN900",           "desterno":900,"dinterno":900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN950",           "desterno":950,"dinterno":950.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1000",          "desterno":1000.0,"dinterno":1000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1100",          "desterno":1100.0,"dinterno":1100.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1200",          "desterno":1200.0,"dinterno":1200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1300",          "desterno":1300.0,"dinterno":1300.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1400",          "desterno":1400.0,"dinterno":1400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1500",          "desterno":1500.0,"dinterno":1500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1600",          "desterno":1600.0,"dinterno":1600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1700",          "desterno":1700.0,"dinterno":1700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1800",          "desterno":1800.0,"dinterno":1800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN1900",          "desterno":1900.0,"dinterno":1900.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2000",          "desterno":2000.0,"dinterno":2000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2200",          "desterno":2200.0,"dinterno":2200.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2400",          "desterno":2400.0,"dinterno":2400.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2500",          "desterno":2500.0,"dinterno":2500.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2600",          "desterno":2600.0,"dinterno":2600.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2700",          "desterno":2700.0,"dinterno":2700.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN2800",          "desterno":2800.0,"dinterno":2800.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90},
  {"nome":"PRFV (vetroresina) DN3000",          "desterno":3000.0,"dinterno":3000.0,"scabrezza":0.02,"kval":88,"scabrezzaGS":90}
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
      var AllacciamentoNuovo1 = {'nome':'polietilene multistr. DE 32 (1") PE100 PN16','diametro':26,'perdit':32,'pression':3,'scabrezza':0.02};
      var AllacciamentoNuovo2 = {'nome':'polietilene multistr. DE 50 (1"1/2) PE100 PN16','diametro':40.8,'perdit':50,'pression':4.6,'scabrezza':0.02};
      var AllacciamentoNuovo3 = {'nome':'polietilene multistr. DE 63 (2") PE100 PN16','diametro':51.4,'perdit':63,'pression':5.8,'scabrezza':0.02};  
      var AllacciamentoNuovo4 = {'nome':'polietilene DE 90 (3") PE100 PN16','diametro':73.6,'perdit':90,'pression':8.2,'scabrezza':0.02};
      var AllacciamentoNuovo5 = {'nome':'polietilene DE110 (4") PE100 PN16','diametro':90,'perdit':110,'pression':10,'scabrezza':0.02};
      var AllacciamentoNuovo6 = {};
      var AllacciamentoEsistente = {};
     
      this.ads.DimensionamentoAllacciFognatura = new DimensionamentoAllacciFognatura(
        // old parameters
        this.rete_stradale[0], 0, 0, 0,new UnitaSingola(0,""), new UnitaDeroga(0,""), arrayContatore,0,0,0,AllacciamentoNuovo1,AllacciamentoNuovo2,AllacciamentoNuovo3,AllacciamentoNuovo4,AllacciamentoNuovo5,AllacciamentoNuovo6,AllacciamentoEsistente,{},
        // old parameters
        new ParametriAcqueNere(0,0,0,0,0,0,0),new ParametriAcqueBianche(0,0,0,0,0,0,0,0), new ParametriVincoli(0,0,1.0,0,0,0),
        );    
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
      let vincoli = this.ads.DimensionamentoAllacciFognatura.Vincoli;
      vincoli.portataMista = this.ads.DimensionamentoAllacciFognatura.AcqueBianche.portata + this.ads.DimensionamentoAllacciFognatura.AcqueNere.portata;
      vincoli.totaleUIeq = this.ads.DimensionamentoAllacciFognatura.AcqueBianche.sommaUIeq + this.ads.DimensionamentoAllacciFognatura.AcqueNere.sommaUIeq;
      vincoli.pendenza = (Number(vincoli.lunghezza) > 0)? Number(vincoli.dislivello)/vincoli.lunghezza : 1.0;
      let deflux = DefluxScale.compute(this.tableParams.def_h_r);
      vincoli.diamIntMinimo = Math.pow(((vincoli.portataMista/1000.0)/(90.0*deflux?.A_r2*(Math.pow(deflux.Rh_r,(2.0/3.0)))*Math.sqrt(vincoli.pendenza))),(3.0/8.0))*2000.0;  
      // = ((($C$17/1000)/(90*(Tabelle!$G$341)*((Tabelle!$H$341)^(2/3))*RADQ(FOGNATURA!$C$21)))^(3/8))*2*1000
      
      /*
      
      */

    }

  } 

  calcolaPortata(dim,percentage){
    console.log("calcola Portata");
    /*
    3600*(CERCA.VERT((2*C9/100);$C$201:$K$401;2;FALSO)*$D$5*RADQ($C$2)*PI.GRECO()*((($C$5/1000)^2)/4)*(($C$5/4000)^(2/3)))
     3600*(
        CERCA.VERT((2*C9/100);$C$201:$K$401;2;FALSO)*
        $D$5*
        RADQ($C$2)*
        PI.GRECO()*
        ((($C$5/1000)^2) / 4)*
        (($C$5/4000)^(2/3))
      )/3.6
    */
    let deflux = DefluxScale.compute(2.0*percentage/100.0),
        res = (deflux.Q_Qr);
    res *= dim.kval;
    res *= Math.sqrt(this.ads.DimensionamentoAllacciFognatura.Vincoli.pendenza);
    res *= Math.PI;
    res *= (Math.pow(dim.dinterno/1000.0,2) / 4.0);
    res *= Math.pow(dim.dinterno/4000.0,(2.0/3.0));
    res *= 1000.0;

    return res;
  }

  calcolaRiempimento(dim){
    
  }
  
  //--------------------------------------------------------------------------------
  //          OLD METHODS
  //--------------------------------------------------------------------------------
  
  updateAntincendio(index, isLS){
    console.log("updateAntincendio");
    return;
    /*if(this.lockUpdateAntincendio){
      this.lockUpdateAntincendio = !this.lockUpdateAntincendio;
      return;
    }*/
    setTimeout(()=>{
    this.lockUpdateAntincendio = true;
    if(isLS)
      this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH = Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataLS) * 3.6;
    else
      this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataLS = Number((this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH/3.6).toFixed(4));
    
    var tot = 0;
    for(let item of this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio){
      if(item.portataMH >0 && item.numero >0)  
      tot += item.numero * item.portataMH;
    }
    this.ads.DimensionamentoAllacciFognatura.PortataCalcoloB = tot.toFixed(2);
    this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale = tot + this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA;
    this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale = this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale.toFixed(2);

    if(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH < 2.51) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 15 (3x15) (2,5x15)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 4.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 20 (5x20-4x20)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 6.31) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 25 (7x25-6,3x25)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 10.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 32 (10x30)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 16.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 40 (20x40-16x40)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 25.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 50 (W50)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 63.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 80 (W80)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 100.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 100 (W100)";
    else if(Number(this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].portataMH) < 250.01) this.ads.DimensionamentoAllacciFognatura.ContatoriAntincendio[index].tipoContatore = "DN 150 (W150)";
    });
  }

  updatePortataCalcoloA(value){
    console.log("updatePortataCalcoloA");
    return;
    
    if(!value) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 0;
    else if(value == 0) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 0;
    else if(value == 1) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 1.73;
    else if(value == 2) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 2.34;
    else if(value == 3) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 2.81;
    else if(value == 4) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 3.13;
    else if(value == 5) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 3.42;
    else if(value == 6) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 3.85;
    else if(value == 7) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 4.03;
    else if(value == 8) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 4.25;
    else if(value == 9) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 4.54;
    else if(value == 10) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 4.68;
    else if(value == 11) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 4.86;
    else if(value == 12) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.08;
    else if(value == 13) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.22;
    else if(value == 14) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.44;
    else if(value == 15) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.62;
    else if(value == 16) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.69;
    else if(value == 17) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.76;
    else if(value == 18) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 5.95;
    else if(value == 19) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 6.12;
    else if(value == 20) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 6.48;
    else if(value == 21) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 6.60;
    else if(value == 22) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 6.84;
    else if(value == 23) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 6.90;
    else if(value == 24) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.10;
    else if(value == 25) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.20;
    else if(value == 26) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.40;
    else if(value == 27) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.60;
    else if(value == 28) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.80;
    else if(value < 31) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 7.92;
    else if(value < 34) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 8.46;
    else if(value < 37) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 9.00;
    else if(value < 41) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 9.36;
    else if(value < 44) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 9.72;
    else if(value < 47) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 10.08;
    else if(value < 50) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 10.44;
    else if(value < 53) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 10.80;
    else if(value < 56) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 11.52;
    else if(value < 59) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 11.88;
    else if(value < 63) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 12.24;
    else if(value < 69) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 12.96;
    else if(value < 75) this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA = 13.68;

    this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale = Number (this.ads.DimensionamentoAllacciFognatura.PortataCalcoloA) +  Number (this.ads.DimensionamentoAllacciFognatura.PortataCalcoloB);
    this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale =  this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale.toFixed(2);
  }

  updateContatoreSingola(){
    this.ads.DimensionamentoAllacciFognatura.UnitaSingola.tipoContatore = "DN 15 (3x15) (2,5x15)"; 
    if(!this.ads.DimensionamentoAllacciFognatura.UnitaSingola.numero) this.ads.DimensionamentoAllacciFognatura.UnitaSingola.tipoContatore = "";

    this.updatePortataCalcoloA(this.ads.DimensionamentoAllacciFognatura.UnitaSingola.numero);
  }

  updateContatoreDeroga(){
    var unita = this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.numero;
    this.updatePortataCalcoloA(unita);

    if(!unita)  {this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "";return;}
    if(unita== 1) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 15 (3x15) (2,5x15)"; return;}
    if(unita< 11) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore =  "DN 20 (5x20) (4x20)";return;}
    if(unita< 16) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 25 (7x25) (6,3x25)";return;}
    if(unita< 21) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 32 (10x30)";return;}
    if(unita< 41) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 40 (20x40) (16x40)";return;}
    if(unita< 71) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 50 (W50)";return;}
    if(unita< 101) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 80 (W80)";return;}
    if(unita< 501) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 100 (W100)";return;}
    if(unita > 501) {  this.ads.DimensionamentoAllacciFognatura.UnitaDeroga.tipoContatore = "DN 150 (W150)";return;}

  }


  calcolaVelocita(diametro){
    if(!diametro || !this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale) return undefined;
    var velocita = (this.ads.DimensionamentoAllacciFognatura.PortataCalcoloTotale/3600)/(3.14159265358979*(diametro/2000)*(diametro/2000));
    return velocita.toFixed(2);
  }

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

  calcolaPerdita(){
    console.log("calcolaPerdita");
    return;
    
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente) this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5.diametro);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6)    this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6.velocita = this.calcolaVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6.diametro);
  
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente);
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1)   ;
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2)   ;
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3)   ;
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4)   ;
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5)   ;
      this.setColorVelocita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6)   ;

      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6) this.calcolaPerditaContatore(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6, this.ads.DimensionamentoAllacciFognatura.NumeroPerdite, this.ads.DimensionamentoAllacciFognatura.LunghezzaAllacciamento);
  
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente, true);
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1)   ;
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2)   ;
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3)   ;
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4)   ;
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5)   ;
      this.setColorPerdita(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6)   ;


      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente && this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.nome) this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoEsistente.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo1.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo2.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo3.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo4.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo5.perdita).toFixed(3);
      if(this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6 && this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6.nome) this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6.pressione = (this.ads.DimensionamentoAllacciFognatura.PressioneRete - this.ads.DimensionamentoAllacciFognatura.AllacciamentoNuovo6.perdita).toFixed(3);


  }

  calcolaPerditaContatore(item,curve, lunghezza){
    if(lunghezza <1 || !item.velocita) return;
    var scabrezza = item.scabrezza;
    var velocita = item.velocita;
    var diametro = item.diametro;

    var viscosita = 0.00000122;
    var estremoSup = 0.12;
    var estremoInf = 0.0008;
  
    var reynolds = velocita * (diametro / 1000)/ viscosita;
    
    var sogliaPrecisione = 0.000001;
    
    var termina = false;
    var lambda;
    var iterazione = 0;
    while(termina == false){
      iterazione++;
      if(iterazione > 1000) return;
      lambda = (estremoSup + estremoInf) / 2;
      var parte1 = (1 / Math.sqrt(lambda));
      var parte2 = (scabrezza/diametro)/3.71;
      var parte3 =2.51 / (reynolds * Math.sqrt(lambda));
      
      var risultato = (1 / Math.sqrt(lambda)) + (2 * Math.log10(((scabrezza/diametro)/3.71 ) +  (2.51 / (reynolds * Math.sqrt(lambda)))));
      if((risultato * risultato) <= (sogliaPrecisione * sogliaPrecisione)) {
        termina = true;
      } 
      if(risultato < 0) estremoSup = lambda;
      if(risultato > 0) estremoInf = lambda;
      }	
    var perdita = this.trovaPerdita(lambda, diametro, velocita, curve, lunghezza );
    item.perdita = perdita.toFixed(3);
  }
  
  
  trovaPerdita(lambda, diametro, velocita, curve, lunghezza){
    var lungh = Number(lunghezza) + (1.5 * curve);
    var perdita = lambda / (diametro/1000) * velocita * velocita / (2 * 9.81) * lungh;
    return perdita*0.0981;
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
