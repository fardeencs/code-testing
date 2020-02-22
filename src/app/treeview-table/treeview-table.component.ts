import { Component, OnInit } from '@angular/core';
import { ITreeviewData } from './treeview.interface';

@Component({
  selector: 'app-treeview-table',
  templateUrl: './treeview-table.component.html',
  styleUrls: ['./treeview-table.component.scss']
})
export class TreeviewTableComponent implements OnInit {

  jsonData: Array<any> = [
    {
      'empName': 'Fardeen Ahmad',
      'comName': 'Qatar Islamic Bank',
      'country': 'Doha, Qatar'
    },
    {
      'empName': 'Shavez Ahmad',
      'comName': 'Qatar Islamic Bank',
      'country': 'UP, India'
    },
    {
      'empName': 'Siraj Ahmad',
      'comName': 'Qatar Islamic Bank',
      'country': 'Lucknow, India'
    }
  ];

  treeviewData: ITreeviewData = {
    columns: [
      {
        header: 'Employee Name',
        field: 'empName',
        // value: 'Fardeen Ahmad'
      },
      {
        header: 'Company Name',
        field: 'comName',
        // value: 'Qatar Islamic Bank'
      },
      {
        header: 'Country',
        field: 'country',
        // value: 'Doha, Qatar'
      },
    ],
    children: {
      columns: [
        {
          header: 'Employee Name',
          field: 'empName',
          // value: 'Shavez Ahmad'
        },
        {
          header: 'Company Name',
          field: 'comName',
          // value: 'MNC'
        },
        {
          header: 'Country',
          field: 'country',
          // value: 'UP, India'
        },
      ]
    }
  };
  constructor() {
  }

  ngOnInit() {
  }

}
