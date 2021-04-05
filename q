[1mdiff --git a/src/app/core/interceptors/api-token-interceptor.service.ts b/src/app/core/interceptors/api-token-interceptor.service.ts[m
[1mindex abc6e5f..23c3399 100755[m
[1m--- a/src/app/core/interceptors/api-token-interceptor.service.ts[m
[1m+++ b/src/app/core/interceptors/api-token-interceptor.service.ts[m
[36m@@ -5,13 +5,19 @@[m [mimport { catchError } from 'rxjs/operators';[m
 import { Router } from '@angular/router';[m
 import { Observable, of, throwError } from 'rxjs';[m
 import { AuthService } from 'src/app/features/auth/services/auth.service';[m
[32m+[m[32mimport { SpinnerService } from '../services/spinner.service';[m
 [m
 @Injectable({[m
   providedIn: 'root'[m
 })[m
 export class ApiTokenInterceptorService implements HttpInterceptor {[m
 [m
[31m-  constructor(private storage: StorageService, private authService: AuthService, private router: Router){}[m
[32m+[m[32m  constructor([m
[32m+[m[32m    private storage: StorageService,[m[41m [m
[32m+[m[32m    private authService: AuthService,[m[41m [m
[32m+[m[32m    private router: Router,[m
[32m+[m[32m    private spinner: SpinnerService[m
[32m+[m[32m    ){}[m
 [m
   intercept(req: HttpRequest<any>, next: HttpHandler) {[m
     [m
[36m@@ -26,11 +32,16 @@[m [mexport class ApiTokenInterceptorService implements HttpInterceptor {[m
   }[m
 [m
   private handleAuthError(err: HttpErrorResponse): Observable<any> {[m
[32m+[m[32m    this.spinner.hide();[m
     if (err.status === 401) {[m
         this.authService.logout();[m
         this.router.navigateByUrl(`/autenticacion/login`);[m
         return of(err.message); [m
     }[m
[32m+[m[32m    if (err.status === 404) {[m
[32m+[m[32m        this.router.navigateByUrl(`/`);[m
[32m+[m[32m        return of(err.message);[m[41m [m
[32m+[m[32m    }[m
     return throwError(err);[m
 }[m
 [m
[1mdiff --git a/src/app/features/afinoa/components/inspection/weekly-view/weekly-view.component.html b/src/app/features/afinoa/components/inspection/weekly-view/weekly-view.component.html[m
[1mindex 2bcefc9..e397fc6 100755[m
[1m--- a/src/app/features/afinoa/components/inspection/weekly-view/weekly-view.component.html[m
[1m+++ b/src/app/features/afinoa/components/inspection/weekly-view/weekly-view.component.html[m
[36m@@ -29,7 +29,7 @@[m
                             [(viewDate)]="viewDate"[m
                             (click)="debouncedClick($event)"[m
                         >[m
[31m-                            Hoy[m
[32m+[m[32m                            Semana actual[m
                         </div>[m
                         <div[m
                             class="btn btn-primary c-pointer"[m
[1mdiff --git a/src/environments/environment.ts b/src/environments/environment.ts[m
[1mindex d8c6c1c..9f3169f 100755[m
[1m--- a/src/environments/environment.ts[m
[1m+++ b/src/environments/environment.ts[m
[36m@@ -1,6 +1,6 @@[m
 export const environment = {[m
   production: false,[m
[31m-  API_URL: 'http://179.43.114.94:8080/api/v1'[m
[31m-  //API_URL: 'http://localhost:8082/api/v1'[m
[32m+[m[32m  //API_URL: 'http://179.43.114.94:8080/api/v1'[m
[32m+[m[32m  API_URL: 'http://localhost:8082/api/v1'[m
 };[m
 [m
