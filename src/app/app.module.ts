import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationComponent } from './animations/notification/notification.component';
import { SpinnerComponent } from './animations/spinner/spinner.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InsertionDirective } from './common/insertion.directive';
import { MaterialDailogComponent } from './common/material-dailog/material-dailog.component';
import { ModelPopupComponent } from './common/model-popup/model-popup.component';
import { PopupComponent } from './common/popup/popup.component';
import { Popup2Component } from './common/popup2/popup2.component';
import { overrideRenderFactory } from './common/shadow-dom-renderer';
import { TemplateInsertionDirective } from './common/template-insertion';
import { CopyToClipboardComponent } from './copy-to-clipboard/copy-to-clipboard.component';
import { KeyFilterModule } from './directive/KeyFilter';
import { DynamicTemplatesComponent } from './dynamic-templates/dynamic-templates.component';
import { EditablePdfComponent } from './editable-pdf/editable-pdf.component';
import { FlexTableComponent } from './flex-table/flex-table.component';
import { FlexTable2Component } from './flex-table2/flex-table2.component';
import { FlexTable3Component } from './flex-table3/flex-table3.component';
import { HtmlTreeViewComponent } from './html-tree-view/html-tree-view.component';
import { JsPdfComponent } from './js-pdf/js-pdf.component';
import { MaterialGridModule } from './material-grid/material-grid.module';
import { MaterialModule } from './material-module.module';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';
import { AngularImgComponent } from './router-animation/angular-img/angular-img.component';
import {
    DemoDynamicParamsComponent
} from './router-animation/demo-dynamic-params/demo-dynamic-params.component';
import {
    DemoOnEnterOnLeaveComponent
} from './router-animation/demo-on-enter-on-leave/demo-on-enter-on-leave.component';
import { TreeviewTableComponent } from './treeview-table/treeview-table.component';

// // This array defines which "componentId" maps to which lazy-loaded module.
// const manifests: DynamicComponentManifest[] = [
//    {
//      componentId: 'message',
//      path: 'dynamic-message', // some globally-unique identifier, used internally by the router
//      loadChildren: () => import('./dynamic-modules/message/message.module').then(m => m.MessageModule)
//    },
//    // {
//    //   componentId: 'dialog',
//    //   path: 'dialog',
//    //   loadChildren: () => import('./dynamic-modules/dialog/dialog.module').then(m => m.DialogModule)
//    // }
//  ];
@NgModule({
  declarations: [
    TemplateInsertionDirective,
    InsertionDirective,
    AppComponent,
    HtmlTreeViewComponent,
    JsPdfComponent,
    CopyToClipboardComponent,
    TreeviewTableComponent,
    FlexTableComponent,
    FlexTable2Component,
    FlexTable3Component,
    ModelPopupComponent,
    PopupComponent,
    DynamicTemplatesComponent,
    MaterialDailogComponent,
    NotificationComponent,
    SpinnerComponent,
    AngularImgComponent,
    // DemoOnEnterOnLeaveComponent,
    // DemoDynamicParamsComponent,
    Popup2Component,
    EditablePdfComponent,
    ResponsiveTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    MaterialModule,
    MaterialGridModule,
    //DynamicComponentLoaderModule.forRoot(manifests)
  ],
  exports: [
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    // overrideRenderFactory(),
    AppService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ModelPopupComponent,
    PopupComponent,
    MaterialDailogComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }
}
