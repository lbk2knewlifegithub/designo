import { AuthFacade } from '@lbk/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginOauthGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const code = route.queryParams['code'];
    if (!code) {
      this._router.navigateByUrl('/');
      return false;
    }

    this._authFacade.loginWithGithub(code);
    return true;
  }
}
