import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  langs = ['en', 'es'];
  constructor(private translate: TranslateService) { }

  getLangs() {
    return this.langs;
  }

  getSelected() {
    const lang = localStorage.getItem('lang');
    return (lang == null)? this.translate.getBrowserLang(): lang;
  }

  setSelected(lang: string) {
    localStorage.setItem('lang', lang);
  }
}
