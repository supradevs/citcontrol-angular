import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';

interface ColorEvent {
    primary: string,
    secondary: string
}

interface Resizable {
     beforeStart: boolean, 
     afterEnd: boolean
}

interface Action {
    label: string,
    a11yLabel: string,
    onClick: (event:any) => void
}

interface Meta {
    valid: boolean,
    color: ColorEvent,
    extra: any
}


export class WeekProgrammingEvent {

    title: string = '';
    color: ColorEvent;
    start: Date = new Date;
    end: Date = new Date;
    draggable: boolean = true; 
    resizable: Resizable = {beforeStart: true, afterEnd: true};
    actions: Action[] = [];
    meta: Meta;

    private invalidColors = {
      primary: '#ff0d07',
      secondary: '#f332327a'
    }

    constructor(
        valid: boolean = false,
        extra: any,
        action: ({ event }: { event: CalendarEvent }) => void,
        start: Date,
        end: Date
    ) {
        const color = this.getRandomColor(extra.id);

        const actionEvent = {
            label: '<i class="fas fa-user-times text-white fs-15 mt-1 mr-2"></i>',
            a11yLabel: 'Quitar',
            onClick: action
        }

        this.actions.push(actionEvent);
        this.meta        = {color, valid, extra};
        this.color       = valid ? color : this.invalidColors;
        this.start       = start ? start : new Date;
        this.end         = end ? end : new Date;
        this.title       = this.setTitle();
    }


    private setTitle(): string
    {
      return `<b class="fs-13">${ this.fullName() } - ${ this.getHours() }</b>`;
    }
  
    private getHours(): string 
    {
      return `${ moment(this.start).format('HH:mm') } a ${ moment(this.end).format('HH:mm') }`;
    }

    private fullName(): string 
    {
      return `${ this.meta.extra.apellido } ${ this.meta.extra.nombre }`;
    }

    private getRandomColor(value: number): ColorEvent
    {
        const stringToColour = (value: number) => {

          let total = String(value).split('').map(n => Number(n)).reduce((a,b) => a+b,0);

          let str = String(value * total);

          let hash = 0;
          for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
          }
          var colour = '#';
          for (var i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
          }
          return colour;
      }

      const color = stringToColour(value);

      return {primary: color, secondary: color};
    }

}