import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../MustMatch';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateurServiceService} from '../Services/utilisateur-service.service';
import {TokenService} from '../Services/token.service';
import {ResetPassword} from '../models/ResetPassword';



@Component({
  selector: 'app-mdp-oublier',
  templateUrl: './mdp-oublier.component.html',
  styleUrls: ['./mdp-oublier.component.css']
})
export class MdpOublierComponent implements OnInit {
  mdpForm: FormGroup;
  confirmation: any;
  token : string;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  private resetpassword = new ResetPassword();
  constructor(private toastr: ToastrService, public fb: FormBuilder,private route: ActivatedRoute, private router: Router, private userService: UtilisateurServiceService , private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.checkToken();
    this.mdpForm = this.fb.group({
      password: this.password,
        confirmPassword: this.confirmPassword
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  checkToken() {
    if (this.tokenService.getExprirationDate(this.token) < new Date()) {
      window.alert("URL Expired");
      window.close();

    }
  }
  confimer(){

      this.resetpassword.token = this.token;
      console.log(this.token);
      this.resetpassword.password = this.password.value;
      this.userService.resetPassword(this.resetpassword).subscribe(next => {
        this.toastr.success("mot de passe modifié avec succès")
        setTimeout(() => {
            this.router.navigateByUrl("/");
          }
          , 5000);

      });
    }

}
