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
    svgUrl: 'pipe'
  },
  {
    label: 'SVG Icons',
    path: 'svg-icons',
    svgUrl: 'svgicon'
  },
  {
    label: 'Spinner',
    path: 'spinner',
    svgUrl: 'spinner'
  },
  {
    label: 'Flex Tables',
    path: 'flex-table',
    svgUrl: 'table'
  },
  {
    label: 'HTML Treeview Table',
    path: 'html-treeview-table',
    svgUrl: 'treeview'
  },
  {
    label: 'Material Grid',
    path: 'material-grid',
    svgUrl: 'grid'
  },
  {
    label: 'JSPDF Report',
    path: 'jspdf-report',
    svgUrl: 'report'
  },
  {
    label: 'Reactive Form',
    path: 'reactive-form',
    svgUrl: 'report'
  },
  {
    label: 'Inline Edit Table',
    path: 'inline-edit-table',
    svgUrl: 'table'
  }
];
