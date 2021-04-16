import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { LoadSpinnerService } from 'src/app/shared/services/load-spinner.service';
import { PackingsStates, Provinces } from '../../../../../shared/models';
import { PackingsService } from '../../../services/packings.service';
import { Packing } from '../../../models'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public provinces = [
    {
      province: `${Provinces[0].province}/${Provinces[1].province}`,
      value: `[${Provinces[0].id},${Provinces[1].id}]`
    },
    {
      province: Provinces[2].province,
      value: `[${Provinces[2].id}]`
    },
  ];

  public packingsStates = PackingsStates;

  public packings: Packing[] = [];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private packingsService: PackingsService,
    private spinner: LoadSpinnerService
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.getPackings();
    this.onChange();
  }

  private initForm(): void
  {
    this.form = this.fb.group({
      search: [''],
      provinces: [this.provinces[0].value],
      state:[this.packingsStates[0].id]
    });
  }

  onChange()
  {
    this.form.get('search').valueChanges.pipe(debounceTime(800)).subscribe(() => this.getPackings());

    this.form.get('provinces').valueChanges.pipe(debounceTime(100))
        .subscribe(() => {
          this.packings = [];
          this.getPackings();
        });

    this.form.get('state').valueChanges.pipe(debounceTime(100))
        .subscribe(() => {
          this.packings = [];
          this.getPackings();
        });
  }

  getPackings(): void 
  {
    const { search, provinces, state } = this.form.value;
    this.spinner.show();
    this.packingsService.getPackings(search, provinces, state)
    .subscribe((packings:any) => {
      this.packings = packings;
      this.spinner.hide();
      console.log(packings)
    });
  }
  

}
