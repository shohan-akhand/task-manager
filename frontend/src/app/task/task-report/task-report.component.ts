import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css']
})
export class TaskReportComponent implements OnInit{
  @Output() formClose = new EventEmitter();
  taskForm: FormGroup | undefined;
  suggestions: Task[]= [];
  constructor( private builder: FormBuilder , private taskService: TasksService ){
  }
  ngOnInit(): void {
    this.taskForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required]
      });
      this.taskForm.controls['title'].valueChanges.subscribe((
        title: string) => {
        this.suggestions = 
        this.taskService.getSuggestions(title);
        });
  }
  addTask() {
    if (this.taskForm && this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
      }
    this.taskService.createTask(this.taskForm?.value);
    this.formClose.emit();
   }

}
