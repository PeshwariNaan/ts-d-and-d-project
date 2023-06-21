// / <reference path="models/drag-drop-interfaces.ts" />
// / <reference path="models/project-model.ts" />
// / <reference path="state/project-state.ts" />
// / <reference path="util/validation.ts" />
// / <reference path="decorators/autobind.ts" />
// / <reference path="components/project-input.ts" />
// / <reference path="components/project-list.ts" />

import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

// Need the three slashes to tell the compiler that this is a triple slash reference path.

//************ DRAG AND DROP INTEFACES ******************************/
// interface Draggable {
//   //We need two event listeners therefore we need two handlers.DragEvent is a built in type.
//   dragStartHandler(event: DragEvent): void;
//   dragEndHandler(event: DragEvent): void;
// }

// interface DragTarget {
//   dragOverHandler(event: DragEvent): void; //The thing that is being dragged over is a valid target.
//   dropHandler(event: DragEvent): void;
//   dragLeaveHandler(event: DragEvent): void;
// }

//************* PROJECT TYPE ************************** */

//Using namespaces - everything has to have a namespace with the same name to make it work

// enum ProjectStatus { //This is perfect for enums.
//   Active,
//   Finished,
// }

// class Project {
//   constructor(
//     //This is the shorthand way of creating properties in a class.
//     public id: string,
//     public title: string,
//     public description: string,
//     public people: number,
//     public status: ProjectStatus
//   ) {}
// }

//**********PROJECT STATE MANAGEMENT **********************/
// type Listener<T> = (items: T[]) => void;

// class State<T> {
//   protected listeners: Listener<T>[] = [];

//   addListener(listenerFn: Listener<T>) {
//     this.listeners.push(listenerFn);
//   }
// }

// class ProjectState extends State<Project> {
//   // private listeners: Listener[] = [];
//   private projects: any[] = [];
//   private static instance: ProjectState; //This is a static property that will hold the instance of the class.

//   private constructor() {
//     super();
//   }

//   static getInstance() {
//     //We only want to create one instance of the class. If one already exists, we want to return it.
//     if (this.instance) {
//       return this.instance;
//     }
//     this.instance = new ProjectState();
//     return this.instance;
//   }

//   //   addListener(listenerFn: Listener) {
//   //     this.listeners.push(listenerFn);
//   //   }

//   addProject(title: string, description: string, numOfPeople: number) {
//     const newProject = new Project(
//       Math.random().toString(),
//       title,
//       description,
//       numOfPeople,
//       ProjectStatus.Active
//     );
//     this.projects.push(newProject);
//     for (const listenerFn of this.listeners) {
//       //We are looping through the listeners array and calling each function.
//       listenerFn(this.projects.slice()); //We are passing a copy of the projects array to the listener function.
//       //NOTE: the spread operator compiles to the slice method.
//     }
//   }
//   moveProject(projectId: string, newStatus: ProjectStatus) {
//     const project = this.projects.find((prj) => prj.id === projectId);
//     if (project && project.status !== newStatus) {
//       //THis is to make sure that we are not updating the same status.
//       project.status = newStatus;
//       this.updateListeners();
//     }
//   }
//   private updateListeners() {
//     for (const listenerFn of this.listeners) {
//       //We are looping through the listeners array and calling each function.
//       listenerFn(this.projects.slice()); //We are passing a copy of the projects array to the listener function.
//       //NOTE: the spread operator compiles to the slice method.
//     }
//   }
// }

// const projectState = ProjectState.getInstance(); //Creating a global instance of the ProjectState class that can be used anywhere in the app.
// //  We use the getInstance method to create the instance and to make sure that only one instance is created.

//*****************************VALIDATION**************************/
// interface Validatable {
//   value: string | number;
//   required?: boolean; //The question mark makes the property optional.
//   minLength?: number;
//   maxLength?: number;
//   min?: number;
//   max?: number;
// }

