
import { Ash } from "../ash";
import { Alexa } from "../alexa/definitions";
import { RequestAdapterInterface } from "./request-adapter-interface";

/**
 * Map a lambda function backend to the ASH helper
 */
export class LambdaRequestAdapter implements RequestAdapterInterface{

    constructor (protected context: any){

    }

    public handle(ash: Ash, request: Alexa.Request.Request): any {
        return ash.handle(request)
            .then((response: Alexa.Response.Response) => {
                this.context.callback(null, response);
            })
            .catch((error: any) => {
                this.context.callback(error, null);
            });
    }

}