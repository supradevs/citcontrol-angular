import * as moment from 'moment';

export class Reprogramming {

    constructor( 
        public fecha_inicio: string,
        public fecha_fin: string
    ){
        this.fecha_inicio = this.dateFormat(this.fecha_inicio);
        this.fecha_fin = this.dateFormat(this.fecha_fin);
    }

    static create( obj: Object ) 
    {
        return new Reprogramming(
            obj['fecha_inicio'],
            obj['fecha_fin']
        )
    }
    
    private dateFormat( date:string): string
    {
        return moment(date).format('YYYY-MM-DD HH:00:00');
    }

}