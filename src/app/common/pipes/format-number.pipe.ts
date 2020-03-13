import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: any, selectedCulture: any): any {
    if (value === 0) {
      return 0;
    }
    if (!value) {
      return;
    }
    const userLang = navigator.language;
    if (selectedCulture) {
      return new Intl.NumberFormat(selectedCulture).format(value);
    } else {
      return new Intl.NumberFormat(userLang).format(value);
    }
  }
}
