import {Task} from './task';
import {Bug} from './bug';
import {User} from './user';

export class UserStory {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  estimation: number;
  projectId: number;
  sprintId: number;
  taskList: Task[];
  bugList: Bug[];
  user: User;

  constructor(id: number,
              title: string,
              priority: number,
              estimation: number,
              description: string,
              status: string,
              projectId: number,
              sprintId: number,
              bugList: Task[],
              taskList: Task[],
              user: User) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.estimation = estimation;
    this.description = description;
    this.status = status;
    this.projectId = projectId;
    this.sprintId = sprintId;
    this.taskList = taskList;
    this.bugList = bugList;
    this.user = user;
  }
}
