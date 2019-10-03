import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { RxStompState } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEventMessage } from '../interfaces/event-message';
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
    triageNotes = '';
    connectionStatus$: Observable<string>;
    selectedTab: string;
    eventList: Array<Tab>;
    private topicSubscription: Subscription;

    constructor(private rxStompService: RxStompService, private eventListenerService: EventListenerService,
        private httpService: HttpClient) {
        rxStompService.connectionState$.subscribe((state) => {
            // state is an Enum (Integer), RxStompState[state] is the corresponding string
            this.connectionStatus$ = rxStompService.connectionState$.pipe(map((state) => {
                // convert numeric RxStompState to string
                return RxStompState[state];
            }));
            console.log(RxStompState[state]);
        });
    }

    ngOnInit(): void {
        this.topicSubscription = this.rxStompService
            .watch('/topic/EMR.HIQO.TEST', { 'selector': 'chart = \'63a49833-45e5-e911-80c6-0050568210b7\' AND Sender <> \'SAM@ADMIN|PVBMPRL0587|20453913-AFD4-405C-B9EC-DE159A89E6DF\'' })
            // chart = '63a49833-45e5-e911-80c6-0050568210b7' AND Sender <> 'SHARRIS@ADMIN|PVBMPRL0587|20453913-AFD4-405C-B9EC-DE159A89E6DF'
            .subscribe((message: Message) => {
                const eventMessage = JSON.parse(message.body) as IEventMessage;
                this.stompMessages.push(eventMessage);
                if (eventMessage.ChangedData.TriageNotes !== undefined) {
                    this.triageNotes = eventMessage.ChangedData.TriageNotes;
                }
            });
        this.httpService.get('./../../assets/event-data.json')
            .subscribe(
                data => {
                    this.eventList = data as Array<Tab>;
                    this.eventList.forEach(element => {
                        let tab = element as Tab;
                        console.log(tab.tab);
                    });
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
            'ChartPk': '63a49833-45e5-e911-80c6-0050568210b7'
        };
        this.onSendMessage(message);
        console.log(JSON.stringify(message));
    }

    onSendMessage(newEntity: IEventMessage): void {
        //const message = `Message generated at ${new Date}`;
        this.rxStompService.publish({
            destination: '/topic/EMR.HIQO.TEST',
            body: JSON.stringify(newEntity),
            headers: { chart: "63a49833-45e5-e911-80c6-0050568210b7", Sender: "SAM@ADMIN|PVBMPRL0587|20453913-AFD4-405C-B9EC-DE159A89E6DF", ChangedEntity: "ChartEntity" }
        });
    }

    unsubscribe(): void {
        this.topicSubscription.unsubscribe();
    }
}

export class Tab {
    tab: string;
    actions: Array<EventData>;
}

export class EventData {
    summary: string;
    actionType: string;
    changedEntity: string;
    primaryKeys: any;
    changedData: any;
}
