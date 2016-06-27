import { Component, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {Todo} from "../../services/Todo";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles: [`
    md-card{
      margin: 25px;
    }
  `],
  template: require('./todos.html'),
  providers: [TodoService]
})
export class Todos {
  todos: Todo[] = [];
  newTodo: Todo = new Todo({title: "", details: ""});

  constructor(public todoService: TodoService, public cd: ChangeDetectorRef) {

  }

  addTodo() {
    console.log(this.newTodo);
    this.todos.unshift(new Todo(this.newTodo));
    this.newTodo.title = "";
    this.newTodo.details = "";
  }

  ngOnInit() {
    console.log('hello `Todos` component');
    this.todoService.getAll()
      .subscribe((data) => {
        data.map(todo => {
          console.log(todo);
          return new Todo(todo);
        });
        this.todos.push(...data);
        this.todos = this.todos.reverse();
        console.log(this.todos);
        this.cd.detectChanges();
      });
  }

}
