import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DynamicTemplatesComponent } from './dynamic-templates/dynamic-templates.component';
import { PipeTestComponent } from './pipe-test/pipe-test.component';
import { GenricSvgTestComponent } from './genric-svg-test/genric-svg-test.component';

export const routes: Routes = [
  {
    path: 'dynamic-template',
    component: DynamicTemplatesComponent
  },
  {
    path: 'pipe-test',
    component: PipeTestComponent
  },
  {
    path: 'svg-icons',
    component: GenricSvgTestComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
