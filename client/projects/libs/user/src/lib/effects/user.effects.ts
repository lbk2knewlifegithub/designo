import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@lbk/services';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, tap } from 'rxjs';
import { catchError, delay, switchMap, take } from 'rxjs/operators';
import { UserActions, UserAPIActions } from '../actions';
import { UserFacade } from '../facace/user.facade';
import { UserService } from '../services';

/**
 * - User Effects
 */
@Injectable({ providedIn: 'root' })
export class UserEffects {
  /**
   * - Login With Github
   */
  loginWithGithub$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loginWithGithub),
      exhaustMap(({ code }) =>
        this._userService.loginWithGithub(code).pipe(
          map((token) => UserAPIActions.loginWithGithubSuccess({ token })),
          catchError(({ error }) =>
            of(UserAPIActions.loginWithGithubFailure({ error }))
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
        ofType(UserAPIActions.loginWithGithubFailure),
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
        ofType(UserAPIActions.loginWithGithubSuccess),
        tap(({ token }) => {
          this._tokenService.saveToken(token);
          this._userFacade.tryLogin();

          this._router.navigateByUrl('/');
          this._userFacade.setReturnUrl(null);
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
      ofType(UserActions.logout, UserAPIActions.deleteAccountSuccess),
      tap(() => {
        this._tokenService.clear();
        this._router.navigateByUrl('/');
        this._dialog.success({
          title: 'Logout success',
          body: 'See you soon!',
        });
      }),
      map(() => UserAPIActions.logoutSuccess())
    )
  );

  /**
   * - Me
   */
  me$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.me),
      exhaustMap(({}) =>
        this._userService.me().pipe(
          /**
           * - Me Success
           */
          map((user) => UserAPIActions.meSuccess({ user })),

          /**
           * - Clear token when login failed
           */
          tap(null, () => this._tokenService.clear()),

          /**
           * - Me Failure
           */
          catchError(({ error }) => of(UserAPIActions.meFailure(error)))
        )
      )
    )
  );

  /**
   * -  Update Profile
   */
  updateProfile = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.updateProfile),
      exhaustMap(({ updateUserDTO }) =>
        this._userService.updateProfile(updateUserDTO).pipe(
          /**
           * - Update Profile Success
           */
          map((avatar) =>
            UserAPIActions.updateProfileSuccess({ updateUserDTO, avatar })
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
            of(UserAPIActions.updateAccountFailure(error))
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
      ofType(UserAPIActions.loginWithGithubFailure),
      switchMap(() => of(UserActions.clearError()).pipe(delay(4_000)))
    )
  );

  /**
   * -  Update Account
   */
  deleteAccount = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.deleteAccount),
      exhaustMap(() =>
        this._userService.deleteAccount().pipe(
          /**
           * - Delete Account Success
           */
          map(() => UserAPIActions.deleteAccountSuccess()),

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
            of(UserAPIActions.deleteAccountFailure(error))
          )
        )
      )
    )
  );

  /**
   * -  Update Email Settings
   */
  updateEmailSettings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.updateEmailSettings),
      exhaustMap(({ emailSettings }) =>
        this._userService.updateEmailSettings(emailSettings).pipe(
          /**
           * - Update Email Settings Success
           */
          map(() =>
            UserAPIActions.updateEmailSettingsSuccess({ emailSettings })
          ),

          tap(
            // Show Dialog Update Email Settings Success
            () => this._dialog.success('Update Email Settings Success'),
            // Show Dialog Update Email Settings Failure
            () =>
              this._dialog.error({
                title: 'Updated Emaill Settings Failed',
                body: 'Something went wrong. Please try again',
              }),
            () => {
              this._userService.avatar = undefined;
            }
          ),

          /**
           * - Update Email Settings Failure
           */
          catchError(({ error }) =>
            of(UserAPIActions.updateEmailSettingsFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _userFacade: UserFacade,
    private readonly _tokenService: TokenService,
    private readonly _userService: UserService,
    private readonly _dialog: DialogService
  ) {}
}
