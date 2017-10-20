


import { Ash } from "../../lib/ash";

describe('Handling discovery', () => {
    let ash: Ash;

    before(() => {
        ash = new Ash();
        ash
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

    describe('Valid request', () => {

        it('Should work', () => {
            let event = require('../../sample/Alexa/Discovery/directive.json');
            console.log('Event: ', event);
            ash
                .handle(event);
        });


    });

    // describe('Invalid request', () => {

    //     it('Invalid event', () => {
    //         let event = 'test';
    //         ash
    //             .handle(event);
    //     });

    //     it('Unknown action', () => {
    //         let event = 'test';
    //         ash
    //             .handle(event);
    //     });
    // });

});
