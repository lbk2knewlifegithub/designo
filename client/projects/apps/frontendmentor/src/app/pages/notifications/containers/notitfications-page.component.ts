import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsFacade } from './../facades/notifications.facade';
import { Notification } from '../models';

@Component({
  selector: 'lbk-notifications-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./notitifications-page.component.html`,
})
export class NotificationsPageComponent implements OnInit {
  notifications$!: Observable<Notification[]>;
  loading$!: Observable<boolean | undefined>;
  error$!: Observable<string | undefined>;

  constructor(private readonly _notificationsFacade: NotificationsFacade) {}

  ngOnInit(): void {
    this.notifications$ = this._notificationsFacade.notifications$;
    this.loading$ = this._notificationsFacade.loading$;
    this.error$ = this._notificationsFacade.error$;

    this._notificationsFacade.loadNotifications();
  }
}
