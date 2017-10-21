import { ControllerInterface } from "./controller-interface";
import { EventEmitter } from 'events';
import { AlexaResponseBuilder } from "./alexa-response-builder";
import { Alexa } from "./alexa/definitions";
import { DeviceRegistry } from "./definitions";
import { InMemoryDeviceRegistry } from "./device-registry/in-memory-device-registry";

type ControllerType = ControllerInterface | ((request: Alexa.Request.Request, response: AlexaResponseBuilder) => Promise<any>);


export class Ash {
    _routes: {
        filter: (request: Alexa.Request.Request) => boolean,
        action: ControllerInterface
    }[];
    _emitter: EventEmitter;
    _logger: any;

    public get deviceRegistry() {
        return this._deviceRegistry;
    };

    constructor(private _deviceRegistry: DeviceRegistry = new InMemoryDeviceRegistry([])) {
        this._emitter = new EventEmitter();
        this._routes = [];
        this._logger = console;
    }


    public static createFromDeviceList(devices: Alexa.Device[]) {
        return new Ash(new InMemoryDeviceRegistry(devices));
    }
    // validateToken(request: Alexa.Response.Response, userAccessToken: string): any {
    //     if (!userAccessToken || !this.isValidToken(userAccessToken)) {
    //         this.log('ERROR', `Discovery Request [${request.header.messageId}] failed. Invalid access token: ${userAccessToken}`);
    //         throw new Error('Invalid token');
    //         // return;
    //     }
    // }

    log(...args: any[]) {
        console.log(...args);
    }

    /**
     * 
     * @param namespace https://developer.amazon.com/docs/device-apis/alexa-interface.html
     * @param name 
     * @param controllerOrFunction 
     */
    interface(namespace: Alexa.Capability.NamespaceType | string, name: string, controllerOrFunction: ControllerType) {
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
            filter: (request: Alexa.Request.Request) => {
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

    namespace(namespace: Alexa.Capability.NamespaceType | string, controllerOrFunction: ControllerType) {
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
            filter: (request: Alexa.Request.Request) => {
                if (namespace !== null && request.directive.header.namespace !== namespace) {
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


    // onDiscovery(request: Alexa.Request.Request): Promise<Alexa.Response.Response> {
    //     /**
    //      * This function is invoked when we receive a "Discovery" message from Alexa Smart Home Skill.
    //      * We are expected to respond back with a list of appliances that we have discovered for a given customer.
    //      *
    //      * @param {Object} request - The full request object from the Alexa smart home service. This represents a DiscoverAppliancesRequest.
    //      *     https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesrequest
    //      *
    //      * @param {function} callback - The callback object on which to succeed or fail the response.
    //      *     https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
    //      *     If successful, return <DiscoverAppliancesResponse>.
    //      *     https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesresponse
    //      */
    //     this.log('DEBUG', `Discovery Request: ${JSON.stringify(request)}`);

    //     let directive = request.directive;
    //     /**
    //      * Get the OAuth token from the request.
    //      */

    //     /**
    //      * Generic stub for validating the token against your cloud service.
    //      * Replace isValidToken() function with your own validation.
    //      * 
    //      * TODO add helper for access control token
    //      */
    //     // const userAccessToken = directive.payload && directive.payload.accessToken ? directive.payload.accessToken.trim() : null;
    //     // if (!userAccessToken || !this.isValidToken(userAccessToken)) {
    //     //     const errorMessage = `Discovery Request [${directive.header.messageId}] failed. Invalid access token: ${userAccessToken}`;
    //     //     this.log('ERROR', errorMessage);
    //     //     this.terminate(directive, new Error(errorMessage));
    //     //     return;
    //     // }

    //     /**
    //      * Assume access token is valid at this point.
    //      * Retrieve list of devices from cloud based on token.
    //      *
    //      * For more information on a discovery response see
    //      *  https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#discoverappliancesresponse
    //      */
    //     let responseBuilder = new AlexaResponseBuilder(request);
    //     responseBuilder.setDiscoveryDevices(this.getDevices());
    //     const response = responseBuilder.build();

    //     /**
    //      * Log the response. These messages will be stored in CloudWatch.
    //      */
    //     this.log('DEBUG', `Discovery Response: ${JSON.stringify(response)}`);

    //     /**
    //      * Return result with successful message.
    //      */
    //     this._emitter.emit('response', response);
    //     return Promise.resolve(response);
    // }

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

    onControl(request: Alexa.Request.Request): Promise<Alexa.Response.Response> {
        this.log('DEBUG', `Control Request: ${JSON.stringify(request)}`);

        let directive = request.directive;
        let promises = [];

        let responseBuilder = new AlexaResponseBuilder(directive);

        for (let route of this._routes) {
            if (route.filter(request)) {
                this.log('Matching route: ', route);
                let handler = route.action.handle(request, responseBuilder, this);
                promises.push(handler);
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

    handle(request: Alexa.Request.Request): Promise<Alexa.Response.Response> {
        try {
            // TODO validate request (with json validator)
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
            console.log('Request: ', request);
            return this.onControl(request)
                .catch((err: any) => {
                    return this.errorHandler(request, err);
                });
        }
        catch (err) {
            return this.errorHandler(request, err);
        }
    }

    errorHandler(request: Alexa.Request.Request, err: any) {
        let response = new AlexaResponseBuilder(request.directive)
            .error(Alexa.Response.ErrorTypes.INTERNAL_ERROR, err.toString());
        return Promise.resolve(response.build());
    }


    on(eventType: string, listener: (event: any) => any) {
        this._emitter.on(eventType, listener);
        return this;
    }
}