import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  showReportTask = false;
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  constructor(private issueService: TasksService) { }
 ngOnInit(): void {
  this.getTasks();
 }
  private getTasks() {
    this.tasks = this.issueService.getPendingTasks();
  }
  onCloseReport() {
    this.showReportTask = false;
    this.getTasks();
  }
  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedTask) {
    this.issueService.completeTask(this.
    selectedTask);
    this.getTasks();
    }
    this.selectedTask = null;
  }

}
