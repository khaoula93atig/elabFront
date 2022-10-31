import {Utilisateur} from './Utilisateur';
import {Matiere} from './Matiere';
import {EType} from './EType';

export class Enseignant {
  id: number;
  type: EType;
  utilisateur: Utilisateur;
  matieres: Matiere[];

}
