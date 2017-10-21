import { lstatSync, readdirSync, PathLike } from 'fs';
import * as path from 'path';

export class FileHelper {

    constructor() {

    }

    static resolvePath(...parts: string[]){
        return path.resolve(__dirname, '..', '..', parts.join(path.sep));
    }

    static eachDir(filepath: string) {
        return readdirSync(filepath)
            .map((name: string) => path.join(filepath, name))
            .filter(FileHelper.isDirectory);
    }
    static eachFile(filepath: string) {
        return readdirSync(filepath)
            .map((name: string) => path.join(filepath, name))
            .filter(FileHelper.isFile);
    }

    static isDirectory(source: PathLike) {
        return lstatSync(source).isDirectory();
    }

    static isFile(source: PathLike) {
        return lstatSync(source).isFile();
    }

}