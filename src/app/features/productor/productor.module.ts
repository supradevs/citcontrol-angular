import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductorRoutingModule } from './productor-routing.module';
import { ProductorComponent } from './productor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRequestsComponent } from './create-requests/create-requests.component';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import { InTermPipe } from './pipes/in-term.pipe';
import { OutOfTermPipe } from './pipes/out-of-term.pipe';
import { AvailablePipe } from './pipes/available.pipe';
import { ShowRequestComponent } from './show-request/show-request.component';


@NgModule({
  declarations: [
    ProductorComponent, 
    CreateRequestsComponent, 
    ShowRequestsComponent, 
    InTermPipe, OutOfTermPipe, AvailablePipe, ShowRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductorRoutingModule
  ],
  providers: [OutOfTermPipe],
})
export class ProductorModule { }
