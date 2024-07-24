import DvkButton from './components/buttons/DvkButton';
import DvkTextInput from "./components/inputs/DvkTextInput";

const components = [
    DvkButton,
    DvkTextInput
];


components.forEach(component => {
    // @ts-ignore
    customElements.define(component.prototype['selector'], component);
});

// @ts-ignore
console.log('Custom elements defined:', components.map(c => c.prototype['selector']).join(', '));
