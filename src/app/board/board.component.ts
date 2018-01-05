import {Component, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import {Bug} from './dto/bug';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';
import {BoardService} from './board.service';
import {AppConstants} from './dto/app-constants';
import {BoardItemTypeEnum} from './dto/board-item-type-enum';

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

  isMouseOver: boolean[] = [];

  allUserStories: UserStory[];

  constructor(public dialog: MatDialog,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.onGetUserStories();
  }

  onGetUserStories() {
    return this.boardService.getUserStories()
      .subscribe(
        (userStoryList) => {
          this.allUserStories = userStoryList;
        },
        (error) => console.log(error)
      );
  }

  // ------------------- user story dialog operations -------------------

  openNewUserStoryDialog(): void {
    // show predefined data
    const boardItem = this.getBlankUserStory();
    const isNew = true;
    const boardItemType = BoardItemTypeEnum.USER_STORY;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
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
    const boardItemType = BoardItemTypeEnum.USER_STORY;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
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

  // ------------------- task and dialog operations -------------------

  openNewBugDialog(userStory: UserStory): void {
    // show predefined data
    const boardItem = this.getBlankBug(userStory.id);
    const isNew = true;
    const boardItemType = BoardItemTypeEnum.BUG;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.onCreateBug(result.boardItem, userStory);
      }
    });
  }

  onCreateBug(bug: Bug, userStory: UserStory) {
    this.boardService.createBug(bug)
      .subscribe(
        (response) => {
          userStory.bugList.push(response);
        },
        (error) => console.log(error)
      );
  }

  openExistingBugDialog(item: Bug): void {
    const boardItem = this.cloneBug(item);
    const isNew = false;
    const boardItemType = BoardItemTypeEnum.BUG;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // update board item
        this.copyBug(item, result.boardItem);
        this.onUpdateBug(item);
      }
    });
  }

  onUpdateBug(bug: Bug) {
    this.boardService.updateBug(bug)
      .subscribe(
        (updatedBug: Bug) => {
          console.log('Bug with id: ' + bug.id + ' has been updated ');
        },
        (error) => console.log(error)
      );
  }

  // ------------------- bug and dialog operations -------------------

  openNewTaskDialog(userStory: UserStory): void {
    // show predefined data
    const boardItem = this.getBlankTask(userStory.id);
    const isNew = true;
    const boardItemType = BoardItemTypeEnum.TASK;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.onCreateTask(result.boardItem, userStory);
      }
    });
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

  openExistingTaskDialog(item: Task): void {
    const boardItem = this.cloneTask(item);
    const isNew = false;
    const boardItemType = BoardItemTypeEnum.TASK;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      data: {boardItem, isNew, boardItemType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // update board item
        this.copyTask(item, result.boardItem);
        this.onUpdateTask(item);
      }
    });
  }

  onUpdateTask(task: Task) {
    this.boardService.updateTask(task)
      .subscribe(
        (updatedTask: Task) => {
          console.log('Task with id: ' + task.id + ' has been updated ');
        },
        (error) => console.log(error)
      );
  }

  cloneUserStory(userStory: UserStory): UserStory {
    return new UserStory(
      userStory.id,
      userStory.title,
      userStory.owner,
      userStory.priority,
      userStory.estimation,
      userStory.description,
      userStory.status,
      userStory.projectId,
      userStory.taskList,
      userStory.bugList);
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
    item.bugList = clone.bugList;
  }

  cloneTask(task: Task): Task {
    return new Task(
      task.id,
      task.title,
      task.owner,
      task.priority,
      task.estimation,
      task.description,
      task.status,
      task.userStoryId);
  }

  copyTask(item: Task, clone: Task): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.owner = clone.owner;
    item.userStoryId = clone.userStoryId;
  }

  cloneBug(bug: Bug): Bug {
    return new Bug(
      bug.id,
      bug.title,
      bug.owner,
      bug.priority,
      bug.estimation,
      bug.description,
      bug.status,
      bug.userStoryId);
  }

  copyBug(item: Bug, clone: Bug): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.owner = clone.owner;
    item.userStoryId = clone.userStoryId;
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
      null,
      null);
  }

  getBlankTask(userStoryId: number): Task {
    return new Task(
      null,
      'Replace with a suggestive title',
      '',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      userStoryId);
  }

  getBlankBug(userStoryId: number): Bug {
    return new Bug(
      null,
      'Replace with a suggestive title',
      '',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      userStoryId);
  }

  onUserStoryStatusChange(item: UserStory) {
    this.onUpdateUserStory(item);
  }

  onTaskStatusChange(item: Task) {
    this.onUpdateTask(item);
  }

  onBugStatusChange(item: Bug) {
    this.onUpdateBug(item);
  }

  changeIsMouseOver(newValue: boolean, index: number) {
    this.isMouseOver[index] = newValue;
  }

  getIsMouseOver(index: number) {
    if (this.isMouseOver.length < index) {
      this.isMouseOver.push(false);
    } else {
      return this.isMouseOver[index];
    }
  }
}
