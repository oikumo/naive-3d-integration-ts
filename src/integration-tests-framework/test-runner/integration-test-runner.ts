import { HtmlLogger } from '../ui/dashboard/controllers/logger/html-logger';
import { IntegrationTestResult } from './integration-test-result';

export type IntegrationTestFunction = (logger: HtmlLogger) => Promise<void>;

export class IntegrationTestRunner {
    #tests: Array<IntegrationTestFunction>;
    #results = new Array<IntegrationTestResult>();

    get results() { return this.#results; }

    constructor(tests: Array<IntegrationTestFunction> | null = null) {
        if (tests !== null) {
            this.#tests = tests;
        } else { 
            this.#tests = new Array<IntegrationTestFunction>();
        }
    }

    setTests(tests: Array<IntegrationTestFunction>) {
        this.#results.length = 0;
        this.#tests = tests;
    }

    async executeTests(logger: HtmlLogger) {
        this.#results.length = 0;
        logger.clear();
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
