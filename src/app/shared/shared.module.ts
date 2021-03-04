import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlannerCalendarComponent } from './components/planner-calendar/planner-calendar.component';
import { LightModalComponent } from './components/light-modal/light-modal.component'
import { AuthGuard } from './guards/auth.guard';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    NavbarComponent,
    PlannerCalendarComponent,
    LightModalComponent,
    LoadSpinnerComponent,
    AlertComponent,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    PlannerCalendarComponent,
    LightModalComponent,
    LoadSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule { }
