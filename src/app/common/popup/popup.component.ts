import { Component, OnInit, Input, Inject, ViewEncapsulation, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonFactoryService } from '../common-factory.service';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    // trigger('dialog', [
    //   transition('void => *', [
    //     style({ transform: 'scale3d(.3, .3, .3)' }),
    //     animate(100)
    //   ]),
    //   transition('* => void', [
    //     animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
    //   ])
    // ])
    // trigger('openClose', [
    //   // ...
    //   state('open', style({
    //     // height: '200px',
    //     opacity: 1,
    //     backgroundColor: 'yellow'
    //   })),
    //   state('closed', style({
    //     // height: '100px',
    //     opacity: 0.5,
    //     backgroundColor: 'green'
    //   })),
    //   transition('open => closed', [
    //     animate('1s')
    //   ]),
    //   transition('closed => open', [
    //     animate('0.5s')
    //   ]),
    // ]),
  ]
})
export class PopupComponent implements OnInit {
  @ViewChild('templateRenderer', { static: false, read: ViewContainerRef }) anchor: ViewContainerRef;
  // @ContentChildren(TemplateInsertionDirective) templates: QueryList<TemplateInsertionDirective>;
  // @Input('templateHandler') templateHandler: TemplateRef<any>;

  @Input() title: string;
  @Input() closable = true;
  @Input() visible: boolean;
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
    this.commonFactoryService.destroyComponet();
  }

}
