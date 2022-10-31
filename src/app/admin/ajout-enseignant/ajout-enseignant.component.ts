import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../../models/Utilisateur';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Enseignant} from '../../models/Enseignant';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {MatiereService} from '../../Services/matiere.service';
import {Matiere} from '../../models/Matiere';
import {EType} from '../../models/EType';

@Component({
  selector: 'app-ajout-enseignant',
  templateUrl: './ajout-enseignant.component.html',
  styleUrls: ['./ajout-enseignant.component.css']
})
export class AjoutEnseignantComponent implements OnInit {

  ajoutform : FormGroup;
  user = new Utilisateur();
  enseignant = new Enseignant();
  matieres : Matiere[];
  types=EType;
  keys = Object.keys(this.types).filter(f => !isNaN(Number(f)));
  constructor(private ensService : EnseignantServiceSevice,
              private toasterService : ToastrService,
              private fb : FormBuilder,
              private matiereService: MatiereService,
              private router: Router) { }

  ngOnInit(): void {

    this.getallmatiere();

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
      type: new FormControl('', Validators.required),
      matieres :new FormControl('', Validators.required)
    })


  }

  getallmatiere(){
    this.matiereService.allmatiere().subscribe((res) => {this.matieres= res})

  }
  ajoutenseignat(){
    console.log(this.ajoutform.value);
    this.ensService.ajoutEnseignat(this.ajoutform.value).subscribe(
      res=>{ this.enseignant=this.ajoutform.value;
        console.log(this.enseignant);
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/listens']);
        }

      ,erreur=>{this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['admin/listens']);
      });
  }
  back(){
    window.history.back();
  }

}
