import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@lbk/services';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, tap } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { AuthActions, AuthApiActions } from './actions';
import { AuthFacade } from './auth.facade';
import { AuthService, UserService } from './services';

/**
 * - Feedback Effects
 */
@Injectable({ providedIn: 'root' })
export class AuthEffects {
  /**
   * - Login
   */
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this._authService.login(credentials).pipe(
          map((tokens) => AuthApiActions.loginSuccess({ tokens })),
          catchError(({ error }) => of(AuthApiActions.loginFailure(error)))
        )
      )
    )
  );

  /**
   * - Sign Up
   */
  signup$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap(({ createUserDTO }) =>
        this._authService.signup(createUserDTO).pipe(
          map((tokens) => AuthApiActions.signUpSuccess({ tokens })),
          tap(
            () => void 0,
            () => {
              this._dialog.error({
                title: 'Signup failed',
                body: 'Something went wrong, please try again later.',
              });
            }
          ),
          catchError(({ error }) => of(AuthApiActions.signUpFailure(error)))
        )
      )
    )
  );

  /**
   * - Authorization Success
   * - When login success, or signup success, server will response object content accessToken and refreshToken, take tokenx return from server save to localStorage
   * - after that take this tokens from localStorage send back to serve to get infomation about user
   */
  authorizationSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginSuccess, AuthApiActions.signUpSuccess),
        concatLatestFrom(() => this._authFacade.returnUrl$),
        tap(([{ tokens }, returnUrl]) => {
          this._tokenService.saveTokens(tokens);
          this._authFacade.tryLogin();

          this._router.navigateByUrl(returnUrl ? returnUrl : `/`);
          this._authFacade.setReturnUrl(null);
        })
      ),
    {
      dispatch: false,
    }
  );

  /**
   * -Logout
   */
  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this._tokenService.clear();
        this._router.navigateByUrl('/');
        this._dialog.success({
          title: 'Logout success',
          body: 'See you soon!',
        });
      }),
      map(() => AuthApiActions.logoutSuccess())
    )
  );

  /**
   * - Me
   */
  me$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.me),
      exhaustMap(({ accessToken }) =>
        this._authService.me(accessToken).pipe(
          /**
           * - Me Success
           */
          map((user) => AuthApiActions.meSuccess({ user })),

          /**
           * - Clear token when login failed
           */
          tap(null, () => this._tokenService.clear()),

          /**
           * - Me Failure
           */
          catchError(({ error }) => of(AuthApiActions.meFailure(error)))
        )
      )
    )
  );

  /**
   * - Change Password
   */
  changePassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.changePassword),
      exhaustMap(({ changePasswordDTO }) =>
        this._userService.changePassword(changePasswordDTO).pipe(
          /**
           * - Change Password Success
           */
          map(() => AuthApiActions.changePasswordSuccess()),

          tap(
            // Show Dialog Change Password Success
            () =>
              this._dialog.success({
                title: 'Change password sucess',
                body: 'Next time you login, you will need to use new password',
              }),
            // Show Dialog Change Password Failure
            () =>
              this._dialog.error({
                title: 'Change password failed',
                body: 'Your old password incorret!',
              })
          ),

          /**
           * - Change Password Failure
           */
          catchError(({ error }) =>
            of(AuthApiActions.changePasswordFailure(error))
          )
        )
      )
    )
  );

  /**
   * -  Update Account
   */
  updateAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.updateAccount),
      exhaustMap(({ updateUserDTO }) =>
        this._userService.updateAccount(updateUserDTO).pipe(
          /**
           * - Update Account Success
           */
          map((avatar) =>
            AuthApiActions.updateAccountSuccess({ updateUserDTO, avatar })
          ),

          tap(
            // Show Dialog Update Account Success
            () =>
              this._dialog.success({
                title: 'Update Account Success',
                body: 'Your account has been updated',
              }),
            // Show Dialog Update Account Failure
            () =>
              this._dialog.error({
                title: 'Updated Account Failed',
                body: 'Something went wrong. Please try again',
              })
          ),

          /**
           * - Update Account Failure
           */
          catchError(({ error }) =>
            of(AuthApiActions.updateAccountFailure(error))
          )
        )
      )
    )
  );

  private get _returnUrl() {
    const href = window.location.href.split('?')[0];
    return href ? `returnUrl=${href}` : '';
  }

  /**
   * - Auto clear error after 4 seconds
   */
  autoClearError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthApiActions.loginFailure, AuthApiActions.signUpFailure),
      switchMap(() => of(AuthActions.clearError()).pipe(delay(4_000)))
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade,
    private readonly _tokenService: TokenService,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _dialog: DialogService
  ) {}
}
