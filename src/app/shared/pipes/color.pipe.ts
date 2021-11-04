import { Pipe, PipeTransform } from '@angular/core';
import { ColorsStates } from './../models';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(stateId: string | number): string {
    return ColorsStates[stateId];
  }

}
