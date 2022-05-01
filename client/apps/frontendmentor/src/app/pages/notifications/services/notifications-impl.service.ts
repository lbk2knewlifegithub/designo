import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Notification } from '../models';
import { NotificationsService } from './notifications.service';

@Injectable({ providedIn: 'root' })
export class NotificationsFakeService implements NotificationsService {
  constructor(private readonly _http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this._http
      .get<Notification[]>(`assets/data/notifications.json`)
      .pipe(shareReplay(1));
  }
}
