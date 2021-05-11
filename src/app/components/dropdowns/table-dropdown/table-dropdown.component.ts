import { Component, AfterViewInit, ViewChild, ElementRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { createPopper } from "@popperjs/core";
import { GameService } from "src/app/services/game.service";
import { Router } from '@angular/router';
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-table-dropdown",
  templateUrl: "./table-dropdown.component.html",
})
export class TableDropdownComponent implements AfterViewInit {
  
  constructor(private gameService : GameService, private categoryService: CategoryService, private translate: TranslateService, private router: Router) {
  }
  dropdownPopoverShow = false;
  @Input() id;
  @Input() entidad;
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
  editEntity(id): void {
    if(this.entidad == "game") {
      this.router.navigate(['/admin/games/edit', id]);
    }
    if(this.entidad == "category") {
      this.router.navigate(['/admin/categories/edit', id]);
    }
  }
  deleteEntity(id): void {
    
    if (confirm(this.translate.instant('components.dropdowns.table_dropdown.message'))) {
      if(this.entidad == "game") {
        this.gameService.deleteGame(id);
      }
      if(this.entidad == "category") {
        this.categoryService.deleteCategory(id);
      }
    }
  }
}
