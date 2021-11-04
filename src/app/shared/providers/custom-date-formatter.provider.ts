import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek, startOfWeek, endOfWeek, getDate, format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
    public weekViewTitle({ date, locale }: DateFormatterParams): string {
        const startDay = getDate(startOfWeek(date, {weekStartsOn: 1}));
        const startMonth = format(startOfWeek(date, {weekStartsOn: 1}), 'LLLL', { locale: es });
        const endDay = getDate(endOfWeek(date, {weekStartsOn: 1}));
        const endMonth = format(endOfWeek(date, {weekStartsOn: 1}), 'LLLL', { locale: es });
        return `Semana del ${ startDay } de ${ startMonth } al ${ endDay } de ${ endMonth }`;
    }

    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return formatDate(date, 'HH:mm', locale);
    }
    
    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return this.dayViewHour({ date, locale });
    }
  }
  