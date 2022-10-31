import {Component, OnInit} from '@angular/core';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {Enseignant} from '../../models/Enseignant';
import {Utilisateur} from '../../models/Utilisateur';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Matiere} from '../../models/Matiere';
import {EType} from '../../models/EType';
import {ToastrService} from 'ngx-toastr';
import {MatiereService} from '../../Services/matiere.service';

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent implements OnInit {
  editform: FormGroup;
  enseignants: Enseignant[];
  matiereEns: Matiere[];
  matieretest: Matiere[] = [];
  i: number;
  ensupdate: Enseignant = new Enseignant();
  ensuser: Utilisateur = new Utilisateur();
  selected: string[] = [];
  matieres: Matiere[];
  types = EType;
  typekey: any;
  test: string[] = [];
  k: number = 0;
  matiere: string;
  niveau: string;
  mat: Matiere = new Matiere();
  keys = Object.keys(this.types).filter(f => !isNaN(Number(f)));

  constructor(private enseignatService: EnseignantServiceSevice,
              private matiereService: MatiereService,
              private fb: FormBuilder,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {

    this.getallens();

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

    this.editform = this.fb.group({
      utilisateur,
      type: new FormControl('', Validators.required),
      matieres: new FormControl('', Validators.required)
    });


  }

  getallens() {
    this.enseignatService.GetAll().subscribe((res) => {
      this.enseignants = res;
    });

  }

  getbyid(ens: Enseignant) {
    this.selected = [];
    this.ensupdate = ens;
    this.ensuser = ens.utilisateur;

    for (let m of this.ensupdate.matieres) {
      this.selected.push(m.nommatiere + '(' + m.nomniveau + ')');
    }

    this.typekey = EType[this.ensupdate.type];

    this.editform.patchValue({matieres: this.selected});
  }

  modifierens() {
    this.ensupdate.type = this.typekey;
    for (let m of this.selected) {
      for (let i = 0; i < m.length; i++) {
        if (m[i] == '(') {
          this.matiere = m.slice(0, i);
          this.k = i;
          this.test.push(this.matiere);
        }
      }
      this.niveau = m.slice((this.k + 1), m.length - 1);

let matiere:any= {nommatiere:this.matiere, nomniveau: this.niveau}
      this.matieretest.push(matiere);

    }
    this.ensupdate.matieres = this.matieretest;

    console.log(this.ensupdate);
    this.enseignatService.ModifierEnseignat(this.ensupdate.id, this.ensupdate).subscribe(
      res => {
        this.toasterService.success('modification terminée');
        this.ngOnInit();
      },
      error => {
        this.toasterService.success('modification terminée');
        this.ngOnInit();
      });

  }

  getallmatiere() {
    this.matiereService.allmatiere().subscribe((res) => {
      this.matieres = res;
    });

  }

  getmatierebybyNom(test, ok) {

    this.matiereService.getMatiereByNomEtNiveau(test, ok).subscribe((res) => {
      this.mat = res;
      this.matieretest.push(this.mat);
    });


  }

  archiverENS(){
this.enseignatService.archiver(this.ensupdate.id).subscribe(res=>{
  console.log(res);
  this.toasterService.success('modification terminée');
  this.ngOnInit();

},
  error => {this.toasterService.success('modification terminée');
    this.ngOnInit();
})
  }

}
