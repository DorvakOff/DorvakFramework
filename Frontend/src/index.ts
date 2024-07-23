import DvkButton from './framework/components/DvkButton/DvkButton';

const components = [
    DvkButton
];


components.forEach(component => {
    // @ts-ignore
    customElements.define(component.prototype['selector'], component);
});

// @ts-ignore
console.log('Custom elements defined:', components.map(c => c.prototype['selector']).join(', '));
