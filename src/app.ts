//Project State Management
class ProjectState {
  private listeners: any[] = []
  private projects: any[] = []
  private static instance: ProjectState

  private constructor() {

  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn)
  }

  addProject(title: string, description: string, manday: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      manday: manday
    }
    this.projects.push(newProject)
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }
}

const projectState = ProjectState.getInstance()


//validation
interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validatableInput: Validatable) {
  let isValid = true
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid && validatableInput.value.length >= validatableInput.minLength
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid && validatableInput.value >= validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid && validatableInput.value <= validatableInput.max
  }
  return isValid
}

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

//Projectlist class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProject: any[]
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProject = []

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`

    projectState.addListener((projects: any[]) => {
      this.assignedProject = projects
      this.renderProjects()
    })
    this.attach()
    this.renderContent()
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    for (const prjItem of this.assignedProject) {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title
      listEl.appendChild(listItem)
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了したプロジェクト'
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element)
    
  }
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

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
