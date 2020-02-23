import { Injectable } from '@angular/core';


declare function loadingServiceShow(zindex, id, flag);
declare function loadingServiceHide(id);

@Injectable({
  providedIn: 'root'
})
export class ElementLoaderService {

  constructor() { }

  startLoader(id: string, timeout?: number, zIndex?: number) {
    zIndex = zIndex || 10040;
    timeout = timeout || 0;
    setTimeout(() => {
      loadingServiceShow(zIndex, id, false);
    }, timeout);
  }

  stopeLoader(id: string) {
    loadingServiceHide(id);
  }

}
