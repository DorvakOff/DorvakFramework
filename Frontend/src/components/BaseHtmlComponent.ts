import Html from "../utils/Html";

export default class BaseHtmlComponent extends HTMLElement {

    id: any;
    styles: string = this.getAttribute('style') || '';
    className: string = this.getAttribute('class') || '';
    disabled: boolean = this.hasAttribute('disabled');

    protected touched: boolean = false;
    private static counter: number = 1;

    getAttrs(): string[] {
        return ['id', 'style', 'class', 'disabled'];
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
            `.${this.id} {
                display: inline-block; 
                > * {
                    min-width: 250px;
                    margin: 10px;
                }
            }`,
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
        this.touched = true;
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
        this.shadowRoot!.getElementById(this.id)?.focus();
    }

    fireHandler(eventName: string, event: Event) {
        let handler = "on" + eventName;
        let handlerFunction = this.getAttribute(handler);
        if (handlerFunction) {
            let func = new Function('event', handlerFunction);
            func(event);
        }
    }
}
