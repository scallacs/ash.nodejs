import { DeviceRegistry } from '../definitions';
import { Alexa } from '../alexa/definitions';

export class InMemoryDeviceRegistry implements DeviceRegistry {

    constructor(private devices: Alexa.Device[]) {

    }

    async findAll(): Promise<Alexa.Device[]> {
        return this.devices;
    }

    async findById(id: string): Promise<Alexa.Device | undefined> {
        return this.devices.find(d => d.endpointId == id);
    }

    async add(devices: Alexa.Device[]): Promise<void> {
        this.devices.push(...devices);
    }
}