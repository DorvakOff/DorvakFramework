import DvkTextInput from "./DvkTextInput";
import Component from "../../annotations/Component";

@Component({
    selector: 'dvk-password-input',
})
export class DvkPasswordInput extends DvkTextInput {

    showPassword: boolean = false;
    type: string = "password";
    icon: string = "fa-regular fa-eye-slash";

    onIconClick() {
        this.showPassword = !this.showPassword;
        this.type = this.showPassword ? "text" : "password";
        this.icon = this.showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
        this.render();
    }
}
