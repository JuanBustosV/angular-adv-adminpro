import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('Settings Service init');

    const urlTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linkTheme.setAttribute('href', urlTheme);
   }

   changeTheme( theme: string ) {
    // console.log(theme);
    const url = `./assets/css/colors/${theme}.css`;
    // console.log(linkTheme);
    // console.log(url);

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

     const links = document.querySelectorAll('.selector');

    // console.log(this.links);

    links.forEach( elemento => {

      elemento.classList.remove('working');

      const btnTheme = elemento.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme ) {
        elemento.classList.add('working');
      }

    });

  }
}
