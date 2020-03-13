import { InjectionToken } from '@angular/core';

export interface INumberMaskConfig {

    align: string;
    allowNegative: boolean;
    decimal: string;
    precision: number;
    prefix: string;
    suffix: string;
    thousands: string;
}

export let NUMBER_MASK_CONFIG = new InjectionToken<INumberMaskConfig>('number.mask.config');
