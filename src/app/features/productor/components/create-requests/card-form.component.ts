import { ServiceConfig } from './../../models/service-config.enum';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TimesService } from './../../services/times.service';
import { Packing, Service, ServiceRequest, ServiceConfig } from '../../models';
import * as moment from 'moment'


@Component({
  selector: 'app-card-form',
  template: `
  <form [formGroup]="form" class="card" style="border: 1px dashed #282828;">
      <div class="card-header text-danger d-flex justify-content-between">
        <div>
          <h4 *ngIf="isStart" class="text-dark">
            La solicitud inicia el 
            {{ getControl('fecha_inicio') | date:'EEEE' }} 
            {{ getControl('fecha_inicio') | date:'d' }} a 
            {{ getControl('fecha_inicio') | date:'HH' }}hs
          </h4>
        </div>
        <div>
          <button [disabled]="form.invalid" (click)="copy.emit()" type="button" class="btn btn-sm btn-success mr-2">Copiar</button>
          <button (click)="delete.emit()" type="button" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </div>
      <div class="card-body">
          <div class="row">
            <div class="col-xs-12 col-6">
              <div class="form-group">
                <label>Empaques</label>
                <select [ngClass]="{'is-invalid': isInvalid('empaque_id')}" formControlName="empaque_id" class="form-control mb-2 mr-sm-2">
                  <option value="">Seleccionar</option>
                  <option *ngFor="let packing of packings" [value]="packing.id">{{ packing.empaque }}</option>
                </select>
                <div class="invalid-feedback">
                  Seleccione un empaque.
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-6">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Servicios</label>
                <select [ngClass]="{'is-invalid': isInvalid('servicio_id')}" formControlName="servicio_id" class="form-control mb-2 mr-sm-2">
                    <option value="">Seleccionar</option>
                    <option *ngFor="let service of services" [value]="service.id">{{ service.servicio }}</option>
                  </select>
                <div class="invalid-feedback">
                  Seleccione un servicio
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-6">
              <div class="form-group">
                <label for="exampleFormControlInput1">Fecha de inicio</label>
                <input 
                  [owlDateTimeTrigger]="fi" 
                  [owlDateTime]="fi" 
                  [min]="min" 
                  [max]="max"
                  [ngClass]="{'is-invalid': isInvalid('fecha_inicio')}"
                  formControlName="fecha_inicio"
                  type="text" 
                  class="form-control is-invalid bg-white"
                  placeholder="Seleccionar"
                  readonly 
                >
                <div class="invalid-feedback">
                  Seleccione la fecha de inicio del servicio.
                </div>
                <owl-date-time 
                  (afterPickerClosed)="onPickerClosed('fecha_inicio')"
                  [firstDayOfWeek]="1" 
                  [stepMinute]="60" 
                  #fi
                ></owl-date-time>
              </div>
            </div>
            <div class="col-xs-12 col-6">
              <div class="form-group">
                <label for="">Fecha de fin</label>
                <input 
                  [owlDateTimeTrigger]="ff" 
                  [owlDateTime]="ff" 
                  [min]="min" 
                  [max]="max"
                  [ngClass]="{'is-invalid': isInvalid('fecha_fin')}"
                  formControlName="fecha_fin"
                  type="text" 
                  class="form-control is-invalid bg-white"
                  placeholder="Seleccionar"
                  readonly 
                >              
              </div>
              <div class="invalid-feedback">
                Seleccione la fecha de fin del servicio.
              </div>
              <owl-date-time 
                (afterPickerClosed)="onPickerClosed('fecha_fin')"
                [firstDayOfWeek]="1" 
                [stepMinute]="60" 
                #ff
              ></owl-date-time>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div  *ngIf="hasError" class="alert alert-danger" role="alert">
                Las fechas seleccionadas son invalidas. 
                El rango máximo por servicio es de {{ ServiceConfig.MAXIMUN_RANGE }} horas.
              </div>
              <div *ngIf="requestInCurrentWeek" class="alert alert-warning" role="alert">
                La fecha de la solicitud corresponde a la semana actual.
                Estos pedidos estan sujetos a disponibilidad.
              </div>
              <div *ngIf="requestOutOfTerm" class="alert alert-warning" role="alert">
                La solicitud será pedida fuera de termino.
                Estos pedidos estan sujetos a disponibilidad.
              </div>
            </div>
          </div>

      </div>
  </form>
  `,
  styles: [
  ]
})
export class CardFormComponent implements OnInit {

