import {Component, Inject, OnInit} from '@angular/core';
import {BoardService} from '../board/board.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';

@Component({
  selector: 'app-sprint-dialog',
  templateUrl: './sprint-dialog.component.html',
  styleUrls: ['./sprint-dialog.component.css']
})
export class SprintDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BoardItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private boardService: BoardService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

  deleteSprint(data: any) {
    this.boardService.onDeleteSprint(data.sprint);

    this.dialogRef.close();
  }

}
