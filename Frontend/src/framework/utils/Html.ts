import BaseHtmlComponent from "../components/BaseHtmlComponent";

export default class Html {
    static render(component: BaseHtmlComponent) {
        let target = component.shadowRoot;
        if (!target) return;
        let template = component.template();
        let style = document.createElement('style');
        let css: string = component.getCssFilesContent();

        // Remove comments, tabs, multiple spaces, new lines and so on
        let regex = /(\r\n\t|\n|\r\t|\s\s+)/gm;

        while (regex.test(css)) {
            css = css.replace(regex, '');
        }

        style.appendChild(document.createTextNode(css));
        target.innerHTML = template;
        target.appendChild(style);
    }
}
