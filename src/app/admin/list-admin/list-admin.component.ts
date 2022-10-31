import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../Services/admin.service';
import {Admin} from '../../models/Admin';
import {Utilisateur} from '../../models/Utilisateur';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  admins : Admin[]=[];
  userAdmin: Utilisateur = new Utilisateur();
  adminupdate: Admin = new Admin();
  id : number;
  editform : FormGroup;

  constructor( private adminService: AdminService,
               private userService: UtilisateurServiceService,
               private toasterService : ToastrService) { }

  ngOnInit(): void {
    /*this.getalladmin();*/
    this.adminService.allAdmin().subscribe((res) => {this.admins= res});
    this.editform = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sexe: new FormControl('', Validators.required),
      num_tel: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pays: new FormControl('', Validators.required),
      adress: new FormControl('', [Validators.required, Validators.minLength(10)]),
      date_naissance: new FormControl('', Validators.required),
    });


  }
  getalladmin(){
    this.adminService.allAdmin().subscribe((res) => {this.admins= res});
  }
  test(admin){
    console.log(admin);
  }
  getbyid(admin:Admin){
    this.adminupdate=admin;
    this.userAdmin=admin.utilisateur;
    console.log(this.adminupdate);

  }
  editAdmin(){
    this.userService.modifieruser(this.adminupdate.utilisateur.id, this.userAdmin).subscribe(
      res => { console.log(res);
        this.toasterService.success("modification terminée");
        this.ngOnInit();
      },
      error => {this.toasterService.success("modification échouée");
        this.ngOnInit();
      });


  }
  archiverAdmin(){
this.adminService.archiver(this.adminupdate.id).subscribe(res=>{
  console.log(res);
  this.ngOnInit();
  this.toasterService.success("Suppression terminée");
},
  error => {this.toasterService.success("Suppression terminée");
    this.ngOnInit();
  })
  }


}
