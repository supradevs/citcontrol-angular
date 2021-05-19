import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { WeekProgrammingEvent } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingService {

  private subject = new Subject<any>();
  private removeElement$ = this.subject.asObservable();

  fetch(packingId: number, date: string): Observable<any>
  {
    const data = 
    {
        id: 421,
        empaque: 'Umbrella Corporation SRL',
        solicitudes: [
            {
                id: 345,
                fecha_inicio: '2021-05-10 01:00:00',
                fecha_fin: '2021-05-10 06:00:00',
                estado_id: 1,
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
                      fecha_inicio: '2021-05-10 01:00:00',
                      fecha_fin: '2021-05-10 06:00:00'
                    }
                  }
                ]
            },
            {
                id: 8492,
                fecha_inicio: '2021-05-10 00:00:00',
                fecha_fin: '2021-05-10 04:00:00',
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
                fecha_inicio: '2021-05-12 01:00:00',
                fecha_fin: '2021-05-12 06:00:00',
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
    const fn = () => {};

    return requests.map((request) =>  ({
      id: request.id, 
      start: new Date(request.fecha_inicio),
      end: new Date(request.fecha_fin),
      programmable: true,
      valid: request.empleados.legath > 0,
      events: request.empleados.map((employee) => (
        new WeekProgrammingEvent(true, employee, fn,  new Date(employee.asignacion.fecha_inicio), new Date(employee.asignacion.fecha_fin))
      )) 
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

}
