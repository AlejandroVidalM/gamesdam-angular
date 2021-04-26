import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  
  constructor(translate: TranslateService) {
    let browserLang = translate.getBrowserLang();
    translate.setDefaultLang('en'); 
    translate.use(browserLang);
  }

  ngOnInit(): void {}
}
