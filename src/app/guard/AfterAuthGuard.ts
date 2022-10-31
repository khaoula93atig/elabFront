

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {LoginService} from '../login/login.service';
import {TokenService} from '../Services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private accountService: LoginService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.accountService.loggedIn()) {
      if(this.accountService.currentUserValue.profil=='ADMIN') this.router.navigateByUrl('/admin/acceuil');
      else if(this.accountService.currentUserValue.profil=='ENSEIGNANT') this.router.navigateByUrl('/enseignant');
      else if(this.accountService.currentUserValue.profil=='PARENT') this.router.navigateByUrl('/parent');

    }

    return true;
  }

}
