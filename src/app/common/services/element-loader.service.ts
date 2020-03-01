import { Injectable } from '@angular/core';
import { ILoader } from '../../models/model-and-interface';
import { each } from 'lodash';


declare function loadingServiceShow(zindex, id, flag);
declare function loadingServiceHide(id);

@Injectable({
  providedIn: 'root'
})
export class ElementLoaderService {

  constructor() { }

  startLoader(item: ILoader) {
    const zIndex = item.zIndex || 10040;
    const delay = item.delay || 0;
    setTimeout(() => {
      loadingServiceShow(zIndex, item.elementId, false);
    }, delay);
  }

  stopeLoader(id: string) {
    loadingServiceHide(id);
  }

  startMultipleLoader(items: Array<ILoader>) {
    each(items, item => {
      this.startLoader(item);
    });
  }

  stopMultipleLoader(items: Array<ILoader>) {
    each(items, item => {
      this.stopeLoader(item.elementId);
    });
  }

}
