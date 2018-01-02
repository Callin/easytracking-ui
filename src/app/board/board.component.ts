import {Component, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';
import {BoardService} from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  NEW = 'New';
  IN_PROGRESS = 'In Progress';
  IN_REVIEW = 'In Review';
  DONE = 'Done';
  statusList = [this.NEW, this.IN_PROGRESS, this.IN_REVIEW, this.DONE];

  allUserStories: UserStory[];

  constructor(public dialog: MatDialog,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.onGetUserStories();
  }

  getNewItems() {
    return this.allUserStories.filter(item => item.status === this.NEW);
  }

  getInProgressItems() {
    return this.allUserStories.filter(item => item.status === this.IN_PROGRESS);
  }

  getInReviewItems() {
    return this.allUserStories.filter(item => item.status === this.IN_REVIEW);
  }

  getDoneItems() {
    return this.allUserStories.filter(item => item.status === this.DONE);
  }

  openDialog(item: UserStory, isNew: boolean): void {
    console.log('Is new: ' + isNew);
    if (isNew) {
      // show predefined data
      const boardItem = this.getBlankItemTemplate();
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem, isNew}
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

          this.onCreateUserStory(result.boardItem);
        }
      });
    } else {
      // user wants to open an existing story
      const boardItem = this.cloneUserStory(item);
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem, isNew}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          // update data
          // existing item being updated
          this.copyUserStory(item, result.boardItem);
          this.onUpdateUserStory(item);
        }
      });
    }
  }

  onCreateUserStory(userStory: UserStory) {
    this.boardService.createUserStory(userStory)
      .subscribe(
        (response) => {
          this.allUserStories.push(response);
        },
        (error) => console.log(error)
      );
  }

  onUpdateUserStory(userStory: UserStory) {
    this.boardService.updateUserStory(userStory)
      .subscribe(
        (updatedUserStory: any) => {
          console.log('User story with id: ' + userStory.id + ' has been updated ');
        },
        (error) => console.log(error)
      );
  }

  onGetUserStories() {
    return this.boardService.getUserStories()
      .subscribe(
        (userStoryList) => {
          console.log('User story list size: ' + userStoryList.length);
          this.allUserStories = userStoryList;
        },
        (error) => console.log(error)
      );
  }

  cloneUserStory(userStory: UserStory): UserStory {
    const copy: UserStory = new UserStory(
      userStory.id,
      userStory.title,
      userStory.owner,
      userStory.priority,
      userStory.estimation,
      userStory.description,
      userStory.status,
      userStory.projectId);

    return copy;
  }

  copyUserStory(item: UserStory, clone: UserStory): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.owner = clone.owner;
    item.projectId = clone.projectId;
  }

  getBlankItemTemplate(): UserStory {
    return new UserStory(
      null,
      'Replace with a suggestive title',
      '',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      1);
  }

  onStatusChange(item: UserStory) {
    this.onUpdateUserStory(item);
  }
}
