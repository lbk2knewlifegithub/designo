import { Injectable } from '@angular/core';
import { AuthService } from '@lbk/state/auth';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouteFacade } from '../../../shared';
import { SignUpAPIActions, SignUpPageActions } from './actions';

@Injectable({ providedIn: 'root' })
export class SignUpEffects {
  /**
   * - Sign Up
   */
  signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SignUpPageActions.signUp),
      concatLatestFrom(() => this._routeFacade.returnUrl$),
      exhaustMap(([{ createUserDTO }, returnUrl]) =>
        this._authService.signup(createUserDTO).pipe(
          map((token) => {
            const { accessToken } = token;
            if (returnUrl)
              window.location.href = `${returnUrl}#/?accessToken=${accessToken}`;
            return SignUpAPIActions.signUpSuccess({ token });
          }),
          catchError(({ error }) => of(SignUpAPIActions.signUpFailure(error)))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _routeFacade: RouteFacade
  ) {}
}
