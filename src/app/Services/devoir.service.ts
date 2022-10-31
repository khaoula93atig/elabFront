import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import { Devoir } from '../models/Devoir';
import { dev } from '../models/dev';
@Injectable({
  providedIn: 'root'
})
export class DevoirService {

  constructor(private http: HttpClient) { }

  public  tdbyType(type:dev): Observable<Devoir[]>{
    return this.http.get<Devoir[]> (`${CONFIG.URL}TD/tdbyType/`+type);
  }

  public tdbyTypeAndEns(id: number, type: dev ): Observable<Devoir[]>{
    let params = new HttpParams();
    params =params.append("id",id);
    params = params.append("type",type);
    return this.http.get<Devoir[]>(`${CONFIG.URL}TD/tdbyTypeAndEns`,{params:params});
  }

  public tdbyTypeAndGrp(nom: string, type: dev ): Observable<Devoir[]>{
    let params = new HttpParams();
    params =params.append("nom",nom);
    params = params.append("type",type);
    return this.http.get<Devoir[]>(`${CONFIG.URL}TD/tdbyTypeAndGrp`,{params:params});
  }

  public tdbyTypeAndGrpAndEns(nom: string, type: dev, id: number ): Observable<Devoir[]>{
    let params = new HttpParams();
    params =params.append("nom",nom);
    params = params.append("type",type);
    params = params.append("id",id);
    return this.http.get<Devoir[]>(`${CONFIG.URL}TD/tdbyTypeAndGrpAndEns`,{params:params});
  }


  public tdbytitre(titre : string): Observable<Devoir>{
    return this.http.get<Devoir> (`${CONFIG.URL}TD/tdbytitre/`+titre);
  }

  public GetById(id : number): Observable<Devoir>{
    return this.http.get<Devoir> (`${CONFIG.URL}TD/tdbyId/`+id);
  }

  ajout(formData) {


    return this.http.post(
      CONFIG.URL +
        "TD/Ajout" ,
        formData,
      { observe: "response" }

    );

  }

  Modifier(formData, id) {


    return this.http.put(
      CONFIG.URL +
        "TD/modifierFile/"+id,
        formData,
      { observe: "response" }

    );

  }

  ModifierExercice(devoir:Devoir):Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}TD/modifier`, devoir);
  }

  public archiver(id:number): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}TD/archiver/`+ id);
  }
  
}
