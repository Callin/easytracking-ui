import {Component, Inject, OnInit} from '@angular/core';
import {BoardService} from '../board/board.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardItemDialogComponent} from '../board-item-dialog/board-item-dialog.component';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BoardItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private boardService: BoardService) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    console.log('No data was changed');
    this.dialogRef.close();
  }

  deleteProject(data: any) {
    this.boardService.deleteProject(data.project.id).subscribe(
      (response) => {
        if (response == null) {
          console.log('Project was removed.');
        }
      },
      (error) => console.log(error)
    );

    this.dialogRef.close();
  }
}
