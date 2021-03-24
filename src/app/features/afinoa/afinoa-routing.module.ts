import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { AfinoaComponent } from './afinoa.component';
import { ListComponent } from './components/packings/list/list.component';
import { ShowComponent } from './components/packings/show/show.component';


const routes: Routes = [
  {
    path:'',
    component: AfinoaComponent,
    canActivate: [AuthGuard],
    data: {role: 'Afinoa'},
    children:[
      {
        path:'empaques',
        component: ListComponent
      },
      {
        path:'**',
        pathMatch: 'prefix',
        redirectTo: 'empaques'
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
