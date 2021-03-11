import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

import { ServiceConfig } from './../models/service-config.enum';

@Pipe({
  name: 'available'
})
export class AvailablePipe implements PipeTransform {

  transform(date: string): boolean {
    const start = moment(date);
    const now   = moment()
    return start >= now;
  }

}
