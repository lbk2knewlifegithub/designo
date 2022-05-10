import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@lbk/services';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, tap } from 'rxjs';
import { catchError, delay, switchMap, take } from 'rxjs/operators';
import { AuthActions, AuthApiActions } from '../actions';
import { AuthFacade } from '../auth.facade';
import { AuthService, UserService } from '../services';

/**
 * - Auth Effects
 */
@Injectable({ providedIn: 'root' })
export class AuthEffects {
  /**
   * - Login With Github
   */
  loginWithGithub$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.loginWithGithub),
      exhaustMap(({ code }) =>
        this._authService.loginWithGithub(code).pipe(
          map((token) => AuthApiActions.loginWithGithubSuccess({ token })),
          catchError(({ error }) =>
            of(AuthApiActions.loginWithGithubFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Login With Github Failure
   */
  loginWithGithubFailure$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginWithGithubFailure),
        tap(() => {
          this._dialog
            .error({
              title: 'Login Failed',
              body: 'Please try again later.',
            })
            .afterClosed$.pipe(take(1))
            .subscribe(() => {
              this._router.navigate(['/']);
            });
        })
      ),
    {
      dispatch: false,
    }
  );

  /**
   * - Authorization Success
   * - When login success, or signup success, server will response object content accessToken and refreshToken, take tokenx return from server save to localStorage
   * - after that take this tokens from localStorage send back to serve to get infomation about user
   */
  authorizationSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.loginWithGithubSuccess),
        concatLatestFrom(() => this._authFacade.returnUrl$),
        tap(([{ token }, returnUrl]) => {
          this._tokenService.saveToken(token);
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
      ofType(AuthActions.logout, AuthApiActions.deleteAccountSuccess),
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
   * -  Update Profile
   */
  updateProfile = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.updateProfile),
      exhaustMap(({ updateUserDTO }) =>
        this._userService.updateProfile(updateUserDTO).pipe(
          /**
           * - Update Profile Success
           */
          map((avatar) =>
            AuthApiActions.updateAccountSuccess({ updateUserDTO, avatar })
          ),

          tap(
            // Show Dialog Profile Account Success
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
              }),
            () => {
              this._userService.avatar = undefined;
            }
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
   * - Auto clear error after 4 seconds
   */
  autoClearError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthApiActions.loginWithGithubFailure),
      switchMap(() => of(AuthActions.clearError()).pipe(delay(4_000)))
    )
  );

  /**
   * -  Update Account
   */
  deleteAccount = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.deleteAccount),
      exhaustMap(() =>
        this._userService.deleteAccount().pipe(
          /**
           * - Delete Account Success
           */
          map(() => AuthApiActions.deleteAccountSuccess()),

          tap(
            // Show Dialog Profile Account Success
            () => this._dialog.success('Your account has been deleted'),
            // Show Dialog Update Account Failure
            () =>
              this._dialog.error({
                title: 'Delete Account Failed',
                body: 'Something went wrong. Please try again',
              })
          ),

          /**
           * - Delete Account Failure
           */
          catchError(({ error }) =>
            of(AuthApiActions.deleteAccountFailure(error))
          )
        )
      )
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
