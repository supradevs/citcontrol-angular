import { WeekProgrammingEvent } from './week-programming-event.model';
import * as moment from 'moment';

interface Empleado {
    id: number,
    fecha_inicio: string,
    fecha_fin: string
}

export class StoreRequest {

    id: number;
    empleados: Empleado[];

    constructor(id:number, empleados: any[])
    {
        this.id = id;
        this.empleados = empleados;
    }

    public static create(request:any): StoreRequest 
    {
        return new StoreRequest(request.id, StoreRequest.formatEvents(request.events));
    }

    public static fromArray(requests: any[]): StoreRequest[]
    {
        return requests.map((request:any) => StoreRequest.create(request));
    }

    public static formatEvents(events: WeekProgrammingEvent[])
    {
        return events.map((event:WeekProgrammingEvent) => ({
            id: event.meta.extra.id, 
            fecha_inicio: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
            fecha_fin: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
        }));
    }

}