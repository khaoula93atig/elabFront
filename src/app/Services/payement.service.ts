import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPassword} from '../models/ResetPassword';
import {loadStripe} from "@stripe/stripe-js";

import {Observable} from 'rxjs';
import {CONFIG} from '../../environments/environment';
import {Utilisateur} from '../models/Utilisateur';
import {Payement} from '../models/payement';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  constructor( private http: HttpClient) {}
  stripePromise = loadStripe(CONFIG.stripe);
  public getNonPayement(id:number): Observable<Payement[]>{
    return this.http.get<Payement[]>(`${CONFIG.URL}payement/nonpaye/`+id);
  }
  public getbyEleve(id:number): Observable<Payement[]>{
    return this.http.get<Payement[]>(`${CONFIG.URL}payement/paybyeleve/`+id);
  }
  public getpayment(idE:number,idF:number):Observable<Payement>{
    return this.http.get<Payement>(`${CONFIG.URL}payement/`+idE+`/`+idF)
  }
  public updatePayement(ids:any): Observable<any>{
    return this.http.post<any>(`${CONFIG.URL}payement/update/`,ids);
  }
  async pay(payment): Promise<void> {
    // here we create a payment object


    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(`${CONFIG.URL}payement`, payment)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe?.redirectToCheckout({
          sessionId:data.id
        });
      });
  }

}
