import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiTokenInterceptorService implements HttpInterceptor {

  constructor(private storage: StorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const token = this.storage.getItem('token');

    const requestWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next.handle(requestWithToken);
  }

  

}
