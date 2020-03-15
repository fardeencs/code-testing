import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DynamicTemplatesComponent } from './dynamic-templates/dynamic-templates.component';
import { PipeTestComponent } from './pipe-test/pipe-test.component';

export const routes: Routes = [
  {
    path: 'dynamic-template',
    component: DynamicTemplatesComponent
  },
  {
    path: 'pipe-test',
    component: PipeTestComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
