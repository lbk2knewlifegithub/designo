import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SolutionsFacade } from '@lbk/fm/state';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SolutionExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _solutionsFacade: SolutionsFacade
  ) {}

  hasSolutionInStore(id: string): Observable<boolean> {
    return this._solutionsFacade.hasSolutionInStore(id);
  }

  hasSolutionInAPI(id: string): Observable<boolean> {
    return this._solutionsFacade.hasSolutionInAPI(id);
  }

  hasSolution(id: string): Observable<boolean> {
    return this.hasSolutionInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(inStore);
        return this.hasSolutionInAPI(id);
      }),
      tap((result) => {
        if (!result) this._router.navigate(['/shell/solutions']);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.hasSolution(route.params['id']);
  }
}
