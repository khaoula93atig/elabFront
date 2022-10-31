import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { CompteRendu } from 'src/app/models/CompteRendu';
import { dev } from 'src/app/models/dev';
import { Devoir } from 'src/app/models/Devoir';
import { Eleve } from 'src/app/models/Eleve';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { CompteRenduService } from 'src/app/Services/compte-rendu.service';
import { DevoirService } from 'src/app/Services/devoir.service';
import { EleveServiceService } from 'src/app/Services/eleve-service.service';



@Component({
  selector: 'app-ajout-compte-rendu',
  templateUrl: './ajout-compte-rendu.component.html',
  styleUrls: ['./ajout-compte-rendu.component.css']
})
export class AjoutCompteRenduComponent implements OnInit {
  user = new Utilisateur();
  CR = new CompteRendu();
  fichier: File;
  eleve: Eleve;
  devoir: Devoir;
  retrievedImage: string;
  titre:string;
  t = dev;

 
  constructor(
    private activatedRoute:ActivatedRoute,
    private eleveService : EleveServiceService,
    private loginService: LoginService,
    private toasterService: ToastrService,
    private router: Router,
    private compteRenduService: CompteRenduService,
    private devoirService : DevoirService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.titre=params.nom;
        console.log(this.titre)
      })
    this.getuserbyid(this.loginService.currentUserValue.id);
  }

  getuserbyid(id: number) {

    this.eleveService.getEleveByUser(id).subscribe(data => {
      this.eleve = data;
    });
  }
 getbytitre(t : string){
   this.devoirService.tdbytitre(t).subscribe(data => {
    this.devoir = data;
   // console.log(this.devoir.type);
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
    this.CR.eleve= this.eleve;
   this.getbytitre(this.titre);
    const formData = new FormData();
    formData.append('file', this.fichier);
    formData.append('compteRendu', JSON.stringify(this.CR));
    this.compteRenduService.ajout(formData,this.titre).subscribe(
      (res) => {
        let a = res;
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['eleve/exercices/{{CR.fichier}}']);}
        
        , erreur => {
          console.log("hello");
          console.log("******",this.devoir.type);
          console.log(this.CR);
          console.log(this.devoir.id);
          if(this.devoir.type == dev.Exercice ){
            console.log("true");
          this.toasterService.success('Ajout avec success !!', 'Ajout');
          this.router.navigate(['eleve/exercices/']);}
          else{
            console.log("false");
            this.toasterService.success('Ajout avec success !!', 'Ajout');
          this.router.navigate(['eleve/examens/']);
          }
      }
      
       /* console.log("hi1");

        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.router.navigate(['eleve/examens/{{CR.fichier}}'])
        , erreur => {
          console.log("hello1");

          this.toasterService.success('Ajout avec success !!', 'Ajout');
          this.router.navigate(['eleve/examens/{{CR.fichier}}']);}
      */
        
      
  
  );
        }}

