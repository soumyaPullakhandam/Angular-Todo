import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoService } from './../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  // Inputing something from parent component
  // Here we are inputing todo
  @Input() todo!: Todo;

  // Outputing something from parent component
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  // set Dynamic classes
  setClasses = () => {
    const classes = {
      todo: true,
      'is-complete' : this.todo.completed
    };

    return classes;
  }

  onToggle = (todo: Todo) => {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo)
    .subscribe(data => console.log(data));
  }

  onDelete = (todo: Todo) => {
    this.deleteTodo.emit(todo);
  }

}
