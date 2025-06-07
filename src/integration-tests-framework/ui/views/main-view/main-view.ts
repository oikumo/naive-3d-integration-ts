import { IDashboardView } from "../../controllers/main-controller/main-controller";
import { Information } from "../../controllers/main-controller/Information";
import { ModelTestResult } from "../../model/test-result";
import { TestCard } from "./test-card/test-card";
import { TestCardState } from "./test-card/test-card-state";
import { TestCardInfo } from "./test-card/test-card-info";
import { createSidebar } from "./sidebar/sidebar";
import { createTestContainer } from "./test-card/test-card-container";

export interface IMainViewParthner {
    
    runTests() : void;
}

export class MainView implements IDashboardView {
    #controller: IMainViewParthner;

    #information: Information;
    #document: Document;
    #rootElement: HTMLElement;
    #header: HTMLDivElement | null = null;
    #dashboardGrid: HTMLDivElement | null = null;
    #sidebar: HTMLDivElement | null = null;
    #testContainer: HTMLDivElement | null = null;
 
    constructor(controller: IMainViewParthner, information: Information, rootElementId: string | null = null){
        this.#controller = controller;
        
        const doc = document;
        if (doc === null) throw new Error();

        let root: HTMLElement | null = null;
        if (rootElementId !== null) {
            root = doc.getElementById(rootElementId);
        } else {
            root = doc.body;
        }
        if (root === null) throw new Error();

        this.#information = information;
        this.#document = doc;
        this.#rootElement = root;

        this.create();
    }

    create() {
        this.#header = this.createHeader();
        this.#dashboardGrid = this.createGrid();
        this.#sidebar = createSidebar();
        this.#testContainer = createTestContainer();

        this.#dashboardGrid.appendChild(this.#sidebar);
        this.#dashboardGrid.appendChild(this.#testContainer);

        const button = this.#document.createElement('button');
        button.innerText = "Hola";

        button.addEventListener('click', () => {
            this.#controller.runTests();
        });
        
        this.#rootElement.append(
            button,
            this.#header,
            this.#dashboardGrid
        );
    }

    updateResults(results: Array<ModelTestResult>) {
        const items = new Array<HTMLDivElement>();

        for (let i  = 0; i < results.length; i++) {
            const config: TestCardInfo = {
                status: results[i].pass ? TestCardState.SUCESS : TestCardState.FAILED,
                title: results[i].description,
                duration: '1.2s',
                environment: 'Chrome 104',
                progressWidth: '100%',
                details: results[i].messages.join('\n')
            };
            items.push(this.createTestItem(i.toString(), config));
        }

        this.#testContainer?.replaceChildren(...items);
        
        document.querySelectorAll('.test-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }

    createHeader() {
        const element = this.#document.createElement("div");
        element.className = "dashboard-header";
        element.innerHTML = `<h1>${this.#information.title}</h1><p>Version ${this.#information.version}</p></div>`;
        return element;
    }


    createGrid() {
        const dashboardGrid = this.#document.createElement("div");
        dashboardGrid.className = 'dashboard-grid';

        return dashboardGrid;
    }
    
    createTestItem(id: string, config: TestCardInfo) {
        const testCard = new TestCard('card-' + id, config);
        return testCard.create();
    }
}


