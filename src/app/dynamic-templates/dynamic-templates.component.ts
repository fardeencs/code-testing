import * as _ from 'lodash';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';
import {
  Compiler, Component, Inject, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Bouncing } from '../angular-animation.constant';
import { CommonFactoryService } from '../common/services/common-factory.service';
import { ElementLoaderService } from '../common/services/element-loader.service';
import { LoadingService } from '../common/loading.service';
import { PopupComponent } from '../common/popup/popup.component';
import { IComponetProperties, IFactoryCompoent, ILoader } from '../models/model-and-interface';

export interface IPanelInformation {
  name: string;
  address?: string;
  id?: number;
}

@Component({
  selector: 'app-dynamic-templates',
  templateUrl: './dynamic-templates.component.html',
  styleUrls: ['./dynamic-templates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Bouncing
})
export class DynamicTemplatesComponent implements OnInit, OnChanges {
  gridData: Array<any>;
  columnDef: Array<any>;
  showTempl = true;
  isLoading = true;
  // information: IPanelInformation;
  selectedData: IPanelInformation;
  startTime: number;
  // @ViewChild('container', { static: false, read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('tableTmpl', { static: false }) tableTmpl: TemplateRef<any>;
  @ViewChild('informationTmpl', { static: false }) informationTmpl: TemplateRef<any>;
  // @ViewChild('tmplateHandler', { static: false }) tmplateHandler: TemplateRef<any>;

  constructor(private compiler: Compiler,
    private commonFactoryService: CommonFactoryService,
    public dialog: MatDialog,
    private vcRef: ViewContainerRef,
    private loadingService: LoadingService,
    private elementLoaderService: ElementLoaderService,
    @Inject(DOCUMENT) private document: Document) {
    this.selectedData = {
      ...this.selectedData,
      name: this.getRandomNumber(50000, 5000000).toString(),
      address: 'Lucknow UP India'
    };
  }

  // callme() {
  //   loadingServiceShow(10040, 'loadingDiv', false);
  // }
  // callmestop() {
  //   loadingServiceHide('loadingDiv');
  // }

  private getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private updateInfo(): boolean {
    this.selectedData = {
      ...this.selectedData,
      name: this.getRandomNumber(1, 5000000).toString()
    };
    return true;
  }

  ngOnInit() {
    this.loadGridData(10);
    this.getColDef();

    // this.loadingService.loadingServiceShow(10000, 'popup', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.addMediaQuery();
  }


  addMediaQuery() {
    const mq = window.matchMedia('(max-width: 760px)');
    if (mq) {
      console.log('mq-true', mq);

    } else {
      console.log('mq-false', mq);
    }
  }

  heighlight(id: string) {
    const ctrlId: HTMLElement = this.document.getElementById(id);
    if (ctrlId) {
      // ctrlId.classList.add('flash');
      const input = ctrlId.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
      input.classList.add('flash');
      setTimeout(() => {
        input.classList.remove('flash');
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
    const loderModel: Array<ILoader> = [
      { elementId: 'loadingDiv', delay: 100 },
      { elementId: 'loadingLink' },
    ];
    this.elementLoaderService.startMultipleLoader(loderModel);
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
          this.elementLoaderService.stopMultipleLoader(loderModel);
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
    const boxShadow = '0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)';
    parentElem.classList.add('blink');
    // parentElem.style.boxShadow = boxShadow;
    if (val) {
      _.each(parentElem.children, (d: HTMLElement) => {
        // d.style.boxShadow = boxShadow;
        d.style.backgroundColor = '#f8ff9c';
      });
    } else {
      if (ind % 2 === 0) {
        _.each(parentElem.children, (d: HTMLElement) => {
          d.style.backgroundColor = '#fff';
          // d.style.boxShadow = 'none';
        });
      } else {
        _.each(parentElem.children, (d: HTMLElement) => {
          d.style.backgroundColor = '#efefef';
          // d.style.boxShadow = 'none';
        });
      }
    }
    setTimeout(() => {
      parentElem.classList.remove('blink');
    }, 1210);
  }

  onBlur(element, column, ind) {
    console.log(element, column, ind);
    console.log('gird-data', this.gridData);
    const isUpdate = this.updateInfo();
    if (isUpdate) {
      this.heighlight('empName');
    }
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
        popupTitle: 'Dynamically Component & Template Binding within Component',
        conatentTitle: 'Dynamic Template',
        extraTemplate: {
          title: 'Information Template',
          content: this.informationTmpl
        }
      }
    };
    // const tblDiv: HTMLElement = this.document.getElementById('popup');
    const factoryParams: IFactoryCompoent<PopupComponent, TemplateRef<any>> = {
      component: {
        componentType: PopupComponent,
        componetProperties: componentProperties
      },
      vcRef: this.vcRef,
      ngContent: {
        title: 'Dynamic Template',
        content: this.tableTmpl,
        templateProperties: templateProperties
      },
      isPopup: true,
      // styleSheetName: 'dynamic-style.css'
    };
    this.commonFactoryService.loadTemplateWithinComponent(factoryParams);

    const factoryParams1: IFactoryCompoent<PopupComponent, TemplateRef<any>> = {
      component: {
        componentType: PopupComponent,
        componetProperties: componentProperties
      },
      vcRef: this.vcRef,
      templates: [
        {
          title: 'Dynamic Template',
          content: this.tableTmpl,
          templateProperties: templateProperties
        },
        {
          title: 'Information Template',
          content: this.informationTmpl,
          templateProperties: this.selectedData
        }
      ],
      isPopup: true,
      // styleSheetName: 'dynamic-style.css'
    };
    // this.commonFactoryService.loadMultipleNgContentWithinComponent(factoryParams1);

  }

}


