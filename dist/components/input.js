var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base.js';
import { validate } from '../util/validate.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
// ProjectInput class
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.mandayElement = this.element.querySelector("#manday");
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserinput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredManday = this.mandayElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const mandayValidatable = {
            value: +enteredManday,
            required: true,
            min: 1,
            max: 1000
        };
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(mandayValidatable)) {
            alert('入力が正しくありません。');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredManday];
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.mandayElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userinput = this.gatherUserinput();
        if (Array.isArray(userinput)) {
            const [title, description, manday] = userinput;
            projectState.addProject(title, description, manday);
            this.clearInput();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
