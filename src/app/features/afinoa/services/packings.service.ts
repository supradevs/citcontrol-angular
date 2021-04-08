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
    const url = `${this.api}/inspeccion/estado_empaque?search=${search}&provincias=${provinces}&estado=${state}`;
    
    return this.http.get<Packing[]>(url).pipe(map((data:any) => {
      return data.data;
    }));
  }


  getWeek(packingId: number, date: string): Observable<any>
  {
      const url = `${this.api}/inspeccion/solicitud_empaque_semanal/${packingId}?fecha_inicio=${date}`;
      return this.http.get(url).pipe(
         map((data:any) => data.data)
      );
  }

}
