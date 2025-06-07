import { IntegrationTestRunner } from "../../../test-runner/integration-test-runner";
import { HtmlLogger } from "./logger/html-logger";
import { ModelTestResult } from "../model/test-result";
import { DashboardView, IDashboardController } from "../views/dashboard-view";
import { Information } from "./interface/Information";
import { DashboardTestResult } from "./interface/dashboard-test-result";

export interface IDashboardView {

    updateResults(results: Array<ModelTestResult>) : void;
}


export class DashboardController implements IDashboardController {
    #view: DashboardView;
    #testRunner: IntegrationTestRunner;
    #logger: HtmlLogger;
    
    constructor(information: Information, testRunner: IntegrationTestRunner) {
        this.#view = new DashboardView(this, information);
        this.#testRunner = testRunner;
        this.#logger = new HtmlLogger(this);
    }

    runTests(): void {
        this.#testRunner.executeTests(this.#logger);
    }

    updateTestResults(results: Array<DashboardTestResult>) {
        const modelResults = Array<ModelTestResult>();

        for (let result of results) {
            const modelResult = new ModelTestResult();
            modelResult.description = result.description;
            modelResult.pass = result.pass;
            modelResult.messages = result.messages;
            modelResults.push(modelResult);
        }

        modelResults.sort((left, _) => {
            return left.pass ? 1 : -1;
        });


        this.#view.updateResults(modelResults);
    }
}