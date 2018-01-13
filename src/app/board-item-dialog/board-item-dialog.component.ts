import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {BoardService} from '../board/board.service';
import {BoardItemTypeEnum} from '../board/util/board-item-type-enum';

@Component({
  selector: 'app-board-item-dialog',
  templateUrl: './board-item-dialog.component.html',
  styleUrls: ['./board-item-dialog.component.css']
})
export class BoardItemDialogComponent implements OnInit {
  userCtrl: FormControl = new FormControl();
  filteredUsers: Observable<string[]>;

  NEW = 'New';
  IN_PROGRESS = 'In Progress';
  IN_REVIEW = 'In Review';
  DONE = 'Done';
  statusList = [this.NEW, this.IN_PROGRESS, this.IN_REVIEW, this.DONE];
  userList = ['Dragos', 'David', 'Bogdan', 'Johny'];

  constructor(public dialogRef: MatDialogRef<BoardItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.filteredUsers = this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterUsers(val))
      );
  }

  filterUsers(val: string): string[] {
    return this.userList.filter(user =>
      user.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

  deleteBoardItem(data: any) {
    if (data.boardItemType === BoardItemTypeEnum.USER_STORY) {
      this.boardService.onDeleteUserStory(data.boardItem);
    } else if (data.boardItemType === BoardItemTypeEnum.TASK) {
      this.boardService.onDeleteTask(data.boardItem);
    } else if (data.boardItemType === BoardItemTypeEnum.BUG) {
      this.boardService.onDeleteBug(data.boardItem);
    }

    this.dialogRef.close();
  }
}
