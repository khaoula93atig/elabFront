import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../models/Utilisateur';
import {CONFIG} from '../../environments/environment';
import {Admin} from '../models/Admin';
import {Parent} from '../models/Parent';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient ) { }

  public allAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(`${CONFIG.URL}admin/allAdmin`);
  }

  public ajoutAdmin(admin : Admin):Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}admin/ajout`, admin);
  }

  public getById(id:number): Observable<Admin>{
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Admin>(`${CONFIG.URL}admin/GetById`,{params: params});
  }

  public archiver(id:number): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}admin/archiver/`+id);
  }



}
