import { Pipe, PipeTransform } from '@angular/core';
import { Colors } from '../models/colors.enum';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(value: string): string {
    
    const state = value.toLowerCase();

    const colors = {
      'a programar': Colors.toSchedule,
      'programada': Colors.scheduled,
      'completada': Colors.completed,
      'cancelada a termino': Colors.canceledInTerm,
      'cancelada fuera de termino': Colors.canceledOutOfTerm,
    }

    return colors[state];
  }

}
