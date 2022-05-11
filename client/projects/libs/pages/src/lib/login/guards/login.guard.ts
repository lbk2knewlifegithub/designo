import { UserFacade } from '@lbk/user';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _userFacade: UserFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const code = route.queryParams['code'];
    if (!code) {
      this._router.navigateByUrl('/');
      return false;
    }

    this._userFacade.loginWithGithub(code);
    return true;
  }
}
