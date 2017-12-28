import {Component, Inject, OnInit} from '@angular/core';
import {UserStory} from './dto/user-story';
import {DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

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
  editing = 0;

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

  save(i: number) {
    this.editing = 0;
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
      const dialogRef = this.dialog.open(DialogBoardItemComponentDialog, {
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

@Component({
  selector: 'app-dialog-board-item-dialog',
  templateUrl: 'board-item-dialog.html',
  styleUrls: ['./board.component.css']
})
export class DialogBoardItemComponentDialog {

  constructor(public dialogRef: MatDialogRef<DialogBoardItemComponentDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.changePosition();
    // dialogRef.updatePosition({top: '50px', left: '50px'});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
