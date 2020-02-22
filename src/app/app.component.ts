import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AppService } from './app.service';
// import { DynamicComponentLoader } from './common/dynamic-component-loader/dynamic-component-loader.service';
// import { MessageComponent } from './dynamic-modules/message/message/message.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jspdf-app';
  money: any = '';
  moneyRegexp: RegExp = /^[0-9]{1,7}$/;
  @ViewChild('testOutlet', { read: ViewContainerRef, static: true })
  testOutlet: ViewContainerRef | undefined;

  constructor(private dataService: AppService
    // private dynamicComponentLoader: DynamicComponentLoader
    ) {
  }

  ngOnInit(): void {
  }

  // loadComponent() {
  //   this.dynamicComponentLoader
  //     .getComponentFactory<MessageComponent>('message')
  //     .subscribe({
  //       next: componentFactory => {
  //         if (!this.testOutlet) {
  //           return;
  //         }

  //         const ref = this.testOutlet.createComponent(componentFactory);
  //         ref.changeDetectorRef.detectChanges();
  //       },
  //       error: err => {
  //         console.warn(err);
  //       }
  //     });
  // }

}
