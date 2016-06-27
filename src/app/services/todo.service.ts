import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class TodoService {
  public http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public getAll() {
    console.log('Title#getData(): Get Data');
    return this.http
      .get('http://localhost:3001/api/todos')
      .map(res => res.json());
  }
}
