import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ListComponent} from './list/list.component';
import {FormComponent} from './form/form.component';
import {FormuserComponent} from './formuser/formuser.component';
import {ListEnsComponent} from './list-ens/list-ens.component';
import {ProfilComponent} from './profil/profil.component';
import {ModifieruserComponent} from './modifieruser/modifieruser.component';
import {AjoutParentComponent} from './ajout-parent/ajout-parent.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalenderComponent} from './calender/calender.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { EleveComponent } from './eleve/eleve.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { CoursComponent } from './cours/cours.component';
import { ListEnfantComponent } from './list-enfant/list-enfant.component';
import {OrderListModule} from 'primeng/orderlist';
import {DataViewModule} from 'primeng/dataview';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [NavbarComponent, SidebarComponent, ListComponent, FormComponent, FormuserComponent, ListEnsComponent, ProfilComponent, ModifieruserComponent, AjoutParentComponent, CalenderComponent, EleveComponent, TableauDeBordComponent, CoursComponent, ListEnfantComponent],
  exports: [
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    OrderListModule,
    DataViewModule
  ]
})
export class DashboardModule {
}
