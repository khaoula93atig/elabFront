import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Utilisateur} from '../../models/Utilisateur';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  ngOnInit(): void {

  }


}
