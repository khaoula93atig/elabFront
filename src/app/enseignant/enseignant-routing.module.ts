import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { EnseignantComponent } from './enseignant/enseignant.component';
import {CalenderComponent} from './calender/calender.component';
import {AjoutCoursComponent} from './ajout-cours/ajout-cours.component';
import {ProfilEnseignantComponent} from './profil-enseignant/profil-enseignant.component';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { AjoutExerciceComponent } from './ajout-exercice/ajout-exercice.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListExamenComponent } from './list-examen/list-examen.component';
import { ListExerciceComponent } from './list-exercice/list-exercice.component';
import { ListRemarqueComponent } from './list-remarque/list-remarque.component';
import { AjoutRemarqueComponent } from './ajout-remarque/ajout-remarque.component';
import {PaiementComponent} from './paiement/paiement.component';
const routes: Routes = [
  {
    path: '', component: EnseignantComponent,
    children: [
      {path: 'calender', component : CalenderComponent},
      {path: 'ajout-cours', component: AjoutCoursComponent},
      {path: 'profil-enseignant', component: ProfilEnseignantComponent},
      {path: 'list-eleve', component: ListEleveComponent},
      {path: 'ajout-exercice',component: AjoutExerciceComponent},
      {path: 'ajout-examen', component: AjoutExamenComponent},
      {path: 'list-cours', component: ListCoursComponent},
      {path: 'list-examen', component: ListExamenComponent},
      {path: 'list-exercice', component: ListExerciceComponent},
      {path: 'list-remarque', component: ListRemarqueComponent},
      {path: 'ajout-remarque', component: AjoutRemarqueComponent},
      {path: 'payement', component: PaiementComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule{

}
