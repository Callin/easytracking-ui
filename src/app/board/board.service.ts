import {Injectable} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Bug} from './dto/bug';

@Injectable()
export class BoardService {
  serverUrl = 'http://localhost:4200/api';
  userStoryUrl = this.serverUrl + '/userstory';
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

  getUserStories() {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(this.userStoryUrl + '/project/1', {headers: header})
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
}
