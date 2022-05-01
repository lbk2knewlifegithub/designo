import { InjectionToken } from '@angular/core';
import { NotificationsService } from '../services';

export const NOTIFICATIONS_SERVICE = new InjectionToken<NotificationsService>(
  'Notifications Service'
);
