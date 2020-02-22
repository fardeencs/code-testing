import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-material-dailog',
  templateUrl: './material-dailog.component.html',
  styleUrls: ['./material-dailog.component.scss']
})
export class MaterialDailogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MaterialDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
