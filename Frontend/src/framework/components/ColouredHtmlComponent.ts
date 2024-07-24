import BaseHtmlComponent from "./BaseHtmlComponent";

export default class ColouredHtmlComponent extends BaseHtmlComponent {

    color: string = this.getAttribute('color') || 'primary';

    getAttrs() {
        return [
            ...super.getAttrs(),
            'color'
        ]
    }

    getCssFilesContent(): string[] {
        return [
            ...super.getCssFilesContent(),
            `:host {--color: ${this.getColorVariable()};}`
        ];
    }

    getColorVariable() {
        if (this.color) {
            return `var(--${this.color}-color)`;
        }
        return 'var(--primary-color)';
    }
}
