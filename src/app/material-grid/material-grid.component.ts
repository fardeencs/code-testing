import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MaterialDataSource } from './grid-data-source';
import * as _ from 'lodash';
import { DataSource } from '@angular/cdk/table';


export interface IGridEditCell {
  key: string;
  value: string;
  visible: boolean;
}
export interface IGridColumnTag {
  [key: number]: IGridColumnTagValue;
  [key: string]: IGridColumnTagValue;
}
export interface IGridColumnTagValue {
  text?: string;
  color?: string;
}
export interface IGridColumnButton {
  icon?: string;
  text?: string;
  type?: string;
  color?: string;
  click?: (record: any) => void;
  pop?: boolean;
  popTitle?: string;
  children?: IGridColumnButton[];
  iif?: (record: any) => boolean;
  tooltip?: string;
}
export interface IGridColumn {
  title: string;
  field: string;
  header?: string;
  index?: string;
  checked?: boolean;
  disabled?: boolean;
  fixed?: string;
  left?: string;
  right?: string;
  width?: string;
  desc?: string;
  sort?: boolean | string;
  type?: 'text' | 'checkbox' | 'tag' | 'badge' | 'button' | 'link' | 'img' | 'number' | 'currency' | 'percent' | 'format';
  edit?: boolean;
  editType?: 'text' | 'number' | 'select' | 'textarea';
  format?: (data: any) => any;
  tag?: IGridColumnTag;
  cat?: string;
  static?: boolean;
  buttons?: IGridColumnButton[];
  videoLink?: string;
  iif?: boolean | (() => any);
  sum?: string;
  order?: number;
  cell?: any;
}

@Component({
  selector: 'app-material-grid',
  templateUrl: './material-grid.component.html',
  styleUrls: ['./material-grid.component.scss']
})
export class MaterialGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // gridDataSourse: Array<any> = ELEMENT_DATA;
  gridDataSourse: Array<any>;
  loading = false;
  selection: any = {};

  @Input('gridData')
  set gridData(value: Array<any>) {
    if (!_.isEmpty(value)) {
      this.gridDataSourse = _.cloneDeep(value);
    }
  }
  get gridData(): Array<any> {
    return this.gridDataSourse;
  }

  //   columns: IGridColumn[] = [
  //   { index: 'position', title: 'position', header: 'No.', width: '50' },
  //   { index: 'name', title: 'name', header: 'Name' },
  //   { index: 'weight', title: 'weight', header: 'Weight' },
  //   { index: 'symbol', title: 'symbol', header: 'Symbol', width: '100' },
  // ];


  // columnsDef: IGridColumn[] = [
  //   { field: 'position', index: 'position', title: 'position', header: 'No.', width: '50', cell: (element: any) => `${element.position}` },
  //   { field: 'name', index: 'name', title: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
  //   { field: 'weight', index: 'weight', title: 'weight', header: 'Weight', width: '150', cell: (element: any) => `${element.weight}` },
  //   { field: 'symbol', index: 'symbol', title: 'symbol', header: 'Symbol', width: '100', cell: (element: any) => `${element.symbol}` },
  // ];

  // columnsDef: IGridColumn[] = [
  //   { field: 'position', index: 'position', title: 'position', header: 'No.', width: '50', fixed: 'left' },
  //   { field: 'name', index: 'name', title: 'name', header: 'Name' },
  //   { field: 'weight', index: 'weight', title: 'weight', header: 'Weight', width: '150' },
  //   { field: 'symbol', index: 'symbol', title: 'symbol', header: 'Symbol', width: '100' },
  // ];

  columnsDef: IGridColumn[];
  displayedColumns: Array<string>;

  // dataSource = new MaterialDataSource();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
    this.getGridColDef(12);
    this.getGridData(12);
  }

  private getGridColDef(count: number) {
    const columnsDef = new Array<IGridColumn>();
    for (let index = 0; index < count; index++) {
      if (index === 0) {
        columnsDef.push({
          field: 'field' + index,
          index: 'field' + index,
          title: 'Title ' + index,
          header: 'Title ' + index,
          fixed: 'left',
          width: 'auto'
        });
      } else if (index === 1) {
        columnsDef.push({
          field: 'field' + index,
          index: 'field' + index,
          title: 'Title ' + index,
          header: 'Title ' + index,
          fixed: 'left',
        });
      } else {
        columnsDef.push({
          field: 'field' + index,
          index: 'field' + index,
          title: 'Title ' + index,
          header: 'Title ' + index,
          // width: 'auto',
        });
      }
    }
    this.displayedColumns = columnsDef.map(c => c.field);
    this.columnsDef = [...columnsDef];
    console.log('columnsDef', this.columnsDef, this.displayedColumns);
  }

  private getGridData(count: number) {
    const gridData = new Array<any>();
    for (let index = 0; index < count; index++) {
      gridData.push({
        'field0': this.getRandomText(),
        'field1': this.getRandomText(),
        'field2': this.getRandomText(),
        'field3': this.getRandomText(),
        'field4': this.getRandomText(),
        'field5': this.getRandomText(),
        'field6': this.getRandomText(),
        'field7': this.getRandomText(),
        'field8': this.getRandomText(),
        'field9': this.getRandomText(),
        'field10': this.getRandomText(),
        'field11': this.getRandomText(),
        'field12': this.getRandomText(),
      });
    }
    console.log('gridData', gridData);
    // this.dataSource.data.push(gridData);
    // this.gridDataSourse = [...gridData];
    this.dataSource.data = [...gridData];
    // this.dataSource.connect(gridData);
  }

  private getRandomText(): string {
    const length = 100000;
    // return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    // return Math.random().toString(length).substring(7);
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


  actions = {
    handleSortChange: (event) => {

    },
    isAllSelected: () => {

    },
    masterToggle: () => {

    }
  }

}



export const ELEMENT_DATA: Array<any> = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];






