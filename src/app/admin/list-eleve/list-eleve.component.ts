import {Component, OnInit} from '@angular/core';
import {Eleve} from '../../models/Eleve';
import {EleveServiceService} from '../../Services/eleve-service.service';
import {Enseignant} from '../../models/Enseignant';
import {EType} from '../../models/EType';
import {Utilisateur} from '../../models/Utilisateur';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatiereService} from '../../Services/matiere.service';
import {ParentService} from '../../Services/parent.service';
import {Router} from '@angular/router';
import {Matiere} from '../../models/Matiere';
import {Parent} from '../../models/Parent';
import {GroupeService} from '../../Services/groupe.service';
import {Groupe} from '../../models/Groupe';
import {toNumbers} from '@angular/compiler-cli/src/version_helpers';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-list-eleve',
  templateUrl: './list-eleve.component.html',
  styleUrls: ['./list-eleve.component.css']
})
export class ListEleveComponent implements OnInit {
  eleves: Eleve[];
  selected: string[] = [];
  eleveupdate: Eleve = new Eleve();
  eleveuser: Utilisateur = new Utilisateur();
  editform: FormGroup;
  affecterForm: FormGroup;
  matieres: Matiere[];
  parents: Parent[];
  eleve: Eleve;
  parent: Parent = new Parent();
  id: number;
  nomParent: string = '';
  matiere:string='';
  niveau:string='';
  k: number = 0;
  idparent:number=null;
  matieretest: Matiere[] = [];
  groupe: Groupe[] = [];
  test:number;
  selectGroupe:string[]=[];
  groupeaffect:Groupe[]=[];
  disable=false;
  position: string;

  constructor(private eleveService: EleveServiceService,
              private toasterService: ToastrService,
              private fb: FormBuilder,
              private matiereService: MatiereService,
              private parentService: ParentService,
              private groupeService: GroupeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getall();
    this.getallmatiere();
    this.getallParent();
    this.getallGroupe();
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
      parent: new FormControl('', Validators.required),
      matieres: new FormControl('', Validators.required)
    });
    this.affecterForm=new FormGroup({
      groupess: new FormControl('',Validators.required)
    })
    if (this.selectGroupe!=[]){
      this.disable=true;
    }
  }

  getall() {
    this.eleveService.GetAll().subscribe((res) => {
      this.eleves = res, console.log(this.eleves);
    });

  }

  getbyid(eleve: Eleve) {

    this.selected = [];
    this.selectGroupe=[];
    this.eleveupdate = eleve;
    this.eleveuser = this.eleveupdate.utilisateur;
    this.test=this.eleveupdate.id;

    console.log(this.eleveupdate)

    for (let m of this.eleveupdate.matieres) {
      this.selected.push(m.nommatiere + '(' + m.nomniveau + ')');
    }
    this.editform.patchValue({parent:this.eleveupdate.parent.id, matieres: this.selected});
  }

  getallmatiere() {
    this.matiereService.allmatiere().subscribe((res) => {
      this.matieres = res;
    });
  }

  getallParent() {
    this.parentService.GetAll().subscribe((res) => {
      let ress:any[];
      ress=res;
      {ress.map((i)=>{i.fullname=i.utilisateur.nom+' '+i.utilisateur.prenom;return i; });
        this.parents=ress;}

    });
  }

  editEleve() {

    console.log(this.id);

    for (let m of this.selected) {
      for (let i = 0; i < m.length; i++) {
        if (m[i] == '(') {
          this.matiere = m.slice(0, i);
          this.k = i;
        }
      }
      this.niveau = m.slice((this.k + 1), m.length - 1);

      let matiere:any= {nommatiere:this.matiere, nomniveau: this.niveau}
      this.matieretest.push(matiere);

    }
    this.eleveupdate.matieres = this.matieretest;
    let pa : any = {id: this.id};
    console.log(pa);
    this.eleveupdate.parent=pa;

    console.log(this.eleveupdate);
    this.eleveService.ModifierEleve(this.eleveupdate.id, this.eleveupdate).subscribe(
      res => {
        this.toasterService.success('modification terminée');
        this.ngOnInit();
      },
      error => {
        this.toasterService.success('modification terminée');
        this.ngOnInit();
      });

  }
  archiverEleve(){

    console.log(this.test);
    this.eleveService.archiver(this.test).subscribe(res=>{
        this.toasterService.success('Suppression terminée');
       this.ngOnInit();
      },
      error => {
        this.toasterService.success('Suppression échouée');
       this.ngOnInit();
      });
  }

  getallGroupe(){
    this.groupeService.allGroupe().subscribe(res=>this.groupe=res);

}
affecterGroupe(){
    console.log(this.selectGroupe)
  for (let s of this.selectGroupe){
    let id=parseInt(s);
    for (let i of this.groupe){
      if(i.id==id){
        let gr:any={id:s, nom:i.nom}
        this.groupeaffect.push(gr);

      }
    }

  }
    this.eleveService.affecter(this.groupeaffect, this.eleveupdate.id).subscribe((res)=>{console.log(res);
      this.ngOnInit()},
      (error)=>console.log(error.status));
}




}
