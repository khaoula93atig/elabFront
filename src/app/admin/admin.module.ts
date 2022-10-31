import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { ListParentsComponent } from './list-parents/list-parents.component';
import {DialogModule} from 'primeng/dialog';
import {RouterModule} from '@angular/router';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { AjoutEnseignantComponent } from './ajout-enseignant/ajout-enseignant.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgSelectModule} from '@ng-select/ng-select';
import { CalendrierComponent } from './calendrier/calendrier.component';
import {ButtonModule} from 'primeng/button';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import { AjoutEleveComponent } from './ajout-eleve/ajout-eleve.component';
import { AjoutParentComponent } from './ajout-parent/ajout-parent.component';
import { ListMatiereComponent } from './list-matiere/list-matiere.component';
import { ListGroupeComponent } from './list-groupe/list-groupe.component';
import { AjoutGroupeComponent } from './ajout-groupe/ajout-groupe.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { PaiementEleveComponent } from './paiement-eleve/paiement-eleve.component';
import {MatSelectModule} from '@angular/material/select';
import { PaiementEnseignantComponent } from './paiement-enseignant/paiement-enseignant.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
    declarations: [ AjoutAdminComponent, NavbarAdminComponent, SidebarAdminComponent, ListAdminComponent, ProfilAdminComponent, ListEnseignantComponent, ListEleveComponent, ListParentsComponent, AjoutEnseignantComponent, CalendrierComponent, AjoutEleveComponent, AjoutParentComponent, ListMatiereComponent, ListGroupeComponent, AjoutGroupeComponent, DashbordComponent, ComptabiliteComponent, ListCoursComponent, PaiementEleveComponent, PaiementEnseignantComponent],
  exports: [
    SidebarAdminComponent,
    NavbarAdminComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        RouterModule,
        NgxIntlTelInputModule,
        NgSelectModule,
        ButtonModule,
        FullCalendarModule,
        NgbButtonsModule,
        NgMultiSelectDropDownModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class AdminModule { }
