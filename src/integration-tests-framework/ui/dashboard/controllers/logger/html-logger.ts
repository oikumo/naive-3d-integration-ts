import { DashboardController } from "../dasboard-controller";
import { DashboardTestResult } from "../interface/dashboard-test-result";

export class HtmlLogger {
    #dashboard: DashboardController;
    #testResults = new Array<DashboardTestResult>();

    constructor(dashboard: DashboardController){
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

