import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthFacade } from '../auth.facade';

@Injectable({ providedIn: 'root' })
export class TryLoginGuard implements CanActivate {
  constructor(private readonly _authFacade: AuthFacade) {}

  canActivate() {
    this._authFacade.tryLogin();
    return true;
  }
}
