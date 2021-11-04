import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'autenticacion',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'productor',
    loadChildren: () => import('./features/productor/productor.module').then(m => m.ProductorModule)
  },
  {
    path: 'afinoa',
    loadChildren: () => import('./features/afinoa/afinoa.module').then(m => m.AfinoaModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'autenticacion'
  },
  {
    path:'**',
    redirectTo:'autenticacion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
