import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvoiceDetails } from './actions';
import * as fromInvoiceDetails from './invoice-details.selectors';

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsFacade {
  /**
   * - Shown Update Invoice Overlay
   */
  shownUpdateOverlay$: Observable<boolean> = this._store.select(
    fromInvoiceDetails.selectShownUpdateOverlay
  );

  /**
   * - Pending Save And Change
   */
  pendingSaveAndChange$ = this._store.select(
    fromInvoiceDetails.selectPendingSaveAndChange
  );

  /**
   * - Pending Mask As Paid
   */
  pendingMaskAsPaid$ = this._store.select(
    fromInvoiceDetails.selectPendingMaskAsPaid
  );

  /**
   * - Pending Delete
   */
  pendingDelete$ = this._store.select(fromInvoiceDetails.selectPendingDelete);

  constructor(private readonly _store: Store) {}

  /**
   * - Close Update Overlay
   */
  closeUpdateOverlay() {
    this._store.dispatch(InvoiceDetails.closeUpdateOverlay());
  }

  /**
   * - Show Update Overlay
   */
  showUpdateOverlay() {
    this._store.dispatch(InvoiceDetails.showUpdateOverlay());
  }
}
