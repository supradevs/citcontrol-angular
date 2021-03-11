import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

import { Packing, Request } from './../models';
import { ProductorService } from './../services/productor.service';
import { LoadSpinnerService } from './../../../shared/services/load-spinner.service';
import { OutOfTermPipe } from '../pipes/out-of-term.pipe';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.scss']
})
export class ShowRequestsComponent implements OnInit {

  public form: FormGroup;
  public formCancel: FormGroup;
  public packings: Observable<any>;
  public requests: Request[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number;
  public totalItems: number;
  public modalInTerm: boolean = false;
  public request: Request;
  public index: number;


  constructor(
    private fb: FormBuilder, 
    public productorService: ProductorService,
    private spinner: LoadSpinnerService,
    private outOfTerm: OutOfTermPipe
    ) { }

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

  onModalCancel(request:Request, index: number): void 
  {
    this.modalInTerm = !this.modalInTerm;
    this.request = request;
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
}
