import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ServiceConfig } from './../models/service-config.enum';
import { HoursHelperService } from './../../../shared/helpers/hours-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  private today = new Date();
  private startOfWeek: string;
  private endOfWeek: string;

  serviceConfig = ServiceConfig;

  constructor(
    private hoursHelperService:HoursHelperService,
    private hoursHelper: HoursHelperService,
  ) { 
      this.setCurrentWeek()
  }

  private setCurrentWeek(): void 
  {
    moment.updateLocale('en', {week: {dow : 1}});
    const monday = moment(this.today).startOf('week');
    this.startOfWeek = monday.format('YYYY-MM-DD 00:00:00'); 
    this.endOfWeek = monday.add(6, 'days').format('YYYY-MM-DD 23:59:59');
  }

  public isInCurrentweek(date: string | Date): boolean 
  {
    const startDate = new Date(this.startOfWeek);
    const endDate = new Date(this.endOfWeek);
    const compareDate = moment( new Date(date) );
    return compareDate.isBetween(startDate, endDate); 
  }

  public isInWeekend(): boolean
  {
    const friday = moment(this.endOfWeek).subtract(2, 'days').format('YYYY-MM-DD 00:00:00');
    const startDate = new Date(friday);
    const endDate = new Date(this.endOfWeek);
    const compareDate = moment( new Date(this.today) );
    return compareDate.isBetween(startDate, endDate);
  }

  public isInNextWeek(date: string | Date): boolean
  {
    moment.updateLocale('en', {week: {dow : 1}});
    const nextMonday = moment(new Date(this.endOfWeek)).add(1,'days').startOf('day');
    const nextSunday = moment(new Date(this.endOfWeek)).add(7,'days');
    const compareDate = moment( new Date(date) );
    return compareDate.isBetween(nextMonday, nextSunday);
  }

  minHour(): string
  {
    const dirtyHour = moment(this.today).add(ServiceConfig.HOURS_IN_ADVANCE, 'hours') ;

    return this.hoursHelperService.setOclock(dirtyHour).format('YYYY-MM-DDTHH:mm');
  }

  checkTimeRangeIsValid(firstControl: string, secondControl: string) {
    return (formGroup: FormGroup) => {
      const firstControlValue = formGroup.controls[firstControl].value;
      const secondControlValue = formGroup.controls[secondControl].value;
      const minHoursAllowed = this.serviceConfig.MINIMUN_RANGE;
      const maxHoursAllowed = this.serviceConfig.MAXIMUN_RANGE;
      const verify = this.hoursHelper.checkDiffBetween(firstControlValue,secondControlValue, minHoursAllowed, maxHoursAllowed);

      if(verify)
        formGroup.controls[secondControl].setErrors(null);
      else
        formGroup.controls[secondControl].setErrors({invalidDates: true});
    }
  }

  private get isSunday(): boolean
  {
    var weekDayName =  moment(this.today).format('dddd').toLowerCase();
    return weekDayName == 'sunday';
  }

  getMinMaxDateAvailable(): {min: string, max: string}
  {
    const addOneWeek = 7;
    const addTwoWeek = 14;
    const add = this.isSunday ? addOneWeek : addTwoWeek;
    const min = moment(this.minHour()).format('YYYY-MM-DD HH:mm:ss');
    const max = moment(this.today).day(add).endOf('day').format('YYYY-MM-DD 23:59:59');
    return {max, min};
  }

  setOclock(date: string | Date): string 
  {
    return moment(date).format('YYYY-MM-DD HH:00:00');
  }

  lastSunday(): Date 
  {
    return moment(new Date(this.endOfWeek)).add(7,'days').toDate(); 
  }

 
}
