import { IntegrationTestRunner } from "../../../../test-runner/integration-test-runner";
import { Model } from "../../model/model";
import { TestRunnerObserver } from "./test-execution-observer";
import { TestCardInfo } from "../../views/screens/main-view/test-card/test-card-info";
import { IMainViewPartner, MainView } from "../../views/screens/main-view/main-view";
import { TestCardState } from "../../views/screens/main-view/test-card/test-card-state";

export interface IMainControllerPartner {
    updateResults(results: Array<TestCardInfo>): void;
}

export class Information {
    title: string;
    version: string;

    constructor(title: string, version: string) {
        this.title = title;
        this.version = version;
    }
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

    async runTestsAsync() {
        await this.#testRunner.executeTests(this.#observer);
        console.log(Model.getCurrentTestInfo());
        Model.updateCurrentTestInfo();
    }

    updateResults() {
        this.#view.updateResults(this.#retrieveResults());
    }

    #retrieveResults() {
        const results = Model.retrieveTestExecutionResult();

        if (!results) {
            return [];
        }

        const viewResults: TestCardInfo[] = results.map(result => ({
            status: result.pass ? TestCardState.SUCCESS : TestCardState.FAILED,
            title: result.title,
            duration: '1.2s', // Consider fetching this dynamically
            environment: 'Chrome 104', // Consider fetching this dynamically
            progressWidth: '100%',
            details: result.messages.join('\n')
        }));

        return viewResults;
    }
}