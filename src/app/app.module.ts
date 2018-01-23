import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {BoardItemDialogComponent} from './board-item-dialog/board-item-dialog.component';
import {BoardComponent} from './board/board.component';
import {BacklogComponent} from './backlog/backlog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {BoardService} from './board/board.service';
import {HttpClientModule} from '@angular/common/http';
import {ProjectDialogComponent} from './project-dialog/project-dialog.component';
import {SprintDialogComponent} from './sprint-dialog/sprint-dialog.component';
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
  MatStepperModule,
  MatAutocompleteModule
} from '@angular/material';


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

const appRoutes: Routes = [
  {path: 'board', component: BoardComponent},
  {path: 'backlog', component: BacklogComponent},
  {path: '', component: BoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BacklogComponent,
    BoardItemDialogComponent,
    ProjectDialogComponent,
    SprintDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MaterialModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [BoardItemDialogComponent, ProjectDialogComponent, SprintDialogComponent],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
