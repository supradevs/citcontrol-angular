import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  @ViewChild('modal') modal: any;

  public form: FormGroup;
  public formCancel: FormGroup;
  public formReprogramming: FormGroup;
  public requests: any[] = [
    {
      id: 1,
      fecha_inicio: '1',
      fecha_fin: '1',
      fecha_cancelacion: '1',
      motivo_cancelacion: '1',
      aceptacion: '1',
      reprogramada: '1',
      created_at: '1',
      servicio: '1',
      estado: '1',
    }
  ];
  public currentPage: number = 1;
  public itemsPerPage: number;
  public totalItems: number;


  constructor(
    private fb: FormBuilder, 
    private spinner: SpinnerService
    ) {}

  ngOnInit(): void {
  }

  accepted(a:any){}

  getPage(page: number): void 
  {
    //this.getRequests();
  }

  openModal(requestId: number): void
  {
    console.log(requestId)
    this.modal.open();
  }

  confirmCancel(confirm: boolean): void
  {
    console.log(confirm)
  }
}
