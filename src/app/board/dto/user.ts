import {Project} from './project';

export class User {
  id: number;
  name: string;
  email: string;
  projectList: Project[];

  constructor(id: number, name: string, email: string, projectList: Project[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.projectList = projectList;
  }
}
