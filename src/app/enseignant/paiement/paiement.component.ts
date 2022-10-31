import {Component, OnInit} from '@angular/core';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {Enseignant} from '../../models/Enseignant';
import {LoginService} from '../../login/login.service';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {PayementEnseignantService} from '../../Services/payement-enseignant.service';
import {PayementEnseignant} from '../../models/payementEnseignant';
import {Formation} from '../../models/Formation';
import {FormationService} from '../../Services/formation.service';
import {AffichageEnsPay} from '../../models/affichageEnsPay';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  enseignant = new Enseignant();
  payements: PayementEnseignant[] = [];
  formations: Formation[] = [];
  affichagePayement: AffichageEnsPay[] = [];
  affichagePay = new AffichageEnsPay();
  date = new Date();
  datefomation = new Date();
  affiche: boolean=false;
  i=new Date().getMonth();
  month: string ='';
  mois =["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juiller", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

  constructor(private enseignantService: EnseignantServiceSevice,
              private loginService: LoginService,
              private userService: UtilisateurServiceService,
              private payementEnseignantService: PayementEnseignantService,
              private formationService: FormationService) {
  }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
  }

  getuserbyid(id: number) {

    this.userService.getEnByUser(id).subscribe((res) => {
      this.enseignant = res;
      this.getmonth();
      this.getPayementsByEns(this.enseignant.id);
    });
  }

  getPayementsByEns(id: number) {
    this.getmonth()
    this.affichagePayement=[]
    this.payementEnseignantService.getbyENs(id).subscribe(res => {
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
