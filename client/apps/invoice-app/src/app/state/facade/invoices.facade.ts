import { Inject, Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { CreateInvoiceDTO, Invoice, INVOICES_SERVICE } from '../../shared';
import { InvoicesActions } from '../actions';
import { fromInvoices } from '../selectors';
import { InvoicesService } from '../services';
import { UpdateInvoiceDTO } from './../../shared/dto/update-invoice.dto';

/**
 * - Invoice Facade
 */
@Injectable({ providedIn: 'root' })
export class InvoicesFacade {
  /**
   * - All Invoices
   */
  invoices$: Observable<Invoice[]> = this._store.select(
    fromInvoices.selectAllInvoices
  );

  /**
   * - Loaded
   */
  loaded$: Observable<boolean> = this._store.select(fromInvoices.selectLoaded);

  /**
   * - Selected Invoice
   */
  selectedInvoice$: Observable<Invoice | null | undefined | 0> =
    this._store.select(fromInvoices.selectSelectedInvoice);

  /**
   * - Total Invoices
   */
  totalInvoices$: Observable<number> = this.invoices$.pipe(
    map((invoices) => invoices.length)
  );

  constructor(
    private readonly _store: Store,
    private readonly _dialogService: DialogService,
    @Inject(INVOICES_SERVICE)
    private readonly _invoicesService: Observable<InvoicesService>
  ) {}

  /**
   * - Load Invoices
   */
  loadInvoices() {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (loaded) return;
      this._store.dispatch(InvoicesActions.loadInvoices());
    });
  }

  /**
   * - Create Invoice
   * @param createInvoiceDTO
   */
  createInvoice(createInvoiceDTO: CreateInvoiceDTO) {
    this._store.dispatch(InvoicesActions.createInvoice({ createInvoiceDTO }));
  }

  /**
   *  - Has Invoice In Store
   * @param invoice_id
   * @returns
   */
  hasInvoiceInStore(invoice_id: number): Observable<boolean> {
    return this._store.select(fromInvoices.selectInvoiceEntities).pipe(
      map((entities) => entities[invoice_id]),
      tap((invoice) => {
        if (!invoice) return;
        this.selectInvoice(invoice_id);
      }),
      map((invoice) => !!invoice),
      take(1)
    );
  }

  /**
   *  - Has Invoice In API
   * @param invoice_id
   * @returns
   */
  hasInvoiceInApi(invoice_id: number): Observable<boolean> {
    return this._invoicesService.pipe(
      switchMap((service) =>
        service.retrieveInvoice(invoice_id).pipe(
          map((invoice) => InvoicesActions.loadInvoice({ invoice })),
          tap((action) => this._store.dispatch(action)),
          map(() => true),
          catchError(() => of(false))
        )
      )
    );
  }

  /**
   * - Delete Invoice
   * @param invoice_id
   */
  deleteInvoice(invoice_id: number) {
    this._dialogService
      .confirm({
        title: 'Delete Invoice',
        body: 'Are you sure you want to delete this invoice?',
      })
      .afterClosed$.pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed)
          return this._store.dispatch(
            InvoicesActions.deleteInvoice({ invoice_id })
          );
      });
  }

  /**
   * - Mask As Paid
   * @param invoice_id
   */
  maskAsPaid(invoice_id: number) {
    this._store.dispatch(InvoicesActions.maskAsPaid({ invoice_id }));
  }

  /**
   * - Update Invoice
   * @param invoice_id
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO) {
    this._store.dispatch(InvoicesActions.updateInvoice({ updateInvoiceDTO }));
  }

  /**
   *  - Select Invoice
   * @param invoice_id
   */
  selectInvoice(invoice_id: number | null) {
    this._store.dispatch(InvoicesActions.selectInvoice({ invoice_id }));
  }
}
