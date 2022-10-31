import {Component, HostListener, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  receiver: string;
  username: string;

  constructor( private loginService:LoginService,
               private router: Router
    , private stompService: RxStompService) {
  }

  @HostListener('window:unload', ['$event'])
  onUnload() {

  }

  onReceiverChange(event) {
    this.receiver = event;
  }
}
