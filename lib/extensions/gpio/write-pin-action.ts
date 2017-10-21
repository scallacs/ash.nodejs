import { GPIOAction } from './gpio-action';
import { GPIOAdapter } from './definitons';

export class WritePinAction extends GPIOAction {

    constructor(gpio: GPIOAdapter, channel: number, protected value: boolean) {
        super(gpio, channel);
    }

    async perform(): Promise<any> {
        await this.gpio.setup(this.channel, 'IN', 'none');
        return await this.gpio.write(this.channel, this.value);
    }

}