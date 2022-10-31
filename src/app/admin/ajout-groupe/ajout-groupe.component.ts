import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupeType, GType} from '../../models/GroupeType';
import {Eleve} from '../../models/Eleve';
import {Matiere} from '../../models/Matiere';
import {MatiereService} from '../../Services/matiere.service';
import {EleveServiceService} from '../../Services/eleve-service.service';
import {GroupeService} from '../../Services/groupe.service';
import {Groupe} from '../../models/Groupe';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ajout-groupe',
  templateUrl: './ajout-groupe.component.html',
  styleUrls: ['./ajout-groupe.component.css']
})
export class AjoutGroupeComponent implements OnInit {

  ajoutform: FormGroup;
  afficher: boolean=false;
  gtype = new GroupeType();
  types = GType;
  keys = Object.keys(this.types).filter(f => !isNaN(Number(f)));
  eleves: Eleve[]=[];
  matieres:Matiere[]=[]
  matiere=new Matiere();
  groupeType: GroupeType[]=[];
  groupe = new Groupe();
  selected:number[]=[];
  eleveGroupe:any[]=[];
  maxcapacite : number;
  groupeT=new GroupeType();
  constructor(private matiereService:MatiereService,
              private eleveService:EleveServiceService,
              private groupeService: GroupeService,
              private toasterService: ToastrService,
              private route: Router){ }

  ngOnInit(): void {
    this.getAllMatiere();
    this.getallgroupeType()
    this.ajoutform=new FormGroup({
      nom:new FormControl('', Validators.required),
      max:new FormControl(''),
      eleves:new FormControl('',Validators.required),
      matiere:new FormControl('',Validators.required),
      groupeType:new FormControl('',Validators.required),

    })
  }

  getAllMatiere(){
    this.matiereService.allmatiere().subscribe(res=>{this.matieres=res;
    console.log(this.matieres)})

  }
  geteleveByMatiere(i){
    this.matiere=this.matieres[i]
    this.eleveService.getEleveByMatiere(this.matiere.nommatiere,this.matiere.nomniveau).subscribe
    (res=>{this.eleves=res;
    console.log(this.eleves)})

  }
  getallgroupeType(){
    this.groupeService.getAllGroupeType().subscribe(
      res=>{
        this.groupeType=res;
        console.log(this.groupeType)
      }
    )

  }
  gettypegroupe(j){
    //this.groupeT=this.gtype;
    this.gtype=this.groupeType[j];
    console.log(this.gtype);
    for(let key of this.keys) {
      if (this.gtype.type == this.types[key] && key=='1'){
        this.afficher= true;
      }
      else {
        this.afficher=false;
        this.maxcapacite=1;
      }
    }
  }

  ajoutGroupe(){
    console.log(this.selected)
    for(let s of this.selected){
      let el: any={id: s};
      let ens:any = {id: s};
      this.eleveGroupe.push(ens);
    }
    console.log(this.ajoutform.value)
    this.groupe=this.ajoutform.value;
    this.groupe.groupeType=this.gtype
    this.groupe.matiere=this.matiere
    this.groupe.eleves=this.eleveGroupe
    if (this.afficher==false){
      this.maxcapacite=1;
      this.groupe.max=1
    }
    console.log(this.groupe)
    this.groupeService.ajoutGroupe(this.groupe).subscribe(res=>{console.log(res);
      this.toasterService.success('Ajout avec succés');
      this.route.navigate(['admin/listgroupe'])

    },
      error => {
      this.toasterService.error('Groupe deja existe!!!')
    })
    this.ajoutform.reset()

  }

  back(){
    window.history.back();
  }

}
