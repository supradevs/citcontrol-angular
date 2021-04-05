import { CalendarEvent } from 'angular-calendar';
import { WeekRequest } from './index';
import { StateColor } from '../../../shared/models'
import { format } from 'date-fns';

export class WeekEvent {

    public static create(weekRequest: WeekRequest): CalendarEvent
    {
        const employees = weekRequest.empleados.map(employe => employe.apellido + ' ' + employe.nombre).join('<br>');
        const start = format(new Date( weekRequest.fecha_inicio ), 'yyyy-MM-dd HH:00:00' );
        const end = format(new Date( weekRequest.fecha_fin ), 'yyyyy-MM-dd HH:00:00' );
        const startText = format(new Date( weekRequest.fecha_inicio ), 'dd/MM HH' );
        const endText = format(new Date( weekRequest.fecha_fin ), 'dd/MM HH' );
        
        return {
            start: new Date(start),
            end: new Date(end),
            title: `<b>SOLICITUD #${ weekRequest.id } <br> Del ${ startText }hs. al ${ endText }hs. <br> ${ weekRequest.servicio.toUpperCase() } <br> ${ weekRequest.estado.toUpperCase() }</b> <br> ${ employees }`, 
            color: {
                primary: StateColor.byId( weekRequest.estado_id ),
                secondary: StateColor.byId( weekRequest.estado_id ),
            },
            draggable: false
        }
    }

    public static fromArray(requests: WeekRequest[]): CalendarEvent[]
    {
        return requests.map(request => WeekEvent.create(request));
    }

}