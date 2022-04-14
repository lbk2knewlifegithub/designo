import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginAPIActions, LoginPageActions } from './actions';

@Injectable({ providedIn: 'root' })
export class LoginEffects {
  /**
   * - Auto clear error after 4 seconds
   */
  autoClearError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginAPIActions.loginFailure),
      switchMap(() => of(LoginPageActions.clearError()).pipe(delay(4_000)))
    )
  );

  constructor(private readonly _actions$: Actions) {}
}
