import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { InvoiceDetailsPageComponent } from '../containers/invoice-details-page.component';

@Injectable({ providedIn: 'root' })
export class PendingGuard
  implements CanDeactivate<InvoiceDetailsPageComponent>
{
  canDeactivate(component: InvoiceDetailsPageComponent): Observable<boolean> {
    const { pendingDelete$, pendingMaskAsPaid$, pendingSaveAndChange$ } =
      component;
    return combineLatest([
      pendingDelete$,
      pendingMaskAsPaid$,
      pendingSaveAndChange$,
    ]).pipe(
      map(
        ([pendingDelete, pendingMaskAsPaid, pendingSaveAndChange]) =>
          !pendingDelete && !pendingMaskAsPaid && !pendingSaveAndChange
      )
    );
  }
}
