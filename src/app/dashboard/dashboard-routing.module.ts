import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {ListComponent} from './list/list.component';
import {FormComponent} from './form/form.component';
import {FormuserComponent} from './formuser/formuser.component';
import {ProfilComponent} from './profil/profil.component';
import {ModifieruserComponent} from './modifieruser/modifieruser.component';
import {CalenderComponent} from './calender/calender.component';
import {EleveComponent} from './eleve/eleve.component';
import {TableauDeBordComponent} from './tableau-de-bord/tableau-de-bord.component';
import {CoursComponent} from './cours/cours.component';
import {ListEnfantComponent} from './list-enfant/list-enfant.component';




const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'listadmin', component : ListComponent},
      {path: 'listens', component : ListComponent},
      {path: 'formAdmin', component : FormComponent},
      {path: 'formEns', component : FormuserComponent},
      {path: 'profil', component : ProfilComponent},
      {path: 'modifieruser', component : ModifieruserComponent},
      {path: 'calender', component : CalenderComponent},
      {path: 'eleve', component: EleveComponent},
      {path: 'acceuil', component: TableauDeBordComponent},
      {path: 'cours', component:CoursComponent},
      {path: 'enfant', component:ListEnfantComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{

}
