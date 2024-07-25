import DvkTextInput from "./DvkTextInput";
import Component from "../../annotations/Component";

@Component({
    selector: 'dvk-combo-box-input',
})
export class DvkComboBoxInput extends DvkTextInput {

    type: string = "text";
    icon: string = "fa fa-chevron-down";
    readonly: boolean = true;
    options: { value: any, label: string }[] = JSON.parse(this.getAttribute('options') || '[]');
    multiple: boolean = this.getAttribute('multiple') === 'true';

    popupOpen: boolean = false;

    getAttrs(): string[] {
        return [
            ...super.getAttrs(),
            'options',
            'multiple'
        ]
    }

    afterRender() {
        super.afterRender();
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target as Node)) {
                this.popupOpen = false;
                this.render();
            }
        });

        this.shadowRoot!.querySelector('.input')!.addEventListener('click', () => {
            if (this.disabled) {
                return;
            }

            this.onIconClick();
        });

        let body = this.shadowRoot!.querySelector('.combo-box');
        if (body) {
            body.addEventListener('click', (e) => {
                let target = e.target as HTMLElement;
                if (target.classList.contains('combo-box-option')) {
                    let values = this.multiple ? this.value.split(',') : [];
                    let myValue = target.getAttribute('data-value') || '';
                    if (values.includes(myValue)) {
                        values = values.filter(v => v !== myValue);
                    } else {
                        values.push(myValue);
                    }
                    this.value = values.filter(v => v).join(',');
                    this.popupOpen = false;

                    if (this.multiple) {
                        this.popupOpen = true;
                        e.stopPropagation()
                    }

                    this.render();
                }
            });
        }
    }

    isSelected(value: any): boolean {
        if (this.multiple) {
            return this.value.split(',').includes(value);
        }
        return this.value === value;
    }

    template(): string {
        return `
            <div class="dvk-combo-box-input">
                ${super.template()}
                ${this.popupOpen ? 
                    `<div class="combo-box">
                        ${this.options.map(option => `
                            <div class="combo-box-option ${this.isSelected(option.value) ? 'selected' : ''}" data-value="${option.value}">
                                ${option.label}
                            </div>
                        `).join('')}
                    </div>` : ''}
            </div>
        `;
    }

    getCssFilesContent(): string[] {
        return [
            ...super.getCssFilesContent(),
            `
                .dvk-combo-box-input {
                    position: relative;
                    
                    &:hover, input:hover {
                        cursor: pointer;
                    }
                    
                    .combo-box {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: var(--white-color);
                        border: 1px solid var(--gray-color);
                        border-top: none;
                        border-radius: 0 0 5px 5px;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                        
                        .combo-box-option {
                            padding: 5px 10px;
                            cursor: pointer;
                            
                            &:hover, &.selected {
                                background-color: var(--gray-color);
                            }
                            
                            &.selected:after {
                                content: '\\f00c';
                                font-family: 'FontAwesome';
                                color: var(--primary-color);
                                position: absolute;
                                right: 10px;
                            }
                        }   
                    }
                }
            `
        ]
    }

    onIconClick() {
        if (this.popupOpen) {
            return;
        }
        this.popupOpen = true;
        this.render();
    }
}
