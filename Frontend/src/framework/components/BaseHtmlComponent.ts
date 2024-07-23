import Html from "../utils/Html";

export default class BaseHtmlComponent extends HTMLElement {

    attrs = ['id', 'className']
    id: any;
    className: string;
    ignoreChange: boolean = false;
    static counter: number = 1;

    constructor() {
        super();
        this.className = "";
        this.ignoreChange = true;
        this.attachShadow({mode: 'open'});
        this.attrs.forEach(attr => {
            if (!Object.getOwnPropertyDescriptor(this.constructor.prototype, attr)) {
                Object.defineProperty(this.constructor.prototype, attr, {
                    get() {
                        return this.getAttribute(attr);
                    },
                    set(newValue) {
                        this.setAttribute(attr, newValue);
                    },
                });
            }
        });
    }

    getObservedAttributes() {
        return this.attrs;
    }

    getCssFilesContent() {
        let css: string[] = this.constructor.prototype.css || [];
        return css.join(' ');
    }

    connectedCallback() {
        let selector = this.constructor.prototype.selector;
        this.id = this.id || `${selector}-${BaseHtmlComponent.counter++}`;
        this.render();
    }

    attributesChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!this.ignoreChange) this.render();
    }

    getTextContent() {
        return this.textContent;
    }

    render() {
        let me = this;
        Html.render(me);
        this.ignoreChange = false;
    }

    template() {
        return `<div>${this.constructor.prototype.selector} component works!</div>`;
    }

    getDetails() {
        let details = {};
        this.attrs.forEach(attr => {
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

    fireHandler(eventName: string, event: Event) {
        let handler = "on" + eventName.charAt(0).toUpperCase() + eventName.substring(1);
        // @ts-ignore
        if (this[handler] && typeof this[handler] == "function") {
            // @ts-ignore
            this[handler](event);
        }
    }
}
