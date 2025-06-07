export class DOM {
    static createElement(tagName: string, className?: string): HTMLElement {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        return element;
    }

    static createDiv(className?: string): HTMLDivElement {
        return this.createElement('div', className) as HTMLDivElement;
    }

    static createSpan(className?: string): HTMLSpanElement {
        return this.createElement('span', className) as HTMLSpanElement;
    }

    static createButton(className?: string): HTMLButtonElement {
        return this.createElement('button', className) as HTMLButtonElement;
    }

    static createNavList(className?: string): HTMLUListElement {
        const ul = document.createElement('ul');
        if (className) {
            ul.className = className;
        }
        return ul;
    }

    static createNavItem(className?: string): HTMLLIElement {
        const li = document.createElement('li');
        if (className) {
            li.className = className;
        }
        return li;
    }

}
