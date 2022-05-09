import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { NotificationsActions } from '../actions';
import { Notification } from '../models';
import * as fromNotifications from '../selectors/notifications.selectors';

/**
 * - Nofitications Facade
 */
@Injectable({ providedIn: 'root' })
export class NotificationsFacade {
  notifications$: Observable<Notification[]> = this._store.select(
    fromNotifications.selectAllNotifications
  );

  loading$: Observable<boolean | undefined> = this._store.select(
    fromNotifications.selectLoading
  );
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromNotifications.selectLoaded
  );

  error$: Observable<string | undefined> = this._store.select(
    fromNotifications.selectError
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Load Notifications
   */
  loadNotifications() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded &&
          this._store.dispatch(NotificationsActions.loadNotifications())
      );
  }
}
