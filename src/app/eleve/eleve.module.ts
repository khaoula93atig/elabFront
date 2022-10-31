import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleveComponent } from './eleve/eleve.component';
import { NavbarEleveComponent } from './navbar-eleve/navbar-eleve.component';
import { SidebarEleveComponent } from './sidebar-eleve/sidebar-eleve.component';
import { EleveRoutingModule } from './eleve-routing.module';
import {CalenderComponent} from './calender/calender.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FormComponent} from './form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfilEleveComponent } from './profil-eleve/profil-eleve.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { AjoutCompteRenduComponent } from './ajout-compte-rendu/ajout-compte-rendu.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { ListCRComponent } from './list-cr/list-cr.component';
import { ExamensComponent } from './examens/examens.component';



@NgModule({
  declarations: [
    EleveComponent,
    NavbarEleveComponent,
    SidebarEleveComponent,
    CalenderComponent,
    FormComponent,
    ProfilEleveComponent,
    ListCoursComponent,
    ExercicesComponent,
    ExamensComponent,
    AjoutCompteRenduComponent,
    ListCRComponent
  ],
  exports:[
    
  ],
  imports: [
    CommonModule,
    EleveRoutingModule,
    FullCalendarModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule

  ]
})
export class EleveModule { }
