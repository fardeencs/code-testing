import { FieldType } from "../common/emuns/enumration";
import { TemplateRef } from "@angular/core";

export interface IPdfTemplateAdapter {
  cellHeight?: number;
  cellWidth?: number;
  noOfLines?: number;
  splitText?: number;
}


export interface IOption {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface IPdfTemplate extends IPdfTemplateAdapter {
  cordY: number,
  cordX: number,
  width: number;
  height?: number;
  rowNo: number;
  columnNo: number;
  text?: string;
  rowHeight?: number;
  fontSize?: number;
  backGroundColor?: Color;
  borderColor?: Color;
  textColor?: Color;
  padding?: IOption;
  margin?: IOption;
}

export interface IRectangelEntity {
  width: number;
  height: number;
  text?: string;

  //   header: string;
  //   field: string;
  //   type?: FieldType;
  //   titlecase?: boolean;
  //   cellTemplate?: TemplateRef<any>;
  //   formate?: string;
  //   hide?: boolean;
  //   sort?: boolean;
  //   width?: number;
  //   freeze?: string;
  //   print?: boolean;
  //   clazz?: string;
  //   group?: Array<string>;
  //   order?: number;
  //   headerCheckBox?: boolean;
  //   value?: any;
  //   defaultValue?: any;
  //   collection?: Array<any>;
  //   colspan?: number;
  //   rowspan?: number;
  //   radio?: Array<any>
}

export declare type Color = [number, number, number] | [number, number, number, number] | number | 'transparent' | false;

export interface IColumn {
  raw?: any;
  dataKey: string | number;
  index?: number;
  preferredWidth?: 'auto' | 'wrap' | number;
  minWidth?: 'auto' | 'wrap' | number;
  wrappedWidth?: 'auto' | 'wrap' | number;
  width?: 'auto' | 'wrap' | number;
  header: string;
}
export interface Styles {
  font?: 'helvetica' | 'times' | 'courier' | string;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
  fillColor?: Color;
  textColor?: Color;
  halign?: 'left' | 'center' | 'right' | 'justify';
  valign?: 'top' | 'middle' | 'bottom';
  fontSize?: number;
  cellPadding?: number;
  lineColor?: Color;
  lineWidth?: number;
  cellWidth?: 'auto' | 'wrap' | number;
  minCellHeight?: number;
}

export class JsPdfConfig {
  fontSize?: number = 10;
  yCord?: number = 10;
  xCord?: number = 20;
  tableLineColor?: Color = [187, 187, 187];
  tableLineWidth?: 1;
  tableHeadeColor?: Color = [204, 204, 204];
  tableHeadeFontSize?: 11;
  tableBodyFontSize?: number = 10;
  tableTheme?: string = 'grid';
  tableAlternateRowColor?: Color = [241, 241, 241];
  isCss?: boolean = false;
  columns?: Array<IColumn>;
}

export interface IJsPdfUtilEntity {
  yCord: number;
  xCord: number;
  fontSize?: number;
  isActiveTotalPageSize?: boolean;
  totalPagesExp?: string;
  hookData?: any;
  doc?: any;
  showHead?: boolean;
  isAllSectionHooks?: boolean;
  noOfCols?: number;
  marginTop?: number;
  columnStyles?: any;
  isDidDrawPage?: boolean;
  config?: JsPdfConfig;
}



export class AppView {

}

export interface IViewTemplate {

}

export interface IGridTemplate {
  field: string;
  header: string;
  type?: FieldType;
  value?: any;
  defaultValue?: any;
  clazz?: string;
  cellTemplate?: TemplateRef<any>;
}
