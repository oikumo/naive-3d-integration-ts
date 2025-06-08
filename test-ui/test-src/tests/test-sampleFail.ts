import { TestLogger } from "integration-tests-framework/test-runner/test-runner-execution";

export async function testSampleFail(logger: TestLogger) {
    logger.log('ok');
    logger.log('fail');
    

    throw Error();
    return;
}