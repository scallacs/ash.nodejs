import { Alexa } from "./alexa/definitions";
import { MessageIdGeneratorInterface } from "./message-id-generator-interface";

export class AlexaResponseBuilder {
    _inputDirective: Alexa.Request.Directive;
    _response!: Alexa.Response.Response;
    _messageIdGenerator: MessageIdGeneratorInterface;

    constructor(directive: any, messageIdGenerator?: MessageIdGeneratorInterface) {
        this._inputDirective = directive;
        if (!messageIdGenerator) {
            messageIdGenerator = {
                generate: () => {
                    return new Date().getTime().toString() + '-' + Math.floor(Math.random() * 10000000000);
                }
            }
        }
        this._messageIdGenerator = messageIdGenerator;
    }

    success() {
        this._response = this._fromDirective(this._inputDirective);
        // Auto smart response
        // Deduce response when it's simple action
        // TODO extra from here
        switch (this._inputDirective.header.namespace) {
            case 'Alexa.PowerController':
                switch (this._inputDirective.header.name) {
                    case 'TurnOn':
                        this.addProperty('powerState', 'ON');
                        break;
                    case 'TurnOff':
                        this.addProperty('powerState', 'OFF');
                        break;
                }
                break;
            case 'Alexa.PowerLevelController':
                switch (this._inputDirective.header.name) {
                    case 'SetPowerLevel':
                        this.addProperty('powerLevel', this._inputDirective.payload.powerLevel);
                        break;
                    case 'AdjustPowerLevel':
                        // This is a delta so it cannot be set automatically
                        break;
                }
                break;
            case 'Alexa.BrightnessController':
                switch (this._inputDirective.header.name) {
                    case 'SetBrightness':
                        this.addProperty('brightness', this._inputDirective.payload.brightness);
                        break;
                    case 'AdjustBrightness':
                        // This is a delta so it cannot be set automatically
                        break;
                }
                break;
            case 'Alexa.ColorController':
                switch (this._inputDirective.header.name) {
                    case 'SetColor':
                        this.addProperty('color', this._inputDirective.payload.color);
                        break;
                }
                break;
            case 'Alexa.LockController':
                switch (this._inputDirective.header.name) {
                    case 'Lock':
                        this.addProperty('lockState', 'LOCKED');
                        break;
                    case 'Unlock':
                        this.addProperty('lockState', 'UNLOCKED');
                        break;
                }
                break;
        }

        return this;
    }

    error(type: Alexa.Response.ErrorTypes, message: string, extra?: Object) {
        this._response = this._fromDirective(this._inputDirective);
        this._response.event.header.namespace = 'Alexa';
        this._response.event.header.name = 'ErrorResponse';

        this._response.event.payload = {
            type: type,
            message: message,
        };
        if (extra) {
            this._response.event.payload = Object.assign(this._response.event.payload, extra);
        }
        return this;
    }

    raw(){
        return this._response;
    }

    build(): Alexa.Response.Response {
        return this._response;
    }

    addProperty(name: string, value: string, uncertaintyInMilliseconds?: number) {
        this._response.context.properties.push({
            name: name,
            namespace: this._inputDirective.header.namespace,
            timeOfSample: new Date().toString(),
            value: value,
            uncertaintyInMilliseconds: uncertaintyInMilliseconds || 0
        });
        return this;
    }

    payload(payload: any): this {
        this._response.event.payload = payload;
        return this;
    }

    _fromDirective(directive: Alexa.Request.Directive): Alexa.Response.Response {
        let result: Alexa.Response.Response = {
            context: {
                properties: []
            },
            event: {
                header: {
                    namespace: 'Alexa',
                    name: 'Response',
                    payloadVersion: directive.header.payloadVersion,
                    messageId: this._messageIdGenerator.generate(),
                    correlationToken: directive.header.correlationToken
                },
                payload: {}
            }
        }
        if (directive.endpoint) {
            result.event.endpoint = {
                endpointId: directive.endpoint.endpointId,
            };
        }
        return result;
    }

}