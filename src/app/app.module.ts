import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './template/login/login.component';
import { RequestsComponent } from './template/requests/requests.component';
import { SchedulerComponent } from './template/scheduler/scheduler.component';
import { CalendarComponent } from './template/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RequestsComponent,
    SchedulerComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
