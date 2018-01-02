import {Injectable} from '@angular/core';
import {UserStory} from './dto/user-story';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BoardService {
  serverUrl = 'http://localhost:4200';

  constructor(private httpClient: HttpClient) {

  }

  createUserStory(userStory: UserStory) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<UserStory>(this.serverUrl + '/api/userstory', userStory, {headers: header})
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
    return this.httpClient.put<UserStory>(this.serverUrl + '/api/userstory', userStory, {headers: header})
      .map(
        (userStoryResponse) => {
          return userStoryResponse;
        }
      );
  }

  getUserStories() {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<UserStory[]>(this.serverUrl + '/api/userstory/project/1', {headers: header})
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
    return this.httpClient.delete(this.serverUrl + '/api/userstory/' + userStoryId)
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
