import { Injectable } from '@angular/core';
import { AuthActions, AuthApiActions, UserService } from '@lbk/state/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * - Verify Email Effects
 */
@Injectable({ providedIn: 'root' })
export class VerifyEmailEffects {
  /**
   * -  Verify Email
   */
  verifyEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.verifyEmail),
      exhaustMap(({ token }) =>
        this._userService.verifyEmail(token).pipe(
          /**
           * -  Verify Email Success
           */
          map(() => AuthApiActions.verifyEmailSuccess()),
          /**
           * - Verify Email Failure
           */
          catchError(({ error }) =>
            of(AuthApiActions.verifyEmailFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService
  ) {}
}
