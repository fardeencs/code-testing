import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialGridComponent } from './material-grid.component';
import { MaterialModule } from '../material-module.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialGridComponent],
  declarations: [MaterialGridComponent],
  entryComponents: [MaterialGridComponent]
})
export class MaterialGridModule { }
