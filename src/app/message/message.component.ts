import {AfterViewInit, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';

import {ChannelService} from '../Services/channel.service';
import {Message} from '../models/message';
import {MessageService} from '../Services/message.service';
import {UtilisateurServiceService} from '../Services/utilisateur-service.service';
import {Utilisateur} from '../models/Utilisateur';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,AfterViewInit {


 filteredMessages: Array<Message> = [];
newMessage: string;
 channel: string;

  @Input() names:any;
  username:string
  destinataire: Utilisateur;
  reciever: any;

  constructor(private stompService: RxStompService,
              private userService:UtilisateurServiceService,
              private messageService: MessageService,
              private channelService: ChannelService) { }

  ngOnInit() {
    this.username=this.names[0]
    this.reciever=this.names[1]
    console.log(this.names)
    this.channelService.getChannel().subscribe(channel => {
      this.channel = channel;
      this.messageService.getMessage(this.channel).subscribe( data=> {
          this.filteredMessages = data.content
        }

      )

      this.filterMessages();
    });

    this.messageService.getMessages().subscribe(messages => {
      this.filterMessages();
    });
  }

ngOnchange(change:SimpleChanges){
    this.ngOnInit()
  this.ngAfterViewInit()
}
  sendMessage() {
    if (this.newMessage) {
      this.stompService.publish({
        destination: '/app/messages', body:
          JSON.stringify({
            'channel': this.channel,
            'sender': this.names[0],
            'content': this.newMessage
          })
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  filterMessages() {
    this.filteredMessages = this.messageService.filterMessages(this.channel);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const msgContainer = document.getElementById('msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  ngAfterViewInit(): void {
    this.username=this.names[0]
    this.reciever=this.names[1]
    console.log(this.username,this.reciever)
  }
  getLabel(list:string[],m:Message){
    if(m.sender===list[0])
      return 'vous'
    else return list[1]

  }
}
