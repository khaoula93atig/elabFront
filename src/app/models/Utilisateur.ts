import {Authority} from './Authority';

export class Utilisateur{
  id: number;
  nom: string;
  prenom: string;
  sexe: string;
  date_naissance: Date;
  Age: number;
  email: string;
  num_tel: string;
  adress: string;
  pays: string;
  photo: string;
  login: string;
  motDePasse: string;
  profil: string;
  dateInsertion: Date;
  statuArchive: boolean;
  authority: Authority[];
  connected : boolean;
}
