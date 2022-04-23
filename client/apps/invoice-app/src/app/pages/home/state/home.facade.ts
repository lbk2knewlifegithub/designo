import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Invoice, InvoiceStatus } from '../../../shared';
import { InvoicesFacade } from './../../../state';
import { HomeActions } from './actions';
import * as fromHome from './home.selectors';

/**
 * - Home Facade
 */
@Injectable({ providedIn: 'root' })
export class HomeFacade {
  /**
   * - Shown Create Invoice Overlay
   */
  shownCreateInvoiceOverlay$: Observable<boolean> = this._store.select(
    fromHome.selectShownCreateInvoiceOverlay
  );

  /**
   * - Pending Save As Draft
   */
  pendingSaveAsDraft$ = this._store.select(fromHome.selectPendingSaveAsDraft);

  /**
   * - Pending Create
   */
  pendingCreate$ = this._store.select(fromHome.selectPendingCreate);

  /**
   * - Loading Invoices
   */
  loading$ = this._store.select(fromHome.selectLoadingInvoices);

  /**
   * - Filter By Status
   */
  filterByStatus$ = this._store.select(fromHome.selectFilterByStatus);

  /**
   * - Invoices Filtered
   */
  invoicesFiltered$: Observable<Invoice[]> = combineLatest([
    this._invoicesFacade.invoices$,
    this.filterByStatus$,
  ]).pipe(
    map(([invoices, filterByStatus]) =>
      filterByStatus
        ? invoices.filter((f) => f.status === filterByStatus)
        : invoices
    )
  );

  /**
   * - Total Invoices
   */
  totalInvoices$: Observable<number> = this.invoicesFiltered$.pipe(
    map((invoices) => invoices.length)
  );

  constructor(
    private readonly _store: Store,
    private readonly _invoicesFacade: InvoicesFacade
  ) {}

  /**
   * - Filter By Status
   * @param status
   */
  filterByStatus(status: InvoiceStatus | null) {
    this._store.dispatch(HomeActions.filterByStatus({ status }));
  }

  /**
   * - Show Create New Invoice Overlay
   */
  showCreateInvoiceOverlay() {
    this._store.dispatch(HomeActions.showCreateInvoiceOverlay());
  }

  /**
   * - Close Create Invoice Overlay
   */
  closeCreateInvoiceOverlay() {
    this._store.dispatch(HomeActions.closeCreateInvoiceOverlay());
  }
}
