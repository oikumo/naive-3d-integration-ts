import { IntegrationTestRunner } from '../../src/integration-tests-framework/test-runner/integration-test-runner';
import { HtmlLogger } from '../../src/integration-tests-framework/ui/logger/html-logger';
import { DashboardController } from '../../src/integration-tests-framework/ui/dashboard/controllers/dasboard-controller';
import { Information } from "../../src/integration-tests-framework/ui/dashboard/controllers/interface/Information";
import { testSample } from './tests/test-sample';

const runner = new IntegrationTestRunner([
    testSample,
    testSample
]);

const dashboard = new DashboardController(
    new Information('Integration Tests', '0.0.2') 
);

runner.runIntegrationTests(new HtmlLogger(dashboard));


