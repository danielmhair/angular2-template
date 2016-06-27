import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Todo } from './Todo';

@Injectable()
export class TodoService {
  private todos: Todo[];

  constructor(public http: Http) {

  }

  getAll() {
    console.log('Title#getData(): Get Data');
    this.todos = this.http
      .get('http://localhost:3001/api/todos')
      .map(res => {
        console.log(res);
        console.log(res.json());
        console.log(new Todo(res.json()));
        return new Todo(res.json());
      });
  }
}
