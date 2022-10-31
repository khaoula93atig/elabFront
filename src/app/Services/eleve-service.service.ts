import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/environments/environment';
import { Eleve } from '../models/Eleve';
import { Groupe } from '../models/Groupe';
import { Parent } from '../models/Parent';
import {Enseignant} from '../models/Enseignant';
import {Admin} from '../models/Admin';

@Injectable({
  providedIn: 'root'
})
export class EleveServiceService {

  constructor(private http : HttpClient) {}

  public ajout(ajout:Eleve): Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}eleve/ajout`,ajout) ;
  }

  public ModifierEleve(id: number, eleve:Eleve): Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}eleve/modifierEleve/`+id, eleve) ;
  }

  public archiver(id:number): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}eleve/archiver/`+ id);
  }

  public GetAll(): Observable<Eleve[]>{
    return this.http.get<Eleve[]>(`${CONFIG.URL}eleve/getall`) ;
  }

  public findbyid(id:number): Observable<Eleve>{
    return this.http.get<Eleve>(`${CONFIG.URL}eleve/GetById/`+id) ;
  }

  public getparent(getparent:Eleve): Observable<Parent>{
    return this.http.get<Parent>(`${CONFIG.URL}eleve/getparent`) ;
  }

  public getniveau(getniveau:Eleve): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}eleve/getniveau`) ;
  }

  public getpayee(getpayee:Eleve): Observable<Eleve[]>{
    return this.http.get<Eleve[]>(`${CONFIG.URL}eleve/getPayant`) ;
  }

  public modifierPayant(modifierPayant:Eleve): Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}eleve/paiement`, modifierPayant) ;
  }

  public modifierNiveau(modifierNiveau:Eleve): Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}eleve/changementNiveau`, modifierNiveau) ;
  }

  public getGroupes(id:number): Observable<Groupe[]>{
    return this.http.get<Groupe[]>(`${CONFIG.URL}eleve/GetGroupes/`+id) ;
  }

  public getEleveByUser(id:number):Observable<Eleve>{
    return this.http.get<Eleve>(`${CONFIG.URL}eleve/GetByUser/`+ id);
  }

  public affecter(nom:Groupe[], id: number):Observable<string>{

    return this.http.post<string>(`${CONFIG.URL}eleve/affecterEleve/`+id, nom) ;
  }

  public getEleveByMatiere(nomMatiere:string,nomNiveau:string):Observable<Eleve[]>{
    return this.http.get<Eleve[]>(`${CONFIG.URL}eleve/Getbymatiere/`+nomMatiere+`/`+ nomNiveau) ;
  }

}
