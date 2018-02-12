import {Component, Input, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {Task} from './dto/task';
import {Bug} from './dto/bug';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {MatDialog} from '@angular/material';
import {BoardService} from './board.service';
import {AppConstants} from './util/app-constants';
import {BoardItemTypeEnum} from './util/board-item-type-enum';
import {BoardItemsFilterContainer} from './util/board-item-filter-container';
import {Project} from './dto/project';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';
import {SprintDialogComponent} from '../sprint-dialog/sprint-dialog.component';
import {Sprint} from './dto/sprint';
import {User} from './dto/user';

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

  filterUserList = ['All', 'Dragos', 'David', 'Bogdan', 'Johny'];

  currentProjectId: number;
  currentSprintId: number;
  filter: BoardItemsFilterContainer = new BoardItemsFilterContainer();

  isMouseOver: boolean[] = [];

  allUserStories: UserStory[] = [];
  allProjects: Project[] = [];
  allSprints: Sprint[] = [];
  allUserList: User[] = [];

  constructor(public dialog: MatDialog,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.changeUserStoryList.subscribe(userStoryList => {
      this.allUserStories = userStoryList;
    });

    this.boardService.changeProjectList.subscribe(projectList => {
      this.allProjects = projectList;
    });

    this.boardService.changeSprintList.subscribe(sprintList => {
      this.allSprints = sprintList;
    });

    this.boardService.changeUserList.subscribe(userList => {
      this.allUserList = userList;
    });

    this.boardService.onGetProjects();

    this.boardService.onGetAllUsers();

  }

  onGetSprints(projectId: number) {
    this.boardService.onGetSprints(projectId);
  }

  onGetUserStories(projectId: number) {
    this.boardService.onGetAllUserStories(projectId);
  }

  // ------------------- user story dialog operations -------------------

  openNewUserStoryDialog(): void {
    // show predefined data
    const boardItem = this.getBlankUserStory();
    const isNew = true;
    const boardItemType = BoardItemTypeEnum.USER_STORY;
    const allUsers = this.allUserList;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
    const allUsers = this.allUserList;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
    const allUsers = this.allUserList;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
    const allUsers = this.allUserList;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
    const allUsers = this.allUserList;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
    const allUsers = this.allUserList;
    allUsers.forEach(user => user.projectList = null);
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
      data: {boardItem, isNew, boardItemType, allUsers}
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
      userStory.priority,
      userStory.estimation,
      userStory.description,
      userStory.status,
      userStory.projectId,
      userStory.sprintId,
      userStory.taskList,
      userStory.bugList,
      userStory.user);
  }

  copyUserStory(item: UserStory, clone: UserStory): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.projectId = clone.projectId;
    item.sprintId = clone.sprintId;
    item.taskList = clone.taskList;
    item.bugList = clone.bugList;
    item.user = clone.user;
  }

  cloneTask(task: Task): Task {
    return new Task(
      task.id,
      task.title,
      task.priority,
      task.estimation,
      task.description,
      task.status,
      task.userStoryId,
      task.user);
  }

  copyTask(item: Task, clone: Task): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.userStoryId = clone.userStoryId;
    item.user = clone.user;
    // this.copyUser(item.user, clone.user);
  }

  copyUser(userOne: User, userTwo: User): void {
    userOne.name = userTwo.name;
    userOne.id = userTwo.id;
    userOne.email = userTwo.email;
    userOne.projectList = null;
  }

  cloneBug(bug: Bug): Bug {
    return new Bug(
      bug.id,
      bug.title,
      bug.priority,
      bug.estimation,
      bug.description,
      bug.status,
      bug.userStoryId,
      bug.user);
  }

  copyBug(item: Bug, clone: Bug): void {
    item.id = clone.id;
    item.status = clone.status;
    item.description = clone.description;
    item.estimation = clone.estimation;
    item.priority = clone.priority;
    item.title = clone.title;
    item.userStoryId = clone.userStoryId;
    item.user = clone.user;
  }

  getBlankUserStory(): UserStory {
    return new UserStory(
      null,
      'Replace with a suggestive title',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      this.currentProjectId,
      this.currentSprintId,
      null,
      null,
      null);
  }

  getBlankTask(userStoryId: number): Task {
    return new Task(
      null,
      'Replace with a suggestive title',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      userStoryId,
      null);
  }

  getBlankBug(userStoryId: number): Bug {
    return new Bug(
      null,
      'Replace with a suggestive title',
      0,
      0,
      'Replace with a comprehensive description',
      this.NEW,
      userStoryId,
      null);
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

  onFilterOwnerChange(filter) {
    console.log('Filter: ' + filter.owner.id);
    this.filter = filter;
  }

  onCurrentProjectIdChange() {
    this.onGetSprints(this.currentProjectId);
    this.onGetUserStories(this.currentProjectId);
  }

  onCurrentSprintIdChange() {
    this.boardService.onGetAllUserStoriesByProjectIdAndSprintId(this.currentProjectId, this.currentSprintId);
  }

  filterItems(item: any, filterContainer: BoardItemsFilterContainer, status: string): boolean {
    if (item.status == status) {
      if (item.user !== null) {
        if (filterContainer.owner.id == -1) {
          return true;
        } else if (filterContainer.owner.id == item.user.id) { // compare owner
          return true;
        }
      } else {
        if (filterContainer.owner.id == -1) {
          return true;
        } else if (filterContainer.owner.name == item.owner) { // compare owner
          return true;
        }
      }
    }

    return false;
  }

  // ------------------- project and dialog operations -------------------
  openNewProjectDialog(): void {
    // show predefined data
    const project = this.getBlankProject();
    const isNew = true;
    const allUsers: User[] = [];
    this.allUserList.forEach(user => {
      if (user.id !== -1) {
        allUsers.push(user);
      }
    });
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 550, // assumes px
      data: {project, isNew, allUsers}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.allUserStories = [];
        result.project.userList = result.allUsers;
        this.onCreateProject(result.project);
      }
    });
  }

  openEditProjectDialog(): void {
    // show predefined data
    const project = this.allProjects.find(projectOne => projectOne.id == this.currentProjectId);
    const isNew = true; // should be false to enable delete button
    const allUsers: User[] = [];
    this.allUserList.forEach(user => {
      if (user.id !== -1) {
        allUsers.push(user);
      }
    });
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 550, // assumes px
      data: {project, isNew, allUsers}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        result.project.userList = result.allUsers;
        this.onUpdateProject(result.project);
      }
    });
  }

  getBlankProject(): Project {
    return new Project(
      null,
      'Replace with a suggestive title',
      'Replace with a comprehensive description',
      null,
      null);
  }

  onCreateProject(project: Project) {
    this.boardService.onCreateProject(project);
  }

  onUpdateProject(project: Project) {
    return this.boardService.updateProject(project)
      .subscribe(
        (response) => {
          this.allProjects.push(response);
        },
        (error) => console.log(error)
      );
  }

  // ------------------- sprint and dialog operations -------------------
  openNewSprintDialog(): void {
    // show predefined data
    const sprint = this.getBlankSprint();
    const isNew = true;
    const dialogRef = this.dialog.open(SprintDialogComponent, {
      width: '50%',
      minWidth: 650, // assumes px
      height: '40%',
      data: {sprint, isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('sprint: ' + sprint);
      if (result != null) {
        // this.allUserStories = [];
        this.onCreateSprint(result.sprint);
      }
    });
  }

  openEditSprintDialog(): void {
    const sprint = this.allSprints.find(sprintOne => sprintOne.id == this.currentSprintId);
    sprint.startDate = new Date(sprint.startDate);
    sprint.endDate = new Date(sprint.endDate);
    const isNew = false; // should be false to enable edit button
    const dialogRef = this.dialog.open(SprintDialogComponent, {
      width: '60%',
      height: '40%',
      data: {sprint, isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.onUpdateSprint(result.sprint);
      }
    });
  }

  getBlankSprint(): Sprint {
    return new Sprint(
      null,
      new Date(), // start date
      null, // end date
      null, // sprint number
      this.currentProjectId, // project id
      null // user storyList
    );
  }

  onCreateSprint(sprint: Sprint) {
    this.boardService.onCreateSprint(sprint);
  }

  onUpdateSprint(sprint: Sprint) {
    return this.boardService.updateSprint(sprint)
      .subscribe(
        (response) => {
          this.allSprints.push(response);
        },
        (error) => console.log(error)
      );
  }

  getBoardItemOwner(boardItem: any): string {
    if (boardItem === null || boardItem.user === null || boardItem.user.name === null) {
      if (boardItem.owner === 'Dragos') {
        return 'Dragos';
      } else if (boardItem.owner === 'Bogdan') {
        return 'Bogdan';
      } else if (boardItem.owner === 'David') {
        return 'David';
      } else if (boardItem.owner === 'Johnny') {
        return 'Johny';
      }

      return 'none';
    } else {
      return boardItem.user.name;
    }
  }
}
