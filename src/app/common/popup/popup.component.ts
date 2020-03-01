import {
    zoomInDownOnEnterAnimation, zoomInLeftOnEnterAnimation, zoomInOnEnterAnimation,
    zoomInRightOnEnterAnimation, zoomInUpOnEnterAnimation, zoomOutDownOnLeaveAnimation,
    zoomOutLeftOnLeaveAnimation, zoomOutOnLeaveAnimation, zoomOutRightOnLeaveAnimation,
    zoomOutUpOnLeaveAnimation
} from 'angular-animations';
import { Bouncing, Others, Specials, Zooming } from 'src/app/angular-animation.constant';
import { ITemplate } from 'src/app/models/model-and-interface';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
    Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild,
    ViewContainerRef, ViewEncapsulation
} from '@angular/core';

import { CommonFactoryService } from '../services/common-factory.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // animations: Specials
})
export class PopupComponent implements OnInit {
  // @ContentChildren(TemplateInsertionDirective) templates: QueryList<TemplateInsertionDirective>;
  // @Input('templateHandler') templateHandler: TemplateRef<any>;

  @Input() popupTitle: string;
  @Input() conatentTitle: string;
  @Input() extraTemplate: ITemplate<any>;
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() multipleNgContents: Array<ITemplate<any>>;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private commonFactoryService: CommonFactoryService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  close() {
    // const elm = this.document.getElementById('modalContent');
    // elm.style.animation = 'hinge';
    // elm.style.animationDuration = '1s';
    // elm.classList.add('hinge');
    // this.isActive = false;
    this.visible = false;
    this.visibleChange.emit(this.visible);
    setTimeout(() => {
      this.commonFactoryService.destroyComponet();
    }, 100);
  }

}
