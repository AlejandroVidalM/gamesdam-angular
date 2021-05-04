import { Component, AfterViewInit, ViewChild, ElementRef, Input } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: "app-table-dropdown",
  templateUrl: "./table-dropdown.component.html",
})
export class TableDropdownComponent implements AfterViewInit {
  
  constructor(private gameService : GameService) { }
  dropdownPopoverShow = false;
  @Input() uid;
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
  
  deleteGame(uid): void {
    console.log("funciona? "+uid);
    this.gameService.deleteGame(uid);
  }
}
