import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { InvoicesFacade } from '../../../state';

@Injectable({
  providedIn: 'root',
})
export class InvoiceExistsGuard implements CanActivate {
  constructor(
    private readonly _invoicesFacade: InvoicesFacade,
    private readonly _router: Router
  ) {}

  /**
   *  - Has Invoice In Store
   * @param invoice_id
   * @returns
   */
  hasInvoiceInStore(invoice_id: number): Observable<boolean> {
    return this._invoicesFacade.hasInvoiceInStore(invoice_id);
  }

  /**
   *  - Has Invoice In API
   * @param invoice_id
   * @returns
   */
  hasInvoiceInApi(invoice_id: number): Observable<boolean> {
    return this._invoicesFacade.hasInvoiceInApi(invoice_id).pipe(
      tap((result) => {
        if (!result) this._router.navigate(['/']);
      })
    );
  }

  hasInvoice(invoice_id: number): Observable<boolean> {
    return this.hasInvoiceInStore(invoice_id).pipe(
      switchMap((inStore) => {
        if (inStore) return of(true);
        return this.hasInvoiceInApi(invoice_id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    try {
      const invoice_id = parseInt(route.params['invoice_id']);
      return this.hasInvoice(invoice_id);
    } catch (e) {
      return of(false);
    }
  }
}
