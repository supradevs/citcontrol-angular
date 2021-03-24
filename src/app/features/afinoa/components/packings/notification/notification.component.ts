import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Request } from 'src/app/features/productor/models';
import { LoadSpinnerService } from 'src/app/shared/services/load-spinner.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public request: Request;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private spinner: LoadSpinnerService,
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
