import {Enseignant} from './Enseignant';

export class Niveau{
  id: number;

  nom: string;

  archive: boolean;

  dateInsertion: Date;

 enseignants: Enseignant[];

}
