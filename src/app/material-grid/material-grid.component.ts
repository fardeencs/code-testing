import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MaterialDataSource } from './grid-data-source';
import * as _ from 'lodash';

@Component({
  selector: 'app-material-grid',
  templateUrl: './material-grid.component.html',
  styleUrls: ['./material-grid.component.scss']
})
export class MaterialGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  gridDataSourse: Array<any>;

  @Input('gridData')
  set gridData(value: Array<any>) {
    if (!_.isEmpty(value)) {
      this.gridDataSourse = _.cloneDeep(value);
    }
  }
  get gridData(): Array<any> {
    return this.gridDataSourse;
  }

  columns = [
    { columnDef: 'position', header: 'No.', width: '50', cell: (element: any) => `${element.position}` },
    { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
    { columnDef: 'weight', header: 'Weight', width: '150', cell: (element: any) => `${element.weight}` },
    { columnDef: 'symbol', header: 'Symbol', width: '100', cell: (element: any) => `${element.symbol}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MaterialDataSource();

  constructor() { }

  ngOnInit() {
  }

}






