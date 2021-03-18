import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

import { Notification } from '../../models';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {

    this.notificationsService.getNotifications().subscribe(
      (notifications:any) => this.notifications = notifications
    )

  }

}
