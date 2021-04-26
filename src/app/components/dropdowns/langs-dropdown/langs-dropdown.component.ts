import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { createPopper } from '@popperjs/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-langs-dropdown',
  templateUrl: './langs-dropdown.component.html',
  styles: [
  ]
})
export class LangsDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRefLang", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRefLang", { static: false })
  popoverDropdownRef: ElementRef;
  langs;
  selectedLang;

  ngOnInit() {
    this.selectedLang = this.languageService.getSelected();
    this.langs = this.languageService.getLangs();
  }

  constructor(private languageService: LanguageService, private translate: TranslateService) {
    
  }

  toggleDropdownLang(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }

  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  switchLang(event, lang: string) {
    this.toggleDropdownLang(event);
    this.languageService.setSelected(lang);
    this.selectedLang = lang;
    this.translate.use(lang);
  }
}
