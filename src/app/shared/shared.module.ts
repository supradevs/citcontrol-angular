import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PlannerCalendarComponent } from './components/planner-calendar/planner-calendar.component';
import { LightModalComponent } from './components/light-modal/light-modal.component'

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    PlannerCalendarComponent,
    LightModalComponent
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    PlannerCalendarComponent,
    LightModalComponent
  ]
})
export class SharedModule { }
