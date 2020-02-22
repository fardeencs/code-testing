import { Component, OnInit, Inject } from '@angular/core';
import { DynamicComponetFactoryService } from '../dynamic-componet-factory.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.scss']
})
export class ModelPopupComponent implements OnInit {
  showModal = false;
  gridData: Array<any>;
  dynamicContent: any;

  constructor(private dynamicComponetFactoryService: DynamicComponetFactoryService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }


  togglePopup(isActive) {
    this.showModal = isActive;
    if (isActive) {
      const tblDiv: HTMLElement = this.document.getElementById('popup');
      // const tblId: HTMLElement = this.document.getElementById('main-table');
      const template = tblDiv.innerHTML;
      // const width = tblId.offsetWidth + 100;
      // const height = tblId.offsetHeight + 100;
      const model = document.getElementById('popupBackGroundDialog');
      // model.style.width = width + 'px';
      // model.style.height = height + 'px';
      model.classList.add('grid-0');
      model.style.display = 'flex';
      model.style.flexGrow = '1';
      model.style.flexShrink = '1';
      model.style.flexBasis = '100%';
      this.dynamicContent = template;
      // this.dynamicComponetFactoryService.addComponent(template, this._container, this, 'dynamic-style.css');
    } else {
      this.document.getElementById('popupBackGroundDialog').style.display = 'none';
      this.dynamicComponetFactoryService.destroyComponet();
    }
  }

}
