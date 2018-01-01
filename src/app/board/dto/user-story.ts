export class UserStory {
  title: string;
  description: string;
  owner: string;
  status: string;
  priority: number;
  estimation: number;
  projectId: number;

  constructor(title: string,
              owner: string,
              priority: number,
              estimation: number,
              description: string,
              status: string,
              projectId: number) {
    this.title = title;
    this.owner = owner;
    this.priority = priority;
    this.estimation = estimation;
    this.description = description;
    this.status = status;
    this.projectId = projectId;
  }
}
