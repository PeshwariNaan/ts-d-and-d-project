// / <reference path="base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../models/project-model.ts" />
// / <reference path="../models/drag-drop-interfaces.ts" />

import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { Draggable } from '../models/drag-drop-interfaces';
import { Project } from '../models/project-model';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  //We are implementing the Draggable interface so we can use the drag and drop functionality.
  //We have to implement all the methods from the interface.
  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id);
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id); //The first argument is the data type and the second is the data itself.
    event.dataTransfer!.effectAllowed = 'move'; //This is the cursor that will be displayed when we drag the element.
  }

  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler); //'dragstart' is a built in event.
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'; //This calls the getter method.
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
