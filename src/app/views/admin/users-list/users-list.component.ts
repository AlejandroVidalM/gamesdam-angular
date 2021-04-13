import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  @Input() title;

  userList = [];

  constructor(private usersService: UsersService) {}


  ngOnInit(): void {
    this.usersService.getUsers().subscribe(resp => {
      this.userList = resp.map(e => {
        return e.payload.doc.data() as User;
      });
    });
  }

}
