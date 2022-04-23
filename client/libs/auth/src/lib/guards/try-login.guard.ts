import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthFacade } from '../auth.facade';

@Injectable({ providedIn: 'root' })
export class TryLoginGuard implements CanActivate {
  constructor(private readonly _authFacade: AuthFacade) {}

  canActivate(): Observable<boolean> {
    return this._authFacade.tryLogin().pipe(take(1));
  }
}
