export interface GPIOAdapter {

    setup(channel: number, DIR_OUT: 'IN' | 'OUT', arg2: string): Promise<void>;
    
    read(channel: number): Promise<boolean>;

    write(channel: number, value: boolean): Promise<void>;

}