import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-enseignant',
  templateUrl: './sidebar-enseignant.component.html',
  styleUrls: ['./sidebar-enseignant.component.css']
})
export class SidebarEnseignantComponent implements OnInit {

  afficherUser = false;
  display: boolean;
  @ViewChild('sidebar-enseignant') sidebar: SidebarEnseignantComponent;

  constructor() { }

  ngOnInit(): void {
  }

  affichageUser() {
    this.afficherUser = !this.afficherUser;
  }
  onclick(){
    console.log('Sidebar Opened');
  }

}