import {Utilisateur} from './Utilisateur';
import {Parent} from './Parent';
import { Matiere } from './Matiere';
import { Groupe } from './Groupe';

export class Eleve{
  id: number;
  payer: boolean;
  utilisateur: Utilisateur;
  parent: Parent;
  matieres: Matiere[];
  groupes: Groupe[];
  archive: boolean;

}
