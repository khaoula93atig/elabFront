import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-eleve',
  templateUrl: './sidebar-eleve.component.html',
  styleUrls: ['./sidebar-eleve.component.css']
})
export class SidebarEleveComponent implements OnInit {

  afficherUser = false;
  display: boolean;
  @ViewChild('sidebar-eleve') sidebar: SidebarEleveComponent;

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
