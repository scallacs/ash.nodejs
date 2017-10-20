import { AlexaResponseBuilder } from "./alexa-response-builder";
import { AlexaRequest } from "./alexa-request";

export interface ControllerInterface {
    
    handle(request: AlexaRequest, responseBuilder: AlexaResponseBuilder): Promise<any>;
    
}