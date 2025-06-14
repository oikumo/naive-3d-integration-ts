import { type IntegrationTestFunction, IntegrationTestRunner } from "./integration-tests-framework/test-runner/integration-test-runner";
import { MainController } from "./integration-tests-framework/ui/controllers/main-controller/main-controller";
import { HtmlLogger } from "./integration-tests-framework/test-runner/logger/html-logger";
import { Information } from "./integration-tests-framework/ui/controllers/main-controller/information";


export {
    IntegrationTestFunction as TestFunc,
    IntegrationTestRunner,
    MainController,
    Information,
    HtmlLogger
};
