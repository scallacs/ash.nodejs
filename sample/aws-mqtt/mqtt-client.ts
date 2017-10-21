// import * as EventEmitter from 'events';
import { EventEmitter } from "events";
import { Alexa } from "../../lib/alexa/definitions";

export interface MqttClientConfigType {
    topic: {
        in: string;
        out: string;
    }
}

export class MqttClientHelper {

    device: any;
    config: MqttClientConfigType;
    eventEmitter: EventEmitter;

    /**
     * 
     */
    constructor(smarthomeDevice: Alexa.Device, device: any, config: MqttClientConfigType) {
        this.device = device;
        this.config = config;
        this.eventEmitter = new EventEmitter();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.device
                .on('connect', () => {
                    console.log('connect');
                    this.eventEmitter.emit('connected');
                    resolve();
                });
            this.device.on('error', (err: any) => {
                reject(err);
            });
        });
    }

    on(eventName: string, callback: (...args: any[]) => any) {
        this.eventEmitter.on(eventName, callback);
        return this;
    }

    close() {
        this.eventEmitter.emit('closed');
        this.device.end();
    }

    listen() {
        console.log('Start listening on topic: ', this.config.topic.out);
        this.device.subscribe(this.config.topic.out + '/#', undefined, (error: any, result: any) => { });

        this.device.on('message', (topic: string, message: any) => {
            switch (topic) {
                case this.config.topic.out + '/close':
                    console.log('Message: ', message);
                    this.close();
            }
        });
    }

    publish(message: any) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        let topic = this.config.topic.in;
        let result = this.device.publish(topic, message);
        console.log('Publishing on ', topic, ' data: ', message, ' Result: ', result);
        return result;
    }

}