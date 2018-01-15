import {UserStory} from './user-story';

export class Sprint {

  id: number;

  startDate: Date;

  endDate: Date;

  sprintNumber: number;

  projectId: number;

  userStoryList: UserStory[];


  constructor(id: number, startDate: Date, endDate: Date, sprintNumber: number, projectId: number, userStoryList: UserStory[]) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sprintNumber = sprintNumber;
    this.projectId = projectId;
    this.userStoryList = userStoryList;
  }
}
