import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductorRoutingModule } from './productor-routing.module';
import { ProductorComponent } from './productor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRequestsComponent } from './components/create-requests/create-requests.component';
import { ShowRequestsComponent } from './components/show-requests/show-requests.component';
import { ShowRequestComponent } from './components/show-request/show-request.component';
import { InTermPipe } from './pipes/in-term.pipe';
import { OutOfTermPipe } from './pipes/out-of-term.pipe';
import { AvailablePipe } from './pipes/available.pipe';

@NgModule({
  declarations: [
    ProductorComponent, 
    CreateRequestsComponent, 
    ShowRequestsComponent, 
    InTermPipe, 
    OutOfTermPipe, 
    AvailablePipe, 
    ShowRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductorRoutingModule
  ],
  providers: [OutOfTermPipe],
})
export class ProductorModule { }
