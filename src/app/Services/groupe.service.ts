import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Formation} from '../models/Formation';
import {CONFIG} from '../../environments/environment';
import {Groupe} from '../models/Groupe';
import {Enseignant} from '../models/Enseignant';
import {GroupeType} from '../models/GroupeType';
import {Eleve} from '../models/Eleve';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http: HttpClient) {
  }

  public allGroupe(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${CONFIG.URL}Groupe/GetAll`);
  }
  public ensDeGroupe(id: number): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(`${CONFIG.URL}Groupe/GetEnseignants/`+id);
  }
  public getbyid(id:number):Observable<Groupe>{
    return this.http.get<Groupe>(`${CONFIG.URL}Groupe/GetById/`+id);
  }
  public getbynom(nom:string):Observable<Groupe>{
    return this.http.get<Groupe>(`${CONFIG.URL}Groupe/GetByNom/`+nom);
  }
  public getAllGroupeType():Observable<GroupeType[]>{
    return this.http.get<GroupeType[]>(`${CONFIG.URL}Groupe/GetAllGroupetype`)
  }
  public ajoutGroupe(groupe:Groupe):Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}Groupe/ajout`,groupe);
  }

  public removeeleve(idGroupe:number,idEleve:number):Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}Groupe/RemoveEleve/`+idGroupe+`/`+idEleve);
  }
  public removeliste(id:number):Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}Groupe/RemoveList/`+id);
  }
  public modifierCapacite(max:number,id:number){
    return this.http.get<string>(`${CONFIG.URL}Groupe/ModifierTaille/`+max+`/`+id);
  }

}

