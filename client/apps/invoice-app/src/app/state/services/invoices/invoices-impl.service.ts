import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@lbk/tokens';
import { Observable } from 'rxjs';
import { CreateInvoiceDTO, Invoice, UpdateInvoiceDTO } from '../../../shared';
import { InvoicesService } from './invoices.service';

@Injectable({ providedIn: 'root' })
export class InvoicesImplService extends InvoicesService {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    _http: HttpClient
  ) {
    super(_http);
  }

  /**
   *  - Get Invoices
   * @returns
   */
  getInvoices(): Observable<Invoice[]> {
    return this._http.get<Invoice[]>(`${this._apiUrl}/invoices`);
  }

  /**
   * - Retrieve Invoice
   * @param invoice_id
   * @returns
   */
  retrieveInvoice(invoice_id: number): Observable<Invoice> {
    return this._http.get<Invoice>(
      `${this._apiUrl}/invoices/invoice/${invoice_id}`
    );
  }

  /**
   * - Delete Invoice
   * @param invoice_id
   * @returns
   */
  deleteInvoice(invoice_id: number): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/invoices/invoice/${invoice_id}`
    );
  }

  /**
   * - Mask As Paid
   * @param invoice_id
   * @returns
   */
  maskAsPaid(invoice_id: number): Observable<void> {
    return this._http.patch<void>(
      `${this._apiUrl}/invoices/invoice/${invoice_id}/mask-as-paid`,
      {}
    );
  }

  /**
   *  - Update Invoice
   * @returns
   */
  updateInvoice(updateInvoiceDTO: UpdateInvoiceDTO): Observable<Invoice> {
    const { invoice_id } = updateInvoiceDTO;
    return this._http.put<Invoice>(
      `${this._apiUrl}/invoices/invoice/${invoice_id}`,
      updateInvoiceDTO
    );
  }

  /**
   *  - Create Invoice
   * @param invoiceDto
   * @returns
   */
  createInvoice(createInvoiceDTO: CreateInvoiceDTO): Observable<Invoice> {
    return this._http.post<Invoice>(
      `${this._apiUrl}/invoices/invoice`,
      createInvoiceDTO
    );
  }
}
