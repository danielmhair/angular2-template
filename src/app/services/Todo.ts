export class Todo {
  public title: string;
  public details: string;

  constructor(todo: {title: string, details?: string}) {
    this.title = todo.title;
    this.details = todo.details;
  }
}
