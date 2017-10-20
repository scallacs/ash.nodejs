export interface AlexaEndpoint{
    scope: {
        type: string;
        token: string;
    };
    endpointId: string;
}

export interface AlexaDirective{
    header: {
        namespace: string;
        name: string;
        payloadVersion: string;
        messageId: string;
    };
    endpoint?: AlexaEndpoint;
    payload: any;
}

export interface AlexaRequest{
    directive: AlexaDirective
}