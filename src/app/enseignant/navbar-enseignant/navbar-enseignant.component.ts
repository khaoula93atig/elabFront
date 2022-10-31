import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {Utilisateur} from '../../models/Utilisateur';
import {ChannelService} from '../../Services/channel.service';
import {Message} from '../../models/message';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RxStompService} from '@stomp/ng2-stompjs';
import {MessageService} from '../../Services/message.service';
@Component({
  selector: 'app-navbar-enseignant',
  templateUrl: './navbar-enseignant.component.html',
  styleUrls: ['./navbar-enseignant.component.css']
})
export class NavbarEnseignantComponent implements OnInit {

  receiver:string;
  user = new Utilisateur();
  message = 0;
  users: Array<Utilisateur> = [];
  highlightedUsers: Array<string> = [];
  newConnectedUsers: Array<string> = [];
  channel: string;
  NEW_USER_LIFETIME: number = 1000 * 5;
  messages:any[]=[];
  constructor(
    private loginService: LoginService,
    private ToastService: ToastrService,
    private router: Router,
    private userService : UtilisateurServiceService,
    private channelService:ChannelService,
    private snackBar: MatSnackBar,
    private stompService: RxStompService,
  ) { }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.userService.getAllUserchat().subscribe(
      (res: Utilisateur[]) => {
        this.users = res;
        this.initUserEvents();
      }
    );
  }
  logout(){
    this.userService.modifierconnect(this.user.id,false).subscribe();
    this.loginService.logout();
    this.ToastService.info(`à la prochaine`);
}

getuserbyid(id: number){
  this.userService.getUserById(id).subscribe(
    user => {
      this.user = user;
      console.log(this.user);
    },
    error => {
      console.log(error);
    }
  );
  }
  initUserEvents() {
    this.stompService.watch('/channel/login').subscribe(res => {
      const data: Utilisateur = JSON.parse(res.body);
      if (data.login !== this.user.login) {
        this.newConnectedUsers.push(data.login);
        setTimeout((
          function () {
            this.removeNewUserBackground(data.login);
          }
        ).bind(this), this.NEW_USER_LIFETIME);
        this.users = this.users.filter(item => item.login !== data.login);
        this.users.push(data);
        this.subscribeToOtherUser(data);
      }
    });

    this.stompService.watch('/channel/logout').subscribe(res => {
      const data: Utilisateur = JSON.parse(res.body);
      this.users = this.users.filter(item => item.login !== data.login);
      this.users.push(data);
      const channelId = ChannelService.createChannel(this.user.login, data.login);
      if (this.channel === channelId) {
        // this.receiverUpdated.emit('');
        this.channelService.removeChannel();
      }
    });

    this.subscribeToOtherUsers(this.users, this.user.login);
  }
  subscribeToOtherUsers(users, username) {
    const filteredUsers: Array<any> = users.filter(user => username !== user.login);
    filteredUsers.forEach(user => this.subscribeToOtherUser(user));
  }
  subscribeToOtherUser(otherUser): string {
    const channelId = ChannelService.createChannel(this.user.login, otherUser.login);
    console.log(channelId)
    this.stompService.watch(`/channel/chat/${channelId}`).subscribe(res => {
      const data: Message = JSON.parse(res.body);
      if (data.channel !== this.channel) {
        this.message++;
        this.messages.push(data);

      }
    });

    return channelId;
  }

  getSender(m){
    this.receiver=m.sender;
  }


}
