import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Notification } from '../models';
import { Request } from 'src/app/features/productor/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]> 
  {
    const url = environment.API_URL + '/inspeccion/notificaciones_empaques';

    return this.http.get(url)
      .pipe(
        map((data:any) => data.data)
      );
  }

  updateNotification(id: number | string): Observable<Request> 
  {
    const url = environment.API_URL + `/inspeccion/notificacion_solicitud_empaque/${id}`;
    return this.http.put(url, {}).pipe(map((data:any) => data.data));
  }
}
