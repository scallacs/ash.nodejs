import { GPIOAdapter } from './definitons';
import { GPIOAction } from './gpio-action';

export class ReadPinAction extends GPIOAction {

    constructor(gpio: GPIOAdapter, channel: number) {
        super(gpio, channel);
    }

    async perform(): Promise<boolean> {
        await this.gpio.setup(this.channel, 'OUT', 'none');
        return await this.gpio.read(this.channel);
    }
}