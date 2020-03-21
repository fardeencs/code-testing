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
    svgUrl: 'template'
  },
  {
    label: 'Pipe Test',
    path: 'pipe-test',
    icon: 'fa-camera-retro',
    svgUrl: 'pipe'
  },
  {
    label: 'SVG Icons',
    path: 'svg-icons',
    icon: 'fa-picture-o',
    svgUrl: 'svgicon'
  },
  {
    label: 'Spinner',
    path: 'spinner',
    icon: 'fa-picture-o',
    svgUrl: 'spinner'
  },
  {
    label: 'Flex Tables',
    path: 'flex-table',
    icon: 'fa-picture-o',
    svgUrl: 'table'
  },
  {
    label: 'HTML Treeview Table',
    path: 'html-treeview-table',
    icon: 'fa-picture-o',
    svgUrl: 'treeview'
  },
  {
    label: 'Material Grid',
    path: 'material-grid',
    icon: 'fa-picture-o',
    svgUrl: 'grid'
  },
  {
    label: 'JSPDF Report',
    path: 'jspdf-report',
    icon: 'fa-picture-o',
    svgUrl: 'report'
  }
];
