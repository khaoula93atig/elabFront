import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NabarParentComponent } from './nabar-parent/nabar-parent.component';
import { SidebarParentComponent } from './sidebar-parent/sidebar-parent.component';
import { ParentComponent } from './parent/parent.component';
import {ParentRoutingModule} from './parent-routing.module';
import { DetailsFilsComponent } from './details-fils/details-fils.component';
import {CheckboxModule} from 'primeng/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AcceuilComponent,
    NabarParentComponent,
    SidebarParentComponent,
    ParentComponent,
    DetailsFilsComponent
  ],
    imports: [
        CommonModule,
        ParentRoutingModule,
        CheckboxModule,
        MatGridListModule
    ]
})
export class ParentModule { }
