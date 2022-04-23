import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '../auth.facade';
import { first, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly _authFacade: AuthFacade) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._authFacade.loggedIn$.pipe(
      first(),
      switchMap((loggedIn) => {
        if (loggedIn) return of(true);
        return this._authFacade.me(state.url);
      })
    );
  }
}
