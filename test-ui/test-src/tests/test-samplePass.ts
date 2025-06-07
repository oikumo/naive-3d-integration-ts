import { HtmlLogger } from "integration-tests-framework/test-runner/logger/html-logger";

export async function testSamplePass(logger: HtmlLogger) {
    logger.log('pass');
    return;
}