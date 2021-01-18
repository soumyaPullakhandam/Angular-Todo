import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  todoLimit = '?_limit=5';

  constructor(private http: HttpClient) { }

  // get todo
  getTodo = (): Observable<Todo[]> => {
    return this.http.get<Todo[]>
          (`${this.todoUrl}${this.todoLimit}`);
  }

  // Toggle Completed
  toggleCompleted = ( todo: Todo ): Observable<any> => {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo = ( todo: Todo ): Observable<Todo> => {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo = (todo: any ): Observable<Todo> => {
    const url = `${this.todoUrl}`;
    return this.http.post<Todo>(url, todo, httpOptions);
  }

}
