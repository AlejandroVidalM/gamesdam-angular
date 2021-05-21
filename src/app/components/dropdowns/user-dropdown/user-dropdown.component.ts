import { Input } from "@angular/core";
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { createPopper } from "@popperjs/core";
import { User } from "src/app/models/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {
  
  constructor(private translate: TranslateService, private authService: AuthService, private usersService: UsersService) {
  }

  user=undefined;
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  logout(){
    this.authService.signOut();
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    debugger;
  }
}
