import { Component, OnInit } from '@angular/core';

export interface IMenuList {
  label: string;
  path: string;
  icon?: string;
  svgUrl?: string;

}

export const MENUS: Array<IMenuList> = [
  {
    label: 'Dynamic NG_Content',
    path: 'dynamic-template',
    icon: 'fa-file-image-o',
    svgUrl: 'assets/svgs/template.svg'
  },
  {
    label: 'Pipe Test',
    path: 'pipe-test',
    icon: 'fa-camera-retro',
    svgUrl: 'assets/svgs/pipe.svg'
  },
  {
    label: 'SVG Icons',
    path: 'svg-icons',
    icon: 'fa-picture-o',
    svgUrl: 'assets/svgs/svgicon.svg'
  },
  {
    label: 'Spinner',
    path: 'spinner',
    icon: 'fa-picture-o',
    svgUrl: 'assets/svgs/spinner.svg'
  },
  {
    label: 'Flex Tables',
    path: 'flex-table',
    icon: 'fa-picture-o',
    svgUrl: 'assets/svgs/table.svg'
  },
  {
    label: 'HTML Treeview Table',
    path: 'html-treeview-table',
    icon: 'fa-picture-o',
    svgUrl: 'assets/svgs/treeview.svg'
  }
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
