import { Injectable } from '@angular/core';


declare function loadingServiceShow(zindex, id, flag);
declare function loadingServiceHide(id);

@Injectable({
  providedIn: 'root'
})
export class ElementLoaderService {

  constructor() { }

  startLoader(id: string, zIndex?: number) {
    zIndex = zIndex || 10040;
    loadingServiceShow(zIndex, id, false);
  }

  stopeLoader(id: string) {
    loadingServiceHide(id);
  }

}
