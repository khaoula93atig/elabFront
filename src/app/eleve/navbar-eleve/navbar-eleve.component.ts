import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {Utilisateur} from '../../models/Utilisateur';

@Component({
  selector: 'app-navbar-eleve',
  templateUrl: './navbar-eleve.component.html',
  styleUrls: ['./navbar-eleve.component.css']
})
export class NavbarEleveComponent implements OnInit {
  user = new Utilisateur();

  constructor(
    private loginService: LoginService,
    private ToastService: ToastrService,
    private router: Router,
    private userService : UtilisateurServiceService
  ) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);

  }
  logout(){
    this.loginService.logout();
    this.ToastService.info(`à la prochaine`);
  }
  getuserbyid(id: number){
    this.userService.getUserById(id).subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );}

}
