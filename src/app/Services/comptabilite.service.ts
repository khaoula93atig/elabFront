import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../models/Admin';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import {Comptabilite} from '../models/Comptabilite';

@Injectable({
  providedIn: 'root'
})
export class ComptabiliteService {

  constructor(private http: HttpClient) { }

  public Calcul(id : number):Observable<Comptabilite>{
    // @ts-ignore
    return this.http.post<Comptabilite>(`${CONFIG.URL}comptabilte/ajout/`+id);
  }

  public GetbyID(id : number):Observable<Comptabilite>{
    // @ts-ignore
    return this.http.post<Comptabilite>(`${CONFIG.URL}comptabilte/getById/`+id);
  }

  public AjouterDepence(id : number, nouveauCalcul: number):Observable<Comptabilite>{
    // @ts-ignore
    return this.http.post<Comptabilite>(`${CONFIG.URL}comptabilte/modifierDepence/`+id +`/`+nouveauCalcul);
  }

  public AjouterRecompence(id : number, nouveauCalcul: number):Observable<Comptabilite>{
    // @ts-ignore
    return this.http.post<Comptabilite>(`${CONFIG.URL}comptabilte/modifierRecomp/`+id+`/`+nouveauCalcul);
  }

}
