import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class TodoService {
  constructor(public http: Http) {

  }

  static getAll() {
    console.log('Title#getData(): Get Data');
    this.todos = this.http
      .get('/assets/data.json')
      .map(res => res.json());
  }
}
