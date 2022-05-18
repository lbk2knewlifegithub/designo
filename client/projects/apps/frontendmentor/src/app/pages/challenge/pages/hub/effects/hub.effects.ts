import { Injectable } from '@angular/core';
import { Solution } from '@lbk/fm/shared';
import { User } from '@lbk/models';
import { UserFacade } from '@lbk/user';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HubActions, HubAPIActions } from '../actions';
import { HubService } from './../services';

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
      concatLatestFrom(() => this._userFacade.user$),
      exhaustMap(([{ challengeID, dto }, user]) => {
        return this._hubService.createSolution(challengeID, dto).pipe(
          /**
           * - Create Solution Success
           */
          map(({ solutionID, screenshot, report }) => {
            user = user as User;

            const newSolution: Solution = {
              ...dto,
              id: solutionID,
              challengeID,
              difficulty: 'newbie',
              languages: [],
              likes: 0,
              comments: 0,
              bookmarks: 0,
              user: {
                id: user.id,
                name: user.name,
                username: user.username,
                avatar: user.avatar,
                avatarGithub: user.avatarGithub,
                points: user.points,
              },
              screenshot,
              createdAt: new Date().toUTCString(),
              report: {
                a11y: 0,
                htmlValidator: 0,
              },
            };

            return HubAPIActions.createSolutionSuccess({
              solution: newSolution,
            });
          }),

          tap(
            () => {
              this._ds.success('Solution created successfully');
            },
            ({ error: { error } }) => {
              console.log(error);

              this._ds.error({
                title: 'Submission Solution Failure',
                body: error,
              });
            }
          ),

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

  /**
   * - Update Solution
   */
  updateSolution$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HubActions.updateSolution),
      exhaustMap(({ solutionID, dto }) => {
        return this._hubService.updateSolution(solutionID, dto).pipe(
          /**
           * - Update Solution Success
           */
          map((screenshot) =>
            HubAPIActions.updateSolutionSuccess({
              id: solutionID,
              screenshot,
              dto,
            })
          ),

          /**
           * - Update Solution Failure
           */
          catchError(({ error }) =>
            of(HubAPIActions.updateSolutionFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * - Delete Solution
   */
  deleteSolution$ = createEffect(() =>
    this._actions$.pipe(
      ofType(HubActions.deleteSolution),
      exhaustMap(({ id }) => {
        return this._hubService.deleteSolution(id).pipe(
          /**
           * - Delete Solution Success
           */
          map(() => HubAPIActions.deleteSolutionSuccess({ id })),

          tap(
            () => {
              this._ds.success('Delete solution success');
            },
            ({ error: { error } }) => {
              console.log(error);

              this._ds.error({
                title: 'Delete solution failure',
                body: error,
              });
            }
          ),

          /**
           * - Delete Solution Failure
           */
          catchError(({ error }) =>
            of(HubAPIActions.deleteSolutionFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _hubService: HubService,
    private readonly _userFacade: UserFacade,
    private readonly _ds: DialogService
  ) {}
}
