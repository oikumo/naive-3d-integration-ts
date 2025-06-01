import { HtmlLogger } from "../../integration-tests-framework/ui/logger/html-logger";

export async function entitiesIntegrationTest(_logger: HtmlLogger) {
    console.log('prueba');

    throw Error();
    return;
}