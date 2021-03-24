import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfinoaRoutingModule } from './afinoa-routing.module';

import { AfinoaComponent } from './afinoa.component';
import { ShowComponent } from './components/packings/show/show.component';
import { ListComponent } from './components/packings/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AfinoaComponent,
    ShowComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AfinoaRoutingModule,
  ]
})
export class AfinoaModule { }
