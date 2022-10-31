import {Groupe} from './Groupe';

export class GroupeType {
  id: number;
  type: GType;
  prix: number;
  groupes: Groupe[];

}

export  enum GType {
  INDIV, GROUPE
}
