import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class HoursHelperService {

  constructor() { }

  setOclock(dirtyHour: any)
  {
    return moment(dirtyHour)
    .set({minute:0,second:0,millisecond:0});
  }

  checkDiffBetween(startTime: any, endTime: any, min: number, max: number): boolean
  {
    const start = moment(startTime);
    const end = moment(endTime);
    const duration = moment.duration(end.diff(startTime)).asHours();
    return duration >= min && duration <= max;
  } 
}
