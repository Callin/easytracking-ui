import {Task} from './task';
import {Bug} from './bug';

export class UserStory {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: string;
  priority: number;
  estimation: number;
  projectId: number;
  taskList: Task[];
  bugList: Bug[];

  constructor(id: number,
              title: string,
              owner: string,
              priority: number,
              estimation: number,
              description: string,
              status: string,
              projectId: number,
              bugList: Task[],
              taskList: Task[]) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.priority = priority;
    this.estimation = estimation;
    this.description = description;
    this.status = status;
    this.projectId = projectId;
    this.taskList = taskList;
    this.bugList = bugList;
  }
}
