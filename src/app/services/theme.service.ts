import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: string;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  //initialize the theme
  initTheme() {

    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  //update theme - add and remove classes from body
  update(theme: 'darkMode' | 'lightMode') {
    this.setColorTheme(theme);
    const previousColorTheme = (theme === 'darkMode' ? 'lightMode' : 'darkMode');
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }
  //return true if dark mode is active
  isDarkMode() {
    return this.colorTheme === 'darkMode';
  }
  //set theme in localstorage
  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('userTheme', theme);
  }
  //get theme from localstorage
  private getColorTheme() {
    if (localStorage.getItem('userTheme')) {
      this.colorTheme = localStorage.getItem('userTheme');
    }
    else {
      this.colorTheme = 'lightMode';
    }
  }
}
