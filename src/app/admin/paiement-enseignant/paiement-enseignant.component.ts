import {Component, OnInit} from '@angular/core';
import {PayementEnseignantService} from '../../Services/payement-enseignant.service';
import {PayementEnseignantForAdmin} from '../../models/PayementEnseignantForAdmin';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {Enseignant} from '../../models/Enseignant';
import {Eleve} from '../../models/Eleve';
import {Payement} from '../../models/payement';
import {Formation} from '../../models/Formation';
import {AffichageEnsPay} from '../../models/affichageEnsPay';
import {formatDate} from '@angular/common';
import {FormationService} from '../../Services/formation.service';
import {PayementEnseignant} from '../../models/payementEnseignant';
import {SelectionModel} from '@angular/cdk/collections';
import {AffichagePayAdmin} from '../../models/AffichagePayAdmin';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-paiement-enseignant',
  templateUrl: './paiement-enseignant.component.html',
  styleUrls: ['./paiement-enseignant.component.css']
})
export class PaiementEnseignantComponent implements OnInit {


  enseignants:Enseignant[] =[];
  salaire=0;
  eleve=new Eleve();
  enseignant = new Enseignant();
  payements: PayementEnseignant[] = [];
  formations: Formation[] = [];
  affichagePayement: AffichagePayAdmin[] = [];
  affichagePay = new AffichageEnsPay();
  date = new Date();
  datefomation = new Date();
  affiche: boolean=false;
  i=new Date().getMonth();
  month: string ='';
  selected: any[]=[];
  mois =["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juiller", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

  selection = new SelectionModel<AffichagePayAdmin>(true, []);
  displayedColumns: string[] = ['select', 'position', 'séance','Groupe', 'date'];
  dataSource = new MatTableDataSource<AffichagePayAdmin>(this.affichagePayement);

  constructor(private payementEnsService: PayementEnseignantService,
              private enseignantService: EnseignantServiceSevice,
              private formationService: FormationService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.getallEns()

  }

  getallEns(){
    this.enseignantService.GetAll().subscribe(res=>{
      this.enseignants=res;
      console.log(res);
    })
  }
  getPayementsByeleve(id: number) {
    this.affichagePayement=[]
    this.dataSource.data=[]
    this.getmonth()
    this.affiche=false;
    this.salaire=0;
    this.payementEnsService.getbyENs(id).subscribe(res => {
        this.payements = res;
        for (let pay of this.payements) {
          this.formationService.getbyid(pay.idF).subscribe(res => {
              this.datefomation = new Date(formatDate(res.date, 'yyyy-MM-dd', 'en_Us'));
              if (this.datefomation.getMonth() == this.i) {
                this.affichagePayement.push({nom: res.nom, groupe: res.groupe.nom, date: res.date, payed: pay.payed, id: pay.idF});
                this.dataSource.data=this.affichagePayement;
                if(pay.payed==false){
                  this.salaire=this.salaire+pay.prix;
                }
                /*if(pay.payed==false){
                this.affichagePayement.push({nom: res.nom, groupe: res.groupe.nom, date: res.date, payed: pay.payed, id: pay.idF});
                this.dataSource.data=this.affichagePayement;
                console.log(this.dataSource.data)
                  this.salaire=this.salaire+pay.prix;
                }*/
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.selected=[this.enseignant.id]
    for(let f of this.selection.selected){
      this.selected.push(f.id)
    }
    console.log(this.selected)
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.affichagePayement.forEach(row => this.selection.select(row));
    this.selected=[];
  }

  payement(){
    this.payementEnsService.updatePayement(this.selected).subscribe(res=>{
      //console.log("ok");
      this.toaster.success("paiement avec succés")
  this.getPayementsByeleve(this.enseignant.id);
    });
  }

}

