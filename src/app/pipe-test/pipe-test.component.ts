import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormatNumberPipe } from '../common/pipes/format-number.pipe';
import { INumberMaskConfig } from '../common/number-mask/contracts';
import { NgForm, FormBuilder } from '@angular/forms';
import { BaseComponent } from '../common/base.component';
import { PipeTestHelper } from './pipe-test.helper';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-pipe-test',
  templateUrl: './pipe-test.component.html',
  styleUrls: ['./pipe-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipeTestComponent extends BaseComponent implements OnInit {
  @ViewChild('dataForm', { static: true }) dataForm: NgForm;

  panelTitle = `Pipe Testing
  Learn very very cool Error notification with using keyframe animation.
  Strong keyframe fundamental with angular reusable custom error massges.`;
  selectedData: any;
  numberList: Array<number>;
  baseOptions: INumberMaskConfig;
  currencyOptions: INumberMaskConfig;
  floatOptions: INumberMaskConfig;
  numberOptions: INumberMaskConfig;
  percentageOptions: INumberMaskConfig;

  constructor(private fb: FormBuilder,
    private readonly formatNumber: FormatNumberPipe,
  ) {
    super();
    this.baseOptions = cloneDeep(PipeTestHelper.getNumberMaskBaseOption());
    this.currencyOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
      prefix: 'QAR ',
    };
    this.floatOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
    };
    this.percentageOptions = {
      ...this.baseOptions,
      decimal: '.',
      precision: 2,
      suffix: '%'
    }
    this.numberOptions = { ...this.baseOptions };
    this.selectedData = {
      totalMarks: 458965278,
      salary: 168796
    };
    this.validationMessages = PipeTestHelper.setValidationMessages();
  }

  private formatNumbers(): number[] {
    const numbers: number[] = [0.0072926858383571816, 45250, 3548761125, 362000, 46.5, 85.19050544986521, 0, 4, 13669.694689655173, 25880, 37.7615875404839, 37.723825952943415, 37.7615875404839];
    const formatNumbers: number[] = [];
    numbers.forEach(element => {
      formatNumbers.push(this.formatNumber.transform(element, null));
    });
    this.numberList = [...formatNumbers];
    // console.log('formatNumbers', formatNumbers);

    return formatNumbers;
  }

  ngOnInit() {
    this.dataForm.form = PipeTestHelper.setValidationRules(this.fb);
    this.valueChanges(this.dataForm.form);
    this.formatNumbers();
  }


  // tslint:disable-next-line:member-ordering
  actions = {
    modelChanges: () => {

    },
    onSubmit: () => {
      const valueObj = this.dataForm.form.value;
      console.log('====================================');
      console.log('submit', valueObj, this.dataForm);
      console.log('====================================');
    }
  };

}
