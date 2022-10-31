import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import { Remarque } from '../models/Remarque';
@Injectable({
  providedIn: 'root'
})
export class RemarqueService {

  constructor(private http: HttpClient) { }

  public GetByEnseignant(id : number): Observable<Remarque[]>{
    return this.http.get<Remarque[]>(`${CONFIG.URL}Remarque/GetRemarqueByEnseignant/`+ id);
  }

  public ajout(remarque:Remarque,channel:string): Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}Remarque/ajout/`+channel,remarque);
  }

  public getByElvAndEns(idelv,idens): Observable<Remarque[]>{
    return this.http.get<Remarque[]>(`${CONFIG.URL}Remarque/GetByEleveAndEnseignant/`+ idelv +`/`+idens);
  }
}

