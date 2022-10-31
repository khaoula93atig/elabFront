import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/Cours';
import { Devoir } from 'src/app/models/Devoir';
import { NgForm} from '@angular/forms';
import { Enseignant } from 'src/app/models/Enseignant';
import { Groupe } from 'src/app/models/Groupe';
import { DevoirService } from 'src/app/Services/devoir.service';
import { dev } from 'src/app/models/dev';
import { LoginService } from 'src/app/login/login.service';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Eleve } from 'src/app/models/Eleve';
import { EleveServiceService } from 'src/app/Services/eleve-service.service';
import { CoursService } from 'src/app/Services/cours.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  cours : Cours[];
  enseignant = new Enseignant();
  user = new Utilisateur();
  id : number;
  nomfichier:string='';
  fichier: File;
  groupes: Groupe[];
  form: NgForm;
  groupe:string='';
  eleve = new Eleve();
  constructor(private coursService: CoursService,
    private loginService: LoginService,
    private eleveService: EleveServiceService
    ) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);

  }


  getuserbyid(id: number){
    this.eleveService.getEleveByUser(id).subscribe((res)=> {
      this.eleve = res;
      this.getGroupes(this.eleve.id);
    })
  }

  getGroupes(id)
  {
    this.eleveService.getGroupes(id).subscribe((res)=> {
      this.groupes = res;
      
    })
  }

  GetAll(nom){
    this.coursService.GetByGroupe(nom).subscribe((res) => {
       let ress:any[];
       ress=res;
       {ress.map((i)=>{i.fullname=i.fichier.toString;
         i.fullname=i.fichier.slice(39);return i;});
       this.cours = ress;
  
     }});
   }
}
