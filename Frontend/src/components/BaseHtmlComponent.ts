import Html from "../utils/Html";

export default class BaseHtmlComponent extends HTMLElement {

    id: any;
    styles: string = this.getAttribute('style') || '';
    className: string = this.getAttribute('class') || '';

    private static counter: number = 1;

    getAttrs(): string[] {
        return ['id', 'style', 'class'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    getObservedAttributes() {
        return this.getAttrs();
    }

    getCssFilesContent(): string[] {
        return [
            `.${this.id} {display: inline-block; > * {min-width: 250px; max-width: 250px; margin: 10px;}}`,
            this.styles ? `.${this.id} > * {${this.styles}}` : ''
        ];
    }

    connectedCallback() {
        let selector = this.constructor.prototype.selector;
        this.id = this.id || `${selector}-${BaseHtmlComponent.counter++}`;
        this.render();
    }

    getTextContent() {
        return (this.textContent || "").trim();
    }

    render() {
        let me = this;
        let activeId = document.activeElement?.id || '';

        Html.render(me);

        if (activeId === me.id) {
            me.focus();
        }

        this.afterRender();
    }

    afterRender() {}

    template() {
        return `<div>${this.constructor.prototype.selector} component works!</div>`;
    }

    getDetails() {
        let details = {};
        this.getAttrs().forEach(attr => {
            // @ts-ignore
            details[attr] = this[attr];
        });
        return details;
    }

    dispatch(element: HTMLElement, eventName: string) {
        element.addEventListener(eventName, (e: Event) => {
            if (e.target === element && e.type === eventName) {
                let event = new CustomEvent(eventName, {
                    ...e,
                    detail: this.getDetails()
                });
                this.dispatchEvent(event);
            }
        });
    }

    focus() {
        this.shadowRoot!.getElementById(this.id)!.focus();
    }
}
