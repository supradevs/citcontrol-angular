import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { WeekRequest } from './index';
import { ColorsStates } from '../../../shared/models'
import { format } from 'date-fns';


interface ColorEvent {
    primary: string,
    secondary: string
}

export class WeekEvent {

    public actions: CalendarEventAction[] = [];

    constructor(
        public start: Date, 
        public end: Date,
        public title: string,
        public color: ColorEvent,
        public meta: any = {},
        public draggable: boolean = false
    ){
        this.start = start;
        this.end = end;
        this.title = title;
        this.color = color;
        this.draggable = draggable;
        this.meta = meta;
    }

    public static create(weekRequest: WeekRequest): WeekEvent
    {
        const start = new Date(format(new Date( weekRequest.fecha_inicio ), 'yyyy-MM-dd HH:00:00' ));
        const end = new Date(format(new Date( weekRequest.fecha_fin ), 'yyyyy-MM-dd HH:00:00' ));
        const title = WeekEvent.titleMessage(weekRequest)
        const color = {
            primary: ColorsStates[weekRequest.estado_id],
            secondary: ColorsStates[weekRequest.estado_id],
        };
        return new WeekEvent(start, end, title, color, weekRequest);
    }

    public static fromArray(requests: WeekRequest[]): CalendarEvent[]
    {
        return requests.map(request => WeekEvent.create(request));
    }

    public static titleMessage(weekRequest: WeekRequest): string 
    {
        const startText = format(new Date( weekRequest.fecha_inicio ), 'dd/MM HH' );
        const endText = format(new Date( weekRequest.fecha_fin ), 'dd/MM HH' );
        const employees = []; //weekRequest.empleados.map(employe => employe.apellido + ' ' + employe.nombre).join('<br>');
        let validationMessage = '';
        
        if(weekRequest.estado_validacion_id != null)
        {
            validationMessage = `ESTADO VALIDACIÓN: ${ weekRequest.estado_validacion.toUpperCase() }`;
        }   
        
        return [
            `SOLICITUD #${ weekRequest.id }`,
            `Del ${ startText }hs. al ${ endText }hs.`,
            `${ weekRequest.servicio.toUpperCase() }`,
            `${ weekRequest.estado.toUpperCase() }`,
            `${ validationMessage }`,
            `${ employees }`,
        ]
        .join('<br>');
    }

}