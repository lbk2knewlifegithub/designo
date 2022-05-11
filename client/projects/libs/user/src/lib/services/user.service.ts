import { EmailSettings } from './../../../../models/src/lib/user.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UpdateUserDTO } from '@lbk/dto';
import { API_URL } from '@lbk/tokens';
import {
  BehaviorSubject,
  exhaustMap,
  forkJoin,
  Observable,
  of,
  delay,
} from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { UploadService } from './images.service';
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
    @Inject(API_URL)
    private readonly _apiURL: string,
    private readonly _http: HttpClient,
    private readonly _imagesService: UploadService
  ) {}
  /**
   * - Login With Github
   * @param code
   * @returns
   */
  loginWithGithub(code: string): Observable<string> {
    return this._http
      .get<{ token: string }>(`${this._apiURL}/user/login/github?code=${code}`)
      .pipe(map(({ token }) => token));
  }

  /**
   * - Verify Me
   * - Take token from localStorage and send it to the server
   * get back a user object
   * @param token
   * @returns User of success else throw error
   */
  me(): Observable<User> {
    return this._http.get<User>(`${this._apiURL}/user/me`);
  }

  /**
   * - Update Profile
   */
  updateProfile(updateUserDTO: UpdateUserDTO): Observable<string | undefined> {
    if (!this.avatar)
      return this._http
        .put<void>(`${this._apiURL}/user/me`, updateUserDTO)
        .pipe(map(() => undefined));

    // Update With Avatar
    const formData = new FormData();
    formData.append('avatar', this.avatar);
    this.avatar = undefined;
    return forkJoin([
      this._http.put<void>(`${this._apiURL}/user/me`, updateUserDTO),
      this._imagesService.uploadAvatar(formData),
    ]).pipe(
      map(([, avatar]) => avatar),
      shareReplay(1)
    );
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
      .get<User>(`${this._apiURL}/user?username=${username}`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Delete Account
   */
  deleteAccount(): Observable<void> {
    return this._http
      .delete<void>(`${this._apiURL}/user/me`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Update Email Settings
   */
  updateEmailSettings(emailSettings: EmailSettings): Observable<void> {
    return this._http
      .put<void>(`${this._apiURL}/user/me/email-settings`, emailSettings)
      .pipe(shareReplay(1));
  }
}
