import { ServiceRequest, Packing, Service } from '../models';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  readonly api: string = environment.API_URL;

  constructor(private http: HttpClient) {

  }

  getPackings(): Observable<any> 
  {
    return this.http.get<Packing[]>(`${this.api}/inspeccion/empaques`);
  }

  getServices(): Observable<any> 
  {
    return this.http.get<Service[]>(`${this.api}/inspeccion/servicios`);
  }

  getRequests(packingId: number, search: string = '', page: number = 1): Observable<any> 
  {
    return this.http.get<any[]>(`${this.api}/inspeccion/solicitudes/${packingId}?search=${search}&page=${page}`);
  }

  cancelRequest(requestId: number,text: string): Observable<any> 
  {
    const data = { motivo_cancelacion: text };
    return this.http.put<any[]>(`${this.api}/inspeccion/solicitud_cancelacion/${requestId}`, data);
  }

  createRequests(requests: ServiceRequest[])
  {
    return this.http.post(`${this.api}/inspeccion/solicitud_empaque`, {servicios: requests})
    .pipe(
      delay(1000)
    );
  }
}