// function validate(validatableInput: Validatable) {
//   let isValid = true;
//   if (validatableInput.required) {
//     isValid =
//       isValid && validatableInput.value.toString().trim().length !== 0;
//   }
//   if (
//     validatableInput.minLength != null && //We set this to null because we want to check if the property exists and is not 0
//     typeof validatableInput.value === 'string'
//   ) {
//     isValid =
//       isValid && validatableInput.value.length >= validatableInput.minLength;
//   }
//   if (
//     validatableInput.maxLength != null &&
//     typeof validatableInput.value === 'string'
//   ) {
//     isValid =
//       isValid && validatableInput.value.length <= validatableInput.maxLength;
//   }
//   if (
//     validatableInput.min != null &&
//     typeof validatableInput.value === 'number'
//   ) {
//     isValid = isValid && validatableInput.value >= validatableInput.min;
//   }
//   if (
//     validatableInput.max != null &&
//     typeof validatableInput.value === 'number'
//   ) {
//     isValid = isValid && validatableInput.value <= validatableInput.max;
//   }
//   return isValid;
// }

//*****************************AUTOBIND DECORATOR**************************/

// function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   const adjustedDescriptor: PropertyDescriptor = {
//     configurable: true,
//     get() {
//       // Getter method
//       const boundFunction = originalMethod.bind(this);
//       return boundFunction;
//     },
//   };
//   return adjustedDescriptor;
// }

///*****************************COMPONENT BASE CLASS**************************/
// Creating a general (Generic) class to cut down on code duplication in the ProjectInput and ProjectList classes.

// abstract class Component<T extends HTMLElement, U extends HTMLElement> {
//   //This method is never instantiated so we can use the abstract keyword.
//   //Because we have different types of elements, we are using generics to make the class more flexible.
//   templateElement: HTMLTemplateElement;
//   hostElement: T;
//   element: U;

//   constructor(
//     templateId: string,
//     hostElementId: string,
//     insertAtStart: boolean,
//     newElementId?: string //Optional parameters must come after required parameters.
//   ) {
//     this.templateElement = document.getElementById(
//       templateId
//     ) as HTMLTemplateElement;
//     this.hostElement = document.getElementById(hostElementId) as T; //T is the type of the host element so we can use it to cast the element.
//     const importedNode = document.importNode(
//       this.templateElement.content,
//       true
//     ); //The '.content' property gives us access to the content of the template (or any html element).
//     //The 'true' argument makes sure that all nested elements are also included.
//     this.element = importedNode.firstElementChild as U;
//     //We are casting the importedNode to a HTMLFormElement
//     // because we know that the first element is a form element.
//     if (newElementId) {
//       this.element.id = newElementId;
//     }
//     this.attach(insertAtStart);
//   }

//   private attach(insertAtBeginning: boolean) {
//     this.hostElement.insertAdjacentElement(
//       insertAtBeginning ? 'afterbegin' : 'beforeend',
//       this.element
//     ); //The 'beforeend' argument will insert the element as the last child of the host element.
//   }

//   //We forse the child classes to implement these methods.
//   abstract configure?(): void; //This method will be implemented in the child classes. It is optional because we don't need it in the ProjectInput class.
//   abstract renderContent(): void;
// }

//*************PROJECT ITEM CLASS *************************** */

// class ProjectItem
//   extends Component<HTMLUListElement, HTMLLIElement>
//   implements Draggable
// {
//   //We are implementing the Draggable interface so we can use the drag and drop functionality.
//   //We have to implement all the methods from the interface.
//   get persons() {
//     if (this.project.people === 1) {
//       return '1 person';
//     } else {
//       return `${this.project.people} persons`;
//     }
//   }

//   constructor(hostId: string, private project: Project) {
//     super('single-project', hostId, false, project.id);
//     this.configure();
//     this.renderContent();
//   }

//   @autobind
//   dragStartHandler(event: DragEvent) {
//     event.dataTransfer!.setData('text/plain', this.project.id); //The first argument is the data type and the second is the data itself.
//     event.dataTransfer!.effectAllowed = 'move'; //This is the cursor that will be displayed when we drag the element.
//   }

//   dragEndHandler(_: DragEvent) {
//     console.log('DragEnd');
//   }

//   configure() {
//     this.element.addEventListener('dragstart', this.dragStartHandler); //'dragstart' is a built in event.
//     this.element.addEventListener('dragend', this.dragEndHandler);
//   }

//   renderContent() {
//     this.element.querySelector('h2')!.textContent = this.project.title;
//     this.element.querySelector('h3')!.textContent =
//       this.persons + ' assigned'; //This calls the getter method.
//     this.element.querySelector('p')!.textContent = this.project.description;
//   }
// }

