import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DynamicTemplatesComponent } from './dynamic-templates/dynamic-templates.component';
import { PipeTestComponent } from './pipe-test/pipe-test.component';
import { GenricSvgTestComponent } from './genric-svg-test/genric-svg-test.component';
import { SpinnerComponent } from './animations/spinner/spinner.component';
import { AllFlexTableComponent } from './all-flex-table/all-flex-table.component';
import { HtmlTreeViewComponent } from './html-tree-view/html-tree-view.component';
import { MaterialGridComponent } from './material-grid/material-grid.component';
import { JspdfReportComponent } from './jspdf-report/jspdf-report.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { InlineEditTableComponent } from './inline-edit-table/inline-edit-table.component';

export const routes: Routes = [
  {
    path: '',
    component: DynamicTemplatesComponent
  },
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
  },
  {
    path: 'spinner',
    component: SpinnerComponent
  },
  {
    path: 'flex-table',
    component: AllFlexTableComponent
  },
  {
    path: 'html-treeview-table',
    component: HtmlTreeViewComponent
  },
  {
    path: 'material-grid',
    component: MaterialGridComponent
  },
  {
    path: 'jspdf-report',
    component: JspdfReportComponent
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent
  },
  {
    path: 'inline-edit-table',
    component: InlineEditTableComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
