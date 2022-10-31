import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import {Formation} from '../models/Formation';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  public allFormation(): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${CONFIG.URL}Formation/GetAllFormation`);
  }

  public ajoutFormation(formation : Formation):Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}Formation/ajout`, formation);
  }

  public GetByEnseignant(id : number): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${CONFIG.URL}Formation/GetByEnseignant/`+id);
 }
  public getbyGroupe(id:number): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${CONFIG.URL}Formation/GetByGroupe/`+ id);
  }
  public modifierformation(formation: Formation, id:number):Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}Formation/Modifier/`+ id,formation);
  }
  public getbyid(id:number):Observable<Formation>{
    return this.http.get<Formation>(`${CONFIG.URL}Formation/Getbyid/`+ id);
  }

  public GetAllByEleve(id:number):Observable<Formation[]>{
    return this.http.get<Formation[]>(`${CONFIG.URL}Formation/GetAllByEleve/`+ id);
  }
}
