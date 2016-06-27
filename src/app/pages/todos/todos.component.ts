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
    
    .preview-todo {
      background-color: #bcd8bd;
    }
    
    .preview-todo input {
      color: white
    }
  `],
  template: `
    <md-card class="preview-todo">
      <md-card-title>
        <md-input placeholder="Title" [(ngModel)]="newTodo.title" autofocus></md-input>
      </md-card-title>
      <md-content>
        <md-input placeholder="Description" [(ngModel)]="newTodo.details" autofocus></md-input>
      </md-content>
      <div class="margin-20"></div>
      <button md-raised-button color="primary" (click)="addTodo()">Add Todo</button>
    </md-card>
    <md-card *ngFor="let todo of todos; let i = index">
      <span class="fa fa-trash-o icon icon-md float-right padding-top-20" style="color:crimson" (click)="removeTodo(i)"></span>
      <md-card-title>
        <div [hidden]="todo.edit" (click)="editTodo(todo)">{{todo.title}}</div>
        <md-input placeholder="Title" [hidden]="!todo.edit" [(ngModel)]="todo.title" autofocus></md-input>
      </md-card-title>
      <md-card-content>
        <p [hidden]="todo.edit" (click)="editTodo(todo)">{{todo.details}}</p>
        <md-input class="col-lg-12 no-padding" placeholder="Details" [hidden]="!todo.edit" [(ngModel)]="todo.details" autofocus></md-input>
        <button [hidden]="!todo.edit" 
                class="margin-top-10"
                md-raised-button 
                color="primary" 
                (click)="saveTodo(todo)">Save</button> 
      </md-card-content>
    </md-card>
  `,
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

  removeTodo(index: number) {
    console.log("Removing item");
    this.todos.splice(index, 1);
  }

  editTodo(todo) {
    todo.edit = true;
  }

  saveTodo(todo) {
    //TODO Post to Mongo
    todo.edit = false;
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
        console.log(this.todos);
        this.cd.detectChanges();
      });
  }

}
