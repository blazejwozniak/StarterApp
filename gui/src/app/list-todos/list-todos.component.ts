import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {UserDTO} from '../DTO/UserDTO';

export class Todo {
  constructor(public id: number,
              public description: string,
              public done: boolean,
              public targetDate: Date,
              public user: UserDTO){
  }
}


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  currentUser: any;
  todos: Todo[];

  message: string;

  constructor(private todoDataService: TodoDataService, private router: Router,
              private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.refreshTodos();
  }

  refreshTodos() {
    this.userService.getTasks(this.currentUser.username).subscribe(
      response => {
        this.todos = JSON.parse(response);
        console.log(response);
      }
    );
  }

  deleteTodo(id) {
    this.todoDataService.deleteTodo(this.currentUser.username, id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    );
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }
}
