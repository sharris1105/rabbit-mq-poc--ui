import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { timer } from 'rxjs/internal/observable/timer';
import * as stomp from 'stompts';
import { IEventMessage } from '../interfaces/event-message';
import { ErrorService } from '../services/error/error.service';
import { EventListenerService } from '../services/event-listener/event-listener.service';
import { StompEventListenerService } from '../services/stomp-event-listener/stomp-event-listener.service';

@Component({
    selector: 'app-rabbit-mq-listener',
    templateUrl: './rabbit-mq-listener.component.html',
    styleUrls: ['./rabbit-mq-listener.component.scss'],
    providers: [EventListenerService]
})
export class RabbitMqListenerComponent implements OnInit {
    messages: Array<IEventMessage> = [];
    // treeControl = new NestedTreeControl<Array<IEventMessage>>(node => node.children);
    dataSource = new MatTreeNestedDataSource<IEventMessage>();
    stompMessages: Array<IEventMessage> = [];
    isSubscribed: boolean;

    frames: Array<stomp.Frame> = [];
    title = 'app';

    constructor(private readonly _eventListenerService: EventListenerService, private messageQueue: StompEventListenerService,
        private readonly errorService: ErrorService) { // api call timer
        timer(0, 10000)
            .subscribe(() => {
                //if (this.isSubscribed) return;
                this.eventListener();
            });
    }

    ngOnInit(): void {
        this.subscribeAsync();                          // stomp subscription
    }

    // tslint:disable-next-line:typedef
    async subscribeAsync() {                          // stomp subscription
        await this.messageQueue
            .subscribe('/exchange/practice.HIQO.clinic.TEST3/chart.bf607f4a-fbde-e911-80c6-0050568210b7.*', this.onMessage.bind(this));
    }

    onMessage(frame: stomp.Frame): void {             // stomp messages
        this.frames.push(frame);
        //let frameString = JSON.stringify(frame.body);
        let thing = JSON.parse(frame.body);
        let other = thing as IEventMessage;
        //console.log(other.changedEntity);
        this.stompMessages.push(other);
    }

    eventListener(): void {
        this.isSubscribed = true;
        this._eventListenerService.getNextMessage()
            .subscribe(result => {
                console.log(JSON.stringify(result));
                this.messages.push(result as IEventMessage);
                this.isSubscribed = false;
            });
    }
}
