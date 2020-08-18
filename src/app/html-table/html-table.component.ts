import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output, HostListener, Injector, Inject, ViewEncapsulation } from '@angular/core';
import { isEmpty, cloneDeep, each, find, filter as lFilter, map as lMap, pick as lPick, isEqual } from 'lodash';
import { IGridTemplate } from '../material-grid/grid-model';
import { DOCUMENT } from '@angular/common';
import { FieldType } from '../common/emuns/enumration';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, pairwise, map, filter } from 'rxjs/operators';

const MASK = {
  DOUBLE: /^-?\d*\.?\d*$/
}
const delayTime = 400;

@Component({
  selector: 'app-html-table',
  templateUrl: './html-table.component.html',
  styleUrls: ['./html-table.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class HtmlTableComponent implements OnInit {

  private readonly H_CHECK_BOX = 'H_CHECK_BOX';
  private readonly MM_DD_YYYY_SLASH = 'MM/dd/yyyy';
  private readonly selectedRowColor = '#f9f9db';
  gridData: any = [];
  unchangedData: Array<any>;
  unchangedColumns: Array<any>;
  columns: Array<IGridTemplate>;
  isChecked: boolean = false;
  selectedIndex: number = -1;
  oldRowIndex: number = -1;
  regex: RegExp;
  txtQueryChanged: BehaviorSubject<{}> = new BehaviorSubject<{}>(null);

  @ViewChild('dateTmpl', {static: true}) dateTmpl: TemplateRef<any>;
  @ViewChild('chkBoxTmpl', {static: true}) chkBoxTmpl: TemplateRef<any>;
  @ViewChild('numberTmpl', {static: true}) numberTmpl: TemplateRef<any>;
  @ViewChild('dropdownTmpl', {static: true}) dropdownTmpl: TemplateRef<any>;
  @ViewChild('textBoxTmpl', {static: true}) textBoxTmpl: TemplateRef<any>;
  @ViewChild('numberBoxTmpl', {static: true}) numberBoxTmpl: TemplateRef<any>;
  @ViewChild('dateBoxTmpl', {static: true}) dateBoxTmpl: TemplateRef<any>;


  @Output('onRowSelect') onRowSelectEvent: EventEmitter<any> = new EventEmitter();
  @Output('onDropdownChanged') onDropdownChanged: EventEmitter<any> = new EventEmitter();

  @Input('showCheckBox') showCheckBox: boolean = false;
  @Input('isCheckBoxCheked') isCheckBoxCheked: boolean = false;
  @Input('tblId') tblId: string;
  @Input('containerStyle') containerStyle: string = 'table-container';
  @Input('tagBeforeBody') tagBeforeBody: string;
  @Input('showHeader') showHeader: boolean = false;

  @Input('columnsDef')
  set columnsDef(value: Array<IGridTemplate>) {
    if (!isEmpty(value)) {
      this.unchangedColumns = cloneDeep(value);
      const _columns = this.unchangedColumns.filter((column: IGridTemplate) => !column.hide);
      this.updatedColumnsDef(_columns);
      if (this.showCheckBox) {
        _columns.unshift({
          header: '#',
          field: this.H_CHECK_BOX,
          cellTemplate: this.chkBoxTmpl,
          headerCheckBox: true,
          value: null,
          clazz: 'action-checkbox sticky-col freeze-checkbox'
        });
      }
      this.columns = [..._columns];
    }
  }
  get columnsDef(): Array<IGridTemplate> {
    return this.columns;
  }

  @Input('data')
  set data(value: Array<any>) {
    if (!isEmpty(value)) {
      this.unchangedData = cloneDeep(value);
      const dataHeader = lMap(this.unchangedColumns, (d: IGridTemplate) => (d.field));
      this.gridData = lMap(this.unchangedData, row => (lPick(row, dataHeader)));
      if (this.isCheckBoxCheked) {
        this.updateCheckBoxValues(true);
      }
    } else {
      this.gridData = [];
    }
  }
  get data(): Array<any> {
    return this.gridData;
  }

  constructor(private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.queryChanges();
  }

  private updatedColumnsDef(data: Array<IGridTemplate>): Array<IGridTemplate> {
    return each(data, (d: IGridTemplate) => this.addTemplate(d));
  }

  private addTemplate(data: IGridTemplate) {
    switch (data.type) {
      case FieldType.DATE:
        data.cellTemplate = this.dateTmpl;
        data.formate = data.formate ? data.formate : this.MM_DD_YYYY_SLASH;
        break;
      case FieldType.NUMBER:
        data.cellTemplate = this.numberTmpl;
        break;
      case FieldType.TEXT_BOX:
        data.cellTemplate = this.textBoxTmpl;
        data.clazz = 'cell-text-box ' + (data.clazz ? data.clazz : '');
        break;
      case FieldType.NUMBER_BOX:
        data.cellTemplate = this.numberBoxTmpl;
        data.clazz = 'cell-number-box ' + (data.clazz ? data.clazz : '');
        break;
        case FieldType.DATE_BOX:
          data.cellTemplate = this.dateBoxTmpl;
          data.clazz = 'cell-date-box ' + (data.clazz ? data.clazz : '');
          break;
      // case FieldType.CHECK_BOX:
      //   data.cellTemplate = this.chkBoxTmpl;
      //   data.headerCheckBox = true;
      //   break;
      case FieldType.DROPDOWN:
        data.cellTemplate = this.dropdownTmpl;
        data.clazz = 'cell-table-dropdown '+ (data.clazz ? data.clazz : '');
        break;
      default:
        data.type = FieldType.TEXT;
        data.titlecase = data.titlecase ? !data.titlecase : true;
        break;
    }
    return data;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (!this.tblId) {
      alert('Must pass unique table ID');
    }
  }

  private setDefaultValue(value: string, column: IGridTemplate){
    console.log('setDefaultValue',this.unchangedData, column, value);

  }

  private updateCheckBoxValues(val: boolean) {
    each(this.columns, (c: IGridTemplate) => {
      each(this.gridData, g => {
        if (c.field === this.H_CHECK_BOX) {
          g[c.field] = val;
        }
      });
    });
  }

  private toggelAllRows(val: boolean) {
    let data = null;
    if (val) {
      data = this.gridData;
    } else {
      data = null;
    }
    const eventData = {
      data: data,
      column: null,
      rowIndex: -1,
      operation: val
    };
    console.log('toggelAllRows', eventData);
    this.onRowSelectEvent.emit(eventData);
  }

  private isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
  }

  private highLightSelectRow(index: number, event: any) {
    const element = event.currentTarget;
    if (element) {
      element.style.backgroundColor = this.selectedRowColor;
    }
  }

  private optionallyUpdateGridData(values: any) {
    let ok = true;
    const { rowcolumn, element, index, key } = values;
    const attrVal = element[rowcolumn.field];
    switch (rowcolumn.type) {
      case FieldType.NUMBER_BOX:
        const regex = new RegExp(MASK.DOUBLE);
        ok = regex.test(attrVal);
        if (!ok) {
          each(this.gridData, g => {
            if (isEqual(element, g)) {
              g[rowcolumn.field] = null;
              return false;
            }
          });
        }
        break;
      default:
        break;
    }
  }

  queryChanges() {
    this.txtQueryChanged.pipe(
      debounceTime(delayTime),
      distinctUntilChanged()
    ).subscribe((result: any) => {
      if (result) {
        this.optionallyUpdateGridData(result);
        //   delete item[this.H_CHECK_BOX];
        //   const eventData = {
        //     data: item,
        //     column: column,
        //     rowIndex: -1,
        //     operation: event.checked
        //   }
        console.log('queryChanges', result);
        //   this.onRowSelectEvent.emit(eventData);
      }
    });
  }

  // @HostListener('keyup', ['$event'])
  // onKeyPress(e: KeyboardEvent) {
  //   const value = e.target['value'];
  //   let ok = true;
  //   if (value) {
  //     const regex = new RegExp(MASK.DOUBLE);
  //     ok = regex.test(value);
  //     const ctrlElem: HTMLElement = this.document.getElementById(e.srcElement.getAttribute('id'));
  //     if (!ctrlElem) return;

  //     if (!ok) {
  //       ctrlElem.style.border = '1px solid red';
  //       e.target['value'] = null;
  //       e.preventDefault();
  //     } else {
  //       ctrlElem.style.border = '2px solid #ccc';
  //     }
  //   }
  // }



  // tslint:disable-next-line: member-ordering
  actions = {
    headerCheckBoxChanged: event => {
      console.log('checkboxChanged', event);
      if (event) {
        this.updateCheckBoxValues(true);
      } else {
        this.updateCheckBoxValues(false);
      }
      this.toggelAllRows(event);
    },
    onRowSelect: (item, crntRowIndex, event) => {
      // event.preventDefault();
      this.highLightSelectRow(crntRowIndex, event);
      const column = this.unchangedColumns.find((f: IGridTemplate) => f.hide && f.field === f.header);
      const eventData = {
        data: item,
        column: column,
        rowIndex: crntRowIndex,
        operation: true
      }
      // console.log('onRowSelect', eventData);
      this.onRowSelectEvent.emit(eventData);
    },
    onCheckBoxChanged: (event, item) => {
      const column = this.unchangedColumns.find((f: IGridTemplate) => f.hide && f.field === f.header);
      if (event.checked) {
        this.highLightSelectRow(-1, event);
      } else {

      }
      delete item[this.H_CHECK_BOX];
      const eventData = {
        data: item,
        column: column,
        rowIndex: -1,
        operation: event.checked
      }
      // console.log('onCheckBoxChanged', eventData);
      this.onRowSelectEvent.emit(eventData);
    },
    dropdownChanged: (rowcolumn: IGridTemplate, element: any, index: number, key: string) => {
      const column = this.unchangedColumns.find((f: IGridTemplate) => f.hide && f.field === f.header);
      // delete element[this.H_CHECK_BOX];
      const eventData = {
        data: element,
        gridData: this.gridData,
        column : column,
        rowcolumn: rowcolumn,
        rowIndex: index,
      }
      this.onDropdownChanged.emit(eventData);
    },
    onModelChange: (rowcolumn: IGridTemplate, element: any, index: number, key: string) => {
      const data = { rowcolumn, element, index, key };
      switch (key) {
        case 'TEMPLATE_CHANGED':
          this.txtQueryChanged.next(data);
          break;
        default:
          break;
      }
    }
  }

}
