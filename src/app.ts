class ProjectInput {
  templateElement: HTMLTemplateElement; // We are able to access DOM elements because we added dom to libs in tsconfig.json
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement; //Input element fields to give us access to the input values
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //The '.content' property gives us access to the content of the template (or any html element).
    //The 'true' argument makes sure that all nested elements are also included.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //We are casting the importedNode to a HTMLFormElement
    // because we know that the first element is a form element.
    this.element.id = 'user-input';

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

    this.attach(); //This method will attach the importedNode to the hostElement - The div with the id of 'app'. The method is defined below.
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
    //We are binding 'this' to the submitHandler method so that we can access the 'this' keyword in the submitHandler method.
    //If we don't bind 'this' to the submitHandler method, the 'this' keyword will refer to the element that triggered the event.
    //This can be handled with a decorator.
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projInput = new ProjectInput();
