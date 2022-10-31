import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UtilisateurServiceService} from 'src/app/Services/utilisateur-service.service';
import {LoginService} from 'src/app/login/login.service';
import {Enseignant} from 'src/app/models/Enseignant';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { RemarqueService } from 'src/app/Services/remarque.service';
import { Eleve } from 'src/app/models/Eleve';
import { Remarque } from 'src/app/models/Remarque';
import { EleveServiceService } from 'src/app/Services/eleve-service.service';
import {ChannelService} from '../../Services/channel.service';
import {Parent} from '../../models/Parent';
@Component({
  selector: 'app-ajout-remarque',
  templateUrl: './ajout-remarque.component.html',
  styleUrls: ['./ajout-remarque.component.css']
})
export class AjoutRemarqueComponent implements OnInit {
  ajoutform: FormGroup;
  titre : string;
  description:string;
  enseignant: Enseignant;
  eleve:Eleve;
  remarque= new Remarque();
  eleves:Eleve[];
  grpselected: any;
  id: number
  selected: string;
  ideleve : number;
 parent=new  Parent();

  constructor(
    private userService: UtilisateurServiceService,
    private eleveService: EleveServiceService,
    private remarqueService : RemarqueService,
    private loginService: LoginService,
    private toasterService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.getalleleves();
  }

  getalleleves(){
    this.eleveService.GetAll().subscribe((res) => {
      this.eleves = res;
      console.log(this.eleves);

    });

  }

  getuserbyid(id: number) {

    this.userService.getEnByUser(id).subscribe(data => {
      console.log(data);
      this.enseignant = data;
    });
  }

  geteleveid(i){
    this.ideleve = this.eleves[i].id;
    this.parent=this.eleves[i].parent;
  }

  ajoutRemarque(){
    console.log(this.parent)
    let ens : any = {id:this.enseignant.id}
    this.remarque.enseignant= ens;
    let ele : any ={id:this.ideleve}

    /*for (let s of this.selected) {
      let gr: any = {n: s};
      console.log(gr);
      this.grpselected = gr;
    }*/
    this.remarque.eleve= ele;
    console.log(this.remarque);
    this.remarqueService.ajout(this.remarque,String(this.parent.utilisateur.id)).subscribe(res => {let a = res;
    console.log(a);
    this.toasterService.success('Ajout avec success !!', 'Ajout');
    this.router.navigate(['enseignant/list-remarque'])
    ;
  }

  , erreur => {
    this.toasterService.success('Ajout avec success !!', 'Ajout');
    this.router.navigate(['enseignant/list-remarque']);

  });
  }
}
