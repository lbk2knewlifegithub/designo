import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ChallengesFacade } from './../../../state';

@Injectable({ providedIn: 'root' })
export class ChallengeExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _challengeFacade: ChallengesFacade
  ) {}

  hasChallengeInStore(challenge_id: number): Observable<boolean> {
    return this._challengeFacade.hasChallengeInStore(challenge_id);
  }

  hasChallengeInAPI(challenge_id: number): Observable<boolean> {
    return this._challengeFacade.hasChallengeInAPI(challenge_id).pipe(
      tap((result) => {
        if (!result) this._router.navigate(['/challenges']);
      })
    );
  }

  hasChallenge(challenge_id: number): Observable<boolean> {
    return this.hasChallengeInStore(challenge_id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(inStore);
        return this.hasChallengeInAPI(challenge_id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasChallenge(route.params['challenge_id']);
  }
}
