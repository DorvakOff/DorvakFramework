export default function Component(config: {selector: string, css?: string[]}) {
    return function (target: Function) {
        target.prototype.selector = config.selector;
        target.prototype.css = config.css;
    };
}
