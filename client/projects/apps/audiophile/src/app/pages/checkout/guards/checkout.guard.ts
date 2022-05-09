import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { map, Observable, of, take, tap } from 'rxjs';
import { CartFacade } from '../../../state';
import { CheckoutPageComponent } from '../containers';

@Injectable({ providedIn: 'root' })
export class CheckoutGuard
  implements CanActivate, CanDeactivate<CheckoutPageComponent>
{
  constructor(
    private readonly _router: Router,
    private readonly _dialogService: DialogService,
    private readonly _cartFacade: CartFacade
  ) {}

  canDeactivate(component: CheckoutPageComponent): Observable<boolean> {
    if (component.isDirty) {
      return this._dialogService.confirm({
        title: 'Unsaved Changes',
        body: 'You have unsaved changes. Are you sure you want to leave?',
      }).afterClosed$;
    }
    return of(true);
  }

  canActivate(): Observable<boolean> {
    return this._cartFacade.numberOfItems$.pipe(
      take(1),
      map((numberOfItems) => numberOfItems > 0),
      tap((notEmpty) => {
        if (!notEmpty) this._router.navigateByUrl('/');
      })
    );
  }
}
