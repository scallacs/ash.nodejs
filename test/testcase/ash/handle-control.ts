


import { Ash } from "../../../lib/ash";
import { AlexaResponseBuilder } from "../../../lib/alexa-response-builder";
import { Alexa } from "../../../lib/alexa/definitions";
import { LambdaRequestAdapter } from "../../../lib/request-adapter/ash-lambda-adapter";

describe('Handling Control', () => {
    let ash: Ash;

    before(() => {
        ash = Ash.createFromDeviceList([]);
        ash
            .interface('Alexa.PowerController', 'TurnOn', (request: Alexa.Request.Request, response: AlexaResponseBuilder) => {
                console.log('Alexa.PowerController.TurnOn CALLBACK');
                if (!request.directive.endpoint) {
                    throw new Error('No enpoint in request...');
                }
                // Do stuff...
                response.addProperty('powerState', 'On');
                return Promise.resolve();
            })
            .interface('Alexa.PowerController', 'TurnOff', (request: Alexa.Request.Request, response: AlexaResponseBuilder) => {
                console.log('Alexa.PowerController.TurnOff CALLBACK');
                // Do stuff
                if (!request.directive.endpoint) {
                    throw new Error('No enpoint in request...');
                }
                response.addProperty('powerState', 'Off');
                return Promise.resolve();
            });
        ash.deviceRegistry
            .add([
                {
                    endpointId: "device-1",
                    manufacturerName: "SmartHome Product Company",
                    modelName: "SmartHome Mutli Power Plug 1",
                    version: "1.0",
                    friendlyName: "one",
                    description: "First power plug",
                    isReachable: true,
                    actions: ["turnOn", "turnOff"],
                }
            ]);
    });


    describe('PowerControl', () => {

        it('should work', () => {
            let event = require('../../../sample/Alexa/PowerController/directive.json');
            ash
                .handle(event)
                .then((response: Alexa.Response.Response) => {
                    console.log('Response is: ', response);
                });
        });

    });

});
