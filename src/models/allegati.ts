import { Immagine } from './immagine';
import { VerbaleDiSopralluogo } from './verbale_di_sopralluogo';

export class Allegati {
     _codice_ads: any;
     _codice_odl: any;
     _immagini: Immagine[];
     _verbale_di_sopralluogo: VerbaleDiSopralluogo;

     constructor(codice_ads?: any, codice_odl?: any) {

     }

     addImage(immagine: Immagine) {

     }

     removeImage(nome_immagine: string) {

     }

}