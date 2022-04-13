import { Inject, Injectable } from '@angular/core';
import { Token } from '@lbk/models';
import { LOCAL_STORAGE_TOKEN } from '@lbk/tokens';
import { map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public static TOKEN_KEY = 'token';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getToken(): Observable<Token | undefined> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(TokenService.TOKEN_KEY)),
      map((value: string | null) => (value ? JSON.parse(value) : undefined))
    );
  }

  clear() {
    this.storage.removeItem(TokenService.TOKEN_KEY);
  }

  saveToken(token: Token) {
    this.storage.setItem(TokenService.TOKEN_KEY, JSON.stringify(token));
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
