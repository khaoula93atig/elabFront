import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import {Message} from '../models/message';
import {CONFIG} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

    private messages: Array<Message> = [];
    private msgs = new Subject<Array<Message>>();

    constructor(private http: HttpClient) { }

    pushMessage(message: Message) {
        this.messages.push(message);
        this.msgs.next(this.messages);
    }

    filterMessages(channel: string): Array<Message> {
        return this.messages.filter(message => channel === message.channel)
            .sort((m1, m2) => {
                if (m1.timestamp > m2.timestamp) {
                    return 1;
                }

                return -1;
            });
    }

    sendReadReceipt(channelId: string, username: string) {
        this.http.post(CONFIG.URL + 'messages/', {
            channel: channelId,
            username: username
        });
    }
getMessage(channelId: string):Observable<any>{
  return this.http.get(CONFIG.URL + 'messages/' + channelId);
}
    getMessages(): Observable<any> {
        return this.msgs.asObservable();
    }


}
