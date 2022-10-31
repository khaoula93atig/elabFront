import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { CompteRenduService } from 'src/app/Services/compte-rendu.service';
import { Affichageexercice } from 'src/app/models/Affichageexercice';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  enseignant = new Enseignant();
  exercices : Devoir[] ;
  type = dev;
  user = new Utilisateur();
  id : number;
  nomfichier:string='';
  selected: string[] =[];
  grpselected: any = [];
  fichier: File;
  groupes: Groupe[];
  form: NgForm;
  groupe:string='';
  eleve = new Eleve();
  nomgrp : string;
  titre : string;
  devoir : Devoir;
  Cr : number;
  date = new Date();
  vert : boolean=false;
  jaune: boolean=false;
  rouge : boolean=false;
  retour : number=0;
  tes : boolean;
  affichage : Affichageexercice[]=[];
  groupesnom : string[]=[];
  constructor(
    private devoirService: DevoirService,
    private loginService: LoginService,
    private eleveService: EleveServiceService,
    private compterenduService: CompteRenduService
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

  getCompteRendu(ideleve,e){
    for(let gr of e.groupes){
      this.groupesnom.push(gr.nom);
    }
    this.compterenduService.getByEleveDvr(ideleve,e.id).subscribe((res)=> {
      this.retour = res;
      this.affichage.push({status:this.retour, nom:e.titre, deadline:e.deadline , description: e.description, fichier:e.fullname , groupe: this.groupesnom, enseignant:e.enseignant})
    }
  
  );
}

getbyid(id){
  this.devoirService.GetById(id).subscribe((res)=> {
    this.devoir = res;
    console.log(this.devoir);
  })
}

  getGroupes(id)
  {
    this.eleveService.getGroupes(id).subscribe((res)=> {
      this.groupes = res;
      
    })
  }
  
  GetAll(nom,type){
   this.devoirService.tdbyTypeAndGrp(nom,type).subscribe((res) => {
      let ress:any[];
      ress=res;
      {ress.map((i)=>{i.fullname=i.fichier.toString;
        i.fullname=i.fichier.slice(37);return i;
      });   
      this.exercices = ress;
      for(let e of (this.exercices)){
      this.getCompteRendu(this.eleve.id,e);
    }
    }});
  }

 
 
}
