import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Calendar, CalendarOptions} from '@fullcalendar/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import {PrimeNGConfig} from 'primeng/api';
import {Formation} from '../../models/Formation';
import {FormationService} from '../../Services/formation.service';
import {DatePipe, formatDate} from '@angular/common';
import {EnseignantServiceSevice} from '../../Services/enseignant-service.service';
import {Groupe} from '../../models/Groupe';
import {GroupeService} from '../../Services/groupe.service';
import {Enseignant} from '../../models/Enseignant';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { UtilisateurServiceService } from 'src/app/Services/utilisateur-service.service';
import { LoginService } from 'src/app/login/login.service';
import {PayementEnseignantService} from '../../Services/payement-enseignant.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit, AfterViewInit {

  Events = [];

  formation: Formation;
  formations: Formation[] = [];

  groupes: Groupe[] = [];
  ensGroupr: Enseignant[];

  calendarOptions: CalendarOptions;
  hidden = false;
  evenement: FormGroup;
  modifier: FormGroup;
  titre: string;
  dt1: Date;
  groupe: Groupe;
  calender: Calendar;
  title: string;
  displayBasic: boolean;
  sceance: string;
  displayBasic2: boolean;
  displayPosition: boolean;
  dt: Date;
  position: string;
  display: boolean;
  lien : string;
  debut :Date;
  fin:Date;
  ens:Enseignant;
  idF:number;

  constructor(private dialog: DialogService,
              private primengConfig: PrimeNGConfig,
              private formationService: FormationService,
              private enseignantService: EnseignantServiceSevice,
              private groupeService: GroupeService,
              private toasterService: ToastrService,
              private datePipe: DatePipe,
              private router: Router,
              private loginService: LoginService,
              private userService: UtilisateurServiceService,
              private payementEnseignantService: PayementEnseignantService

  ) {
  }

  ngAfterViewInit() {



    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,dayGridWeek',
      },
      themeSystem: 'bootstrap',
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: 'fr',
      selectable: true,
      initialView: 'dayGridMonth',
      eventClick: this.onEventClick.bind(this),
      eventColor: '#5bc0de',
      height:600,
    };
  }

  ngOnInit(): void {

    this.getuserbyid(this.loginService.currentUserValue.id);




    this.modifier = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      lien: new FormControl('', [Validators.required]),
      enseignant: new FormControl('', [Validators.required]),
      groupe: new FormControl('', [Validators.required]),
      heuredebut: new FormControl('', [Validators.required]),
      heurefin: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }



  onEventClick(info) {
    this.displayBasic2 = true;
    this.idF=info.event.extendedProps.id;
    this.titre = info.event.title;
    this.dt1 = info.event.start;
    this.debut=info.event.extendedProps.date;
    this.fin=info.event.extendedProps.end;
    this.groupe=info.event.extendedProps.groupe;
    this.lien=info.event.extendedProps.lien;
  }

  getuserbyid(id: number){

    this.userService.getEnByUser(id).subscribe((res)=> {
      this.ens = res;
      this.getAll(this.ens.id);
    })
  }

  getAll(id) {
    this.Events = [];
    this.formationService.GetByEnseignant(id).subscribe((res) => {
      this.formations = res;
      this.calendarOptions.events = [];
      for (let f of this.formations) {
        let start1 = formatDate(f.heuredebut, 'hh:mm', 'en_Us');
        let start2 = formatDate(f.heurefin, 'hh:mm', 'en_Us');
        let day = formatDate(f.heuredebut, 'yyyy-MM-dd hh:mm:ss', 'en_Us');
        let event = {
          title: f.nom,
          start: day.toString(),
          extendedProps: {
            id:f.id,
          lien: f.lien,
            groupe:f.groupe.nom,
          date: start1.toString(),
          end: start2.toString()
          }

        };
        this.Events.push(event);
        this.calendarOptions.events = this.Events;


      }
    });
  }

  onNavigate(){
    window.open(this.lien, "_blank");
    this.payementEnseignantService.ajoutPayementEns(this.ens.id,this.idF).subscribe(res=>console.log(res));
  }



}
