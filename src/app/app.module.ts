import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BoardComponent, DialogBoardItemComponentDialog} from './board/board.component';
import {Ng2DragDropModule} from 'ng2-drag-drop';
import {
  MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DialogBoardItemComponentDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2DragDropModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogBoardItemComponentDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
