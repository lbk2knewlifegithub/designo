import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { FamesActions, FamesAPIActions } from '../actions';
import { FAMES_SERVICE } from '../tokens';
import { FamesService } from '../services/fames.service';

@Injectable({ providedIn: 'root' })
export class FamesEffects {
  /**
   * - Load Fames Of Week
   */
  loadFamesOfWeek$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FamesActions.loadFamesOfWeek),
      exhaustMap(() =>
        this._famesService.getFames('week').pipe(
          /**
           * - Load Fames Of Week Success
           */
          map((fames) => FamesAPIActions.loadFamesOfWeekSuccess({ fames })),
          /**
           * - Load Fames Of Week Failure
           */
          catchError((error) =>
            of(FamesAPIActions.loadFamesOfWeekFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Load Fames Of Month
   */
  loadFamesOfMonth$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FamesActions.loadFamesOfMonth),
      exhaustMap(() =>
        this._famesService.getFames('month').pipe(
          /**
           * - Load Fames Of Month Success
           */
          map((fames) => FamesAPIActions.loadFamesOfMonthSuccess({ fames })),
          /**
           * - Load Fames Of Month Failure
           */
          catchError((error) =>
            of(FamesAPIActions.loadFamesOfMonthFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Load Fames Of Year
   */
  loadFamesOfYear$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FamesActions.loadFamesOfYear),
      exhaustMap(() =>
        this._famesService.getFames('year').pipe(
          /**
           * - Load Fames Of Year Success
           */
          map((fames) => FamesAPIActions.loadFamesOfYearSuccess({ fames })),
          /**
           * - Load Fames Of Year Failure
           */
          catchError((error) =>
            of(FamesAPIActions.loadFamesOfYearFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Load Fames Of All Time
   */
  loadFamesOfAllTime$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FamesActions.loadFamesOfAllTime),
      exhaustMap(() =>
        this._famesService.getFames('all-time').pipe(
          /**
           * - Load Fames Of All Time Success
           */
          map((fames) => FamesAPIActions.loadFamesOfAllTimeSuccess({ fames })),
          /**
           * - Load Fames Of All Time Failure
           */
          catchError((error) =>
            of(FamesAPIActions.loadFamesOfAllTimeFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(FAMES_SERVICE)
    private readonly _famesService: FamesService
  ) {}
}
