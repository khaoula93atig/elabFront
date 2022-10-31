import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/Cours';
import { NgForm} from '@angular/forms';
import { Enseignant } from 'src/app/models/Enseignant';
import { Groupe } from 'src/app/models/Groupe';
import { CoursService } from 'src/app/Services/cours.service';
import { GroupeService } from 'src/app/Services/groupe.service';
import { EnseignantServiceSevice } from 'src/app/Services/enseignant-service.service';


@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
cours : Cours[];
enseignant : Enseignant;
enseignants : Enseignant[];
nomfichier:string='';
fichier: File;
groupes: Groupe[];
groupe:string='';

  constructor(private coursService: CoursService,
    private groupeservice : GroupeService,
    private enseignantservice: EnseignantServiceSevice) { }

  ngOnInit(): void {
    this.getGroupes();
    this.getEnseignants();
  }

  getGroupes(){
    this.groupeservice.allGroupe().subscribe((res)=>{
      this.groupes = res;
    })
  }

  getEnseignants(){
    this.enseignantservice.GetAll().subscribe((res)=>{
      this.enseignants =res;
    })
  }


  GetAllByGroupe(nom){
    this.enseignant = null;
    this.coursService.GetByGroupe(nom).subscribe((res) => {
       let ress:any[];
       ress=res;
       {ress.map((i)=>{i.fullname=i.fichier.toString;
         i.fullname=i.fichier.slice(39);return i;});
       this.cours = ress;
     }});
   }

   GetAllByEnseignant(id){
    this.groupe = null;
    this.coursService.GetByEnseignant(id).subscribe((res) => {
       let ress:any[];
       ress=res;
       {ress.map((i)=>{i.fullname=i.fichier.toString;
         i.fullname=i.fichier.slice(39);return i;});
       this.cours = ress;
     }});
   }
}
