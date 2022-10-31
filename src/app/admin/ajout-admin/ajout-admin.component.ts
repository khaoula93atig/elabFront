import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../models/Utilisateur';
import {Admin} from '../../models/Admin';
import {AdminService} from '../../Services/admin.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.css']
})
export class AjoutAdminComponent implements OnInit {

  ajoutform : FormGroup;
  user = new Utilisateur();
  admin = new Admin();
  constructor(private adminService : AdminService,
              private toasterService : ToastrService,
              private fb : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    let utilisateur = this.fb.group({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sexe: new FormControl('', Validators.required),
      num_tel: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pays: new FormControl('', Validators.required),
      adress: new FormControl('', [Validators.required, Validators.minLength(10)]),
      date_naissance: new FormControl('', Validators.required),
    });
    this.ajoutform = this.fb.group({
      utilisateur,
    })
  }
  ajoutAdmin(){
    console.log(this.ajoutform.value);
    this.adminService.ajoutAdmin(this.ajoutform.value).subscribe(
      res=>{ this.admin=this.ajoutform.value, console.log(this.admin);}

      ,erreur=>{this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/listadmin']);
      });

  }
  back(){
    window.history.back();
  }

}
