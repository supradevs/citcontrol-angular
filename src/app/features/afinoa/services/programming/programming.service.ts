import { CalendarEvent } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { WeekProgrammingEvent, StoreRequest, Overlap} from '../../models';
import { HoursHelperService } from 'src/app/shared/helpers/hours-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingService {

  private subject = new Subject<any>();
  private removeElement$ = this.subject.asObservable();

  constructor(private hoursHelperService: HoursHelperService){}

  fetch(packingId: number, date: string): Observable<any>
  {
    const data = 
    {
        id: 421,
        empaque: 'Umbrella Corporation SRL',
        solicitudes: [
            {
                id: 345,
                fecha_inicio: '2021-05-10 22:00:00',
                fecha_fin: '2021-05-11 06:00:00',
                estado_id: 4,
                empleados: [
                  {
                    id: 214,
                    nombre: 'Juan',
                    apellido: 'Perez Bolaños',
                    sello: '42525',
                    legajo: 'Abf453',
                    seniority: 'pleno',
                    horas: 10,
                    empaques: [
                      'Super Postman',
                      'Sonic Youth',
                      'Green River',
                      'Splendora'
                    ],
                    asignacion: { 
                      fecha_inicio: '2021-05-10 22:00:00',
                      fecha_fin: '2021-05-11 00:00:00'
                    }
                  }
                ]
            },
            {
                id: 8492,
                fecha_inicio: '2021-05-11 02:00:00',
                fecha_fin: '2021-05-11 04:00:00',
                estado_id: 1,
                empleados: []
            },
            {
                id: 24,
                fecha_inicio: '2021-05-11 01:00:00',
                fecha_fin: '2021-05-11 06:00:00',
                empleados: [
                  
                ],
            },
            {
                id: 954,
                fecha_inicio: '2021-05-12 11:00:00',
                fecha_fin: '2021-05-12 16:00:00',
                empleados: []

            },
            {
                id: 146,
                fecha_inicio: '2021-05-13 01:00:00',
                fecha_fin: '2021-05-13 06:00:00',
                empleados: []

            },
            {
                id: 973,
                fecha_inicio: '2021-05-14 01:00:00',
                fecha_fin: '2021-05-14 06:00:00',
                empleados: []
            }
        ]
    };
  
    const mapped = {
      "packing": data.empaque,
      "requests": this.mapRequests(data.solicitudes)
    };

    return of(mapped);
  }

  private mapRequests(requests: any[])
  {

    return requests.map((request) =>  ({
      id: request.id, 
      start: new Date(request.fecha_inicio),
      end: new Date(request.fecha_fin),
      programmable: true,
      valid: request.empleados.legath > 0,
      events: request.empleados.map((employee) => this.createWeekProgrammingEvent(employee, true, new Date(employee.asignacion.fecha_inicio), new Date(employee.asignacion.fecha_fin)))
    }));

  }

  getEmployees(): Observable<any>
  {
    const data = [
      {
        id: 214,
        nombre: 'Juan',
        apellido: 'Perez Bolaños',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Super Postman',
          'Sonic Youth',
          'Green River',
          'Splendora'
        ]
      },
      {
        id: 45,
        nombre: 'Mrcelo',
        apellido: 'Gallardo',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Green River',
          'Sonic Youth',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 643,
        nombre: 'Julian',
        apellido: 'Serrano',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 8955,
        nombre: 'Marta',
        apellido: 'Estuart',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 784,
        nombre: 'Pedro',
        apellido: 'Infante',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 4385,
        nombre: 'Carlos',
        apellido: 'Ronaldiño',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 3484,
        nombre: 'Gloria',
        apellido: 'Estefan',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 50464,
        nombre: 'Maria',
        apellido: 'Tekzuma',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 9034,
        nombre: 'Kurt',
        apellido: 'Cobiani',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 433478,
        nombre: 'Layne',
        apellido: 'Stalin',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 83457,
        nombre: 'Roberto',
        apellido: 'Estebanez',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 3634,
        nombre: 'Susana',
        apellido: 'Adiction',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 45742,
        nombre: 'Paul',
        apellido: 'McDonald',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
      {
        id: 7346,
        nombre: 'Juan',
        apellido: 'Langosta',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Super Postman',
          'Sonic Youth',
          'Green River',
          'Splendora'
        ]
      },
      {
        id: 26614,
        nombre: 'Alice',
        apellido: 'Orlowsky',
        sello: '42525',
        legajo: 'Abf453',
        seniority: 'pleno',
        horas: 10,
        empaques: [
          'Sonic Youth',
          'Green River',
          'Super Postman',
          'Splendora'
        ]
      },
    ];


    const events = data.map((employee, index) => {

      const self = this;

      const callback = ({event}) => { 
        const service = self;
        service.subject.next(event)
      };

      return new WeekProgrammingEvent(false, employee, callback, new Date, new Date)

    });

    
    return of(events);
  }

  removeElement(): Observable<any>
  {
    return this.removeElement$;
  }

  createWeekProgrammingEvent(employee: any, valid: boolean, start: Date, end: Date): WeekProgrammingEvent
  {
    const fn = ({ event }: { event: CalendarEvent }): void => {
      this.subject.next(event);
    };
    return new WeekProgrammingEvent(valid, employee, fn, start, end);
  }

  employeesOverlapping(requests: any): Overlap[] 
  {
        //solicitudes ordenadas ascendentemente
        if(requests.length <= 1) return [];  

        const pairs = [];

        for(let i = 1; i < requests.length; i++) {

            const requestA = requests[i - 1];
            const requestB = requests[i];

            if( this.hoursHelperService.dateRangeOverlaps(requestA.start, requestA.end, requestB.start, requestB.end) )
            {
                pairs.push({ requestA, requestB });
            }

        }

        return this.evaluateEmployeesOverlapping(pairs);
  }

  private evaluateEmployeesOverlapping(pairs: any[]): Overlap[] 
  {
       const overlaps = [];

       for(let pair of pairs)
       {
           const { requestA, requestB } = pair;

           for(let eventA of requestA.events)
           {
               const eventB = requestB.events.find((event: CalendarEvent)=> event.meta.extra.id == eventA.meta.extra.id); //

               if(eventB) 
               {
                   if( this.hoursHelperService.dateRangeOverlaps(eventA.start, eventA.end, eventB.start, eventB.end) ) 
                   {
                      const {id, nombre, apellido } = eventA.meta.extra;
                      const employee = {id, nombre, apellido };
                      const overlapA = {id: requestA.id, start: eventA.start, end: eventA.end};
                      const overlapB = {id: requestB.id, start: eventB.start, end: eventB.end};
                      overlaps.push(new Overlap(employee, overlapA, overlapB));
                   }
               }
           }

       }

       return overlaps;
  }

  store(requests: StoreRequest[]): Observable<any> 
  {
    const data = ([
      {
        id: 7841,
        nombre: 'Juan', 
        apellido: 'Garcia',
        solicitud_local : {
          id: 2344,
          fecha_inicio: '2021-05-01 14:30:00',
          fecha_fin: '2021-05-01 18:30:00',
        },
        solicitud_servidor : {
          id: 9354,
          fecha_inicio: '2021-05-01 11:30:00',
          fecha_fin: '2021-05-01 17:00:00',
        }
      },
      {
        id: 7841,
        nombre: 'Maria', 
        apellido: 'Antonieta',
        solicitud_local : {
          id: 6323,
          fecha_inicio: '2021-05-01 14:30:00',
          fecha_fin: '2021-05-01 18:30:00',
        },
        solicitud_servidor : {
          id: 753,
          fecha_inicio: '2021-05-01 11:30:00',
          fecha_fin: '2021-05-01 17:00:00',
        }
      }
    ]);

    const map = data.map(e => {
      const {id, nombre, apellido} = e;
      const {id:idA, fecha_inicio:startA, fecha_fin:endA} = e.solicitud_local;
      const {id:idB, fecha_inicio:startB, fecha_fin:endB} = e.solicitud_servidor;
      const employee = {id, nombre, apellido};
      const overlapA = {id: idA, start: new Date(startA), end: new Date(endA)};
      const overlapB = {id: idB, start: new Date(startB), end: new Date(endB)};
      return new Overlap(employee, overlapA, overlapB);
    });

    return of(map);

  }

  canPaste(requestA: any, requestB: any): boolean 
  {
    return this.hoursHelperService.sameDuration(requestA.start, requestA.end, requestB.start, requestB.end);
  }

  requestsDiff(requestA: any, requestB: any): number 
  {
    return this.hoursHelperService.durationDiff(requestA.start, requestB.start);
  }

}
