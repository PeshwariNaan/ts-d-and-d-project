export enum ProjectStatus { //This is perfect for enums.
  Active,
  Finished,
}

export class Project {
  constructor(
    //This is the shorthand way of creating properties in a class.
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
