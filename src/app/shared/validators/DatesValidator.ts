import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DatesValidator {

    static min(date: any)
    {
        const minDate = moment(date);
        
        return (control: AbstractControl) => {
            
            const value = moment(control.value);

            if(value < minDate)
            {
                return {isMinor: true};
            }
            return null;
        }


    }

}