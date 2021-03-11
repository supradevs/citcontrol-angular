import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

import { Packing, Request } from './../models';
import { ProductorService } from './../services/productor.service';
import { LoadSpinnerService } from './../../../shared/services/load-spinner.service';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.scss']
})
export class ShowRequestsComponent implements OnInit {

  public form: FormGroup;
  public packings: Observable<any>;
  public requests: Request[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number;
  public totalItems: number;
  public modalInTerm: boolean = false;
  public request: Request;


  constructor(
    private fb: FormBuilder, 
    public productorService: ProductorService,
    private spinner: LoadSpinnerService
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

  onModalCancel(request:Request): void 
  {
    this.modalInTerm = !this.modalInTerm;
    this.request = request;
    console.log(request)
  }

  onCancelRequest(event): void {
    console.log(event)
  }
}
