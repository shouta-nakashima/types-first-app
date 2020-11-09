import { Component } from './base.js';
import { Validatable, validate } from '../util/validate.js'
import { autobind } from '../decorators/autobind.js'
import {projectState} from '../state/project-state.js'
// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayElement: HTMLInputElement;
  constructor() {
    super("project-input","app",true,"user-input")
    
    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.mandayElement = this.element.querySelector("#manday") as HTMLInputElement

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  private gatherUserinput() :[string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredManday = this.mandayElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000
    }
    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(mandayValidatable)) {
      alert('入力が正しくありません。')
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredManday]
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = ""
    this.mandayElement.value = ""
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userinput = this.gatherUserinput()
    if (Array.isArray(userinput)) {
      const [title, description, manday] = userinput
      projectState.addProject(title,description,manday)
      this.clearInput()
    }
  }
}
