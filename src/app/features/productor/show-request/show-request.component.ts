import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadSpinnerService } from 'src/app/shared/services/load-spinner.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';


import { Request } from '../models';
@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss']
})
export class ShowRequestComponent implements OnInit {

  public request: Request;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private spinner: LoadSpinnerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getRequest(params['id']));
  }

  getRequest(id: number | string): void 
  {
    this.spinner.show();
    this.notificationService.updateNotification(id).subscribe((request:Request) => {
      this.request = request;
      this.spinner.hide();
    });
  }

  get accepted(): boolean
  {
    return this.request.fecha_cancelacion && this.request.estado == 'cancelada fuera de termino';
  }

}
