import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Cours } from '../models/Cours';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursService {


  constructor(private http: HttpClient ) { }

  public  GetAll(): Observable<Cours[]>{
    return this.http.get<Cours[]> (`${CONFIG.URL}Cours/GetAll`);
  }

  public GetByEnseignant(id : number): Observable<Cours[]>{
    return this.http.get<Cours[]>(`${CONFIG.URL}Cours/GetByEnseignant/`+ id);
  } 

  public GetByGroupe(nom: string): Observable<Cours[]>{
    return this.http.get<Cours[]>(`${CONFIG.URL}Cours/GetByGroupe/`+ nom);
  } 

ajout(formData) {


    return this.http.post(
      CONFIG.URL +
        "Cours/ajoutFile" ,
        formData,
      { observe: "response" }

    );

  }


Modifier(formData,id) {


    return this.http.put(
      CONFIG.URL +
        "Cours/Modifier/"+id,
        formData,
      { observe: "response" }

    );

  }
ModifierCours(cours:Cours):Observable<string>{
  return this.http.put<string>(`${CONFIG.URL}Cours/ModifierCours`, cours);
}

public archiver(id:number): Observable<string>{
  return this.http.get<string>(`${CONFIG.URL}Cours/archiver/`+ id);
}
  

}
