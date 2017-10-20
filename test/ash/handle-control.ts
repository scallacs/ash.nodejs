


import { Ash } from "../../lib/ash";
import { AlexaResponseBuilder } from "../../lib/alexa-response-builder";
import { AlexaResponse } from "../../lib/alexa-response";
import { AlexaRequest } from "../../lib/alexa-request";
import { LambdaRequestAdapter } from "../../lib/request-adapter/ash-lambda-adapter";

describe('Handling Control', () => {
    let ash: Ash;

    before(() => {
        ash = new Ash();
        ash
            .route('Alexa.PowerController', 'TurnOn', (request: AlexaRequest, response: AlexaResponseBuilder) => {
                console.log('Alexa.PowerController.TurnOn CALLBACK');
                if (!request.directive.endpoint){
                    throw new Error('No enpoint in request...');
                }
                // Do stuff...
                response.addProperty('powerState', 'On');
                return Promise.resolve();
            })
            .route('Alexa.PowerController', 'TurnOff', (request: AlexaRequest, response: AlexaResponseBuilder) => {
                console.log('Alexa.PowerController.TurnOff CALLBACK');
                // Do stuff
                if (!request.directive.endpoint){
                    throw new Error('No enpoint in request...');
                }
                response.addProperty('powerState', 'Off');
                return Promise.resolve();
            })
            // .route(null, null, (request: AlexaRequest) => {
            //     console.log('Always called');
            //     return Promise.resolve();
            // })
            .registerDevices([
                {
                    "applianceId": "device-1",
                    "manufacturerName": "SmartHome Product Company",
                    "modelName": "SmartHome Mutli Power Plug 1",
                    "version": "1.0",
                    "friendlyName": "one",
                    "friendlyDescription": "First power plug",
                    "isReachable": true,
                    "actions": ["turnOn", "turnOff"]
                }
            ]);
    });


    describe('PowerControl', () => {

        it('should work', () => {
            let event = require('../../sample/Alexa/PowerController/directive.json');
            ash
                .handle(event)
                .then((response: AlexaResponse) => {
                    console.log('Response is: ', response);
                });
        });

    });

});
