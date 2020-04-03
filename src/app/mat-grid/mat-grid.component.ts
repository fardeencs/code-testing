import { IGridTemplate, PaginationUtil, PAGINATION, IGridConfig } from '../material-grid/grid-model';
import { Component, AfterViewInit, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef, ElementRef, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, merge } from 'rxjs/operators';
// import { fromEvent } from 'rxjs/observable/fromEvent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FieldType } from '../common/emuns/enumration';
import { cloneDeep, map as lMap, filter as lFilter, find as lFind, isEmpty, pickBy as lPickBy } from 'lodash';

@Component({
  selector: 'app-mat-grid',
  templateUrl: './mat-grid.component.html',
  styleUrls: ['./mat-grid.component.scss']
})
export class MatGridComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input('data')
  set data(value: Array<any>) {
    if (!isEmpty(value)) {
      this.unchangedData = cloneDeep(value);
      this.dataSource.data = value;
      this.dataSourceLength = this.dataSource.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else{
      this.dataSource.data = [];
      this.dataLength = 0;
    }
  }
  get data(): Array<any> {
    return this.dataSource;
  }

  @Input('gridTemplateOptions')
  set gridTemplateOptions(value: Array<IGridTemplate>) {
    if (!isEmpty(value)) {
      this.displayedColumns = this.getDisplayedColumnNames(value);
      this.columnsDef = this.getDisplayedColumnObjects(value);
      const updatedColumnsDef = this.updatedColumnsDef(this.columnsDef);
      this.dateColumns = lPickBy(this.columnsDef, (d: IGridTemplate) =>
        d.type === FieldType.DATE || d.type === FieldType.DATE_TIME
      );
    }
  }
  get gridTemplateOptions(): Array<IGridTemplate> {
    return this.columnsDef;
  }

  // @Input('pagination')
  // set paginationData(value: PaginationUtil) {
  //   if (value) {
  //     this.pagination = cloneDeep(value);
  //     this.paginator.pageSize = this.pagination.pageSize;
  //     const available = _.findIndex(this.pageSizeOptions, f => f === this.pagination.pageSize);
  //     if (available < 0) {
  //       this.pageSizeOptions.push(this.pagination.pageSize);
  //     }
  //   }
  // }
  // get paginationData(): PaginationUtil {
  //   return this.pagination;
  // }
  // @Input('containerStyle')
  // set tblStyle(value: Array<string>) {
  //   if (!_.isEmpty(value)) {
  //     this.containerStyle = value.join(' ');
  //   } else {
  //     this.containerStyle = 'tbl-container';
  //   }
  // }

  constructor(private datePipe: DatePipe,
    public dialog: MatDialog) {
    // this.config = HerlperUtil.setGridConfig(false);
  }

  unchangedData: Array<any>;
  dataSource: any = new MatTableDataSource();
  dataLength: number;
  columnsDef: IGridTemplate[];
  dataSourceLength = 0;
  pageSize: number = PAGINATION.pageSize;
  pageSizeOptions: Array<number> = PAGINATION.pageSizeOptions;
  displayedColumns: any[] = [];
  dateColumns: any;
  dataSubject = new BehaviorSubject<any[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  selectedIndex= -1;
  oldRowIndex = -1;
  // containerStyle: string;
  pagination: PaginationUtil = {
    pageSize: PAGINATION.pageSize
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild('gridActionTmpl', { static: true }) gridActionTmpl: TemplateRef<any>;
  @ViewChild('dateTmpl', { static: true }) dateTmpl: TemplateRef<any>;
  @ViewChild('dateTimeTmpl', { static: true }) dateTimeTmpl: TemplateRef<any>;


  // tslint:disable-next-line: no-output-rename
  @Output('search')
  searchEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('onRowSelect')
  onRowSelectEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('onCellSelect')
  onCellSelectEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('editCellData')
  editCellDataEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('deleteCellData')
  deleteCellDataEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('search')
  searchDataEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('saveData')
  saveDataEvent: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('paginator')
  paginationEvent: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-input-rename
  @Input('path') path: string;
  // tslint:disable-next-line: no-input-rename
  @Input('paths') paths: {};
  // tslint:disable-next-line: no-input-rename
  @Input('config') config: IGridConfig;
  // tslint:disable-next-line: no-input-rename
  @Input('filters') filters: Array<any>;
  @Input() styleClass: string;
  @Input() gridTitle: string;
  // tslint:disable-next-line: no-input-rename
  @Input('matTable') matTable = true;
  // tslint:disable-next-line: no-input-rename
  @Input('id') gridId: string = 'qib-ui-grid';
  // tslint:disable-next-line: no-input-rename
  @Input('containerStyle') containerStyle: string= 'tbl-container';


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //   tap(() => {
    //     this.oldRowIndex = -1;
    //     this.pagination.pageNumber = this.paginator.pageIndex + 1;
    //     this.pagination.pageSize = this.paginator.pageSize;
    //     if (this.config.server) {
    //       if (this.config.serverSort) {
    //         this.pagination.sortColumn = this.sort.active;
    //         this.pagination.sortOrder = this.sort.direction;
    //       }
    //       this.pagination.filters = this.filters;
    //       this.paginationEvent.emit(this.pagination);
    //     } else {
    //       // const _data = PaginationUtil.pagination(
    //       //   this.unchangedData,
    //       //   this.pagination.pageNumber,
    //       //   this.pagination.pageSize
    //       // );
    //       // this.dataSubject.next(_data.data);
    //       // this.dataSourceLength = this.unchangedData["total"];
    //     }
    //   })
    //   )
    //   .subscribe();
  }

  ngAfterViewChecked(): void {
    if (this.unchangedData && this.oldRowIndex !== -1 && this.oldRowIndex <= this.unchangedData.length) {
      this.highLightSelectRow(this.oldRowIndex);
    }
  }


  private addTemplate(data: IGridTemplate) {
    switch (data.type) {
      case FieldType.DATE:
        data.cellTemplate = this.dateTmpl;
        break;
      case FieldType.DATE_TIME:
        data.cellTemplate = this.dateTimeTmpl;
        break;
      default:
        data.type = FieldType.TEXT;
        data.titlecase = data.titlecase ? !data.titlecase : true;
        break;
    }
    return data;
  }

  private updatedColumnsDef(data: Array<IGridTemplate>): Array<IGridTemplate> {
    return lMap(data, (d: IGridTemplate) => this.addTemplate(d));
  }

  private getDisplayedColumnObjects(templateOptions: IGridTemplate[]): IGridTemplate[] {
    const columnsDef: IGridTemplate[] = templateOptions.filter((column: IGridTemplate) => !column.hide);
    if (this.config.showActions) {
      columnsDef.unshift({
        header: 'Actions',
        field: 'actions',
        cellTemplate: this.gridActionTmpl
      });
    }
    return columnsDef;
  }

  private getDisplayedColumnNames(templateOptions: IGridTemplate[]): string[] {
    const displayedCols: string[] = templateOptions.filter((column: IGridTemplate) => !column.hide)
      .map((column: IGridTemplate) => column.field);
    if (this.config.showActions) {
      displayedCols.unshift('actions');
    }

    return displayedCols;
  }

  private roolbackOldIndex(): void {
    if (this.unchangedData && this.oldRowIndex !== -1 && this.oldRowIndex <= this.unchangedData.length) {
      this.oldRowIndex = -1;
    }
  }


  private searchData(value: any) {
    if (!value) { return; }

    // if (this.config.server) {
    //   this.pagination.pageNumber = 0;
    //   this.pagination.searchTerm = value;
    //   this.paginationEvent.emit(this.pagination);
    // } else {
    //   const _data = HerlperUtil.searchData(
    //     this.unchangedData['data'],
    //     value,
    //     null,
    //     this.dateColumns
    //   );
    //   if (this.config.onLoad) {
    //     const _data = HerlperUtil.searchByText(this.unchangedData['data'], value, null);
    //     this.dataSubject.next(_data);
    //     this.dataSourceLength = this.unchangedData['total'];
    //   } else {
    //     this.searchDataEvent.emit(value);
    //   }
    // }
  }

  private isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
  }

  private highLightSelectRow(rowIndex: number) {
    const id = 'row-' + rowIndex;
    this.oldRowIndex = rowIndex;
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = '#f9f9db';
    }
  }


  // tslint:disable-next-line: member-ordering
  actions = {
    search: event => {
      //  applyFilter(filterValue: string) {
      // filterValue = filterValue.trim();
      // filterValue = filterValue.toLowerCase();
      // this.dataSource.filter = filterValue;
      // }
    },
    editData: event => {
      this.onCellSelectEvent.emit(event);
    },
    deleteData: event => {
      this.onCellSelectEvent.emit(event);
    },
    onRowSelect: (event, crntRowIndex) => {
      // tslint:disable-next-line: triple-equals
      if (this.oldRowIndex != -1 && this.unchangedData.length >= this.oldRowIndex) {
        const id = 'row-' + this.oldRowIndex;
        const even = this.isEven(this.oldRowIndex);
        const element = document.getElementById(id);
        if (even && element) { element.style.backgroundColor = '#fff'; }
        else if (element) { element.style.backgroundColor =  '#f0f4f7'; }
      }

      this.highLightSelectRow(crntRowIndex);
      this.onRowSelectEvent.emit(event);
    },
    onCellSelect: event => {
      this.onCellSelectEvent.emit(event);
    },
    searchData: event => {
      this.searchData(event);
    },
    saveData: () => {
      this.saveDataEvent.emit(this.unchangedData);
    }
  };

}
