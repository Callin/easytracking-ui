import {UserStory} from './user-story';

export class Project {

  id: number;

  name: string;

  description: string;

  userStories: UserStory[];


  constructor(id: number, name: string, description: string, userStories: UserStory[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userStories = userStories;
  }
}
