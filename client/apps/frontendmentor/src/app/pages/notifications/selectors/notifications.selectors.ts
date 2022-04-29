import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNotifications from '../reducers/notifications.reducer';

/**
 * - Select Week Entities State
 */
export const selectNotificationsEntitiesState =
  createFeatureSelector<fromNotifications.State>(
    fromNotifications.notificationsFeatureKey
  );

export const {
  /**
   * - Select All Notifications
   */
  selectAll: selectAllNotifications,
} = fromNotifications.adapter.getSelectors(selectNotificationsEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectNotificationsEntitiesState,
  fromNotifications.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectNotificationsEntitiesState,
  fromNotifications.getLoading
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectNotificationsEntitiesState,
  fromNotifications.getError
);
