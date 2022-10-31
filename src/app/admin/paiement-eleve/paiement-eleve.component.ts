import { Component, OnInit } from '@angular/core';
import {Enseignant} from '../../models/Enseignant';
import {PayementEnseignant} from '../../models/payementEnseignant';
import {Formation} from '../../models/Formation';
import {AffichageEnsPay} from '../../models/affichageEnsPay';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {LoginService} from '../../login/login.service';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {PayementEnseignantService} from '../../Services/payement-enseignant.service';
import {FormationService} from '../../Services/formation.service';
import {formatDate} from '@angular/common';
import {EleveServiceService} from '../../Services/eleve-service.service';
import {Eleve} from '../../models/Eleve';
import {PayementService} from '../../Services/payement.service';
import {Payement} from '../../models/payement';

@Component({
  selector: 'app-paiement-eleve',
  templateUrl: './paiement-eleve.component.html',
  styleUrls: ['./paiement-eleve.component.css']
})
export class PaiementEleveComponent implements OnInit {
  eleves:Eleve[]=[];
  eleve=new Eleve();
  enseignant = new Enseignant();
  payements: Payement[] = [];
  formations: Formation[] = [];
  affichagePayement: AffichageEnsPay[] = [];
  affichagePay = new AffichageEnsPay();
  date = new Date();
  datefomation = new Date();
  affiche: boolean=false;
  i=new Date().getMonth();
  month: string ='';
  mois =["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juiller", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
  constructor(private eleveService: EleveServiceService,
              private loginService: LoginService,
              private userService: UtilisateurServiceService,
              private payementService: PayementService,
              private formationService: FormationService) { }

  ngOnInit(): void {
    this.getallEleve();
  }
  getallEleve(){
    this.eleveService.GetAll().subscribe(res=>{
      this.eleves=res;
      console.log(res);
    })
  }
  getPayementsByeleve(id: number) {
    this.getmonth()
    this.affichagePayement=[]
    this.payementService.getbyEleve(id).subscribe(res => {
        this.payements = res;
        for (let pay of this.payements) {
          this.formationService.getbyid(pay.idF).subscribe(res => {
              this.datefomation = new Date(formatDate(res.date, 'yyyy-MM-dd', 'en_Us'));
              if (this.datefomation.getMonth() == this.i) {
                this.affichagePayement.push({nom: res.nom, groupe: res.groupe.nom, date: res.date, payed: pay.payed});
              }

            }
          )
        }
        if(this.affichagePayement!=[]) this.affiche=true;
      }
    )
  }


  getcolor(aff)
  {
    if (aff.payed == true) {
      return '#d1e7dd';
    }
    let day = new Date(formatDate(aff.date, 'yyyy-MM-dd', 'en_Us'));
    if (day.getMonth() < this.date.getMonth()) {
      if (aff.payed == false) {
        return '#f8d7da';
      }


    }


  }
  getmonth(){
    for(let j=0;j<this.mois.length; j++){
      if(this.month==this.mois[j]) {
        this.i = j;
      }
    }
  }
}
