import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit, AfterViewInit {

  Events = [];

  formation: Formation;
  formations: Formation[] = [];

  groupes: Groupe[] = [];
  testGroupe: Groupe = new Groupe();
  ensGroupr: Enseignant[];
  enseignant: number;
  ensaignantformation:any;

  calendarOptions: CalendarOptions;
  hidden = false;
  evenement: FormGroup;
  ajoutFormation: FormGroup;
  modifier: FormGroup;
  titre: string;
  dt1: Date;
  calender: Calendar;
  title: string;
  displayBasic: boolean;
  displayBasic2: boolean;
  displayPosition: boolean;
  dt: Date;
  position: string;
  display: boolean;
  lien : string;
  debut :Date;
  fin:Date;
  groupeid:number;
  ensid:number;
  modifierens =false;
  idFormation:number;

  constructor(private dialog: DialogService,
              private primengConfig: PrimeNGConfig,
              private formationService: FormationService,
              private enseignantService: EnseignantServiceSevice,
              private groupeService: GroupeService,
              private toasterService: ToastrService,
              private ensService: EnseignantServiceSevice,
              private datePipe: DatePipe,
              private router: Router
  ) {
  }

  ngAfterViewInit() {

    this.getAll();

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
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventColor: '#5bc0de',
      height:600,
      eventBorderColor:'#5bc0de',
      editable:true
    };
  }

  ngOnInit(): void {
    this.getAll();
    this.testGroupe = new Groupe();
    this.getallgoupe();


//formulaire d'ajout de nouvelle formation

    this.ajoutFormation = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      lien: new FormControl('', [Validators.required]),
      enseignant: new FormControl('', [Validators.required]),
      groupe: new FormControl('', [Validators.required]),
      heuredebut: new FormControl('', [Validators.required]),
      heurefin: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });

    this.modifier = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      lien: new FormControl('', [Validators.required]),
      enseignant: new FormControl(''),
      groupe: new FormControl('', [Validators.required]),
      heuredebut: new FormControl('', [Validators.required]),
      heurefin: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
    this.primengConfig.ripple = true;
  }

  onDateClick(res) {
    this.ajoutFormation.reset();
    this.displayBasic = true;
    this.dt = res.date;
    console.log(this.dt);
  }

  onEventClick(info) {
    this.idFormation=info.event.id;
    this.ensid=info.event.extendedProps.enseignant;
    this.ensService.GetById(info.event.extendedProps.enseignant).subscribe(res=>this.ensaignantformation=res)
    for(let i=0; i<this.groupes.length;i++){
      if(i==this.groupeid){
        this.testGroupe=this.groupes[i];
      }
    }
    this.displayBasic2 = true;
    this.titre = info.event.title;
    this.dt1 = info.event.start;
    this.debut=info.event.extendedProps.date;
    this.fin=info.event.extendedProps.end;
    this.lien=info.event.extendedProps.lien;
    this.groupeid=info.event.extendedProps.groupe;
  }

  processForm() {
    let ens = {id: this.ensGroupr[this.enseignant].id};
    let grp = {
      matiere: {
        nommatiere: this.testGroupe.matiere.nommatiere,
        nomniveau: this.testGroupe.matiere.nomniveau
      },
      nom: this.testGroupe.nom
    };

    let hr = new Date(this.ajoutFormation.get('date').value + ' ' + this.ajoutFormation.get('heuredebut').value + ':00');
    let hf = new Date(this.ajoutFormation.get('date').value + ' ' + this.ajoutFormation.get('heurefin').value + ':00');

    this.ajoutFormation.patchValue({enseignant: ens, groupe: grp, heuredebut: hr, heurefin: hf});
    console.log(this.ajoutFormation.value);
    this.formationService.ajoutFormation(this.ajoutFormation.value).subscribe(
      res => {
        this.formation = this.ajoutFormation.value, console.log(this.formation);
        this.toasterService.success('Ajout avec success !!', 'Ajout');
        this.ngAfterViewInit();
      }

      , erreur => {
        this.ngAfterViewInit();
      });

  }

  getAll() {
    this.Events = [];
    this.formationService.allFormation().subscribe((res) => {
      this.formations = res;
      console.log(this.formations);
      this.calendarOptions.events = [];
      for (let f of this.formations) {
        for(let i=0; i<this.groupes.length;i++){
          if(this.groupes[i].nom==f.groupe.nom){
            this.groupeid=i;
            console.log(this.groupeid)
          }
        }
        let start1 = formatDate(f.heuredebut, 'hh:mm', 'en_Us');
        let start2 = formatDate(f.heurefin, 'hh:mm', 'en_Us');
        let day = formatDate(f.date, 'yyyy-MM-dd hh:mm:ss', 'en_Us');
        let daystart = formatDate(f.heuredebut, 'yyyy-MM-dd hh:mm:ss', 'en_Us');

        let event = {
          id: f.id,
          title: f.nom,
          start: daystart.toString(),
          background: '#5bc0de',
          extendedProps: {
            enseignant : f.enseignant.id ,
            groupe: this.groupeid.toString(),
            lien: f.lien,
            date: start1.toString(),
            end: start2.toString()
          }

        };
        this.Events.push(event);
        this.calendarOptions.events = this.Events;


      }
    });
  }

  getallgoupe() {
    this.groupeService.allGroupe().subscribe((res) => {
      this.groupes = res;
    });
  }

  getensgroupe(i) {
    this.testGroupe = this.groupes[i];
    this.groupeService.ensDeGroupe(this.testGroupe.id).subscribe((res) => {
      this.ensGroupr = res;
      console.log(this.ensGroupr)

    });
  }

  afficher(){
    this.modifierens=true;
  }

  modifierfromation(){
    let ensFormaion : any;
    if(this.modifier.get("enseignant").value==''){
      ensFormaion = {id: this.ensid}
    }else {
      ensFormaion = {id: this.ensGroupr[this.enseignant].id};
    }

    let grp = {
      matiere: {
        nommatiere: this.testGroupe.matiere.nommatiere,
        nomniveau: this.testGroupe.matiere.nomniveau
      },
      nom: this.testGroupe.nom
    };

    let hr = new Date(this.modifier.get('date').value + ' ' + this.modifier.get('heuredebut').value + ':00');
    let hf = new Date(this.modifier.get('date').value + ' ' + this.modifier.get('heurefin').value + ':00');

    this.ajoutFormation.patchValue({enseignant: ensFormaion, groupe: grp, heuredebut: hr, heurefin: hf});
    console.log(this.ajoutFormation.value);
    let formationupadet:any={nom:this.titre,lien: this.lien, date:this.dt1, enseignant: ensFormaion, groupe: grp, heuredebut: hr, heurefin: hf}
    this.formationService.modifierformation(formationupadet,this.idFormation).subscribe(
      res => {
        //this.formation = this.modifier.value, console.log(this.formation);
        this.toasterService.success('Modification avec success !!', 'Modification');
        this.displayBasic2=false;
        this.modifier.reset();
        this.testGroupe=new Groupe();
        this.ngAfterViewInit();
      }

      , erreur => {
        this.displayBasic2=false;
        this.modifier.reset();
        this.testGroupe=new Groupe();
        this.modifierens=false;
        this.ngAfterViewInit();

      });


  }


}
