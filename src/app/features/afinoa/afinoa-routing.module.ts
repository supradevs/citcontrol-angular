import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { InspectionComponent } from './components/inspection/inspection.component';

import { AfinoaComponent } from './afinoa.component';
import { ListComponent } from './components/inspection/list/list.component';
import { NotificationComponent } from './components/inspection/notification/notification.component';
import { RequestsComponent } from './components/inspection/requests/requests.component';
import { WeeklyViewComponent } from './components/inspection/weekly-view/weekly-view.component';


const routes: Routes = [
  {
    path:'',
    component: AfinoaComponent,
    canActivate: [AuthGuard],
    data: {role: 'Afinoa'},
    children: [
      {
        path:'inspeccion',
        component: InspectionComponent,
        children: [
            {
              path:'empaques',
              component: ListComponent,
            },
            {
              path:'empaque/:id',
              component: WeeklyViewComponent
            },
            {
              path:'solicitud/:id',
              component: NotificationComponent
            },
            {
              path:'solicitudes',
              component: RequestsComponent
            },
            {
              path:'**',
              pathMatch: 'prefix',
              redirectTo: 'empaques'
            },
        ]
      },
      
      // {
      //   path:'monitoreo',
      //   component: X, 
      //   children: [ ... ]
      // }

      {
        path:'**',
        pathMatch: 'prefix',
        redirectTo: 'inspeccion'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AfinoaRoutingModule { }
