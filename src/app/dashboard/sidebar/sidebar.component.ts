import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  afficherUser = false;
  display: boolean;
  @ViewChild('sidebar') sidebar: SidebarComponent;
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
