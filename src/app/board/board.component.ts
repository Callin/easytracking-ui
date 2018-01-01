import {Component, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';
import {BoardService} from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  NEW = 'New';
  IN_PROGRESS = 'In Progress';
  IN_REVIEW = 'In Review';
  DONE = 'Done';
  statusList = [this.NEW, this.IN_PROGRESS, this.IN_REVIEW, this.DONE];
  userList = ['Dragos', 'David', 'Bogdan', 'Johny'];

  userStoryList = [
    new UserStory('Create Data Layer for User', 'Dragos', 2, 2,
      'Entities need to be created along with the methods for CRUD operations', 'New'),
    new UserStory('Create Business Layer for User', 'Johny', 2, 2,
      'Create DTOs, business methods for CRUD operations', 'In Progress'),
    new UserStory('Create View Layer for User', 'Johny', 2, 2,
      'Create DTOs, business methods for CRUD operations', 'In Review'),
    new UserStory('Create Infrastructure Layer for User', 'Johny', 2, 2,
      'Create DTOs, business methods for CRUD operations', 'Done')];

  constructor(public dialog: MatDialog, private boardService: BoardService) {
  }

  ngOnInit() {
  }

  getNewItems() {
    return this.userStoryList.filter(item => item.status === this.NEW);
  }

  getInProgressItems() {
    return this.userStoryList.filter(item => item.status === this.IN_PROGRESS);
  }

  getInReviewItems() {
    return this.userStoryList.filter(item => item.status === this.IN_REVIEW);
  }

  getDoneItems() {
    return this.userStoryList.filter(item => item.status === this.DONE);
  }

  openDialog(item: UserStory, isNew: boolean): void {
    console.log('Is new: ' + isNew);
    if (isNew) {
      // show predefined data
      const boardItem = this.getBlankItemTemplate();
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('saving...');
        if (result != null) {
          // save data
          console.log('New data:' +
            '\ntitle: ' + result.boardItem.title +
            '\ndescription: ' + result.boardItem.description +
            '\nowner: ' + result.boardItem.owner +
            '\nstatus: ' + result.boardItem.status +
            '\nestimation: ' + result.boardItem.estimation
          );

          this.userStoryList.push(result.boardItem);
        }
      });
    } else {
      // user wants to open an existing story
      console.log('Inside else');
      const boardItem = this.cloneUserStory(item);
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Updateting...');
        if (result != null) {
          // update data
          // existing item being updated
          console.log('Title: ' + result.boardItem.title);
          this.copyUserStory(item, result.boardItem);
        }
      });
    }
  }

  onCreateUserStory(userStory: UserStory) {
    this.boardService.createUserStory(userStory)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onUpdateUserStory(userStory: UserStory) {
    this.boardService.updateUserStory(userStory)
      .subscribe(
        (updatedUserStory: any) => console.log(updatedUserStory),
        (error) => console.log(error)
      );
  }

  onGetUserStory() {
    this.boardService.getUserStories().subscribe(
      (response: Response) => {
        const data = response.json();
      },
      (error) => console.log(error)
    );
  }

  cloneUserStory(userStory: UserStory): UserStory {
    const copy: UserStory = new UserStory(userStory.title, userStory.owner, userStory.priority,
      userStory.estimation, userStory.description, userStory.status);

    return copy;
  }

  copyUserStory(item: UserStory, clone: UserStory): void {
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.owner = clone.owner;
  }

  getBlankItemTemplate(): UserStory {
    return new UserStory(
      'Replace with a suggestive title',
      '',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW);
  }
}
