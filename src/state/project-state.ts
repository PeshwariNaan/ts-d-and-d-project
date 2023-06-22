import { Project, ProjectStatus } from '../models/project-model';

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  // private listeners: Listener[] = [];
  private projects: any[] = [];
  private static instance: ProjectState; //This is a static property that will hold the instance of the class.

  private constructor() {
    super();
  }

  static getInstance() {
    //We only want to create one instance of the class. If one already exists, we want to return it.
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  //   addListener(listenerFn: Listener) {
  //     this.listeners.push(listenerFn);
  //   }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      //We are looping through the listeners array and calling each function.
      listenerFn(this.projects.slice()); //We are passing a copy of the projects array to the listener function.
      //NOTE: the spread operator compiles to the slice method.
    }
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      //THis is to make sure that we are not updating the same status.
      project.status = newStatus;
      this.updateListeners();
    }
  }
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      //We are looping through the listeners array and calling each function.
      listenerFn(this.projects.slice()); //We are passing a copy of the projects array to the listener function.
      //NOTE: the spread operator compiles to the slice method.
    }
  }
}

export const projectState = ProjectState.getInstance(); //Creating a global instance of the ProjectState class that can be used anywhere in the app.
//  We use the getInstance method to create the instance and to make sure that only one instance is created.
