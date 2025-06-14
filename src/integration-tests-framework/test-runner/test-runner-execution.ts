import { TestExecution, TestExecutionState } from "./integration-test-result";

export interface ITestRunnerObserver {
    
    updateResults(newResults: Array<TestExecution>) : void;
}

export class TestLogger {

    #runner: TestRunnerExecution;

    constructor(runner: TestRunnerExecution) {
        this.#runner = runner;
    }

    log(message: string) {
        this.#runner.currentTestLog(message);
    }
}

export class TestRunnerExecution {
    #testExecutions = new Array<TestExecution>();
    #testLogger = new TestLogger(this);

    get logger() { return this.#testLogger; }

    get executions() {
        return structuredClone(this.#testExecutions);
    }

    clear() {
        this.#testExecutions.length = 0;
    }

    newExecution(testName: string) {
        const execution = new TestExecution(testName);
        this.#testExecutions.push(execution);
    }

    currentTestLog(message: string) {
        if (this.#testExecutions.length === 0) return;
        this.#testExecutions[this.#testExecutions.length - 1].messages.push(message);
    }

    result(pass: boolean, error: string | null = null) {
        const last = this.#testExecutions[this.#testExecutions.length - 1];
        last.result = pass ? TestExecutionState.PASS : TestExecutionState.FAIL;
        if (error) last.error = error;
    }

    success(_message: string) {
    }
}

