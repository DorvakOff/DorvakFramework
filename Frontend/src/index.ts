import DvkButton from './components/buttons/DvkButton';
import DvkTextInput from "./components/inputs/DvkTextInput";
import {DvkPasswordInput} from "./components/inputs/DvkPasswordInput";
import {DvkDatePickerInput} from "./components/inputs/DvkDatePickerInput";

const components = [
    DvkButton,
    DvkTextInput,
    DvkPasswordInput,
    DvkDatePickerInput
];


components.forEach(component => {
    // @ts-ignore
    customElements.define(component.prototype['selector'], component);
});

// @ts-ignore
console.log('Custom elements defined:', components.map(c => c.prototype['selector']).join(', '));
