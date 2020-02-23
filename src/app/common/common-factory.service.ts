import { Injectable, ComponentFactoryResolver, Injector, Inject, ComponentRef, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Content<T> = string | TemplateRef<T> | Type<T>;
export interface IComponetProperties {
  inputs?: { [key: string]: any };
  outputs?: { [key: string]: any };
}

// {
//   ref: this.tableTmpl,
//   properties: {
//     data: this.gridData,
//     columns: this.columnDef
//   },
// },
export interface ITemplates {
  ref: any;
  properties: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommonFactoryService {
  componentRef: ComponentRef<any>;
  componetProperties: IComponetProperties;
  isPopup = false;
  embeddedViews = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    // private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document) { }

  /*
  ====== Loading dynamically style sheet configuaration in angular.json ======
  ==========  Don't forget to anguar.json configuration  =====================
  "extractCss": true,
  "styles": [
    "src/styles.css",
    {
      "input": "src/app/common/dynamic.style.scss",
      "bundleName": "dynamic-style",
      "inject": false
    }
  ]
*/
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeLink = this.document.getElementById(
      'dynamic-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'dynamic-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }

  getEmbeddedView(templateRef: TemplateRef<any>, templateProperties: {}) {
    const embeddedView = templateRef.createEmbeddedView(templateProperties);
    embeddedView.detectChanges();
    this.embeddedViews.push(embeddedView.rootNodes);
    return [embeddedView.rootNodes];
  }

  setInputProperties(componentRef: ComponentRef<any>, inputProperties: {}) {
    for (const key in inputProperties) {
      if (inputProperties.hasOwnProperty(key)) {
        componentRef.instance[key] = inputProperties[key];
      }
    }
  }

  loadComponent<T>(content: Content<T>, componentType: Type<any>, templateProperties: {}, componetProperties: IComponetProperties, vcRef: ViewContainerRef, isPopup?: boolean, styleSheetName?: string) {
    // if (styleSheetName) {
    //   this.loadStyle(styleSheetName);
    // }
    this.isPopup = isPopup || false;
    this.componetProperties = componetProperties;
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    if (content instanceof TemplateRef) {
      const ngContent = this.getEmbeddedView(content, templateProperties);
      //   const viewContainerRef = insertionPoint.viewContainerRef;
      // viewContainerRef.clear();
      vcRef.clear();
      // createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
      // const componentRef = factory.create(this.injector, ngContent);
      const componentRef = vcRef.createComponent(factory, 0, undefined, ngContent);
      this.setInputProperties(componentRef, componetProperties.inputs);
      if (isPopup) {
        componentRef.instance['visible'] = true;
      }
      componentRef.hostView.detectChanges();
      const { nativeElement } = componentRef.location;
      this.document.body.appendChild(nativeElement);
      this.componentRef = componentRef;
    }
    console.log('componentRef', this.componentRef);
  }

  loadTemplatesWithinComponent(templates: Array<ITemplates>, componentType: Type<any>, componetProperties: IComponetProperties, vcRef: ViewContainerRef, isPopup?: boolean, styleSheetName?: string) {
    // if (styleSheetName) {
    //   this.loadStyle(styleSheetName);
    // }
    this.isPopup = isPopup || false;
    this.componetProperties = componetProperties;
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    vcRef.clear();
    templates.forEach(tmpl => {
      if (tmpl.ref instanceof TemplateRef) {
        const ngContent = this.getEmbeddedView(tmpl.ref, tmpl.properties);
        vcRef.createEmbeddedView(tmpl.ref, tmpl.properties);
      }
    });
    const componentRef = vcRef.createComponent(factory, 0, undefined, this.embeddedViews);
    this.setInputProperties(componentRef, componetProperties.inputs);
    if (isPopup) {
      componentRef.instance['visible'] = true;
    }
    componentRef.hostView.detectChanges();
    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);
    this.componentRef = componentRef;
    console.log('componentRef', this.componentRef);
  }


  public destroyComponet() {
    if (this.componentRef) {
      // this.componentRef.instance['visible'] = false;
      // this.componentRef.hostView.detectChanges();
      this.embeddedViews = [];
      this.componetProperties = null;
      this.componentRef.changeDetectorRef.detach();
      this.componentRef.destroy();
      console.log('destroyComponet', this.componentRef);
    }
  }

}
