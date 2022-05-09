import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models';
import { NotificationsService } from './notifications.service';

@Injectable({ providedIn: 'root' })
export class NotificationsImplService implements NotificationsService {
  constructor(private readonly _http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    throw new Error('Method not implemented.');
  }
}
