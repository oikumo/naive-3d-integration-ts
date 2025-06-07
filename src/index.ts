import { IntegrationTestRunner, type IntegrationTestFunction } from './integration-tests-framework/test-runner/integration-test-runner';
import { HtmlLogger } from './integration-tests-framework/ui/dashboard/controllers/logger/html-logger';
import { DashboardController } from './integration-tests-framework/ui/dashboard/controllers/dasboard-controller';
import { Information } from "./integration-tests-framework/ui/dashboard/controllers/interface/Information";


export {
    IntegrationTestFunction as TestFunc,
    IntegrationTestRunner,
    DashboardController,
    Information,
    HtmlLogger
};
