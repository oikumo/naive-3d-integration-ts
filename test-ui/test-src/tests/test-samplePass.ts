import { HtmlLogger } from "index";

export async function testSamplePass(logger: HtmlLogger) {
    logger.log('pass');
    return;
}