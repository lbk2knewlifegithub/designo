import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from '@lbk/tokens';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public static TOKEN_KEY = 'token';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getToken(): Observable<string | undefined> {
    return this.supported().pipe(
      map(() => this.storage.getItem(TokenService.TOKEN_KEY)),
      map((value: string | null) => (value ? JSON.parse(value) : undefined))
    );
  }

  clear() {
    this.storage.removeItem(TokenService.TOKEN_KEY);
  }

  saveToken(token: string) {
    this.storage.setItem(TokenService.TOKEN_KEY, JSON.stringify(token));
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
