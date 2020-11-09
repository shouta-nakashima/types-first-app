//project type
enum ProjectStatus {
  Active,Finished
}

class Project {
  constructor(public id: string, public title: string, public description: string, public manday: number, public status: ProjectStatus) {

  }
}

//Project State Management
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  

  addProject(title: string, description: string, manday: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active
    )
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

//Component class
abstract class Component<T extends HTMLElement,U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostElementId: string,insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId
    }
    this.attach(insertAtStart)
  }
  abstract configure(): void
  abstract renderContent(): void

  private attach(insertAtBiginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBiginning ? 'afterbegin' : 'beforeend', this.element)
  }
}

//Projectlist class
class ProjectList extends Component<HTMLDivElement,HTMLElement>{
  assignedProject: Project[]
  constructor(private type: 'active' | 'finished') {
    super("project-list","app",false,`${type}-projects`)
    this.assignedProject = []

    this.configure()
    this.renderContent()
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.assignedProject = relevantProjects
      this.renderProjects()
    })
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了したプロジェクト'
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProject) {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title
      listEl.appendChild(listItem)
    }
  }
}

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
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

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
