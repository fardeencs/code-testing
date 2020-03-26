export interface IPdfTemplate {
  cordX: number;
  cordY: number;
  width: number;
  text: string;
  cellHeight?: number;
  cellWidth?: number;
  splitText?: Array<string>;
  noOfLines?: number;
  rowNo?: number;
  rowHeight?: number;
}

export interface IRectangelEntity {
  width: number;
  height: number;
  text?: string;
}

export interface IViewTemplate {

}

export enum FieldType {

}

export class JsPdfConfig{
  isCss: boolean =false;
}

export interface IJsPdfUtilEntity {
  yCord: number;
  xCord: number;
  isAllSectionHooks?: boolean;
  isActiveTotalPageSize?: boolean;
  fontSize: number;
  showHead?: boolean;
  hookData?: any;
  totalPagesExp?: any;
  config: JsPdfConfig;
}


export class AppView{

}

export interface IGridTemplate{
  field: string;
  header: string;
  value?: any;
  defaultValue?: any;
}
