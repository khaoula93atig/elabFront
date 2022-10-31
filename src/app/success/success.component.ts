import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/User';
import {jsPDF} from 'jspdf';
import {PayementService} from '../Services/payement.service';
import {Eleve} from '../models/Eleve';
import {EleveServiceService} from '../Services/eleve-service.service';
import {FormationService} from '../Services/formation.service';
import {Formation} from '../models/Formation';
import {Payement} from '../models/payement';
import {GroupeService} from '../Services/groupe.service';
import {Groupe} from '../models/Groupe';
import {AffichageFacture} from '../models/AffichageFacture';
import html2canvas from 'html2canvas';
import {Parent} from '../models/Parent';
import {LoginService} from '../login/login.service';
import {ParentService} from '../Services/parent.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  list: any;
  eleve = new Eleve();
  formation: Formation[] = [];
  payment = new Payement();
  prix: any[] = [];
  groupe = new Groupe();
  datefacture= new Date();
  affichage: AffichageFacture[]=[];
  totale : number=0;
  parent=new Parent();
  constructor(private payementServices: PayementService,
              private eleveService: EleveServiceService,
              private formationService: FormationService,
              private groupeService: GroupeService ,
              private  loginService: LoginService,
              private parentService: ParentService) {
  }

  ngOnInit(): void {
    this.getParentByuser(this.loginService.currentUserValue.id);
    this.list = new BehaviorSubject<any[]>(
      JSON.parse(localStorage.getItem('payements'))
    );
    this.payementServices.updatePayement(this.list.value).subscribe();
    console.log(this.list.value);
    this.getelevebyid();
    for (let i = 1; i < this.list.value.length; i++) {
      this.getformationbyid(this.list.value[i]);
    }



  }

  getelevebyid() {
    this.eleveService.findbyid(this.list.value[0]).subscribe(res => this.eleve = res);
  }

  getformationbyid(id) {
    this.formationService.getbyid(id).subscribe(
      res => {
        this.groupeService.getbynom(res.groupe.nom).subscribe(pr => {
          this.affichage.push({nom: res.nom, date: res.date, groupe: res.groupe.nom, prix: pr.groupeType.prix});
          this.totale+= pr.groupeType.prix})
        })

  }

  exportHtmlToPDF(){
    let data = document.getElementById('htmltable');

    html2canvas(data).then(canvas => {

      let docWidth = 208;
      let docHeight = canvas.height * docWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let doc = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)

      doc.save('facture-de-'+this.eleve.utilisateur.nom+'.pdf');
    });
  }
  getParentByuser(id){
    this.parentService.getParentByUser(id).subscribe(data => {
      console.log(data);
      this.parent = data;
    })

  }



}
