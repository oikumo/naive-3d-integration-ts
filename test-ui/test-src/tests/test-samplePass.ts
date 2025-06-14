import { TestLogger } from "integration-tests-framework/test-runner/test-logger";

export async function testSamplePass(logger: TestLogger) {
    logger.log('pass');

    return;
}