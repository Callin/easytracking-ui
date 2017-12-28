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

  userStoryList = [
    new UserStory('Create Data Layer for User', 'Dragos', 2, 2, 'story',
      'Entities need to be created along with the methods for CRUD operations', this.NEW),
    new UserStory('Create Business Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', this.IN_PROGRESS),
    new UserStory('Create View Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', this.IN_REVIEW),
    new UserStory('Create Infrastructure Layer for User', 'Johny', 2, 2, 'story',
      'Create DTOs, business methods for CRUD operations', this.DONE)];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  setStatus(newStatus: string, item: UserStory) {
    item.status = newStatus;
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

  public showDetails(item: UserStory) {
    // this.modalService.open('text');
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
        console.log('The dialog was closed');
      });
    }
  }

}
