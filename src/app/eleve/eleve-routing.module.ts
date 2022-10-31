import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { EleveComponent } from './eleve/eleve.component';
import {CalenderComponent} from './calender/calender.component';
import { ProfilEleveComponent } from './profil-eleve/profil-eleve.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ExamensComponent } from './examens/examens.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { AjoutCompteRenduComponent } from './ajout-compte-rendu/ajout-compte-rendu.component';
const routes: Routes = [
  {
    path: '', component: EleveComponent,
    children: [
      {path: 'calender', component : CalenderComponent},
      {path: 'profileleve', component : ProfilEleveComponent},
      {path: 'listcours', component : ListCoursComponent},
      {path: 'examens', component : ExamensComponent},
      {path: 'exercices', component : ExercicesComponent},
      {path: 'ajoutCompteRendu/:nom', component: AjoutCompteRenduComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleveRoutingModule{

}