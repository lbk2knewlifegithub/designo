import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { AuthFacade } from '../auth.facade';

@Injectable({ providedIn: 'root' })
export class MustLoggedInGuard implements CanActivate {
  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _router: Router
  ) {}

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
      }),
      tap((ok) => !ok && this._router.navigateByUrl('/'))
    );
  }
}
