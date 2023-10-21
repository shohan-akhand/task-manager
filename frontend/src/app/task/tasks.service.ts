import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}
  getPendingTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  createTask(task: Task) {
    task.taskNo = this.tasks.length + 1;
    this.tasks.push(task);
    this.http.post('http://localhost:3000/tasks', task).subscribe((res) => {
      console.log(res);
    });
  }
  completeTask(task: Task) {
    const selectedTask: Task = {
      ...task,
      completed: new Date(),
    };
    const index = this.tasks.findIndex((i) => i === task);
    this.tasks[index] = selectedTask;
  }
  getSuggestions(title: string): Task[] {
    if (title.length > 6) {
      return this.tasks.filter((task) => task.title.indexOf(title) !== -1);
    }
    return [];
  }
}
