import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { NavbarEnseignantComponent } from './navbar-enseignant/navbar-enseignant.component';
import { SidebarEnseignantComponent } from './sidebar-enseignant/sidebar-enseignant.component';
import { EnseignantRoutingModule } from './enseignant-routing.module';
import { ProfilEnseignantComponent } from './profil-enseignant/profil-enseignant.component';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { AjoutCoursComponent } from './ajout-cours/ajout-cours.component';
import {CalenderComponent} from './calender/calender.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FormComponent} from './form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoursComponent } from './cours/cours.component';
import { AjoutExerciceComponent } from './ajout-exercice/ajout-exercice.component';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { ListExamenComponent } from './list-examen/list-examen.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {NgSelectModule} from '@ng-select/ng-select';

import { ListExerciceComponent } from './list-exercice/list-exercice.component';
import { ListRemarqueComponent } from './list-remarque/list-remarque.component';
import { AjoutRemarqueComponent } from './ajout-remarque/ajout-remarque.component';
import { PaiementComponent } from './paiement/paiement.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    EnseignantComponent,
    NavbarEnseignantComponent,
    SidebarEnseignantComponent,
    ProfilEnseignantComponent,
    ListEleveComponent,
    ListCoursComponent,
    AjoutCoursComponent,
    CoursComponent,
    ProfilEnseignantComponent,
    FormComponent,
    CalenderComponent,
    AjoutExerciceComponent,
    AjoutExamenComponent,
    ListExamenComponent,
    ListExerciceComponent,
    ListRemarqueComponent,
    AjoutRemarqueComponent,
    PaiementComponent
  ],
  exports: [
    SidebarEnseignantComponent,
    NavbarEnseignantComponent,
  ],
    imports: [
        CommonModule,
        EnseignantRoutingModule,
        FullCalendarModule,
        DialogModule,
        NgxIntlTelInputModule,
        NgSelectModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        MatSelectModule

    ]
})
export class EnseignantModule { }
