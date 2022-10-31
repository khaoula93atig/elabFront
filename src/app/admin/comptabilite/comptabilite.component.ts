import { Component, OnInit } from '@angular/core';
import {Comptabilite} from '../../models/Comptabilite';
import {ComptabiliteService} from '../../Services/comptabilite.service';

@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {

  constructor(private compService: ComptabiliteService) { }
 comptabilte = new Comptabilite();
  afficher = false;
  valeurdep=0;
  valeurrec=0;
  ngOnInit(): void {
    this.getComptabilite();
  }

  getComptabilite(){
    this.compService.GetbyID(1063).subscribe(res=>{this.comptabilte=res;
      console.log(this.comptabilte)});
  }

  ajoutdepence(){
    this.compService.AjouterDepence(1063,this.valeurdep).subscribe(res=> {this.ngOnInit();
      this.valeurdep=0});

  }

  ajoutrecomponce(){
    this.compService.AjouterRecompence(1063,this.valeurrec).subscribe(res=> {this.ngOnInit();
      this.valeurrec=0});

  }


}
