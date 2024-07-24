import BaseHtmlComponent from "../BaseHtmlComponent";
import Component from "../../annotations/Component";

@Component({
    selector: 'dvk-text-input'
})
export default class DvkTextInput extends BaseHtmlComponent {

    getAttrs(): string[] {
        return [
            ...super.getAttrs(),
            'placeholder',
            'required',
            'value',
            'type'
        ]
    }

    placeholder: string = this.getAttribute('placeholder') || '';
    required: boolean = this.hasAttribute('required') || false;
    value: string = this.getAttribute('value') || '';
    type: string = this.getAttribute('type') || 'text';

    template(): string {
        let classes = [];

        if (!this.isContentValid()) {
            classes.push('invalid');
        }

        return `
            <div>
                <label for="${this.id}-inputid">
                    ${this.getTextContent()}&nbsp;
                    ${this.required ? '<span style="color: var(--danger-color);">*</span>' : ''}
                </label>
                <input type="${this.type}"
                    class="${classes.join(' ')}" 
                    placeholder="${this.placeholder}" 
                    id="${this.id}-inputid" 
                    value="${this.value}"
                    required="${this.required}"
                >
            </div>
        `;
    }

    getCssFilesContent(): string[] {
        return [...super.getCssFilesContent(), `
            div {
                display: flex;
                flex-direction: column;
                margin: 10px 0;
                gap: 5px;
                
                label {
                    margin-bottom: 5px;
                }
                
                input {
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    
                    &.invalid {
                        outline: 2px solid var(--danger-color);    
                    }
                }
            }
        `];
    }

    afterRender() {
        this.shadowRoot!.querySelector('input')!.addEventListener('change', (e) => {
            let target = e.target as HTMLInputElement;
            target.classList.remove('invalid');

            this.value = target.value;
            this.render();
        });
    }

    isContentValid(): boolean {
        return !(this.required && !this.value);
    }
}
