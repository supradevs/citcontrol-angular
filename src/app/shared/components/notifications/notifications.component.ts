import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NavigationStart, Router } from '@angular/router';

import { Notification } from '../../models';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification[] = [];


  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    private authService: AuthService
  ) { 
    this.router.events
    .pipe(filter(event => event instanceof NavigationStart))
    .subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.notifications = [];
    this.notificationsService.getNotifications().subscribe(
      (notifications:any) => this.notifications = notifications
    )
  }

  redirect(id: number): void 
  {
    const user = this.authService.user();
    this.router.navigateByUrl(this.url(user.role, id));
  }

  private url(role: string, id: number): string
  {
     switch(role.toLocaleLowerCase())
     {
       case 'productor': return `productor/solicitud/${id}`;
       case 'afinoa': return `afinoa/inspeccion/solicitud/${id}`;
     }
  }
}
