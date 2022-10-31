import { Component, OnInit } from '@angular/core';
import {Calendar, CalendarOptions} from '@fullcalendar/angular';
import {DialogService} from 'primeng/dynamicdialog';
import {PrimeNGConfig} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  Events = [{
    title: 'Live Coding - démo',
    start: '2022-03-23 14:00:00',
    end: '2022-03-23 16:00:00'},
    {
      title: 'Live Code',
      start: '2022-03-30 14:00:00',
      end: '2022-03-30 16:00:00'
    }];
  calendarOptions: CalendarOptions;
  hidden = false;
  evenement: FormGroup;
  modifier: FormGroup;
  titre: string;
  dt1: Date;
  calender: Calendar;
  title: string;
  displayBasic: boolean;
  sceance: string;
  displayBasic2: boolean;
  displayPosition: boolean;
  dt: Date;
  position: string;
  display: boolean;
  constructor(private dialog: DialogService,
              private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today',
      },
      themeSystem: 'bootstrap',
      buttonText: {
        today:    'Aujourd\'hui',
        month:    'Mois',
        week:     'Semaine',
        day:      'Jour',
        list:     'Liste'
      },
      locale: 'fr',
      selectable : true,
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick : this.onEventClick.bind(this),
      eventColor: '#5bc0de',
      events: this.Events,
    };
    this.calendarOptions.events = this.Events;
    this.evenement = new FormGroup({
      title : new FormControl ('', [Validators.required]),
      date : new FormControl ('', [Validators.required]),
      start : new FormControl ('', [Validators.required]),
      end: new FormControl ('', [Validators.required]),
    });

    this.modifier = new FormGroup({
      title : new FormControl ('', [Validators.required]),
      date : new FormControl ('', [Validators.required]),
    });
    this.primengConfig.ripple = true;
  }
  onDateClick(res) {
    this.evenement.reset();
    this.displayBasic = true;
    this.dt = res.date;
    console.log(this.dt);
    /*console.log(this.calender.getEvents());*/
  }
  onEventClick(info){
    this.displayBasic2 = true;
    this.titre = info.event.title;
    this.dt1 = info.event.start;
    console.log(info.event);
  }

  processForm(evenement) {
    if (this.evenement.status === 'VALID'){
      this.Events.push(
        {title: this.evenement.value.title, start: this.evenement.value.start, end: this.evenement.value.end}
      );
      this.calendarOptions.events = this.Events ;
    }
    console.log(this.calendarOptions.events);
    console.log(this.Events);
    console.log(evenement);
  }


}
