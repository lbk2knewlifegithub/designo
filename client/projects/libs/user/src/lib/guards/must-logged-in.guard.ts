import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { UserFacade } from '../facace/user.facade';

@Injectable({ providedIn: 'root' })
export class MustLoggedInGuard implements CanActivate {
  constructor(
    private readonly _userFacade: UserFacade,
    private readonly _router: Router
  ) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._userFacade.loggedIn$.pipe(
      first(),
      switchMap((loggedIn) => {
        if (loggedIn) return of(true);
        return this._userFacade.me(state.url);
      }),
      tap((ok) => !ok && this._router.navigateByUrl('/'))
    );
  }
}
