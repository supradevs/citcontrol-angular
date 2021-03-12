import { LoadSpinnerService } from './../../../shared/services/load-spinner.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { DatesValidator } from './../../../shared/validators/DatesValidator';
import { TimesService } from './../services/times.service';
import { ProductorService } from './../services/productor.service';
import { Packing, Service, ServiceRequest, ServiceConfig } from '../models';
import { HoursHelperService } from './../../../shared/helpers/hours-helper.service';

@Component({
  selector: 'app-create-requests',
  templateUrl: './create-requests.component.html',
  styleUrls: ['./create-requests.component.scss']
})
export class CreateRequestsComponent {

  form: FormGroup;
  packings: Packing[] = [];
  services: Service[] = [];
  serviceConfig = ServiceConfig;
  success: boolean = false;
  minHour: string;

  constructor(
    private fb: FormBuilder, 
    private productorService: ProductorService,
    private hoursHelper: HoursHelperService,
    private spinner: LoadSpinnerService,
    private times: TimesService
  ) {

    this.minHour = this.times.minHour();

    this.productorService
      .getPackings()
      .subscribe((packings: Packing[]) => this.packings = packings);

    this.productorService
      .getServices()
      .subscribe((services: Service[]) => this.services = services);

    this.initForm();

  }

  initForm(): void
  {
    this.form = this.fb.group({
      list: this.fb.array([])
    });
    this.controlList.push( this.newGroup );
  }

  get controlList(): FormArray
  {
    return this.form.get('list') as FormArray;
  }

  get newGroup(): FormGroup
  {
    return this.fb.group({
        empaque_id: ['', Validators.required],
        servicio_id: ['', Validators.required],
        fecha_inicio: [this.minHour, [Validators.required, DatesValidator.min(this.minHour)]],
        fecha_fin: ['', [Validators.required]]
      },
      {
        validator: this.times.checkTimeRangeIsValid('fecha_inicio', 'fecha_fin')
      })
  }

  onCreateRequest(): void 
  {
    this.controlList.push( this.newGroup );
  }

  onDeleteRequest( index:number ): void 
  {
    if(this.controlList.length > 1)
    {
      this.controlList.removeAt( index );
    }
  }

  get minLengthControl(): boolean 
  {
    return this.controlList.length > 1;
  }

  setDate(event: any, index: number, controlName: string)
  {
    if(event.target.value)
    {
      const hourOclock = this.hoursHelper.setOclock(event.target.value).format('YYYY-MM-DDTHH:mm');
      const controlsRow = this.controlList.at(index);
      event.target.value = hourOclock;
      controlsRow['controls'][controlName].setValue(hourOclock);
    }

  }

  getControl(index: number, controlName: string)
  {
    return this.controlList.controls[index]['controls'][controlName];
  }

  isInvalid(index: number, controlName: string): boolean
  {
    const control = this.controlList.controls[index]['controls'][controlName];
    return control.invalid && control.dirty;
  }

  markAsInvalidControls(): void 
  {
    this.controlList.controls.forEach((item: any) => {
      Object.values(item.controls).forEach((control:FormControl) => {
        control.markAsDirty()
      })
    });
  }

  onSubmit()
  {
    this.markAsInvalidControls();
    if(this.form.valid)
    {
      this.spinner.show();
      this.productorService.createRequests(this.mapForm())
          .subscribe(
            () => {
              this.spinner.hide()
              this.success = true;
              this.form.reset();
            },
            (error) => console.log(error)
          );
    }
  }

  onAccept(): void
  {
    this.success = false;
  }

  mapForm(): ServiceRequest[]
  {
    return this.form.value.list.map((controls:any) => ServiceRequest.create(controls))
  }


}
