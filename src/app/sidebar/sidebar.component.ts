import { Component, OnInit } from '@angular/core';

export interface IMenuList {
  label: string;
  path: string;
  icon: string;

}

export const MENUS: Array<IMenuList> = [
  {
    label: 'Dynamic Template',
    path: 'dynamic-template',
    icon: 'fa-file-image-o'
  },
  {
    label: 'Pipe Test',
    path: 'pipe-test',
    icon: 'fa-camera-retro'
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuList: Array<IMenuList>;
  themeMap = {
    dark: 'light',
    light: 'solar',
    solar: 'dark'
  };

  constructor() {
    const theme = localStorage.getItem('theme');
    const bodyClass = document.body.classList;
  }

  applyTheme(): any {
    const theme = localStorage.getItem('theme');
    const bodyClass = document.body.classList;
    // theme && bodyClass.add(theme) || (bodyClass.add('dark'), localStorage.setItem('theme', 'dark'));
  }

  private initializeMenuList() {
    this.menuList = MENUS;
  }

  ngOnInit(): void {
    this.initializeMenuList();
   }

  // tslint:disable-next-line:member-ordering
  actions = {
    toggleTheme: () => {
      const current = localStorage.getItem('theme');
      const next = this.themeMap[current];

      const bodyClass = document.body.classList;
      bodyClass.replace(current, next);
      localStorage.setItem('theme', next);
      // document.getElementById('themeButton').onclick = toggleTheme;
    }
  };


}
