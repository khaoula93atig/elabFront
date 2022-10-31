import { dev } from "./dev";
import { Enseignant } from "./Enseignant";
import { Groupe } from "./Groupe";

export class Devoir{
    id: number;
    titre: string;
    description: string;
    fichier: string;
    dateInsertion: Date;
    deadline: Date;
    archive: Boolean;
    enseignant: Enseignant;
    type: dev;
    groupes: Groupe[];
}