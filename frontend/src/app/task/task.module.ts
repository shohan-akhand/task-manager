import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from 
 '@angular/platform-browser/animations';
 import { ReactiveFormsModule } from '@angular/forms';
 import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskReportComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    TaskListComponent
  ]
})
export class TaskModule { }
