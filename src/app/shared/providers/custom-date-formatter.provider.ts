import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek, startOfWeek, endOfWeek, getDate, format } from 'date-fns';
import { es } from 'date-fns/locale';


@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
    public weekViewTitle({ date, locale }: DateFormatterParams): string {
        const startDay = getDate(startOfWeek(date));
        const startMonth = format(startOfWeek(date), 'LLLL', { locale: es });
        const endDay = getDate(endOfWeek(date));
        const endMonth = format(endOfWeek(date), 'LLLL', { locale: es });
        return `Semana del ${ startDay } de ${ startMonth } al ${ endDay } de ${ endMonth }`;
    }
  }
  