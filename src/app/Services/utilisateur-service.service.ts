import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CONFIG} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ResetPassword} from '../models/ResetPassword';
import {Utilisateur} from '../models/Utilisateur';
import {Enseignant} from '../models/Enseignant';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {

  constructor( private http: HttpClient) {}
  public resetPassword(resetPassword:ResetPassword): Observable<string>{
    return this.http.post<string>(`${CONFIG.URL}utilisateur/resetPassword`,resetPassword) ;
  }
  public getUserById(id:number): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${CONFIG.URL}utilisateur/getById/`+id);
  }
  public getEnByUser(id):Observable<Enseignant>{
    return this.http.get<Enseignant>(`${CONFIG.URL}enseignant/GetByUser/`+ id);
  }

  public getAllUser():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${CONFIG.URL}utilisateur/AllUser`);
  }
  public getAllUserchat():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${CONFIG.URL}utilisateur/getalluserforchat`);
  }
  public modifieruser(id: number, user: Utilisateur): Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}utilisateur/modifier1/`+ id, user);
  }
  public modifierPhoto(user: FormData , id : number ): Observable<string>{
    return this.http.put<string>(`${CONFIG.URL}utilisateur/updatePhoto/`+ id, user);
  }

  public getuserByLogin(login:string): Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${CONFIG.URL}utilisateur/getuserbylogin/`, login);
  }

  public modifierconnect(id:number, connected:boolean): Observable<string>{
    // @ts-ignore
    return this.http.put<string>(`${CONFIG.URL}utilisateur/modifierconect/`+id+`/`+ connected);
  }


}
