import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MonitoringComponent } from './monitoring.component';
import { SchedulerComponent } from './scheduler/scheduler.component';


@NgModule({
  declarations: [RequestsComponent, MonitoringComponent, SchedulerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MonitoringRoutingModule
  ]
})
export class MonitoringModule { }
