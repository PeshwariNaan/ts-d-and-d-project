export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  //This method is never instantiated so we can use the abstract keyword.
  //Because we have different types of elements, we are using generics to make the class more flexible.
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string //Optional parameters must come after required parameters.
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T; //T is the type of the host element so we can use it to cast the element.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //The '.content' property gives us access to the content of the template (or any html element).
    //The 'true' argument makes sure that all nested elements are also included.
    this.element = importedNode.firstElementChild as U;
    //We are casting the importedNode to a HTMLFormElement
    // because we know that the first element is a form element.
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    ); //The 'beforeend' argument will insert the element as the last child of the host element.
  }

  //We forse the child classes to implement these methods.
  abstract configure?(): void; //This method will be implemented in the child classes. It is optional because we don't need it in the ProjectInput class.
  abstract renderContent(): void;
}
