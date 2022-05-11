import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, take } from 'rxjs';
import { UserFacade } from '../facace/user.facade';

@Injectable({ providedIn: 'root' })
export class TryLoginGuard implements CanActivate {
  constructor(private readonly _userFacade: UserFacade) {}

  canActivate(): Observable<boolean> {
    return this._userFacade.tryLogin().pipe(take(1));
  }
}
