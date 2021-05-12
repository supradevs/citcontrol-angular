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


  getWeek(packingId: number, date: string): Observable<{empaque: string, solicitudes: WeekRequest[]}>
  {
      const url = `${this.api}/inspeccion/solicitud_empaque_semanal/${packingId}?fecha_inicio=${date}`;
      return this.http.get(url).pipe(
         map((data:any) => data.data)
      );
  }

  modifyCancellation(requestId: number, statusId: number): Observable<WeekRequest>
  {
    const url = `${this.api}/afinoa/respuesta_validacion_solicitud/${requestId}`;
    return this.http.put(url, {estado_validacion_id: statusId}).pipe(
      map((data:any) => data.data.solicitud)
    );
  }

  rejectRequest(requestId: number):  Observable<any>
  {
    return of([]);
  }


}
