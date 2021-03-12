import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ServiceConfig } from './../models/service-config.enum';
import { HoursHelperService } from './../../../shared/helpers/hours-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  serviceConfig = ServiceConfig;

  constructor(
    private hoursHelperService:HoursHelperService,
    private hoursHelper: HoursHelperService,
    ) { }

  minHour(): string
  {
    const dirtyHour = moment().add(ServiceConfig.HOURS_IN_ADVANCE, 'hours') ;

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
}
