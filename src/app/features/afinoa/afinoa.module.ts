import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AfinoaRoutingModule } from './afinoa-routing.module';

import { AfinoaComponent } from './afinoa.component';
import { ListComponent } from './components/inspection/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationComponent } from './components/inspection/notification/notification.component';
import { WeeklyViewComponent } from './components/inspection/weekly-view/weekly-view.component';
import { RequestsComponent } from './components/inspection/requests/requests.component';
import { InspectionComponent } from './components/inspection/inspection.component';
import { WeeklyScheduleComponent } from './components/inspection/weekly-schedule/weekly-schedule.component';


@NgModule({
  declarations: [
    InspectionComponent,
    AfinoaComponent,
    ListComponent,
    NotificationComponent,
    WeeklyViewComponent,
    RequestsComponent,
    WeeklyScheduleComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SharedModule,
    AfinoaRoutingModule,
  ]
})
export class AfinoaModule { }
