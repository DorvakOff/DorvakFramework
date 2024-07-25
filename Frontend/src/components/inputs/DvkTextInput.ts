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
            'type',
            'icon'
        ]
    }

    placeholder: string = this.getAttribute('placeholder') || '';
    required: boolean = this.hasAttribute('required');
    value: string = this.getAttribute('value') || '';
    type: string = this.getAttribute('type') || 'text';
    icon: string = this.getAttribute('icon') || '';
    readonly: boolean = this.hasAttribute('readonly') || this.disabled;

    template(): string {
        let classes = [];

        if (!this.isContentValid()) {
            classes.push('invalid');
        }

        if (this.disabled) {
            classes.push('disabled');
        }

        let additionalAttrs = new Map<string, string>();
        if (this.readonly) {
            additionalAttrs.set('readonly', 'true');
        }

        if (this.disabled) {
            additionalAttrs.set('disabled', 'true');
        }

        return `
            <div>
                <label for="${this.id}-inputid">
                    ${this.getTextContent()}&nbsp;
                    ${this.required ? '<span style="color: var(--danger-color);">*</span>' : ''}
                </label>
                <div class="input ${classes.join(' ')}">
                    <input type="${this.type}"
                        class="${classes.join(' ')}" 
                        placeholder="${this.placeholder}" 
                        id="${this.id}-inputid" 
                        value="${this.value}"
                        required="${this.required}"
                        ${additionalAttrs.size > 0 ? [...additionalAttrs].map(([key, value]) => `${key}="${value}"`).join(' ') : ''}
                    >
                    ${this.icon ? `<i class="${this.icon}"></i>` : ''}
                </div>
            </div>
        `;
    }

    getCssFilesContent(): string[] {
        return [...super.getCssFilesContent(), `
            div {
                display: flex;
                flex-direction: column;
                
                label {
                    margin-bottom: 5px;
                }
                
                .input {                
                    input {
                        width: 100%;
                        border: none;
                        background: transparent;
                        
                        &:focus {
                            outline: none;
                        }
                    }
                
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    flex-direction: row;
                    
                    i {
                        color: var(--primary-color);
                        
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    
                    &.disabled {
                        cursor: not-allowed;
                    
                        input, input::placeholder, i {
                            color: #ccc;
                            cursor: not-allowed;
                        }
                    }
                    
                    &:focus-within {
                        outline: 2px solid var(--primary-color);
                    }
                    
                    &.invalid {
                        outline: 2px solid var(--danger-color);    
                    }
                }
            }
        `];
    }

    afterRender() {
        ['change'].forEach((event) => {
            this.shadowRoot!.querySelector('input')!.addEventListener(event, (e) => {
                let target = e.target as HTMLInputElement;

                if (this.value === target.value) {
                    return;
                }

                this.value = target.value;
                setTimeout(() => this.render(), 100);
            });
        });

        if (!this.icon) {
            return;
        }

        this.shadowRoot!.querySelector('i')!.addEventListener('click', (e) => {
            if (this.disabled) {
                return;
            }

            this.onIconClick(e);
        });
    }

    isContentValid(): boolean {
        if (!this.touched) {
            return true;
        }

        if (this.disabled) {
            return true;
        }
        return !(this.required && !this.value);
    }

    onIconClick(e: Event) {
        this.fireHandler('iconclick', e);
    }
}
