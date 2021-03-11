import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductorRoutingModule } from './productor-routing.module';
import { ProductorComponent } from './productor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRequestsComponent } from './create-requests/create-requests.component';
import { ShowRequestsComponent } from './show-requests/show-requests.component';


@NgModule({
  declarations: [ProductorComponent, CreateRequestsComponent, ShowRequestsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductorRoutingModule
  ]
})
export class ProductorModule { }
