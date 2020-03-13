import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { INumberMaskConfig } from '../common/number-mask/contracts';

export class PipeTestHelper {


  static setValidationMessages(): any {
    return {
      'empNo': {
        'required': 'Employer number is required.',
        'min': 'Must be greater than 0 characters',
        'max': 'Must be less than 100 characters.',
      },
      // 'totalMarks': {
      //   'required': 'Marks is required.',
      //   'min': 'Must be greater than 400 characters',
      //   'max': 'Must be less than 1000 characters.',
      // },
      'marksPercentage': {
        'required': 'Marks % is required.',
        'min': 'Must be greater than 0',
        'max': 'Must be less than 1.',
      },
      'currency': {
        'required': 'Currency is required.',
        'min': 'Must be greater than 100 characters',
        'max': 'Must be less than 10000 characters.',
      }
    };
  }

  // Validators.minLength(5), Validators.maxLength(15)
  static setValidationRules(fb: FormBuilder): FormGroup {
    return fb.group({
      // marks: [null, [Validators.required]],
      // marksPercentage: [null, [Validators.required]],
      // currency: [null, [Validators.required]]
      // totalMarks: [null, [Validators.required, Validators.minLength(400), Validators.maxLength(1000)]],
      marksPercentage: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(1)]],
      currency: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(10000)]],
      empNo: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]]
    });
  }

  static getNumberMaskBaseOption(): INumberMaskConfig {
    return {
      align: 'left',
      allowNegative: false,
      decimal: '',
      precision: 0,
      prefix: '',
      suffix: '',
      thousands: ','
    };
  }



}

{

}

export const IBaseOption: INumberMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: '',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: ','
};
