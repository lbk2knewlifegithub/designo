import { Injectable } from '@angular/core';
import { ChangePasswordDTO, UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { TokenService } from '@lbk/services';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AuthActions, AuthApiActions } from './actions';
import * as fromAuth from './auth.selectors';
import { AuthService, UserService } from './services';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$: Observable<User | null> = this._store.select(fromAuth.selectUser);
  loggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  pending$: Observable<boolean> = this._store.select(fromAuth.selectPending);

  constructor(
    private readonly _store: Store,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _tokenService: TokenService
  ) {}

  /**
   * - Login
   */
  login() {
    this._store.dispatch(AuthActions.login());
  }

  /**
   * - Sign Up
   */
  signup() {
    this._store.dispatch(AuthActions.signup());
  }

  /**
   *  - Change password
   * @param changePasswordDTO
   */
  changePassword(changePasswordDTO: ChangePasswordDTO): void {
    this._store.dispatch(AuthActions.changePassword({ changePasswordDTO }));
  }

  logout(): void {
    this._store.dispatch(AuthActions.logout());
  }

  /**
   *
   * @param accessToken
   * @returns
   */
  me(): Observable<boolean> {
    return combineLatest([this._getAccessToken(), this.pending$]).pipe(
      switchMap(([accessToken, pending]) => {
        if (!accessToken || pending) return of(false);

        return this._authService.me(accessToken).pipe(
          tap((user) =>
            this._store.dispatch(AuthApiActions.loginSuccess({ user }))
          ),
          map(() => true),
          catchError(() => {
            this._tokenService.clear();
            return of(false);
          })
        );
      })
    );
  }

  /**
   * - Try Login
   * - Get Access Token from localStorage an try login
   * @returns true of login success
   */
  tryLogin(skipWhenPending: boolean) {
    combineLatest([this._getAccessToken(), this.pending$])
      .pipe(take(1))
      .subscribe(([accessToken, pending]) => {
        if (skipWhenPending && pending) return;
        if (!accessToken) return;

        this._store.dispatch(AuthActions.me({ accessToken }));
      });
  }

  private _getAccessToken(): Observable<string | undefined> {
    return this._tokenService.getToken().pipe(
      map((token) => {
        if (!token) return undefined;

        return token.accessToken;
      })
    );
  }

  /**
   *  - Update Account
   * @param updateUserDTO
   * @param avatar
   */
  updateAccount(updateUserDTO: UpdateUserDTO, avatar?: File) {
    if (avatar) this._userService.avatar = avatar;
    this._store.dispatch(AuthActions.updateAccount({ updateUserDTO }));
  }

  /**
   *  - Request Verify Email
   * @param user_id
   */
  requestVerifyEmail() {
    this._store.dispatch(AuthActions.requestVerifyEmail());
  }

  /**
   *  - verify Email
   * @param token
   */
  verifyEmail(token: string) {
    this._store.dispatch(AuthActions.verifyEmail({ token }));
  }

  /**
   *  - Has User In Store
   * @param username
   * @returns
   */
  getUserInStore(username: string): Observable<User | null> {
    return this.user$.pipe(
      map((user) => {
        if (!user) return null;
        return user.username === username ? user : null;
      })
    );
  }

  /**
   * - Has User In Api
   * @param username
   */
  getUserInApi(username: string): Observable<User | null> {
    return this._userService
      .getUserByUsername(username)
      .pipe(catchError(() => of(null)));
  }
}
