import {Component, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';
import {BoardService} from './board.service';
import {AppConstants} from './dto/app-constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  NEW = AppConstants.NEW;
  IN_PROGRESS = AppConstants.IN_PROGRESS;
  IN_REVIEW = AppConstants.IN_REVIEW;
  DONE = AppConstants.DONE;
  statusList = AppConstants.STATUS;

  allUserStories: UserStory[];

  constructor(public dialog: MatDialog,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.onGetUserStories();
  }

  getNewTasks(taskList: Task[]): Task[] {
    return taskList.filter(item => item.status === AppConstants.NEW);
  }

  getInProgressTasks(taskList: Task[]): Task[] {
    return taskList.filter(item => item.status === AppConstants.IN_PROGRESS);
  }

  getInReviewTasks(taskList: Task[]): Task[] {
    return taskList.filter(item => item.status === AppConstants.IN_REVIEW);
  }

  getDoneTasks(taskList: Task[]): Task[] {
    return taskList.filter(item => item.status === AppConstants.DONE);
  }


  openDialog(item: any, isNew: boolean): void {
    console.log('Is new: ' + isNew);
    if (isNew) {
      // show predefined data
      const boardItem = this.getBlankUserStory();
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem, isNew}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.onCreateUserStory(result.boardItem);
        }
      });
    } else {
      const boardItem = this.cloneUserStory(item);
      const dialogRef = this.dialog.open(BoardItemDialogComponent, {
        width: '80%',
        height: '60%',
        data: {boardItem, isNew}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          // update data, existing item being updated
          this.copyUserStory(item, result.boardItem);
          this.onUpdateUserStory(item);
        }
      });
    }
  }

  openNewUserStoryDialog(): void {
    // show predefined data
    const boardItem = this.getBlankUserStory();
    const isNew = true;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.onCreateUserStory(result.boardItem);
      }
    });
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

  openExistingUserStoryDialog(item: UserStory): void {
    const boardItem = this.cloneUserStory(item);
    const isNew = false;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // update board item
        this.copyUserStory(item, result.boardItem);
        this.onUpdateUserStory(item);
      }
    });
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

  onCreateTask(task: Task, userStory: UserStory) {
    this.boardService.createTask(task)
      .subscribe(
        (response) => {
          userStory.taskList.push(response);
        },
        (error) => console.log(error)
      );
  }

  onUpdatetask(task: Task) {
    this.boardService.updateTask(task)
      .subscribe(
        (updatedTask: Task) => {
          console.log('Task with id: ' + task.id + ' has been updated ');
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
      userStory.projectId,
      userStory.taskList);

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
    item.taskList = clone.taskList;
  }

  getBlankUserStory(): UserStory {
    return new UserStory(
      null,
      'Replace with a suggestive title',
      '',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      1,
      null);
  }

  onStatusChange(item: UserStory) {
    this.onUpdateUserStory(item);
  }
}
