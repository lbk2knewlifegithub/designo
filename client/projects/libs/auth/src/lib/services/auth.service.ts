import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateUserDTO } from '@lbk/dto';
import { Credentials, Tokens, User } from '@lbk/models';
import { API_URL } from '@lbk/tokens';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { UploadService } from './images.service';

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
  private readonly _apiAuthUrl = `${this._apiUrl}/auth`;

  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private readonly _http: HttpClient,
    private readonly _imagesService: UploadService
  ) {}

  /**
   * - Verify Me
   * - Take token from localStorage and send it to the server
   * get back a user object
   * @param token
   * @returns User of success else throw error
   */
  me(token: string): Observable<User> {
    return this._http.get<User>(`${this._apiAuthUrl}/me`);
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

  /**
   * - Login With Github
   * @param code
   * @returns
   */
  loginWithGithub(code: string): Observable<string> {
    return this._http
      .get<{ token: string }>(`${this._apiUrl}/auth/login/github?code=${code}`)
      .pipe(map(({ token }) => token));
  }
}
