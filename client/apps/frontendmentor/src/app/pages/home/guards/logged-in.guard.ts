import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from '@lbk/auth';
import { Observable, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._authFacade.loggedIn$.pipe(
      take(1),
      tap((loggedIn) => {
        loggedIn && this._router.navigateByUrl('/shell/solutions');
      }),
      map(() => true)
    );
  }
}
