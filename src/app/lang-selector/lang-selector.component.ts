import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


interface LanguageInterface {
  url,
  text
}

@Component({
    selector: 'app-lang-selector',
    templateUrl: './lang-selector.component.html',
    styleUrls: ['./lang-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LangSelectorComponent implements OnInit {
  languages: LanguageInterface[];

  constructor() { }

  ngOnInit(): void {
    this.languages = [
      {url: 'en', text: '🇬🇧 English'},
      {url: 'hu', text: '🇭🇺 Magyar'}
    ];
    const loc = window.location;
    const base = loc.pathname.split("/").reverse()[2];
    for (const element of this.languages) {
      element.url = [loc.origin, base, element.url].join("/");
    }
  }

}
