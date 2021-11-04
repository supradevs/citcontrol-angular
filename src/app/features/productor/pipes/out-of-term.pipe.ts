import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

import { ServiceConfig } from './../models/service-config.enum';

@Pipe({
  name: 'outOfTerm'
})
export class OutOfTermPipe implements PipeTransform {

  transform(date: string): boolean {
    
    const start = moment(date);
    const now   = moment()
    const duration = moment.duration(start.diff(now));
    const hours = duration.asHours();
   
    if( hours > 0 && hours <= ServiceConfig.CANCEL_OUT_OF_TERM)
    {
      return true;
    }

    return false;
  }

}
