import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Bug} from './dto/bug';
import {Project} from './dto/project';
import {Sprint} from './dto/sprint';
import {User} from './dto/user';

@Injectable()
export class BoardService {
  serverUrl = 'http://localhost:4200/api';
  userStoryUrl = this.serverUrl + '/userstory';
  projectUrl = this.serverUrl + '/project';
  sprintUrl = this.serverUrl + '/sprint';
  taskUrl = this.serverUrl + '/task';
  bugUrl = this.serverUrl + '/bug';
  userUrl = this.serverUrl + '/user';

  allUserStoryList: UserStory[] = [];
  allProjectList: Project[] = [];
  allSprintList: Sprint[] = [];
  allUserList: User[] = [];

  @Output() changeUserStoryList: EventEmitter<UserStory[]> = new EventEmitter();
  @Output() changeProjectList: EventEmitter<Project[]> = new EventEmitter();
  @Output() changeSprintList: EventEmitter<Sprint[]> = new EventEmitter();
  @Output() changeUserList: EventEmitter<User[]> = new EventEmitter();

  constructor(private httpClient: HttpClient) {

  }

  createUserStory(userStory: UserStory) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<UserStory>(this.userStoryUrl, userStory, {headers: header})
      .map(
        (userStoryResponse) => {
          return userStoryResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateUserStory(userStory: UserStory) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<UserStory>(this.userStoryUrl, userStory, {headers: header})
      .map(
        (userStoryResponse) => {
          return userStoryResponse;
        }
      );
  }

  onGetAllUserStories(projectId: number) {
    this.getUserStories(projectId)
      .subscribe(
        (userStoryList) => {
          this.allUserStoryList = userStoryList;
          this.changeUserStoryList.emit(this.allUserStoryList);
        },
        (error) => console.log(error)
      );
  }

  getUserStories(projectId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(this.userStoryUrl + '/project/' + projectId, {headers: header})
      .map(
        (userStoryList) => {
          return userStoryList;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  createUser(user: User) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(this.userUrl, user, {headers: header})
      .map(
        (userResponse) => {
          return userResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateUser(user: User) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<User>(this.userUrl, user, {headers: header})
      .map(
        (userResponse) => {
          return userResponse;
        }
      );
  }

  onGetUsersByProjectId(projectId: number) {
    this.getUsersByProjectId(projectId)
      .subscribe(
        (userList) => {
          this.allUserList = userList;
          this.allUserList.push(new User(-1, 'All', null, null)); // adds the All user
          this.changeUserList.emit(this.allUserList);
        },
        (error) => console.log(error)
      );
  }

  getUsersByProjectId(projectId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(this.userUrl + '/project/' + projectId, {headers: header})
      .map(
        (userList) => {
          return userList;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onGetAllUsers() {
    this.getAllUsers()
      .subscribe(
        (userList) => {
          this.allUserList = userList;
          this.allUserList.push(new User(-1, 'All', null, null));
          this.changeUserList.emit(this.allUserList);
        },
        (error) => console.log(error)
      );
  }

  getAllUsers() {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<User[]>(this.userUrl + '/all', {headers: header})
      .map(
        (users) => {
          return users;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onGetAllUserStoriesByProjectIdAndSprintId(projectId: number, sprintId: number) {
    this.getAllUserStoriesByProjectIdAndSprintId(projectId, sprintId)
      .subscribe(
        (userStoryList) => {
          this.allUserStoryList = userStoryList;
          this.changeUserStoryList.emit(this.allUserStoryList);
        },
        (error) => console.log(error)
      );
  }

  getAllUserStoriesByProjectIdAndSprintId(projectId: number, sprintId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(this.userStoryUrl + '/project/' + projectId + '/sprint/' + sprintId, {headers: header})
      .map(
        (userStoryList) => {
          return userStoryList;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onDeleteUserStory(userStory: UserStory) {
    this.deleteUserStory(userStory.id)
      .subscribe((response) => {
          if (response == null) {
            console.log('User story was removed.');
            this.allUserStoryList.splice(this.allUserStoryList.indexOf(userStory), 1);
            this.changeUserStoryList.emit(this.allUserStoryList);
          }
        },
        (error) => console.log(error)
      );
  }

  deleteUserStory(userStoryId: number) {
    return this.httpClient.delete(this.userStoryUrl + '/' + userStoryId)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  createTask(task: Task) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Task>(this.taskUrl, task, {headers: header})
      .map(
        (taskResponse) => {
          return taskResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateTask(task: Task) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Task>(this.taskUrl, task, {headers: header})
      .map(
        (taskResponse) => {
          return taskResponse;
        }
      );
  }

  onDeleteTask(task: Task) {
    this.deleteTask(task.id)
      .subscribe((response) => {
          if (response == null) {
            console.log('Task was removed.');
            const taskList = this.allUserStoryList.find(userStory => userStory.id === task.userStoryId).taskList;
            taskList.splice(taskList.indexOf(task), 1);
            this.changeUserStoryList.emit(this.allUserStoryList);
          }
        },
        (error) => console.log(error)
      );
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete(this.taskUrl + '/' + taskId)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  createBug(bug: Bug) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Bug>(this.bugUrl, bug, {headers: header})
      .map(
        (taskResponse) => {
          return taskResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateBug(bug: Bug) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Bug>(this.bugUrl, bug, {headers: header})
      .map(
        (taskResponse) => {
          return taskResponse;
        }
      );
  }

  onDeleteBug(bug: Bug) {
    this.deleteBug(bug.id)
      .subscribe((response) => {
          if (response == null) {
            console.log('Bug was removed.');
            const bugList = this.allUserStoryList.find(userStory => userStory.id === bug.userStoryId).bugList;
            bugList.splice(bugList.indexOf(bug), 1);
            this.changeUserStoryList.emit(this.allUserStoryList);
          }
        },
        (error) => console.log(error)
      );
  }

  deleteBug(bugId: number) {
    return this.httpClient.delete(this.bugUrl + '/' + bugId)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onCreateProject(project: Project) {
    this.createProject(project)
      .subscribe(
        (response) => {
          this.allProjectList.push(response);
          this.changeProjectList.emit(this.allProjectList);
        },
        (error) => console.log(error)
      );
  }

  createProject(project: Project) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Project>(this.projectUrl, project, {headers: header})
      .map(
        (projectResponse) => {
          return projectResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateProject(project: Project) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Project>(this.projectUrl, project, {headers: header})
      .map(
        (projectResponse) => {
          return projectResponse;
        }
      );
  }

  getProject(projectId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project>(this.projectUrl + '/' + projectId, {headers: header})
      .map(
        (project) => {
          return project;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onGetProjects() {
    this.getProjects()
      .subscribe(
        (projectList) => {
          this.allProjectList = projectList;
          this.changeProjectList.emit(this.allProjectList);
        },
        (error) => console.log(error)
      );
  }

  getProjects() {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Project[]>(this.projectUrl + '/all', {headers: header})
      .map(
        (projectList) => {
          return projectList;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onDeleteProject(project: Project) {
    this.deleteProject(project.id).subscribe(
      (response) => {
        if (response == null) {
          console.log('Project was removed.');
          this.allProjectList.splice(this.allProjectList.indexOf(project), 1);
          this.changeProjectList.emit(this.allProjectList);
        }
      },
      (error) => console.log(error)
    );
  }

  deleteProject(projectId: number) {
    return this.httpClient.delete(this.projectUrl + '/' + projectId)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onCreateSprint(sprint: Sprint) {
    this.createSprint(sprint)
      .subscribe(
        (response) => {
          this.allSprintList.push(response);
          this.changeSprintList.emit(this.allSprintList);
        },
        (error) => console.log(error)
      );
  }

  createSprint(sprint: Sprint) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<Sprint>(this.sprintUrl, sprint, {headers: header})
      .map(
        (sprintResponse) => {
          return sprintResponse;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateSprint(sprint: Sprint) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put<Sprint>(this.sprintUrl, sprint, {headers: header})
      .map(
        (sprintResponse) => {
          return sprintResponse;
        }
      );
  }

  getSprint(sprintId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Sprint>(this.sprintUrl + '/' + sprintId, {headers: header})
      .map(
        (sprint) => {
          return sprint;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onGetSprints(projectId: number) {
    this.getSprints(projectId)
      .subscribe(
        (sprintList) => {
          this.allSprintList = sprintList;
          this.changeSprintList.emit(this.allSprintList);
        },
        (error) => console.log(error)
      );
  }

  getSprints(projectId: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Sprint[]>(this.sprintUrl + '/project/' + projectId, {headers: header})
      .map(
        (sprintList) => {
          return sprintList;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  onDeleteSprint(sprint: Sprint) {
    this.deleteSprint(sprint.id).subscribe(
      (response) => {
        if (response == null) {
          console.log('Sprint was removed.');
          this.allSprintList.splice(this.allSprintList.indexOf(sprint), 1);
          this.changeSprintList.emit(this.allSprintList);
        }
      },
      (error) => console.log(error)
    );
  }

  deleteSprint(sprintId: number) {
    return this.httpClient.delete(this.sprintUrl + '/' + sprintId)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }
}
