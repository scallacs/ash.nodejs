import { ControllerInterface } from "../controller-interface";
import { AlexaResponseBuilder } from "../alexa-response-builder";
import { Ash } from "../ash";
import { Alexa } from "../alexa/definitions";

export class DiscoverAction implements ControllerInterface {

    async handle(request: Alexa.Request.Request, response: AlexaResponseBuilder, ash: Ash): Promise<any> {
        response.payload({
            endpoints: await ash.deviceRegistry.findAll()
        });
        return response;
    }
}