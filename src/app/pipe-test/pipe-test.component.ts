import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef, HostListener } from '@angular/core';
import { FormatNumberPipe } from '../common/pipes/format-number.pipe';
import { INumberMaskConfig } from '../common/number-mask/contracts';
import { NgForm, FormBuilder } from '@angular/forms';
import { BaseComponent } from '../common/base.component';

import { cloneDeep } from 'lodash';
import { HelperUtility } from './helper.util';
import { FieldType } from '../common/emuns/enumration';
import { IGridTemplate } from '../material-grid/grid-model';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDailogComponent } from '../common/common-dailog/common-dailog.component';
import { DomHandler, KEYS } from '../directive/dom/domhandler';

@Component({
  selector: 'app-pipe-test',
  templateUrl: './pipe-test.component.html',
  styleUrls: ['./pipe-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipeTestComponent extends BaseComponent implements OnInit {
  @ViewChild('dataForm', { static: true }) dataForm: NgForm;

  @ViewChild('actionCellTemplate', { static: false }) actionCellTemplate: TemplateRef<any>;

  panelTitle = `Pipe Testing
  Learn very very cool Error notification with using keyframe animation.
  Strong keyframe fundamental with angular reusable custom error massges.`;
  selectedData: any;
  numberList: Array<number>;
  baseOptions: INumberMaskConfig;
  currencyOptions: INumberMaskConfig;
  floatOptions: INumberMaskConfig;
  numberOptions: INumberMaskConfig;
  percentageOptions: INumberMaskConfig;

  gridData: Array<any>;
  columnsDef: Array<IGridTemplate>;

  animal: string;
  name: string;

  constructor(private fb: FormBuilder,
    private readonly formatNumber: FormatNumberPipe,
    public dialog: MatDialog
  ) {
    super();
    this.baseOptions = cloneDeep(HelperUtility.getNumberMaskBaseOption());
    this.currencyOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
      prefix: 'QAR ',
    };
    this.floatOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
    };
    this.percentageOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
      suffix: '%'
    };
    this.numberOptions = { ...this.baseOptions };
    this.selectedData = {
      totalMarks: 458965278,
      salary: 168796
    };
    this.validationMessages = HelperUtility.setValidationMessages();
  }

  ngOnInit() {
    this.dataForm.form = HelperUtility.setValidationRules(this.fb);
    this.valueChanges(this.dataForm.form, false);
    this.formatNumbers();
    // this.loadGridData(5);
    // const columnsDef = this.getColDef();
    // this.columnsDef = [...columnsDef];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommonDailogComponent, {
      width: '80%',
      height: '100%',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  private formatNumbers(): number[] {
    const numbers: number[] = [0.0072926858383571816, 45250, 3548761125, 362000, 46.5, 85.19050544986521, 0, 4, 13669.694689655173, 25880, 37.7615875404839, 37.723825952943415, 37.7615875404839];
    const formatNumbers: number[] = [];
    numbers.forEach(element => {
      formatNumbers.push(this.formatNumber.transform(element, null));
    });
    this.numberList = [...formatNumbers];
    // console.log('formatNumbers', formatNumbers);

    return formatNumbers;
  }



  private getColDef() {
    const colDef: Array<IGridTemplate> = [
      {
        field: 'header1',
        header: 'Freeze column',
        clazz: 'fixed-side sticky-col first-col'
      },
      {
        field: 'actions',
        header: 'Actions',
        // type: FieldType.TEMPLATE,
        cellTemplate: this.actionCellTemplate,
        clazz: 'fixed-side sticky-col second-col'
        // row-align
      },
      {
        field: 'header2',
        header: 'Header 2',
      },
      {
        field: 'header13',
        header: 'Header 13',
        type: FieldType.DATE_BOX,
      },
      {
        field: 'header3',
        header: 'Header 3',
      },
      {
        field: 'header4',
        header: 'Header 4',
      },
      {
        field: 'header5',
        header: 'Header 5',
      },
      {
        field: 'header6',
        header: 'Header 6',
      },
      {
        field: 'header7',
        header: 'Header 7',
      },
      // {
      //   field: 'header8',
      //   header: 'Header 8',
      // },
      // {
      //   field: 'header9',
      //   header: 'Header 9',
      // },
      // {
      //   field: 'header10',
      //   header: 'Header 10',
      // },
      // {
      //   field: 'header11',
      //   header: 'Header 11',
      // },
      // {
      //   field: 'header12',
      //   header: 'Header 12',
      // },
      {
        field: 'header12',
        header: 'Header 12',
        type: FieldType.NUMBER_BOX,
      },
    ];
    return colDef;
  }

  loadGridData(rows: number) {
    const gridData = [];
    try {
      for (let index = 0; index < rows; index++) {
        gridData.push({
          'header1': `Left Column`,
          'header2': `Cell content longer ${index}`,
          'header3': `Cell content ${index}`,
          'header4': `Cell content ${index}`,
          'header5': `Cell content ${index}`,
          'header6': `Cell content ${index}`,
          'header7': `Cell content ${index}`,
          'header8': `Cell content ${index}`,
          'header9': `Cell content ${index}`,
          'header10': `Cell content ${index}`,
          'header11': `Cell content ${index}`,
          'actions': null,
          'header12': null,
          'header13': null,
        });
      }
      const _gridData = [...gridData];
      of(_gridData).pipe(delay(1000)).subscribe(result => {
        if (result) {
          this.gridData = [...result];
        }
      });
    } catch (error) {

    } finally {
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {

    const browser = DomHandler.getBrowser();

    if (e.altKey) {
      return;
    }

    const k = DomHandler.getKey(e);

    if (k === 13) {
      return;
    }

    if (browser.mozilla && (DomHandler.isNavKeyPress(e) || k === KEYS.BACKSPACE || (k === KEYS.DELETE && e.charCode === 0))) {
      return;
    }

    const c = DomHandler.getCharCode(e);
    const cc = String.fromCharCode(c);

    if (browser.mozilla && (DomHandler.isSpecialKey(e) || !cc)) {
      return;
    }

    if (navigator.platform.match('Mac')) {
      this.handleMacKeyEvents(e);
    } else {
      this.handleWindowsKeyEvents(e);
    }

  }


  onKeyDown1(event): void {
    // Detect platform
    if (navigator.platform.match('Mac')) {
      this.handleMacKeyEvents(event);
    } else {
      this.handleWindowsKeyEvents(event);
    }
  }

  handleMacKeyEvents(event) {
    // MetaKey documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
    const c = DomHandler.getCharCode(event);
    const charCode = String.fromCharCode(c).toLowerCase();
    // const charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.metaKey && charCode === 's') {
      // Action on Cmd + S
      event.preventDefault();
    }
  }

  handleWindowsKeyEvents(event) {
    const c = DomHandler.getCharCode(event);
    const charCode = String.fromCharCode(c).toLowerCase();
    // const charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey && charCode === 's') {
      // Action on Ctrl + S
      event.preventDefault();
      alert('CTRL + S working...!!!')
    }
  }


  // tslint:disable-next-line:member-ordering
  actions = {
    modelChanges: () => {

    },
    onSubmit: () => {
      const valueObj = this.dataForm.form.value;
      console.log('====================================');
      console.log('submit', valueObj, this.dataForm);
      console.log('====================================');
    }
  };

}
