
import { Ash, Alexa, AlexaResponseBuilder, ControllerInterface } from "../../lib/public_api";
import { WritePinAction } from "../../lib/extensions/gpio";
import { DiscoverAction } from "../../lib/actions/discover-action";

// import * as gpio from "rpi-gpio";
const gpio = require("rpi-gpio");


let devices: Alexa.Device[] = [
    {
        "endpointId": "luminosity-sensor",
        "manufacturerName": "Dfordev",
        "friendlyName": "luminosity",
        "description": "Luminisoty sensor",
    },
    {
        "endpointId": "motion-sensor",
        "manufacturerName": "<the manufacturer name of the endpoint>",
        "description": "Smart Sensor by Sensor Maker",
        "friendlyName": "Front door",
        "displayCategories": ["MOTION_SENSOR"],
        "cookie": {},
        "capabilities": [
            {
                "type": "AlexaInterface",
                "interface": "Alexa.MotionSensor",
                "version": "3",
                "properties": {
                    "supported": [
                        {
                            "name": "detectionState"
                        }
                    ],
                    "proactivelyReported": true,
                    "retrievable": true
                }
            },
            {
                "type": "AlexaInterface",
                "interface": "Alexa",
                "version": "3"
            }
        ]
    }
];


let ash = Ash.createFromDeviceList(devices);
ash
    .interface('Alexa.Discovery', 'Discover', new DiscoverAction())
    .interface('Alexa.PowerController', 'TurnOff', new WritePinAction(gpio, 10, true))
    .interface('Alexa.PowerController', 'TurnOn', new WritePinAction(gpio, 10, true))
    ;

// ash
//     .namespace('Alexa.Discovery', async (request: Alexa.Request.Request, responseBuilder: AlexaResponseBuilder) => {
//         switch (request.directive.header.name) {
//             case 'TurnOn':
//                 break;
//         }
//     });