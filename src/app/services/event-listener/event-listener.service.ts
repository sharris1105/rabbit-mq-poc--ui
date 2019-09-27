import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";
import { IEventMessage } from '../../interfaces/event-message';

const CHAT_URL = 'http://localhost:4201/api/EventMessageQueue/LatestEventMessage';
const subject = webSocket(CHAT_URL);

@Injectable()
export class EventListenerService {

    messages = new Array<string>();

    constructor(private http: HttpClient) { }

    getNextMessage(): Observable<IEventMessage> {
        let eventMessage = this.http.get<IEventMessage>(CHAT_URL);
        return eventMessage;
    }
}
