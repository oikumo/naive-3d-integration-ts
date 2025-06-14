import { TestLogger } from "integration-tests-framework/test-runner/test-logger";

export async function testSampleFail(logger: TestLogger) {
    logger.log('ok');
    logger.log('fail');
    

    throw Error();
    return;
}