export interface EventHeaderType{
    namespace: string;
    name: string;
    payloadVersion: string;
    messageId: string;
    correlationToken: string;
}

export interface PropertyType{
    namespace: string;
    name: string;
    value: any;
    timeOfSample: string;
    uncertaintyInMilliseconds: number;
}

export interface ResponseContext{
    properties: PropertyType[];
}

export interface EventType{
    header: EventHeaderType;
    endpoint: {
        scope?: {
            type: string;
            token: string
        },
        endpointId: string;
    };
    payload: any;
}

export interface AlexaResponse {
    context: ResponseContext;
    event: EventType;
}