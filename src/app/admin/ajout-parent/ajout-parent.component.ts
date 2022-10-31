import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../../models/Utilisateur';
import {Parent} from '../../models/Parent';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ParentService} from '../../Services/parent.service';

@Component({
  selector: 'app-ajout-parent',
  templateUrl: './ajout-parent.component.html',
  styleUrls: ['./ajout-parent.component.css']
})
export class AjoutParentComponent implements OnInit {

  ajoutform : FormGroup;
  user = new Utilisateur();
  parent = new Parent();

  constructor(private toasterService : ToastrService,
              private fb : FormBuilder,
              private router: Router,
              private parentService : ParentService

  ) { }

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

  ajoutParent(){
    console.log(this.ajoutform.value);
    this.parentService.ajoutParent(this.ajoutform.value).subscribe(
      res=>{ this.parent=this.ajoutform.value;
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/ajouteleve'])
        }

      ,erreur=>{this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/ajouteleve']);
      });
  }
  back(){
    window.history.back();
  }


}
