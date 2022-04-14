import { Injectable } from '@angular/core';
import { ChangePasswordDTO, CreateUserDTO, UpdateUserDTO } from '@lbk/dto';
import { Credentials, User } from '@lbk/models';
import { TokenService } from '@lbk/services';
import { DialogService } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthActions, AuthApiActions } from './actions';
import { AuthError } from './auth.reducer';
import * as fromAuth from './auth.selectors';
import { RequiredLoginComponent } from './dialogs';
import { AuthService, UserService } from './services';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$: Observable<User | null> = this._store.select(fromAuth.selectUser);
  loggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  pending$: Observable<boolean> = this._store.select(fromAuth.selectPending);
  error$: Observable<AuthError | null> = this._store.select(
    fromAuth.selectError
  );

  returnUrl$: Observable<string | null> = this._store.select(
    fromAuth.selectReturnUrl
  );

  constructor(
    private readonly _store: Store,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _tokenService: TokenService,
    private readonly _dialogService: DialogService
  ) {}

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

  checkLoggedIn(callback: (() => void) | null = null): void {
    this.loggedIn$.pipe(take(1)).subscribe((loggedIn) => {
      if (!loggedIn) {
        this._dialogService.open(RequiredLoginComponent);
        return;
      }

      if (callback) callback();
    });
  }

  /**
   *
   * @param accessToken
   * @returns
   */
  me(returnUrl: string): Observable<boolean> {
    return this._getAccessToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          this._dialogService.open(RequiredLoginComponent, {
            data: { returnUrl },
          });
          return of(false);
        }

        return this._authService.me(accessToken).pipe(
          tap((user) =>
            this._store.dispatch(AuthApiActions.meSuccess({ user }))
          ),
          map(() => true),
          catchError(() => {
            this._tokenService.clear();

            this._dialogService.open(RequiredLoginComponent, {
              data: { returnUrl },
            });
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
  tryLogin() {
    this._getAccessToken()
      .pipe(take(1))
      .subscribe((accessToken) => {
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
    this._store.dispatch(AuthActions.setReturnUrl({ returnUrl }));
  }

  /**
   * - Login
   * @param credentials
   */
  login(credentials: Credentials) {
    this._store.dispatch(AuthActions.login({ credentials }));
  }

  /**
   *  - Sign Up
   * @param createUserDTO
   * @param avatar
   */
  signUp(createUserDTO: CreateUserDTO, avatar?: File) {
    this._authService.uploadFile = avatar;
    this._store.dispatch(AuthActions.signup({ createUserDTO }));
  }
}
