export class UserStory{
  title: string;
  description: string;
  owner: string;
  status: string;
  priority: number;
  estimation: number;
  type: string;


  constructor(title: string,
              owner: string,
              priority: number,
              estimation: number,
              type: string,
              description: string,
              status: string) {
    this.title = title;
    this.owner = owner;
    this.priority = priority;
    this.estimation = estimation;
    this.type = type;
    this.description = description;
    this.status = status;
  }
}
