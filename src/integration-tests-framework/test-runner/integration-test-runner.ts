import { HtmlLogger } from '../ui/logger/html-logger';
import { IntegrationTestResult } from './integration-test-result';

export type TestFunc = (logger: HtmlLogger) => Promise<void>;

export class IntegrationTestRunner {
    #tests: Array<TestFunc>;
    #results = new Array<IntegrationTestResult>();

    get results() { return this.#results; }

    constructor(tests: Array<TestFunc>) {
        this.#tests = tests;
    }

    async runIntegrationTests(logger: HtmlLogger) {
        this.#results.length = 0;

        console.log('tests:', this.#tests);

        for (let test of this.#tests) {
            logger.newTestResult(test.name);
            logger.log(`test: ${test.name} begin`);
            try {
                await test(logger);
                const result = new IntegrationTestResult(test.name, 'pass');
                this.#results.push(result);
                logger.result(true);
                

            } catch(err) {
                console.log(err);
                const result = new IntegrationTestResult(test.name, 'fail');
                this.#results.push(result);
                logger.result(false);   
                
            }
            logger.log(`test: ${test.name} end`);
            logger.addResult();
        }
    }
}
