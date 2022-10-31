import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import {PayementEnseignant} from '../models/payementEnseignant';
import {PayementEnseignantForAdmin} from '../models/PayementEnseignantForAdmin';

@Injectable({
  providedIn: 'root'
})
export class PayementEnseignantService {

  constructor(private http: HttpClient) { }

  public ajoutPayementEns(idE:number, idF:number): Observable<string>{
    return this.http.get<string>(`${CONFIG.URL}payementenseignat/ajoutPayEns/`+idE+`/`+idF);
  }

  public getbyENs(idE:number): Observable<PayementEnseignant[]> {
    return this.http.get<PayementEnseignant[]>(`${CONFIG.URL}payementenseignat/getPaybyid/` + idE);
  }

  public getAllpayforAdmin(): Observable<PayementEnseignantForAdmin[]> {
    return this.http.get<PayementEnseignantForAdmin[]>(`${CONFIG.URL}payementenseignat/getPayforAdmin`);
  }

  public updatePayement(ids:any): Observable<any>{
    return this.http.post<any>(`${CONFIG.URL}payementenseignat/update/`,ids);
  }
}
