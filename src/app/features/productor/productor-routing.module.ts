import { ShowRequestsComponent } from './components/show-requests/show-requests.component';
import { CreateRequestsComponent } from './components/create-requests/create-requests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProductorComponent } from './productor.component';
import { ShowRequestComponent } from './components/show-request/show-request.component';

const routes: Routes = [
  {
    path:'',
    component: ProductorComponent,
    canActivate: [AuthGuard],
    data: {role: 'Productor'},
    children:[
      {
        path:'crear-solicitudes',
        component: CreateRequestsComponent
      },
      {
        path:'mostrar-solicitudes',
        component: ShowRequestsComponent
      },
      {
        path:'solicitud/:id',
        component: ShowRequestComponent
      },
      {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'mostrar-solicitudes'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductorRoutingModule { }
