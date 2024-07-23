import Component from "../../annotations/Component";
import BaseHtmlComponent from "../BaseHtmlComponent";

@Component({
    selector: 'dvk-button'
})
export default class DvkButton extends BaseHtmlComponent {

    button!: HTMLElement;

    template(): string {
        return `<button>${this.getTextContent()}</button>`;
    }

    getCssFilesContent(): string {
        return `
            button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition: 0.1s ease-in-out;
              
                &:hover {
                    background-color: #45a049;
                    cursor: pointer;
                }
            }
        `
    }

    render() {
        super.render();

        this.button = this.shadowRoot!.querySelector('button')!;
    }
}
