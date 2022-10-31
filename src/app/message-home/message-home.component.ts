import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {TokenService} from '../Services/token.service';
import {LoginService} from '../login/login.service';
import {UtilisateurServiceService} from '../Services/utilisateur-service.service';
import {Utilisateur} from '../models/Utilisateur';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.css']
})
export class MessageHomeComponent implements OnInit {
   receiver: string;
  username: string;
  id : number;
  user=new Utilisateur();
  destinataire=new Utilisateur();
names=[]
  constructor( private loginService:LoginService,
    private router: Router
    , private stompService: RxStompService,
               private userService : UtilisateurServiceService) {
  }
  getReciever(login){
    this.userService.getuserByLogin(login).subscribe(res=>{this.destinataire=res;
      this.names=[]
      this.names.push(this.username)
      this.names.push(this.destinataire.prenom)});
  }
  ngOnInit() {
    this.id=this.loginService.currentUserValue.id;
    this.userService.getUserById(this.id).subscribe(res=>this.user=res)

    this.username = this.loginService.currentUserValue.login;
    if (this.username == null || this.username === '') {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:unload', ['$event'])
  onUnload() {

  }

  onReceiverChange(event) {
    this.receiver = event;
    this.getReciever(this.receiver);

    console.log(this.names)
  }


  back()
  {
    window.history.back();
  }





  clearSession() {
    sessionStorage.removeItem('user');
    this.stompService.deactivate();
    this.username = null;
    this.router.navigate(['/']);
  }

}
