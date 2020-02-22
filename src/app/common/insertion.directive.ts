import { Directive, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appInsertion]'
})
export class InsertionDirective {

  constructor(public viewContainerRef: ViewContainerRef,
    private renderer: Renderer2) {
    this.setLoader(viewContainerRef.element);
  }

  setLoader(elementRef: ElementRef) {
    const elem = elementRef.nativeElement;
    if (elem) {
      const id = elem.getAttribute('id');
      if (!id) return;

      this.renderer.setAttribute(elem, 'data-loader', id);
    }
  }
}