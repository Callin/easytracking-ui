import {Component, OnInit} from '@angular/core';
import {BoardService} from '../board/board.service';
import {MatDialog} from '@angular/material';
import {Sprint} from '../board/dto/sprint';
import {Project} from '../board/dto/project';
import {UserStory} from '../board/dto/user-story';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';
import {BoardItemTypeEnum} from '../board/util/board-item-type-enum';
import {AppConstants} from '../board/util/app-constants';

@Component({
  selector: 'app-backlog-component',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  allUserStories: UserStory[] = [];
  allProjects: Project[] = [];
  allSprints: Sprint[] = [];

  statusList = AppConstants.STATUS;
  currentProjectId: number;

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

    this.boardService.onGetProjects();
  }

  onCurrentProjectIdChange() {
    this.onGetSprints(this.currentProjectId);
    this.onGetUserStories(this.currentProjectId);
  }

  onGetSprints(projectId: number) {
    this.boardService.onGetSprints(projectId);
  }

  onGetUserStories(projectId: number) {
    this.boardService.onGetAllUserStories(projectId);
  }

  // ------------------- project and dialog operations -------------------
  openNewProjectDialog(): void {
    // show predefined data
    const project = this.getBlankProject();
    const isNew = true;
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 350, // assumes px
      data: {project, isNew}
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
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '60%',
      height: '40%',
      minHeight: 350, // assumes px
      data: {project, isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        result.project.userList.push(result.allUsers);
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

  openExistingUserStoryDialog(item: UserStory): void {
    const boardItem = this.cloneUserStory(item);
    const isNew = false;
    const boardItemType = BoardItemTypeEnum.USER_STORY;
    const dialogRef = this.dialog.open(BoardItemDialogComponent, {
      width: '80%',
      height: '60%',
      minHeight: 350, // assumes px
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
}
