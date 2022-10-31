import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Utilisateur} from '../models/Utilisateur';
import {CONFIG} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService{
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,private router:Router) {

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(auth) {
    return this.http.post<any>(`${CONFIG.URL}auth/login`, auth).pipe(
      map((user) => {
        console.log('////////////' + user);
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }
  getUser() {
    return localStorage.getItem('currentUser');
  }
  loggedIn() {
    return !!this.getUser();
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
  resetpassword(email) {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.post(`${CONFIG.URL}utilisateur/mpoublier`,email,{params: params});
  }


  }
