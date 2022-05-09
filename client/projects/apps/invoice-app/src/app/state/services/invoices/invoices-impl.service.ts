import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@lbk/tokens';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CreateInvoiceDTO, Invoice, UpdateInvoiceDTO } from '../../../shared';
import { InvoicesService } from './invoices.service';

@Injectable({ providedIn: 'root' })
export class InvoicesImplService extends InvoicesService {
  constructor(
    _http: HttpClient,
    @Inject(API_URL)
    _apiUrl: string
  ) {
    super(_http, _apiUrl);
  }
  /**
   *  - Get Invoices
   * @returns
   */
  getInvoices(): Observable<Invoice[]> {
    return this._http
      .get<Invoice[]>(`${this._apiUrl}/invoices`)
      .pipe(shareReplay(1));
  }

  /**
   * - Retrieve Invoice
   * @param invoice_id
   * @returns
   */
  retrieveInvoice(invoice_id: number): Observable<Invoice> {
    return this._http
      .get<Invoice>(`${this._apiUrl}/invoices/invoice/${invoice_id}`)
      .pipe(shareReplay(1));
  }

  /**
   * - Delete Invoice
   * @param invoice_id
   * @returns
   */
  deleteInvoice(invoice_id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiUrl}/invoices/invoice/${invoice_id}`)
      .pipe(shareReplay(1));
  }

  /**
   * - Mask As Paid
   * @param invoice_id
   * @returns
   */
  maskAsPaid(invoice_id: number): Observable<void> {
    return this._http
      .patch<void>(
        `${this._apiUrl}/invoices/invoice/${invoice_id}/mask-as-paid`,
        {}
      )
      .pipe(shareReplay(1));
  }

  /**
   *  - Update Invoice
   * @returns
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO): Observable<Invoice> {
    const { invoice_id } = updateInvoiceDTO;
    return this._http
      .put<Invoice>(
        `${this._apiUrl}/invoices/invoice/${invoice_id}`,
        updateInvoiceDTO
      )
      .pipe(shareReplay(1));
  }

  /**
   *  - Create Invoice
   * @param invoiceDto
   * @returns
   */
  createInvoice(createInvoiceDTO: CreateInvoiceDTO): Observable<Invoice> {
    return this._http
      .post<Invoice>(`${this._apiUrl}/invoices/invoice`, createInvoiceDTO)
      .pipe(shareReplay(1));
  }
}
