import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import { CompteRendu } from '../models/CompteRendu';

@Injectable({
  providedIn: 'root'
})
export class CompteRenduService {

  constructor(private http: HttpClient) { }

  ajout(formData, titre){
    return this.http.post(
      CONFIG.URL +
        "CR/Ajout/"+titre,
        formData,
      { observe: "response" }

    );
  }


   public getByEleveDvr(idEleve,idDvr): Observable<number>{
    return this.http.get<number>(`${CONFIG.URL}CR/getByEleveDvr/`+idEleve+`/`+idDvr);
  }

  public getByDevoir(id): Observable<CompteRendu[]>{
    return this.http.get<CompteRendu[]>(`${CONFIG.URL}CR/getByDvr/`+id);
  }

  public getByDevoirAndGrp(id,nom): Observable<CompteRendu[]>{
    return this.http.get<CompteRendu[]>(`${CONFIG.URL}CR/getByDvrAndGrp/`+id+`/`+nom);
  }
  
  public Evaluer(id,remarque): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}CR/Evaluer/`+id+`/`+remarque);
  }
}
