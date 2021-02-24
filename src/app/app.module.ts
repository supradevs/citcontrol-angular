import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthModule } from './features/auth/auth.module';
import { MonitoringModule } from './features/monitoring/monitoring.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    MonitoringModule,
    //last
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
