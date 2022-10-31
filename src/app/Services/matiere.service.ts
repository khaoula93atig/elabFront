import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import {Matiere} from '../models/Matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor( private http: HttpClient) { }

  public allmatiere(): Observable<Matiere[]>{
    return this.http.get<Matiere[]>(`${CONFIG.URL}Matiere/GetAll`);
  }

  public getMatiereByNomEtNiveau(nommatiere: string, nomniveau: string):Observable<Matiere>{
    let params = new HttpParams();
    params = params.append("nommatiere",nommatiere);
    params = params.append("nomniveau",nomniveau);
    return this.http.get<Matiere>(`${CONFIG.URL}Matiere/GetByNommatiereAndNomniveau`,{params:params});

  }

  public ajout(matiere:Matiere):Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}Matiere/ajout`,matiere);
  }
}
