import * as moment from 'moment';

export class ServiceRequest {

    constructor( 
        public empaque_id: string,
        public servicio_id: string,
        public fecha_inicio: string,
        public fecha_fin: string,
        public extraordinaria: number
    ){
        this.fecha_inicio = this.dateFormat(this.fecha_inicio);
        this.fecha_fin = this.dateFormat(this.fecha_fin);
    }

    static create( obj: Object ) 
    {
        return new ServiceRequest(
            obj['empaque_id'],
            obj['servicio_id'],
            obj['fecha_inicio'],
            obj['fecha_fin'],
            obj['extraordinaria']
        )
    }
    
    private dateFormat(date:string): string
    {
        return moment(date).format('YYYY-MM-DD HH:00:00');
    }

}