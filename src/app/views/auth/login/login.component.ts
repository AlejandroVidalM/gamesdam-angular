import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "src/app/models/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private userService: UsersService) {}
  userList = [];
  userId = undefined;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  ngOnInit(): void {
    this.userService.getUsers().subscribe(resp => {
      this.userList = resp.map(e => {
        let user = e.payload.doc.data() as User;
        user.uid = e.payload.doc.id;
        return user;
      });
    });
  }
  googleSignIn() {
    this.auth.googleSignin();
  }
  
  onSubmit() {
    let logged: boolean = false;
    let objectUser: User = {
      uid: this.userId
    } as any;
    Object.keys(this.loginForm.controls).map(key => {
      objectUser[key] = this.loginForm.controls[key].value;
    });
    for( var user of this.userList){
      if(user.email== objectUser.email && user.password == objectUser.password){
        this.userService.login();
        logged = true
      }
    }
    if(!logged){
      console.log("usuario o contraseña erronea");
    }

  }
  
}
