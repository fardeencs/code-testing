import { TemplateRef, Type, ViewContainerRef } from "@angular/core";

export interface ILoader {
  elementId: string;
  delay?: number;
  zIndex?: number;
}

export type Content<T> = string | TemplateRef<T> | Type<T>;
export interface IComponetProperties {
  inputs?: { [key: string]: any };
  outputs?: { [key: string]: any };
}

export interface ITemplate<T> {
  title: string;
  content: Content<T>;
  templateProperties?: { [key: string]: any };
}

export interface IComponent<T> {
  componentType: Type<T>;
  componetProperties?: IComponetProperties;
}

export interface IFactoryCompoent<C, T> {
  component: IComponent<C>;
  template: ITemplate<T>;
  vcRef: ViewContainerRef;
  extraTemplate?: ITemplate<any>;
  isPopup?: boolean;
  styleSheetName?: string;
  loadingId?: string;
  delay?: number;
}

