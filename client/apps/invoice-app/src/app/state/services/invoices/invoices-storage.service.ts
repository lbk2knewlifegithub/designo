import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from '@lbk/tokens';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import {
  CreateInvoiceDTO,
  fromData,
  Invoice,
  UpdateInvoiceDTO,
} from '../../../shared';
import { InvoicesService } from './invoices.service';

@Injectable({ providedIn: 'root' })
export class InvoicesStorageService extends InvoicesService {
  private invoicesStorageKey = 'invoices';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage,
    _http: HttpClient
  ) {
    super(_http);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.supported().pipe(
      map(() => this.storage.getItem(this.invoicesStorageKey)),
      map((value: string | null | undefined) =>
        value ? JSON.parse(value) : fromData.invoices()
      ),
      catchError(() => {
        this._clear();
        return of(fromData.invoices());
      }),
      tap((invoices) => this._save(invoices))
    );
  }

  retrieveInvoice(invoice_id: number): Observable<Invoice> {
    return this.getInvoices().pipe(
      map((invoices) => {
        const invoice = invoices.find(
          (invoice) => invoice.invoice_id === invoice_id
        );
        if (!invoice) throw new Error('Invoice not found');
        return invoice;
      })
    );
  }

  deleteInvoice(invoice_id: number): Observable<void> {
    return this.getInvoices().pipe(
      map((invoices) =>
        invoices.filter((invoice) => invoice.invoice_id !== invoice_id)
      ),
      tap((invoices) => this._save(invoices)),
      map(() => void 0)
    );
  }

  /**
   *  - Mask As Paid
   * @param invoice_id
   * @returns
   */
  maskAsPaid(invoice_id: number): Observable<void> {
    return this.getInvoices().pipe(
      map((invoices) =>
        invoices.map((invoice) =>
          invoice.invoice_id !== invoice_id
            ? invoice
            : ({ ...invoice, status: 'paid' } as Invoice)
        )
      ),
      tap((invoices) => this._save(invoices)),
      map(() => void 0)
    );
  }

  /**
   *  - Update Invoice
   * @param updateInvoiceDTO
   * @returns
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO): Observable<void> {
    const { invoice_id, ...newInvoice } = updateInvoiceDTO;
    return this.getInvoices().pipe(
      map((invoices) =>
        invoices.map((invoice) =>
          invoice.invoice_id !== invoice_id
            ? invoice
            : ({ invoice_id, ...newInvoice } as Invoice)
        )
      ),
      tap((invoices) => this._save(invoices)),
      map(() => void 0)
    );
  }

  createInvoice(createInvoiceDTO: CreateInvoiceDTO): Observable<Invoice> {
    return this.getInvoices().pipe(
      map((invoices) => [
        {
          ...createInvoiceDTO,
          invoice_id: Math.floor(Math.random() * 1_000_000),
        },
        ...invoices,
      ]),
      tap((invoices) => this._save(invoices)),
      map((invoices) => invoices[0])
    );
  }

  private _save(invoices: Invoice[]) {
    this.storage.setItem(this.invoicesStorageKey, JSON.stringify(invoices));
  }

  private _clear() {
    this.storage.removeItem(this.invoicesStorageKey);
  }
}
