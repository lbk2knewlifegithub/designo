import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedbackExistsGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _facade: FeedbacksFacade
  ) {}

  hasFeedbackInStore(id: number): Observable<boolean> {
    return this._facade.hasFeedbackInStore(id);
  }

  hasFeedbackInApi(id: number): Observable<boolean> {
    return this._facade.hasFeedbackInApi(id).pipe(
      tap((result) => {
        if (!result) this._router.navigate(['/']);
      })
    );
  }

  hasFeedback(id: number): Observable<boolean> {
    return this.hasFeedbackInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(inStore);
        return this.hasFeedbackInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasFeedback(route.params['feedback_id']);
  }
}
