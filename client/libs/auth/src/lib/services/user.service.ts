import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ChangePasswordDTO, UpdateUserDTO } from '@lbk/dto';
import { API_AUTH_URL } from '@lbk/tokens';
import {
  BehaviorSubject,
  exhaustMap,
  forkJoin,
  Observable,
  of,
  delay,
} from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ImagesService } from './images.service';
import { User } from '@lbk/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  _avatar = new BehaviorSubject<File | undefined>(undefined);
  avatar$ = this._avatar.asObservable();

  set avatar(avatar: File | undefined) {
    this._avatar.next(avatar);
  }

  get avatar(): File | undefined {
    return this._avatar.getValue();
  }

  constructor(
    @Inject(API_AUTH_URL)
    private readonly _authUrl: string,
    private readonly _http: HttpClient,
    private readonly _imagesService: ImagesService
  ) {}
  /**
   * - Change Password
   * @param changePasswordDTO
   */
  changePassword(changePasswordDTO: ChangePasswordDTO): Observable<void> {
    return this._http.patch<void>(
      `${this._authUrl}/change-password`,
      changePasswordDTO
    );
  }

  /**
   *  - Request Verify Email
   * @param password
   * @returns
   */
  requestVerifyEmail(): Observable<void> {
    return this._http
      .post<void>(`${this._authUrl}/request-verify-email`, null)
      .pipe(shareReplay(1));
  }

  /**
   * - Update Account
   */
  updateAccount(updateUserDTO: UpdateUserDTO): Observable<string | undefined> {
    if (!this.avatar)
      return this._http.put<void>(`${this._authUrl}/me`, updateUserDTO).pipe(
        map(() => undefined),
        delay(3_000)
      );

    const formData = new FormData();
    formData.append('avatar', this.avatar);
    this.avatar = undefined;
    return forkJoin([
      this._http.put<void>(`${this._authUrl}/me`, updateUserDTO),
      this._imagesService.uploadAvatar(formData),
    ]).pipe(map(([, avatar]) => avatar));
  }

  /**
   *  - Take token and send to verify-email route
   * @param token
   */
  verifyEmail(token: string): Observable<void> {
    return this._http
      .post<void>(`${this._http}/verify-email`, {
        token,
      })
      .pipe(shareReplay(1));
  }

  /**
   *  - Check If Username Exists
   * @param username
   * @returns  true - if username exists
   * false - if username does not exist
   */
  usernameExists(username: string) {
    return this._http
      .post<void>(`${this._authUrl}/users/exists/username`, {
        username,
      })
      .pipe(
        exhaustMap(() => of(true)),
        catchError(() => of(false)),
        shareReplay(1)
      );
  }

  /**
   *  - Check If Email Exists
   * @param email
   * @returns  true - if email exists
   * false - if email does not exist
   */
  emailExists(email: string) {
    return this._http.post<void>(`auth/users/exists/email`, { email }).pipe(
      exhaustMap(() => of(true)),
      catchError(() => of(false)),
      shareReplay(1)
    );
  }

  /**
   *  - Get User By Username
   * @param username
   */
  getUserByUsername(username: string): Observable<User> {
    return this._http
      .get<User>(`${this._authUrl}/users?username=${username}`)
      .pipe(shareReplay(1));
  }
}
