import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription, timer } from 'rxjs';
import { IEventMessage } from '../interfaces/event-message';
import { ErrorService } from '../services/error/error.service';
import { EventListenerService } from '../services/event-listener/event-listener.service';

@Component({
    selector: 'app-rabbit-mq-listener',
    templateUrl: './rabbit-mq-listener.component.html',
    styleUrls: ['./rabbit-mq-listener.component.scss'],
    providers: [EventListenerService]
})
export class RabbitMqListenerComponent implements OnInit, OnDestroy {

    messages: Array<IEventMessage> = [];
    stompMessages: Array<IEventMessage> = [];
    isSubscribed: boolean;
    receivedMessages: Array<string> = [];
    triageNotes: string;
    private topicSubscription: Subscription;

    constructor(private rxStompService: RxStompService, private readonly errorService: ErrorService, private eventListenerService: EventListenerService) { // api call timer
        timer(0, 10000)
            .subscribe(() => {
                //this.eventListener();
            });
    }

    ngOnInit(): void {
        this.topicSubscription = this.rxStompService
            .watch('/exchange/practice.HIQO.clinic.TEST3/chart.bf607f4a-fbde-e911-80c6-0050568210b7.*', { 'x-queue-name': 'myqueue' })
            .subscribe((message: Message) => {
                const eventMessage = JSON.parse(message.body) as IEventMessage;
                this.stompMessages.push(eventMessage);
                console.log(JSON.stringify(message.body));
                if (eventMessage.ChangedData.TriageNotes !== undefined) {
                    this.triageNotes = eventMessage.ChangedData.TriageNotes;
                }
            });
    }

    ngOnDestroy(): void {
        this.topicSubscription.unsubscribe();
    }

    eventListener(): void {
        this.isSubscribed = true;
        this.eventListenerService.getNextMessage()
            .subscribe(result => {
                console.log(JSON.stringify(result));
                this.messages.push(result as IEventMessage);
            });
    }

    onTriageNoteChange(newNote: string): void {
        if (this.triageNotes !== newNote) {
            this.triageNotes = newNote;
            this.updateEntity(newNote);
        }
    }

    updateEntity(newNote: string): void {
        // tslint:disable-next-line:one-variable-per-declaration
        const message = new IEventMessage()
        message.Sender = "MBURKE@ADMIN|PVBMPRL0587|20453913-AFD4-405C-B9EC-DE159A89E6DF";
        message.ActionType = "Update";
        message.ChangedEntity = "ChartEntity";
        message.ChangedData = { "TriageNotes": this.triageNotes };
        message.ChangedOn = JSON.stringify(Date);
        message.Environment = "DevTest";
        message.PrimaryKeys = {
            'ChartPk': 'bf607f4a-fbde-e911-80c6-0050568210b7'
        };
        this.onSendMessage(message);
    }

    onSendMessage(newEntity: IEventMessage): void {
        //const message = `Message generated at ${new Date}`;
        this.rxStompService.publish({
            destination: '/exchange/practice.HIQO.clinic.TEST3/chart.bf607f4a-fbde-e911-80c6-0050568210b7.*',
            body: JSON.stringify(newEntity)
        });
    }
}
