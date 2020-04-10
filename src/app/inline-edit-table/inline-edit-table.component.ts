import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FieldType } from '../common/emuns/enumration';
import * as faker from 'faker';
import { IGridTemplate } from '../material-grid/grid-model';

export const COLLECTION = [
  {
    label: 'O',
    value: '0'
  },
  {
    label: 'A',
    value: '1'
  },
  {
    label: 'B',
    value: '2'
  },
  {
    label: 'AB',
    value: '3'
  },
];

@Component({
  selector: 'app-inline-edit-table',
  templateUrl: './inline-edit-table.component.html',
  styleUrls: ['./inline-edit-table.component.scss']
})
export class InlineEditTableComponent implements OnInit {

  @ViewChild('actionTmpl', { static: true }) actionTmpl: TemplateRef<any>;

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  colDef: Array<IGridTemplate>;
  gridData: Array<any>;
  fieldType = FieldType;
  bloodGroupList = COLLECTION;
  constructor(private fb: FormBuilder) {

    // this.gridData = [...data];
    // console.log('gridData', this.gridData);
  }

  ngOnInit(): void {
    this.colDef = this.getColDef();
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
    this.loadData();

  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
    // const data = this.getGridData();
    // this.userTable.setControl('tableRows', this.setGirdData([...data]));

  }

  loadData() {
    this.control = this.userTable.get('tableRows') as FormArray;
    const data = this.getGridData(4);
    this.userTable.setControl('tableRows', this.setGirdData([...data]));
  }

  setGirdData(data: any[]): FormArray {
    const formArray = new FormArray([]);
    data.forEach(s => {
      formArray.push(this.fb.group({
        name: s.name,
        email: s.email,
        dob: s.dob,
        bloodGroup: s.bloodGroup,
        mobNumber: s.mobNumber,
        // isEditable: true
        isEditable: s.isEditable
      }));
    });
    return formArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['', [Validators.required, Validators.max(10)]],
      isEditable: [true]
    });
  }


  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  private getGridData(rowCount?: number) {
    rowCount = rowCount || 10;
    const body = [];
    for (let j = 1; j <= rowCount; j++) {
      const isEven = j % 2 ? true : false;
      const bgNumber = faker.random.number(3).toString();
      const bgText = this.bloodGroupList.find(x => x.value === bgNumber).label;
      body.push({
        id: j,
        isEditable: isEven,
        name: faker.name.findName(),
        email: faker.internet.email(),
        dob: faker.date.past(),
        mobNumber: faker.random.number(1000000000),
        bloodGroup: isEven ? bgNumber : bgText
      });
    }
    return [...body];
  }


  private getColDef() {
    const colDef: Array<IGridTemplate> = [
      {
        field: 'isEditable',
        header: 'Action',
        type: FieldType.TEMPLATE,
        cellTemplate: this.actionTmpl,
        clazz: 'tbl-action'
      },
      {
        field: 'name',
        header: 'Name',
        type: FieldType.TEXT_BOX
      },
      {
        field: 'dob',
        header: 'DOB',
        type: FieldType.DATE_BOX,
        clazz: 'cell-dob'
      },
      {
        field: 'bloodGroup',
        header: 'Blood Group',
        type: FieldType.DROPDOWN,
        collection: this.bloodGroupList
      },
      {
        field: 'mobNumber',
        header: 'Mobile Number',
        type: FieldType.NUMBER_BOX
      },
      {
        field: 'email',
        header: 'Email',
        type: FieldType.TEXT_BOX
      },
    ];
    return colDef;
  }

  private getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
