import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UtilisateurServiceService} from '../../Services/utilisateur-service.service';
import {Utilisateur} from '../../models/Utilisateur';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '../../models/message';
import {ChannelService} from '../../Services/channel.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  user = new Utilisateur();
  nbr = 0;
  notification = new Message();
  NEW_USER_LIFETIME: number = 1000 * 5;
  message = 0;
  users: Array<Utilisateur> = [];
  highlightedUsers: Array<string> = [];
  newConnectedUsers: Array<string> = [];
  channel: string;
  messages : any[]=[];
  receiver: string;
  receiverUpdated = new EventEmitter<string>();
  constructor(private stompService: RxStompService,
              private loginService: LoginService,
              private channelService:ChannelService,
              private snackBar: MatSnackBar,
              private ToastService: ToastrService,
              private router: Router,
              private userService: UtilisateurServiceService
  ) {

    this.stompService.watch(`/channel/notif/` + loginService.currentUserValue.login).subscribe(res => {
      const data: Message = JSON.parse(res.body)
      this.notification = data;
      this.nbr++

    })
  }

  ngOnInit(): void {
    this.getuserbyid(this.loginService.currentUserValue.id);
    this.userService.getAllUserchat().subscribe(
      (res: Utilisateur[]) => {
        this.users = res;
        this.initUserEvents();
      }
    );
  }

  logout() {
    this.loginService.logout();

    this.ToastService.info(`à la prochaine`);
  }

  getuserbyid(id: number) {
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

  showNotification(message: Message) {
    const snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', { duration: 10000 });
    this.highlightedUsers.push(message.sender);
    snackBarRef.onAction().subscribe(() => {
      this.receiver = message.sender;
      this.receiverUpdated.emit(message.sender);
      this.channel = ChannelService.createChannel(this.user.login, message.sender);
      this.channelService.refreshChannel(this.channel);
    });
  }
}
