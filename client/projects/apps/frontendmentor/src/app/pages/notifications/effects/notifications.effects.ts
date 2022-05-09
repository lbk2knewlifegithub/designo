import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { NotificationsActions, NotificationsAPIActions } from '../actions';
import { NotificationsService } from '../services';
import { NOTIFICATIONS_SERVICE } from '../tokens';

@Injectable({ providedIn: 'root' })
export class NotificationsEffects {
  /**
   * - Load Notifications
   */
  loadNotifications$ = createEffect(() =>
    this._actions$.pipe(
      ofType(NotificationsActions.loadNotifications),
      exhaustMap(() =>
        this._notificationsService.getNotifications().pipe(
          /**
           * - Load Notifications Success
           */
          map((notifications) =>
            NotificationsAPIActions.loadNotificationsSuccess({ notifications })
          ),
          /**
           * - Load Notifications Failure
           */
          catchError((error) =>
            of(NotificationsAPIActions.loadNotificationsFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly _notificationsService: NotificationsService
  ) {}
}
