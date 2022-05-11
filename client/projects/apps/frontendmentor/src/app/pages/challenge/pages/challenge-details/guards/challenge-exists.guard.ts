import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ChallengesFacade } from '../../../../../state';

@Injectable({ providedIn: 'root' })
export class ChallengeExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _challengeFacade: ChallengesFacade
  ) {}

  hasChallengeInStore(id: string): Observable<boolean> {
    return this._challengeFacade.hasChallengeInStore(id);
  }

  hasChallengeInAPI(id: string): Observable<boolean> {
    return this._challengeFacade.hasChallengeInAPI(id).pipe(
      tap((result) => {
        if (!result) this._router.navigate(['/challenges']);
      })
    );
  }

  hasChallenge(id: string): Observable<boolean> {
    return this.hasChallengeInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(inStore);
        return this.hasChallengeInAPI(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log('ChallengeExistsGuard.canActivate');
    return this.hasChallenge(route.params['id']);
  }
}
