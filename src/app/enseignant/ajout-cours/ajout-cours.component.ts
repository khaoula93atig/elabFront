import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {GroupeService} from 'src/app/Services/groupe.service';
import {Cours} from 'src/app/models/Cours';
import {Enseignant} from 'src/app/models/Enseignant';
import {Groupe} from 'src/app/models/Groupe';
import {CoursService} from 'src/app/Services/cours.service';


import {LoginService} from 'src/app/login/login.service';
import {Utilisateur} from 'src/app/models/Utilisateur';
import {UtilisateurServiceService} from 'src/app/Services/utilisateur-service.service';

@Component({
  selector: 'app-ajout-cours',
  templateUrl: './ajout-cours.component.html',
  styleUrls: ['./ajout-cours.component.css']
})
export class AjoutCoursComponent implements OnInit {
  user = new Utilisateur();
  ajoutform: FormGroup;
  cours = new Cours();
  enseignant: Enseignant;
  fichier: File;
  selected: string;
  description: string;
  nomcours: string;
  id: number;
  nom: string;
  groupes: Groupe[];
  form: NgForm;
  retrievedImage: string;
  grpselected: any = [];

  constructor(private coursService: CoursService,
              private groupeService: GroupeService,
              private userService: UtilisateurServiceService,
              private loginService: LoginService,
              private toasterService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.getallgroupes();
  }

  getallgroupes() {
    this.groupeService.allGroupe().subscribe((res) => {
      this.groupes = res;
    });

  }

  getuserbyid(id: number) {

    this.userService.getEnByUser(id).subscribe(data => {
      this.enseignant = data;
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

  ajoutCours() {
    this.cours.enseignant = this.enseignant;
    for (let s of this.selected) {
      let gr: any = {nom: s};
      this.grpselected.push(gr);
    }
    this.cours.groupes = this.grpselected;
    const formData = new FormData();

    formData.append('file', this.fichier);
    formData.append('cours', JSON.stringify(this.cours));

    this.coursService.ajout(formData).subscribe(
      res => {
        let a = res;

        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['enseignant/list-cours'])
        ;
      }

      , erreur => {
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['enseignant/list-cours']);
      });

  }

}
