import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as components from './components/index'


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ...components.components
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule { }
