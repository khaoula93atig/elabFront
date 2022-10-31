import {Component, OnInit, ViewChild} from '@angular/core';
import {ParentService} from '../../Services/parent.service';
import {Parent} from '../../models/Parent';
import {Utilisateur} from '../../models/Utilisateur';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-parents',
  templateUrl: './list-parents.component.html',
  styleUrls: ['./list-parents.component.css']
})
export class ListParentsComponent implements OnInit {
  parentupdate: Parent = new Parent();
  userparent: Utilisateur = new Utilisateur();
  parents: Parent[];
  id : number;
  editform : FormGroup;
  test: number;
  constructor(private parentService: ParentService,
              private userService: UtilisateurServiceService,
              private toasterService : ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
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
  getall() {
    this.parentService.GetAll().subscribe((res) => {
      this.parents = res, console.log(this.parents)
    });
  }
  getbyid(parent){

      this.parentupdate = parent;
      this.userparent = this.parentupdate.utilisateur;
      this.id = this.parentupdate.utilisateur.id;

  }
  editparent(){
    this.userService.modifieruser(this.parentupdate.utilisateur.id, this.userparent).subscribe(
      res => { console.log(res);
        this.toasterService.success("modification terminée");
        this.ngOnInit()
      },error => {
        this.toasterService.success("modification terminée");
        this.ngOnInit()

      }
      );


      }
      archiverparent(){
    console.log(this.parentupdate.id)
    this.parentService.archiver(this.parentupdate.id).subscribe(res=>console.log("ok"));
      }
}
