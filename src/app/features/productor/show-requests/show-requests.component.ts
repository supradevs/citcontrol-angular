import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

import { ServiceConfig } from './../models/service-config.enum';
import { DatesValidator } from './../../../shared/validators/DatesValidator';
import { Packing, Request, Reprogramming } from './../models';
import { TimesService } from './../services/times.service';
import { ProductorService } from './../services/productor.service';
import { LoadSpinnerService } from './../../../shared/services/load-spinner.service';
import { HoursHelperService } from './../../../shared/helpers/hours-helper.service';
import { OutOfTermPipe } from '../pipes/out-of-term.pipe';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.scss']
})
export class ShowRequestsComponent implements OnInit {

  public form: FormGroup;
  public formCancel: FormGroup;
  public formReprogramming: FormGroup;
  public packings: Observable<any>;
  public requests: Request[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number;
  public totalItems: number;
  public modalInTerm: boolean = false;
  public modalReprogramming: boolean = false;
  public request: Request;
  public index: number;
  public minHour: string;
  serviceConfig = ServiceConfig;


  constructor(
    private fb: FormBuilder, 
    public productorService: ProductorService,
    private spinner: LoadSpinnerService,
    private times: TimesService,
    private hoursHelper: HoursHelperService,
    private outOfTerm: OutOfTermPipe
    ) { 
      this.minHour = this.times.minHour();
    }

  ngOnInit(): void {
    this.getPackings();
    this.initForm();
    this.onChange();
  }

  getPackings(): void 
  {
    this.packings = this.productorService.getPackings().pipe(
      tap((packings:Packing[]) => this.setDefaultPacking(packings))
    );
  }

  setDefaultPacking(packings: Packing[]): void
  {
     if(packings.length > 0)
     {
       this.form.patchValue({packingId: packings[0].id})
     }
  }

  initForm(): void
  {
    this.form = this.fb.group({
      search: [''],
      packingId: ['']
    });

    this.formCancel = this.fb.group({
      text: ['Fuerza mayor'],
    });

    this.formReprogramming = this.fb.group({
      fecha_inicio: [this.minHour, [Validators.required, DatesValidator.min(this.minHour)]],
      fecha_fin: ['', Validators.required]
    },
    {
      validator: this.times.checkTimeRangeIsValid('fecha_inicio', 'fecha_fin')
    });

  }

  getRequests(): void 
  {
    const { packingId, search } = this.form.value;
   
    this.spinner.show();

    this.productorService.getRequests(packingId, search, this.currentPage)
    .subscribe((data:any) => {

      this.requests = data.data;

      const {
        current_page,
        per_page,
        total
      } = data.meta;
          
      this.currentPage = current_page;
      this.itemsPerPage = per_page;
      this.totalItems = total;
      this.spinner.hide();
    });
  }

  onChange()
  {
    this.form.get('search').valueChanges.pipe(debounceTime(800))
        .subscribe(() => this.getRequests());

    this.form.get('packingId').valueChanges.pipe(debounceTime(100))
        .subscribe(() => {
          this.requests = [];
          this.getRequests();
        });
  }

  getPage(page: number): void 
  {
    this.getRequests();
  }

  onModalReprogramming(request:Request, index: number): void
  {
    this.request = request;
    this.modalReprogramming = !this.modalReprogramming;
    this.index = index;
  }

  onModalCancel(request:Request, index: number): void 
  {
    this.request = request;
    this.modalInTerm = !this.modalInTerm;
    this.index = index;
  }

  onCancelRequest(event: any): void {

    const date = this.request.fecha_inicio;
    const outOfTerm = this.outOfTerm.transform(date);
    const text = outOfTerm ? this.formCancel.value.text : '';
    this.spinner.show();
    this.productorService.cancelRequest(this.request.id, text).subscribe((data:any) => {
      this.requests[this.index] = data.data;
      this.spinner.hide();
    });
  }

  onReprogrammingRequest(event: any): void {
    const values = this.formReprogramming.value;
    this.spinner.show();
    this.productorService
        .reprogrammingRequest(this.request.id, Reprogramming.create(values))
        .subscribe((data:any) => {
          this.formReprogramming.reset({fecha_inicio: this.minHour});
          this.requests[this.index] = data.data;
          this.spinner.hide();
        });
  }

  isInvalid(controlName: string, error: string): boolean
  {
    const control = this.formReprogramming.controls[controlName];
    return control.invalid && control.dirty && control.hasError(error);
  }

  setDate(event: any, controlName: string)
  {
    if(event.target.value)
    {
      const hourOclock = this.hoursHelper.setOclock(event.target.value).format('YYYY-MM-DDTHH:mm');
      event.target.value = hourOclock;
      this.formReprogramming.controls[controlName].setValue(hourOclock);
    }

  }
}
