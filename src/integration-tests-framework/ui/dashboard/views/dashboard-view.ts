import { IDashboardView } from "../controllers/dasboard-controller";
import { Information } from "../controllers/interface/Information";
import { ModelTestResult } from "../model/test-result";
import { createSidebar } from "./sidebar";
import { TestCard, TestCardState, TestInfo } from "./test-card";
import { createTestContainer } from "./test-card-container";


export interface IDashboardController {
    
    runTests() : void;
}

export class DashboardView implements IDashboardView {
    #controller: IDashboardController;

    #information: Information;
    #document: Document;
    #rootElement: HTMLElement;
    #header: HTMLDivElement | null = null;
    #dashboardGrid: HTMLDivElement | null = null;
    #sidebar: HTMLDivElement | null = null;
    #testContainer: HTMLDivElement | null = null;
 
    constructor(controller: IDashboardController, information: Information, rootElementId: string | null = null){
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
            const config: TestInfo = {
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
    
    createTestItem(id: string, config: TestInfo) {
        const testCard = new TestCard('card-' + id, config);
        return testCard.create();
    }
}


