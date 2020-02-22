import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectNode(node) {
    const range = document.createRange();
    range.selectNodeContents(node);
    const select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
  }

  copyToClipboard() {
    const table = document.getElementById('divtbl');
    // const table = this.getDynamicTable();
    this.selectNode(table);
    document.execCommand('copy');
  }

  getDynamicTable() {
    const info = `<table border="2"><tr>
    <th style="background-color: #3366ff;" colspan="2">Critical Priority Issue - ' + 'shortDescription' + '</th></tr><tr><td style="background-color: #99ccff;">Assignment Group</td><td style="background-color: #99ccff;">' + 'assignmentGroup' + '</td></tr><tr><td style="background-color: #ccffff;">Configuration Item</td><td style="background-color: #ccffff;">' + 'ci' + '</td></tr><tr><td style="background-color: #99ccff;">Location</td><td style="background-color: #99ccff;">' + 'location' + '</td></tr><tr><td colspan="2" style="background-color: #ccffff;">Description</td></tr><tr><td colspan="2" style="background-color: #99ccff;">' + 'description' + '</tr></table>`;
    return info;
  }

}
