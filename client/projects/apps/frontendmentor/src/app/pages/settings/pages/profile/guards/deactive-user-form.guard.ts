import { DialogService } from '@ngneat/dialog';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

import { ProfilePageComponent } from '../containers';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({ providedIn: 'root' })
export class DeactiveUserFormGuard
  implements CanDeactivate<ProfilePageComponent>
{
  constructor(private readonly _ds: DialogService) {}
  canDeactivate(
    component: ProfilePageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest([
      component.updatingProfile$,
      of(component.userForm.form.dirty),
    ]).pipe(
      switchMap(([updatingProfile, dirty]) => {
        if (updatingProfile) {
          this._ds.error({
            title: 'You are updating your profile.',
            body: ' Please wait until the process is finished.',
          });
          return of(false);
        }

        if (dirty) {
          return this._ds.confirm({
            title: 'Are you sure you want to leave?',
            body: 'You have unsaved changes. Are you sure you want to leave?',
          }).afterClosed$;
        }

        return of(true);
      })
    );
  }
}
