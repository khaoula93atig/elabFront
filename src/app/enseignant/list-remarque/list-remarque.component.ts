import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Enseignant } from 'src/app/models/Enseignant';
import { Remarque } from 'src/app/models/Remarque';
import { Eleve } from 'src/app/models/Eleve';
import { RemarqueService } from 'src/app/Services/remarque.service';
import { LoginService } from 'src/app/login/login.service';
import { UtilisateurServiceService } from 'src/app/Services/utilisateur-service.service';
import { EleveServiceService } from 'src/app/Services/eleve-service.service';
@Component({
  selector: 'app-list-remarque',
  templateUrl: './list-remarque.component.html',
  styleUrls: ['./list-remarque.component.css']
})
export class ListRemarqueComponent implements OnInit {
  editform: FormGroup;
  enseignant : Enseignant;
  eleve: Eleve;
  eleves :Eleve[];
  remarques: Remarque[];
  id:number;
  string : string;
  afficher=true;


  constructor(private remarqueService: RemarqueService,
    private loginService: LoginService,
    private userService: UtilisateurServiceService,
    private eleveservice: EleveServiceService) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
  }

  getuserbyid(id: number){

    this.userService.getEnByUser(id).subscribe((res)=> {
      this.enseignant = res;
      this.listeleve();
      this.GetAll(res.id)
      //this.GetAll(this.enseignant.id);
    })
  }

  listeleve(){
    this.eleveservice.GetAll().subscribe((res) =>{
      this.eleves = res, console.log(this.eleves);
    })  }

  GetAll(id){
    this.remarqueService.GetByEnseignant(id).subscribe((res) =>{
      this.remarques = res, console.log(this.remarques);
    })
  }

  getall(idelv,idens){
    this.afficher=false
    console.log("/////////////"+this.eleve);
    this.remarqueService.getByElvAndEns(idelv,idens).subscribe((res) =>{
      this.remarques = res, console.log(this.remarques);
    })
  }
}
