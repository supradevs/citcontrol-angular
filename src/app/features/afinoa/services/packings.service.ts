import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Packing, WeekRequest } from '../models'

@Injectable({
  providedIn: 'root'
})
export class PackingsService {

  readonly api: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getPackings(search: string, provinces: string, state: string): Observable<Packing[]>
  {
    const url = `${this.api}/inspeccion/empaque_estados?search=${search}&provincias=${provinces}&estado=${state}`;
    
    return this.http.get<Packing[]>(url);
  }


  getWeek(packingId: number, date: string): Observable<any>
  {
      const url = `${this.api}/inspeccion/solicitud_empaque_semanal/${packingId}?fecha_inicio=${date}`;
      return this.http.get(url).pipe(
         map((data:any) => data.data)
      );
  }

  modifyCancellation(requestId: number, statusId: number): Observable<any>
  {
    return of({
      id: 166,
      servicio: "despacho",
      servicio_id: 3,
      estado: "cancelada fuera de termino",
      estado_id: 5,
      fecha_inicio: "2021-04-23 21:00:00",
      fecha_fin: "2021-04-24 09:00:00",
      motivo_cancelacion: "Ad hic hic corporis qui numquam iste sed.",
      estado_validacion: "asdas",
      estado_validacion_id: 2,
      empleados: [
      {
      apellido: "Murazik",
      nombre: "Aniya"
      },
      {
      apellido: "Strosin",
      nombre: "Casper"
      },
      {
      apellido: "Kunde",
      nombre: "Kaylee"
      }
      ]
      })

    const url = `${this.api}/afinoa/respuesta_validacion_solicitud/${requestId}`;
    return this.http.put(url, {estado_validacion_id: statusId}).pipe(
      map((data:any) => data.data.solicitud)
    );
  }


}
