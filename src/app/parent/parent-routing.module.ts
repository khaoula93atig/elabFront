import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guard/AuthGuard';
import {RoleGuard} from '../guard/Role.guad';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {NgModule} from '@angular/core';
import {ParentComponent} from './parent/parent.component';
import {ListAdminComponent} from '../admin/list-admin/list-admin.component';
import {DetailsFilsComponent} from './details-fils/details-fils.component';

const routes: Routes = [
  {
    path: '', component: ParentComponent,canActivate: [AuthGuard,RoleGuard] ,data:{role:'PARENT'},
    children: [
      {path: 'acceuil', component : AcceuilComponent},
      {path: 'filsdetails/:id', component : DetailsFilsComponent}
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule{

}
