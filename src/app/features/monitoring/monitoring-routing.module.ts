import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { RequestsComponent } from './requests/requests.component';
import { SchedulerComponent } from './scheduler/scheduler.component';


const routes: Routes = [
  {
    path:'monitoreo',
    component: MonitoringComponent,
    children:[
      {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'solicitudes'
      },
      {
        path:'solicitudes',
        component: RequestsComponent
      },
      {
        path:'planificador',
        component: SchedulerComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
