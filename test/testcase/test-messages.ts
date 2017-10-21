


import { Ash } from "../../lib/ash";
import { AlexaResponseBuilder } from "../../lib/alexa-response-builder";
import { Alexa } from "../../lib/alexa/definitions";
import { LambdaRequestAdapter } from "../../lib/request-adapter/ash-lambda-adapter";
import { FileHelper } from "../helper/file-helper";
import * as path from 'path';

const versions = ['v3'];

describe('Alexa', () => {
    let ash: Ash;

    beforeEach(() => {
        ash = new Ash();
    });

    for (let version of versions) {

        describe(version, () => {
            let messageResourcePath = FileHelper.resolvePath('resource', 'message', 'Alexa', version);
            console.log('Resources: ', messageResourcePath);
            FileHelper.eachDir(messageResourcePath).forEach((dirpath: string) => {

                describe(path.basename(dirpath), () => {

                    FileHelper
                        .eachFile(dirpath)
                        .filter((filepath: string) => {
                            return (filepath.endsWith('.request.json'));
                        })
                        .forEach((filepath: string) => {
                            // let name = filepath.substr();
                            // Only request
                            describe(filepath, () => {

                                it('test', () => {
                                    // let requestName = path.dirname(filepath) + '.';
                                    let infos = filepath.split('.');
                                    ash.interface(infos[0], infos[1], (request: Alexa.Request.Request, response: AlexaResponseBuilder) => {
                                        return Promise.resolve('ok');
                                    });
                                    let request = require(filepath);

                                    return ash.handle(request).then((response: Alexa.Response.Response) => {
                                        console.log('===> ', response);
                                    });
                                });
                            });
                        });

                });
            });
        });
    }
});
