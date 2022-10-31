import { Enseignant } from "./Enseignant";

export class Affichageexercice{
    status:number;
    nom : string;
    fichier : string;
    description : string;
    groupe : string[];
    deadline : Date;
    enseignant :Enseignant;
}