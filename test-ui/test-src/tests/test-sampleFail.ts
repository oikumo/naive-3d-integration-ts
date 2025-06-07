import { HtmlLogger } from "integration-tests-framework/test-runner/logger/html-logger";

export async function testSampleFail(_logger: HtmlLogger) {
    console.log('prueba');

    throw Error();
    return;
}