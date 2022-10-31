import { Eleve } from "./Eleve";
import { Enseignant } from "./Enseignant";

export class Remarque{
    id: number;
    titre: String;
    description: String;
    date_insertion: Date;
    enseignant: Enseignant;
    eleve: Eleve;
    archive: Boolean;
}