import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Eleve} from '../models/Eleve';
import {CONFIG} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Parent} from '../models/Parent';
import {Admin} from '../models/Admin';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http : HttpClient) { }

  public GetAll(): Observable<Parent[]>{
    return this.http.get<Parent[]>(`${CONFIG.URL}Parent/allParent`) ;
  }
  public getById(id:number): Observable<Parent>{
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Parent>(`${CONFIG.URL}Parent/GetById`,{params: params});
  }
  public archiver(id:number): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}Parent/archiver/`+id);
  }

  public ajoutParent(parent : Parent):Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}Parent/ajout`, parent);
  }

  public getParentByUser(id : number):Observable<Parent>{
    return this.http.get<Parent>(`${CONFIG.URL}Parent/GetByUser/`+ id);
  }

  public getEnfants(id:number):Observable<Eleve[]>{
    return this.http.get<Eleve[]>(`${CONFIG.URL}Parent/Enfant/`+ id);
  }


}
