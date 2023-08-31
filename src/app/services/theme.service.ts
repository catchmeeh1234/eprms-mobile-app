import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  initializeDarkTheme(isDark:any) {
    this.toggleDarkTheme(isDark);

  }
  // Add or remove the "dark" class on the document body
   toggleDarkTheme(shouldAdd:any) {
    //const isDarkMode = JSON.parse('true');
    // console.log(shouldAdd);

    // console.log(typeof shouldAdd);
    document.body.classList.toggle('dark', shouldAdd);
  }
}
