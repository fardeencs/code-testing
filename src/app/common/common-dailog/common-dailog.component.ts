import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGridTemplate } from 'src/app/material-grid/grid-model';
import { FieldType } from '../emuns/enumration';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { each } from 'lodash';

@Component({
  selector: 'app-common-dailog',
  templateUrl: './common-dailog.component.html',
  styleUrls: ['./common-dailog.component.scss']
})
export class CommonDailogComponent implements OnInit {

  @ViewChild('actionCellTemplate', { static: true }) actionCellTemplate: TemplateRef<any>;

  gridData: Array<any>;
  columnsDef: Array<IGridTemplate>;

  constructor(
    public dialogRef: MatDialogRef<CommonDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.loadGridData(5);
    const columnsDef = this.getColDef();
    this.columnsDef = [...columnsDef];
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


  // tslint:disable-next-line: member-ordering
  actions = {
    close: () => {
      this.dialogRef.close();
    //  const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('cdk-overlay-container');
    //  each(elements, (d: HTMLElement) => {
    //    d.remove();
    //  });
    }
  };

}
