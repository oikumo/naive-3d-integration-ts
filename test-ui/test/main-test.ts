import { IntegrationTestRunner } from '../../src/integration-tests-framework/test-runner/integration-test-runner';
import { HtmlLogger } from '../../src/integration-tests-framework/ui/logger/html-logger';
import { entitiesIntegrationTest } from '../../src/tests/entities/entities-integration-test';
import { DashboardController } from '../../src/integration-tests-framework/ui/dashboard/controllers/dasboard-controller';
import { Information } from "../../src/integration-tests-framework/ui/dashboard/controllers/interface/Information";

const runner = new IntegrationTestRunner([
    entitiesIntegrationTest,
    entitiesIntegrationTest,
]);

const dashboard = new DashboardController(
    new Information('Naive 3D Test', 'TEST 0.0.1') 
);

console.log('hola');

const logger = new HtmlLogger(dashboard);
runner.runIntegrationTests(logger);