//**********PROJECT LIST CLASS ************************ */

// class ProjectList
//   extends Component<HTMLDivElement, HTMLElement>
//   implements DragTarget
// {
//   //   templateElement: HTMLTemplateElement;
//   //   hostElement: HTMLDivElement;
//   //   element: HTMLElement; //Thisis a section element but there is no type for it in TS. We can use HTMLElement instead.
//   assignedProjects: Project[];

//   constructor(private type: 'active' | 'finished') {
//     super('project-list', 'app', false, `${type}-projects`); //We are passing the type of the project list to the super class.
//     // this.templateElement = document.getElementById(
//     //   'project-list'
//     // ) as HTMLTemplateElement;
//     // this.hostElement = document.getElementById('app') as HTMLDivElement;

//     this.assignedProjects = [];

//     // const importedNode = document.importNode(
//     //   this.templateElement.content,
//     //   true
//     // ); //The '.content' property gives us access to the content of the template (or any html element).
//     //The 'true' argument makes sure that all nested elements are also included.
//     //this.element = importedNode.firstElementChild as HTMLElement;
//     //We are casting the importedNode to a HTMLFormElement
//     // because we know that the first element is a form element.
//     //this.element.id = `${type}-projects`;
//     // Before we attach we want to talk to the state and add a listener.
//     // projectState.addListener((projects: Project[]) => {
//     //   //We are adding a listener to the projectState instance.
//     //   //The listener will be called whenever the projects array changes.
//     //   const relevantProjects = projects.filter((prj) => {
//     //     //We get a copy of the projects array from the state.
//     //     if (this.type === 'active') {
//     //       return prj.status === ProjectStatus.Active;
//     //     }
//     //     return prj.status === ProjectStatus.Finished;
//     //   });

//     //   this.assignedProjects = relevantProjects;
//     //   this.renderProjects();
//     // });

//     //this.attach();
//     this.configure();
//     this.renderContent();
//   }

//   @autobind
//   dragOverHandler(event: DragEvent) {
//     if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
//       event.preventDefault(); //This is needed to allow the drop event.
//       const listEl = this.element.querySelector('ul')!;
//       listEl.classList.add('droppable');
//     }
//   }

//   @autobind
//   dropHandler(event: DragEvent) {
//     const prjId = event.dataTransfer!.getData('text/plain'); //This is the id of the project that we are dragging.
//     projectState.moveProject(
//       prjId,
//       this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
//     );
//   }

//   @autobind
//   dragLeaveHandler(_: DragEvent) {
//     const listEl = this.element.querySelector('ul')!;
//     listEl.classList.remove('droppable');
//   }

//   renderProjects() {
//     const listEl = document.getElementById(
//       `${this.type}-projects-list`
//     )! as HTMLUListElement; // casting to HTMLUListElement because we know that the element is a ul element.
//     listEl.innerHTML = ''; //We are clearing the list before we render it again. Not ideal but it works for now.
//     for (const prjItem of this.assignedProjects) {
//       //   const listItem = document.createElement('li');
//       //   listItem.textContent = prjItem.title;
//       //listEl.appendChild(listItem);
//       new ProjectItem(this.element.querySelector('ul')!.id, prjItem); //We want the id of the ul element, not the li element.
//     }
//   }

//   configure() {
//     this.element.addEventListener('dragover', this.dragOverHandler); //'dragover' is a built in event.
//     this.element.addEventListener('dragleave', this.dragLeaveHandler);
//     this.element.addEventListener('drop', this.dropHandler);
//     //This was moved from the constructor to here and we call it in the constructor.
//     projectState.addListener((projects: Project[]) => {
//       //We are adding a listener to the projectState instance.
//       //The listener will be called whenever the projects array changes.
//       const relevantProjects = projects.filter((prj) => {
//         //We get a copy of the projects array from the state.
//         if (this.type === 'active') {
//           return prj.status === ProjectStatus.Active;
//         }
//         return prj.status === ProjectStatus.Finished;
//       });

//       this.assignedProjects = relevantProjects;
//       this.renderProjects();
//     });
//   }

