import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-requests',
  templateUrl: './create-requests.component.html',
  styleUrls: ['./create-requests.component.scss']
})
export class CreateRequestsComponent implements OnInit {


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void
  {
    this.form = this.fb.group({
      list: this.fb.array([])
    });

    this.controlList.push( this.newGroup );
    this.controlList.push( this.newGroup );
    this.controlList.push( this.newGroup );
  }

  get controlList(): FormArray
  {
    return this.form.get('list') as FormArray;
  }

  get newGroup(): FormGroup
  {
    return this.fb.group({
      packing: ['emp'],
      service: ['servi'],
      start: ['st'],
      end: ['end']
    })
  }



  ngOnInit(): void {
  }

}
