import { Pipe, PipeTransform } from '@angular/core';
import { Colors } from '../models/colors.enum';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(value: string | number): string {
    
    const colorsString = {
      'a programar': Colors.toSchedule,
      'programada': Colors.scheduled,
      'completada': Colors.completed,
      'cancelada en termino': Colors.canceledInTerm,
      'cancelada fuera de termino': Colors.canceledOutOfTerm,
    }

    const colorsNumber = {
      1: Colors.toSchedule,
      2: Colors.scheduled,
      3: Colors.completed,
      4: Colors.canceledInTerm,
      5: Colors.canceledOutOfTerm,
    }

    if(typeof value == 'number')
    {
      return colorsNumber[value];
    }
    else
    {
      return colorsString[value.toLowerCase()];
    }

  }

}
