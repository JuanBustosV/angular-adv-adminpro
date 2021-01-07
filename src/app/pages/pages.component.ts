import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFucntions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {
    // <link href="./assets/css/colors/default-dark.css" id="theme" rel="stylesheet">
    // const urlTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    // this.linkTheme.setAttribute('href', urlTheme);
    customInitFucntions(); // en assets/js/custom.js
  }

}
