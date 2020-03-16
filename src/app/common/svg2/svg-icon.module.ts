import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SVG_ICON_REGISTRY_PROVIDER } from './svg-icon-registry.service';
import { SvgIconComponent } from './svg-icon.component';
import { SvgHttpLoader, SvgLoader } from './svg-loader';

export interface ISvgIconConfig {
  loader?: Provider;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SvgIconComponent
  ],
  exports: [SvgIconComponent]
})
export class SvgIconModule {

  static forRoot(config: ISvgIconConfig = {}): ModuleWithProviders<SvgIconModule> {
    return {
      ngModule: SvgIconModule,
      providers: [
        SVG_ICON_REGISTRY_PROVIDER,
        config.loader || { provide: SvgLoader, useClass: SvgHttpLoader }
      ]
    };
  }
}
