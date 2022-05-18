import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SOLUTIONS_SERVICE } from '../../shared';
import { SolutionsActions, SolutionsAPIActions } from '../actions';
import { SolutionsService } from '../services';

/**
 * - Solutions Effects
 */
@Injectable({ providedIn: 'root' })
export class SolutionsEffects {
  /**
   * - Load Solutions
   */
  loadSolutions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SolutionsActions.loadSolutions),
      exhaustMap(() => {
        return this._solutionsService.getSolutions().pipe(
          /**
           * - Load Solutions Success
           */
          map((solutions) =>
            SolutionsAPIActions.loadSolutionsSuccess({ solutions })
          ),

          /**
           * - Load Solutions Failure
           */
          catchError(({ error: { error } }) => {
            return of(SolutionsAPIActions.loadSolutionsFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(SOLUTIONS_SERVICE)
    private readonly _solutionsService: SolutionsService
  ) {}
}
