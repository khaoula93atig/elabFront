import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {EleveServiceService} from '../../Services/eleve-service.service';
import {Eleve} from '../../models/Eleve';
import {Groupe} from '../../models/Groupe';
import {FormationService} from '../../Services/formation.service';
import {Formation} from '../../models/Formation';
import {PayementService} from '../../Services/payement.service';
import {Payement} from '../../models/payement';
import {GType} from '../../models/GroupeType';

@Component({
  selector: 'app-details-fils',
  templateUrl: './details-fils.component.html',
  styleUrls: ['./details-fils.component.css']
})
export class DetailsFilsComponent implements OnInit {
  id : number=0;
  eleve=new Eleve();
  afficher:boolean=false;
  groupeid:number;
  groupes:Groupe[]=[];
  payements:Payement[]=[];
  selected : number =0;
  selectedCities: Payement[]=[];
  selectedHero=new Payement();

  constructor(private activatedRoute:ActivatedRoute,
              private eleveService : EleveServiceService,
              private payementService: PayementService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id=params.id;

      })
    this.getbyid(this.id);
    this.getformationNonPayer(this.id);



  }

  getbyid(test){
    this.eleveService.findbyid(test).subscribe(res=> {this.eleve=res;
      this.groupes=res.groupes;
    console.log(this.eleve)
    console.log(this.groupes)}
    );

  }

  getformationNonPayer(ide){
    this.payementService.getNonPayement(ide).subscribe(res=>{this.payements=res
      console.log(this.payements)})
  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }
payment = {
    name: 'Formations',
    currency: 'eur',
    amount: 0,
    quantity: '1',
    cancelUrl: 'http://localhost:4200/parent/acceuil',
    successUrl: 'http://localhost:4200/success',
  };
  payer() {
    this.calculer(),
      localStorage.setItem('payements','['+this.ids.toString()+']')
    this.payementService.pay(this.payment)


  }
ids=[]
  calculer(){
    this.ids.push(this.id)
    for(let p of this.selectedCities){
      this.ids.push(p.idF)
      this.payment.amount+=p.prix
    }
  }

  setlist(payement) {
    if(this.selectedCities.includes(payement)==true){
      for(let i=0; i<this.selectedCities.length;i++){
        if(this.selectedCities[i]==payement){
          this.selectedCities.splice(i,1)
        }
      }
    }
    else {
      this.selectedCities.push(payement);
    }
    console.log(this.selectedCities)
  }


}
