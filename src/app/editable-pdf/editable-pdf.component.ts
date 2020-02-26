import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable-pdf',
  templateUrl: './editable-pdf.component.html',
  styleUrls: ['./editable-pdf.component.scss']
})
export class EditablePdfComponent implements OnInit {

  list: Array<any>;
  isShowLess = true;
  constructor() {
    this.list = new Array<any>();
  }

  ngOnInit() {
    this.getList(20);
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

}
