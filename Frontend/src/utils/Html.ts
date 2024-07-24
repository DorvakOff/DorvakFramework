import BaseHtmlComponent from "../components/BaseHtmlComponent";

const fontAwesome = './fontawesome-6.5.2/css/all.min.css';

export default class Html {
    static render(component: BaseHtmlComponent) {
        let target = component.shadowRoot;
        if (!target) return;
        let template = `<div class="${component.id}">${component.template()}</div>`;
        let style = document.createElement('style');
        let css: string = component.getCssFilesContent().join(' ');

        // Remove comments, tabs, multiple spaces, new lines and so on
        let regex = /(\r\n\t|\n|\r\t|\s\s+)/gm;

        while (regex.test(css)) {
            css = css.replace(regex, '');
        }

        while (regex.test(template)) {
            template = template.replace(regex, '');
        }

        target.innerHTML = '<link rel="stylesheet" href="' + fontAwesome + '">';
        target.appendChild(document.createRange().createContextualFragment(template));
        style.appendChild(document.createTextNode(css));
        target.appendChild(style);
    }
}
