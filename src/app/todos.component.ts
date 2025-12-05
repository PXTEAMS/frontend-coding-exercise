import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs";
import {NgForOf} from "@angular/common";

export interface Todo {
  userId: number;
  todoId: number;
  title: string;
  completed: boolean
}
export interface TodosBackend {
  id: number;
  userId: number;
  title: string;
  completed: boolean
}
export interface User {
  userId: number;
  username: string;
}
export interface UserFromBackend {
  id: number;
  name: boolean;
}

@Component({
  selector: 'app-todos',
  template: `
    <button
      style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 15px; cursor: pointer; transition: background 0.25s; box-shadow: 0 2px 6px rgba(0,0,0,0.15);"
      (click)="getData()">Load tasks
    </button>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
      <tr style="background: #f3f4f6; border-bottom: 2px solid #ccc;">
        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">ID</th>
        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Title</th>
        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Completed</th>
      </tr>
      </thead>

      <tbody>
      <tr *ngFor="let t of todos" style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; border: 1px solid #eee;">{{ t.userId }}</td>
        <td style="padding: 8px; border: 1px solid #eee;">{{ t.title }}</td>
        <td style="padding: 8px; border: 1px solid #eee;">
        <span [style.background]="t.completed ? '#22c55e33' : '#ef444433'"
              style="padding: 4px 8px; border-radius: 4px; display: inline-block;">
          {{ t.completed ? '✔️ Yes' : '❌ No' }}
        </span>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  imports: [
    NgForOf
  ],
  standalone: true
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  currentUserId = 3;
  user!: User;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {

  }

  getData() {
    this.http.get<UserFromBackend[]>('https://jsonplaceholder.typicode.com/users').pipe(
        map((r: UserFromBackend[]) => {
          const found = r.find((u) => u.id === this.currentUserId)
          const user: User = {
            userId: found?.id as number,
            username: found?.name as unknown as string
          }

          return user;
        }))
      .subscribe(user => {
        this.user = user;

        this.http.get<TodosBackend[]>('https://jsonplaceholder.typicode.com/todos').pipe(
            map((r: TodosBackend[]) => {
              const todos: Todo[] = [];

              r.forEach((t) => {
                const todo: Todo = {
                  todoId: t.id,
                  userId: t.userId,
                  title: t.title,
                  completed: t.completed
                }
                todos.push(todo);

              })

              return todos;
            }))
          .subscribe(todo => {
            this.todos = todo;
          });
      });
  }
}
