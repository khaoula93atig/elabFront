import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Utilisateur} from '../models/Utilisateur';
import {UtilisateurServiceService} from '../Services/utilisateur-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  loading = false;
  displayBasic2: boolean;
  mdpForm: FormGroup;
  user= new Utilisateur();
  showPassword = false;


  constructor(
    private loginService: LoginService,
    private ToastService: ToastrService,
    private router: Router,
    private userService: UtilisateurServiceService,
    ) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.mdpForm = new FormGroup({
      login: new FormControl('', [Validators.required])
    });
  }
  connection(){
    this.loginService.login(this.loginform.value).subscribe((res) => {
      console.log(res);
    });
    console.log(this.loginform.value);

    if (this.loginform.status === 'INVALID') {
      this.ToastService.warning(`le format e-mail/mot de passe n'est pas valide.`);
      return;
    }

    this.loading = true;
    this.loginService.login(this.loginform.value).subscribe(
      (data) => {

        this.ToastService.success(`Connecté avec succès` );
        console.log( this.loginService.currentUserValue.profil);
        if(this.loginService.currentUserValue.profil == "ADMIN") {
          this.router.navigate(['/admin/acceuil']);
        }
        if(this.loginService.currentUserValue.profil == "ENSEIGNANT") {
          this.router.navigate(['enseignant/calender']);
        }
        if(this.loginService.currentUserValue.profil == "PARENT") {
          this.router.navigate(['parent/acceuil']);
        }
        if(this.loginService.currentUserValue.profil == "ELEVE") {
          this.router.navigate(['eleve/calender']);
        }

      },
      (error) => {
        this.loading = false;
        this.ToastService.error(`s'il vous plaît vérifier vos informations d'identification`);
      }
    );
  }
  mdpoublier(){
      this.displayBasic2 = true;
  }
  envoyermail(){
    if (this.mdpForm.invalid){
      this.displayBasic2 = true;
      this.ToastService.warning('veuillez vérifier votre login');
      return;
    }
    this.loading = true;
    this.loginService
      .resetpassword(this.mdpForm.value.login)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.ToastService.success('un email est envoyé à votre adresse');
          this.displayBasic2 = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }



}
