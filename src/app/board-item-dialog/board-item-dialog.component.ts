import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-board-item-dialog',
  templateUrl: './board-item-dialog.component.html',
  styleUrls: ['./board-item-dialog.component.css']
})
export class BoardItemDialogComponent implements OnInit {

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  constructor(public dialogRef: MatDialogRef<BoardItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
