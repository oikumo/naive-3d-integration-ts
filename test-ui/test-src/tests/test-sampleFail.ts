import { HtmlLogger } from "index";

export async function testSampleFail(_logger: HtmlLogger) {
    console.log('prueba');

    throw Error();
    return;
}