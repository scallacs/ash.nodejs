import { ControllerInterface } from "./controller-interface";
import { EventEmitter } from 'events';
import { AlexaResponseBuilder } from "./alexa-response-builder";
import { AlexaResponse } from "./alexa-response";
import { AlexaRequest } from "./alexa-request";

export class Ash {
    _routes: {
        filter: (request: AlexaRequest) => boolean,
        action: ControllerInterface
    }[];
    _emitter: EventEmitter;
    _devices: any[];

    constructor() {
        this._devices = [];
        this._emitter = new EventEmitter();
        this._routes = [];
    }

    isDeviceOnline(arg0: any, arg1: any): any {
        return true;
    }

    // validateToken(request: AlexaRequest, userAccessToken: string): any {
    //     if (!userAccessToken || !this.isValidToken(userAccessToken)) {
    //         this.log('ERROR', `Discovery Request [${request.header.messageId}] failed. Invalid access token: ${userAccessToken}`);
    //         throw new Error('Invalid token');
    //         // return;
    //     }
    // }

    log(...args: any[]) {
        console.log(...args);
    }
    // Handle discovery
    route(namespace: string | null, name: string | null, controllerOrFunction: ControllerInterface | ((request: AlexaRequest, response: AlexaResponseBuilder) => Promise<any>)) {
        let controller: ControllerInterface;
        if (typeof controllerOrFunction === 'function') {
            controller = {
                handle: controllerOrFunction
            };
        }
        else {
            controller = controllerOrFunction;
        }
        this._routes.push({
            filter: (request: AlexaRequest) => {
                if (namespace !== null && request.directive.header.namespace !== namespace) {
                    return false;
                }
                if (name !== null && request.directive.header.name !== name) {
                    return false;
                }
                return true;
            },
            action: controller
        });
        return this;
    }

    /**
     * 
     * @param controller 
     */
    registerController(controller: ControllerInterface) {
        this._routes.push({
            filter: () => true,
            action: controller
        });
        return this;
    }

    isValidToken(token: string): any {
        return true;
    }

    getDevices() {
        return this._devices;
    }

    registerDevices(devices: any[]) {
        this._devices = devices;
        return this;
    }

    onDiscovery(request: AlexaRequest): Promise<AlexaResponse> {
        /**
         * This function is invoked when we receive a "Discovery" message from Alexa Smart Home Skill.
         * We are expected to respond back with a list of appliances that we have discovered for a given customer.
         *
         * @param {Object} request - The full request object from the Alexa smart home service. This represents a DiscoverAppliancesRequest.
         *     https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesrequest
         *
         * @param {function} callback - The callback object on which to succeed or fail the response.
         *     https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
         *     If successful, return <DiscoverAppliancesResponse>.
         *     https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesresponse
         */
        this.log('DEBUG', `Discovery Request: ${JSON.stringify(request)}`);

        let directive = request.directive;
        /**
         * Get the OAuth token from the request.
         */

        /**
         * Generic stub for validating the token against your cloud service.
         * Replace isValidToken() function with your own validation.
         * 
         * TODO add helper for access control token
         */
        // const userAccessToken = directive.payload && directive.payload.accessToken ? directive.payload.accessToken.trim() : null;
        // if (!userAccessToken || !this.isValidToken(userAccessToken)) {
        //     const errorMessage = `Discovery Request [${directive.header.messageId}] failed. Invalid access token: ${userAccessToken}`;
        //     this.log('ERROR', errorMessage);
        //     this.terminate(directive, new Error(errorMessage));
        //     return;
        // }

        /**
         * Assume access token is valid at this point.
         * Retrieve list of devices from cloud based on token.
         *
         * For more information on a discovery response see
         *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesresponse
         */
        let responseBuilder = new AlexaResponseBuilder(request);
        responseBuilder.setDiscoveryDevices(this.getDevices());
        const response = responseBuilder.build();

        /**
         * Log the response. These messages will be stored in CloudWatch.
         */
        this.log('DEBUG', `Discovery Response: ${JSON.stringify(response)}`);

        /**
         * Return result with successful message.
         */
        this._emitter.emit('response', response);
        return Promise.resolve(response);
    }

