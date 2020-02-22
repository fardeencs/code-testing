import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
    selector: '[tmplInsertion]'
})
export class TemplateInsertionDirective {
    @Input() name: string;
    constructor(public template: TemplateRef<any>) { }
}