import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

import { ServiceConfig } from './../models/service-config.enum';

@Pipe({
  name: 'inTerm'
})
export class InTermPipe implements PipeTransform {

  transform(date: string): boolean {
    
    const start = moment(date);
    const now   = moment()
    const duration = moment.duration(start.diff(now));
    const hours = duration.asHours();

    if( hours >= ServiceConfig.HOURS_IN_ADVANCE)
    {
       return true;
    }

    return false;
  }

}
