import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NumberMaskDirective } from './number-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumberMaskDirective
  ],
  exports: [
    NumberMaskDirective
  ]
})
export class NumberMaskModule {
}
