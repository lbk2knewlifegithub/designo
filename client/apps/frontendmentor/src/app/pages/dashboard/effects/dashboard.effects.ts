import { Inject, Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

  constructor(
    private readonly _actions$: Actions,
    @Inject(DASHBOARD_SERVICE)
    private readonly _dashboardService: DashboardService,
    private readonly _dialogService: DialogService
  ) {}
}
