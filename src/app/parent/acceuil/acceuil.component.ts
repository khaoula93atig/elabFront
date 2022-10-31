import { Component, OnInit } from '@angular/core';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {LoginService} from '../../login/login.service';
import {Utilisateur} from '../../models/Utilisateur';
import {ParentService} from '../../Services/parent.service';
import {Parent} from '../../models/Parent';
import {Eleve} from '../../models/Eleve';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(private userService: UtilisateurServiceService,
              private loginService: LoginService,
              private parentService: ParentService) { }
  user = new Utilisateur();
  parent = new Parent();
  id : number;
  enfants: Eleve[]=[];
  selectedCars: [];

  ngOnInit(): void {
    this.getParentByuser(this.loginService.currentUserValue.id);
    //console.log(this.id)
    //this.getenfant(this.id)
  }

  getParentByuser(id){
    this.parentService.getParentByUser(id).subscribe(data => {
      console.log(data);
      this.parent = data;
      this.id= this.parent.id;
      this.getenfant(this.id)
    })

  }
  getenfant(id){
    this.parentService.getEnfants(id).subscribe((res)=>
    {
      console.log(res);
      this.enfants=res;

    })
  }

}
