import {UserStory} from './user-story';

export class Sprint {

  id: number;

  startDate: Date;

  endDate: Date;

  sprintNumber: number;

  userStoryList: UserStory[];


  constructor(id: number, startDate: Date, endDate: Date, sprintNumber: number, userStoryList: UserStory[]) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sprintNumber = sprintNumber;
    this.userStoryList = userStoryList;
  }
}
