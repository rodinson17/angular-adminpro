import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  /* linkTheme = document.querySelector('#theme');
  linksTheme: NodeListOf<Element>; */

  constructor(private settingsService: SettingsService) { }

  changeTheme(theme: string) {
    /* const url = `./assets/css/colors/${ theme }.css`; me llevo esto pa el servicio
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url); */
    this.settingsService.changeTheme(theme);
    //this.checkCurrentTheme();
  }

  /* checkCurrentTheme() {
    this.linksTheme.forEach( elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) elem.classList.add('working');
    });
  } */

  ngOnInit(): void {
    //this.linksTheme = document.querySelectorAll('.selector');
    //this.checkCurrentTheme();
    this.settingsService.checkCurrentTheme();
  }

}
