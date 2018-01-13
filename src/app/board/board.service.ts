import {Injectable} from '@angular/core';
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
