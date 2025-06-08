import { MainView, IMainViewParthner as IMainViewPartner } from "../../views/main-view/main-view";
import { Information } from "./information";
import { IntegrationTestRunner } from "../../../test-runner/integration-test-runner";
import { MainControllerInfo } from "./main-controller-info";
import { Model } from "../../model/model";
import { TestRunnerObserver } from "./test-execution-observer";

export interface IMainControllerPartner {

    updateResults(results: Array<MainControllerInfo>) : void;
}

export class MainController implements IMainViewPartner {
    #view: MainView;
    #testRunner: IntegrationTestRunner;
    #observer: TestRunnerObserver;
    
    constructor(information: Information, testRunner: IntegrationTestRunner) {
        this.#view = new MainView(this, information);
        this.#testRunner = testRunner;
        this.#observer = new TestRunnerObserver(this);
    }

    async showAsync() {
        await this.runTestsAsync();
    }

    runTestsAsync() {
        const promise = async () => {
            await this.#testRunner.executeTests(this.#observer);
            console.log(Model.getCurrentTestInfo());
            Model.updateCurrentTestInfo();
        }
        promise();
    }

    updateResults() {
        this.#view.updateResults(this.#retrieveResults());
    }

    #retrieveResults() {
        const results = Model.retrieveTestExecutionResult();
        const viewResults = new Array<MainControllerInfo>();

        if (results === null) {
            return viewResults;            
        }
        
        for (let i = 0; i < results.length; i++) {
            const config: MainControllerInfo = {
                status: results[i].pass,
                title: results[i].title,
                duration: '1.2s',
                environment: 'Chrome 104',
                progressWidth: '100%',
                details: results[i].messages.join('\n')
            };
            viewResults.push(config);
        }

        return viewResults;
    }
}