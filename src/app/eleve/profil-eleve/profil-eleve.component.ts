import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurServiceService } from 'src/app/Services/utilisateur-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.css']
})
export class ProfilEleveComponent implements OnInit {
  user = new Utilisateur();
  retrievedImage: string;
  photo: File;
  form : FormGroup;

  constructor(private userService: UtilisateurServiceService,
    private loginService: LoginService,
              private tosterService: ToastrService) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);

    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sexe: new FormControl('', Validators.required),
      num_tel: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pays: new FormControl('', Validators.required),
      adress: new FormControl('', [Validators.required, Validators.minLength(10)]),
      date_naissance: new FormControl('', Validators.required),
    });
  }

  getuserbyid(id: number){
    this.userService.getUserById(id).subscribe(
      user => {
        this.user = user;
        this.getImage();
        console.log("kkkk",this.user);
      },
      error => {
        console.log(error);
      }
    );
  }
  modifier(form: FormGroup){
    this.userService.modifieruser(this.user.id, form.value).subscribe(
      res=> {
        console.log(this.user);
        this.tosterService.success("modification terminée");
        this.ngOnInit();
      },
      error => {this.tosterService.success("modification échouée");
        window.location.reload();
      });

  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      console.log(this.photo)
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.photo)

    }
  }
  getImage() {

    this.retrievedImage = this.user.photo;
  }
  updateUser() {

    const formData = new FormData();
    formData.append('image', this.photo);
    this.userService.modifierPhoto(formData , this.user.id)
      .subscribe(res => {
        this.tosterService.success('Data update successfully !!', 'UPDATE');
          window.location.reload();
      }
    ,erreur=>{this.tosterService.success('Data update successfully !!', 'UPDATE');
          window.location.reload();}
      );
  }


}
