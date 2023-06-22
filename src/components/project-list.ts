// / <reference path="base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../state/project-state.ts" />
// / <reference path="../models/drag-drop-interfaces.ts" />

import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project-model';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';
import { DragTarget } from '../models/drag-drop-interfaces';

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  //   templateElement: HTMLTemplateElement;
  //   hostElement: HTMLDivElement;
  //   element: HTMLElement; //Thisis a section element but there is no type for it in TS. We can use HTMLElement instead.
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`); //We are passing the type of the project list to the super class.
    // this.templateElement = document.getElementById(
    //   'project-list'
    // ) as HTMLTemplateElement;
    // this.hostElement = document.getElementById('app') as HTMLDivElement;

    this.assignedProjects = [];

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // ); //The '.content' property gives us access to the content of the template (or any html element).
    //The 'true' argument makes sure that all nested elements are also included.
    //this.element = importedNode.firstElementChild as HTMLElement;
    //We are casting the importedNode to a HTMLFormElement
    // because we know that the first element is a form element.
    //this.element.id = `${type}-projects`;
    // Before we attach we want to talk to the state and add a listener.
    // projectState.addListener((projects: Project[]) => {
    //   //We are adding a listener to the projectState instance.
    //   //The listener will be called whenever the projects array changes.
    //   const relevantProjects = projects.filter((prj) => {
    //     //We get a copy of the projects array from the state.
    //     if (this.type === 'active') {
    //       return prj.status === ProjectStatus.Active;
    //     }
    //     return prj.status === ProjectStatus.Finished;
    //   });

    //   this.assignedProjects = relevantProjects;
    //   this.renderProjects();
    // });

    //this.attach();
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault(); //This is needed to allow the drop event.
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain'); //This is the id of the project that we are dragging.
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement; // casting to HTMLUListElement because we know that the element is a ul element.
    listEl.innerHTML = ''; //We are clearing the list before we render it again. Not ideal but it works for now.
    for (const prjItem of this.assignedProjects) {
      //   const listItem = document.createElement('li');
      //   listItem.textContent = prjItem.title;
      //listEl.appendChild(listItem);
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem); //We want the id of the ul element, not the li element.
    }
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler); //'dragover' is a built in event.
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    //This was moved from the constructor to here and we call it in the constructor.
    projectState.addListener((projects: Project[]) => {
      //We are adding a listener to the projectState instance.
      //The listener will be called whenever the projects array changes.
      const relevantProjects = projects.filter((prj) => {
        //We get a copy of the projects array from the state.
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId; //We are adding the id to the ul element.
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS'; //We are adding the text to the h2 element.
  }

  //   private attach() {
  //     this.hostElement.insertAdjacentElement('beforeend', this.element); //The 'beforeend' argument will insert the element as the last child of the host element.
  //   }
}
