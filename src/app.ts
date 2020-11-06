//autobind decoretor
function autobind(target: any, methodName: string, descripter: PropertyDescriptor) {
  const originalMethods = descripter.value
  const abjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethods.bind(this)
      return boundFn;
    }
  }
  return abjDescriptor
}

// ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input"

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.mandayElement = this.element.querySelector("#manday") as HTMLInputElement

    this.configure();
    this.attach();
  }

  private gatherUserinput() :[string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredManday = this.mandayElement.value
    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredManday.trim().length === 0) {
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
      console.log(title, description,manday);
      this.clearInput()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
