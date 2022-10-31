import { Component, OnInit } from '@angular/core';
import {Matiere} from '../../models/Matiere';
import {MatiereService} from '../../Services/matiere.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css']
})
export class ListMatiereComponent implements OnInit {

  matieres: Matiere[]=[];
  matieresnom:string[]=[];
  niveaunom:string[]=[];
  matiere:string[]=[];
  matier=new Matiere();
  i: number=0;
  form:FormGroup;
  formn:FormGroup;

  constructor(private matiereService: MatiereService,
  private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.getallMatiere();
    this.form=new FormGroup({
      matiere:new FormControl('',Validators.required),
      niveau:new FormControl(''),
    })
    this.formn=new FormGroup({
      matieren:new FormControl('',Validators.required),
      niveaun:new FormControl('',Validators.required),
    })
  }
  getallMatiere(){
    this.matiereService.allmatiere().subscribe((res)=>{this.matieres=res.sort((a,b)=>(a.nommatiere>b.nommatiere)?1:-1);
    console.log(res);
    for(let m of this.matieres){
      this.matieresnom.push(m.nommatiere)
    }
    this.matiere.push(this.matieresnom[0])
    for(let m of this.matieresnom) {
      if(this.matiere.includes(m)==false){
        this.matiere.push(m)
      }
    }
    console.log(this.matieresnom)
    console.log(this.matiere)
      })

  }
  ajout(){
    this.matiereService.ajout(this.matier).subscribe(res=>{console.log(res);
      this.toasterService.success("Ajout avec succés");
      this.ngOnInit();
    })
  }



}
