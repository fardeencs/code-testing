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
// import { setTimeout, setInterval } from 'timers';


// declare function loadingServiceShow(zindex, id, flag);
// declare function loadingServiceHide(id);

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
      input.classList.add('flash');
      const startTime = new Date().getTime();
      const timer = setInterval(() => {
        console.log('timer', timer);
        if ((new Date().getTime() - startTime) >= 2001) {
          clearInterval(timer);
          return;
        } else {
          const isActive = input.classList.contains('flash');
          if (isActive) {
            input.classList.remove('flash');
          } else {
            input.classList.add('flash');
          }
        }
      }, 400);
      setTimeout(() => {
        input.classList.remove('flash');
        clearInterval(timer);
      }, 2000);
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
        class: 'fixed-side sticky-col second-col'
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


  // private addComponent(template: string, properties?: any) {
  //   @Component({ template })
  //   class TemplateComponent { }

  //   @NgModule({ declarations: [TemplateComponent] })
  //   class TemplateModule { }

  //   const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
  //   const factory = mod.componentFactories.find((comp) =>
  //     comp.componentType === TemplateComponent
  //   );
  //   const component = this.container.createComponent(factory);
  //   Object.assign(component.instance, properties);
  //   // If properties are changed at a later stage, the change detection
  //   // may need to be triggered manually:
  //   // component.changeDetectorRef.detectChanges();
  // }

  onBlur(element, column, ind) {
    console.log(element, column, ind);
    console.log('gird-data', this.gridData);
    this.heighlight('empName');

  }

  closeCell(element, column, ind) {
    console.log('close-div', element, column, ind);
    const elem: HTMLElement = document.getElementById('cell-' + ind);
    const parentElem: HTMLElement = elem.parentElement;
    parentElem.classList.add('hinge');
    setTimeout(() => {
      parentElem.style.display = 'none';
      this.gridData.splice(ind, 1);
    }, 1001);
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

  // private applyHingEffect() {
  //   const col = this.document.getElementsByClassName('hinge');
  //   // col.magnificPopup()
  // }



}