//   renderContent() {
//     const listId = `${this.type}-projects-list`;
//     this.element.querySelector('ul')!.id = listId; //We are adding the id to the ul element.
//     this.element.querySelector('h2')!.textContent =
//       this.type.toUpperCase() + 'PROJECTS'; //We are adding the text to the h2 element.
//   }

//   //   private attach() {
//   //     this.hostElement.insertAdjacentElement('beforeend', this.element); //The 'beforeend' argument will insert the element as the last child of the host element.
//   //   }
// }

//******PROJECT INPUT CLASS ********************/
// class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
//   //   templateElement: HTMLTemplateElement; // We are able to access DOM elements because we added dom to libs in tsconfig.json
//   //   hostElement: HTMLDivElement;
//   //   element: HTMLFormElement;
//   titleInputElement: HTMLInputElement; //Input element fields to give us access to the input values
//   descriptionInputElement: HTMLInputElement;
//   peopleInputElement: HTMLInputElement;

//   constructor() {
//     super('project-input', 'app', true, 'user-input'); //We are passing the type of the project list to the super class.
//     // this.templateElement = document.getElementById(
//     //   'project-input'
//     // ) as HTMLTemplateElement;
//     // this.hostElement = document.getElementById('app') as HTMLDivElement;

//     // const importedNode = document.importNode(
//     //   this.templateElement.content,
//     //   true
//     // ); //The '.content' property gives us access to the content of the template (or any html element).
//     // //The 'true' argument makes sure that all nested elements are also included.
//     // this.element = importedNode.firstElementChild as HTMLFormElement;
//     // //We are casting the importedNode to a HTMLFormElement
//     // // because we know that the first element is a form element.
//     // this.element.id = 'user-input';

//     //*******Input Elements **********/

//     this.titleInputElement = this.element.querySelector(
//       '#title'
//     ) as HTMLInputElement; // Again we have to cast to HTMLInputElement.
//     this.descriptionInputElement = this.element.querySelector(
//       '#description'
//     ) as HTMLInputElement;
//     this.peopleInputElement = this.element.querySelector(
//       '#people'
//     ) as HTMLInputElement;

//     this.configure();

//     // this.attach(); //This method will attach the importedNode to the hostElement - The div with the id of 'app'. The method is defined below.
//   }

//   @autobind
//   private gatherUserInput(): [string, string, number] | void {
//     const enteredTitle = this.titleInputElement.value; //We are getting the value of the input element.
//     const enteredDescription = this.descriptionInputElement.value;
//     const enteredPeople = this.peopleInputElement.value;

//     const titleValidatable: Validatable = {
//       value: enteredTitle,
//       required: true,
//       minLength: 5,
//     };
//     const descriptionValidatable: Validatable = {
//       value: enteredDescription,
//       required: true,
//       minLength: 5,
//     };
//     const peopleValidatable: Validatable = {
//       value: +enteredPeople,
//       required: true,
//       min: 1,
//       max: 5,
//     };

//     if (
//       !validate(titleValidatable) ||
//       !validate(descriptionValidatable) ||
//       !validate(peopleValidatable)
//     ) {
//       alert('Ah Oh - There appears to be a mistake! Please try again');
//       return;
//     } else {
//       return [enteredTitle, enteredDescription, +enteredPeople];
//     }
//   }

//   private clearInputs() {
//     this.titleInputElement.value = ''; //We are clearing the input fields.
//     this.descriptionInputElement.value = '';
//     this.peopleInputElement.value = '';
//   }

//   @autobind
//   private submitHandler(event: Event) {
//     event.preventDefault();
//     const userInput = this.gatherUserInput();
//     if (Array.isArray(userInput)) {
//       const [title, desc, people] = userInput;
//       projectState.addProject(title, desc, people);
//       this.clearInputs();
//     }
//   }
//   renderContent(): void {
//     //This method is defined in the abstract class.
//   }

//   configure() {
//     this.element.addEventListener('submit', this.submitHandler);
//     //We are binding 'this' to the submitHandler method so that we can access the 'this' keyword in the submitHandler method.
//     //If we don't bind 'this' to the submitHandler method, the 'this' keyword will refer to the element that triggered the event.
//     //This can be handled with a decorator which we did implement in the autobind decorator above
//   }

//   //   private attach() {
//   //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
//   //   }
// }

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
//End of namespace
