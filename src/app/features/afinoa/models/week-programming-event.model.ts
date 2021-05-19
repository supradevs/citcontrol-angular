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
        action: (event:any) => void,
        start: Date,
        end: Date
    ) {
        const color = this.getRandomColor(extra.id);

        const actionEvent = {
            label: '<i class="fas fa-user-times text-white fs-15 mt-1 mr-2"></i>',
            a11yLabel: 'Quitar',
            onClick: action
        }

        //this.actions.push(actionEvent);
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
        let blue = Math.floor(value % 256);
        let green = Math.floor(value / 256 % 256);
        let red = Math.floor(value / 256 / 256 % 256);
        const color = "rgb(" + red + "," + green + "," + blue + ")";
        return {primary: color, secondary: color};
    }

}