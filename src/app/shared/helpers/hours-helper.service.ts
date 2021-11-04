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
    const duration = moment.duration(end.diff(start)).asHours();
    return duration >= min && duration <= max;
  } 

  dateRangeOverlaps(startDateA: any, endDateA: any, startDateB: any, endDateB: any, options:any = '()') {

    //options: (), [), (]. []
    const between = (startDateA:any, startDateB: any, endDateB: any) =>  moment(startDateA).isBetween(moment(startDateB), moment(endDateB), null, options);

    return (
        between(startDateA, startDateB, endDateB) || 
        between(endDateA, startDateB, endDateB) ||
        between(startDateB, startDateA, endDateA) ||
        between(endDateB, startDateA, endDateA)
    )
  }

  sameDuration(startA: any, endA: any, startB: any, endB: any): boolean
  {
    const durationA = moment.duration(moment(endA).diff(moment(startA))).asHours();
    const durationB = moment.duration(moment(endB).diff(moment(startB))).asHours();
    return durationA == durationB;
  }

  durationDiff(startA:any, startB: any): number
  {
    return moment.duration(moment(startB).diff(moment(startA))).asHours();
  }
}
