import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: string | number | boolean): string {
    
    const yes = ['1', 1, true];
    const no = ['0', 0, false];

    if( yes.includes(value)) return 'si';

    if( no.includes(value)) return 'no';

    return null;
    
  }

}
