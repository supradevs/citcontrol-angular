import { CalendarEvent } from 'angular-calendar';
import { WeekRequest } from './index';
import { StateColor } from '../../../shared/models'
import { format } from 'date-fns';


interface ColorEvent {
    primary: string,
    secondary: string
}

export class WeekEvent {

    constructor(
        public start: Date, 
        public end: Date,
        public title: string,
        public color: ColorEvent,
        public draggable: boolean = false    
    ){
        this.start = start;
        this.end = end;
        this.title = title;
        this.color = color;
        this.draggable = draggable;
    }

    public static create(weekRequest: WeekRequest): CalendarEvent
    {
        const employees = weekRequest.empleados.map(employe => employe.apellido + ' ' + employe.nombre).join('<br>');
        const start = new Date(format(new Date( weekRequest.fecha_inicio ), 'yyyy-MM-dd HH:00:00' ));
        const end = new Date(format(new Date( weekRequest.fecha_fin ), 'yyyyy-MM-dd HH:00:00' ));
        const startText = format(new Date( weekRequest.fecha_inicio ), 'dd/MM HH' );
        const endText = format(new Date( weekRequest.fecha_fin ), 'dd/MM HH' );
        const title = `<b>SOLICITUD #${ weekRequest.id } <br> Del ${ startText }hs. al ${ endText }hs. <br> ${ weekRequest.servicio.toUpperCase() } <br> ${ weekRequest.estado.toUpperCase() }</b> <br> ${ employees }`;
        const color = {
            primary: StateColor.byId( weekRequest.estado_id ),
            secondary: StateColor.byId( weekRequest.estado_id ),
        };
        return new WeekEvent(start, end, title, color);
    }

    public static fromArray(requests: WeekRequest[]): CalendarEvent[]
    {
        return requests.map(request => WeekEvent.create(request));
    }

}