import { createAction, props } from '@ngrx/store';
import { Notification } from '../models';

/**
 * - Load Notifications Success
 */
export const loadNotificationsSuccess = createAction(
  '[Notifications/API] Load Notitifications Success',
  props<{ notifications: Notification[] }>()
);

/**
 * - Load Notifications Failure
 */
export const loadNotificationsFailure = createAction(
  '[Notifications/API] Load Notifications Failure',
  props<{ error: string }>()
);
