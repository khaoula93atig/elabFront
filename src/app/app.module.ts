import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {AdminModule} from './admin/admin.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './authconfig/authconfig';
import {ToastrModule} from 'ngx-toastr';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {PrimeNGConfig} from 'primeng/api';
import {FullCalendarModule} from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MdpOublierComponent } from './mdp-oublier/mdp-oublier.component';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {DatePipe} from '@angular/common';
import {CheckboxModule} from 'primeng/checkbox';
import { SuccessComponent } from './success/success.component';
import { MessageComponent } from './message/message.component';
import { MessageHomeComponent } from './message-home/message-home.component';
import { MessageUsersComponent } from './message-users/message-users.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from '../assets/stomp';
import {ChannelService} from './Services/channel.service';
import {MessageService} from './Services/message.service';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';



FullCalendarModule.registerPlugins([
  interactionPlugin,
  dayGridPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AdminComponent,
    DashboardComponent,
    MdpOublierComponent,
    SuccessComponent,
    MessageComponent,
    MessageHomeComponent,
    MessageUsersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AdminModule,
    DashboardModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DynamicDialogModule,
    FullCalendarModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    DialogModule,
    DataViewModule,
    CheckboxModule,
    NgxIntlTelInputModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    DialogService,DatePipe, {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
}
