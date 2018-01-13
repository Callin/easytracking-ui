import {EventEmitter, Injectable, Output} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Bug} from './dto/bug';
import {Project} from './dto/project';

@Injectable()
export class BoardService {
  serverUrl = 'http://localhost:4200/api';
  userStoryUrl = this.serverUrl + '/userstory';
  projectUrl = this.serverUrl + '/project';
  taskUrl = this.serverUrl + '/task';
  bugUrl = this.serverUrl + '/bug';

  allUserStoryList: UserStory[];
  allProjectList: Project[];

  @Output() changeUserStoryList: EventEmitter<UserStory[]> = new EventEmitter();
  @Output() changeProjectList: EventEmitter<Project[]> = new EventEmitter();

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
}
