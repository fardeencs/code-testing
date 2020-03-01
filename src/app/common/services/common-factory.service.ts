import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, TemplateRef, Type,
  ViewContainerRef
} from '@angular/core';

import { IComponetProperties, IFactoryCompoent, ITemplate } from '../../models/model-and-interface';
import { ElementLoaderService } from './element-loader.service';
import { isEmpty } from 'lodash';

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
    private elementLoaderService: ElementLoaderService,
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

  getNgContent<T>(type: ITemplate<any>) {
    if (typeof type.content === 'string') {
      const element = this.document.createTextNode(type.content);
      return [[element]];
    }

    if (type.content instanceof TemplateRef) {
      const embeddedView = type.content.createEmbeddedView(type.templateProperties);
      embeddedView.detectChanges();
      this.embeddedViews.push(embeddedView.rootNodes);
      // In earlier versions, you may need to add this line
      // this.appRef.attachView(viewRef);
      return [embeddedView.rootNodes];
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(type.content);
    const componentRef = factory.create(this.injector);
    componentRef.changeDetectorRef.detectChanges();
    return [[componentRef.location.nativeElement]];
    // return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
  }

  setInputProperties(componentRef: ComponentRef<any>, inputProperties: {}) {
    for (const key in inputProperties) {
      if (inputProperties.hasOwnProperty(key)) {
        componentRef.instance[key] = inputProperties[key];
      }
    }
  }

  loadTemplateWithinComponent<T, C>(params: IFactoryCompoent<T, C>) {
    if (params.styleSheetName) {
      this.loadStyle(params.styleSheetName);
    }
    this.isPopup = params.isPopup || false;
    this.componetProperties = params.component.componetProperties;
    const factory = this.componentFactoryResolver.resolveComponentFactory(params.component.componentType);
    let ngContent = null;
    if (params.ngContent.content instanceof TemplateRef) {
      ngContent = this.getNgContent(params.ngContent);
    }
    params.vcRef.clear();
    const componentRef = params.vcRef.createComponent(factory, 0, undefined, ngContent);
    this.setInputProperties(componentRef, params.component.componetProperties.inputs);
    if (params.isPopup) {
      componentRef.instance['visible'] = true;
    }
    componentRef.hostView.detectChanges();
    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);
    this.componentRef = componentRef;
    console.log('componentRef', this.componentRef);
    // if (params.loadingId) {
    //   this.elementLoaderService.stopeLoader(loadingId);
    // }
  }

  loadMultipleNgContentWithinComponent<T, C>(params: IFactoryCompoent<T, C>) {
    if (params.styleSheetName) {
      this.loadStyle(params.styleSheetName);
    }
    this.isPopup = params.isPopup || false;
    this.componetProperties = params.component.componetProperties;
    const factory = this.componentFactoryResolver.resolveComponentFactory(params.component.componentType);
    let ngContent = null;
    if (params.ngContent && params.ngContent.content instanceof TemplateRef) {
      ngContent = this.getEmbeddedView(params.ngContent.content, params.ngContent.templateProperties);
    }
    params.vcRef.clear();
    const componentRef = params.vcRef.createComponent(factory, 0, undefined, ngContent);
    this.setInputProperties(componentRef, params.component.componetProperties.inputs);
    if (params.isPopup) {
      componentRef.instance['visible'] = true;
    }
    componentRef.hostView.detectChanges();
    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);
    this.componentRef = componentRef;
    console.log('componentRef', this.componentRef);
    // if (params.loadingId) {
    //   this.elementLoaderService.stopeLoader(loadingId);
    // }
  }

  // loadTemplatesWithinComponent(templates: Array<ITemplates>, componentType: Type<any>, componetProperties: IComponetProperties, vcRef: ViewContainerRef, isPopup?: boolean, styleSheetName?: string) {
  //   // if (styleSheetName) {
  //   //   this.loadStyle(styleSheetName);
  //   // }
  //   this.isPopup = isPopup || false;
  //   this.componetProperties = componetProperties;
  //   const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  //   vcRef.clear();
  //   templates.forEach(tmpl => {
  //     if (tmpl.ref instanceof TemplateRef) {
  //       const ngContent = this.getEmbeddedView(tmpl.ref, tmpl.properties);
  //       vcRef.createEmbeddedView(tmpl.ref, tmpl.properties);
  //     }
  //   });
  //   const componentRef = vcRef.createComponent(factory, 0, undefined, this.embeddedViews);
  //   this.setInputProperties(componentRef, componetProperties.inputs);
  //   if (isPopup) {
  //     componentRef.instance['visible'] = true;
  //   }
  //   componentRef.hostView.detectChanges();
  //   const { nativeElement } = componentRef.location;
  //   this.document.body.appendChild(nativeElement);
  //   this.componentRef = componentRef;
  //   console.log('componentRef', this.componentRef);
  // }


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
