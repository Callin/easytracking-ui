import {Component, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';

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
    new UserStory('Create Data Layer for User', 'Dragos', 2, 2, 'story',
      'Entities need to be created along with the methods for CRUD operations', 'New'),
    new UserStory('Create Business Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', 'In Progress'),
    new UserStory('Create View Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', 'In Review'),
    new UserStory('Create Infrastructure Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', 'Done')];

  constructor(public dialog: MatDialog) {
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
    if (isNew) {
      // show dummy, predefined data
    } else {
      // user wants to open an existing story
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: item
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          console.log('The dialog was closed. Status: ' + result.status + ' owner: ' + result.owner);
        }
      });
    }
  }
}
