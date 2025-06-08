import { IMainControllerPartner } from "../../controllers/main-controller/main-controller";
import { Information } from "../../controllers/main-controller/information";
import { TestCard } from "./test-card/test-card";
import { TestCardInfo } from "./test-card/test-card-info";
import { Sidebar } from "../widgets/sidebar/sidebar";
import { SidebarItemClass } from "../widgets/sidebar/sidebar-item-class";
import { SidebarItem } from "../widgets/sidebar/sidebar-item";
import { MainControllerInfo } from "../../controllers/main-controller/main-controller-info";
import { TestCardState } from "./test-card/test-card-state";
import { DOM } from "../common/dom";

export interface IMainViewParthner {
    
    runTestsAsync(): void;
}

export class MainView implements IMainControllerPartner {
    #controller: IMainViewParthner;
    #information: Information;
    #header: HTMLDivElement | null = null;
    #dashboardGrid: HTMLDivElement | null = null;
    #sidebar: HTMLDivElement | null = null;
    #testContainer: HTMLDivElement | null = null;
 
    constructor(controller: IMainViewParthner, information: Information){
        this.#controller = controller;
        this.#information = information;
        this.create();
    }

    create() {
        this.#header = DOM.createHeader(this.#information.title, this.#information.version);
        this.#sidebar = this.#createSidebar();
        this.#testContainer = DOM.createDiv('test-container');
        this.#dashboardGrid = DOM.createDiv('dashboard-grid');
        this.#dashboardGrid.appendChild(this.#sidebar);
        this.#dashboardGrid.appendChild(this.#testContainer);

        DOM.getRoot().append(
            this.#header,
            this.#dashboardGrid
        );
    }

    updateResults(results: Array<MainControllerInfo>) {
        const items = new Array<HTMLDivElement>();

        for (let i  = 0; i < results.length; i++) {
            const config: TestCardInfo = {
                status: results[i].status ? TestCardState.SUCESS : TestCardState.FAILED,
                title: results[i].title,
                duration: '1.2s',
                environment: 'Chrome 104',
                progressWidth: '100%',
                details: results[i].details
            };

            const testCard = new TestCard('card-' + i.toString(), config);
            items.push(testCard.create());
        }

        this.#testContainer?.replaceChildren(...items);
        
        document.querySelectorAll('.test-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }

    #createSidebar() {

        const play = SidebarItem.create(
            'Run All Tests',
            SidebarItemClass.PLAY, 
            () => this.#controller.runTestsAsync());

        const filterResults = SidebarItem.create(
            'Filter Results',
            SidebarItemClass.FILTER, 
            () => this.#controller.runTestsAsync());


        const stats = SidebarItem.create(
            'Analytics',
            SidebarItemClass.ANALYTICS, 
            () => this.#controller.runTestsAsync());

        const settings = SidebarItem.create(
            'Settings',
            SidebarItemClass.SETTINGS, 
            () => this.#controller.runTestsAsync());

        return Sidebar.create([
            play, filterResults, stats, settings
        ]);
        
    }
}


