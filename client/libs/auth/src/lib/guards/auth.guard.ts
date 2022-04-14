import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '@lbk/auth';
import { first, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly _authFacade: AuthFacade) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._authFacade.loggedIn$.pipe(
      first(),
      switchMap((authed) => {
        if (authed) return of(true);
        return this._authFacade.me(state.url);
      })
    );
  }
}
