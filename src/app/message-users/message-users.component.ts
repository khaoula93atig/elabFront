import {Component, HostListener, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {Utilisateur} from '../models/Utilisateur';
import {UtilisateurServiceService} from '../Services/utilisateur-service.service';
import {ChannelService} from '../Services/channel.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RxStompService} from '@stomp/ng2-stompjs';
import {MessageService} from '../Services/message.service';
import {Message} from '../models/message';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message-users',
  templateUrl: './message-users.component.html',
  styleUrls: ['./message-users.component.css']
})
export class MessageUsersComponent implements OnInit {

  NEW_USER_LIFETIME: number = 1000 * 5;

  @Input()
  username: string;
  sender: string;

  @Output() receiverUpdated = new EventEmitter<string>();

  users: Array<Utilisateur> = [];
  highlightedUsers: Array<string> = [];
  newConnectedUsers: Array<string> = [];
  channel: string;
  receiver: string;
  destinataire=new Utilisateur();
  topicSubscription;

  constructor(private userService: UtilisateurServiceService, private stompService: RxStompService,
              private channelService: ChannelService, private snackBar: MatSnackBar,
              private messageService: MessageService,
              private activatedRoute:ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.sender=params.sender;

      })
    this.userService.getAllUserchat().subscribe(
      (res: Utilisateur[]) => {
        this.users = res.sort((a,b)=>(a.nom>b.nom)?1:-1);
        console.log(this.users);
        this.initUserEvents();
      }
    );

    this.channelService.getChannel().subscribe(channel => this.channel = channel);
    this.startChatWithUser(this.sender);
  }


  @HostListener('window:focus', [])
  sendReadReceipt() {
    if (this.channel != null && this.receiver != null) {
      this.messageService.sendReadReceipt(this.channel, this.receiver);
    }
  }



  startChatWithUser(user) {
    console.log('start' + user.login)
    const channelId = ChannelService.createChannel(this.username, user.login);
    this.channelService.refreshChannel(channelId);
    localStorage.setItem('channel',this.channel)
    this.receiver = user.login;
    this.highlightedUsers = this.highlightedUsers.filter(u => u !== user.login);
    this.receiverUpdated.emit(user.login);
    this.messageService.sendReadReceipt(channelId, user.login);
  }

  getOtherUsers(): Array<Utilisateur> {
    return this.users.filter(user => user.login !== this.username);
  }

  getUserItemClass(user): string {
    let classes: string = 'user-item';
    if (user.login === this.receiver) {
      classes += ' current-chat-user ';
    }

    if (this.highlightedUsers.indexOf(user.login) >= 0) {
      classes += ' new-message';
    }

    if (this.newConnectedUsers.indexOf(user.login) >= 0) {
      classes += ' new-user';
    }

    if (!user.connected) {
      classes += '';
    }

    return classes;
  }

  initUserEvents() {
    this.stompService.watch('/channel/login').subscribe(res => {
      const data: Utilisateur = JSON.parse(res.body);
      if (data.login !== this.username) {
        this.newConnectedUsers.push(data.login);
        setTimeout((
          function () {
            this.removeNewUserBackground(data.login);
          }
        ).bind(this), this.NEW_USER_LIFETIME);
        this.users = this.users.filter(item =>  item.login !== data.login);
        this.users.push(data);
        this.subscribeToOtherUser(data);
      }
    });

    this.stompService.watch('/channel/logout').subscribe(res => {
      const data: Utilisateur = JSON.parse(res.body);
      this.users = this.users.filter(item => item.login !== data.login);
      this.users.push(data);
      const channelId = ChannelService.createChannel(this.username, data.login);
      if (this.channel === channelId) {
        this.receiverUpdated.emit('');
        this.channelService.removeChannel();
      }
    });

    this.subscribeToOtherUsers(this.users, this.username);
  }

  removeNewUserBackground(username) {
    this.newConnectedUsers = this.newConnectedUsers.filter(u => u !== username);
  }

  subscribeToOtherUsers(users, username) {
    const filteredUsers: Array<any> = users.filter(user => username !== user.login);
    filteredUsers.forEach(user => this.subscribeToOtherUser(user));
  }

  subscribeToOtherUser(otherUser): string {
    const channelId = ChannelService.createChannel(this.username, otherUser.login);
    this.stompService.watch(`/channel/chat/${channelId}`).subscribe(res => {
      const data: Message = JSON.parse(res.body);
      this.messageService.pushMessage(data);

      if (data.channel !== this.channel) {
        this.showNotification(data);
      } else {
        // send read receipt for the channel
        this.messageService.sendReadReceipt(this.channel, otherUser.login);
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
      this.channel = ChannelService.createChannel(this.username, message.sender);
      this.channelService.refreshChannel(this.channel);
    });
  }

}
