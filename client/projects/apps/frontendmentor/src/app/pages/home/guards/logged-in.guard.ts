import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserFacade } from '@lbk/user';
import { Observable, take, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly _userFacade: UserFacade,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._userFacade.loggedIn$.pipe(
      take(1),
      tap((loggedIn) => {
        loggedIn && this._router.navigateByUrl('/feed');
      }),
      map(() => true)
    );
  }
}
