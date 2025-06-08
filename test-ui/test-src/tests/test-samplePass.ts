import { TestLogger } from "integration-tests-framework/test-runner/test-runner-execution";

export async function testSamplePass(logger: TestLogger) {
    logger.log('pass');

    return;
}