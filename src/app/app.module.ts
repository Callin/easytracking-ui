import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BoardComponent, DialogBoardItemComponentDialog} from './board/board.component';
import {Ng2DragDropModule} from 'ng2-drag-drop';
import {
  MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatPaginatorModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule, MatAutocompleteModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class MaterialModule {
}

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
    MaterialModule,
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
