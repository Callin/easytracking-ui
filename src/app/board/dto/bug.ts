import {User} from './user';

export class Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  estimation: number; // missing on the back end
  userStoryId: number;
  user: User;

  constructor(id: number,
              title: string,
              priority: number,
              estimation: number,
              description: string,
              status: string,
              userStoryId: number,
              user: User) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.estimation = estimation;
    this.description = description;
    this.status = status;
    this.userStoryId = userStoryId;
    this.user = user;
  }
}
