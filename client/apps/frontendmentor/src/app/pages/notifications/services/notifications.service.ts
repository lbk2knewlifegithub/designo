import { Observable } from 'rxjs';
import { Notification } from '../models';

export interface NotificationsService {
  /**
   * - Get Notifications
   * @param time
   */
  getNotifications(): Observable<Notification[]>;
}
