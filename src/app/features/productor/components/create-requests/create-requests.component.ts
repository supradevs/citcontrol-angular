import { Component, ViewChild } from '@angular/core';
import { TimesService } from '../../services/times.service';
import { ProductorService } from '../../services/productor.service';
import { Packing, Service, ServiceRequest, ServiceConfig } from '../../models';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import * as moment from 'moment'
@Component({
  selector: 'app-create-requests',
  templateUrl: './create-requests.component.html',
  styleUrls: ['./create-requests.component.scss']
})
export class CreateRequestsComponent {

  @ViewChild('modal') modal:any

  packings: Packing[] = [];
  services: Service[] = [];
  serviceConfig = ServiceConfig;
  formList: any = [];

  constructor(
    private productorService: ProductorService,
    private spinner: SpinnerService,
    private timesService: TimesService
  ) {

    this.productorService
      .getPackings()
      .subscribe((packings: Packing[]) => this.packings = packings);

    this.productorService
      .getServices()
      .subscribe((services: Service[]) => this.services = services);

    this.onNewForm();
  }

  onNewForm(empaque_id: string = '', servicio_id: string = '',extraordinaria: number = 0, fecha_inicio: Date | string = '', fecha_fin: Date | string = '', valid: boolean = false): void 
  {
    this.formList.push({
      empaque_id,
      servicio_id,
      extraordinaria,
      fecha_inicio,
      fecha_fin,
      valid
    });
  }

  onCopyForm( index:number ): void 
  {
    let { 
      empaque_id,
      servicio_id,
      extraordinaria,
      fecha_inicio,
      fecha_fin,
      valid
    } = this.formList[index];

    fecha_inicio =  moment(fecha_inicio).add(1, 'days').toDate();
    fecha_fin = moment(fecha_fin).add(1,'days').toDate();

    if(fecha_inicio < this.timesService.lastSunday() )
    {
      this.onNewForm( 
        empaque_id,
        servicio_id,
        extraordinaria,
        fecha_inicio,
        fecha_fin,
        valid
      )
    }
    else{
      alert('Limite alcanzado');
    }
  }

  onDeleteForm( index:number ): void 
  {
    if(this.formList.length > 1)
    {
      this.formList.splice(index, 1);
    }
  }

   onSetForm(form:any, index: number): void 
   {
      const {
        empaque_id,
        extraordinaria,
        fecha_fin,
        fecha_inicio,
        servicio_id,
        valid,
      } = form;

     this.formList[index].empaque_id = empaque_id;
     this.formList[index].extraordinaria = extraordinaria;
     this.formList[index].fecha_fin = fecha_fin ;
     this.formList[index].fecha_inicio = fecha_inicio ;
     this.formList[index].servicio_id = servicio_id ;
     this.formList[index].valid = valid ;
   }


  onSubmit()
  {
    this.spinner.show();
    this.productorService.createRequests(this.mapForms())
        .subscribe(
          () => {
            this.modal.open();
            this.resetList();
          },
          () => console.log(),
          () => this.spinner.hide()
    );
  }

  get isValid(): boolean 
  {
    return this.formList.filter((form:any) => form.valid == false).length === 0;
  }

  mapForms(): ServiceRequest[]
  {
    return this.formList.map((controls:any) => ServiceRequest.create(controls));
  }

  resetList(): void 
  {
      this.formList.length = 0;
      this.onNewForm();
  }

}
