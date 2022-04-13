import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthFacade } from '@lbk/state/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = route.queryParams['token'];
    // If token is not present in the route, redirect to signup
    if (!token) {
      this._router.navigateByUrl('/signup');
      return of(false);
    }

    this._authFacade.verifyEmail(token);

    return of(true);
  }
}
