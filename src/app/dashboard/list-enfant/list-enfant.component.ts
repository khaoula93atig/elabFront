import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-enfant',
  templateUrl: './list-enfant.component.html',
  styleUrls: ['./list-enfant.component.css']
})
export class ListEnfantComponent implements OnInit {

  constructor() { }
  cars = [{
    id: 'khaoula atig',
    year: '1ere arabe ',
    color: 'red'},
    {
      id: 'sourour askri ',
      year: '2eme anglais',
      color: 'red'
    }];
  selectedCars: [];

  ngOnInit(): void {

  }

}
