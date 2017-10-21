import { Alexa } from "./alexa/definitions";

export interface DeviceRegistry {

    add(devices: Alexa.Device[]): Promise<void>;
    findById(id: string): Promise<Alexa.Device | undefined>
    findAll(): Promise<Alexa.Device[]>;
    
}