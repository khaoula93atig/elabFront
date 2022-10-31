import { Cours } from "./Cours";
import { Devoir } from "./Devoir";
import { Eleve } from "./Eleve";
import { Matiere } from "./Matiere";
import {GroupeType} from './GroupeType';

export class Groupe{
    id: number;
    nom: string;
    max: number;
    archive: Boolean;
    dateInsertion: Date;
    matiere: Matiere;
    eleves: Eleve[];
    groupes: Groupe[];
    cours: Cours[];
    TDs: Devoir[];
    groupeType: GroupeType;
}
