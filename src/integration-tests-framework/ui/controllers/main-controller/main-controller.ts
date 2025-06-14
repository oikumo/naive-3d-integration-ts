
import { HtmlLogger } from "../../../test-runner/logger/html-logger";
import { ModelTestResult } from "../../model/test-result";
import { MainView, IMainViewParthner as IMainViewPartner } from "../../views/main-view/main-view";
import { Information } from "./information";
import { DashboardTestResult } from "./dashboard-test-result";
import { IntegrationTestRunner } from "../../../test-runner/integration-test-runner";
import { MainControllerInfo } from "./main-controller-info";
import { Model } from "../../model/model";

export interface IMainControllerPartner {

    updateResults(results: Array<MainControllerInfo>) : void;
}

export class MainController implements IMainViewPartner {
    #view: MainView;
    #testRunner: IntegrationTestRunner;
    #logger: HtmlLogger;
    
    constructor(information: Information, testRunner: IntegrationTestRunner) {
        this.#view = new MainView(this, information);
        this.#testRunner = testRunner;
        this.#logger = new HtmlLogger(this);
    }

    async showAsync() {
        await this.runTests();    
    }

    runTests(): void {
        this.#testRunner.executeTests(this.#logger);
        console.log(Model.getCurrentTestInfo());
        Model.updateCurrentTestInfo();
    }

    updateTestResults(results: Array<DashboardTestResult>) {
        this.#view.updateResults(this.#processResults(results));
    }

    #processResults(results: Array<DashboardTestResult>) {
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

        const viewResults = new Array<MainControllerInfo>();

        for (let i = 0; i < modelResults.length; i++) {
            const config: MainControllerInfo = {
                status: modelResults[i].pass,
                title: modelResults[i].description,
                duration: '1.2s',
                environment: 'Chrome 104',
                progressWidth: '100%',
                details: modelResults[i].messages.join('\n')
            };
            viewResults.push(config);
        }

        return viewResults;
    }
}