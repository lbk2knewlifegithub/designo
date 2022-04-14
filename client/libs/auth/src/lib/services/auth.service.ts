import { API_AUTH_URL } from '@lbk/tokens';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateUserDTO } from '@lbk/dto';
import { ImagesService } from './images.service';
import { Credentials, Tokens, User } from '@lbk/models';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  _uploadFile = new BehaviorSubject<File | undefined>(undefined);
  uploadFile$ = this._uploadFile.asObservable();

  set uploadFile(uploadFile: File | undefined) {
    this._uploadFile.next(uploadFile);
  }

  get uploadFile(): File | undefined {
    return this._uploadFile.getValue();
  }

  constructor(
    @Inject(API_AUTH_URL)
    private readonly _apiAuthUrl: string,
    private readonly _http: HttpClient,
    private readonly _imagesService: ImagesService
  ) {}

  /**
   * - Verify Me
   * - Take token from localStorage and send it to the server
   * get back a user object
   * @param accessToken
   * @returns User of success else throw error
   */
  me(accessToken: string): Observable<User> {
    return this._http.post<User>(`${this._apiAuthUrl}/me`, {
      accessToken,
    });
  }

  /**
   * - Login
   * @param credentials
   * @returns
   */
  login(credentials: Credentials): Observable<Tokens> {
    return this._http.post<Tokens>(`${this._apiAuthUrl}/login`, credentials);
  }

  /**
   *  - Sign Up
   * @param createUserDTO
   * @returns
   */
  signup(createUserDTO: CreateUserDTO): Observable<Tokens> {
    const { firstname, lastname, password, username } = createUserDTO;

    return this._http
      .post<Tokens>(`${this._apiAuthUrl}/signup`, {
        firstname,
        lastname,
        password,
        username,
      })
      .pipe(
        switchMap((token) => {
          if (!this.uploadFile) return of(token);

          const formData = new FormData();
          formData.append('avatar', this.uploadFile);

          return this._imagesService
            .uploadAvatar(formData, token.accessToken)
            .pipe(map(() => token));
        })
      );
  }
}
