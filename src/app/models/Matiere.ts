import { Eleve } from "./Eleve";
import { Enseignant } from "./Enseignant";

export class Matiere{
  id: number;
  nommatiere: string;
  archive: boolean;
  dateInsertion: Date;
  nomniveau: string;
  enseignants: Enseignant[];
  eleves: Eleve[];
}
