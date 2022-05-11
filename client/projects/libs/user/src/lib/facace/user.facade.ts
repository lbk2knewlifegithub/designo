import { EmailSettings } from './../../../../models/src/lib/user.model';
import { Inject, Injectable } from '@angular/core';
import { ChangePasswordDTO, UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { TokenService } from '@lbk/services';
import { CURRENT_HOST, GITHUB_OAUTH_CLIENT_ID } from '@lbk/tokens';
import { DialogService } from '@ngneat/dialog';
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
import { UserActions, UserAPIActions } from '../actions';
import { fromUser } from '../selectors';
import { RequiredLoginComponent } from '../dialogs';
import { UserService } from '../services';

/**
 * - User Facade
 */
@Injectable({ providedIn: 'root' })
export class UserFacade {
  user$: Observable<User | null> = this._store.select(fromUser.selectUser);
  loggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  alreadyTryLogin$: Observable<boolean> = this._store.select(
    fromUser.selectAlreadyTryLogin
  );

  pending$: Observable<boolean> = this._store.select(fromUser.selectPending);

  // Updating Profile
  updatingProfile$: Observable<boolean> = this._store.select(
    fromUser.selectUpdatingProfile
  );

  // Updating Email Settings
  updatingEmailSettings$: Observable<boolean> = this._store.select(
    fromUser.selectUpdatingEmailSettings
  );

  error$: Observable<string | null> = this._store.select(fromUser.selectError);

  /**
   * - Login Github URL
   */
  loginGithubURL = `https://github.com/login/oauth/authorize?client_id=${this._githubOAuthClientId}&redirect_uri=${this._currentHost}/login&scope=user:email`;

  constructor(
    private readonly _store: Store,
    private readonly _userService: UserService,
    private readonly _tokenService: TokenService,
    private readonly _dialogService: DialogService,
    @Inject(GITHUB_OAUTH_CLIENT_ID)
    private readonly _githubOAuthClientId: string,
    @Inject(CURRENT_HOST)
    private readonly _currentHost: string
  ) {}

  /**
   * - Login With Github
   */
  loginWithGithub(code: string) {
    this._store.dispatch(UserActions.loginWithGithub({ code }));
  }
  /**
   *  - Change password
   * @param changePasswordDTO
   */
  changePassword(changePasswordDTO: ChangePasswordDTO): void {
    this._store.dispatch(UserActions.changePassword({ changePasswordDTO }));
  }

  logout(): void {
    this._store.dispatch(UserActions.logout());
  }

  /**
   *  - Check Logged In
   * - If User not logged in, open login dialog
   * @param callback
   */
  checkLoggedIn(callback: ((user: User) => void) | null = null): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this._dialogService.open(RequiredLoginComponent);
        return;
      }

      if (callback) callback(user);
    });
  }

  /**
   *
   * @param accessToken
   * @returns
   */
  me(returnUrl: string): Observable<boolean> {
    return this._getToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) return of(false);

        return this._userService.me().pipe(
          tap((user) =>
            this._store.dispatch(UserAPIActions.meSuccess({ user }))
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
  tryLogin(): Observable<boolean> {
    return combineLatest([this.loggedIn$, this._getToken()]).pipe(
      switchMap(([loggedIn, token]) => {
        if (loggedIn) return of(true);
        if (!token) return of(true);

        return this._userService.me().pipe(
          tap((user) => {
            this._store.dispatch(UserAPIActions.meSuccess({ user }));
          }),
          map(() => true),
          catchError((e) => of(true))
        );
      })
    );
  }

  private _getToken(): Observable<string | undefined> {
    return this._tokenService.getToken().pipe(
      map((token) => {
        if (!token) return undefined;
        return token;
      })
    );
  }

  /**
   *  - Update Profile
   * @param updateUserDTO
   * @param avatar
   */
  updateProfile(updateUserDTO: UpdateUserDTO, avatar?: File) {
    if (avatar) this._userService.avatar = avatar;
    this._store.dispatch(UserActions.updateProfile({ updateUserDTO }));
  }

  /**
   * - Update Email Settings
   * @param emailSettings
   */
  updateEmailSettings(emailSettings: EmailSettings) {
    this._store.dispatch(UserActions.updateEmailSettings({ emailSettings }));
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

  /**
   * - Set Return Url
   * @param returnUrl
   */
  setReturnUrl(returnUrl: string | null) {
    this._store.dispatch(UserActions.setReturnUrl({ returnUrl }));
  }

  /**
   * - Delete Account
   */
  deleteAccount() {
    this._store.dispatch(UserActions.deleteAccount());
  }
}
