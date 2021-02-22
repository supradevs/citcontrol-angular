import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './template/login/login.component';
import { SchedulerComponent } from './template/scheduler/scheduler.component';


const routes: Routes = [
  {
    path:'template/login',
    component: LoginComponent
  },
  {
    path:'template/scheduler',
    component: SchedulerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
