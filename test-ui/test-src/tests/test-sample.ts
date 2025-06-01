import { HtmlLogger } from "index";

export async function testSample(_logger: HtmlLogger) {
    console.log('prueba');

    throw Error();
    return;
}