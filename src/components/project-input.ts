// / <reference path="base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../util/validation.ts" />
// / <reference path="../state/project-state.ts" />
import { Component } from './base-component';
import { Validatable, validate } from '../util/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  //   templateElement: HTMLTemplateElement; // We are able to access DOM elements because we added dom to libs in tsconfig.json
  //   hostElement: HTMLDivElement;
  //   element: HTMLFormElement;
  titleInputElement: HTMLInputElement; //Input element fields to give us access to the input values
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input'); //We are passing the type of the project list to the super class.
    // this.templateElement = document.getElementById(
    //   'project-input'
    // ) as HTMLTemplateElement;
    // this.hostElement = document.getElementById('app') as HTMLDivElement;

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // ); //The '.content' property gives us access to the content of the template (or any html element).
    // //The 'true' argument makes sure that all nested elements are also included.
    // this.element = importedNode.firstElementChild as HTMLFormElement;
    // //We are casting the importedNode to a HTMLFormElement
    // // because we know that the first element is a form element.
    // this.element.id = 'user-input';

    //*******Input Elements **********/

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement; // Again we have to cast to HTMLInputElement.
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();

    // this.attach(); //This method will attach the importedNode to the hostElement - The div with the id of 'app'. The method is defined below.
  }

  @autobind
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value; //We are getting the value of the input element.
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Ah Oh - There appears to be a mistake! Please try again');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''; //We are clearing the input fields.
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
  renderContent(): void {
    //This method is defined in the abstract class.
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    //We are binding 'this' to the submitHandler method so that we can access the 'this' keyword in the submitHandler method.
    //If we don't bind 'this' to the submitHandler method, the 'this' keyword will refer to the element that triggered the event.
    //This can be handled with a decorator which we did implement in the autobind decorator above
  }

  //   private attach() {
  //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
  //   }
}
