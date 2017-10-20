import { AlexaRequest } from "../alexa-request";
import { Ash } from "../ash";

export interface RequestAdapterInterface {

    handle(ash: Ash, request: AlexaRequest): any;

}