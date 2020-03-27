export interface IPdfTemplate {
  cordX: number;
  cordY: number;
  width: number;
  height?: number;
  text?: string;
  rowNo: number;
  colNo: number;
  fontSize?: number;
  lineHeight?: number;
  cellHeight?: number;
  cellWidth?: number;
  splitText?: Array<string>;
  noOfLines?: number;
  rowHeight?: number;
  backGroundColor?: Color;
  borderColor?: Color;
  textColor?: Color;
  padding?: IOption;
  margin?: IOption;
}

export interface IOption {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface IRectangelEntity {
  width: number;
  height: number;
  text?: string;
}

export declare type Color = [number, number, number] | number | 'transparent' | false;
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

export interface IViewTemplate {

}

export enum FieldType {

}

export class JsPdfConfig {
  isCss: boolean = false;
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


export class AppView {

}

export interface IGridTemplate {
  field: string;
  header: string;
  value?: any;
  defaultValue?: any;
}
