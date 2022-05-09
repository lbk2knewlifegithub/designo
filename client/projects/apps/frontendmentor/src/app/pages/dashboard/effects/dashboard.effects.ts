import { Inject, Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { DashboardActions, DashboardAPIActions } from '../actions';
import { DashboardService } from '../services';
import { DASHBOARD_SERVICE } from '../tokens';

/**
 * - Dashboard Effects
 */
@Injectable({ providedIn: 'root' })
export class DashboardEffects {
  /**
   * - Load Dashboard
   */
  loadDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      exhaustMap(() =>
        this._dashboardService.getDashboard().pipe(
          /**
           * - Load Dashboard Success
           */
          map((dashboard) =>
            DashboardAPIActions.loadDashboardSuccess({ dashboard })
          ),

          tap(null, () =>
            this._dialogService.error({
              title: 'Dashboard Error',
              body: 'There was an error loading the dashboard',
            })
          ),
          /**
           * - Load Dashboard Failure
           */
          catchError(({ error }) =>
            of(DashboardAPIActions.loadDashboardFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Update Title
   */
  updateTitle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() =>
        this._store.select(getSelectors().selectRouteData)
      ),
      map(([, data]) => data['title']),
      map((title) => {
        return DashboardActions.setTitle({ title });
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(DASHBOARD_SERVICE)
    private readonly _dashboardService: DashboardService,
    private readonly _dialogService: DialogService,
    private readonly _store: Store
  ) {}
}
