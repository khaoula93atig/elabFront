import { Enseignant } from "./Enseignant";
import { Groupe } from "./Groupe";

export class Formation{
    id: number;
    nom: string;
    heuredebut: Date;
    heurefin: Date;
    date: Date;
    lien : string;
    enseignant: Enseignant;
    groupe: Groupe;
}
