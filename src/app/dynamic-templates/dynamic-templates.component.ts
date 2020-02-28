import { Component, OnInit, NgModule, ViewChild, ViewContainerRef, Compiler, TemplateRef, Inject, ViewEncapsulation } from '@angular/core';
import { CommonFactoryService, IComponetProperties } from '../common/common-factory.service';
import { PopupComponent } from '../common/popup/popup.component';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
// import { MaterialDailogComponent } from '../common/material-dailog/material-dailog.component';
import { LoadingService } from '../common/loading.service';
import { ElementLoaderService } from '../common/element-loader.service';
import { Bouncing } from '../angular-animation.constant';
import * as _ from 'lodash';
import { log } from 'util';
// import _ from lodash;
// import { setTimeout, setInterval } from 'timers';

@Component({
  selector: 'app-dynamic-templates',
  templateUrl: './dynamic-templates.component.html',
  styleUrls: ['./dynamic-templates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Bouncing
})
export class DynamicTemplatesComponent implements OnInit {
  gridData: Array<any>;
  columnDef: Array<any>;
  showTempl = true;
  isLoading = false;
  information: any;
  selectedData: any = {};
  startTime: number;
  // @ViewChild('container', { static: false, read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('tableTmpl', { static: false }) tableTmpl: TemplateRef<any>;
  @ViewChild('informationTmpl', { static: false }) informationTmpl: TemplateRef<any>;
  constructor(private compiler: Compiler,
    private commonFactoryService: CommonFactoryService,
    public dialog: MatDialog,
    private vcRef: ViewContainerRef,
    private loadingService: LoadingService,
    private elementLoaderService: ElementLoaderService,
    @Inject(DOCUMENT) private document: Document) {
    this.information = {
      name: 'Fardeen ahmad',
      address: 'Lucknow Uttar Pradesh, India'
    };
    this.selectedData = { ...this.selectedData, empName: 'Shavez Ahmad' };
  }

  // callme() {
  //   loadingServiceShow(10040, 'loadingDiv', false);
  // }
  // callmestop() {
  //   loadingServiceHide('loadingDiv');
  // }

  private updateInfo(): void {
    this.selectedData = {
      ...this.selectedData,
      empName: this.selectedData.empName.concat(' India Lucknow.')
    };
  }

  ngOnInit() {
    this.loadGridData(10);
    this.getColDef();

    // this.loadingService.loadingServiceShow(10000, 'popup', true);
  }

  heighlight(id: string) {
    const ctrlId: HTMLElement = this.document.getElementById(id);
    if (ctrlId) {
      // ctrlId.classList.add('flash');
      const input = ctrlId.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
      input.classList.add('flash-text');
      this.updateInfo();
      setTimeout(() => {
        input.classList.remove('flash-text');
      }, 1810);
      // const startTime = new Date().getTime();
      // const timer = setInterval(() => {
      //   console.log('timer', timer);
      //   if ((new Date().getTime() - startTime) >= 2001) {
      //     clearInterval(timer);
      //     return;
      //   } else {
      //     const isActive = input.classList.contains('flash');
      //     if (isActive) {
      //       input.classList.remove('flash');
      //     } else {
      //       input.classList.add('flash');
      //     }
      //   }
      // }, 400);
      // setTimeout(() => {
      //   input.classList.remove('flash');
      //   clearInterval(timer);
      // }, 2000);
    }
  }

  private getColDef() {
    const colDef = [
      {
        field: 'header1',
        header: 'Freeze column',
        class: 'fixed-side sticky-col first-col'
      },
      {
        field: 'actions',
        header: 'Actions',
        type: 'ACTIONS',
        class: 'fixed-side sticky-col second-col row-align'
      },
      {
        field: 'header2',
        header: 'Header 2',
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
        type: 'TEXT_BOX'
      },
    ];
    this.columnDef = colDef;
  }


  loadGridData(rows: number) {
    // this.callme();
    this.elementLoaderService.startLoader('loadingDiv', 100);
    const gridData = [];
    for (let index = 0; index < rows; index++) {
      gridData.push({
        'header1': `Left Column`,
        'actions': null,
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
        'header12': null,
      });
      of(gridData).pipe(delay(1000)).subscribe(result => {
        if (result) {
          this.gridData = result;
          this.elementLoaderService.stopeLoader('loadingDiv');
          // this.callmestop();
        }
      });
    }
  }

  onChkBoxChange(event: MouseEvent, element: any, column: any, ind: number) {
    console.log('onChkBoxChange', event);
    const val: boolean = event.target['checked'];
    const id = event['toElement'].getAttribute('id');
    console.log('val', val, id);
    const elem: HTMLElement = this.document.getElementById(id);
    const parentElem: HTMLElement = elem.parentElement.parentElement.parentElement;
    parentElem.classList.add('blink-row');
    if (val) {
      _.each(parentElem.children, (d: HTMLElement) => {
        d.style.backgroundColor = '#f8ff9c';
      });
    } else {
      if (ind % 2 === 0) {
        _.each(parentElem.children, (d: HTMLElement) => {
          d.style.backgroundColor = '#fff';
        });
      } else {
        _.each(parentElem.children, (d: HTMLElement) => {
          d.style.backgroundColor = '#efefef';
        });
      }
    }
    setTimeout(() => {
      parentElem.classList.remove('blink-row');
    }, 1210);
  }

  onBlur(element, column, ind) {
    console.log(element, column, ind);
    console.log('gird-data', this.gridData);
    this.heighlight('empName');
  }

  closeCell(element, column, ind) {
    console.log('close-div', element, column, ind);
    const elem: HTMLElement = document.getElementById('cell-' + ind);
    const parentElem: HTMLElement = elem.parentElement;
    _.each(parentElem.children, (d: HTMLElement) => {
      d.style.backgroundColor = '#f6fe86';
      // d.style.zIndex = '9999999999999999999';
    });
    // parentElem.style.zIndex = '999999999';
    // setTimeout(() => {
    parentElem.classList.add('hinge');
    // }, 1000);
    setTimeout(() => {
      parentElem.style.display = 'none';
      this.gridData.splice(ind, 1);
    }, 1010);
  }

  openPopup(isOpen: boolean) {
    const templateProperties = {
      data: this.gridData,
      columns: this.columnDef
    };
    const componentProperties: IComponetProperties = {
      inputs: {
        title: 'Dynamically Component & Template Binding',
      }
    };
    const templates = [
      {
        ref: this.tableTmpl,
        properties: {
          data: this.gridData,
          columns: this.columnDef
        },
      },
      {
        ref: this.informationTmpl,
        properties: {
          data: this.information
        },
      }
    ];
    // const tblDiv: HTMLElement = this.document.getElementById('popup');
    this.commonFactoryService.loadComponent(this.tableTmpl, PopupComponent, templateProperties, componentProperties, this.vcRef, true, 'dynamic-style.css');
    // this.commonFactoryService.loadTemplatesWithinComponent(templates, PopupComponent, componentProperties, this.vcRef, true,)
  }

}


