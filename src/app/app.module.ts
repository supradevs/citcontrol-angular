import { ProductorModule } from './features/productor/productor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthModule } from './features/auth/auth.module';
import { MonitoringModule } from './features/monitoring/monitoring.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiTokenInterceptorService } from './core/interceptors/api-token-interceptor.service';
import { AfinoaComponent } from './features/afinoa/afinoa.component';
import { AfinoaModule } from './features/afinoa/afinoa.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    MonitoringModule,
    ProductorModule,
    AfinoaModule,
    //last
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
