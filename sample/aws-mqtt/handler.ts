
import { Ash } from "../../lib/ash";
import { Alexa } from "../../lib/alexa/definitions";
import { MqttClientHelper } from "./mqtt-client";
import { AlexaResponseBuilder } from "../../lib/alexa-response-builder";
const awsIot = require('aws-iot-device-sdk');
let devices: Alexa.Device[] = [
    {
        "endpointId": "device-1",
        "manufacturerName": "SmartHome Product Company",
        "modelName": "SmartHome Mutli Power Plug 1",
        "version": "1.0",
        "friendlyName": "one",
        "description": "First power plug",
        "isReachable": true,
        "actions": ["turnOn", "turnOff"]
    }
];


// exports.handler = AshLambdaAdapter.handler((request: any, context: any, callback: any) => {
let ash = new Ash();
ash
    .interface('Alexa.Discovery', 'Discover', (request: Alexa.Request.Request, responseBuilder: AlexaResponseBuilder) => {
        responseBuilder.payload({
            endpoints: devices
        });
        return Promise.resolve(responseBuilder);
    })
    .interface('Alexa.PowerControl', 'TurnOn', (request: Alexa.Request.Request, response: AlexaResponseBuilder) => {
        if (!request.directive.endpoint) {
            throw new Error('Missing appliance Id');
        }
        let smarthomeDevice = ash.deviceRegistry.findById(request.directive.endpoint.endpointId);
        if (smarthomeDevice) {

        }
        // var awsDevice = awsIot.device(deviceConnOptions);
        // let device = new MqttClientHelper(smarthomeDevice, awsDevice);

        return Promise.resolve(response.success());
    })
    .interface('Alexa.PowerControl', 'TurnOff', (request: Alexa.Request.Request, response: AlexaResponseBuilder) => {
        return Promise.resolve(response.success());
    });

//     let lambdaAdapter = new AshLambdaAdapter(context);
//     lambdaAdapter.handle(ash, request);
// };
