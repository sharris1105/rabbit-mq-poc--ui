import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const rxStompConfig: InjectableRxStompConfig = {
    // Which server?
    //Amazon MQ
    brokerURL: 'wss://b-08d97027-7165-43fa-9508-8b541422ce4a-1.mq.us-east-2.amazonaws.com:61619/wss',

    // Headers
    // Typical keys: login, passcode, host
    connectHeaders: {
        //Amazon MQ
        login: 'experity-emr',
        passcode: 'ExperityDevPw1!'
    },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 20000, // Typical value 0 - disabled
    heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnectDelay: 500,

    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    debug: (msg: string): void => {
        console.log(new Date(), msg);
    }
};
