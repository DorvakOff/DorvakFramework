import Component from "../../annotations/Component";
import ColouredHtmlComponent from "../ColouredHtmlComponent";

@Component({
    selector: 'dvk-button'
})
export default class DvkButton extends ColouredHtmlComponent {

    getAttrs(): string[] {
        return [
            ...super.getAttrs(),
            'outline'
        ]
    }

    outline: boolean = this.getAttribute('outline') === 'true';

    template(): string {
        let classes = [];
        if (this.outline) {
            classes.push('outline');
        }
        return `
            <button class="${classes.join(' ')}" disabled="${this.disabled}">
                ${this.getTextContent()}
            </button>
        `;
    }

    getCssFilesContent(): string[] {
        return [
            ...super.getCssFilesContent(),
            `
            button {
                background-color: var(--color);
                border: none;
                color: var(--white-color);
                height: 50px;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition: 0.3s ease-in-out;
                border-radius: 5px;
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
                border: 2px solid var(--color);
                
                &[disabled="true"], &[disabled="true"]:hover {
                    box-shadow: none;
                    cursor: not-allowed;
                    filter: brightness(0.8);
                }
                
                &.outline {
                    background-color: transparent;
                    color: var(--color);
                    
                    &:hover {
                        background-color: var(--color);
                        color: var(--white-color);
                    }
                }
                
                &:hover {
                    cursor: pointer;
                    filter: brightness(1.3);
                    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
                }
            }
        `];
    }
}
