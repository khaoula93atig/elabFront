
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';
import {AdminModule} from './admin/admin.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {MdpOublierComponent} from './mdp-oublier/mdp-oublier.component';
import { EleveModule } from './eleve/eleve.module';
import {AuthGuard} from './guard/AuthGuard';
import {RoleGuard} from './guard/Role.guad';
import {AfterAuthGuard} from './guard/AfterAuthGuard';
import {ParentModule} from './parent/parent.module';
import {SuccessComponent} from './success/success.component';
import {MessageHomeComponent} from './message-home/message-home.component';


const routes: Routes = [
  {path: '' , component: LoginComponent,canActivate: [AfterAuthGuard]},
  {path: 'dashboard' ,loadChildren : () => DashboardModule},
  {path: 'admin'  ,loadChildren : () => AdminModule,canActivate: [AuthGuard,RoleGuard] ,data:{role:'ADMIN'}},
  {path: 'enseignant' , loadChildren : () => EnseignantModule,canActivate: [AuthGuard,RoleGuard],data:{role:'ENSEIGNANT'}},
  {path: 'parent' , loadChildren : () => ParentModule,canActivate: [AuthGuard,RoleGuard],data:{role:'PARENT'}},
  {path: 'eleve', loadChildren : () => EleveModule,canActivate: [AuthGuard,RoleGuard],data:{role:'ELEVE'}},
  {path: 'profile' , component :  ProfileComponent},
  {path: 'mdpoublier' , component :  MdpOublierComponent},
  {path: 'mdpoublier/:token', component: MdpOublierComponent},
  { path: 'success', component: SuccessComponent },
  { path: 'message', component: MessageHomeComponent },
  { path: 'message/:sender', component: MessageHomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
