import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import {Todo} from '../list-todos/list-todos.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {UserDTO} from '../DTO/UserDTO';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  currentUser: any;
  id: number;
  todo: Todo;

  constructor(private todoService: TodoDataService,
              private token: TokenStorageService,
              private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.id = this.route.snapshot.params.id;
    this.todo = new Todo(this.id, '', false, new Date(), new UserDTO(this.currentUser.id));

    if (this.id != -1){
      this.todoService.retrieveTodo(this.currentUser.username, this.id)
        .subscribe(
          data => {
            this.todo = data;
            console.log('testuje tutaj');
            console.log(data);
          });
    }
  }

  saveTodo() {
    if (this.id == -1){
      this.todoService.createTodo(this.currentUser.username, this.todo)
        .subscribe(
        data => {
          this.router.navigate(['todos']);
        }
      );
    }else {
      this.todoService.updateTodo(this.currentUser.username, this.id, this.todo)
        .subscribe(
          data => {
            this.router.navigate(['todos']);
          }
        );
    }

  }
}
