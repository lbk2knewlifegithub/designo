import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CHALLENGES_SERVICE } from '../../shared';
import { ChallengesActions, ChallengesAPIActions } from '../actions';
import { ChallengesService } from '../services';

@Injectable({ providedIn: 'root' })
export class ChallengesEffects {
  /**
   * - Load Challenges
   */
  loadChallenges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChallengesActions.loadChallenges),
      exhaustMap(() => {
        return this._challengesService.getAllChallenges().pipe(
          /**
           * - Load Challenges Success
           */
          map((challenges) =>
            ChallengesAPIActions.loadChallengesSuccess({ challenges })
          ),

          /**
           * - Load Challenges Failure
           */
          catchError((error) => {
            return of(ChallengesAPIActions.loadChallengesFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(CHALLENGES_SERVICE)
    private readonly _challengesService: ChallengesService
  ) {}
}
