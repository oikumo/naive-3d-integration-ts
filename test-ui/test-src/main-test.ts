import { MainController } from '../../src/integration-tests-framework/ui/controllers/main-controller/main-controller';
import { IntegrationTestRunner } from '../../src/integration-tests-framework/test-runner/integration-test-runner';
import { testSampleFail } from './tests/test-sampleFail';
import { testSamplePass } from './tests/test-samplePass';
import { Information } from '../../src/integration-tests-framework/ui/controllers/main-controller/Information';

const runner = new IntegrationTestRunner([
    testSampleFail,
    testSamplePass
]);

const dashboard = new MainController(
    new Information('Integration Tests', '0.0.2'), runner
);

dashboard.showAsync();