  @Output() values = new EventEmitter();
  @Output() copy = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() packings: Packing[] = [];
  @Input() services: Service[] = [];
  @Input() packing:string = '';
  @Input() service:string = '';
  @Input() start: Date | string = '';
  @Input() end: Date | string = '';
  @Input() isExtraordinary: number = 0;

  public min = new Date();
  public max = new Date();
  public ServiceConfig = ServiceConfig;

  form;

  constructor(
    private fb: FormBuilder, 
    private timesService: TimesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setMinMax();
    this.detectChanges();
  }

  initForm(): void
  {

    this.form = this.fb.group({
      empaque_id: [this.packing, Validators.required],
      servicio_id: [this.service, Validators.required],
      fecha_inicio: [this.start, Validators.required],
      fecha_fin: [this.end, Validators.required],
      extraordinaria: [this.isExtraordinary, Validators.required]
    },
    {
      validator: this.timesService.checkTimeRangeIsValid('fecha_inicio', 'fecha_fin')
    });
  }

  getControl(control: string): string | Date
  {
    return this.form.get(control).value;
  }

  get isStart(): boolean
  {
    const value = this.getControl('fecha_inicio');
    return value != '' && value != null && value != 'Invalid Date';
  }

  get isEnd(): boolean
  {
    const value = this.getControl('fecha_fin');
    return value != '' && value != null && value != 'Invalid Date';
  }

  get extraordinary(): FormControl 
  {
    return this.form.get('extraordinaria');
  }

  private setMinMax(): void 
  {
    const {min, max} = this.timesService.getMinMaxDateAvailable();
    this.min = new Date(min);
    this.max = new Date(max);
  }

  onPickerClosed(controlName: string): void
  {
    const formControl = this.form.get(controlName);
    const date = formControl.value;
    const dateOclock = this.timesService.setOclock(date);
    this.setExtraordinary();
    formControl.patchValue(new Date(dateOclock));
  }

  isInvalid(controlName: string): boolean
  {
    const control = this.form.get(controlName);
    return control.invalid && control.touched;
  }

  get hasError(): boolean
  {
    const control = this.form.get('fecha_fin');
    return control.hasError('invalidDates') && control.touched && this.isEnd;
  }

  get requestInCurrentWeek(): boolean
  {
    if(this.isStart && this.isEnd && !this.hasError)
      return this.timesService.isInCurrentweek(this.getControl('fecha_inicio'));
    else
      return false;
  }

  private setExtraordinary(): void
  {
    if(this.requestInCurrentWeek || this.requestOutOfTerm)
      this.extraordinary.patchValue(1);
    else
      this.extraordinary.patchValue(0);
  }

  get requestOutOfTerm(): boolean 
  {
    if(this.isStart && this.isEnd && !this.hasError)
      return this.timesService.isInWeekend() && this.timesService.isInNextWeek(this.getControl('fecha_inicio'));
    else
      return false;
  }

  detectChanges(): void 
  {
    const controls = <FormArray>this.form.controls;
    
    const controlNames = Object.keys(controls);

    controlNames.forEach((controlName:string) => {
      this.form.get(controlName).valueChanges.subscribe(() => {
        setTimeout(() => this.values.emit(this.getValues()),100)
      })
    });
  }

  getValues(): object
  {
    return {...this.form.value, valid: this.form.valid};
  }

}
