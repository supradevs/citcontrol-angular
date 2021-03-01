import { CreateRequestsComponent } from './create-requests/create-requests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProductorComponent } from './productor.component';


const routes: Routes = [
  {
    path:'productor',
    component: ProductorComponent,
    canActivate: [AuthGuard],
    data: {role: 'Productor'},
    children:[
      {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'crear-solicitudes'
      },
      {
        path:'crear-solicitudes',
        component: CreateRequestsComponent
      },
      // {
      //   path:'planificador',
      //   component: SchedulerComponent
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductorRoutingModule { }
