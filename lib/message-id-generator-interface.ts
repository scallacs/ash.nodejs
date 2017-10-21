import { Alexa } from "./alexa/definitions";

export interface MessageIdGeneratorInterface {

    generate(request?: Alexa.Request.Request): string;

}