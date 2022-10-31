import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Devoir } from 'src/app/models/Devoir';
import {Groupe} from 'src/app/models/Groupe';
import {GroupeService} from 'src/app/Services/groupe.service';
import {UtilisateurServiceService} from 'src/app/Services/utilisateur-service.service';
import {Utilisateur} from 'src/app/models/Utilisateur';
import {LoginService} from 'src/app/login/login.service';
import {Enseignant} from 'src/app/models/Enseignant';
import { DevoirService } from 'src/app/Services/devoir.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { dev } from 'src/app/models/dev';


@Component({
  selector: 'app-ajout-examen',
  templateUrl: './ajout-examen.component.html',
  styleUrls: ['./ajout-examen.component.css']
})
export class AjoutExamenComponent implements OnInit {

  user = new Utilisateur();
  ajoutform: FormGroup;
  devoir =  new Devoir(); 
  titre : string;
  selected: string;
  deadline : Date;
  fichier: File;
  groupes: Groupe[];
  enseignant: Enseignant;
  grpselected: any = [];
  retrievedImage: string;
  description: string;
  id: number;
  nom: string;
  form: NgForm;
  type= dev;
 



  constructor(private groupeService: GroupeService,
    private userService: UtilisateurServiceService,
    private loginService: LoginService,
    private devService : DevoirService,
    private toasterService: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {  
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.getallgroupes();

  }

  getuserbyid(id: number) {

    this.userService.getEnByUser(id).subscribe(data => {
      this.enseignant = data;
    });
  }

  getallgroupes() {
    this.groupeService.allGroupe().subscribe((res) => {
      this.groupes = res;
    });
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      };
      reader.readAsDataURL(this.fichier);

    }
  }
  ajout(){
    this.devoir.enseignant = this.enseignant;
  
    for (let s of this.selected) {
      let gr: any = {nom: s};
      this.grpselected.push(gr);
    }
    this.devoir.type= this.type.Evaluation;
    this.devoir.groupes = this.grpselected;
    const formData = new FormData();
    formData.append('file', this.fichier);
    formData.append('devoir', JSON.stringify(this.devoir));
    this.devService.ajout(formData).subscribe(
      res => {
        let a = res;
        console.log(a);

        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['enseignant/list-examen'])
        ;
      }

      , erreur => {
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['enseignant/list-examen']);
      });
  }
}