import { Alexa } from "../alexa/definitions";
import { Ash } from "../ash";

export interface RequestAdapterInterface {

    handle(ash: Ash, request: Alexa.Request.Request): any;

}