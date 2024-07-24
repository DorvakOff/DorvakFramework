export default function Component(config: {selector: string}) {
    return function (target: Function) {
        target.prototype.selector = config.selector;
    };
}