    onControl(request: AlexaRequest): Promise<AlexaResponse> {
        this.log('DEBUG', `Control Request: ${JSON.stringify(request)}`);

        let directive = request.directive;
        /**
         * Get the access token.
         */
        // const userAccessToken = request.payload.accessToken.trim();

        /**
         * Generic stub for validating the token against your cloud service.
         * Replace isValidToken() function with your own validation.
         *
         * If the token is invliad, return InvalidAccessTokenError
         *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#invalidaccesstokenerror
         */
        // this.validateToken(request, userAccessToken);

        /**
         * Grab the endpointId from the request.
         */
        // const endpointId = directive.endpoint.endpointId;

        // /**
        //  * If the endpointId is missing, return UnexpectedInformationReceivedError
        //  *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#unexpectedinformationreceivederror
        //  */
        // if (!endpointId) {
        //     this.log('ERROR', 'No endpointId provided in directive');
        //     const payload = { faultingParameter: `endpointId: ${endpointId}` };
        //     throw new Error('NoApplianceId');
        // }

        /**
         * At this point the endpointId and accessToken are present in the directive.
         *
         * Please review the full list of errors in the link below for different states that can be reported.
         * If these apply to your device/cloud infrastructure, please add the checks and respond with
         * accurate error messages. This will give the user the best experience and help diagnose issues with
         * their devices, accounts, and environment
         *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#error-messages
         */
        // if (!this.isDeviceOnline(endpointId, userAccessToken)) {
        //     this.log('ERROR', `Device offline: ${endpointId}`);
        //     this.terminate(request, 'TargetOffline');
        //     return;
        // }

        let promises = [];

        let responseBuilder = new AlexaResponseBuilder(directive);

        for (let route of this._routes) {
            if (route.filter(request)) {
                this.log('Matching route: ', route);
                promises.push(route.action.handle(request, responseBuilder));
            }
        }
        this.log('Found ' + promises.length + ' route for this action');

        return Promise.all(promises)
            .then((result: any) => {
                const response = responseBuilder.build();
                this._emitter.emit('response', response);
                return response;
            });
    }

    // onQuery(request: AlexaRequest): any {
    //     throw new Error("Method not implemented.");
    // }

    // onUnsupportedNamespace(request: AlexaRequest): any {
    //     const errorMessage = `No supported namespace: ${request.directive.header.namespace}`;
    //     this.log('ERROR', errorMessage);
    //     this.terminate(request, new Error(errorMessage));
    // }

    handle(request: AlexaRequest): Promise<AlexaResponse> {
        if (!request.directive) {
            throw new Error('Missing key "directive" in request"');
        }
        let directive = request.directive;
        if (!directive.header) {
            throw new Error('Missing key "header" in request"');
        }
        let header = directive.header;

        let payloadVersion = header.payloadVersion;

        if (payloadVersion !== '3') {
            throw new Error('Unsupported payload version: ' + payloadVersion);
        }

        // V3
        console.log('Request: ', request);
        switch (directive.header.namespace) {
            /**
             * The namespace of 'Alexa.ConnectedHome.Discovery' indicates a directive is being made to the Lambda for
             * discovering all appliances associated with the customer's appliance cloud account.
             *
             * For more information on device discovery, please see
             *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discovery-messages
             */
            case 'Alexa.ConnectedHome.Discovery':
            case 'Alexa.Discovery':
                return this.onDiscovery(request);
            default:
                return this.onControl(request);
            // /**
            //  * The namespace of "Alexa.ConnectedHome.Control" indicates a request is being made to control devices such as
            //  * a dimmable or non-dimmable bulb. The full list of Control events sent to your lambda are described below.
            //  *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#payload
            //  */
            // case 'Alexa.ConnectedHome.Control':
            //     return this.onControl(request);

            // /**
            //  * The namespace of "Alexa.ConnectedHome.Query" indicates a request is being made to query devices about
            //  * information like temperature or lock state. The full list of Query events sent to your lambda are described below.
            //  *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#payload
            //  *
            //  * TODO: In this sample, query handling is not implemented. Implement it to retrieve temperature or lock state.
            //  */
            // case 'Alexa.ConnectedHome.Query':
            //     return this.onQuery(request);

            // /**
            //  * Received an unexpected message
            //  */
            // default: {
            //     return this.onUnsupportedNamespace(request);
            // }
        }
    }


    on(eventType: string, listener: (event: any) => any) {
        this._emitter.on(eventType, listener);
        return this;
    }
}