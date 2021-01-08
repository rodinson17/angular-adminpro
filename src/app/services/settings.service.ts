import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  linkTheme = document.querySelector('#theme');

  constructor() {
    const urlTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme()
  }

  checkCurrentTheme() {
    const linksTheme = document.querySelectorAll('.selector');

    linksTheme.forEach( elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) elem.classList.add('working');
    });
  }

}
