import { FormGroup } from '@angular/forms';
import { delay, distinctUntilChanged } from 'rxjs/operators';


export abstract class BaseComponent {

  formErrors: any;
  validationMessages: any;
  constructor() {
    this.formErrors = {};
    this.validationMessages = {};
  }


  valueChanges(formGroup: FormGroup, isCustomMsg = true) {
    formGroup.valueChanges.
      pipe(
        delay(500),
        distinctUntilChanged(),
      )
      .subscribe((result) => {
        // console.log('valueChanges', result);
        if (isCustomMsg) {
          this.validationErrors(formGroup);
        } else {
          this.validationErrors2(formGroup);
        }
      });
  }


  validationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
      // console.log('validationErrors', this.formErrors);
    });
  }

  validationErrors2(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              // this.formErrors = {
              //   ...this.formErrors,
              //   [key]: errorKey
              // };
              // this.formErrors[key] = abstractControl.errors;
              this.formErrors[key] += errorKey + ',';
            }
          }
        }
      }
      // console.log('validationErrors2', this.formErrors);
    });
  }

  markAsPristine(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if(abstractControl){
        abstractControl.markAsPristine();
      }
    });
  }


}
