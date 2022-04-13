import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ProfileFacade } from '../state/profile.facade';

@Injectable({ providedIn: 'root' })
export class UserExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authFacade: AuthFacade,
    private readonly _profileFacade: ProfileFacade
  ) {}

  getUser(username: string): Observable<User | null> {
    return this._authFacade.getUserInStore(username).pipe(
      switchMap((user) => {
        if (user) return of(user);
        return this._authFacade.getUserInApi(username);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const username: string | null = route.paramMap.get('username');

    // If username not found will redirect to home page
    if (!username) {
      this._router.navigateByUrl('/');
      return of(false);
    }

    return this.getUser(username).pipe(
      tap((user) => {
        if (!user) return;
        this._profileFacade.enter(user);
      }),
      map((user) => !!user)
    );
  }
}
