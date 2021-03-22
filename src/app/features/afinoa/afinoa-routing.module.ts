import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { AfinoaComponent } from './afinoa.component';
import { ListComponent } from './packings/list/list.component';
import { ShowComponent } from './packings/show/show.component';


const routes: Routes = [
  {
    path:'afinoa',
    component: AfinoaComponent,
    canActivate: [AuthGuard],
    data: {role: 'Afinoa'},
    children:[
      {
        path:'',
        pathMatch: 'prefix',
        redirectTo: 'empaques'
      },
      {
        path:'empaques',
        component: ListComponent
      },
      // {
      //   path:'empaques/:id',
      //   component: ShowComponent
      // }
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
