import { Alexa, AlexaResponseBuilder, ControllerInterface, Ash } from '../../public_api';
import { GPIOAdapter } from './definitons';

export abstract class GPIOAction implements ControllerInterface {

    constructor(protected gpio: GPIOAdapter, protected channel: number) {
    }

    
    async handle(request: Alexa.Request.Request, responseBuilder: AlexaResponseBuilder, ash: Ash): Promise<void> {
        await this.perform();
        responseBuilder.success();
    }
    
    abstract perform(): Promise<any>;

}