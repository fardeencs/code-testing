import { Component, OnInit, ViewChild, ViewContainerRef, Inject, TemplateRef } from '@angular/core';
import { DynamicComponetFactoryService } from '../common/services/dynamic-componet-factory.service';
import { DOCUMENT } from '@angular/common';
import { InsertionDirective } from '../common/insertion.directive';
import { ModelPopupComponent } from '../common/model-popup/model-popup.component';

@Component({
  selector: 'app-flex-table3',
  templateUrl: './flex-table3.component.html',
  styleUrls: ['./flex-table3.component.scss']
})
export class FlexTable3Component implements OnInit {
  @ViewChild('dynamicComponent', { static: false, read: ViewContainerRef }) _container: ViewContainerRef;
  @ViewChild('modelBody', { static: false, read: ViewContainerRef }) modelBody: ViewContainerRef;
  @ViewChild(InsertionDirective, { static: false }) insertionPoint: InsertionDirective;
  @ViewChild('tblTmpl', { static: false }) tblTmpl: TemplateRef<any>;

  showModal = false;
  appendingInnerHtml: any;
  gridData: Array<any>;
  dynamicContent: any;
  columnDef: Array<any>;
  showTmpl = false;

  constructor(private dynamicComponetFactoryService: DynamicComponetFactoryService,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    // document.getElementById('popupBackGroundDialog').style.display = 'none';
    this.loadGridData(4);
  }

  getColDef() {
    const colDef = [
      {
        field: 'header1',
        header: 'Header 1',
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
      {
        field: 'header8',
        header: 'Header 8',
      },
    ];
    this.columnDef = colDef;
  }

  loadGridData(rows: number) {
    const gridData = [];
    for (let index = 0; index < rows; index++) {
      gridData.push({
        'header1': `Left Column`,
        'header2': `Cell content longer ${index}`,
        'header3': `Cell content longer ${index}`,
        'header4': `Cell content ${index}`,
        'header5': `Cell content ${index}`,
        'header6': `Cell content ${index}`,
        'header7': `Cell content ${index}`,
        'header8': null,
      });
      this.showTmpl = true;
      this.gridData = gridData;

    }
  }



  togglePopup(isActive) {
    this.showModal = isActive;
    if (isActive) {
      // const tblDiv: HTMLElement = this.document.getElementById('popup');
      // this.dynamicComponetFactoryService.loadComponetWithNgContent(ModelPopupComponent, this._container, 'dynamic-style.css');
      // this.dynamicComponetFactoryService.open2(this._container, ModelPopupComponent, 'dynamic-style.css');
      // setTimeout(() => {
      //   this.dynamicComponetFactoryService.open(this.tblTmpl, ModelPopupComponent, 'dynamic-style.css');
      // }, 3000);
    }



    // hard coded way
    // if (isActive) {
    //   const tblDiv: HTMLElement = this.document.getElementById('popup');
    //   // const tblId: HTMLElement = this.document.getElementById('main-table');
    //   const template = tblDiv.innerHTML;
    //   // const width = tblId.offsetWidth + 100;
    //   // const height = tblId.offsetHeight + 100;
    //   const model = document.getElementById('popupBackGroundDialog');
    //   if (model) {
    //     // model.style.width = width + 'px';
    //     // model.style.height = height + 'px';
    //     model.classList.add('grid-0');
    //     model.style.display = 'flex';
    //     model.style.flexGrow = '1';
    //     model.style.flexShrink = '1';
    //     model.style.flexBasis = '100%';
    //     this.dynamicContent = template;
    //     // this.dynamicComponetFactoryService.addComponent(template, this._container, this, 'dynamic-style.css');
    //   }
    // } else {
    //   // this.dynamicComponetFactoryService.destroyComponet();
    //   this.document.getElementById('popupBackGroundDialog').style.display = 'none';
    // }
  }

  // pop(div) {
  //   const elem = this.document.getElementById(div);
  //   console.log('elem', elem);
  //   const tblElem: HTMLElement = this.document.getElementById('popup');
  //   // tblElem.classList.add('popup');

  //   elem.style.display = 'block';
  // }
  // hide(div) {
  //   this.document.getElementById(div).style.display = 'none';
  // }
  //To detect escape button
  // document.onkeydown = function(evt) {
  //   evt = evt || window.event;
  //   if (evt.keyCode == 27) {
  //     hide('popDiv');
  //   }
  // };

}
