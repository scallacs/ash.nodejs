
import { Ash } from "../ash";
import { AlexaRequest } from "../alexa-request";
import { AlexaResponse } from "../alexa-response";
import { RequestAdapterInterface } from "./request-adapter-interface";

/**
 * Map a lambda function backend to the ASH helper
 */
export class LambdaRequestAdapter implements RequestAdapterInterface{

    constructor (protected context: any){

    }

    public handle(ash: Ash, request: AlexaRequest): any {
        return ash.handle(request)
            .then((response: AlexaResponse) => {
                this.context.callback(null, response);
            })
            .catch((error: any) => {
                this.context.callback(error, null);
            });
    }

}