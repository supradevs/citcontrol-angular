import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PlannerCalendarComponent } from './components/planner-calendar/planner-calendar.component';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { TitleSectionComponent } from './components/title-section/title-section.component';

import { AuthGuard } from './guards/auth.guard';

import { YesNoPipe } from './pipes/yes-no.pipe';
import { ColorPipe } from './pipes/color.pipe';
import { ModalComponent } from './components/modal/modal.component';


const elements = [
  //components
  NavbarComponent,
  PlannerCalendarComponent,
  LoadSpinnerComponent,
  AlertComponent,
  TitleSectionComponent,
  ModalComponent,

  //pipes
  YesNoPipe,
  ColorPipe
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
   ...elements,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    ...elements
  ]
})
export class SharedModule { }
