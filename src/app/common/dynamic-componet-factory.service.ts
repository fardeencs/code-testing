// tslint:disable-next-line:max-line-length
import { Injectable, Component, NgModule, ComponentFactoryResolver, Compiler, Injector, NgModuleRef, ViewChild, ViewContainerRef, Inject, ComponentFactory, ComponentRef, ChangeDetectorRef, Type, TemplateRef } from '@angular/core';
// import { FlexTable3Component } from '../flex-table3/flex-table3.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { InsertionDirective } from './insertion.directive';


export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: 'root'
})
export class DynamicComponetFactoryService {
  public cmpRef;
  componentRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>,
    // private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document) { }

  childComponentType: Type<any>;

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  public addComponent(template: any, container: ViewContainerRef, genricComponent: Type<any>, styleSheetName: string) {
    this.loadStyle(styleSheetName);
    @Component({
      template: template,
      styleUrls: []
    })
    class DynamicComponent {
      public parent = null;
      constructor() {
        this.parent = genricComponent;
        console.log('parent', this.parent);
      }
    }
    @NgModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
      ],
      declarations: [DynamicComponent]
    })
    class DynamicComponentModule { }
    const mod = this.compiler.compileModuleAndAllComponentsSync(DynamicComponentModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === DynamicComponent
    );
    this.cmpRef = container.createComponent(factory);
  }

  public destroyComponet() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    if (this.componentRef) {
      this.componentRef.instance['showModal'] = false;
      this.componentRef.destroy();
    }
  }


  open<T>(content: Content<T>, componentType: Type<any>, styleSheetName?: string) {
    if (styleSheetName) {
      this.loadStyle(styleSheetName);
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const ngContent = this.resolveNgContent(content);
    this.componentRef = factory.create(this._injector, ngContent);
    console.log(this.componentRef, 'comp-ref');
    this.componentRef.instance['showModal'] = true;

    this.componentRef.hostView.detectChanges();

    const { nativeElement } = this.componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

  open2<T>(content: ViewContainerRef, componentType: Type<any>, styleSheetName?: string) {
    if (styleSheetName) {
      this.loadStyle(styleSheetName);
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = content;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(factory);
    const ngContent = this.resolveNgContent2(content);
    this.componentRef = factory.create(this._injector, ngContent);
    console.log(this.componentRef, 'comp-ref');
    this.componentRef.instance['showModal'] = true;

    this.componentRef.hostView.detectChanges();

    const { nativeElement } = this.componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

  loadChildComponent<T>(componentType: Type<any>, insertionPoint: InsertionDirective, content: Content<T>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  loadComponetWithNgContent(componentType: Type<any>, viewContainer: ViewContainerRef, styleSheetName: string) {
    if (styleSheetName) {
      this.loadStyle(styleSheetName);
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    console.log('viewContainer', viewContainer);
    
    // viewContainer.clear();

    const vcf = viewContainer.createComponent(factory);
    this.componentRef = viewContainer.createComponent(
      factory,
      0,
      undefined,
      [
        [vcf.location.nativeElement]
      ]
    );
  }

  resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      console.log(viewRef);
      // In earlier versions, you may need to add this line
      // this.appRef.attachView(viewRef);
      return [viewRef.rootNodes];
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(content);
    const componentRef = factory.create(this._injector);
    return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
  }

  resolveNgContent2(content: ViewContainerRef) {
    const viewRef = content.createEmbeddedView(null);
    console.log(viewRef);
    // In earlier versions, you may need to add this line
    // this.appRef.attachView(viewRef);
    return [viewRef.rootNodes];
  }

  //   add() {
  //     const bodyFactory = this.cfr.resolveComponentFactory(CardBodyComponent);
  //     const footerFactory = this.cfr.resolveComponentFactory(CardFooterComponent);

  //     let bodyRef = this.vcRef.createComponent(bodyFactory);
  //     let footerRef = this.vcRef.createComponent(footerFactory);

  //     const cardFactory = this.cfr.resolveComponentFactory(CardComponent);

  //     const cardRef = this.vcRef.createComponent(
  //         cardFactory,
  //         0,
  //         undefined,
  //         [
  //            [bodyRef.location.nativeElement],
  //            [footerRef.location.nativeElement]
  //         ]
  //     );

  //     this.components.push(bodyRef, cardRef, footerRef);
  // }




}
