import {Component, OnInit} from '@angular/core';
import {CoursService} from 'src/app/Services/cours.service';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GroupeService} from 'src/app/Services/groupe.service';
import {Cours} from 'src/app/models/Cours';
import {Enseignant} from 'src/app/models/Enseignant';
import {Groupe} from 'src/app/models/Groupe';
import {UtilisateurServiceService} from 'src/app/Services/utilisateur-service.service';
import {LoginService} from 'src/app/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  editForm: FormGroup;
  cours: Cours[];
  enseignant: Enseignant;
  groupe: Groupe[];
  coursup: Cours = new Cours();
  fichier: File;
  selected: string[] =[];
  form: NgForm;
  cour = new Cours();
  retrievedImage: string;
  grpselected: any = [];
  description: string;
  nomcours: string;
  id: number;
  groupes: Groupe[];
  nomfichier:string='';
  nomfichier1:string='';

  testfile:File;
  test:number;


  constructor(private coursService: CoursService,
              private userService: UtilisateurServiceService,
              private loginService: LoginService,
              private groupeService: GroupeService,
              private toasterService: ToastrService,
              private router: Router
           ) {
  }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.getallgroupes();
    this.editForm=new FormGroup({
      nomcours: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      groupes: new FormControl('', Validators.required),
      fichier: new FormControl('', Validators.required)
    })

  }
  getuserbyid(id: number){

    this.userService.getEnByUser(id).subscribe(data=> {
      this.enseignant = data;
      this.GetAllCours(this.enseignant.id);
    })
  }


  getallgroupes() {
    this.groupeService.allGroupe().subscribe((res) => {
      this.groupes = res;
    });

  }

  GetAllCours(id) {
    this.coursService.GetByEnseignant(id).subscribe((res) => {
      let ress:any[];
      ress=res;
      {ress.map((i)=>{i.fullname=i.fichier.toString;
        i.fullname=i.fichier.slice(39);return i;});
      this.cours = ress;
    }
  });
  }


  getbyid(c: Cours) {
    this.selected=[]
    this.coursup = c;
    this.test=this.coursup.id;
    for (let g of (this.coursup.groupes)){
      this.selected.push(g.nom);
    }
    this.editForm.patchValue({groupes:this.selected})
    this.nomfichier=this.coursup.fichier.toString()
    this.nomfichier=this.nomfichier.slice(39)
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

  modifierCours(){
    for (let s of this.selected) {
      let gr: any = {nom: s};
      this.grpselected.push(gr);
    }
    this.coursup.groupes = this.grpselected;
    const formData = new FormData();

    formData.append('file', this.fichier);

    this.coursService.Modifier(formData,this.coursup.id).subscribe(
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
    this.coursup.groupes = this.grpselected;

    this.coursService.ModifierCours(this.coursup).subscribe(
      res => {
        let a = res;
        console.log(a);

        this.toasterService.success('modification avec success !!', 'Ajout');
      }

      , erreur => {
        this.toasterService.success('Ajout avec success !!', 'Ajout');

      });
  }

  archiverCours(){
    this.coursService.archiver(this.test).subscribe(res=>{
      this.toasterService.success('Suppression terminée');
      this.ngOnInit()

    },
    error => {
      this.toasterService.success('Suppression terminée');
      this.ngOnInit()
    });
  }


}
