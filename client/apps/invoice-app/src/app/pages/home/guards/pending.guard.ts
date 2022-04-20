import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { HomePageComponent } from '../containers';

@Injectable({ providedIn: 'root' })
export class PendingGuard implements CanDeactivate<HomePageComponent> {
  canDeactivate(component: HomePageComponent): Observable<boolean> {
    return combineLatest([
      component.pendingSaveAsDraft$,
      component.pendingCreate$,
    ]).pipe(
      map(
        ([pendingSaveAsDraft, pendingCreate]) =>
          !pendingSaveAsDraft && !pendingCreate
      )
    );
  }
}
