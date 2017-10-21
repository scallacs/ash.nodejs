import { AlexaResponseBuilder } from "./alexa-response-builder";
import { Alexa } from "./alexa/definitions";
import { Ash } from "./ash";

export interface ControllerInterface<T = any> {
    
    handle(request: Alexa.Request.Request, responseBuilder: AlexaResponseBuilder, ash: Ash): Promise<T>;
    
}