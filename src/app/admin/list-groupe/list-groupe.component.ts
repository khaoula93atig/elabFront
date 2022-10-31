import { Component, OnInit } from '@angular/core';
import {Groupe} from '../../models/Groupe';
import {GroupeService} from '../../Services/groupe.service';
import {Admin} from '../../models/Admin';
import {ConfirmationService} from 'primeng/api';
import {Eleve} from '../../models/Eleve';
import {Utilisateur} from '../../models/Utilisateur';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {GroupeType} from '../../models/GroupeType';

@Component({
  selector: 'app-list-groupe',
  templateUrl: './list-groupe.component.html',
  styleUrls: ['./list-groupe.component.css']
})
export class ListGroupeComponent implements OnInit {

  groupes:Groupe[]=[];
  groupe=new Groupe();
  eleve=new Eleve();
  eleveuser= new Utilisateur();
  maximum:number;

  constructor(private groupeService:GroupeService,
              private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getallgroupes();

  }
  getallgroupes(){
    this.groupeService.allGroupe().subscribe(res=>{
      console.log(res);
      this.groupes=res;
    })
  }

  getbyid(grp:Groupe){
    this.groupe=grp;
    this.maximum=this.groupe.max
    console.log(this.groupe);

  }
  geteleve(eleve){
    this.eleve=eleve;
    this.eleveuser=eleve.utilisateur;
    console.log(this.eleve)
  }

  retirer(){
    this.groupeService.removeeleve(this.groupe.id,this.eleve.id).subscribe(res=>{console.log(res);
      this.toasterService.success("succes");
      this.ngOnInit();
    })
  }
  viderliste(){
    this.groupeService.removeliste(this.groupe.id).subscribe(res=>{
      console.log(res);
      this.toasterService.success("succes")
      this.ngOnInit();
    })

  }
  modifiercapacite(){
    this.groupeService.modifierCapacite(this.maximum,this.groupe.id).subscribe(res=> {
      console.log(res);
      this.toasterService.success("succes");
      this.ngOnInit();

    })
  }
}
