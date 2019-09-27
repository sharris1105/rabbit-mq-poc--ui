import { Injectable } from '@angular/core';
import * as stomp from 'stompts';

@Injectable({
    providedIn: 'root'
})
export class StompEventListenerService {
    client: stomp.Client;
    get isConnected(): boolean {
        return !this._onConnect;
    }

    private _onConnect?: Array<() => any>;

    constructor() {
        this._onConnect = [];

        this.client = new stomp.Client('ws://localhost:15674/ws');
        this.client.connect({
            login: 'guest',
            passcode: 'guest',
            host: '/'
        }, () => {
            console.log(`connected, nListeners: ${this._onConnect.length}`);
            const listeners = this._onConnect;
            this._onConnect = undefined;
            listeners.forEach(callback => callback());
        });
    }

    async subscribe(topic: string, callback: (frame: stomp.Frame) => any): Promise<stomp.ISubscription> {
        if (!this.isConnected) {
            await this.onConnect();
        }

        return this._subscribe(topic, callback);
    }

    onConnect(): Promise<boolean> {
        return new Promise<boolean>(
            (
                (success, reject) => {
                    if (this.isConnected) {
                        success(true);
                    } else {
                        this._onConnect.push(() => success ? success(true) : reject('failed to connect'));
                    }
                }
            )
        );
    }

    private _subscribe(topic: string, callback: (frame: stomp.Frame) => any): stomp.ISubscription {
        if (!this.isConnected) {
            throw new Error('not connected');
        }

        return this.client.subscribe(topic, callback);
    }
}
