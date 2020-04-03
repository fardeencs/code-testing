// import { FieldType } from './enumeration';
import { TemplateRef } from '@angular/core';
import { FieldType } from '../common/emuns/enumration';

// export enum FieldType{
//   NUMBER, TEXT, DROPDOWN
// }

export class PaginationUtil {

}

export const PAGINATION = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],

};

export interface IGridConfig{
  server?: boolean;
}

export interface IGridTemplate {
  header: string;
  field: string;
  type?: FieldType;
  titlecase?: boolean;
  cellTemplate?: TemplateRef<any>;
  formate?: string;
  hide?: boolean;
  sort?: boolean;
  width?: number;
  freeze?: string;
  print?: boolean;
  clazz?: string;
  group?: Array<string>;
  order?: number;
  headerCheckBox?: boolean;
  value?: any;
  defaultValue?: any;
  collection?: Array<any>;
  colspan?: number;
  rowspan?: number;
  radio?: Array<any>;
  printWidth?: number;
  rows?: number;
  cols?: number;
}


export interface IGridConfig {
  server?: boolean;
  onLoad?: boolean;
  showActions?: boolean;
  globalSearch?: boolean;
  columnSearch?: boolean;
  showCheckbox?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  sortColumn?: string;
  sortDirection?: string;
  serverSort?: boolean;
}


export interface IViewTemplate {
  header: string;
  field: string;
  type?: FieldType;
  titlecase?: boolean;
  cellTemplate?: TemplateRef<any>;
  formate?: string;
  collection?: Array<any>;
  hide?: boolean;
  value?: any;
  defaultValue?: any;
  maxVal?: any;
  minVal?: any;
  colspan?: number;
  rowspan?: number;
}

export class AppView {
  columnOne: Array<IViewTemplate> = new Array<IViewTemplate>();
  columnTwo: Array<IViewTemplate> = new Array<IViewTemplate>();
  columnThree: Array<IViewTemplate> = new Array<IViewTemplate>();
  columnFour: Array<IViewTemplate> = new Array<IViewTemplate>();
  columnFive: Array<IViewTemplate> = new Array<IViewTemplate>();
}


