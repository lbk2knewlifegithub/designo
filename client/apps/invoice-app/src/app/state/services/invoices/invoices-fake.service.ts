import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  CreateInvoiceDTO,
  fromData,
  Invoice,
  InvoiceStatus,
  UpdateInvoiceDTO,
} from '../../../shared';
import { InvoicesService } from './invoices.service';

@Injectable({ providedIn: 'root' })
export class InvoicesFakeService implements InvoicesService {
  private _invoices = [...fromData.invoices()];
  private invoice_id = this._invoices.length + 1;

  /**
   *  - Get All Invoices
   * @returns
   */
  getInvoices(): Observable<Invoice[]> {
    return of(this._invoices);
  }

  /**
   *  - Retrieve Invoice
   * @param invoice_id
   * @returns
   */
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

  /**
   *  - Delete Invoice
   * @param id
   * @returns
   */
  deleteInvoice(invoice_id: number): Observable<void> {
    this._invoices = this._invoices.filter(
      (invoice) => invoice.invoice_id !== invoice_id
    );
    return of(void 0);
  }

  /**
   *  - Mask As paid
   * @param id
   * @returns
   */
  maskAsPaid(invoice_id: number): Observable<void> {
    this._invoices = this._invoices.map((invoice) =>
      invoice.invoice_id !== invoice_id
        ? invoice
        : { ...invoice, status: InvoiceStatus.PAID }
    );
    return of(void 0);
  }

  /**
   *  - Update Invoice
   * @param id
   * @param invoiceDto
   * @returns
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO): Observable<void> {
    const { invoice_id, ...newInvoice } = updateInvoiceDTO;
    this._invoices = this._invoices.map((invoice) =>
      invoice.invoice_id !== invoice_id
        ? invoice
        : { invoice_id, ...newInvoice }
    );

    return of(void 0);
  }

  /**
   *  - Create Invoice
   * @param createInvoiceDto
   * @returns
   */
  createInvoice(createInvoiceDTO: CreateInvoiceDTO): Observable<Invoice> {
    const newInvoice = {
      invoice_id: this.invoice_id,
      ...createInvoiceDTO,
    };

    this._invoices = [newInvoice, ...this._invoices];

    this.invoice_id++;
    return of(newInvoice);
  }
}
