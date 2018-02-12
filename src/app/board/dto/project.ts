import {UserStory} from './user-story';
import {User} from './user';

export class Project {

  id: number;

  name: string;

  description: string;

  userStories: UserStory[];

  userList: User[];


  constructor(id: number, name: string, description: string, userStories: UserStory[], userList: User[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userStories = userStories;
    this.userList = userList;
  }
}
