import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatiereService} from '../../Services/matiere.service';
import {Router} from '@angular/router';
import {Matiere} from '../../models/Matiere';
import {ParentService} from '../../Services/parent.service';
import {Parent} from '../../models/Parent';
import {Eleve} from '../../models/Eleve';
import {EleveServiceService} from '../../Services/eleve-service.service';

@Component({
  selector: 'app-ajout-eleve',
  templateUrl: './ajout-eleve.component.html',
  styleUrls: ['./ajout-eleve.component.css']
})
export class AjoutEleveComponent implements OnInit {

  ajoutform:FormGroup
  matieres : Matiere[];
  parents: Parent[];
  eleve:Eleve;
  parent: Parent= new Parent();
  id:number;

  constructor(private toasterService : ToastrService,
              private fb : FormBuilder,
              private matiereService: MatiereService,
              private parentService: ParentService,
              private eleveService: EleveServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getallmatiere();
    this.getallParent();
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
      parent :new FormControl('', Validators.required),
      matieres :new FormControl('', Validators.required)
    })
  }

  getallmatiere(){
    this.matiereService.allmatiere().subscribe((res) => {this.matieres= res})
  }
  getallParent(){
    this.parentService.GetAll().subscribe((res) => {this.parents= res})
  }
  ajoutEleve(){
    console.log(this.id);
    let ens = {id: this.id};
    this.ajoutform.patchValue({parent:ens})
    console.log(this.ajoutform.value);

    this.eleveService.ajout(this.ajoutform.value).subscribe(
      res=>{ this.eleve=this.ajoutform.value;
        console.log(this.eleve);
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/listeleve']);
      }

      ,erreur=>{this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/listeleve']);
      });

  }
  getParentid(par){
    this.id = this.parents[par].id;
  }
  back(){
    window.history.back();
  }

}
