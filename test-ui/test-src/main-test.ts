import { IntegrationTestRunner } from '../../src/integration-tests-framework/test-runner/integration-test-runner';
import { DashboardController } from '../../src/integration-tests-framework/ui/dashboard/controllers/dasboard-controller';
import { Information } from "../../src/integration-tests-framework/ui/dashboard/controllers/interface/Information";
import { testSampleFail } from './tests/test-sampleFail';
import { testSamplePass } from './tests/test-samplePass';

const runner = new IntegrationTestRunner([
    testSampleFail,
    testSamplePass
]);

const dashboard = new DashboardController(
    new Information('Integration Tests', '0.0.2'), runner
);

dashboard.runTests();