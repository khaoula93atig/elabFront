import { Enseignant } from "./Enseignant";
import { Groupe } from "./Groupe";

export class Cours{
    id: number;
    description: String;
    nomcours: String;
    fichier: String;
    archive: Boolean;
    dateInsertion: Date;
    enseignant: Enseignant;
    groupes: Groupe[];
}