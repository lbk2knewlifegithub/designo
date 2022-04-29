import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Notification } from '../models';
import { NotificationsActions, NotificationsAPIActions } from '../actions';

export const notificationsFeatureKey = 'notifications';

export interface State extends EntityState<Notification> {
  loaded?: boolean;
  loading?: boolean;
  error?: string;
}

export const adapter: EntityAdapter<Notification> =
  createEntityAdapter<Notification>({
    selectId: (notification: Notification) => notification.notification_id,
    sortComparer: (f1, f2) =>
      new Date(f1.createdAt).getTime() - new Date(f2.createdAt).getTime(),
  });

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Notifications
   */
  on(NotificationsActions.loadNotifications, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: undefined,
  })),

  /**
   * - Load Notifications Of All Time Success
   */
  on(
    NotificationsAPIActions.loadNotificationsSuccess,
    (state, { notifications }) =>
      adapter.addMany(notifications, {
        ...state,
        loaded: true,
        loading: false,
        error: undefined,
      })
  ),
  /**
   * - Load Notifications Failure
   */
  on(NotificationsAPIActions.loadNotificationsFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error,
  }))
);

// Gets
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
