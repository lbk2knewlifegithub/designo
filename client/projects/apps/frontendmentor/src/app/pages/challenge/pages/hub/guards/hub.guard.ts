import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ChallengesFacade } from '../../../../../state';

@Injectable({ providedIn: 'root' })
export class HubGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _challengeFacade: ChallengesFacade
  ) {}

  /**
   * - Has Challenge In Store And Started
   * @param id
   * @returns
   */
  hasChallengeInStoreAndStarted(id: string): Observable<boolean> {
    return this._challengeFacade.hasChallengeInStore(id, true);
  }

  /**
   * - Has Challenge In API And Started
   * @param id
   * @returns
   */
  hasChallengeInAPIAndStarted(id: string): Observable<boolean> {
    return this._challengeFacade.hasChallengeInAPI(id, true).pipe(
      tap((result) => {
        if (!result) this._router.navigate(['/challenges']);
      })
    );
  }

  /**
   * - Has Challenge And Started
   * @param id
   * @returns
   */
  hasChallengeAndStarted(id: string): Observable<boolean> {
    return this.hasChallengeInStoreAndStarted(id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(inStore);
        return this.hasChallengeInAPIAndStarted(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasChallengeAndStarted(route.params['id']);
  }
}
