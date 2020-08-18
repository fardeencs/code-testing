import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-editable-pdf',
  templateUrl: './editable-pdf.component.html',
  styleUrls: ['./editable-pdf.component.scss']
})
export class EditablePdfComponent implements OnInit, AfterViewInit {

  list: Array<any>;
  isShowLess: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.list = new Array<any>();
  }

  ngOnInit() {
    this.getList(10);

  }

  ngAfterViewInit(): void {
    const slider = this.document.getElementById('slider');
    const toggle = this.document.getElementById('toggle');
    const lessMoreEl = this.document.getElementById('less-more-panel');

    toggle.addEventListener('click', () => {
      const isOpen = slider.classList.contains('slide-out');
      this.isShowLess = isOpen;
      slider.setAttribute('class', isOpen ? 'slide-in' : 'slide-out');
      // setTimeout(() => {
        lessMoreEl.setAttribute('class', isOpen ? 'in-panel' : 'out-panel');
      // }, 500);
    });

  }




  private getList(length: number) {
    for (let index = 0; index < length; index++) {
      this.list.push({
        label: `Label ${index}`,
        value: `value ${index + 1}`,
      });
    }
  }

  toggelShowLessPanel() {
    this.isShowLess = !this.isShowLess;
  }

  closeDiv() {
    const elem = document.getElementById('HTMLtoPDF');
    elem.classList.add('hinge');
  }

}
