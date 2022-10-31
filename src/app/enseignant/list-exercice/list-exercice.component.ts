import { Component, OnInit } from '@angular/core';
import { Devoir } from 'src/app/models/Devoir';
import {FormGroup,FormControl,Validators, NgForm} from '@angular/forms';
import { Enseignant } from 'src/app/models/Enseignant';
import { Groupe } from 'src/app/models/Groupe';
import { DevoirService } from 'src/app/Services/devoir.service';
import { dev } from 'src/app/models/dev';
import { LoginService } from 'src/app/login/login.service';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurServiceService } from 'src/app/Services/utilisateur-service.service';
import { GroupeService } from 'src/app/Services/groupe.service';
import { ToastrService } from 'ngx-toastr';
import { CompteRendu } from 'src/app/models/CompteRendu';
import { CompteRenduService } from 'src/app/Services/compte-rendu.service';
import { Eval } from 'src/app/models/Eval';


@Component({
  selector: 'app-list-exercice',
  templateUrl: './list-exercice.component.html',
  styleUrls: ['./list-exercice.component.css']
})
export class ListExerciceComponent implements OnInit {

  editForm: FormGroup;
  enseignant = new Enseignant();
  groupe : Groupe[];
  exercices : Devoir[] ;
  type = dev;
  user = new Utilisateur();
  id : number;
  nomfichier:string='';
  exup: Devoir = new Devoir();
  selected: string[] =[];
  grpselected: any = [];
  test:number;
  fichier: File;
  retrievedImage: string;
  groupes: Groupe[];
  form: NgForm;
  travaux : CompteRendu[];
  remarque= Eval;
  cr: CompteRendu;
  g: string;




  constructor(private devoirService: DevoirService,
              private userService: UtilisateurServiceService,
              private groupeService: GroupeService,
              private loginService: LoginService,
              private toasterService: ToastrService,
              private crservice : CompteRenduService
              ) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.getallgroupes();
    this.editForm=new FormGroup({
      titre: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      groupes: new FormControl('', Validators.required),
      fichier: new FormControl('', Validators.required)
    })
  }
  getuserbyid(id: number){

    this.userService.getEnByUser(id).subscribe((res)=> {
      this.enseignant = res;
      this.GetAll(this.enseignant.id,this.type.Exercice);
    })
  }

  getallgroupes() {
    this.groupeService.allGroupe().subscribe((res) => {
      this.groupes = res;
    });

  }

  GetAll(id,type){
        this.devoirService.tdbyTypeAndEns(id, type).subscribe((res) => {
      let ress:any[];
      ress=res;
      {ress.map((i)=>{i.fullname=i.fichier.toString;
        i.fullname=i.fichier.slice(37);return i;});
      this.exercices = ress;
    }});
  }

  GetList(nom,type,id){
    this.devoirService.tdbyTypeAndGrpAndEns(nom,type,id).subscribe((res) => {
  let ress:any[];
  ress=res;
  {ress.map((i)=>{i.fullname=i.fichier.toString;
    i.fullname=i.fichier.slice(37);return i;});
  this.exercices = ress;
}});
}

  getbyid(d: Devoir) {
    this.selected=[]
    this.exup = d;
    this.test=this.exup.id;
    for (let g of (this.exup.groupes)){
      this.selected.push(g.nom);
    }
    this.editForm.patchValue({groupes:this.selected})
    this.nomfichier=this.exup.fichier.toString()
    this.nomfichier=this.nomfichier.slice(37)
  }


  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.fichier)

    }
  }

  modifierExercice(){
    for (let s of this.selected) {
      let gr: any = {nom: s};
      this.grpselected.push(gr);
    }
    this.exup.groupes = this.grpselected;
    const formData = new FormData();


    formData.append('file', this.fichier);

    this.devoirService.Modifier(formData,this.exup.id).subscribe(
      res => {
        let a = res;
        console.log(a);

        this.toasterService.success('modification avec success !!', 'Ajout');
      }

      , erreur => {
        this.toasterService.success('Ajout avec success !!', 'Ajout');

      });

  }

  modifier(){
    for (let s of this.selected) {
      let gr: any = {nom: s};
      this.grpselected.push(gr);
    }
    this.exup.groupes = this.grpselected;

    this.devoirService.ModifierExercice(this.exup).subscribe(
      res => {
        let a = res;
        console.log(a);

        this.toasterService.success('modification avec success !!', 'Ajout');
      }

      , erreur => {
        this.toasterService.success('Ajout avec success !!', 'Ajout');

      });
  }

  archiverExercice(){
    this.devoirService.archiver(this.test).subscribe(res=>{
      this.toasterService.success('Suppression terminée');


    },
    error => {
      this.toasterService.success('Suppression terminée');
    });
  }
  getCR(c :CompteRendu){
    this.cr =c;
    console.log(this.cr);
    console.log(this.cr.id);
  }

  evaluer(){
    this.crservice.Evaluer(this.cr.id,this.remarque).subscribe(res=>{
      this.toasterService.success('Affectation terminée');
    },
    error => {
      this.toasterService.success('Affectation terminée');
    });
  }

  getalltravaux(id,nom){
    this.crservice.getByDevoirAndGrp(id,nom).subscribe((res) => {
      let ress:any[];
      ress=res;
      {ress.map((i)=>{i.fullname=i.fichier.toString;
        i.fullname=i.fichier.slice(33);return i;});
      this.travaux = ress;
    }});
  }

}
