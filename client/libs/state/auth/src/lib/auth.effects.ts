import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@lbk/services';
import { CLIENT_AUTH_URL } from '@lbk/tokens';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { exhaustMap, filter, map, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthActions, AuthApiActions } from './actions';
import { AuthFacade } from './auth.facade';
import { AuthService, UserService } from './services';

/**
 * - Feedback Effects
 */
@Injectable({ providedIn: 'root' })
export class AuthEffects {
  // Login
  login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.login),
        tap(() => {
          window.location.href = `${this._clientAuthUrl}/#/login?${this._returnUrl}`;
        })
      ),
    {
      dispatch: false,
    }
  );

  /**
   * -Logout
   */
  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this._tokenService.clear();
          this._router.navigateByUrl('/');
        })
      ),
    {
      dispatch: false,
    }
  );

  /**
   * -Signup
   */
  signup$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.signup),
        tap(() => {
          window.location.href = `${this._clientAuthUrl}/#/signup?${this._returnUrl}`;
        })
      ),
    {
      dispatch: false,
    }
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
          map((user) => AuthApiActions.loginSuccess({ user })),

          /**
           * - Me Failure
           */
          catchError(({ error }) => of(AuthApiActions.loginFailure(error)))
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
   * - Get Access Token and save to local storage
   */
  getAccessToken$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        map((s) => s.payload.routerState.root.queryParams['accessToken']),
        filter((accessToken) => !!accessToken),
        tap((accessToken) => {
          this._tokenService.saveToken({ accessToken });
          this._authFacade.tryLogin(true);
        })
      ),
    {
      dispatch: false,
    }
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

  /**
   * -  Request Verify Email
   */
  requestVerifyEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.requestVerifyEmail),
      exhaustMap(() =>
        this._userService.requestVerifyEmail().pipe(
          /**
           * - Request Verify Email Success
           */
          map(() => AuthApiActions.requestVerifyEmailSuccess()),

          tap(
            // Show Dialog Request Verify Email Success
            () =>
              this._dialog.success({
                title: 'Verification email sent, it will expire in 3 minutes',
                body: 'Please check your email',
              }),
            // Show Dialog Request Verify Email Failure
            () =>
              this._dialog.error({
                title: 'Send verification email failure',
                body: 'Something went wrong. Please try again',
              })
          ),

          /**
           * - Send Verify Failure
           */
          catchError(({ error }) =>
            of(AuthApiActions.requestVerifyEmailFailure(error))
          )
        )
      )
    )
  );

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

  private get _returnUrl() {
    const href = window.location.href.split('?')[0];
    return href ? `returnUrl=${href}` : '';
  }

  constructor(
    private readonly _actions$: Actions,
    @Inject(CLIENT_AUTH_URL)
    private readonly _clientAuthUrl: string,
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade,
    private readonly _tokenService: TokenService,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _dialog: DialogService
  ) {}
}
