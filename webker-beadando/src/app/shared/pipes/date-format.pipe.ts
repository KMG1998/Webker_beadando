import { formatDate, registerLocaleData } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import hu from '@angular/common/locales/hu';
import localeHuExtra from '@angular/common/locales/extra/hu';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    registerLocaleData(hu, localeHuExtra);
    const format = 'YYYY.MM.dd';
    const locale = 'hu';
    const formattedDate = formatDate(value, format, locale);
    return formattedDate;
  }
}
