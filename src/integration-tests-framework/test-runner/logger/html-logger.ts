import { DashboardTestResult } from "../../ui/controllers/main-controller/dashboard-test-result";
import { MainController } from "../../ui/controllers/main-controller/main-controller";

export class HtmlLogger {
    #dashboard: MainController;
    #testResults = new Array<DashboardTestResult>();

    constructor(dashboard: MainController){
        this.#dashboard = dashboard;
    }

    clear() {
        this.#testResults.length = 0;
        this.#dashboard.updateTestResults(this.#testResults);
    }

    newTestResult(description: string) {
        const testResult = new DashboardTestResult();
        testResult.description = description;
        this.#testResults.push(testResult);

        return testResult;
    }

    log(message: string) {
        if (this.#testResults.length === 0) return;
        this.#testResults[this.#testResults.length - 1].messages.push(message);
    }

    result(pass: boolean) {
        this.#testResults[this.#testResults.length - 1].pass = pass;
    }

    addResult() {
        this.#dashboard.updateTestResults(this.#testResults);
    }

    success(_message: string) {
    }    
}

