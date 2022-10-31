import {GroupeType, GType} from './GroupeType';

export class Payement {
  idE: number;
  idF: number;
  date: Date;
  titre: string;
  present: boolean;
  payed: boolean;
  type:GType;
  prix:number;
}
