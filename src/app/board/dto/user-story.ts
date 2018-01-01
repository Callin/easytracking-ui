export class UserStory {
  title: string;
  description: string;
  owner: string;
  status: string;
  priority: number;
  estimation: number;

  constructor(title: string,
              owner: string,
              priority: number,
              estimation: number,
              description: string,
              status: string) {
    this.title = title;
    this.owner = owner;
    this.priority = priority;
    this.estimation = estimation;
    this.description = description;
    this.status = status;
  }
}
