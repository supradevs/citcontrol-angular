import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Packing } from '../models'

@Injectable({
  providedIn: 'root'
})
export class PackingsService {

  readonly api: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getPackings(search: string, provinces: string, state: string): Observable<any>
  {
    const url = `${this.api}/inspeccion/estado_empaque?search=${search}&provincias=${provinces}&estado=${state}`;

    return this.http.get<Packing[]>(url).pipe(map((data:any) => data.data));
  }
}
