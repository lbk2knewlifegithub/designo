import { Injectable } from '@angular/core';
import { AuthService } from '@lbk/state/auth';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { delay, exhaustMap, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RouteFacade } from './../../../shared';
import { LoginAPIActions, LoginPageActions } from './actions';

@Injectable({ providedIn: 'root' })
export class LoginEffects {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginPageActions.login),
      concatLatestFrom(() => this._routeFacade.returnUrl$),
      exhaustMap(([{ credentials }, returnUrl]) =>
        this._authService.login(credentials).pipe(
          map((token) => {
            const { accessToken } = token;
            window.location.href = `${returnUrl}#?accessToken=${accessToken}`;
            return LoginAPIActions.loginSuccess({ token });
          }),
          catchError(({ error }) => of(LoginAPIActions.loginFailure(error)))
        )
      )
    )
  );

  /**
   * - Auto clear error after 4 seconds
   */
  autoClearError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginAPIActions.loginFailure),
      switchMap(() => of(LoginPageActions.clearError()).pipe(delay(4_000)))
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _routeFacade: RouteFacade
  ) {}
}
