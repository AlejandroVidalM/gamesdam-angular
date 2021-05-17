import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "src/app/models/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  userId = undefined;
  newUserForm = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService, private userService: UsersService) {}

  onSubmit() {

    let objectUser: User = {
      uid: this.userId
    } as any;
    Object.keys(this.newUserForm.controls).map(key => {
      objectUser[key] = this.newUserForm.controls[key].value;
    });
    this.userService.updateUser(objectUser);
  }

  ngOnInit(): void {}
}
