import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AjoutAdminComponent} from './ajout-admin/ajout-admin.component';
import {ListAdminComponent} from './list-admin/list-admin.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import {ListEnseignantComponent} from './list-enseignant/list-enseignant.component';
import {ListEleveComponent} from './list-eleve/list-eleve.component';
import {ListParentsComponent} from './list-parents/list-parents.component';
import {AjoutEnseignantComponent} from './ajout-enseignant/ajout-enseignant.component';
import {CalendrierComponent} from './calendrier/calendrier.component';
import {AuthGuard} from '../guard/AuthGuard';
import {RoleGuard} from '../guard/Role.guad';
import {AjoutEleveComponent} from './ajout-eleve/ajout-eleve.component';
import {AjoutParentComponent} from './ajout-parent/ajout-parent.component';
import {ListMatiereComponent} from './list-matiere/list-matiere.component';
import {ListGroupeComponent} from './list-groupe/list-groupe.component';
import {AjoutGroupeComponent} from './ajout-groupe/ajout-groupe.component';
import {DashbordComponent} from './dashbord/dashbord.component';
import {ComptabiliteComponent} from './comptabilite/comptabilite.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import {PaiementEleveComponent} from './paiement-eleve/paiement-eleve.component';
import {PaiementEnseignantComponent} from './paiement-enseignant/paiement-enseignant.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent,canActivate: [AuthGuard,RoleGuard] ,data:{role:'ADMIN'},
    children: [
      {path: 'listadmin', component : ListAdminComponent },
      {path: 'ajout', component : AjoutAdminComponent},
      {path: 'profil', component : ProfilAdminComponent},
      {path: 'listens', component : ListEnseignantComponent},
      {path: 'listeleve', component : ListEleveComponent},
      {path: 'listparent', component : ListParentsComponent},
      {path: 'ajoutens', component : AjoutEnseignantComponent},
      {path: 'ajouteleve', component : AjoutEleveComponent},
      {path: 'ajoutparent', component : AjoutParentComponent},
      {path: 'ajoutgroupe', component : AjoutGroupeComponent},
      {path: 'listmatiere', component : ListMatiereComponent},
      {path: 'listgroupe', component : ListGroupeComponent},
      {path: 'calendrier', component : CalendrierComponent},
      {path: 'acceuil', component : DashbordComponent},
      {path: 'comptabilte', component : ComptabiliteComponent},
      {path: 'listcours', component: ListCoursComponent},
      {path: 'PaiementEleve', component: PaiementEleveComponent},
      {path: 'PaiementEnseignant', component: PaiementEnseignantComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule{

}
