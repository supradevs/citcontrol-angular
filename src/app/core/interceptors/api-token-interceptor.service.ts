import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiTokenInterceptorService implements HttpInterceptor {

  constructor(private storage: StorageService, private authService: AuthService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const token = this.storage.getItem('token');

    const requestWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(requestWithToken).pipe(catchError(err=> this.handleAuthError(err))); 
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl(`/autenticacion/login`);
        return of(err.message); 
    }
    return throwError(err);
}

  

}
