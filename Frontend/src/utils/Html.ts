import BaseHtmlComponent from "../components/BaseHtmlComponent";

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

        style.appendChild(document.createTextNode(css));
        target.innerHTML = template;
        target.appendChild(style);
    }
}
