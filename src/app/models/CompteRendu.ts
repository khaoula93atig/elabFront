import { Devoir } from "./Devoir";
import { Eleve } from "./Eleve";
import { Eval } from "./Eval";

export class CompteRendu{
    id: number;
    titre: String;
    description: String;
    fichier: String;
    dateInsertion: Date;
    archive: Boolean;
    devoir: Devoir;
    eleve: Eleve;
    remarque: Eval;
}