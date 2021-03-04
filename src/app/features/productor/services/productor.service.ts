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

  createRequests(requests: ServiceRequest[])
  {
    return this.http.post(`${this.api}/inspeccion/solicitud_empaque`, {servicios: requests})
    .pipe(
      delay(1000)
    );
  }
}
