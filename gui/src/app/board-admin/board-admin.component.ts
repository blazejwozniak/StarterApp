import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";

export class User {
  constructor(public id: number,
              public username: string,
              public email: string,
              public password: string){
  }
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = JSON.parse(data);
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
  }
}
