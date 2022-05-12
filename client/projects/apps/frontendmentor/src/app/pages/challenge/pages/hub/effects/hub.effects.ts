import { HubService } from './../services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HubAPIActions, HubActions } from '../actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HubEffects {
  /**
   * - Load Solutions For Challenge
   */
  loadSolutionsForChallenge$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HubActions.loadSolutionsForChallange),
      exhaustMap(({ id }) => {
        return this._hubService.loadSolutionsForChallange(id).pipe(
          /**
           * - Load Solutions For Success
           */
          map((solutions) =>
            HubAPIActions.loadSolutionsForChallangeSuccess({ solutions })
          ),

          /**
           * - Load Solutions For Failure
           */
          catchError(({ error }) =>
            of(HubAPIActions.loadSolutionsForChallangeFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * - Create Solution
   */
  createSolution$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HubActions.createSolution),
      exhaustMap(({ challengeID, dto }) => {
        return this._hubService.createSolution(challengeID, dto).pipe(
          /**
           * - Create Solution Success
           */
          map(() => HubAPIActions.createSolutionSuccess({ id: 'lemon', dto })),

          /**
           * - Create Solution Failure
           */
          catchError(({ error }) =>
            of(HubAPIActions.createSolutionFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _hubService: HubService
  ) {}
}
