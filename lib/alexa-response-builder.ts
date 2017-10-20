import { AlexaResponse } from "./alexa-response";

export class AlexaResponseBuilder {
    _directive: any;
    _response: AlexaResponse;

    constructor(directive: any){
        this._directive = directive;
        this._response = AlexaResponseBuilder.fromDirective(directive);
    }

    build(): AlexaResponse{
        return this._response;
    }

    addProperty(name: string, value: string, uncertaintyInMilliseconds?: number){
        this._response.context.properties.push({
            name: name, 
            namespace: this._directive.header.namespace,
            timeOfSample: new Date().toString(),
            value: value,
            uncertaintyInMilliseconds: uncertaintyInMilliseconds || 0
        });
        return this;
    }

    setDiscoveryDevices(devices: any): this {
        this._response.event.payload = {
            endpoints: devices
        };
        return this;
    }

    static fromDirective(directive: any): AlexaResponse{
        return {
            context: {
                properties: []
            },
            event: {
                header: {
                    namespace: 'Alexa', 
                    name: 'Response',
                    payloadVersion: directive.header.payloadVersion,
                    messageId: "5f8a426e-01e4-4cc9-8b79-65f8bd0fd8a4", // TODO
                    correlationToken: directive.header.correlationToken
                },
                payload: {},
                endpoint: {
                    endpointId: directive.endpoint.endpointId,
                }
            }
        }
    }
    
}